import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  User,
  ShieldCheck,
  Clock,
  PlaneIcon,
  ArrowRight,
  AlertCircle,
  FileCheck2,
  Rocket,
  Headphones,
  FileText,
  FileCheck,
  ClipboardCheck,
  BadgeCheck,
  FolderOpen,
  Zap,
  CalendarCheck,
  CreditCard,
  Building2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

interface StepBasicInfoProps {
  formData: {
    fullName: string;
    email: string;
    mobile: string;
    serviceType?: string;
    passportType: "normal" | "tatkal";
    bookSize: "36" | "60";
  };
  handleChange: (e: any) => void;
  nextStep: () => void;
  itemVariants: any;
  errorMessage?: string;
  loading?: boolean;
}

const features = [
  {
    icon: FileCheck2,
    title: "Expert Application Handling",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: Zap,
    title: "Fast & Hassle-Free Process",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: ClipboardCheck,
    title: "Guided Application Process",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Headphones,
    title: "Reliable Customer Care",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
];

const services = [
  {
    title: "Normal Passport",
    description:
      "Complete assistance for applying for a new passport with a smooth process.",
    icon: FileText,
    bg: "bg-blue-100",
    color: "text-blue-700",
  },
  {
    title: "Tatkal Passport",
    description:
      "Fast-track passport assistance with priority application support.",
    icon: Zap,
    bg: "bg-yellow-100",
    color: "text-yellow-700",
  },
  {
    title: "36 Pages",
    description: "Expert checking of documents to avoid mistakes and delays.",
    icon: FileCheck,
    bg: "bg-emerald-100",
    color: "text-emerald-600",
  },
  {
    title: "60 Pages",
    description: "Professional help with form filling and accurate submission.",
    icon: ClipboardCheck,
    bg: "bg-indigo-100",
    color: "text-indigo-700",
  },
  {
    title: "Appointment Schedule",
    description:
      "Guidance for passport office appointments and visit preparation.",
    icon: CalendarCheck,
    bg: "bg-orange-100",
    color: "text-orange-600",
  },
  // {
  //   title: "Reliable Customer Care ",
  //   description:
  //     "Complete guidance from application start to passport delivery.",
  //   icon: ShieldCheck,
  //   bg: "bg-purple-100",
  //   color: "text-purple-600",
  // },
];

const processSteps = [
  {
    title: "Easy Registration",
    description:
      "Register with your basic details to begin your passport application journey.",
    icon: FileText,
    bg: "bg-blue-100",
    color: "text-blue-700",
  },
  {
    title: "Secure Payment",
    description:
      "Pay the service fee through safe and convenient payment methods.",
    icon: CreditCard,
    bg: "bg-emerald-100",
    color: "text-emerald-600",
  },
  {
    title: "Document Upload",
    description:
      "Upload required documents for verification and application processing.",
    icon: FolderOpen,
    bg: "bg-indigo-100",
    color: "text-indigo-700",
  },
  {
    title: "Application Filing",
    description:
      "Our experts prepare your form and submit it with appointment support.",
    icon: BadgeCheck,
    bg: "bg-orange-100",
    color: "text-orange-600",
  },
  {
    title: "Passport Visit",
    description:
      "Visit the passport office on your scheduled appointment date.",
    icon: Building2,
    bg: "bg-red-100",
    color: "text-red-600",
  },
  {
    title: "Home Delivery",
    description: "Receive your passport safely at your registered address.",
    icon: Headphones,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
];

const requiredDocuments = [
  {
    name: "Aadhaar Card",
    icon: "🪪",
    description: "Identity proof",
  },
  {
    name: "PAN Card",
    icon: "💳",
    description: "Financial identity proof",
  },
  {
    name: "Address Proof",
    icon: "🏠",
    description: "Current residence proof",
  },
  {
    name: "Birth Certificate",
    icon: "📄",
    description: "Date of birth proof",
  },
  {
    name: "Passport Photo",
    icon: "📷",
    description: "Recent photograph",
  },
  {
    name: "Leaving Cert",
    icon: "📄",
    description: "School or college leaving certificate",
  },
];

const StepBasicInfo = ({
  formData,
  handleChange,
  nextStep,
  itemVariants,
  errorMessage,
  loading = false,
}: StepBasicInfoProps) => {
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    mobile: false,
    passportType: false,
    bookSize: false,
  });

  const errors = {
    fullName: !formData.fullName.trim()
      ? "Full name is required"
      : !/^[A-Za-z ]+$/.test(formData.fullName)
        ? "Full name should only contain letters"
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
    passportType: !formData.passportType
      ? "Please select passport service type"
      : "",

    bookSize: !formData.bookSize ? "Please select passport page size" : "",
  };

  const StepCard = ({ step, Icon }) => {
    return (
      <div
        className="
        w-full
        rounded-2xl
        bg-white
        border border-gray-100

        p-5

        shadow-sm

        transition-all duration-300

        hover:-translate-y-2
        hover:shadow-xl
      "
      >
        <div
          className={`
          mx-auto
          flex h-12 w-12
          items-center justify-center
          rounded-xl
          ${step.bg}
        `}
        >
          <Icon className={`h-6 w-6 ${step.color}`} />
        </div>

        <h3
          className="
          mt-4
          text-center
          text-base
          font-semibold
        "
        >
          {step.title}
        </h3>

        <p
          className="
          mt-2
          text-center
          text-sm
          leading-5
          text-muted-foreground
        "
        >
          {step.description}
        </p>
      </div>
    );
  };

  const serviceCode =
    formData.passportType === "normal"
      ? `NP${formData.bookSize}`
      : `TP${formData.bookSize}`;

  const isValid =
    !errors.fullName &&
    !errors.email &&
    !errors.mobile &&
    !errors.passportType &&
    !errors.bookSize;
  const [termsAccepted, setTermsAccepted] = useState(true); // ✅ default checked
  const [marketingConsent, setMarketingConsent] = useState(true); // optional
  const [activeService, setActiveService] = useState(0);

  const active = services[activeService];
  const ActiveIcon = active.icon;
  return (
    <>
      <div className="relative min-h-screen">
        {/* Background Image */}
        {/* <Image
          src="/lending_page/passport_bg.png"
          alt="Passport Background"
          fill
          priority
          className="-z-10 object-cover object-center"
        /> */}
        <div className="relative min-h-screen bg-white lg:bg-[url('/lending_page/bg_md.png')] xl:bg-[url('/lending_page/bg_dd.png')] lg:bg-cover lg:bg-no-repeat lg:bg-left">
          {/* Mobile Hero Image */}
          <div className="block lg:hidden">
            <Image
              src="/lending_page/bg_mm.png"
              alt="Passport"
              width={1200}
              height={900}
              priority
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="relative z-10 min-h-screen flex items-center px-3 sm:px-4 lg:px-10 xl:px-16 py-4 lg:py-8 justify-center">
            <div className="container-fluid lg:ml-auto justify-end max-w-7xl grid grid-cols-12 gap-6">
              {/* Left Space */}
              <div className="hidden lg:block lg:col-span-6">
                {/* Empty only on desktop */}
              </div>

              {/* Form */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="
                  col-span-12
                  lg:col-span-6
                  xl:col-span-6
                  mt-0      
                  lg:justify-self-end
                  w-full
                  max-w-[665px]
                  min-h-[650px]
                  rounded-[18px]
                  bg-white
                  shadow-2xl
                  p-5 md:p-8
                  flex
                  flex-col
                  gap-5
                "
              >
                <CardHeader className="!p-0 space-y-2">
                  <CardTitle
                    className="
                      text-xl
                      flex
                      items-center
                      gap-2
                      gradient-heading
                      "
                  >
                    <User className="h-5 w-5 text-navy" />
                    Basic Information
                  </CardTitle>

                  <CardDescription className="text-xs mt-2 text-muted-foreground">
                    Please provide your personal details as they appear on your
                    identification documents
                  </CardDescription>
                </CardHeader>

                <CardContent className="!p-0 space-y-[17.5px]">
                  {errorMessage && (
                    <div className=" p-3 bg-red-50 border border-red-200 rounded-lg ">
                      <p className="text-sm text-red-600">{errorMessage}</p>
                    </div>
                  )}

                  {/* NAME */}

                  <motion.div variants={itemVariants}>
                    <Label className="font-medium">Full Name *</Label>

                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={() =>
                        setTouched((prev) => ({
                          ...prev,
                          fullName: true,
                        }))
                      }
                      placeholder="As per Aadhaar / ID"
                      className=" rounded-lg mt-2 modern-input focus-animation "
                    />
                    {touched.fullName && errors.fullName && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle className="h-3 w-3" />
                        {errors.fullName}
                      </p>
                    )}
                  </motion.div>

                  {/* EMAIL MOBILE */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                      <Label className="font-medium">Email Address *</Label>

                      <Input
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="mt-2 modern-input focus-animation"
                        onBlur={() =>
                          setTouched((prev) => ({
                            ...prev,
                            email: true,
                          }))
                        }
                      />
                      {touched.email && errors.email && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                          <AlertCircle className="h-3 w-3" />
                          {errors.email}
                        </p>
                      )}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Label htmlFor="mobile" className="font-medium">
                        Mobile Number *
                      </Label>

                      <div className="relative mt-2">
                        <div
                          className="
        absolute
        left-3
        top-1/2
        -translate-y-1/2
        z-10
        flex
        items-center
        gap-2
        pointer-events-none
      "
                        >
                          <ReactCountryFlag
                            countryCode="IN"
                            svg
                            className="w-5 h-5 rounded-full"
                          />

                          <span className="text-sm text-gray-700">+91</span>
                          <span className="h-5 w-px bg-gray-300 mx-1"></span>
                        </div>

                        <Input
                          id="mobile"
                          name="mobile"
                          value={formData.mobile}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");

                            e.target.value = value;

                            handleChange(e);
                          }}
                          onBlur={() =>
                            setTouched((prev) => ({
                              ...prev,
                              mobile: true,
                            }))
                          }
                          maxLength={10}
                          placeholder="9876543210"
                          className="
        pl-20
        modern-input
        focus-animation
      "
                        />
                      </div>
                      {touched.mobile && errors.mobile && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                          <AlertCircle className="h-3 w-3" />
                          {errors.mobile}
                        </p>
                      )}

                      <p className="mt-1 text-xs text-muted-foreground">
                        We'll send a verification code to this number.
                      </p>
                    </motion.div>
                  </div>

                  {/* PASSPORT TYPE */}

                  <div className="grid grid-cols-2 xl:grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setTouched((prev) => ({
                            ...prev,
                            passportType: true,
                          }));

                          handleChange({
                            target: {
                              name: "passportType",
                              value: "normal",
                            },
                          });
                        }}
                        className={`
                          h-auto
                          p-3
                          w-full
                          rounded-lg
                          justify-between
                          
                          transition-all
                          duration-300
                          hover:bg-transparent
                          hover:text-black
                          hover:border-navy
                          modern-button
                          ${formData.passportType === "normal" ? "bg-muted scale-105" : "bg-white"}
                        `}
                      >
                        <div className="flex items-center gap-2">
                          <PlaneIcon className="h-5 w-5 text-navy hidden sm:block" />

                          <div className="text-left">
                            <p className="font-medium">
                              Normal{" "}
                              <span className="hidden sm:inline">Passport</span>
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground hidden sm:block lg:hidden xl:block">
                              Standard Processing Time
                            </p>
                          </div>
                        </div>

                        {/* Right Radio Button */}
                        <input
                          type="radio"
                          name="passportType"
                          value="normal"
                          checked={formData.passportType === "normal"}
                          onChange={handleChange}
                          className="h-4 w-4 accent-teal cursor-pointer"
                        />
                      </Button>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setTouched((prev) => ({
                            ...prev,
                            passportType: true,
                          }));

                          handleChange({
                            target: {
                              name: "passportType",
                              value: "tatkal",
                            },
                          });
                        }}
                        className={`
                          h-auto
                          p-3
                          w-full
                          rounded-lg
                          justify-between
                          transition-all
                          duration-300
                          hover:bg-transparent
                          hover:text-black
                          hover:border-navy
                          modern-button
                          ${formData.passportType === "tatkal" ? "bg-muted scale-105" : "bg-white"}
                        `}
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-navy hidden sm:block" />

                          <div className="text-left">
                            <p className="font-medium">
                              Tatkal{" "}
                              <span className="hidden sm:inline">Passport</span>
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground hidden sm:block lg:hidden xl:block">
                              Fast Processing (Urgent)
                            </p>
                          </div>
                        </div>

                        {/* Right Radio Button */}
                        <input
                          type="radio"
                          name="passportType"
                          value="tatkal"
                          checked={formData.passportType === "tatkal"}
                          onChange={handleChange}
                          className="h-4 w-4 accent-teal cursor-pointer"
                        />
                      </Button>
                      {touched.passportType && errors.passportType && (
                        <p className="mt-2 flex items-center gap-1 text-xs text-red-600">
                          <AlertCircle className="h-3 w-3" />
                          {errors.passportType}
                        </p>
                      )}
                    </motion.div>
                  </div>

                  {/* BOOK SIZE */}

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setTouched((prev) => ({
                            ...prev,
                            bookSize: true,
                          }));

                          handleChange({
                            target: {
                              name: "bookSize",
                              value: "36",
                            },
                          });
                        }}
                        className={`
                          w-full
                          rounded-md
                          justify-between
                          transition-all
                          duration-300
                          hover:bg-transparent
                          hover:text-black
                          hover:border-navy
                          modern-button
                          ${formData.bookSize === "36" ? "bg-muted scale-105" : "bg-white"}
                        `}
                      >
                        <span>36 pages</span>

                        <input
                          type="radio"
                          name="bookSize"
                          value="36"
                          checked={formData.bookSize === "36"}
                          onChange={handleChange}
                          className="h-4 w-4 accent-teal cursor-pointer"
                        />
                      </Button>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setTouched((prev) => ({
                            ...prev,
                            bookSize: true,
                          }));

                          handleChange({
                            target: {
                              name: "bookSize",
                              value: "60",
                            },
                          });
                        }}
                        className={`
                          w-full
                          rounded-lg
                          justify-between
                          transition-all
                          duration-300
                          hover:bg-transparent
                          hover:text-black
                          hover:border-navy
                          modern-button
                          ${formData.bookSize === "60" ? "bg-muted scale-105" : "bg-white"}
                        `}
                      >
                        <span>60 pages</span>

                        <input
                          type="radio"
                          name="bookSize"
                          value="60"
                          checked={formData.bookSize === "60"}
                          onChange={handleChange}
                          className="h-4 w-4 accent-teal cursor-pointer"
                        />
                      </Button>
                      {touched.bookSize && errors.bookSize && (
                        <p className="mt-2 flex items-center gap-1 text-xs text-red-600">
                          <AlertCircle className="h-3 w-3" />
                          {errors.bookSize}
                        </p>
                      )}
                    </motion.div>
                  </div>

                  {/* TERMS */}

                  <div className="space-y-3 text-xs">
                    <label className="flex gap-2">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                      />

                      <span>
                        By submitting the form, you agree to Terms of Use and
                        Privacy Policy
                      </span>
                    </label>

                    <label className="flex gap-2">
                      <input
                        type="checkbox"
                        checked={marketingConsent}
                        onChange={(e) => setMarketingConsent(e.target.checked)}
                      />

                      <span>
                        I agree to receive promotional & informational
                        communications from passport suvidha via Email, SMS or
                        Calls.
                      </span>
                    </label>
                  </div>

                  {/* SECURITY */}

                  <div
                    className="
                      bg-muted
                      rounded-lg
                      p-3
                      flex
                      gap-2
                      text-xs
                      text-muted-foreground
                      "
                  >
                    <ShieldCheck className="h-5 w-5 text-teal" />
                    Your information is secure and will only be used for
                    passport processing purposes.
                  </div>
                </CardContent>

                <CardFooter className="!p-0 !pt-2">
                  <Button
                    onClick={nextStep}
                    disabled={
                      !isValid || loading || !termsAccepted || !marketingConsent
                    }
                    className="
          w-full
          h-11
          rounded-xl bg-gradient-to-r from-navy to-teal text-white shadow-lg modern-button
          font-semibold
          "
                  >
                    {loading ? (
                      "Sending OTP..."
                    ) : (
                      <>
                        Continue{" "}
                        <ArrowRight className="inline-block ml-1 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* How it work section */}
      <section className="py-10 lg:py-16  bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 ">
            <h2 className="text-3xl md:text-4xl font-bold gradient-heading">
              How It Works
            </h2>

            <p className="mt-3 text-muted-foreground text-xs lg:text-sm max-w-2xl mx-auto">
              Follow our simple 6-step process to complete your passport
              application smoothly.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Line */}
            <div
              className="
          hidden lg:block
          absolute
          top-1/2
          left-[8%]
          right-[8%]
          h-[3px]
          bg-gray-200
          -translate-y-1/2
        "
            />

            <div
              className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-6
          gap-10
          lg:gap-5
          md:px-6
        "
            >
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                const isTop = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className="
                relative
                flex
                lg:flex-col
                items-center
              "
                  >
                    {/* Top Card */}
                    {isTop && <StepCard step={step} Icon={Icon} />}

                    {/* Center Circle */}
                    <div
                      className="
                  relative z-10
                  flex h-16 w-16
                  shrink-0
                  items-center justify-center

                  rounded-full

                  bg-white
                  border-4 border-teal

                  shadow-lg
                  my-6
                  lg:my-8
                "
                    >
                      <span
                        className="
                    text-sm
                    font-bold
                    text-navy
                  "
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Bottom Card */}
                    {!isTop && <StepCard step={step} Icon={Icon} />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* our services section  */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy/5 to-teal/5 py-10 md:py-16">
        {/* Background Decoration */}
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-teal/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-navy/10 blur-3xl" />

        {/* Heading */}
        <div className="container mx-auto mb-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-bold gradient-heading md:text-4xl">
              Fresh Passport Application Services
            </h2>

            <p className="mt-3 text-xs text-muted-foreground lg:text-sm">
              Professional passport assistance with simple, secure and reliable
              application support.
            </p>
          </motion.div>
        </div>

        {/* Icon Services */}
        <div className="container flex flex-wrap flex-rows justify-center gap-2 md:gap-6 px-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.5,
                }}
                whileHover={{ y: -8 }}
                className={`group w-[160px] md:w-[200px] ${index > 1 ? "hidden sm:block" : ""}`}
              >
                <div
                  className="
              relative
              flex
              h-full
              flex-col
              items-center
              justify-center
              overflow-hidden
              rounded-3xl
              bg-white
              p-6
              text-center
              shadow-lg
              transition-all
              duration-300
              hover:shadow-2xl
              hover:border
              hover:border-teal/30
            "
                >
                  {/* Top Hover Line */}
                  <div
                    className="
    absolute
    left-0
    top-0
    h-1
    w-full
    origin-left
    scale-x-0
    bg-gradient-to-r
    from-navy
    via-teal
    to-navy
    transition-transform
    duration-300
    group-hover:scale-x-100
  "
                  />

                  {/* Top Right Circle */}
                  <div
                    className="
    absolute
    -right-12
    -top-12
    h-28
    w-28
    rounded-full
    bg-teal/5
    transition-transform
    duration-500
    group-hover:scale-150
  "
                  />

                  {/* Bottom Left Circle */}
                  <div
                    className="
    absolute
    -bottom-12
    -left-12
    h-28
    w-28
    rounded-full
    bg-navy/5
    transition-transform
    duration-500
    group-hover:scale-150
  "
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{
                      rotate: 10,
                      scale: 1.1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 250,
                    }}
                    className="
                relative
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-teal/20
                to-navy/10
                shadow-md
              "
                  >
                    <Icon className="h-8 w-8 text-teal" />
                  </motion.div>

                  {/* Title Only */}
                  <h3
                    className="
                mt-6
                text-lg
                font-semibold
                text-navy
              "
                  >
                    {service.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Requier Documents section  */}
      <section className="py-10 md:py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold gradient-heading">
              Required Documents
            </h2>

            <p className="mt-3 text-muted-foreground text-xs lg:text-sm max-w-2xl mx-auto">
              Keep these documents ready for a smooth passport application
              process
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {requiredDocuments.map((document, index) => (
              <div
                key={index}
                className="
            group
            bg-white
            rounded-2xl
            p-5
            shadow-sm
            border
            border-gray-100
            hover:shadow-lg
            hover:-translate-y-1
            transition-all
            duration-300
            text-center
          "
              >
                <div
                  className="
              mx-auto
              h-16
              w-16
              rounded-full
              bg-gradient-to-br
              from-teal/20
              to-teal/5
              flex
              items-center
              justify-center
              group-hover:scale-110
              transition
            "
                >
                  <span className="text-3xl">{document.icon}</span>
                </div>

                <h3 className="mt-4 text-sm font-semibold">{document.name}</h3>

                <p className="mt-2 text-xs text-muted-foreground">
                  {document.description}
                </p>
              </div>
            ))}
          </div>

          <div
            className="
        mt-8
        bg-white
        rounded-xl
        p-2
        flex
        items-center
        justify-center
        gap-2
        text-sm
        text-muted-foreground
        shadow-sm
        border
        border-gray-100
      "
          >
            <span className="text-teal font-bold text-lg">✓</span>
            Documents may vary based on the type of passport application
          </div>
        </div>
      </section>

      {/* why choose passport suvidha section  */}
      <section className="hidden md:block py-10 md:py-16 bg-gradient-to-br from-navy/5 to-teal/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-heading">
              Why Choose Passport Suvidha?
            </h2>

            <p className="mt-3 text-muted-foreground text-xs lg:text-sm max-w-2xl mx-auto">
              Experience a hassle-free passport application process with expert
              assistance, quick document verification, and dedicated customer
              support.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <CardHeader
                    className="
                group
                h-full
                rounded-3xl
                bg-white
                shadow-md
                hover:shadow-2xl
                transition-all
                duration-300
                !p-0
              "
                  >
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <motion.div
                        whileHover={{ rotate: 8, scale: 1.12 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                        }}
                        className={`
                    ${feature.bg}
                    h-16
                    w-16
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    mb-5
                  `}
                      >
                        <Icon className={`h-8 w-8 ${feature.color}`} />
                      </motion.div>

                      <h3 className="text-lg font-semibold">{feature.title}</h3>

                      {/* <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {feature.description}
                      </p> */}
                    </CardContent>
                  </CardHeader>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Your Passport Journey Starts Here  */}
      <section className="mt-0 md:mt-16">
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

      {/* Important Disclaimer  */}
      <section className="pt-8 mb-10">
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
    </>
  );
};

export default StepBasicInfo;
