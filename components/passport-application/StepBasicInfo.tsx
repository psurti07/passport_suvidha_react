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
import { User, ShieldCheck, Zap, PlaneIcon } from "lucide-react";

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
      <div className="min-h-screen relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-center bg-no-repeat" />

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-end px-8 py-10">
          <Image
            src="/lending_page/passport_bg.png"
            alt="Passport Background"
            fill
            priority
            className="object-cover -z-10"
          />
          <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* LEFT SIDE TEXT */}
            <motion.div
              variants={itemVariants}
              className="hidden lg:block"
            ></motion.div>

            {/* FORM CARD */}
            <motion.div
              variants={itemVariants}
              className="
               bg-white
              w-full
              max-w-[665px]
              rounded-[17.5px]
              border
              border-gray-200
              shadow-xl
              px-6
              py-6
              md:px-[35px]
              md:pt-[32px]
              md:pb-[35px]
              ml-auto
              space-y-[17.5px]
                "
            >
              <CardHeader className="!p-0 space-y-2">
                <CardTitle
                  className="
              text-xl
              flex
              items-center
              gap-2
              text-[#103B82]
              "
                >
                  <User className="h-5 w-5 text-blue-600" />
                  Basic Information
                </CardTitle>

                <CardDescription className="text-xs mt-2">
                  Please provide your personal details as they appear on your
                  identification documents
                </CardDescription>
              </CardHeader>

              <CardContent className="!p-0 space-y-[17.5px]">
                {errorMessage && (
                  <div
                    className="
          p-3
          bg-red-50
          border
          border-red-200
          rounded-lg
          "
                  >
                    <p className="text-sm text-red-600">{errorMessage}</p>
                  </div>
                )}

                {/* NAME */}

                <div>
                  <Label>Full Name *</Label>

                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="As per Aadhaar / ID"
                    className="
          h-11
          rounded-lg
          border-blue-300
          mt-2
          "
                  />
                </div>

                {/* EMAIL MOBILE */}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Email Address *</Label>

                    <Input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="mt-2 h-11"
                    />
                  </div>

                  <div>
                    <Label>Mobile Number *</Label>

                    <div className="relative mt-2">
                      <div
                        className="
          absolute
          left-3
          top-3
          flex
          gap-2
          items-center
          "
                      >
                        <ReactCountryFlag
                          countryCode="IN"
                          svg
                          className="w-7 h-7 rounded-full"
                        />
                        <span className="text-sm">+91</span>
                      </div>

                      <Input
                        name="mobile"
                        value={formData.mobile}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");

                          e.target.value = value;

                          handleChange(e);
                        }}
                        maxLength={10}
                        placeholder="98765XXXXX"
                        className="
          pl-16
          h-11
          "
                      />
                    </div>
                  </div>
                </div>

                {/* PASSPORT TYPE */}

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      handleChange({
                        target: {
                          name: "passportType",
                          value: "normal",
                        },
                      })
                    }
                    className={`
    h-auto
    p-3
    rounded-lg
    justify-start
    hover:bg-transparent
    ${
      formData.passportType === "normal"
        ? "border-blue-400 bg-blue-50"
        : "border-gray-200"
    }
  `}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <PlaneIcon className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Normal Passport</span>
                      </div>

                      <p className="mt-2 text-xs text-gray-500">
                        Standard Processing Time
                      </p>
                    </div>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      handleChange({
                        target: {
                          name: "passportType",
                          value: "tatkal",
                        },
                      })
                    }
                    className={`
    h-auto
    p-3
    rounded-lg
    justify-start
    hover:bg-transparent
    ${
      formData.passportType === "tatkal"
        ? "border-blue-400 bg-blue-50"
        : "border-gray-200"
    }
  `}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-yellow-500" />
                        <span className="font-medium">Tatkal Passport</span>
                      </div>

                      <p className="mt-2 text-xs text-gray-500">
                        Fast Processing
                      </p>
                    </div>
                  </Button>
                </div>

                {/* BOOK SIZE */}

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      handleChange({
                        target: {
                          name: "bookSize",
                          value: "36",
                        },
                      })
                    }
                    className={`
    rounded-lg
    justify-start
    hover:bg-transparent
    ${
      formData.bookSize === "36"
        ? "border-blue-400 bg-blue-50"
        : "border-gray-200"
    }
  `}
                  >
                    36 pages
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      handleChange({
                        target: {
                          name: "bookSize",
                          value: "60",
                        },
                      })
                    }
                    className={`
    rounded-lg
    justify-start
    hover:bg-transparent
    ${
      formData.bookSize === "60"
        ? "border-blue-400 bg-blue-50"
        : "border-gray-200"
    }
  `}
                  >
                    60 pages
                  </Button>
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

                    <span>I agree to receive promotional communications</span>
                  </label>
                </div>

                {/* SECURITY */}

                <div
                  className="
          bg-blue-50
          rounded-lg
          p-3
          flex
          gap-2
          text-xs
          text-gray-600
          "
                >
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                  Your information is secure and only used for passport
                  processing.
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
          rounded-xl
          bg-gradient-to-r
          from-yellow-400
          to-yellow-500
          text-black
          font-semibold
          "
                >
                  {loading ? "Sending OTP..." : <>Continue →</>}
                </Button>
              </CardFooter>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepBasicInfo;
