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
import React, { useEffect, useState } from "react";
import { ApplicationProgress, ApplicationStage } from "@/app/types/application";
import { handleApiAuthError } from "@/lib/clientAuthUtils";
import axiosServer from "@/lib/axiosServer";
import { useRouter } from "next/navigation";

export default function PortalDashboard() {
  const router = useRouter();
  const [applicationProgress, setApplicationProgress] =
    useState<ApplicationProgress | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const res = await axiosServer.get("/application-progress/status", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.status) {
        setProgressData(res.data.data || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const remarkMap = React.useMemo(() => {
    const map: Record<string, any> = {};

    progressData?.forEach((item: any) => {
      if (item?.slug) {
        map[item.slug] = item;
      }
    });

    return map;
  }, [progressData]);

  const getRemarkBySlug = (slug: string) => {
    return remarkMap?.[slug]?.remark || ""; // ✅ no fallback text
  };

  const renderRemark = (slug: string) => {
    const item = remarkMap?.[slug];

    if (!item?.remark && !item?.file_url) return null;

    return (
      <div className="text-gray-600 text-sm mt-1 flex items-center gap-2">
        {/* Remark text */}
        {item?.remark && (
          <span>
            {item.remark.length > 50 ? (
              <>
                {item.remark.substring(0, 50)}...
                <a
                  href="/portal/application-status"
                  className="text-blue-600 ml-1"
                >
                  Read Remark
                </a>
              </>
            ) : (
              item.remark
            )}
          </span>
        )}
      </div>
    );
  };

  // Stage helper functions

  const findStage = (title: string): ApplicationStage | null => {
    if (!applicationProgress?.stages) return null;

    const searchTitle = title.toLowerCase();

    return (
      applicationProgress.stages.find(
        (s) => s?.title?.toLowerCase() === searchTitle,
      ) || null
    );
  };

  const findStageStatus = (title: string): string => {
    const stage = findStage(title);

    if (!stage) return "bg-gray-100 border-gray-50";

    if (stage.completed) {
      return "bg-green-100 border-green-50";
    }

    const currentStage = applicationProgress?.stages.find((s) => !s.completed);

    if (stage.title === currentStage?.title) {
      return "bg-blue-100 border-blue-50";
    }

    return "bg-gray-100 border-gray-50";
  };

  const isStageCompleted = (title: string): boolean => {
    return findStage(title)?.completed || false;
  };

  const isCurrentStage = (title: string): boolean => {
    const currentStage = applicationProgress?.stages.find((s) => !s.completed);
    return currentStage?.title === title;
  };

  const getStageTextClass = (title: string): string => {
    if (!applicationProgress?.stages) return "text-gray-600";

    // completed OR current → normal text
    if (isStageCompleted(title) || isCurrentStage(title)) {
      return "";
    }

    // not reached yet → faded text
    return "text-gray-600";
  };

  const getStageTextColorClass = (title: string): string => {
    if (isStageCompleted(title)) return "text-green-600";
    if (isCurrentStage(title)) return "text-blue-600";
    return "text-gray-400";
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";

    // Fix Laravel formats
    let cleaned = dateString.replace(" ", "T");
    cleaned = cleaned.split(".")[0];

    const date = new Date(cleaned);

    if (isNaN(date.getTime())) return "";

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStageDate = (title: string): string => {
    const stage = findStage(title);
    if (!stage?.date) return "";
    return formatDate(stage.date);
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

  const handleDownloadInvoice = async () => {
    if (!data?.invoice?.id || !data?.customer?.id) return;

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You are not authenticated!");
      router.replace("/signin");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      const response = await axiosServer.get(`/invoice/${data.customer.id}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!(response.data instanceof Blob)) {
        throw new Error("Invalid file response");
      }

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `INV_${data.invoice.id}.pdf`);

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error("Download error:", err);

      if (err.response?.data) {
        const reader = new FileReader();
        reader.onload = () => {
          console.log("Server error:", reader.result);
        };
        reader.readAsText(err.response.data);
      }

      alert("Download failed");
    }
  };

  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case "upi":
        return "UPI";
      case "card":
        return "Credit/Debit Card";
      case "netbanking":
        return "Net Banking";
      case "wallet":
        return "Wallet";
      default:
        return method;
    }
  };

  const getProgressPercentage = () => {
    // ✅ If no data → still show 10% (Application Submitted)
    if (!applicationProgress?.stages?.length) return 10;

    const stages = applicationProgress.stages;

    // ✅ Case 1: success → 100%
    const hasSuccess = stages.some((s) => s?.title === "pov_success");
    if (hasSuccess) return 100;

    // ✅ Case 2: final attempt reached
    const finalStage = stages[10];
    if (
      finalStage &&
      finalStage.date &&
      ["pov_failed", "pov_insufficient_documents"].includes(finalStage.title)
    ) {
      return 100;
    }

    // ✅ Count completed stages
    const completedCount = stages.filter((s) => s?.date).length;

    // ✅ Always minimum 10%
    const progressMap = [10, 30, 50, 70, 85, 95];

    return progressMap[Math.min(completedCount, progressMap.length - 1)] || 10;
  };

  const getEstimatedCompletionDate = () => {
    const estimated = applicationProgress?.estimated_completion;

    // ❗ ignore invalid backend values
    if (
      estimated &&
      estimated.toLowerCase() !== "unknown" &&
      estimated.toLowerCase() !== "n/a"
    ) {
      return estimated;
    }

    // fallback → +8 days from created_at
    const createdAt = applicationProgress?.created_at;

    if (!createdAt) return "N/A";

    const date = new Date(createdAt);
    date.setDate(date.getDate() + 8);

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const estimatedDate = getEstimatedCompletionDate();
  const progress = getProgressPercentage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setIsChecking(true);

        const token = localStorage.getItem("authToken");

        if (!token) {
          router.replace("/signin");
          return;
        }

        const res = await fetch("/api/application-details", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.error || "Failed to load application");
        }

        setData(result);

        const [progressRes, profileRes] = await Promise.all([
          fetch("/api/application-progress", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then(async (res) => {
            if (!res.ok) throw new Error("Progress fetch failed");
            return res.json();
          }),

          fetch("/api/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then(async (res) => {
            if (!res.ok) throw new Error("Profile fetch failed");
            return res.json();
          }),
        ]);

        setApplicationProgress(progressRes);
        setProfile(profileRes?.data || profileRes);
      } catch (err: any) {
        console.error("ERROR : ", err);

        if (
          err.message?.includes("401") ||
          err.message?.toLowerCase().includes("unauthorized")
        ) {
          localStorage.removeItem("authToken");
          router.replace("/signin");
        } else {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
        setIsChecking(false);
      }
    };

    fetchData();
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
            Welcome,{" "}
            {profile
              ? profile.first_name
                ? `${profile.first_name} ${profile.last_name ?? ""}`
                : profile.name || "User"
              : "User"}
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
                  Passport Application - #{data?.invoice?.inv_no ?? "N/A"}
                </span>
                <span className="md:hidden">Passport Application</span>
                <span className="self-end px-3 py-1 bg-teal/20 text-teal rounded-full text-sm font-medium ml-2">
                  {data?.progress?.current_stage
                    ? `${data.progress.current_stage.label}`
                    : "pending"}
                </span>
              </CardTitle>
              <div className="flex flex-row md:hidden gap-2 items-start">
                <span className="text-muted-foreground">
                  #{data?.invoice?.inv_no ?? "N/A"}
                </span>
              </div>
            </div>
            <CardDescription>
              Submitted on{" "}
              {data?.invoice?.created_at
                ? new Date(data.invoice.created_at).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )
                : "N/A"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                {/* Application Details */}
                <div className="bg-white rounded-lg p-4 border">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Application Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">
                        {data?.service?.service_name ?? "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Book Size:</span>
                      <span className="font-medium">
                        {data?.service?.service_name?.includes("36 pages")
                          ? "36 Pages"
                          : "60 Pages"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Applicant:</span>
                      <span className="font-medium">
                        {data?.customer
                          ? `${data.customer.first_name} ${data.customer.last_name}`
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Current Stage:
                      </span>
                      <span className="font-medium text-teal">
                        {data?.progress?.current_stage
                          ? `${data.progress.current_stage.label}`
                          : "pending"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white rounded-lg p-4 border">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Payment Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Amount Paid:
                      </span>
                      <span className="font-medium">
                        Rs {data?.invoice?.total_amount ?? "0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Payment Method:
                      </span>
                      <span className="font-medium">
                        {data?.payment?.payment_mode
                          ? formatPaymentMethod(data.payment.payment_mode)
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Transaction ID:
                      </span>
                      <span className="font-medium">
                        {data?.invoice?.id ?? "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Receipt:</span>
                      <button
                        onClick={handleDownloadInvoice}
                        className="text-navy hover:underline flex items-center"
                      >
                        <Download className="h-3 w-3 mr-1" /> Download
                      </button>
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
                        {loading ? "Loading..." : `${progress}% Complete`}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-navy">
                        {loading
                          ? "Loading..."
                          : `Estimated completion: ${estimatedDate}`}
                      </span>
                    </div>
                  </div>

                  <div className="overflow-hidden h-2 text-xs flex rounded-full bg-navy/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-navy to-teal"
                    />
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
                          <h4 className={`font-medium text-base`}>
                            Application Submitted
                          </h4>
                          <p className="text-gray-600 text-sm mt-1">
                            Your application was successfully submitted and
                            payment was processed.
                          </p>
                          <p className="text-sm mt-1 text-green-600">
                            {applicationProgress?.created_at
                              ? new Date(
                                  applicationProgress.created_at,
                                ).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })
                              : ""}
                          </p>
                        </div>
                      </div>

                      {/* In Process */}
                      <div className="flex gap-4">
                        <div className="relative z-10">
                          <div
                            className={`rounded-full ${findStageStatus("in_process")} p-3 border-4`}
                          >
                            {isStageCompleted("in_process") ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : isCurrentStage("in_process") ? (
                              <Clock className="h-5 w-5 text-blue-600" />
                            ) : (
                              <Clock className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1 pt-2">
                          <h4
                            className={`font-medium text-base ${getStageTextClass("in_process")}`}
                          >
                            In Process
                          </h4>
                          <p className="text-gray-600 text-sm mt-1">
                            Your application is currently being processed.
                          </p>
                          {renderRemark("in_process")}
                          <p
                            className={`text-sm mt-1 ${getStageTextColorClass("in_process")}`}
                          >
                            {getStageDate("in_process") || "Pending"}
                          </p>
                        </div>
                      </div>

                      {/* Document Submitted */}
                      <div className="flex gap-4">
                        <div className="relative z-10">
                          <div
                            className={`rounded-full ${findStageStatus("documents_submitted")} p-3 border-4`}
                          >
                            {isStageCompleted("documents_submitted") ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : isCurrentStage("documents_submitted") ? (
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
                            )}`}
                          >
                            Document Submitted
                          </h4>
                          <p className="text-gray-600 text-sm mt-1">
                            Your documents have been successfully submitted for
                            verification.
                          </p>
                          {renderRemark("documents_submitted")}
                          <p
                            className={`text-sm mt-1 ${getStageTextColorClass("documents_submitted")}`}
                          >
                            {getStageDate("documents_submitted") || "Pending"}
                          </p>
                        </div>
                      </div>

                      {/* Details verification */}
                      <div className="flex gap-4">
                        <div className="relative z-10">
                          <div
                            className={`rounded-full ${findStageStatus("details_verification")} p-3 border-4`}
                          >
                            {isStageCompleted("details_verification") ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : isCurrentStage("details_verification") ? (
                              <Clock className="h-5 w-5 text-blue-600" />
                            ) : (
                              <Clock className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1 pt-2">
                          {/* <h4
                            className={`font-medium text-base ${getStageTextClass("details_verification")}`}
                          >
                            Details verification
                          </h4> */}
                          <h4
                            className={`font-medium text-base flex items-center gap-2 ${getStageTextClass(
                              "details_verification",
                            )}`}
                          >
                            Details Verification
                            {remarkMap?.["details_verification"]?.file_url && (
                              <a
                                href={
                                  remarkMap["details_verification"].file_url
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View File"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-1 text-blue-600 ml-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                              </a>
                            )}
                          </h4>
                          <p className="text-gray-600 text-sm mt-1">
                            Your application details are being verified.
                          </p>
                          {renderRemark("details_verification")}
                          <p
                            className={`text-sm mt-1 ${getStageTextColorClass("details_verification")}`}
                          >
                            {getStageDate("details_verification") || "Pending"}
                          </p>
                        </div>
                      </div>

                      {/* Appointment scheduled */}
                      <div className="flex gap-4">
                        <div className="relative z-10">
                          <div
                            className={`rounded-full ${findStageStatus("appointment_scheduled")} p-3 border-4`}
                          >
                            {isStageCompleted("appointment_scheduled") ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : isCurrentStage("appointment_scheduled") ? (
                              <Clock className="h-5 w-5 text-blue-600" />
                            ) : (
                              <Clock className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1 pt-2">
                          <h4
                            className={`font-medium text-base flex items-center gap-2 ${getStageTextClass(
                              "appointment_scheduled",
                            )}`}
                          >
                            Appointment Scheduled
                            {remarkMap?.["appointment_scheduled"]?.file_url && (
                              <a
                                href={
                                  remarkMap["appointment_scheduled"].file_url
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View File"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-1 text-blue-600 ml-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                              </a>
                            )}
                          </h4>
                          <p className="text-gray-600 text-sm mt-1">
                            Your appointment has been scheduled for document
                            verification and biometric data collection.
                          </p>
                          {renderRemark("appointment_scheduled")}
                          <p
                            className={`text-sm mt-1 ${getStageTextColorClass("appointment_scheduled")}`}
                          >
                            {getStageDate("appointment_scheduled") || "Pending"}
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
                              } else if (
                                stage.title === "pov_insufficient_documents"
                              ) {
                                return "bg-yellow-100 border-yellow-50";
                              }

                              return "bg-gray-100 border-gray-50";
                            })()} p-3 border-4`}
                          >
                            {(() => {
                              const stage = applicationProgress?.stages?.[4];
                              if (!stage)
                                return (
                                  <Clock className="h-5 w-5 text-gray-400" />
                                );

                              if (stage.title === "pov_success") {
                                return (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                );
                              } else if (stage.title === "pov_failed") {
                                return (
                                  <XCircle className="h-5 w-5 text-red-600" />
                                );
                              } else if (
                                stage.title === "pov_insufficient_documents"
                              ) {
                                return (
                                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                                );
                              }

                              return (
                                <Clock className="h-5 w-5 text-gray-400" />
                              );
                            })()}
                          </div>
                        </div>
                        <div className="flex-1 pt-2">
                          <h4
                            className={`font-medium text-base ${getStageTextClass("appointment_scheduled")}`}
                          >
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
                            if (!stage)
                              return (
                                <p className="text-gray-600 text-sm mt-1">
                                  Please visit the passport office with all
                                  required documents for verification and
                                  biometric data collection.
                                </p>
                              );

                            let message;
                            let colorClass;

                            switch (stage.title) {
                              case "pov_success":
                                message =
                                  "Your passport office visit was completed successfully. Your application is being processed further.";
                                colorClass = "text-green-600";
                                break;
                              case "pov_failed":
                                message =
                                  "Your passport office visit was unsuccessful. Please contact support for assistance and next steps.";
                                colorClass = "text-red-600";
                                break;
                              case "pov_insufficient_documents":
                                message =
                                  "Your visit was marked incomplete due to missing required documents. Please review the document checklist and schedule another visit.";
                                colorClass = "text-yellow-600";
                                break;
                              default:
                                message =
                                  "Please visit the passport office with all required documents for verification and biometric data collection.";
                                colorClass = "text-gray-600";
                            }

                            return (
                              <>
                                <p className="text-gray-600 text-sm mt-1">
                                  {message}
                                </p>
                                {(() => {
                                  let slug = "";

                                  switch (stage.title) {
                                    case "pov_success":
                                      slug = "pov_success";
                                      break;
                                    case "pov_failed":
                                      slug = "pov_failed";
                                      break;
                                    case "pov_insufficient_documents":
                                      slug = "pov_insufficient_documents";
                                      break;
                                    default:
                                      slug = "pov";
                                  }

                                  return renderRemark(slug);
                                })()}

                                {/* ✅ Existing date */}
                                <p className={`text-sm mt-1 ${colorClass}`}>
                                  {getStageDate(stage.title) || "Pending"}
                                </p>
                              </>
                            );
                          })()}
                        </div>
                      </div>

                      {/* Show Appointment Reschedule and Second POV if first POV failed or had insufficient documents */}
                      {(() => {
                        const povStage = applicationProgress?.stages?.[4];
                        if (
                          povStage?.title === "pov_failed" ||
                          povStage?.title === "pov_insufficient_documents"
                        ) {
                          return (
                            <>
                              {/* First Appointment Rescheduled */}
                              <div className="flex gap-4">
                                <div className="relative z-10">
                                  <div
                                    className={`rounded-full ${(() => {
                                      const stage =
                                        applicationProgress?.stages?.[5];
                                      if (!stage)
                                        return "bg-gray-100 border-gray-50";
                                      return stage.completed
                                        ? "bg-green-100 border-green-50"
                                        : "bg-blue-100 border-blue-50";
                                    })()} p-3 border-4`}
                                  >
                                    {(() => {
                                      const stage =
                                        applicationProgress?.stages?.[5];
                                      if (!stage)
                                        return (
                                          <Clock className="h-5 w-5 text-gray-400" />
                                        );
                                      return stage.completed ? (
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                      ) : (
                                        <Clock className="h-5 w-5 text-blue-600" />
                                      );
                                    })()}
                                  </div>
                                </div>
                                <div className="flex-1 pt-2">
                                  <h4
                                    className={`font-medium text-base ${getStageTextClass("appointment_rescheduled1")}`}
                                  ></h4>
                                  <h4
                                    className={`font-medium text-base flex items-center gap-2 ${getStageTextClass(
                                      "appointment_rescheduled1",
                                    )}`}
                                  >
                                    Appointment Rescheduled 1
                                    {remarkMap?.["appointment_rescheduled1"]
                                      ?.file_url && (
                                      <a
                                        href={
                                          remarkMap["appointment_rescheduled1"]
                                            .file_url
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="View File"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-4 w-4 mr-1 text-blue-600 ml-1"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          strokeWidth={2}
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                          />
                                        </svg>
                                      </a>
                                    )}
                                  </h4>
                                  <p className="text-gray-600 text-sm mt-1">
                                    Your appointment has been rescheduled for
                                    another passport office visit.
                                  </p>
                                  {renderRemark("appointment_rescheduled1")}
                                  <p
                                    className={`text-sm mt-1 ${(() => {
                                      const stage =
                                        applicationProgress?.stages?.[5];
                                      return stage?.completed
                                        ? "text-green-600"
                                        : "text-blue-600";
                                    })()}`}
                                  >
                                    {getStageDate("appointment_rescheduled1") ||
                                      "Pending"}
                                  </p>
                                </div>
                              </div>

                              {/* Second Passport Office Visit */}
                              <div className="flex gap-4">
                                <div className="relative z-10">
                                  <div
                                    className={`rounded-full ${(() => {
                                      const stage =
                                        applicationProgress?.stages?.[6];
                                      if (!stage)
                                        return "bg-gray-100 border-gray-50";

                                      if (stage.title === "pov_success") {
                                        return "bg-green-100 border-green-50";
                                      } else if (stage.title === "pov_failed") {
                                        return "bg-red-100 border-red-50";
                                      } else if (
                                        stage.title ===
                                        "pov_insufficient_documents"
                                      ) {
                                        return "bg-yellow-100 border-yellow-50";
                                      }

                                      return "bg-gray-100 border-gray-50";
                                    })()} p-3 border-4`}
                                  >
                                    {(() => {
                                      const stage =
                                        applicationProgress?.stages?.[6];
                                      if (!stage)
                                        return (
                                          <Clock className="h-5 w-5 text-gray-400" />
                                        );

                                      if (stage.title === "pov_success") {
                                        return (
                                          <CheckCircle className="h-5 w-5 text-green-600" />
                                        );
                                      } else if (stage.title === "pov_failed") {
                                        return (
                                          <XCircle className="h-5 w-5 text-red-600" />
                                        );
                                      } else if (
                                        stage.title ===
                                        "pov_insufficient_documents"
                                      ) {
                                        return (
                                          <AlertCircle className="h-5 w-5 text-yellow-600" />
                                        );
                                      }

                                      return (
                                        <Clock className="h-5 w-5 text-gray-400" />
                                      );
                                    })()}
                                  </div>
                                </div>
                                <div className="flex-1 pt-2">
                                  <h4
                                    className={`font-medium text-base ${getStageTextClass("appointment_scheduled")}`}
                                  >
                                    {(() => {
                                      const stage =
                                        applicationProgress?.stages?.[6];
                                      if (!stage)
                                        return "Second Passport Office Visit";

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
                                    const stage =
                                      applicationProgress?.stages?.[6];
                                    if (!stage)
                                      return (
                                        <p className="text-gray-600 text-sm mt-1">
                                          Please visit the passport office again
                                          with all required documents.
                                        </p>
                                      );

                                    let message;
                                    let colorClass;

                                    switch (stage.title) {
                                      case "pov_success":
                                        message =
                                          "Your second passport office visit was completed successfully. Your application is being processed further.";
                                        colorClass = "text-green-600";
                                        break;
                                      case "pov_failed":
                                        message =
                                          "Your second passport office visit was unsuccessful. Please contact support for further assistance.";
                                        colorClass = "text-red-600";
                                        break;
                                      case "pov_insufficient_documents":
                                        message =
                                          "Your second visit was marked incomplete due to missing required documents. Please schedule another appointment.";
                                        colorClass = "text-yellow-600";
                                        break;
                                      default:
                                        message =
                                          "Please visit the passport office again with all required documents.";
                                        colorClass = "text-gray-600";
                                    }

                                    return (
                                      <>
                                        <p className="text-gray-600 text-sm mt-1">
                                          {message}
                                        </p>

                                        {(() => {
                                          let slug = "";

                                          switch (stage.title) {
                                            case "pov_success":
                                              slug = "pov_success";
                                              break;
                                            case "pov_failed":
                                              slug = "pov_failed";
                                              break;
                                            case "pov_insufficient_documents":
                                              slug =
                                                "pov_insufficient_documents";
                                              break;
                                            default:
                                              slug = "pov";
                                          }

                                          return renderRemark(slug);
                                        })()}

                                        {/* ✅ Existing date */}
                                        <p
                                          className={`text-sm mt-1 ${colorClass}`}
                                        >
                                          {getStageDate(stage.title) ||
                                            "Pending"}
                                        </p>
                                      </>
                                    );
                                  })()}
                                </div>
                              </div>

                              {/* Check if second POV failed or had insufficient documents */}
                              {(() => {
                                const secondPovStage =
                                  applicationProgress?.stages?.[6];
                                if (
                                  secondPovStage?.title === "pov_failed" ||
                                  secondPovStage?.title ===
                                    "pov_insufficient_documents"
                                ) {
                                  return (
                                    <>
                                      {/* Second Appointment Rescheduled */}
                                      <div className="flex gap-4">
                                        <div className="relative z-10">
                                          <div
                                            className={`rounded-full ${(() => {
                                              const stage =
                                                applicationProgress
                                                  ?.stages?.[7];
                                              if (!stage)
                                                return "bg-gray-100 border-gray-50";
                                              return stage.completed
                                                ? "bg-green-100 border-green-50"
                                                : "bg-blue-100 border-blue-50";
                                            })()} p-3 border-4`}
                                          >
                                            {(() => {
                                              const stage =
                                                applicationProgress
                                                  ?.stages?.[7];
                                              if (!stage)
                                                return (
                                                  <Clock className="h-5 w-5 text-gray-400" />
                                                );
                                              return stage.completed ? (
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                              ) : (
                                                <Clock className="h-5 w-5 text-blue-600" />
                                              );
                                            })()}
                                          </div>
                                        </div>
                                        <div className="flex-1 pt-2">
                                          <h4
                                            className={`font-medium text-base flex items-center gap-2 ${getStageTextClass(
                                              "appointment_rescheduled2",
                                            )}`}
                                          >
                                            Appointment Rescheduled 2
                                            {remarkMap?.[
                                              "appointment_rescheduled2"
                                            ]?.file_url && (
                                              <a
                                                href={
                                                  remarkMap[
                                                    "appointment_rescheduled2"
                                                  ].file_url
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="View File"
                                              >
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  className="h-4 w-4 mr-1 text-blue-600 ml-1"
                                                  fill="none"
                                                  viewBox="0 0 24 24"
                                                  stroke="currentColor"
                                                  strokeWidth={2}
                                                >
                                                  <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                  />
                                                </svg>
                                              </a>
                                            )}
                                          </h4>
                                          <p className="text-gray-600 text-sm mt-1">
                                            Your appointment has been
                                            rescheduled for another passport
                                            office visit.
                                          </p>
                                          {renderRemark(
                                            "appointment_rescheduled2",
                                          )}
                                          <p
                                            className={`text-sm mt-1 ${(() => {
                                              const stage =
                                                applicationProgress
                                                  ?.stages?.[7];
                                              return stage?.completed
                                                ? "text-green-600"
                                                : "text-blue-600";
                                            })()}`}
                                          ></p>
                                          <p
                                            className={`text-sm mt-1 ${getStageTextColorClass("appointment_rescheduled2")}`}
                                          >
                                            {getStageDate(
                                              "appointment_rescheduled2",
                                            ) || "Pending"}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Third Passport Office Visit */}
                                      <div className="flex gap-4">
                                        <div className="relative z-10">
                                          <div
                                            className={`rounded-full ${(() => {
                                              const stage =
                                                applicationProgress
                                                  ?.stages?.[8];
                                              if (!stage)
                                                return "bg-gray-100 border-gray-50";

                                              if (
                                                stage.title === "pov_success"
                                              ) {
                                                return "bg-green-100 border-green-50";
                                              } else if (
                                                stage.title === "pov_failed"
                                              ) {
                                                return "bg-red-100 border-red-50";
                                              } else if (
                                                stage.title ===
                                                "pov_insufficient_documents"
                                              ) {
                                                return "bg-yellow-100 border-yellow-50";
                                              }

                                              return "bg-gray-100 border-gray-50";
                                            })()} p-3 border-4`}
                                          >
                                            {(() => {
                                              const stage =
                                                applicationProgress
                                                  ?.stages?.[8];
                                              if (!stage)
                                                return (
                                                  <Clock className="h-5 w-5 text-gray-400" />
                                                );

                                              if (
                                                stage.title === "pov_success"
                                              ) {
                                                return (
                                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                                );
                                              } else if (
                                                stage.title === "pov_failed"
                                              ) {
                                                return (
                                                  <XCircle className="h-5 w-5 text-red-600" />
                                                );
                                              } else if (
                                                stage.title ===
                                                "pov_insufficient_documents"
                                              ) {
                                                return (
                                                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                                                );
                                              }

                                              return (
                                                <Clock className="h-5 w-5 text-gray-400" />
                                              );
                                            })()}
                                          </div>
                                        </div>
                                        <div className="flex-1 pt-2">
                                          <h4
                                            className={`font-medium text-base ${getStageTextClass("appointment_scheduled")}`}
                                          >
                                            {(() => {
                                              const stage =
                                                applicationProgress
                                                  ?.stages?.[8];
                                              if (!stage)
                                                return "Third Passport Office Visit";

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
                                            const stage =
                                              applicationProgress?.stages?.[8];
                                            if (!stage)
                                              return (
                                                <p className="text-gray-600 text-sm mt-1">
                                                  Please visit the passport
                                                  office again with all required
                                                  documents.
                                                </p>
                                              );

                                            let message;
                                            let colorClass;

                                            switch (stage.title) {
                                              case "pov_success":
                                                message =
                                                  "Your third passport office visit was completed successfully. Your application is being processed further.";
                                                colorClass = "text-green-600";
                                                break;
                                              case "pov_failed":
                                                message =
                                                  "Your third passport office visit was unsuccessful. Please contact support for further assistance.";
                                                colorClass = "text-red-600";
                                                break;
                                              case "pov_insufficient_documents":
                                                message =
                                                  "Your third visit was marked incomplete due to missing required documents. Please schedule another appointment.";
                                                colorClass = "text-yellow-600";
                                                break;
                                              default:
                                                message =
                                                  "Please visit the passport office again with all required documents.";
                                                colorClass = "text-gray-600";
                                            }

                                            return (
                                              <>
                                                <p className="text-gray-600 text-sm mt-1">
                                                  {message}
                                                </p>

                                                {(() => {
                                                  let slug = "";

                                                  switch (stage.title) {
                                                    case "pov_success":
                                                      slug = "pov_success";
                                                      break;
                                                    case "pov_failed":
                                                      slug = "pov_failed";
                                                      break;
                                                    case "pov_insufficient_documents":
                                                      slug =
                                                        "pov_insufficient_documents";
                                                      break;
                                                    default:
                                                      slug = "pov";
                                                  }

                                                  return renderRemark(slug);
                                                })()}

                                                {/* ✅ Existing date */}
                                                <p
                                                  className={`text-sm mt-1 ${colorClass}`}
                                                >
                                                  {getStageDate(stage.title) ||
                                                    "Pending"}
                                                </p>
                                              </>
                                            );
                                          })()}
                                        </div>
                                      </div>

                                      {/* Check if third POV failed or had insufficient documents */}
                                      {(() => {
                                        const thirdPovStage =
                                          applicationProgress?.stages?.[8];
                                        if (
                                          thirdPovStage?.title ===
                                            "pov_failed" ||
                                          thirdPovStage?.title ===
                                            "pov_insufficient_documents"
                                        ) {
                                          return (
                                            <>
                                              {/* Third Appointment Rescheduled */}
                                              <div className="flex gap-4">
                                                <div className="relative z-10">
                                                  <div
                                                    className={`rounded-full ${(() => {
                                                      const stage =
                                                        applicationProgress
                                                          ?.stages?.[9];
                                                      if (!stage)
                                                        return "bg-gray-100 border-gray-50";
                                                      return stage.completed
                                                        ? "bg-green-100 border-green-50"
                                                        : "bg-blue-100 border-blue-50";
                                                    })()} p-3 border-4`}
                                                  >
                                                    {(() => {
                                                      const stage =
                                                        applicationProgress
                                                          ?.stages?.[9];
                                                      if (!stage)
                                                        return (
                                                          <Clock className="h-5 w-5 text-gray-400" />
                                                        );
                                                      return stage.completed ? (
                                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                                      ) : (
                                                        <Clock className="h-5 w-5 text-blue-600" />
                                                      );
                                                    })()}
                                                  </div>
                                                </div>
                                                <div className="flex-1 pt-2">
                                                  <h4
                                                    className={`font-medium text-base flex items-center gap-2 ${getStageTextClass(
                                                      "appointment_rescheduled3",
                                                    )}`}
                                                  >
                                                    Appointment Rescheduled 3
                                                    {remarkMap?.[
                                                      "appointment_rescheduled3"
                                                    ]?.file_url && (
                                                      <a
                                                        href={
                                                          remarkMap[
                                                            "appointment_rescheduled3"
                                                          ].file_url
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        title="View File"
                                                      >
                                                        <svg
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          className="h-4 w-4 mr-1 text-blue-600 ml-1"
                                                          fill="none"
                                                          viewBox="0 0 24 24"
                                                          stroke="currentColor"
                                                          strokeWidth={2}
                                                        >
                                                          <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                          />
                                                        </svg>
                                                      </a>
                                                    )}
                                                  </h4>
                                                  <p className="text-gray-600 text-sm mt-1">
                                                    Your appointment has been
                                                    rescheduled for a final
                                                    passport office visit.
                                                  </p>
                                                  {renderRemark(
                                                    "appointment_rescheduled3",
                                                  )}
                                                  <p
                                                    className={`text-sm mt-1 ${(() => {
                                                      const stage =
                                                        applicationProgress
                                                          ?.stages?.[9];
                                                      return stage?.completed
                                                        ? "text-green-600"
                                                        : "text-blue-600";
                                                    })()}`}
                                                  >
                                                    {getStageDate(
                                                      "appointment_rescheduled3",
                                                    ) || "Pending"}
                                                  </p>
                                                </div>
                                              </div>

                                              {/* Fourth Passport Office Visit */}
                                              <div className="flex gap-4">
                                                <div className="relative z-10">
                                                  <div
                                                    className={`rounded-full ${(() => {
                                                      const stage =
                                                        applicationProgress
                                                          ?.stages?.[10];
                                                      if (!stage)
                                                        return "bg-gray-100 border-gray-50";

                                                      if (
                                                        stage.title ===
                                                        "pov_success"
                                                      ) {
                                                        return "bg-green-100 border-green-50";
                                                      } else if (
                                                        stage.title ===
                                                        "pov_failed"
                                                      ) {
                                                        return "bg-red-100 border-red-50";
                                                      } else if (
                                                        stage.title ===
                                                        "pov_insufficient_documents"
                                                      ) {
                                                        return "bg-yellow-100 border-yellow-50";
                                                      }

                                                      return "bg-gray-100 border-gray-50";
                                                    })()} p-3 border-4`}
                                                  >
                                                    {(() => {
                                                      const stage =
                                                        applicationProgress
                                                          ?.stages?.[10];
                                                      if (!stage)
                                                        return (
                                                          <Clock className="h-5 w-5 text-gray-400" />
                                                        );

                                                      if (
                                                        stage.title ===
                                                        "pov_success"
                                                      ) {
                                                        return (
                                                          <CheckCircle className="h-5 w-5 text-green-600" />
                                                        );
                                                      } else if (
                                                        stage.title ===
                                                        "pov_failed"
                                                      ) {
                                                        return (
                                                          <XCircle className="h-5 w-5 text-red-600" />
                                                        );
                                                      } else if (
                                                        stage.title ===
                                                        "pov_insufficient_documents"
                                                      ) {
                                                        return (
                                                          <AlertCircle className="h-5 w-5 text-yellow-600" />
                                                        );
                                                      }

                                                      return (
                                                        <Clock className="h-5 w-5 text-gray-400" />
                                                      );
                                                    })()}
                                                  </div>
                                                </div>
                                                <div className="flex-1 pt-2">
                                                  <h4
                                                    className={`font-medium text-base ${getStageTextClass("appointment_scheduled")}`}
                                                  >
                                                    {(() => {
                                                      const stage =
                                                        applicationProgress
                                                          ?.stages?.[10];
                                                      if (!stage)
                                                        return "Final Passport Office Visit";

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
                                                    const stage =
                                                      applicationProgress
                                                        ?.stages?.[10];
                                                    if (!stage)
                                                      return (
                                                        <p className="text-gray-600 text-sm mt-1">
                                                          Please visit the
                                                          passport office for
                                                          your final scheduled
                                                          appointment with all
                                                          required documents.
                                                        </p>
                                                      );

                                                    let message;
                                                    let colorClass;

                                                    switch (stage.title) {
                                                      case "pov_success":
                                                        message =
                                                          "Your final passport office visit was completed successfully. Your application is being processed further.";
                                                        colorClass =
                                                          "text-green-600";
                                                        break;
                                                      case "pov_failed":
                                                        message =
                                                          "Your final passport office visit was unsuccessful. Your application may be rejected. Please contact support immediately.";
                                                        colorClass =
                                                          "text-red-600";
                                                        break;
                                                      case "pov_insufficient_documents":
                                                        message =
                                                          "Your final visit was marked incomplete due to missing required documents. Your application may be on hold. Please contact support immediately.";
                                                        colorClass =
                                                          "text-yellow-600";
                                                        break;
                                                      default:
                                                        message =
                                                          "Please visit the passport office for your final appointment with all required documents.";
                                                        colorClass =
                                                          "text-gray-600";
                                                    }

                                                    return (
                                                      <>
                                                        <p className="text-gray-600 text-sm mt-1">
                                                          {message}
                                                        </p>
                                                        <p
                                                          className={`text-sm mt-1 ${colorClass}`}
                                                        >
                                                          {getStageDate(
                                                            stage.title,
                                                          ) || "Pending"}
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
            <div className="flex flex-col text-center md:text-left md:flex-column gap-6 items-start flex-wrap">
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
                  className="w-full md:w-auto rounded-xl border-navy/20 hover:bg-navy/5 hover:text-navy"
                  asChild
                >
                  <Link href="/portal/support">
                    <HelpCircle className="h-4 w-4 mr-2 hidden sm:block" />
                    View FAQs
                  </Link>
                </Button>
                <Button
                  className="w-full md:w-auto bg-gradient-to-r from-navy to-teal text-white bg-primary hover:bg-primary/90 hover:opacity-90 rounded-xl modern-button"
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
