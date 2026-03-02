"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ApplicationForm from "@/components/passport-application/ApplicationForm";
import { FileText } from "lucide-react";
import Head from "next/head";

export default function ApplyPassport() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-white">
      {/* SEO Meta Tags */}
      <Head>
        <title>Passport Application | Passport Suvidha</title>
        <meta name="description" content="Apply for your Indian passport online in a few simple steps. Fast, secure, and hassle-free application process with Passport Suvidha." />
      </Head>
      {/* Main Content with Animation */}
      <motion.main
        className="flex-1 relative z-10 py-12 md:py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container px-2 md:px-6">
          <div className="mx-auto">
            <div className="mb-6 md:mb-8 text-center">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-heading mb-2 md:mb-3">
                Passport Application
              </h1>
              <p className="text-muted-foreground text-sm md:text-xl">
                Complete your application in a few simple steps
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className=""
            >
              <ApplicationForm />
            </motion.div>
          </div>
        </div>
      </motion.main>
      <footer className="w-full py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-navy" />
              <span className="font-medium text-navy">PassportSuvidha</span>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Link href="#" className="hover:text-navy transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-navy transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-navy transition-colors">
                Contact
              </Link>
            </div>
            <div>
              © {new Date().getFullYear()} PassportSuvidha. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
