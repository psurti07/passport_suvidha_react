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
  Timer,
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
    <>
      <CardHeader>
        <motion.div variants={itemVariants}>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Phone className="h-5 w-5 text-navy" />
            Verify Your Identity
          </CardTitle>
        </motion.div>

        <motion.div variants={itemVariants}>
          <CardDescription>
            We've sent a 4-digit verification code to your mobile number
          </CardDescription>
        </motion.div>
      </CardHeader>

      <CardContent className="space-y-8">
        <motion.div
          variants={slideVariants}
          className="p-6 bg-muted/10 rounded-xl text-center space-y-4"
        >
          <motion.div
            className="mx-auto w-16 h-16 rounded-full bg-navy/10 flex items-center justify-center"
            animate={{
              boxShadow: [
                "0px 0px 0px rgba(0,51,102,0.3)",
                "0px 0px 20px rgba(0,51,102,0.5)",
                "0px 0px 0px rgba(0,51,102,0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Mail className="h-8 w-8 text-navy" />
          </motion.div>

          <h3 className="text-lg font-medium">Enter 4-Digit Code</h3>

          <p className="text-muted-foreground">
            Code sent to {formData.mobile}
          </p>

          <div className="flex justify-center gap-3 max-w-xs mx-auto">
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
                className="modern-input lg:w-14 -h-10 !sm:w-12 !sm:h-12 lg:h-14 text-center text-xl font-medium"
              />
            ))}
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600">
              <AlertCircle className="h-4 w-4 inline mr-1" />
              {errorMessage}
            </p>
          )}

          <Button
            className="w-full bg-gradient-to-r from-navy to-teal text-white"
            onClick={verifyOTP}
            disabled={loading || formData.otp.length < 4}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Verifying..." : "Verify Code"}
          </Button>

          <div className="text-sm mt-2">
            {isResendDisabled ? (
              <span>Resend in {formatTime(timeRemaining)}</span>
            ) : (
              <button onClick={handleResendOTP}>Resend OTP</button>
            )}
          </div>
        </motion.div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button onClick={prevStep} disabled={otpVerified}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button onClick={nextStep} disabled={!otpVerified}>
          Address Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </>
  );
};

export default StepVerification;
