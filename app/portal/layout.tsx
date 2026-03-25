"use client";

import type React from "react";
import Link from "next/link";
import {
  FileText,
  User,
  Bell,
  CreditCard,
  Clock,
  MapPin,
  HelpCircle,
  LogOut,
  Home,
  Settings,
  CheckCircle,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { ApplicationProgress } from "@/app/types/application";
import axiosServer from "@/lib/axiosServer";

// Component to handle sidebar items visibility
function SidebarNavigation({
  applicationProgress,
  onSignOut,
}: {
  applicationProgress: ApplicationProgress | null;
  onSignOut: () => void;
}) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  // Helper function to find stage by title
  const findStage = (title: string): boolean => {
    if (!applicationProgress?.stages) return false;
    return applicationProgress.stages.some(
      (stage) => stage.title.toLowerCase() === title.toLowerCase(),
    );
  };

  // Determine if Application Review should be shown
  const showApplicationReview = findStage("details_verification");

  // Determine if Appointment Letter should be shown
  const showAppointmentLetter = findStage("appointment_scheduled");

  return (
    <nav className="space-y-1 p-4">
      <Link
        href="/portal"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
          isActive("/portal")
            ? "bg-navy text-white"
            : "text-navy hover:bg-navy/5",
        )}
      >
        <Home className="h-5 w-5" />
        Dashboard
      </Link>
      <Link
        href="/portal/documents"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
          isActive("/portal/documents")
            ? "bg-navy text-white"
            : "text-navy hover:bg-navy/5",
        )}
      >
        <FileText className="h-5 w-5" />
        Documents
      </Link>
      {showApplicationReview && (
        <Link
          href="/portal/application-review"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
            isActive("/portal/application-review")
              ? "bg-navy text-white"
              : "text-navy hover:bg-navy/5",
          )}
        >
          <CheckCircle className="h-5 w-5" />
          Application Review
        </Link>
      )}
      {showAppointmentLetter && (
        <Link
          href="/portal/appointment-letter"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
            isActive("/portal/appointment-letter")
              ? "bg-navy text-white"
              : "text-navy hover:bg-navy/5",
          )}
        >
          <Clock className="h-5 w-5" />
          Appointment Letter
        </Link>
      )}
      <Link
        href="/portal/profile"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
          isActive("/portal/profile")
            ? "bg-navy text-white"
            : "text-navy hover:bg-navy/5",
        )}
      >
        <User className="h-5 w-5" />
        Personal Details
      </Link>
      <Link
        href="/portal/support"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
          isActive("/portal/support")
            ? "bg-navy text-white"
            : "text-navy hover:bg-navy/5",
        )}
      >
        <HelpCircle className="h-5 w-5" />
        Support
      </Link>
      <div className="pt-4 mt-4 border-t">
        <button
          onClick={onSignOut}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </nav>
  );
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [applicationProgress, setApplicationProgress] =
    useState<ApplicationProgress | null>(null);
  const [loading, setLoading] = useState(true);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to sign out");
      }

      router.push("/signin");
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  useEffect(() => {
    const fetchApplicationProgress = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("authToken");

        // ✅ Redirect if no token
        if (!token) {
          window.location.href = "/signin";
          return;
        }

        // ✅ Axios request (no need for .ok or .json)
        const response = await axiosServer.get("/application-progress", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // ✅ Axios gives data directly
        setApplicationProgress(response.data);
      } catch (error: any) {
        console.error("Error fetching application progress:", error);

        // ✅ Handle 401 properly
        if (error.response?.status === 401) {
          localStorage.removeItem("authToken"); // cleanup
          window.location.href = "/signin";
        } else {
          console.error("Unexpected error:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationProgress();
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-6 sticky top-0 z-50 w-full glass-nav">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-gold to-teal blur-sm opacity-70"></div>
              <div className="relative bg-navy rounded-full p-2">
                <FileText className="h-6 w-6 text-gold" />
              </div>
            </div>
            <span className="text-xl font-bold text-white">
              PassportSuvidha
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <button className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                <User className="h-5 w-5" />
              </button>
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-3 border-b">
                  <p className="font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">
                    john.doe@example.com
                  </p>
                </div>
                <div className="p-2">
                  <Link
                    href="/portal/profile"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted transition-colors w-full text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white border-r fixed top-20 bottom-0 left-0 overflow-y-auto">
          {loading ? (
            <div className="p-4 space-y-4">
              <div className="h-10 bg-gray-100 rounded animate-pulse" />
              <div className="h-10 bg-gray-100 rounded animate-pulse" />
              <div className="h-10 bg-gray-100 rounded animate-pulse" />
            </div>
          ) : (
            <SidebarNavigation
              applicationProgress={applicationProgress}
              onSignOut={handleSignOut}
            />
          )}
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 bg-gray-50 overflow-y-auto pb-16 md:pb-8 md:ml-64">
          {children}
        </main>

        {/* Mobile Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t z-40">
          <div className="flex justify-around items-center">
            <Link
              href="/portal"
              className={cn(
                "flex flex-col items-center py-2 px-3",
                pathname === "/portal" && "text-gold",
              )}
            >
              <Home
                className={cn(
                  "h-5 w-5",
                  pathname === "/portal" ? "text-gold" : "text-navy",
                )}
              />
              <span className="text-[10px] mt-0.5">Home</span>
            </Link>
            <Link
              href="/portal/documents"
              className={cn(
                "flex flex-col items-center py-2 px-3",
                pathname === "/portal/documents" && "text-gold",
              )}
            >
              <FileText
                className={cn(
                  "h-5 w-5",
                  pathname === "/portal/documents" ? "text-gold" : "text-navy",
                )}
              />
              <span className="text-[10px] mt-0.5">Docs</span>
            </Link>
            {applicationProgress?.stages?.some(
              (stage) => stage.title.toLowerCase() === "details_verification",
            ) && (
              <Link
                href="/portal/application-review"
                className={cn(
                  "flex flex-col items-center py-2 px-3",
                  pathname === "/portal/application-review" && "text-gold",
                )}
              >
                <CheckCircle
                  className={cn(
                    "h-5 w-5",
                    pathname === "/portal/application-review"
                      ? "text-gold"
                      : "text-navy",
                  )}
                />
                <span className="text-[10px] mt-0.5">Review</span>
              </Link>
            )}
            {applicationProgress?.stages?.some(
              (stage) => stage.title.toLowerCase() === "appointment_scheduled",
            ) && (
              <Link
                href="/portal/appointment-letter"
                className={cn(
                  "flex flex-col items-center py-2 px-3",
                  pathname === "/portal/appointment-letter" && "text-gold",
                )}
              >
                <Clock
                  className={cn(
                    "h-5 w-5",
                    pathname === "/portal/appointment-letter"
                      ? "text-gold"
                      : "text-navy",
                  )}
                />
                <span className="text-[10px] mt-0.5">Appt</span>
              </Link>
            )}
            <Link
              href="/portal/support"
              className={cn(
                "flex flex-col items-center py-2 px-3",
                pathname === "/portal/support" && "text-gold",
              )}
            >
              <HelpCircle
                className={cn(
                  "h-5 w-5",
                  pathname === "/portal/support" ? "text-gold" : "text-navy",
                )}
              />
              <span className="text-[10px] mt-0.5">Help</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-4 px-4 md:px-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-navy" />
              <span className="font-medium text-navy">PassportSuvidha</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy-policy"
                className="hover:text-navy transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms-of-service"
                className="hover:text-navy transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/contact"
                className="hover:text-navy transition-colors"
              >
                Contact
              </Link>
            </div>
            <div>© 2024 PassportSuvidha. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
