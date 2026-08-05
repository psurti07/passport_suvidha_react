import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface StepVerificationProps {
  formData: {
    mobile: string;
    otp: string;
  };
  otpDigits: string[];
  handleOTPChange: (index: number, value: string) => void;
  handleOTPKeyDown: (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => void;
  handleOTPPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  verifyOTP: () => void;
  sendOTP: () => void;
  loading: boolean;
  otpVerified: boolean;
  errorMessage: string;
  itemVariants: any;
  slideVariants: any;
  prevStep: () => void;
  nextStep: () => void;
}

const TIMER_DURATION = 120;
const TIMER_EXPIRY_KEY = "otpResendExpiry";

const StepVerification = ({
  formData,
  otpDigits,
  handleOTPChange,
  handleOTPKeyDown,
  handleOTPPaste,
  verifyOTP,
  sendOTP,
  loading,
  otpVerified,
  errorMessage,
  itemVariants,
  slideVariants,
  prevStep,
  nextStep,
}: StepVerificationProps) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  useEffect(() => {
    const expiryTimeStr = localStorage.getItem(TIMER_EXPIRY_KEY);
    if (!expiryTimeStr) return;

    const expiryTime = parseInt(expiryTimeStr);
    const currentTime = Math.floor(Date.now() / 1000);

    if (expiryTime > currentTime) {
      setTimeRemaining(expiryTime - currentTime);
      setIsResendDisabled(true);
    } else {
      localStorage.removeItem(TIMER_EXPIRY_KEY);
    }
  }, []);

  useEffect(() => {
    if (timeRemaining <= 0) {
      setIsResendDisabled(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          localStorage.removeItem(TIMER_EXPIRY_KEY);
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleResendOTP = () => {
    sendOTP();

    const expiryTime = Math.floor(Date.now() / 1000) + TIMER_DURATION;
    localStorage.setItem(TIMER_EXPIRY_KEY, expiryTime.toString());

    setTimeRemaining(TIMER_DURATION);
    setIsResendDisabled(true);
  };

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl mx-auto">
        <div className="rounded-xl bg-white p-6 shadow-[0_20px_60px_-25px_rgba(0,51,102,0.28)] sm:p-8 md:p-10">
          <CardHeader className="p-0">
            <CardTitle className="flex items-center gap-3 text-xl md:text-2xl font-semibold gradient-heading">
              <div>
                <Phone className="h-5 w-5 text-navy" />
              </div>
              Verify Your Identity
            </CardTitle>

            <CardDescription className="mt-2 pl-6 !text-xs text-muted-foreground">
              We've sent a 4-digit verification code to your mobile number.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 pt-6">
            <motion.div
              variants={slideVariants}
              className="rounded-[20px] bg-gradient-to-br from-slate-50 via-white to-teal-50/70 p-6 text-center shadow-3xl sm:p-8"
            >
              <motion.div
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted"
                animate={{
                  boxShadow: [
                    "0px 0px 0px rgba(0,51,102,0.2)",
                    "0px 0px 20px rgba(0,51,102,0.28)",
                    "0px 0px 0px rgba(0,51,102,0.2)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Mail className="h-8 w-8 text-navy" />
              </motion.div>

              <h3 className="mt-4 text-lg font-semibold text-slate-800">
                Enter 4-Digit Code
              </h3>

              <p className="mt-2 text-xs text-muted-foreground">
                Code sent to {formData.mobile}
              </p>

              <div className="mx-auto my-5 flex max-w-sm justify-center gap-3">
                {otpDigits.map((digit, index) => (
                  <Input
                    key={index}
                    name={`otp-${index}`}
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    onKeyDown={(e) => handleOTPKeyDown(index, e)}
                    onPaste={handleOTPPaste}
                    maxLength={1}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className="modern-input h-14 w-14 rounded-xl bg-white/90 text-center text-sm font-medium text-black"
                  />
                ))}
              </div>

              {errorMessage && (
                <div className="px-3 pb-2 text-sm text-red-600">
                  <AlertCircle className="mr-1 inline h-4 w-4" />
                  {errorMessage}
                </div>
              )}

              {/* <Button
                className="w-full rounded-xl bg-gradient-to-r from-navy to-teal text-white shadow-lg modern-button"
                onClick={verifyOTP}
                disabled={loading || formData.otp.length < 4}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Verifying..." : "Verify Code"}
              </Button> */}

              <div className="mt-4 text-sm text-slate-500">
                {isResendDisabled ? (
                  <span>Resend in {formatTime(timeRemaining)}</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="font-medium text-teal-600 transition hover:text-navy"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </motion.div>
          </CardContent>
        </div>

        <div className="mt-4 flex">
          <CardFooter className="flex w-full gap-2 sm:flex-row justify-between">
            <Button
              onClick={prevStep}
              disabled={otpVerified}
              className="rounded-md bg-primary text-primary-foreground px-4 modern-button"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {/* <Button
              onClick={nextStep}
              disabled={!otpVerified}
              className="rounded-md bg-gradient-to-r from-navy to-teal px-6 text-white shadow-lg modern-button"
            >
              Family Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button> */}
            <Button
              className="rounded-xl bg-gradient-to-r from-navy to-teal text-white shadow-lg modern-button"
              onClick={verifyOTP}
              disabled={loading || formData.otp.length < 4}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Verifying..." : "Verify Code"}
            </Button>
          </CardFooter>
        </div>
      </div>
    </div>
  );
};

export default StepVerification;
