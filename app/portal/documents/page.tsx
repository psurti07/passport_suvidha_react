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
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import axiosServer from "@/lib/axiosServer";

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

      const token = localStorage.getItem("authToken");

      const response = await fetch("/api/required-documents", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch documents");
      }

      setDocuments(data.data.documents);
    } catch (error: any) {
      console.error("Fetch error:", error);
      toast.error(error.message || "Failed to fetch documents");
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
      setIsLoading(true);

      const formData = new FormData();
      formData.append("document", selectedFile);

      // ✅ FIXED URL (query param instead of dynamic route)
      const response = await fetch(
        `/api/required-documents?document_type_id=${docId}`,
        {
          method: "POST",
          body: formData,
          credentials: "include", // ✅ IMPORTANT (for cookies)
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      toast.success("Document uploaded successfully!");
      fetchDocuments();
    } catch (error: any) {
      toast.error(error.message || "Failed to upload document");
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
      setSelectedDocId(null);
    }
  };

  const handleDelete = async (docId: number) => {
    try {
      setIsLoading(true);

      // ✅ Call Next.js API (NOT Laravel)
      const response = await fetch(
        `/api/required-documents?document_type_id=${docId}`,
        {
          method: "DELETE",
          credentials: "include", // ✅ VERY IMPORTANT (send cookie)
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete document");
      }

      if (data.status === "success") {
        toast.success("Document deleted successfully!");
        fetchDocuments(); // refresh list
      } else {
        toast.error(data.message || "Failed to delete document");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to delete document");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (docId: number) => {
    try {
      setIsLoading(true);

      // ✅ Call YOUR Next.js API (NOT Laravel directly)
      const response = await fetch(
        `/api/required-documents?document_type_id=${docId}&download=true`,
        {
          method: "GET",
          credentials: "include", // ✅ VERY IMPORTANT (sends cookie)
        },
      );

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();

      // ✅ Extract filename
      const contentDisposition = response.headers.get("content-disposition");
      let filename = `document-${docId}.pdf`;

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+?)"?$/);
        if (match?.[1]) {
          filename = match[1];
        }
      }

      // ✅ Download file
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = filename;

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error(error);
      toast.error("Failed to download document");
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
              Please upload all the required documents in PDF, JPG, or PNG
              format
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Table>
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
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-navy" />
                        {doc.name}
                        {doc.is_mandatory && (
                          <span className="text-red-500 text-sm">*</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {doc.status === "Uploaded" ? (
                        <span className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-4 w-4" /> Uploaded
                        </span>
                      ) : doc.status === "Rejected" ? (
                        <span className="flex items-center gap-1 text-red-600">
                          <AlertCircle className="h-4 w-4" /> Rejected
                        </span>
                      ) : (
                        <span className="text-yellow-600">Pending</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {doc.file_details?.upload_date
                        ? formatDate(doc.file_details.upload_date)
                        : "-"}
                    </TableCell>
                    <TableCell>
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
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Input
                                type="file"
                                onChange={(e) => handleFileChange(e, doc.id)}
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                className="w-full"
                                disabled={isLoading}
                              />
                            </div>
                            <Button
                              size="sm"
                              onClick={() => handleUpload(doc.id)}
                              className="bg-gradient-to-r from-navy to-teal text-white hover:opacity-90"
                              disabled={
                                isLoading ||
                                !selectedFile ||
                                selectedDocId !== doc.id
                              }
                            >
                              <Upload className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
