import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Mail, Phone, ArrowRight, ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen w-full bg-[#f5f8ff] flex flex-col items-center py-12 px-4 lg:px-8">
      {/* centered card like Figma */}
      <Card className="w-full max-w-4xl rounded-[18px] shadow-2xl border border-transparent overflow-hidden">
        <CardContent className="px-6 sm:px-12 py-12 sm:py-16 flex flex-col items-center">
          <CardHeader className="p-0 mb-4 text-center">
            <CardTitle className="text-2xl sm:text-3xl font-extrabold text-[#103B82] flex items-center justify-center gap-3">
              <Phone className="h-6 w-6 text-blue-700" />
              Verify Your Identity
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-gray-500 mt-2">
              We've sent a 4-digit verification code to your mobile number
            </CardDescription>
          </CardHeader>

          <motion.div
            variants={slideVariants}
            className="w-full max-w-xl flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6 shadow-sm">
              <Mail className="h-9 w-9 text-blue-700" />
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-[#103B82] mb-1">
              Enter 4-Digit Code
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-6">
              Code sent to +91 {formData.mobile}
            </p>

            <div className="flex justify-center gap-4 sm:gap-6 mb-4 w-full">
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
                  className="
                    w-14
                    h-14
                    sm:w-16
                    sm:h-16
                    text-center
                    text-lg
                    sm:text-2xl
                    font-semibold
                    rounded-md
                    border
                    border-gray-200
                    bg-white
                    shadow-sm
                    focus:shadow-outline
                  "
                />
              ))}
            </div>

            {errorMessage && (
              <p className="text-sm text-red-500 mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {errorMessage}
              </p>
            )}

            <div className="text-xs sm:text-sm text-gray-500">
              {isResendDisabled ? (
                <>Resend OTP in {formatTime(timeRemaining)}</>
              ) : (
                <button
                  onClick={handleResendOTP}
                  className="text-[#103B82] font-medium underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Back and Continue buttons aligned like Figma */}
      <div className="w-full max-w-4xl mt-6 flex items-center justify-between px-2 sm:px-6">
        <Button
          onClick={prevStep}
          disabled={loading}
          variant="outline"
          className="flex items-center gap-2 rounded-full px-4 py-2 sm:px-6 sm:py-3 bg-white shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-400 hidden sm:block mr-4"> </div>
          <Button
            onClick={nextStep}
            disabled={!otpVerified || loading}
            className="
              flex items-center gap-2
              rounded-full
              px-6
              py-3
              bg-gradient-to-r from-yellow-400 to-yellow-500
              text-black
              font-semibold
              shadow-2xl
              hover:shadow-2xl
            "
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepVerification;
