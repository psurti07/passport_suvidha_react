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
  ArrowUpRight,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import axiosServer from "@/lib/axiosServer";

export default function ApplicationStatus() {
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

  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const token = localStorage.getItem("authToken"); // or wherever you store it

      const res = await axiosServer.get("/application-progress/status", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.status) {
        setProgressData(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const STATUS_COLOR_MAP = {
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    blue: "bg-blue-100 text-blue-800",
    orange: "bg-orange-100 text-orange-800",
    yellow: "bg-yellow-100 text-yellow-800",
    gray: "bg-gray-100 text-gray-800",
  };

  const getStatusBadgeClass = (color) => {
    return STATUS_COLOR_MAP[color || "gray"] || STATUS_COLOR_MAP.gray;
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
        <h1 className="text-3xl font-bold tracking-tight text-navy">
          Application Status
        </h1>
        <p className="text-muted-foreground">
          Track and manage your passport application progress
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="bg-navy/5">
            <CardTitle className="mb-2">Application Progress</CardTitle>
            <CardDescription>
              Please check status updates and admin remarks at each stage
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status Name</TableHead>
                  <TableHead>Status Date</TableHead>
                  <TableHead>Remark</TableHead>
                  <TableHead>File</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : progressData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No Data Found
                    </TableCell>
                  </TableRow>
                ) : (
                  progressData.map((item, index) => (
                    <TableRow key={index}>
                      {/* Status Name */}
                      {/* <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {item.status_name}
                        </div>
                      </TableCell> */}
                      <TableCell className="font-medium">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${getStatusBadgeClass(
                            item.colorclass,
                          )}`}
                        >
                          {item.status_name
                            ? item.status_name.replace(/_/g, " ")
                            : "N/A"}
                        </span>
                      </TableCell>

                      {/* Date */}
                      <TableCell>
                        {item.status_date
                          ? new Date(item.status_date).toLocaleString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })
                          : "-"}
                      </TableCell>
                      {/* <TableCell>
                        {item.status_date
                          ? new Date(item.status_date).toLocaleString()
                          : "-"}
                      </TableCell> */}

                      {/* Remark */}
                      <TableCell className="whitespace-normal break-words max-w-xs">
                        {item.remark || "-"}
                      </TableCell>

                      {/* File */}
                      <TableCell>
                        {item.file_url ? (
                          <a
                            href={item.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-600 underline"
                          >
                            {/* Icon */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
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
                            {/* Text */}
                            View File
                          </a>
                        ) : (
                          <p className="text-muted-foreground text-xs">
                            No File
                          </p>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
