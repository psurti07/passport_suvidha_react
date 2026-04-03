"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Clock,
  CheckCircle,
  Bell,
  Download,
  HelpCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ApplicationProgress, ApplicationStage } from "@/app/types/application";
import { handleApiAuthError } from "@/lib/clientAuthUtils";

export default function PortalDashboard() {
  const [applicationProgress, setApplicationProgress] =
    useState<ApplicationProgress | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Stage helper functions
  const findStage = (
    title: string,
    fallbackIndex: number
  ): ApplicationStage | null => {
    if (!applicationProgress?.stages) return null;

    // Convert the search title to snake_case for comparison
    const searchTitle = title.toLowerCase().replace(/\s+/g, '_');

    // Try to find stage by exact title match or converted title
    const stage = applicationProgress.stages.find(
      (s) => s.title.toLowerCase() === searchTitle
    );

    // If found, return it
    if (stage) return stage;

    // If not found by title, fall back to index if available
    if (applicationProgress.stages[fallbackIndex]) {
      return applicationProgress.stages[fallbackIndex];
    }

    return null;
  };

  const findStageStatus = (title: string, fallbackIndex: number): string => {
    const stage = findStage(title, fallbackIndex);

    if (!stage) return "bg-gray-100 border-gray-50";

    // Always show Application Submitted as completed
    if (title.toLowerCase() === "application submitted") {
      return "bg-green-100 border-green-50";
    }

    if (stage.completed) {
      return "bg-green-100 border-green-50";
    }

    // Check if this is the current stage (first incomplete stage)
    const firstIncompleteIndex =
      applicationProgress?.stages.findIndex((s) => !s.completed) ?? -1;
    const currentStageTitle =
      firstIncompleteIndex >= 0
        ? applicationProgress?.stages[firstIncompleteIndex].title
        : "";

    if (stage.title === currentStageTitle) {
      return "bg-blue-100 border-blue-50";
    }

    return "bg-gray-100 border-gray-50";
  };

  const isStageCompleted = (title: string, fallbackIndex: number): boolean => {
    // Always show Application Submitted as completed
    if (title.toLowerCase() === "application submitted") {
      return true;
    }

    const stage = findStage(title, fallbackIndex);
    return stage?.completed || false;
  };

  const isCurrentStage = (title: string, fallbackIndex: number): boolean => {
    if (!applicationProgress?.stages) return false;

    const firstIncompleteIndex = applicationProgress.stages.findIndex(
      (s) => !s.completed
    );
    if (firstIncompleteIndex === -1) return false;

    const currentStage = applicationProgress.stages[firstIncompleteIndex];
    const stage = findStage(title, fallbackIndex);

    return stage?.title === currentStage.title;
  };

  const getStageTextClass = (title: string, fallbackIndex: number): string => {
    if (
      isStageCompleted(title, fallbackIndex) ||
      isCurrentStage(title, fallbackIndex)
    ) {
      return "";
    }
    return "text-gray-600";
  };

  const getStageTextColorClass = (
    title: string,
    fallbackIndex: number
  ): string => {
    if (isStageCompleted(title, fallbackIndex)) {
      return "text-green-600";
    }
    if (isCurrentStage(title, fallbackIndex)) {
      return "text-blue-600";
    }
    return "text-gray-400";
  };

  const getStageDescription = (
    title: string,
    fallbackIndex: number,
    defaultDesc: string
  ): string => {
    const stage = findStage(title, fallbackIndex);
    return stage?.description || defaultDesc;
  };

  const getStageDate = (title: string, fallbackIndex: number): string => {
    const stage = findStage(title, fallbackIndex);

    // For Application Submitted, show the creation date
    if (title.toLowerCase() === "application submitted") {
      const date = applicationProgress?.created_at;
      if (!date) return "";

      // Format the date as "Month Day, Year"
      const formattedDate = new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      return formattedDate;
    }

    return stage?.date || "";
  };

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

  useEffect(() => {
    const fetchApplicationProgress = async () => {
      try {
        const response = await fetch("/api/application-progress");

        if (!response.ok) {
          // Parse the error response
          const errorData = await response.json();

          // Check if it's an authentication error and handle logout
          if (await handleApiAuthError(errorData)) {
            // Don't need to do anything else here, as handleApiAuthError will handle the redirect
            return;
          }

          throw new Error(
            errorData.message || "Failed to fetch application progress"
          );
        }

        const data = await response.json();
        setApplicationProgress(data);
      } catch (error) {
        console.error("Error fetching application progress:", error);
        setError(
          "Failed to load application progress. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationProgress();
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-navy">
            Welcome, John
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Here's an overview of your passport applications and account
          </p>
        </div>       
      </motion.div>

      {/* Application status */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden">
          <CardHeader className="bg-navy/5 pb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <CardTitle className="text-lg md:text-xl">
                <span className="hidden md:inline">
                  Passport Application - #PD-2023-7845
                </span>
                <span className="md:hidden">Passport Application</span>
                <span className="self-end md:self-auto px-3 py-1 bg-teal/20 text-teal rounded-full text-sm font-medium ml-2">
                  In Process
                </span>
              </CardTitle>
              <div className="flex flex-row md:hidden gap-2 items-start">
                <span className="text-muted-foreground">#PD-2023-7845</span>
              </div>
            </div>
            <CardDescription>Submitted on March 30, 2025</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                <div className="bg-white rounded-lg p-4 border">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Application Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">Normal Processing</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Book Size:</span>
                      <span className="font-medium">60 Pages</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Applicant:</span>
                      <span className="font-medium">John Doe</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Current Stage:
                      </span>
                      <span className="font-medium text-teal">
                        Document Verification
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Payment Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Amount Paid:
                      </span>
                      <span className="font-medium">Rs 2500.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Payment Method:
                      </span>
                      <span className="font-medium">Credit Card (4242)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Transaction ID:
                      </span>
                      <span className="font-medium">TXN-78945612</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Receipt:</span>
                      <Link
                        href="#"
                        className="text-navy hover:underline flex items-center"
                      >
                        <Download className="h-3 w-3 mr-1" /> Download
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Application Progress
                </h3>
                <div className="relative pt-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <div>
                      <span className="text-xs font-semibold inline-block text-navy">
                        {loading
                          ? "Loading..."
                          : `${
                              applicationProgress?.progress_percentage || 0
                            }% Complete`}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-navy">
                        {loading
                          ? "Loading..."
                          : `Estimated completion: ${
                              applicationProgress?.estimated_completion || "N/A"
                            }`}
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded-full bg-navy/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          applicationProgress?.progress_percentage || 0
                        }%`,
                      }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-navy to-teal"
                    ></motion.div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative flex flex-col gap-8">
                  {/* Vertical line */}
                  <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-gray-200"></div>

                  {loading ? (
                    <div className="flex justify-center p-6">
                      <p>Loading application progress...</p>
                    </div>
                  ) : error ? (
                    <div className="flex justify-center p-6 text-red-500">
                      <p>{error}</p>
                    </div>
                  ) : (
                    <>
                      {/* Application Submitted */}
                      <div className="flex gap-4">
                        <div className="relative z-10">
                          <div
                            className={`rounded-full bg-green-100 border-green-50 p-3 border-4`}
                          >
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                        </div>
                        <div className="flex-1 pt-2">
                          <h4
                            className={`font-medium text-base`}
                          >
                            Application Submitted
                          </h4>
                          <p className="text-gray-600 text-sm mt-1">
                            Your application was successfully submitted and payment was processed.
                          </p>
                          <p className="text-sm mt-1 text-green-600">
                            {applicationProgress?.created_at ? new Date(applicationProgress.created_at).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }) : ""}
                          </p>
                        </div>
                      </div>

                      {/* In Process */}
                      <div className="flex gap-4">
                        <div className="relative z-10">
                          <div
                            className={`rounded-full ${findStageStatus(
                              "in_process",
                              1
                            )} p-3 border-4`}
                          >
                            {isStageCompleted("in_process", 1) ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : isCurrentStage("in_process", 1) ? (
                              <Clock className="h-5 w-5 text-blue-600" />
                            ) : (
                              <Clock className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1 pt-2">
                          <h4
                            className={`font-medium text-base ${getStageTextClass(
                              "in_process",
                              1
                            )}`}
                          >
                            In Process
                          </h4>
                          <p className="text-gray-600 text-sm mt-1">
                            Your application is currently being processed.
                          </p>
                          <p
                            className={`text-sm mt-1 ${getStageTextColorClass(
                              "in_process",
                              1
                            )}`}
                          >
                            {getStageDate("in_process", 1) || "Pending"}
                          </p>
                        </div>
                      </div>

                      {/* Document Submitted */}
                      <div className="flex gap-4">
                        <div className="relative z-10">
                          <div
                            className={`rounded-full ${findStageStatus(
                              "documents_submitted",
                              2
                            )} p-3 border-4`}
                          >
                            {isStageCompleted("documents_submitted", 2) ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : isCurrentStage("documents_submitted", 2) ? (
                              <Clock className="h-5 w-5 text-blue-600" />
                            ) : (
                              <Clock className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1 pt-2">
                          <h4
                            className={`font-medium text-base ${getStageTextClass(
                              "documents_submitted",
                              2
                            )}`}
                          >
                            Document Submitted
                          </h4>
                          <p className="text-gray-600 text-sm mt-1">
                            Your documents have been successfully submitted for verification.
                          </p>
                          <p
                            className={`text-sm mt-1 ${getStageTextColorClass(
                              "documents_submitted",
                              2
                            )}`}
                          >
                            {getStageDate("documents_submitted", 2) || "Pending"}
                          </p>
                        </div>
                      </div>

                      {/* Details verification */}
                      <div className="flex gap-4">
                        <div className="relative z-10">
                          <div
                            className={`rounded-full ${findStageStatus(
                              "details_verification",
                              3
                            )} p-3 border-4`}
                          >
                            {isStageCompleted("details_verification", 3) ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : isCurrentStage("details_verification", 3) ? (
                              <Clock className="h-5 w-5 text-blue-600" />
                            ) : (
                              <Clock className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1 pt-2">
                          <h4
                            className={`font-medium text-base ${getStageTextClass(
                              "details_verification",
                              3
                            )}`}
                          >
                            Details verification
                          </h4>
                          <p className="text-gray-600 text-sm mt-1">
                            Your application details are being verified.
                          </p>
                          <p
                            className={`text-sm mt-1 ${getStageTextColorClass(
                              "details_verification",
                              3
                            )}`}
                          >
                            {getStageDate("details_verification", 3) || "Pending"}
                          </p>
                        </div>
                      </div>

                      {/* Appointment scheduled */}
                      <div className="flex gap-4">
                        <div className="relative z-10">
                          <div
                            className={`rounded-full ${findStageStatus(
                              "appointment_scheduled",
                              4
                            )} p-3 border-4`}
                          >
                            {isStageCompleted("appointment_scheduled", 4) ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : isCurrentStage("appointment_scheduled", 4) ? (
                              <Clock className="h-5 w-5 text-blue-600" />
                            ) : (
                              <Clock className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1 pt-2">
                          <h4
                            className={`font-medium text-base ${getStageTextClass(
                              "appointment_scheduled",
                              4
                            )}`}
                          >
                            Appointment scheduled
                          </h4>
                          <p className="text-gray-600 text-sm mt-1">
                            Your appointment has been scheduled for document verification and biometric data collection.
                          </p>
                          <p
                            className={`text-sm mt-1 ${getStageTextColorClass(
                              "appointment_scheduled",
                              4
                            )}`}
                          >
                            {getStageDate("appointment_scheduled", 4) || "Pending"}
                          </p>
                        </div>
                      </div>

                      {/* Passport Office Visit */}
                      <div className="flex gap-4">
                        <div className="relative z-10">
                          <div
                            className={`rounded-full ${(() => {
                              const stage = applicationProgress?.stages?.[4];
                              if (!stage) return "bg-gray-100 border-gray-50";
                              
                              if (stage.title === "pov_success") {
                                return "bg-green-100 border-green-50";
                              } else if (stage.title === "pov_failed") {
                                return "bg-red-100 border-red-50";
                              } else if (stage.title === "pov_insufficient_documents") {
                                return "bg-yellow-100 border-yellow-50";
                              }
                              
                              return "bg-gray-100 border-gray-50";
                            })()} p-3 border-4`}
                          >
                            {(() => {
                              const stage = applicationProgress?.stages?.[4];
                              if (!stage) return <Clock className="h-5 w-5 text-gray-400" />;

                              if (stage.title === "pov_success") {
                                return <CheckCircle className="h-5 w-5 text-green-600" />;
                              } else if (stage.title === "pov_failed") {
                                return <XCircle className="h-5 w-5 text-red-600" />;
                              } else if (stage.title === "pov_insufficient_documents") {
                                return <AlertCircle className="h-5 w-5 text-yellow-600" />;
                              }

                              return <Clock className="h-5 w-5 text-gray-400" />;
                            })()}
                          </div>
                        </div>
                        <div className="flex-1 pt-2">
                          <h4 className="font-medium text-base">
                            {(() => {
                              const stage = applicationProgress?.stages?.[4];
                              if (!stage) return "Passport Office Visit";

                              switch (stage.title) {
                                case "pov_success":
                                  return "Passport Office Visit Successful";
                                case "pov_failed":
                                  return "Passport Office Visit Failed";
                                case "pov_insufficient_documents":
                                  return "Passport Office Visit - Insufficient Documents";
                                default:
                                  return "Passport Office Visit";
                              }
                            })()}
                          </h4>
                          {(() => {
                            const stage = applicationProgress?.stages?.[4];
                            if (!stage) return (
                              <p className="text-gray-600 text-sm mt-1">
                                Please visit the passport office with all required documents for verification and biometric data collection.
                              </p>
                            );

                            let message;
                            let colorClass;

                            switch (stage.title) {
                              case "pov_success":
                                message = "Your passport office visit was completed successfully. Your application is being processed further.";
                                colorClass = "text-green-600";
                                break;
                              case "pov_failed":
                                message = "Your passport office visit was unsuccessful. Please contact support for assistance and next steps.";
                                colorClass = "text-red-600";
                                break;
                              case "pov_insufficient_documents":
                                message = "Your visit was marked incomplete due to missing required documents. Please review the document checklist and schedule another visit.";
                                colorClass = "text-yellow-600";
                                break;
                              default:
                                message = "Please visit the passport office with all required documents for verification and biometric data collection.";
                                colorClass = "text-gray-600";
                            }

                            return (
                              <>
                                <p className="text-gray-600 text-sm mt-1">
                                  {message}
                                </p>
                                <p className={`text-sm mt-1 ${colorClass}`}>
                                  {stage.date || "Pending"}
                                </p>
                              </>
                            );
                          })()}
                        </div>
                      </div>

                      {/* Show Appointment Reschedule and Second POV if first POV failed or had insufficient documents */}
                      {(() => {
                        const povStage = applicationProgress?.stages?.[4];
                        if (povStage?.title === "pov_failed" || povStage?.title === "pov_insufficient_documents") {
                          return (
                            <>
                              {/* First Appointment Rescheduled */}
                              <div className="flex gap-4">
                                <div className="relative z-10">
                                  <div
                                    className={`rounded-full ${(() => {
                                      const stage = applicationProgress?.stages?.[5];
                                      if (!stage) return "bg-gray-100 border-gray-50";
                                      return stage.completed ? "bg-green-100 border-green-50" : "bg-blue-100 border-blue-50";
                                    })()} p-3 border-4`}
                                  >
                                    {(() => {
                                      const stage = applicationProgress?.stages?.[5];
                                      if (!stage) return <Clock className="h-5 w-5 text-gray-400" />;
                                      return stage.completed ? 
                                        <CheckCircle className="h-5 w-5 text-green-600" /> :
                                        <Clock className="h-5 w-5 text-blue-600" />;
                                    })()}
                                  </div>
                                </div>
                                <div className="flex-1 pt-2">
                                  <h4 className="font-medium text-base">
                                    Appointment Rescheduled 1
                                  </h4>
                                  <p className="text-gray-600 text-sm mt-1">
                                    Your appointment has been rescheduled for another passport office visit.
                                  </p>
                                  <p className={`text-sm mt-1 ${(() => {
                                    const stage = applicationProgress?.stages?.[5];
                                    return stage?.completed ? "text-green-600" : "text-blue-600";
                                  })()}`}>
                                    {applicationProgress?.stages?.[5]?.date || "Pending"}
                                  </p>
                                </div>
                              </div>

                              {/* Second Passport Office Visit */}
                              <div className="flex gap-4">
                                <div className="relative z-10">
                                  <div
                                    className={`rounded-full ${(() => {
                                      const stage = applicationProgress?.stages?.[6];
                                      if (!stage) return "bg-gray-100 border-gray-50";
                                      
                                      if (stage.title === "pov_success") {
                                        return "bg-green-100 border-green-50";
                                      } else if (stage.title === "pov_failed") {
                                        return "bg-red-100 border-red-50";
                                      } else if (stage.title === "pov_insufficient_documents") {
                                        return "bg-yellow-100 border-yellow-50";
                                      }
                                      
                                      return "bg-gray-100 border-gray-50";
                                    })()} p-3 border-4`}
                                  >
                                    {(() => {
                                      const stage = applicationProgress?.stages?.[6];
                                      if (!stage) return <Clock className="h-5 w-5 text-gray-400" />;

                                      if (stage.title === "pov_success") {
                                        return <CheckCircle className="h-5 w-5 text-green-600" />;
                                      } else if (stage.title === "pov_failed") {
                                        return <XCircle className="h-5 w-5 text-red-600" />;
                                      } else if (stage.title === "pov_insufficient_documents") {
                                        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
                                      }

                                      return <Clock className="h-5 w-5 text-gray-400" />;
                                    })()}
                                  </div>
                                </div>
                                <div className="flex-1 pt-2">
                                  <h4 className="font-medium text-base">
                                    {(() => {
                                      const stage = applicationProgress?.stages?.[6];
                                      if (!stage) return "Second Passport Office Visit";

                                      switch (stage.title) {
                                        case "pov_success":
                                          return "Second Passport Office Visit Successful";
                                        case "pov_failed":
                                          return "Second Passport Office Visit Failed";
                                        case "pov_insufficient_documents":
                                          return "Second Passport Office Visit - Insufficient Documents";
                                        default:
                                          return "Second Passport Office Visit";
                                      }
                                    })()}
                                  </h4>
                                  {(() => {
                                    const stage = applicationProgress?.stages?.[6];
                                    if (!stage) return (
                                      <p className="text-gray-600 text-sm mt-1">
                                        Please visit the passport office again with all required documents.
                                      </p>
                                    );

                                    let message;
                                    let colorClass;

                                    switch (stage.title) {
                                      case "pov_success":
                                        message = "Your second passport office visit was completed successfully. Your application is being processed further.";
                                        colorClass = "text-green-600";
                                        break;
                                      case "pov_failed":
                                        message = "Your second passport office visit was unsuccessful. Please contact support for further assistance.";
                                        colorClass = "text-red-600";
                                        break;
                                      case "pov_insufficient_documents":
                                        message = "Your second visit was marked incomplete due to missing required documents. Please schedule another appointment.";
                                        colorClass = "text-yellow-600";
                                        break;
                                      default:
                                        message = "Please visit the passport office again with all required documents.";
                                        colorClass = "text-gray-600";
                                    }

                                    return (
                                      <>
                                        <p className="text-gray-600 text-sm mt-1">
                                          {message}
                                        </p>
                                        <p className={`text-sm mt-1 ${colorClass}`}>
                                          {stage.date || "Pending"}
                                        </p>
                                      </>
                                    );
                                  })()}
                                </div>
                              </div>

                              {/* Check if second POV failed or had insufficient documents */}
                              {(() => {
                                const secondPovStage = applicationProgress?.stages?.[6];
                                if (secondPovStage?.title === "pov_failed" || secondPovStage?.title === "pov_insufficient_documents") {
                                  return (
                                    <>
                                      {/* Second Appointment Rescheduled */}
                                      <div className="flex gap-4">
                                        <div className="relative z-10">
                                          <div
                                            className={`rounded-full ${(() => {
                                              const stage = applicationProgress?.stages?.[7];
                                              if (!stage) return "bg-gray-100 border-gray-50";
                                              return stage.completed ? "bg-green-100 border-green-50" : "bg-blue-100 border-blue-50";
                                            })()} p-3 border-4`}
                                          >
                                            {(() => {
                                              const stage = applicationProgress?.stages?.[7];
                                              if (!stage) return <Clock className="h-5 w-5 text-gray-400" />;
                                              return stage.completed ? 
                                                <CheckCircle className="h-5 w-5 text-green-600" /> :
                                                <Clock className="h-5 w-5 text-blue-600" />;
                                            })()}
                                          </div>
                                        </div>
                                        <div className="flex-1 pt-2">
                                          <h4 className="font-medium text-base">
                                            Appointment Rescheduled 2
                                          </h4>
                                          <p className="text-gray-600 text-sm mt-1">
                                            Your appointment has been rescheduled for another passport office visit.
                                          </p>
                                          <p className={`text-sm mt-1 ${(() => {
                                            const stage = applicationProgress?.stages?.[7];
                                            return stage?.completed ? "text-green-600" : "text-blue-600";
                                          })()}`}>
                                            {applicationProgress?.stages?.[7]?.date || "Pending"}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Third Passport Office Visit */}
                                      <div className="flex gap-4">
                                        <div className="relative z-10">
                                          <div
                                            className={`rounded-full ${(() => {
                                              const stage = applicationProgress?.stages?.[8];
                                              if (!stage) return "bg-gray-100 border-gray-50";
                                              
                                              if (stage.title === "pov_success") {
                                                return "bg-green-100 border-green-50";
                                              } else if (stage.title === "pov_failed") {
                                                return "bg-red-100 border-red-50";
                                              } else if (stage.title === "pov_insufficient_documents") {
                                                return "bg-yellow-100 border-yellow-50";
                                              }
                                              
                                              return "bg-gray-100 border-gray-50";
                                            })()} p-3 border-4`}
                                          >
                                            {(() => {
                                              const stage = applicationProgress?.stages?.[8];
                                              if (!stage) return <Clock className="h-5 w-5 text-gray-400" />;

                                              if (stage.title === "pov_success") {
                                                return <CheckCircle className="h-5 w-5 text-green-600" />;
                                              } else if (stage.title === "pov_failed") {
                                                return <XCircle className="h-5 w-5 text-red-600" />;
                                              } else if (stage.title === "pov_insufficient_documents") {
                                                return <AlertCircle className="h-5 w-5 text-yellow-600" />;
                                              }

                                              return <Clock className="h-5 w-5 text-gray-400" />;
                                            })()}
                                          </div>
                                        </div>
                                        <div className="flex-1 pt-2">
                                          <h4 className="font-medium text-base">
                                            {(() => {
                                              const stage = applicationProgress?.stages?.[8];
                                              if (!stage) return "Third Passport Office Visit";

                                              switch (stage.title) {
                                                case "pov_success":
                                                  return "Third Passport Office Visit Successful";
                                                case "pov_failed":
                                                  return "Third Passport Office Visit Failed";
                                                case "pov_insufficient_documents":
                                                  return "Third Passport Office Visit - Insufficient Documents";
                                                default:
                                                  return "Third Passport Office Visit";
                                              }
                                            })()}
                                          </h4>
                                          {(() => {
                                            const stage = applicationProgress?.stages?.[8];
                                            if (!stage) return (
                                              <p className="text-gray-600 text-sm mt-1">
                                                Please visit the passport office again with all required documents.
                                              </p>
                                            );

                                            let message;
                                            let colorClass;

                                            switch (stage.title) {
                                              case "pov_success":
                                                message = "Your third passport office visit was completed successfully. Your application is being processed further.";
                                                colorClass = "text-green-600";
                                                break;
                                              case "pov_failed":
                                                message = "Your third passport office visit was unsuccessful. Please contact support for further assistance.";
                                                colorClass = "text-red-600";
                                                break;
                                              case "pov_insufficient_documents":
                                                message = "Your third visit was marked incomplete due to missing required documents. Please schedule another appointment.";
                                                colorClass = "text-yellow-600";
                                                break;
                                              default:
                                                message = "Please visit the passport office again with all required documents.";
                                                colorClass = "text-gray-600";
                                            }

                                            return (
                                              <>
                                                <p className="text-gray-600 text-sm mt-1">
                                                  {message}
                                                </p>
                                                <p className={`text-sm mt-1 ${colorClass}`}>
                                                  {stage.date || "Pending"}
                                                </p>
                                              </>
                                            );
                                          })()}
                                        </div>
                                      </div>

                                      {/* Check if third POV failed or had insufficient documents */}
                                      {(() => {
                                        const thirdPovStage = applicationProgress?.stages?.[8];
                                        if (thirdPovStage?.title === "pov_failed" || thirdPovStage?.title === "pov_insufficient_documents") {
                                          return (
                                            <>
                                              {/* Third Appointment Rescheduled */}
                                              <div className="flex gap-4">
                                                <div className="relative z-10">
                                                  <div
                                                    className={`rounded-full ${(() => {
                                                      const stage = applicationProgress?.stages?.[9];
                                                      if (!stage) return "bg-gray-100 border-gray-50";
                                                      return stage.completed ? "bg-green-100 border-green-50" : "bg-blue-100 border-blue-50";
                                                    })()} p-3 border-4`}
                                                  >
                                                    {(() => {
                                                      const stage = applicationProgress?.stages?.[9];
                                                      if (!stage) return <Clock className="h-5 w-5 text-gray-400" />;
                                                      return stage.completed ? 
                                                        <CheckCircle className="h-5 w-5 text-green-600" /> :
                                                        <Clock className="h-5 w-5 text-blue-600" />;
                                                    })()}
                                                  </div>
                                                </div>
                                                <div className="flex-1 pt-2">
                                                  <h4 className="font-medium text-base">
                                                    Appointment Rescheduled 3
                                                  </h4>
                                                  <p className="text-gray-600 text-sm mt-1">
                                                    Your appointment has been rescheduled for a final passport office visit.
                                                  </p>
                                                  <p className={`text-sm mt-1 ${(() => {
                                                    const stage = applicationProgress?.stages?.[9];
                                                    return stage?.completed ? "text-green-600" : "text-blue-600";
                                                  })()}`}>
                                                    {applicationProgress?.stages?.[9]?.date || "Pending"}
                                                  </p>
                                                </div>
                                              </div>

                                              {/* Fourth Passport Office Visit */}
                                              <div className="flex gap-4">
                                                <div className="relative z-10">
                                                  <div
                                                    className={`rounded-full ${(() => {
                                                      const stage = applicationProgress?.stages?.[10];
                                                      if (!stage) return "bg-gray-100 border-gray-50";
                                                      
                                                      if (stage.title === "pov_success") {
                                                        return "bg-green-100 border-green-50";
                                                      } else if (stage.title === "pov_failed") {
                                                        return "bg-red-100 border-red-50";
                                                      } else if (stage.title === "pov_insufficient_documents") {
                                                        return "bg-yellow-100 border-yellow-50";
                                                      }
                                                      
                                                      return "bg-gray-100 border-gray-50";
                                                    })()} p-3 border-4`}
                                                  >
                                                    {(() => {
                                                      const stage = applicationProgress?.stages?.[10];
                                                      if (!stage) return <Clock className="h-5 w-5 text-gray-400" />;

                                                      if (stage.title === "pov_success") {
                                                        return <CheckCircle className="h-5 w-5 text-green-600" />;
                                                      } else if (stage.title === "pov_failed") {
                                                        return <XCircle className="h-5 w-5 text-red-600" />;
                                                      } else if (stage.title === "pov_insufficient_documents") {
                                                        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
                                                      }

                                                      return <Clock className="h-5 w-5 text-gray-400" />;
                                                    })()}
                                                  </div>
                                                </div>
                                                <div className="flex-1 pt-2">
                                                  <h4 className="font-medium text-base">
                                                    {(() => {
                                                      const stage = applicationProgress?.stages?.[10];
                                                      if (!stage) return "Final Passport Office Visit";

                                                      switch (stage.title) {
                                                        case "pov_success":
                                                          return "Final Passport Office Visit Successful";
                                                        case "pov_failed":
                                                          return "Final Passport Office Visit Failed";
                                                        case "pov_insufficient_documents":
                                                          return "Final Passport Office Visit - Insufficient Documents";
                                                        default:
                                                          return "Final Passport Office Visit";
                                                      }
                                                    })()}
                                                  </h4>
                                                  {(() => {
                                                    const stage = applicationProgress?.stages?.[10];
                                                    if (!stage) return (
                                                      <p className="text-gray-600 text-sm mt-1">
                                                        Please visit the passport office for your final scheduled appointment with all required documents.
                                                      </p>
                                                    );

                                                    let message;
                                                    let colorClass;

                                                    switch (stage.title) {
                                                      case "pov_success":
                                                        message = "Your final passport office visit was completed successfully. Your application is being processed further.";
                                                        colorClass = "text-green-600";
                                                        break;
                                                      case "pov_failed":
                                                        message = "Your final passport office visit was unsuccessful. Your application may be rejected. Please contact support immediately.";
                                                        colorClass = "text-red-600";
                                                        break;
                                                      case "pov_insufficient_documents":
                                                        message = "Your final visit was marked incomplete due to missing required documents. Your application may be on hold. Please contact support immediately.";
                                                        colorClass = "text-yellow-600";
                                                        break;
                                                      default:
                                                        message = "Please visit the passport office for your final appointment with all required documents.";
                                                        colorClass = "text-gray-600";
                                                    }

                                                    return (
                                                      <>
                                                        <p className="text-gray-600 text-sm mt-1">
                                                          {message}
                                                        </p>
                                                        <p className={`text-sm mt-1 ${colorClass}`}>
                                                          {stage.date || "Pending"}
                                                        </p>
                                                      </>
                                                    );
                                                  })()}
                                                </div>
                                              </div>
                                            </>
                                          );
                                        }
                                        return null;
                                      })()}
                                    </>
                                  );
                                }
                                return null;
                              })()}
                            </>
                          );
                        }
                        return null;
                      })()}
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>         
        </Card>
      </motion.div>   

      {/* Help and support */}
      <motion.div variants={itemVariants}>
        <Card className="bg-navy/5 border-0">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col text-center md:text-left md:flex-row gap-6 items-center">
              <div className="flex-1 w-full">
                <h3 className="text-xl font-semibold text-navy">Need Help?</h3>
                <p className="text-muted-foreground mt-2">
                  Our support team is available to assist you with any questions
                  about your passport application.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                <Button
                  variant="outline"
                  className="w-full md:w-auto rounded-xl border-navy/20 hover:bg-navy/5"
                  asChild
                >
                  <Link href="/portal/faq">
                    <HelpCircle className="h-4 w-4 mr-2 hidden sm:block" />
                    View FAQs
                  </Link>
                </Button>
                <Button
                  className="w-full md:w-auto bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl"
                  asChild
                >
                  <Link href="/portal/support">
                    <Bell className="h-4 w-4 mr-2 hidden sm:block" />
                    Contact Support
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
