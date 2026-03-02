"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  FileText,
  Download,
  CheckCircle,
  AlertCircle,
  Loader2,
  Calendar,
  Clock,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format, isValid, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface RequiredDocument {
  id: number;
  name: string;
  description: string;
  is_required: boolean;
}

interface AppointmentLetter {
  id: string;
  date?: string;
  location?: string;
  reference_number?: string;
  created_at: string;
  appointment_date: string;
  appointment_time: string;
  file_path?: string;
}

interface RequiredDocumentsResponse {
  status: string;
  data: {
    documents: RequiredDocument[];
    important_note: string;
  };
}

interface AppointmentLettersResponse {
  status: string;
  data: {
    appointment_letters: AppointmentLetter[];
  };
}

export default function AppointmentLetterPage() {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lettersLoading, setLettersLoading] = useState(true);
  const [documents, setDocuments] = useState<RequiredDocument[]>([]);
  const [appointmentLetters, setAppointmentLetters] = useState<
    AppointmentLetter[]
  >([]);
  const [importantNote, setImportantNote] = useState("");
  const { toast } = useToast();
  const router = useRouter();

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

  // Helper function to safely format dates with fallback
  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return "N/A";

    try {
      // Try to parse the date and check if it's valid
      const date = parseISO(dateString);
      if (isValid(date)) {
        return format(date, "dd MMM yyyy");
      }
      return dateString; // Fallback to showing the original string
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return dateString || "N/A"; // Return the raw date or N/A as fallback
    }
  };

  // Helper function to format time only
  const formatTime = (timeString: string | null | undefined): string => {
    if (!timeString) return "N/A";

    try {
      // Split the ISO string to get the time part
      const timePart = timeString.split("T")[1];
      if (!timePart) return timeString;

      // Extract hours:minutes (first 5 characters of time part)
      const timeOnly = timePart.substring(0, 5);
      return timeOnly;
    } catch (error) {
      // Fallback: return as is
      return timeString;
    }
  };  

  // Fetch required documents on component mount
  useEffect(() => {
    const fetchRequiredDocuments = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/required-documents");

        if (!response.ok) {
          throw new Error("Failed to fetch required documents");
        }

        const result: RequiredDocumentsResponse = await response.json();
        setDocuments(result.data.documents);
        setImportantNote(result.data.important_note);
      } catch (error) {
        console.error("Error fetching required documents:", error);
        toast({
          title: "Error",
          description: "Failed to fetch required documents",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    const fetchAppointmentLetters = async () => {
      try {
        setLettersLoading(true);
        const response = await fetch("/appointment-letters");

        // Log the response for debugging
        // console.log("API Response status:", response.status);

        // Handle non-OK responses
        if (!response.ok) {
          // Try to get the error message from the response
          const errorData = await response.json().catch(() => ({}));
          console.error("Error response:", errorData);
          throw new Error(
            errorData.message || "Failed to fetch appointment letters"
          );
        }

        const result = await response.json();
        // console.log("API Response data:", result);

        // Check if the expected data structure exists
        if (!result.data || !Array.isArray(result.data.appointment_letters)) {
          console.error("Unexpected API response format:", result);

          // Try to handle different response formats
          let lettersArray = [];

          if (Array.isArray(result.data)) {
            lettersArray = result.data;
          } else if (Array.isArray(result)) {
            lettersArray = result;
          } else if (
            result.appointment_letters &&
            Array.isArray(result.appointment_letters)
          ) {
            lettersArray = result.appointment_letters;
          } else {
            // If we can't find an array, use an empty one
            lettersArray = [];
          }

          // Sort whatever we found
          const sortedLetters = lettersArray.sort(
            (a: { created_at: string }, b: { created_at: string }) => {
              const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
              const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
              return dateB - dateA;
            }
          );
          setAppointmentLetters(sortedLetters);
        } else {
          // Normal path - response format is as expected
          const sortedLetters = result.data.appointment_letters.sort(
            (a: { created_at: string }, b: { created_at: string }) => {
              const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
              const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
              return dateB - dateA;
            }
          );
          setAppointmentLetters(sortedLetters);
        }
      } catch (error: any) {
        console.error("Error fetching appointment letters:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to fetch appointment letters",
          variant: "destructive",
        });
        // Initialize with empty array to avoid undefined errors
        setAppointmentLetters([]);
      } finally {
        setLettersLoading(false);
      }
    };

    fetchRequiredDocuments();
    fetchAppointmentLetters();
  }, [toast]);

  const handleDownload = async (appointmentId: string) => {
    setDownloading(appointmentId);
    try {
      const response = await fetch(
        `/api/appointment-letters/download?id=${appointmentId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to download appointment letter"
        );
      }

      // Get the filename from the Content-Disposition header
      const contentDisposition = response.headers.get("content-disposition");
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "")
        : "appointment_letter.pdf";

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      toast({
        title: "Success",
        description: "Appointment letter downloaded successfully",
      });
    } catch (error: any) {
      console.error("Error downloading appointment letter:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to download appointment letter",
        variant: "destructive",
      });
    } finally {
      setDownloading(null);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants}>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-navy">
            Appointment Letter & Documents
          </h1>
          <p className="text-muted-foreground">
            Download your appointment letter and check required documents
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Appointment Letters Section */}
        <motion.div variants={itemVariants} className="md:col-span-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div>
                  <CardTitle>Appointment Letters</CardTitle>
                  <CardDescription>
                    View and download your appointment letters
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {lettersLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-navy" />
                </div>
              ) : appointmentLetters.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No appointment letters found
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointmentLetters.map((letter, index) => (
                    <div
                      key={letter.id}
                      className={`border rounded-lg p-4 transition-all ${
                        index === 0
                          ? "border-2 border-teal-500 bg-teal-50/30 shadow-sm"
                          : "border-border"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-medium">
                            Appointment: {formatDate(letter.appointment_date)}
                            </p>
                            {index === 0 && (
                              <Badge
                                variant="outline"
                                className="bg-teal-100 text-teal-800 border-teal-200 text-[10px]"
                              >
                                Latest
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {letter.location}
                          </p>
                        </div>
                        <div className="flex items-center bg-muted px-2 py-1 rounded text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(letter.created_at)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />{" "}
                          {formatTime(letter.appointment_time)}
                        </span>
                        {index === 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(letter.id)}
                            disabled={downloading === letter.id}
                            className="bg-teal-100 border-teal-200 hover:bg-teal-200"
                          >
                            {downloading === letter.id ? (
                              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                            ) : (
                              <Download className="mr-2 h-3 w-3" />
                            )}
                            {downloading === letter.id
                              ? "Downloading..."
                              : "Download"}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Required Documents Section */}
        <motion.div variants={itemVariants} className="md:col-span-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div>
                  <CardTitle>Required Documents</CardTitle>
                  <CardDescription>
                    Bring all documents to avoid appointment rescheduling
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-navy" />
                </div>
              ) : (
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="rounded-full bg-green-100 p-2 mt-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">
                          {doc.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {doc.description}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="mt-6 flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800">
                        Important Note
                      </h4>
                      <p className="text-sm text-amber-700">{importantNote}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
