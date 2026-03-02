import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Mail, Phone, Check, ArrowRight, ArrowLeft, Loader2, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface StepVerificationProps {
  formData: {
    mobile: string;
    otp: string;
  };
  otpDigits: string[];
  handleOTPChange: (index: number, value: string) => void;
  handleOTPKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
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

const TIMER_DURATION = 120; // 2 minutes in seconds
const TIMER_EXPIRY_KEY = 'otpResendExpiry';

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
  nextStep
}: StepVerificationProps) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  
  // Initialize timer from localStorage on component mount
  useEffect(() => {
    const initializeTimer = () => {
      if (typeof window === 'undefined') return 0;
      
      try {
        const expiryTimeStr = localStorage.getItem(TIMER_EXPIRY_KEY);
        if (!expiryTimeStr) return 0;
        
        const expiryTime = parseInt(expiryTimeStr);
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (expiryTime > currentTime) {
          // Timer is still active
          const remaining = expiryTime - currentTime;
          setIsResendDisabled(true);
          return remaining;
        } else {
          // Timer has expired
          localStorage.removeItem(TIMER_EXPIRY_KEY);
          return 0;
        }
      } catch (error) {
        console.error('Error retrieving timer:', error);
        return 0;
      }
    };
    
    const initialTime = initializeTimer();
    setTimeRemaining(initialTime);
  }, []);
  
  // Set up the timer countdown
  useEffect(() => {
    if (timeRemaining <= 0) {
      setIsResendDisabled(false);
      return;
    }
    
    setIsResendDisabled(true);
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          localStorage.removeItem(TIMER_EXPIRY_KEY);
          setIsResendDisabled(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timerInterval);
  }, [timeRemaining]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Handle resend OTP with localStorage persistence
  const handleResendOTP = () => {
    sendOTP();
    
    // Save expiry time to localStorage
    const currentTime = Math.floor(Date.now() / 1000);
    const expiryTime = currentTime + TIMER_DURATION;
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
        <div className="space-y-6">        
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
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <Mail className="h-8 w-8 text-navy" />
              </motion.div>
              <h3 className="text-lg font-medium">
                Enter 4-Digit Code
              </h3>
              <p className="text-muted-foreground">
                We've sent a verification code to your mobile number {formData.mobile}
              </p>
              <div className="flex justify-center gap-3 max-w-xs mx-auto">
                {otpDigits.map((digit, index) => (
                  <Input
                    key={index}
                    name={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    onKeyDown={(e) => handleOTPKeyDown(index, e)}
                    onPaste={handleOTPPaste}
                    maxLength={1}
                    className="modern-input w-14 h-14 text-center text-xl font-medium focus-animation"
                    autoComplete="one-time-code"
                    inputMode="numeric"
                  />
                ))}
              </div>
              {errorMessage && (
                <p className="text-sm text-red-600 mt-2">
                  <AlertCircle className="h-4 w-4 inline mr-1" />
                  {errorMessage}
                </p>
              )}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="w-full bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button"
                  onClick={verifyOTP}
                  disabled={loading || formData.otp.length < 4}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {loading ? "Verifying..." : "Verify Code"}
                </Button>
              </motion.div>
              <div className="flex items-center justify-center gap-2 text-sm mt-2">
                <span>Didn't receive the code?</span>
                {isResendDisabled && timeRemaining > 0 ? (
                  <div className="flex items-center bg-navy/10 px-3 py-1 rounded-full text-navy">
                    <Timer className="h-3 w-3 mr-1" />
                    <span>Resend in {formatTime(timeRemaining)}</span>
                  </div>
                ) : (
                  <button 
                    className="text-navy bg-navy/5 px-3 py-1 rounded-full hover:bg-navy/10 font-medium"
                    onClick={handleResendOTP}
                    disabled={loading}
                  >
                    Resend
                  </button>
                )}
              </div>
            </motion.div>        
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
          <motion.div variants={itemVariants}>
            <Button
              variant="outline"
              className="rounded-xl border-navy/20 hover:bg-navy/5"
              onClick={prevStep}
              disabled={otpVerified}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              className="bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button"
              onClick={nextStep}
              disabled={!otpVerified}
            >
              Address Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </CardFooter>
    </>
  );
};

export default StepVerification; 