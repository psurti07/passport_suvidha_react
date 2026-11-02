"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  FileText,
  Upload,
  Trash2,
  CheckCircle,
  AlertCircle,
  Download,
  Loader2,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Document {
  id: number;
  name: string;
  description: string;
  is_mandatory: boolean;
  status: "Pending" | "Uploaded" | "Rejected";
  file_details: {
    file_path: string;
    upload_date: string;
  } | null;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDocId, setSelectedDocId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingDocId, setUploadingDocId] = useState<number | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  // Fetch documents on component mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/required-documents");
      const data = await response.json();

      if (data.status === "success") {
        setDocuments(data.data.documents);
      } else {
        toast.error(data.message || "Failed to fetch documents");
      }
    } catch (error) {
      toast.error("Failed to fetch documents");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    docId: number,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setSelectedDocId(docId);
    }
  };

  const handleUpload = async (docId: number) => {
    if (!selectedFile || selectedDocId !== docId) {
      toast.error("Please select a file to upload");
      return;
    }

    try {
      // setIsLoading(true);
      setUploadingDocId(docId);

      const formData = new FormData();
      formData.append("document", selectedFile);

      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/required-documents/upload/${docId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: formData,
        },
      );

      const data = await response.json();

      if (response.ok && data.status === "success") {
        toast.success("Document uploaded successfully!");
        fetchDocuments();
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (error: any) {
      console.error(error);

      if (
        error.message?.includes("timeout") ||
        error.message?.includes("Network Error")
      ) {
        toast.success("Upload processing... please wait");
        setTimeout(fetchDocuments, 5000);
        return;
      }

      toast.error("Failed to upload document");
    } finally {
      // setIsLoading(false);
      setUploadingDocId(null);
      setSelectedFile(null);
      setSelectedDocId(null);
    }
  };

  const handleDelete = async (docId: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/required-documents?document_type_id=${docId}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (data.status === "success") {
        toast.success("Document deleted successfully!");
        fetchDocuments(); // Refresh the documents list
      } else {
        toast.error(data.message || "Failed to delete document");
      }
    } catch (error) {
      toast.error("Failed to delete document");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (docId: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/required-documents?document_type_id=${docId}&download=true`,
      );

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const contentDisposition = response.headers.get("content-disposition");

      let filename = `document-${docId}`;

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+?)"?$/);
        if (match) filename = match[1];
      }

      a.download = filename;
      // a.download = `document-${docId}.pdf`; // Default filename
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast.error("Failed to download document");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-navy">
            Documents
          </h1>
          <p className="text-muted-foreground">
            Upload and manage your required documents for passport application
          </p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="bg-navy/5">
            <CardTitle>Required Documents</CardTitle>
            <CardDescription>
              Please upload all the required documents in PDF, JPG, JPEG or PNG
              format
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <Table className="min-w-[750px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium min-w-[220px]">
                        <div className="flex items-start gap-2">
                          <div className="shrink-0">
                            <FileText className="h-4 w-4 text-navy" />
                          </div>

                          <div>
                            {doc.name}

                            {doc.is_mandatory && (
                              <span className="text-red-500 text-sm">*</span>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="min-w-[120px]">
                        {doc.status === "Uploaded" ? (
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            Uploaded
                          </span>
                        ) : doc.status === "Rejected" ? (
                          <span className="flex items-center gap-1 text-red-600">
                            <AlertCircle className="h-4 w-4" />
                            Rejected
                          </span>
                        ) : (
                          <span className="text-yellow-600">Pending</span>
                        )}
                      </TableCell>

                      <TableCell className="min-w-[120px]">
                        {doc.file_details?.upload_date
                          ? formatDate(doc.file_details.upload_date)
                          : "-"}
                      </TableCell>

                      <TableCell className="min-w-[280px]">
                        <div className="flex items-center gap-2">
                          {doc.status === "Uploaded" ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownload(doc.id)}
                                disabled={isLoading}
                              >
                                <Download className="h-4 w-4" />
                              </Button>

                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(doc.id)}
                                disabled={isLoading}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <div>
                                <Input
                                  type="file"
                                  onChange={(e) => handleFileChange(e, doc.id)}
                                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                  disabled={isLoading}
                                  className="w-full  text-sm  file:mr-2  file:rounded-md  file:border-0  file:px-3"
                                />
                              </div>

                              <Button
                                size="sm"
                                onClick={() => handleUpload(doc.id)}
                                className="bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 shrink-0"
                                disabled={
                                  !selectedFile ||
                                  selectedDocId !== doc.id ||
                                  uploadingDocId === doc.id
                                }
                              >
                                {uploadingDocId === doc.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Upload className="h-4 w-4" />
                                )}
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
