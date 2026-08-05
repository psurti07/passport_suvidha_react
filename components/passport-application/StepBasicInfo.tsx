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
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  User,
  ShieldCheck,
  Clock,
  PlaneIcon,
  ArrowRight,
  AlertCircle,
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
        <div className="relative min-h-screen bg-white lg:bg-[url('/lending_page/passport_bg.png')] lg:bg-cover lg:bg-no-repeat lg:bg-left">
          {/* Mobile Hero Image */}
          <div className="block lg:hidden">
            <Image
              src="/lending_page/passport_bg_mobile.png"
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
    </>
  );
};

export default StepBasicInfo;
