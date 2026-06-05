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
import { Card } from "@/components/ui/card";
import Image from "next/image";
import {
  Shield,
  User,
  ArrowRight,
  Loader2,
  ShieldCheck,
  MapPin,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Headphones,
  Award,
  CalendarCheck,
  SearchCheck,
  Calendar,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const steps = [
  {
    title: "Basic Information",
    description:
      "Provide your personal details including name, email address and mobile number to begin your passport application.",
    icon: User,
  },
  {
    title: "Mobile Verification",
    description:
      "Verify your registered mobile number through OTP authentication for secure application processing.",
    icon: ShieldCheck,
  },
  {
    title: "Address Details",
    description:
      "Enter your current residential address and supporting information required for passport verification.",
    icon: MapPin,
  },
  {
    title: "Passport Service",
    description:
      "Choose the passport service that best suits your requirements and proceed with the application.",
    icon: FileText,
  },
];
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

  const isValid =
    !errors.firstName && !errors.lastName && !errors.email && !errors.mobile;
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
            Please provide your personal details as they appear on your
            identification documents
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
                I agree to receive promotional & informational communications
                from PassportSuvidha through Emails, calls or SMS, RCS Services.
              </Label>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 p-3 bg-navy/5 rounded-lg text-sm text-muted-foreground"
            whileHover={{ backgroundColor: "rgba(0, 51, 102, 0.1)" }}
          >
            <div>
              <Shield className="h-5 w-5 text-navy" />
            </div>
            <p>
              Your information is secure and will only be used for passport
              processing purposes.
            </p>
          </motion.div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t py-6 px-4">
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            className="bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button"
            onClick={nextStep}
            disabled={
              !isValid || loading || !termsAccepted || !marketingConsent
            }
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

      <section className="w-full py-20 md:py-24 bg-gradient-to-br from-teal/5 via-navy/5 to-teal/5 relative overflow-hidden w-screen relative left-1/2 -translate-x-1/2">
        {/* <div className="container"> */}
        <div className="container">
          <div className="text-center mb-5 md:mb-10 mordern-card">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-navy">
              Why Choose Passport Suvidha?
            </h2>

            <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Fast, reliable and expert passport assistance across India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
            <div className="group relative grid-rows-1">
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-navy to-teal opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
              <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white h-full flex flex-col">
                {/* <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white"> */}
                <CardContent className="p-5 sm:p-6 lg:p-7 text-center">
                  <ShieldCheck className="mx-auto h-8 w-8 sm:h-10 sm:w-10 text-teal mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold">
                    Secure Process
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-6">
                    Your information is protected with secure handling and
                    encrypted systems.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="group relative grid-rows-1">
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-navy to-teal opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
              <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white">
                <CardContent className="p-5 sm:p-6 lg:p-7 text-center">
                  <FileText className="mx-auto h-8 w-8 sm:h-10 sm:w-10 text-teal mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold">
                    Document Assistance
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-6">
                    Expert guidance for required documents and application
                    preparation.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="group relative grid-rows-1">
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-navy to-teal opacity-0 blur transition duration-300 group-hover:opacity-100"></div>

              <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white">
                <CardContent className="p-5 sm:p-6 lg:p-7 text-center">
                  <Clock className="mx-auto h-8 w-8 sm:h-10 sm:w-10 text-teal mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold">
                    Quick Processing
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-6">
                    Streamlined passport application process with expert
                    guidance and timely assistance at every step.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="group relative grid-rows-1">
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-navy to-teal opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
              <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white">
                <CardContent className="p-5 sm:p-6 lg:p-7 text-center">
                  <Headphones className="mx-auto h-8 w-8 sm:h-10 sm:w-10 text-teal mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold">
                    Dedicated Support
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-6">
                    Get reliable assistance from our experienced support team
                    for all your passport-related queries.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        {/* </div> */}
      </section>

      <section className="overflow-hidden py-20 md:py-24">
        <div className="container">
          {/* Heading */}
          <div className="text-center mb-5 md:mb-10">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-navy">
              Apply Passport In Just 4 Steps
            </h2>

            <p className="mt-3 md:mt-4 text-sm md:text-lg text-gray-600 max-w-3xl mx-auto">
              Simple online process designed to help applicants complete their
              passport application quickly and confidently.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Left Badge */}
            <div className="group hidden xl:flex absolute -left-8 top-24 z-10">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-navy to-teal opacity-0 blur-lg transition-all duration-500 group-hover:opacity-30" />

              <div className="relative bg-white border rounded-2xl px-5 py-4 shadow-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105">
                <p className="text-md font-bold text-teal">4 Steps</p>
                <p className="text-md text-gray-500">Easy Process</p>
              </div>
            </div>

            {/* Right Badge */}
            <div className="group hidden xl:flex absolute -right-8 bottom-24 z-10">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-teal to-navy opacity-0 blur-lg transition-all duration-500 group-hover:opacity-30" />

              <div className="relative bg-white border rounded-2xl px-5 py-4 shadow-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105">
                <p className="text-xl font-bold text-navy">100%</p>
                <p className="text-sm text-gray-500">Guided Assistance</p>
              </div>
            </div>

            {/* Mobile Stats */}
            <div className="xl:hidden flex justify-center gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-lg border px-4 py-3 text-center">
                <p className="text-lg font-bold text-teal">4 Steps</p>
                <p className="text-xs text-gray-500">Easy Process</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border px-4 py-3 text-center">
                <p className="text-lg font-bold text-navy">100%</p>
                <p className="text-xs text-gray-500">Guided Assistance</p>
              </div>
            </div>

            {/* Image */}
            <div className="rounded-2xl md:rounded-[40px] bg-gradient-to-br from-navy/5 to-teal/5 p-8 sm:p-5 md:p-8">
              <div
                className="
            group
            overflow-hidden
            rounded-2xl md:rounded-3xl
            transition-all duration-500
            hover:-translate-y-2
            hover:shadow-[0_35px_100px_rgba(0,51,102,0.20)]
          "
              >
                {/* <Image
                  src="/lending_page/img2.jpg"
                  alt="Passport Suvidha Process Flow"
                  width={1200}
                  height={600}
                  priority
                  className="
              w-full
              h-auto
              object-contain
              transition-transform duration-500
              group-hover:scale-[1.02]
            "
                /> */}

                <Image
                  src="/lending_page/img1.jpg"
                  alt="Passport Suvidha Process Flow"
                  width={1200}
                  height={600}
                  priority
                  className="
    w-full
    h-auto
    object-contain
    rounded-2xl md:rounded-3xl
    transition-all duration-500
    group-hover:scale-[1.02]
  "
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-20 md:py-24 bg-gradient-to-br from-teal/5 via-navy/5 to-teal/5 relative overflow-hidden w-screen relative left-1/2 -translate-x-1/2">
        {/* <section className="bg-slate-50 pt-0 pb-20 md:pt-0 md:pb-24"> */}
        <div className="container">
          {/* <div className="mx-auto"> */}
          <div className="text-center mb-5 md:mb-10">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-navy">
              Services We Assist With
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            <div className="group relative grid-rows-1">
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-navy to-teal opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
              <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white">
                <CardContent className="p-6 sm:p-7 text-center">
                  <h3 className="text-lg font-semibold mb-2">Fresh Passport</h3>

                  <p className="text-sm text-gray-600 leading-6">
                    Complete assistance for first-time passport applications
                    with expert guidance.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="group relative grid-rows-1">
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-navy to-teal opacity-0 blur transition duration-300 group-hover:opacity-100"></div>

              <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white">
                <CardContent className="p-5 sm:p-6 lg:p-7 text-center">
                  <h3 className="font-semibold mb-2">Passport Renewal</h3>
                  <p className="text-gray-600 text-[14px]">
                    Hassle-free support for expired or expiring passports with
                    guidance
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="group relative grid-rows-1">
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-navy to-teal opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
              <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white">
                <CardContent className="p-5 sm:p-6 lg:p-7 text-center">
                  <h3 className="font-semibold mb-2">Tatkal Passport</h3>
                  <p className="text-gray-600 text-[14px]">
                    Quick assistance for urgent passport applications with
                    expert guidance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* </div> */}
        </div>
      </section>

      <section className="mt-20 md:mt-24">
        <div className="container">
          <div className="mt-0 rounded-3xl bg-gradient-to-r from-navy to-teal p-6 sm:p-8 lg:p-10 text-white">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold">
                  Your Passport Journey Starts Here
                </h3>

                <p className="mt-3 text-sm text-white/80 leading-7 max-w-2xl">
                  Our team provides guidance and support throughout the passport
                  application process, helping applicants complete their journey
                  with confidence and convenience.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur px-4 sm:px-5 py-3 rounded-2xl">
                <CheckCircle className="h-6 w-6 text-green-300" />
                <span className="text-sm font-medium">
                  Secure • Reliable • Professional
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-4 sm:p-6 lg:p-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-1" />

              <div>
                <h3 className="text-base sm:text-md font-semibold text-amber-900">
                  Important Disclaimer
                </h3>

                <p className="mt-3 text-xs sm:text-sm lg:text-sm text-amber-800 leading-6 sm:leading-7">
                  Passport Suvidha is a private consultancy service and is not
                  affiliated with, endorsed by, or operated by the Government of
                  India, Passport Seva, or any government authority. We provide
                  application assistance, document guidance, appointment
                  support, and customer assistance services. Government fees,
                  processing timelines, approval decisions, and passport
                  issuance remain solely under the jurisdiction of the relevant
                  government authorities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        <Card className="rounded-3xl border-0 shadow-[0_20px_60px_rgba(15,23,42,0.08)] hover:-translate-y-2 transition-all duration-300">
          <CardContent className="p-6">
            <div className="h-14 w-14 rounded-2xl bg-navy/10 flex items-center justify-center mb-5">
              <FileText className="h-7 w-7 text-navy" />
            </div>
            <h3 className="font-bold text-lg mb-2">
              Application Form Assistance
            </h3>
            <p className="text-gray-600">
              Get expert guidance while filling your passport application to
              reduce errors and avoid unnecessary delays.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-[0_20px_60px_rgba(15,23,42,0.08)] hover:-translate-y-2 transition-all duration-300">
          <CardContent className="p-6">
            <div className="h-14 w-14 rounded-2xl bg-green-100 flex items-center justify-center mb-5">
              <ShieldCheck className="h-7 w-7 text-green-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Document Review</h3>
            <p className="text-gray-600">
              Receive assistance in preparing and reviewing required documents
              before submission.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-[0_20px_60px_rgba(15,23,42,0.08)] hover:-translate-y-2 transition-all duration-300">
          <CardContent className="p-6">
            <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-5">
              <CalendarCheck className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">
              Appointment Booking Support
            </h3>
            <p className="text-gray-600">
              Assistance with scheduling your Passport Seva Kendra appointment
              at your preferred location.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-[0_20px_60px_rgba(15,23,42,0.08)] hover:-translate-y-2 transition-all duration-300">
          <CardContent className="p-6">
            <div className="h-14 w-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-5">
              <Search className="h-7 w-7 text-purple-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Application Tracking</h3>
            <p className="text-gray-600">
              Stay updated throughout the application journey with guidance and
              status support.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-[0_20px_60px_rgba(15,23,42,0.08)] hover:-translate-y-2 transition-all duration-300">
          <CardContent className="p-6">
            <div className="h-14 w-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-5">
              <Headphones className="h-7 w-7 text-orange-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Dedicated Support</h3>
            <p className="text-gray-600">
              Connect with our support team whenever you need assistance during
              the application process.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-[0_20px_60px_rgba(15,23,42,0.08)] hover:-translate-y-2 transition-all duration-300">
          <CardContent className="p-6">
            <div className="h-14 w-14 rounded-2xl bg-teal-100 flex items-center justify-center mb-5">
              <Award className="h-7 w-7 text-teal-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">End-To-End Guidance</h3>
            <p className="text-gray-600">
              Expert assistance from registration and documentation to
              appointment booking and passport delivery.
            </p>
          </CardContent>
        </Card>
      </div> */}
    </>
  );
};

export default StepBasicInfo;
