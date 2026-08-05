import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Info,
  Phone,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";

interface FamilyForm {
  fatherName?: string;
  motherName?: string;
  maritalStatus?: string;
  spouseName?: string;
  emergencyContactMobile?: string;
  emergencyContactName?: string;
  emergencyContactEmail?: string;
  errorMessage?: string;
}

interface StepFamilyDetailsProps {
  formData: FamilyForm;
  handleChange: (e: any) => void;
  prevStep: () => void;
  nextStep: () => void;
  loading?: boolean;
  slideVariants?: any;
  itemVariants?: any;
  errorMessage?: any;
}

const StepFamilyDetails = ({
  formData,
  handleChange,
  prevStep,
  nextStep,
  loading = false,
  slideVariants,
  itemVariants,
  errorMessage,
}: StepFamilyDetailsProps) => {
  const [otpVerified, setOtpVerified] = useState(false);
  const [touched, setTouched] = useState({
    fatherName: false,
    motherName: false,
    maritalStatus: false,
    spouseName: false,
    emergencyContactName: false,
    emergencyContactMobile: false,
    emergencyContactEmail: false,
  });

  useEffect(() => {
    setOtpVerified(localStorage.getItem("otpVerified") === "true");
  }, []);

  const isMarried = formData.maritalStatus?.toLowerCase() === "married";

  const errors = {
    fatherName: !formData.fatherName?.trim()
      ? "Father's name is required"
      : !/^[A-Za-z ]+$/.test(formData.fatherName)
        ? "Father's name should only contain letters"
        : "",

    motherName: !formData.motherName?.trim()
      ? "Mother's name is required"
      : !/^[A-Za-z ]+$/.test(formData.motherName)
        ? "Mother's name should only contain letters"
        : "",

    maritalStatus: !formData.maritalStatus ? "Select marital status" : "",

    spouseName:
      isMarried && !formData.spouseName?.trim()
        ? "Spouse name is required"
        : "",

    emergencyContactName: !formData.emergencyContactName?.trim()
      ? "Emergency contact name is required"
      : !/^[A-Za-z ]+$/.test(formData.emergencyContactName)
        ? "Emergency contact name should only contain letters"
        : "",

    emergencyContactMobile: !formData.emergencyContactMobile?.trim()
      ? "Emergency contact number is required"
      : !/^\d{10}$/.test(formData.emergencyContactMobile)
        ? "Enter a valid 10-digit emergency contact number"
        : !/^[6-9]/.test(formData.emergencyContactMobile)
          ? "Emergency contact number should start with 6, 7, 8, or 9"
          : "",

    emergencyContactEmail: !formData.emergencyContactEmail?.trim()
      ? "Emergency contact email is required"
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emergencyContactEmail)
        ? "Enter a valid email address"
        : "",
  };

  const maritalOptions = [
    "Single",
    "Married",
    "Widow",
    "Widower",
    "Separated",
    "Divorced",
  ];

  const onContinue = () => {
    if (!isValid) return;
    nextStep();
  };

  const isValid = Object.values(errors).every((error) => error === "");
  return (
    <>
      <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl mx-auto">
          <div className="rounded-3xl bg-white p-6 shadow-xl">
            <CardHeader className="pl-0 md:p-6">
              <motion.div variants={itemVariants}>
                <CardTitle className="md:text-2xl font-semibold tracking-tight text-2xl flex items-center gap-2 gradient-heading">
                  <Users className="h-5 w-5 text-navy" />
                  Family Details
                </CardTitle>
              </motion.div>

              <motion.div variants={itemVariants}>
                <CardDescription className="!text-xs text-muted-foreground">
                  Please provide your family information as per official
                  records.
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className="p-0 !pt-0">
              {errorMessage && (
                <div className=" p-3 bg-red-50 border border-red-200 rounded-lg ">
                  <p className="text-sm text-red-600">{errorMessage}</p>
                </div>
              )}
              <motion.div
                variants={slideVariants}
                className="rounded-xl bg-gradient-to-br from-slate-50 via-white to-teal-50/70"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-col gap-2"
                  >
                    <Label className="text-sm">Father's Name *</Label>
                    <Input
                      name="fatherName"
                      value={formData.fatherName || ""}
                      onChange={handleChange}
                      onBlur={() =>
                        setTouched((prev) => ({ ...prev, fatherName: true }))
                      }
                      placeholder="Full name"
                      className="modern-input focus-animation"
                    />
                    {touched.fatherName && errors.fatherName && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.fatherName}
                      </p>
                    )}
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="flex flex-col gap-2"
                  >
                    <Label className="text-sm" htmlFor="mobile">
                      Mother's Name *
                    </Label>
                    <Input
                      name="motherName"
                      value={formData.motherName || ""}
                      onChange={handleChange}
                      onBlur={() =>
                        setTouched((prev) => ({ ...prev, motherName: true }))
                      }
                      placeholder="Full name"
                      className="modern-input focus-animation"
                    />
                    {touched.motherName && errors.motherName && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.motherName}
                      </p>
                    )}
                  </motion.div>

                  <motion.div className="flex flex-col gap-3 md:col-span-2">
                    <Label className="text-sm">Marital Status *</Label>

                    <div className="flex flex-wrap gap-2">
                      {maritalOptions.map((status) => (
                        <button
                          name="maritalStatus"
                          key={status}
                          type="button"
                          onClick={() => {
                            setTouched((prev) => ({
                              ...prev,
                              maritalStatus: true,
                            }));

                            handleChange({
                              target: {
                                name: "maritalStatus",
                                value: status,
                              },
                            });
                          }}
                          className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                            formData.maritalStatus === status
                              ? "modern-input focus-animation border border-muted-400 bg-muted scale-105 shadow-lg"
                              : "bg-white/90 text-slate-700 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.06)]"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                    {touched.maritalStatus && errors.maritalStatus && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.maritalStatus}
                      </p>
                    )}
                  </motion.div>

                  {isMarried && (
                    <motion.div className="flex flex-col gap-2 md:col-span-2">
                      <Label className="text-sm">Spouse Name *</Label>

                      <Input
                        name="spouseName"
                        value={formData.spouseName || ""}
                        onChange={handleChange}
                        placeholder="Enter spouse name"
                        className="modern-input focus-animation"
                        onBlur={() =>
                          setTouched((prev) => ({ ...prev, spouseName: true }))
                        }
                      />
                      {touched.spouseName && errors.spouseName && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.spouseName}
                        </p>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>

              <motion.div className="mt-5 flex items-start gap-3 rounded-[18px] bg-muted px-4 py-3 text-sm text-muted-foreground">
                <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-navy" />
                <p>
                  Family details must match the information on your birth
                  certificate or Aadhaar records.
                </p>
              </motion.div>

              <div className="mt-6">
                <CardTitle className="md:text-xl font-semibold tracking-tight text-xl flex items-center gap-2 gradient-heading">
                  <Phone className="h-5 w-5 text-navy" />
                  Emergency Contact Details
                </CardTitle>
              </div>

              <motion.div
                className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3"
                variants={slideVariants}
              >
                <motion.div className="flex flex-col gap-2">
                  <Label className="text-sm">Name *</Label>
                  <Input
                    placeholder="Enter name"
                    value={formData.emergencyContactName}
                    name="emergencyContactName"
                    className="modern-input focus-animation"
                    onChange={handleChange}
                    onBlur={() =>
                      setTouched((prev) => ({
                        ...prev,
                        emergencyContactName: true,
                      }))
                    }
                  />
                  {touched.emergencyContactName &&
                    errors.emergencyContactName && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.emergencyContactName}
                      </p>
                    )}
                </motion.div>

                <motion.div className="flex flex-col">
                  <Label className="text-sm">Mobile Number *</Label>

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
                      name="emergencyContactMobile"
                      value={formData.emergencyContactMobile}
                      placeholder="9876543210"
                      className="
                          pl-20
                          modern-input
                          focus-animation
                        "
                      maxLength={10}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");

                        e.target.value = value;

                        handleChange(e);
                      }}
                      onBlur={() =>
                        setTouched((prev) => ({
                          ...prev,
                          emergencyContactMobile: true,
                        }))
                      }
                    />
                  </div>

                  {touched.emergencyContactMobile &&
                    errors.emergencyContactMobile && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.emergencyContactMobile}
                      </p>
                    )}
                </motion.div>

                <motion.div className="flex flex-col gap-2">
                  <Label className="text-sm">Email *</Label>
                  <Input
                    name="emergencyContactEmail"
                    value={formData.emergencyContactEmail}
                    placeholder="Enter email"
                    className="modern-input focus-animation"
                    onChange={handleChange}
                    onBlur={() =>
                      setTouched((prev) => ({
                        ...prev,
                        emergencyContactEmail: true,
                      }))
                    }
                  />
                  {touched.emergencyContactEmail &&
                    errors.emergencyContactEmail && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.emergencyContactEmail}
                      </p>
                    )}
                </motion.div>
              </motion.div>
            </CardContent>
          </div>

          <motion.div className="mt-4 flex">
            <CardFooter className="flex w-full gap-3 sm:flex-row justify-between">
              <Button
                onClick={prevStep}
                disabled={loading || otpVerified}
                className="rounded-md bg-primary text-primary-foreground px-4 modern-button"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
              >
                <Button
                  onClick={onContinue}
                  disabled={loading || !isValid}
                  className="rounded-xl bg-gradient-to-r from-navy to-teal px-4 text-white shadow-lg modern-button"
                >
                  Address Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </CardFooter>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default StepFamilyDetails;
