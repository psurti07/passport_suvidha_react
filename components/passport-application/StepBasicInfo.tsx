import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shield, User, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface StepBasicInfoProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
  };
  handleChange: (e: any) => void;
  nextStep: () => void;
  itemVariants: any;
  errorMessage?: string;
  loading?: boolean;
}

const StepBasicInfo = ({
  formData,
  handleChange,
  nextStep,
  itemVariants,
  errorMessage,
  loading = false,
}: StepBasicInfoProps) => {
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    mobile: false,
  });

  const errors = {
    firstName: !formData.firstName.trim()
      ? "First name is required"
      : !/^[A-Za-z ]+$/.test(formData.firstName)
        ? "First name should only contain letters"
        : "",
    lastName: !formData.lastName.trim()
      ? "Last name is required"
      : !/^[A-Za-z ]+$/.test(formData.lastName)
        ? "Last name should only contain letters"
        : "",
    email: !formData.email.trim()
      ? "Email is required"
      : !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)
        ? "Enter a valid email address"
        : "",
    mobile: !formData.mobile.trim()
      ? "Mobile number is required"
      : !/^\d{10}$/.test(formData.mobile)
        ? "Enter a valid 10-digit mobile number"
        : !/^[6-9]/.test(formData.mobile)
          ? "Mobile number should start with 6, 7, 8, or 9"
          : "",
  };

  const isValid = !errors.firstName && !errors.lastName && !errors.email && !errors.mobile;
  const [termsAccepted, setTermsAccepted] = useState(true); // ✅ default checked
  const [marketingConsent, setMarketingConsent] = useState(true); // optional
  return (
    <>
      <CardHeader>
        <motion.div variants={itemVariants}>
          <CardTitle className="text-2xl flex items-center gap-2">
            <User className="h-5 w-5 text-navy" />
            Basic Information
          </CardTitle>
        </motion.div>
        <motion.div variants={itemVariants}>
          <CardDescription>
            Please provide your personal details as they appear on your identification documents
          </CardDescription>
        </motion.div>
      </CardHeader>
      <CardContent className="space-y-8">
        {errorMessage && (
          <motion.div
            variants={itemVariants}
            className="p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <p className="text-sm text-red-600">{errorMessage}</p>
          </motion.div>
        )}

        <div className="space-y-6">
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={() => setTouched((t) => ({ ...t, firstName: true }))}
                placeholder="Enter your first name"
                className="modern-input focus-animation"
                required
              />
              {touched.firstName && errors.firstName && (
                <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={() => setTouched((t) => ({ ...t, lastName: true }))}
                placeholder="Enter your last name"
                className="modern-input focus-animation"
                required
              />
              {touched.lastName && errors.lastName && (
                <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
              )}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                placeholder="Enter your email"
                className="modern-input focus-animation"
                required
              />
              {touched.email && errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={(e) => {
                  // Only allow digits
                  const value = e.target.value.replace(/[^\d]/g, "");
                  e.target.value = value;
                  handleChange(e);
                }}
                onBlur={() => setTouched((t) => ({ ...t, mobile: true }))}
                placeholder="Enter your mobile number"
                className="modern-input focus-animation"
                required
                maxLength={10}
                inputMode="numeric"
                pattern="[6-9]{1}[0-9]{9}"
              />
              <p className="text-xs text-muted-foreground">
                We'll send a verification code to this number
              </p>
              {touched.mobile && errors.mobile && (
                <p className="text-xs text-red-600 mt-1">{errors.mobile}</p>
              )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            {/* Terms & Privacy */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-xs leading-5">
                By submitting the form, you agree to the{" "}
                <a href="/terms" className="text-muted-foreground">
                  Terms of Use
                </a>{" "}
                and{" "}
                <a href="/privacy-policy" className="text-muted-foreground">
                  Privacy Policy
                </a>{" "}
                of PassportSuvidha.
              </Label>
            </div>

            {/* Marketing Consent */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="marketing"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                name="marketing"
                className="mt-1"
              />
              <Label htmlFor="marketing" className="text-xs leading-5">
                I agree to receive promotional & informational communications from PassportSuvidha through Emails, calls or SMS, RCS Services.
              </Label>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 p-3 bg-navy/5 rounded-lg text-sm text-muted-foreground"
            whileHover={{ backgroundColor: "rgba(0, 51, 102, 0.1)" }}
          >
            <Shield className="h-5 w-5 text-navy" />
            <p>
              Your information is secure and will only be used for passport processing purposes.
            </p>
          </motion.div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t pt-6">
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            className="bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button"
            onClick={nextStep}
            disabled={!isValid || loading || !termsAccepted || !marketingConsent}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending OTP...
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </motion.div>
      </CardFooter>
    </>
  );
};

export default StepBasicInfo;
