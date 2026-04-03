"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Phone, ArrowLeft, Shield, Lock, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axiosServer from "@/lib/axiosServer";

// Add this type if you expect user data or a token back on successful sign-in
interface SignInResponse {
  token?: string;
  customer?: any; // Define a proper user type if available
  message?: string; // Include message from response
}

type SignInFormData = {
  mobile: string;
  otp: string;
};

export default function SignIn() {
  const router = useRouter();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setFocus,
  } = useForm<SignInFormData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOtpSent && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOtpSent, countdown]);

  useEffect(() => {
    if (isOtpSent) {
      setFocus("otp");
    }
  }, [isOtpSent, setFocus]);

  const onSendOtp = async (mobile: string) => {
    try {
      setIsLoading(true);

      // ✅ Step 1: Verify mobile (Next.js API)
      const verifyResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile_number: mobile }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        throw new Error(verifyData.message || "Mobile verification failed");
      }

      // ✅ Step 2: Send OTP (Next.js API)
      const otpResponse = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile_number: mobile,
          purpose: "login",
        }),
      });

      const otpData = await otpResponse.json();

      if (!otpResponse.ok) {
        throw new Error(otpData.message || "Failed to send OTP");
      }

      // ✅ Success
      setIsOtpSent(true);
      setCountdown(30);

      toast.success(otpData.message || "OTP sent successfully!");
    } catch (error: any) {
      console.error("OTP ERROR:", error);

      toast.error(error.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const onResendOtp = () => {
    // Ensure mobile value is correctly passed from the form state
    const mobileValue = watch("mobile");
    if (mobileValue) {
      onSendOtp(mobileValue);
    } else {
      toast.error("Mobile number is missing.");
    }
  };

  const onChangeNumber = () => {
    setIsOtpSent(false);
    setCountdown(30);
    setFocus("mobile");
  };

  const onSubmit = async (data: SignInFormData) => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile_number: data.mobile,
          otp: data.otp,
          purpose: "login",
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message ||
            "Sign-in failed. Please check your OTP and try again.",
        );
      }

      if (!responseData.token) {
        throw new Error("Token not received from server");
      }

      // ✅ Save token + user
      localStorage.setItem("authToken", responseData.token);
      localStorage.setItem("user", JSON.stringify(responseData.customer));
      document.cookie = `authToken=${responseData.token}; path=/`;
      toast.success(responseData.message || "Signed in successfully!");

      console.log("Redirecting..."); // ✅ debug

      // ✅ BEST redirect method
      router.replace("/portal");
    } catch (error: any) {
      toast.error(
        error.message || "An unexpected error occurred during sign-in.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <header className="w-full py-6">
        <div className="container px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-navy">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md relative">
          <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-navy/20 to-teal/20 blur-xl opacity-70"></div>
          <Card className="rounded-2xl border-0 shadow-xl overflow-hidden relative">
            <CardHeader className="pb-4 text-center">
              <div className="mx-auto mb-2 flex h-24 w-24 items-center justify-center rounded-full bg-navy/10">
                <div className="relative">
                  <Image
                    src="/icon/passport-suvidha-icon.png"
                    alt="Passport Suvidha Logo"
                    width={100}
                    height={100}
                    className="h-24 w-24"
                  />
                </div>
              </div>
              <CardTitle className="text-2xl">
                Sign In to PassportSuvidha
              </CardTitle>
              <CardDescription>
                Enter your mobile number to receive OTP
              </CardDescription>
            </CardHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault(); // ✅ STOP PAGE RELOAD
                handleSubmit(onSubmit)(e);
              }}
            >
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="mobile"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      Mobile Number
                    </label>
                    <Input
                      {...register("mobile", {
                        required: "Mobile number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message:
                            "Please enter a valid 10-digit mobile number",
                        },
                      })}
                      id="mobile"
                      type="tel"
                      placeholder="Enter your mobile number"
                      className={`modern-input ${
                        errors.mobile ? "border-red-500" : ""
                      }`}
                      maxLength={10}
                      disabled={isOtpSent || isLoading}
                      onKeyDown={(e) => {
                        // Allow backspace, delete, tab, escape, enter, and arrow keys
                        if (
                          [
                            "Backspace",
                            "Delete",
                            "ArrowLeft",
                            "ArrowRight",
                            "Tab",
                            "Enter",
                          ].includes(e.key) ||
                          // Allow Ctrl+A, Command+A
                          (e.key === "a" && (e.ctrlKey || e.metaKey)) ||
                          // Allow Ctrl+C, Command+C
                          (e.key === "c" && (e.ctrlKey || e.metaKey)) ||
                          // Allow Ctrl+V, Command+V
                          (e.key === "v" && (e.ctrlKey || e.metaKey)) ||
                          // Allow Ctrl+X, Command+X
                          (e.key === "x" && (e.ctrlKey || e.metaKey)) ||
                          // Allow home, end, left, right, down, up
                          (e.key >= "ArrowLeft" && e.key <= "ArrowDown")
                        ) {
                          // let it happen, don't do anything
                          return;
                        }
                        // Ensure that it is a number and stop the keypress
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {errors.mobile && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.mobile.message}
                      </p>
                    )}
                  </div>
                </div>

                {!isOtpSent && (
                  <Button
                    type="button"
                    className="w-full bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button h-12 text-base"
                    onClick={() => onSendOtp(watch("mobile"))}
                    disabled={
                      !watch("mobile") ||
                      !!errors.mobile ||
                      watch("mobile").length !== 10 ||
                      isLoading
                    }
                  >
                    {isLoading ? "Sending OTP..." : "Get OTP"}
                  </Button>
                )}

                {isOtpSent && (
                  <>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label htmlFor="otp" className="text-sm font-medium">
                            Enter OTP
                          </label>
                          <button
                            type="button"
                            onClick={onChangeNumber}
                            className="text-sm text-navy hover:text-teal transition-colors"
                          >
                            Change Number
                          </button>
                        </div>
                        <Input
                          {...register("otp", {
                            required: "OTP is required",
                            pattern: {
                              value: /^[0-9]{4}$/,
                              message: "Please enter a valid 4-digit OTP",
                            },
                          })}
                          id="otp"
                          type="text"
                          placeholder="Enter 4-digit OTP"
                          className={`modern-input ${
                            errors.otp ? "border-red-500" : ""
                          }`}
                          maxLength={4}
                          disabled={isLoading}
                          onKeyDown={(e) => {
                            // Allow backspace, delete, tab, escape, enter, and arrow keys
                            if (
                              [
                                "Backspace",
                                "Delete",
                                "ArrowLeft",
                                "ArrowRight",
                                "Tab",
                                "Enter",
                              ].includes(e.key) ||
                              // Allow Ctrl+A, Command+A
                              (e.key === "a" && (e.ctrlKey || e.metaKey)) ||
                              // Allow Ctrl+C, Command+C
                              (e.key === "c" && (e.ctrlKey || e.metaKey)) ||
                              // Allow Ctrl+V, Command+V
                              (e.key === "v" && (e.ctrlKey || e.metaKey)) ||
                              // Allow Ctrl+X, Command+X
                              (e.key === "x" && (e.ctrlKey || e.metaKey)) ||
                              // Allow home, end, left, right, down, up
                              (e.key >= "ArrowLeft" && e.key <= "ArrowDown")
                            ) {
                              // let it happen, don't do anything
                              return;
                            }
                            // Ensure that it is a number and stop the keypress
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {errors.otp && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.otp.message}
                          </p>
                        )}
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={onResendOtp}
                            disabled={countdown > 0 || isLoading}
                            className={`text-sm ${
                              countdown > 0
                                ? "text-muted-foreground"
                                : "text-navy hover:text-teal transition-colors"
                            }`}
                          >
                            {countdown > 0
                              ? `Resend OTP in ${countdown}s`
                              : "Resend OTP"}
                          </button>
                        </div>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button h-12 text-base"
                      disabled={
                        !watch("otp") ||
                        !!errors.otp ||
                        watch("otp").length !== 4 ||
                        isLoading
                      }
                    >
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </>
                )}

                {/* Trust indicators */}
                <div className="grid grid-cols-3 gap-4 py-4">
                  <div className="flex flex-col items-center text-center">
                    <Shield className="h-8 w-8 text-navy mb-2" />
                    <span className="text-xs">Secure Login</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Lock className="h-8 w-8 text-navy mb-2" />
                    <span className="text-xs">Data Protected</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <CheckCircle className="h-8 w-8 text-navy mb-2" />
                    <span className="text-xs">Verified Service</span>
                  </div>
                </div>
              </CardContent>
            </form>
            <CardFooter className="flex flex-col space-y-4 border-t pt-6">
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link
                  href="/apply-passport"
                  className="text-navy font-medium hover:text-teal transition-colors"
                >
                  Apply for a passport
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="w-full py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Image
                src="/icon/passport-suvidha-icon.png"
                alt="Passport Suvidha Logo"
                width={100}
                height={100}
                className="h-12 w-12"
              />
              <span className="font-medium text-navy">PassportSuvidha</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-navy transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-navy transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-navy transition-colors">
                Contact
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
