import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Field } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Users, Info, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface FamilyForm {
  fatherName?: string;
  motherName?: string;
  maritalStatus?: string;
  spouseName?: string;
  numberOfChildren?: string | number;
  guardianName?: string;
  guardianRelation?: string;
}

interface StepFamilyDetailsProps {
  formData: FamilyForm;
  handleChange: (field: keyof FamilyForm, value: any) => void;
  prevStep: () => void;
  nextStep: () => void;
  loading?: boolean;
  slideVariants?: any;
  itemVariants?: any;
}

const StepFamilyDetails = ({
  formData,
  handleChange,
  prevStep,
  nextStep,
  loading = false,
  slideVariants,
  itemVariants,
}: StepFamilyDetailsProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // clear errors when user types
    if (Object.keys(errors).length === 0) return;
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        // remove error if field now has value
        if ((formData as any)[k]) delete next[k];
      });
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!formData.fatherName?.trim())
      e.fatherName = "Father's name is required";
    if (!formData.motherName?.trim())
      e.motherName = "Mother's name is required";
    if (!formData.maritalStatus) e.maritalStatus = "Select marital status";
    if (formData.maritalStatus === "Married" && !formData.spouseName?.trim())
      e.spouseName = "Spouse name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onContinue = () => {
    if (!validate()) return;
    nextStep();
  };

  return (
    <div className="container mx-auto w-full min-h-screen bg-[#f7faff] px-4 sm:px-8 py-6">
      <Card className="w-full rounded-xl border border-[#dbe7ff] shadow-none bg-white">
        <CardContent className="p-6 sm:p-10">
          {/* Family Header */}
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#EDF4FF] flex items-center justify-center">
                <Users className="w-5 h-5 text-[#103B82]" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#103B82]">
                  Family Details
                </h3>
              </div>
            </div>
            <div className="mt-1 px-4 pb-3 flex items-center gap-3 text-sm text-[#52648A]">
              <p>
                Please provide your family information as per official records.
              </p>
            </div>
          </div>

          <motion.div
            variants={slideVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-6"
          >
            {/* Father */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-semibold uppercase tracking-[2px] text-[#52648A]">
                FATHER'S NAME *
              </label>
              <Input
                value={formData.fatherName || ""}
                onChange={(e) => handleChange("fatherName", e.target.value)}
                placeholder="Full name"
                className="h-12 rounded-xl border-[#D9E3F5]"
              />
            </div>

            {/* Mother */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-semibold uppercase tracking-[2px] text-[#52648A]">
                MOTHER'S NAME *
              </label>
              <Input
                value={formData.motherName || ""}
                onChange={(e) => handleChange("motherName", e.target.value)}
                placeholder="Full name"
                className="h-12 rounded-xl border-[#D9E3F5]"
              />
            </div>

            {/* Marital Status */}
            <div className="lg:col-span-2">
              <label className="text-xs font-semibold tracking-wider text-[#52648a]">
                MARITAL STATUS *
              </label>

              <div className="flex flex-wrap gap-2 mt-3">
                {[
                  "Single",
                  "Married",
                  "Widow/ Widower",
                  "Separated",
                  "Divorced",
                ].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => handleChange("maritalStatus", status)}
                    className={`
                  px-5 py-2 rounded-xl border text-sm transition
                  ${
                    formData.maritalStatus === status
                      ? "border-[#103B82] bg-[#edf4ff] text-[#103B82]"
                      : "border-gray-200 text-gray-700 bg-white"
                  }
                  `}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Spouse */}
            <div className="lg:col-span-2 flex flex-col gap-2">
              <label className="text-[11px] font-semibold uppercase tracking-[2px] text-[#52648A]">
                SPOUSE NAME {formData.maritalStatus === "Married" && "*"}
              </label>

              <Input
                value={formData.spouseName || ""}
                onChange={(e) => handleChange("spouseName", e.target.value)}
                placeholder="Enter Spouse Name"
                disabled={formData.maritalStatus !== "Married"}
                className="h-12 rounded-xl border-[#D9E3F5]"
              />
            </div>
          </motion.div>

          {/* Information box */}

          <div className="mt-5 bg-[#EDF4FF] rounded-xl px-4 py-3 flex items-center gap-3 text-sm text-[#53698F]">
            <Info className="w-5 h-5 text-[#103B82] flex-shrink-0" />

            <p>
              Family details must match the information on your birth
              certificate or Aadhaar records.
            </p>
          </div>

          {/* Emergency Contact */}
          <div className="my-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#EDF4FF] flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#103B82]" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#103B82]">
                  Emergency Contact Details
                </h3>
              </div>
            </div>
          </div>

          {/* <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#EDF4FF] flex items-center justify-center"></div>
                
            <div>
              <h2 className="text-xl font-bold text-[#103B82]">
                Emergency Contact Details
              </h2>
            </div>
            <p className="text-sm text-gray-500">
              Person to contact during emergencies.
            </p>
          </div> */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-semibold uppercase tracking-[2px] text-[#52648A]">
                NAME *
              </label>
              <Input
                placeholder="Enter Name"
                className="h-12 rounded-xl border-[#D9E3F5]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-semibold uppercase tracking-[2px] text-[#52648A]">
                MOBILE NUMBER *
              </label>
              <Input
                placeholder="Enter Mobile Number"
                className="h-12 rounded-xl border-[#D9E3F5]"
              />
            </div>

            <div className="lg:col-span-2 flex flex-col gap-2">
              <label className="text-[11px] font-semibold uppercase tracking-[2px] text-[#52648A]">
                EMAIL *
              </label>
              <Input
                placeholder="Enter Email"
                className="h-12 rounded-xl border-[#D9E3F5]"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter
          className="
      px-6 sm:px-10 pb-8
      flex justify-between
      "
        >
          <Button
            variant="outline"
            onClick={prevStep}
            className="rounded-full px-6"
          >
            <ArrowLeft className="mr-2 h-4" />
            Back
          </Button>

          <Button
            disabled={loading}
            onClick={onContinue}
            className="
          rounded-full
          px-8
          bg-gradient-to-r
          from-yellow-400
          to-yellow-500
          text-black
          font-semibold
          "
          >
            Continue
            <ArrowRight className="ml-2 h-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StepFamilyDetails;
