"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  Check,
  CreditCard,
  Clock,
  Shield,
  Star,
  Zap,
  Award,
  ArrowRight,
} from "lucide-react";

type StageKey =
  | "form"
  | "documents"
  | "payment"
  | "processing"
  | "verification"
  | "delivery";

export default function Services() {
  const [selectedStage, setSelectedStage] = useState<StageKey>("form");

  const stageContent: Record<StageKey, React.ReactElement> = {
    form: (
      <div className="relative z-10 text-center space-y-6">
        <div className="space-y-4 text-left max-w-2xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-navy/10">
            <h3 className="font-semibold text-xl text-navy mb-4">
              Required Information
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-teal" />
                Personal details (name, date of birth, etc.)
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-teal" />
                Contact information
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-teal" />
                Family details
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-teal" />
                Educational & employment information
              </li>
            </ul>
          </div>
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-navy/10">
            <h3 className="font-semibold text-xl text-navy mb-4">
              Tips for Form Filling
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-teal" />
                Keep all documents ready before starting
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-teal" />
                Fill in CAPITAL letters
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-teal" />
                Double-check all information
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
    documents: (
      <div className="text-center space-y-6">
        <img
          src="/document-upload.svg"
          alt="Document Upload"
          className="w-full max-w-md mx-auto mb-8"
        />
        <h2 className="text-3xl font-bold text-teal">Document Upload</h2>
        <div className="space-y-4 text-left max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
            <h3 className="font-semibold text-lg text-teal mb-2">
              Required Documents
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-navy" />
                Proof of Identity (Aadhar/PAN/Voter ID)
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-navy" />
                Proof of Address
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-navy" />
                Recent passport size photographs
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-navy" />
                Birth certificate/Age proof
              </li>
            </ul>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
            <h3 className="font-semibold text-lg text-teal mb-2">
              Document Guidelines
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-navy" />
                Clear, colored scans
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-navy" />
                File size under 2MB
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-navy" />
                JPG/PDF format only
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
    payment: (
      <div className="text-center space-y-6">
        <img
          src="/payment.svg"
          alt="Payment Process"
          className="w-full max-w-md mx-auto mb-8"
        />
        <h2 className="text-3xl font-bold text-navy">Payment Process</h2>
        <div className="space-y-4 text-left max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
            <h3 className="font-semibold text-lg text-navy mb-2">
              Payment Options
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-teal" />
                Credit/Debit Cards
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-teal" />
                Net Banking
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-teal" />
                UPI
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-teal" />
                Digital Wallets
              </li>
            </ul>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
            <h3 className="font-semibold text-lg text-navy mb-2">
              Secure Transaction
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-teal" />
                256-bit encryption
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-teal" />
                PCI DSS compliant
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-teal" />
                Instant payment confirmation
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
    processing: (
      <div className="text-center space-y-6">
        <img
          src="/processing.svg"
          alt="Application Processing"
          className="w-full max-w-md mx-auto mb-8"
        />
        <h2 className="text-3xl font-bold text-teal">Application Processing</h2>
        <div className="space-y-4 text-left max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
            <h3 className="font-semibold text-lg text-teal mb-2">
              Processing Steps
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-navy" />
                Initial document verification
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-navy" />
                Application review
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-navy" />
                Background check
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-navy" />
                Final approval
              </li>
            </ul>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
            <h3 className="font-semibold text-lg text-teal mb-2">
              Processing Time
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-navy" />
                Normal: 30-45 days
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-navy" />
                Tatkal: 1-3 days
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
    verification: (
      <div className="text-center space-y-6">
        <img
          src="/verification.svg"
          alt="Document Verification"
          className="w-full max-w-md mx-auto mb-8"
        />
        <h2 className="text-3xl font-bold text-navy">Document Verification</h2>
        <div className="space-y-4 text-left max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
            <h3 className="font-semibold text-lg text-navy mb-2">
              Verification Process
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-teal" />
                Police verification at residence
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-teal" />
                Document authenticity check
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-teal" />
                Address verification
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-teal" />
                Identity confirmation
              </li>
            </ul>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
            <h3 className="font-semibold text-lg text-navy mb-2">
              What to Keep Ready
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-teal" />
                Original documents
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-teal" />
                Additional proof if required
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-teal" />
                References contact details
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
    delivery: (
      <div className="text-center space-y-6">
        <img
          src="/delivery.svg"
          alt="Passport Delivery"
          className="w-full max-w-md mx-auto mb-8"
        />
        <h2 className="text-3xl font-bold text-teal">Passport Delivery</h2>
        <div className="space-y-4 text-left max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
            <h3 className="font-semibold text-lg text-teal mb-2">
              Delivery Process
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-navy" />
                Secure packaging
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-navy" />
                Tracked shipping
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-navy" />
                Signature required
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-navy" />
                Real-time tracking
              </li>
            </ul>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
            <h3 className="font-semibold text-lg text-teal mb-2">
              Important Notes
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-navy" />
                Keep ID proof ready
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-navy" />
                Personal receipt required
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-navy" />
                Check all pages upon receipt
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-white">
      {/* Background Patterns */}
      {/* <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal/10 via-transparent to-navy/10 opacity-40"></div>
      <div className="absolute inset-0 dot-pattern opacity-[0.05]"></div> */}

      {/* Passport Icon Animations - Repositioned and Resized */}
      {/* <motion.div
        className="absolute top-24 right-[15%] bg-white/10 backdrop-blur-md rounded-xl p-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0.8, 1, 0.8],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gold"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="12" cy="12" r="3" />
          <path d="M3 12h18" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-[20%] bg-white/10 backdrop-blur-md rounded-xl p-3"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0.8, 1, 0.8],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-teal"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <line x1="7" y1="12" x2="17" y2="12" />
          <line x1="7" y1="8" x2="17" y2="8" />
          <line x1="7" y1="16" x2="17" y2="16" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-[45%] right-[8%] bg-white/10 backdrop-blur-md rounded-xl p-5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0.8, 1, 0.8],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-navy"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="12" cy="12" r="3" />
          <path d="M3 12h18" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-[60%] left-[12%] bg-white/10 backdrop-blur-md rounded-xl p-3.5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0.8, 1, 0.8],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gold"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <line x1="7" y1="12" x2="17" y2="12" />
          <line x1="7" y1="8" x2="17" y2="8" />
          <line x1="7" y1="16" x2="17" y2="16" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-[20%] left-[10%] bg-white/10 backdrop-blur-md rounded-xl p-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0.8, 1, 0.8],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-teal"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="12" cy="12" r="3" />
          <path d="M3 12h18" />
        </svg>
      </motion.div> */}

      {/* Large Gradient Blobs */}
      {/* <div className="blob-shape bg-gradient-to-br from-navy/20 to-teal/10 w-[600px] h-[600px] -left-64 top-0 pulse-animation"></div>
      <div className="blob-shape bg-gradient-to-tl from-teal/20 to-navy/10 w-[500px] h-[500px] -right-64 bottom-0"></div>
      <div className="blob-shape bg-gradient-to-br from-gold/20 to-teal/10 w-[400px] h-[400px] right-32 top-1/2 floating-animation"></div>
      <div className="blob-shape bg-gradient-to-tr from-navy/15 to-gold/10 w-[300px] h-[300px] left-32 top-1/3 pulse-animation-delay"></div>
      <div className="blob-shape bg-gradient-to-bl from-teal/15 to-navy/10 w-[450px] h-[450px] -left-32 bottom-1/4 floating-animation-delay"></div>
      <div className="blob-shape bg-gradient-to-tr from-gold/15 to-teal/10 w-[350px] h-[350px] right-1/4 top-1/4 pulse-animation"></div> */}

      {/* Decorative Lines */}
      {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-navy/10 to-transparent"></div>
      <div className="absolute top-0 right-0 w-1 h-screen bg-gradient-to-b from-transparent via-teal/10 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/10 to-transparent"></div>
      <div className="absolute top-0 left-0 w-1 h-screen bg-gradient-to-b from-transparent via-navy/10 to-transparent"></div> */}

      {/* Small Floating Elements with Gradients - Top */}
      {/* <div className="absolute top-20 right-20 w-8 h-8 bg-gradient-to-br from-teal/30 to-teal/10 rounded-full floating-animation shadow-lg shadow-teal/10"></div>
      <div className="absolute top-32 right-40 w-4 h-4 bg-gradient-to-br from-navy/30 to-navy/10 rounded-full pulse-animation-delay shadow-lg shadow-navy/10"></div>
      <div className="absolute top-16 right-96 w-6 h-6 bg-gradient-to-br from-gold/30 to-gold/10 rounded-full floating-animation-delay shadow-lg shadow-gold/10"></div>
      <div className="absolute top-40 left-20 w-5 h-5 bg-gradient-to-br from-teal/30 to-teal/10 rounded-full pulse-animation shadow-lg shadow-teal/10"></div>
      <div className="absolute top-24 left-40 w-3 h-3 bg-gradient-to-br from-navy/30 to-navy/10 rounded-full floating-animation shadow-lg shadow-navy/10"></div> */}

      {/* Small Floating Elements with Gradients - Middle */}
      {/* <div className="absolute top-1/3 right-32 w-4 h-4 bg-gradient-to-br from-gold/30 to-gold/10 rounded-full pulse-animation backdrop-blur-sm"></div>
      <div className="absolute top-1/2 right-24 w-6 h-6 bg-gradient-to-br from-teal/30 to-teal/10 rounded-full floating-animation-delay backdrop-blur-sm"></div>
      <div className="absolute top-1/3 left-1/4 w-5 h-5 bg-gradient-to-br from-navy/30 to-navy/10 rounded-full pulse-animation-delay backdrop-blur-sm"></div>
      <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-gradient-to-br from-gold/30 to-gold/10 rounded-full floating-animation backdrop-blur-sm"></div> */}

      {/* Small Floating Elements with Gradients - Bottom */}
      {/* <div className="absolute bottom-32 left-20 w-6 h-6 bg-gradient-to-br from-navy/30 to-navy/10 rounded-full floating-animation-delay shadow-lg shadow-navy/10"></div>
      <div className="absolute bottom-20 right-32 w-8 h-8 bg-gradient-to-br from-teal/30 to-teal/10 rounded-full pulse-animation shadow-lg shadow-teal/10"></div>
      <div className="absolute bottom-40 right-1/4 w-5 h-5 bg-gradient-to-br from-gold/30 to-gold/10 rounded-full floating-animation shadow-lg shadow-gold/10"></div>
      <div className="absolute bottom-24 left-1/3 w-4 h-4 bg-gradient-to-br from-navy/30 to-navy/10 rounded-full pulse-animation-delay shadow-lg shadow-navy/10"></div> */}

      {/* Diamond Shapes with Gradients and Glow */}
      {/* <div className="absolute top-1/4 right-1/3 w-6 h-6 bg-gradient-to-br from-teal/30 to-transparent rotate-45 floating-animation shadow-xl shadow-teal/20 backdrop-blur-sm"></div>
      <div className="absolute bottom-1/3 left-1/4 w-8 h-8 bg-gradient-to-br from-navy/30 to-transparent rotate-45 pulse-animation-delay shadow-xl shadow-navy/20 backdrop-blur-sm"></div>
      <div className="absolute top-2/3 right-1/4 w-5 h-5 bg-gradient-to-br from-gold/30 to-transparent rotate-45 floating-animation-delay shadow-xl shadow-gold/20 backdrop-blur-sm"></div> */}

      {/* Decorative Rings */}
      {/* <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full border border-navy/10 floating-animation"></div>
      <div className="absolute bottom-1/4 right-1/4 w-16 h-16 rounded-full border border-teal/10 pulse-animation-delay"></div>
      <div className="absolute top-1/2 left-1/3 w-10 h-10 rounded-full border border-gold/10 floating-animation-delay"></div> */}

      <motion.main
        className="flex-1 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Pricing Section with Animation */}
        <motion.section
          className="w-full py-12 md:py-16 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="container px-4 md:px-6 relative">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-heading mb-2 pb-2">
                Passport Services & Pricing
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Choose the service that best fits your travel needs and timeline
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="group relative">
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-navy to-navy/50 opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
                <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white h-full flex flex-col">
                  <div className="h-2 w-full bg-navy rounded-t-3xl"></div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy/10 text-navy">
                        <Clock className="h-7 w-7" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          Normal Passport
                        </CardTitle>
                        <CardDescription>
                          For non-urgent passport needs
                        </CardDescription>
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 rounded-xl bg-navy/5 hover:bg-navy/10 transition-colors">
                          <div className="text-sm font-medium text-navy/70">
                            36 pages
                          </div>
                          <div className="text-2xl font-bold text-navy mt-1">
                            ₹2,680
                          </div>
                          <div className="text-sm text-navy/70 mt-1 space-y-1">
                            <div className="flex justify-between">
                              <span>Gov. Fees:</span>
                              <span>₹1,500</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Service Charge:</span>
                              <span>₹1,000</span>
                            </div>
                            <div className="flex justify-between">
                              <span>GST (18%):</span>
                              <span>₹180</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-navy/5 hover:bg-navy/10 transition-colors">
                          <div className="text-sm font-medium text-navy/70">
                            60 pages
                          </div>
                          <div className="text-2xl font-bold text-navy mt-1">
                            ₹3,180
                          </div>
                          <div className="text-sm text-navy/70 mt-1 space-y-1">
                            <div className="flex justify-between">
                              <span>Gov. Fees:</span>
                              <span>₹2,000</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Service Charge:</span>
                              <span>₹1,000</span>
                            </div>
                            <div className="flex justify-between">
                              <span>GST (18%):</span>
                              <span>₹180</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-3 mt-4">
                      <div className="flex items-start">
                        <div className="mr-2 mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-navy/10">
                          <Check className="h-3 w-3 text-navy" />
                        </div>
                        <span className="text-sm">
                          30-45 days processing time
                        </span>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-2 mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-navy/10">
                          <Check className="h-3 w-3 text-navy" />
                        </div>
                        <span className="text-sm">
                          Choice of 36 or 60 pages
                        </span>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-2 mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-navy/10">
                          <Check className="h-3 w-3 text-navy" />
                        </div>
                        <span className="text-sm">
                          Valid for 10 years (adults)
                        </span>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-2 mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-navy/10">
                          <Check className="h-3 w-3 text-navy" />
                        </div>
                        <span className="text-sm">Regular mail delivery</span>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-2 mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-navy/10">
                          <Check className="h-3 w-3 text-navy" />
                        </div>
                        <span className="text-sm">
                          Online application assistance
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/apply-passport" className="w-full">
                      <Button className="w-full bg-navy hover:bg-navy/80 rounded-xl modern-button">
                        Apply Normal
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>

              <div className="group relative">
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-teal to-navy opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
                <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white h-full flex flex-col">
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <div className="bg-gradient-to-r from-teal to-navy text-white text-xs font-medium px-4 py-1 rounded-full">
                      URGENT SERVICE
                    </div>
                  </div>
                  <div className="h-2 w-full bg-gradient-to-r from-teal to-navy rounded-t-3xl"></div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-teal">
                        <Zap className="h-7 w-7" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          Tatkal Passport
                        </CardTitle>
                        <CardDescription>
                          For urgent passport needs
                        </CardDescription>
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 rounded-xl bg-teal/5 hover:bg-teal/10 transition-colors">
                          <div className="text-sm font-medium text-teal/70">
                            36 pages
                          </div>
                          <div className="text-2xl font-bold text-teal mt-1">
                            ₹4,680
                          </div>
                          <div className="space-y-1 mt-2">
                            <div className="text-sm text-teal/70 flex justify-between">
                              <span>Gov. Fees</span>
                              <span>₹3,500</span>
                            </div>
                            <div className="text-sm text-teal/70 flex justify-between">
                              <span>Service Charge</span>
                              <span>₹1,000</span>
                            </div>
                            <div className="text-sm text-teal/70 flex justify-between">
                              <span>GST (18%)</span>
                              <span>₹180</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-teal/5 hover:bg-teal/10 transition-colors">
                          <div className="text-sm font-medium text-teal/70">
                            60 pages
                          </div>
                          <div className="text-2xl font-bold text-teal mt-1">
                            ₹5,180
                          </div>
                          <div className="space-y-1 mt-2">
                            <div className="text-sm text-teal/70 flex justify-between">
                              <span>Gov. Fees</span>
                              <span>₹4,000</span>
                            </div>
                            <div className="text-sm text-teal/70 flex justify-between">
                              <span>Service Charge</span>
                              <span>₹1,000</span>
                            </div>
                            <div className="text-sm text-teal/70 flex justify-between">
                              <span>GST (18%)</span>
                              <span>₹180</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-3 mt-4">
                      <div className="flex items-start">
                        <div className="mr-2 mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-teal/10">
                          <Check className="h-3 w-3 text-teal" />
                        </div>
                        <span className="text-sm">
                          1-3 days processing time
                        </span>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-2 mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-teal/10">
                          <Check className="h-3 w-3 text-teal" />
                        </div>
                        <span className="text-sm">
                          Choice of 36 or 60 pages
                        </span>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-2 mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-teal/10">
                          <Check className="h-3 w-3 text-teal" />
                        </div>
                        <span className="text-sm">
                          Valid for 10 years (adults)
                        </span>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-2 mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-teal/10">
                          <Check className="h-3 w-3 text-teal" />
                        </div>
                        <span className="text-sm">Express delivery</span>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-2 mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-teal/10">
                          <Check className="h-3 w-3 text-teal" />
                        </div>
                        <span className="text-sm">24/7 support assistance</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/apply-passport" className="w-full">
                      <Button className="w-full bg-gradient-to-r from-teal to-navy text-white hover:opacity-90 rounded-xl modern-button">
                        Apply Tatkal
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Application Journey Section */}
        <section className="w-full py-12 md:py-16 bg-gradient-to-br from-teal/5 via-navy/5 to-teal/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-navy/5 bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent,white)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal/10 via-transparent to-navy/10 opacity-40"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-5xl mx-auto text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-navy mb-4">
                The Passport Application Journey Your Path to Global Travel!
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {/* Step 1 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-white rounded-3xl shadow-lg transition-all duration-300 group-hover:shadow-xl"></div>
                <div className="relative p-6">
                  <div className="w-24 h-24 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-teal/20 transition-colors duration-300">
                    <div className="w-20 h-20 bg-teal rounded-full flex items-center justify-center relative">
                      <FileText className="w-10 h-10 text-white" />
                      <div className="absolute -right-2 -top-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-teal font-semibold">01</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-center mb-3">
                    Easy Registration
                  </h3>

                  <p className="text-gray-600 text-center">
                    The first and foremost step is to fill in your personal
                    details and complete the registration process. If you are
                    already registered, then simply log in with your
                    credentials.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-white rounded-3xl shadow-lg transition-all duration-300 group-hover:shadow-xl"></div>
                <div className="relative p-6">
                  <div className="w-24 h-24 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-navy/20 transition-colors duration-300">
                    <div className="w-20 h-20 bg-navy rounded-full flex items-center justify-center relative">
                      <Shield className="w-10 h-10 text-white" />
                      <div className="absolute -right-2 -top-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-navy font-semibold">02</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-center mb-3">
                    Document Verification
                  </h3>

                  <p className="text-gray-600 text-center">
                    Submit your identity proof, address proof, and other
                    required documents. Our system will verify the authenticity
                    and completeness of your documentation.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-white rounded-3xl shadow-lg transition-all duration-300 group-hover:shadow-xl"></div>
                <div className="relative p-6">
                  <div className="w-24 h-24 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-teal/20 transition-colors duration-300">
                    <div className="w-20 h-20 bg-teal rounded-full flex items-center justify-center relative">
                      <CreditCard className="w-10 h-10 text-white" />
                      <div className="absolute -right-2 -top-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-teal font-semibold">03</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-center mb-3">
                    Fee Payment
                  </h3>

                  <p className="text-gray-600 text-center">
                    Make a secure online payment for your passport fees. Choose
                    between Normal or Tatkal service and any additional services
                    you require.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-white rounded-3xl shadow-lg transition-all duration-300 group-hover:shadow-xl"></div>
                <div className="relative p-6">
                  <div className="w-24 h-24 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-navy/20 transition-colors duration-300">
                    <div className="w-20 h-20 bg-navy rounded-full flex items-center justify-center relative">
                      <Award className="w-10 h-10 text-white" />
                      <div className="absolute -right-2 -top-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-navy font-semibold">04</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-center mb-3">
                    Passport Delivery
                  </h3>

                  <p className="text-gray-600 text-center">
                    After successful verification and processing, receive your
                    passport securely at your doorstep through our express
                    delivery service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-16 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-heading mb-4">
                Quick Route To Your Passport How It Works?
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-7xl mx-auto">
              {/* Left side - Process Steps */}
              <div className="md:col-span-5 space-y-4 bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                <div
                  className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                    selectedStage === "form" ? "bg-navy/10" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedStage("form")}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy/10 text-navy">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-navy">
                      Easy Registration
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Start off with a simple registration process with your
                      basic details required for the passport process.
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                    selectedStage === "documents"
                      ? "bg-teal/10"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedStage("documents")}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-teal">
                      Upload Documents
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Involves the uploading of documents like ID proof,
                      photographs, address proof, and other required documents.
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                    selectedStage === "payment"
                      ? "bg-navy/10"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedStage("payment")}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy/10 text-navy">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-navy">
                      Pay Service Fee
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Pay the passport service fee with secure and digitally
                      simple modes of payment.
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                    selectedStage === "processing"
                      ? "bg-teal/10"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedStage("processing")}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-teal">
                      Form Submission
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Our expert team will prepare your application and submit
                      it to the passport authorities and book a visit date.
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                    selectedStage === "verification"
                      ? "bg-navy/10"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedStage("verification")}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy/10 text-navy">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-navy">
                    Passport Office Visit
                    </h3>
                    <p className="text-gray-600 mt-1">
                    On your scheduled visit date, you'll need to go to the selected Passport Office with your application and the required documents.
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                    selectedStage === "delivery"
                      ? "bg-teal/10"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedStage("delivery")}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-teal">
                    Passport Delivery  @ Your Home
                    </h3>
                    <p className="text-gray-600 mt-1">
                    Your passport will be delivered right to your home via courier!
                    </p>
                  </div>
                </div>
              </div>

              {/* Right side - Stage Details */}
              <div className="md:col-span-7 relative">
                <div className="relative h-full w-full rounded-3xl overflow-hidden">
                  {/* Base Image Layer */}
                  <Image
                    src="/4.jpg"
                    alt="Passport Application Process"
                    layout="fill"
                    objectFit="cover"
                    priority
                  />

                  {/* Gradient Overlay */}
                  {/* <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/95"></div> */}

                  {/* Content Layer */}
                  <div className="relative z-10">
                    {/* Stage Title */}
                    <div className="p-8 pb-4 border-b border-gray-200">
                      <h2 className="text-3xl font-bold text-center">
                        {selectedStage === "form" && (
                          <span className="text-navy">
                            Fill Application Form
                          </span>
                        )}
                        {selectedStage === "documents" && (
                          <span className="text-teal">Document Upload</span>
                        )}
                        {selectedStage === "payment" && (
                          <span className="text-navy">Payment Process</span>
                        )}
                        {selectedStage === "processing" && (
                          <span className="text-teal">
                            Application Processing
                          </span>
                        )}
                        {selectedStage === "verification" && (
                          <span className="text-navy">
                            Document Verification
                          </span>
                        )}
                        {selectedStage === "delivery" && (
                          <span className="text-teal">Passport Delivery</span>
                        )}
                      </h2>
                    </div>

                    {/* Stage Content */}
                    <motion.div
                      key={selectedStage}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="p-8 pt-4 h-full overflow-auto max-h-[600px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                    >
                      {stageContent[selectedStage]}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Services Section */}
        {/* <section className="w-full py-12 md:py-16 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            Existing additional services content
          </div>
        </section> */}
      </motion.main>
    </div>
  );
}
