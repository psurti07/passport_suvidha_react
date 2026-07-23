import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shield, MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface StepAddressDetailsProps {
  formData: any;
  handleChange: (e: any) => void;
  handleSelectChange: (name: string, value: string) => void;
  zipLoading: boolean;
  prevStep: () => void;
  nextStep: () => void;
  itemVariants: any;
}

const StepAddressDetails = ({
  formData,
  handleChange,
  handleSelectChange,
  zipLoading,
  prevStep,
  nextStep,
  itemVariants,
}: StepAddressDetailsProps) => {
  const [touched, setTouched] = useState({
    address: false,
    zipCode: false,
    city: false,
    state: false,
    gender: false,
    dateOfBirth: false,
    education_qualification: false,
    employment_type: false,
    // placeOfBirth: false,
  });

  function isValidDate(date: string) {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) return false;
    const [d, m, y] = date.split("/").map(Number);
    const dt = new Date(y, m - 1, d);
    return (
      dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d
    );
  }

  function getDateOfBirthError(date: string) {
    if (!date.trim()) return "Date of birth is required";

    const dob = new Date(date);
    if (isNaN(dob.getTime())) return "Enter a valid date";

    const now = new Date();

    if (dob > now) return "Date of birth cannot be in the future";

    if (dob.getFullYear() < 1900) return `Year must be after 1900`;

    return "";
  }

  const errors = {
    address: !formData.address.trim() ? "Address is required" : "",
    zipCode: !formData.zipCode.trim()
      ? "ZIP code is required"
      : !/^\d{6}$/.test(formData.zipCode)
        ? "Enter a valid 6-digit ZIP code"
        : "",
    city: !formData.city.trim() ? "City is required" : "",
    state: !formData.state.trim() ? "State is required" : "",
    gender: !formData.gender.trim() ? "Gender is required" : "",
    dateOfBirth: getDateOfBirthError(formData.dateOfBirth),
    education_qualification: !(formData.education_qualification || "").trim()
      ? "Education Qualification is required"
      : "",
    employment_type: !(formData.employment_type || "").trim()
      ? "Employment Type is required"
      : "",
    // placeOfBirth: !formData.placeOfBirth.trim()
    //   ? "Place of birth is required"
    //   : /\d/.test(formData.placeOfBirth)
    //     ? "Place of birth should not contain digits"
    //     : "",
  };

  const isValid =
    !errors.address &&
    !errors.zipCode &&
    !errors.city &&
    !errors.state &&
    !errors.gender &&
    !errors.dateOfBirth &&
    !errors.education_qualification &&
    !errors.employment_type;
  // !errors.placeOfBirth;

  return (
    <>
      <div className="min-h-screen bg-[#f5f8ff] py-8 px-4">
        <div className="container mx-auto">
          <div className="rounded-3xl border border-[#DCE5F5] bg-white shadow-sm overflow-hidden">
            <CardHeader className="px-8 pt-8 pb-4">
              <motion.div variants={itemVariants}>
                <CardTitle className="flex items-center gap-3 text-[30px] font-bold text-[#123D82]">
                  <MapPin className="h-7 w-7 text-[#123D82]" />
                  Personal Details
                </CardTitle>
              </motion.div>

              <motion.div variants={itemVariants}>
                <CardDescription className="mt-2 text-[#7B879F]">
                  Please provide your additional personal information.
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <div className="space-y-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <h3 className="text-lg font-medium">Address Information</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        onBlur={() =>
                          setTouched((t) => ({ ...t, address: true }))
                        }
                        placeholder="XYZ Residency, ABC Main Road"
                        className="modern-input focus-animation"
                      />
                      {touched.address && errors.address && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.address}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Pin Code</Label>
                        <div className="relative">
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            onBlur={() =>
                              setTouched((t) => ({ ...t, zipCode: true }))
                            }
                            placeholder="395008"
                            className="modern-input focus-animation"
                            maxLength={6}
                            inputMode="numeric"
                          />
                          {zipLoading && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full"
                              />
                            </div>
                          )}
                        </div>
                        {touched.zipCode && errors.zipCode && (
                          <p className="text-xs text-red-600 mt-1">
                            {errors.zipCode}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          onBlur={() =>
                            setTouched((t) => ({ ...t, city: true }))
                          }
                          placeholder="Surat"
                          className="modern-input focus-animation"
                        />
                        {touched.city && errors.city && (
                          <p className="text-xs text-red-600 mt-1">
                            {errors.city}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value) => {
                            handleSelectChange("state", value);
                            if (!touched.state)
                              setTouched((t) => ({ ...t, state: true }));
                          }}
                          defaultValue={formData.state}
                        >
                          <SelectTrigger className="modern-input focus-animation">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px] overflow-y-auto">
                            <SelectItem value="Andaman and Nicobar Islands">
                              Andaman and Nicobar Islands
                            </SelectItem>
                            <SelectItem value="Andhra Pradesh">
                              Andhra Pradesh
                            </SelectItem>
                            <SelectItem value="Arunachal Pradesh">
                              Arunachal Pradesh
                            </SelectItem>
                            <SelectItem value="Assam">Assam</SelectItem>
                            <SelectItem value="Bihar">Bihar</SelectItem>
                            <SelectItem value="Chandigarh">
                              Chandigarh
                            </SelectItem>
                            <SelectItem value="Chhattisgarh">
                              Chhattisgarh
                            </SelectItem>
                            <SelectItem value="Delhi">Delhi</SelectItem>
                            <SelectItem value="Goa">Goa</SelectItem>
                            <SelectItem value="Gujarat">Gujarat</SelectItem>
                            <SelectItem value="Haryana">Haryana</SelectItem>
                            <SelectItem value="Himachal Pradesh">
                              Himachal Pradesh
                            </SelectItem>
                            <SelectItem value="Jammu and Kashmir">
                              Jammu and Kashmir
                            </SelectItem>
                            <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                            <SelectItem value="Karnataka">Karnataka</SelectItem>
                            <SelectItem value="Kerala">Kerala</SelectItem>
                            <SelectItem value="Madhya Pradesh">
                              Madhya Pradesh
                            </SelectItem>
                            <SelectItem value="Maharashtra">
                              Maharashtra
                            </SelectItem>
                            <SelectItem value="Manipur">Manipur</SelectItem>
                            <SelectItem value="Meghalaya">Meghalaya</SelectItem>
                            <SelectItem value="Mizoram">Mizoram</SelectItem>
                            <SelectItem value="Nagaland">Nagaland</SelectItem>
                            <SelectItem value="Odisha">Odisha</SelectItem>
                            <SelectItem value="Puducherry">
                              Puducherry
                            </SelectItem>
                            <SelectItem value="Punjab">Punjab</SelectItem>
                            <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                            <SelectItem value="Sikkim">Sikkim</SelectItem>
                            <SelectItem value="Tamil Nadu">
                              Tamil Nadu
                            </SelectItem>
                            <SelectItem value="Telangana">Telangana</SelectItem>
                            <SelectItem value="Tripura">Tripura</SelectItem>
                            <SelectItem value="Uttar Pradesh">
                              Uttar Pradesh
                            </SelectItem>
                            <SelectItem value="Uttarakhand">
                              Uttarakhand
                            </SelectItem>
                            <SelectItem value="West Bengal">
                              West Bengal
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {touched.state && errors.state && (
                          <p className="text-xs text-red-600 mt-1">
                            {errors.state}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">
                        Nearest Police Station Pincode * e.g. 395007
                      </Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        onBlur={() =>
                          setTouched((t) => ({ ...t, zipCode: true }))
                        }
                        placeholder="395008"
                        className="modern-input focus-animation"
                        maxLength={6}
                        inputMode="numeric"
                      />
                      {zipLoading && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full"
                          />
                        </div>
                      )}
                      {touched.address && errors.address && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.address}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) => {
                          handleSelectChange("gender", value);
                          if (!touched.gender)
                            setTouched((t) => ({ ...t, gender: true }));
                        }}
                      >
                        <SelectTrigger className="modern-input focus-animation">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {touched.gender && errors.gender && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.gender}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>

                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        onBlur={() =>
                          setTouched((t) => ({ ...t, dateOfBirth: true }))
                        }
                        className="modern-input focus-animation"
                        max={new Date().toISOString().split("T")[0]}
                      />

                      {touched.dateOfBirth && errors.dateOfBirth && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.dateOfBirth}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Education Qualification */}
                      <div className="space-y-2">
                        <Label htmlFor="education_qualification">
                          Education Qualification
                        </Label>

                        <Select
                          value={formData.education_qualification}
                          onValueChange={(value) => {
                            handleSelectChange(
                              "education_qualification",
                              value,
                            );
                            if (!touched.education_qualification)
                              setTouched((t) => ({
                                ...t,
                                education_qualification: true,
                              }));
                          }}
                        >
                          {/* <Select
                    value={formData.education_qualification}
                    onValueChange={(value) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        education_qualification: value,
                      }))
                    }
                  > */}
                          <SelectTrigger>
                            <SelectValue placeholder="Select Education" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="Below 10th">
                              Below 10th
                            </SelectItem>
                            <SelectItem value="10th Pass and Above">
                              10th Pass and Above
                            </SelectItem>
                            <SelectItem value="Graduate and Above">
                              Graduate and Above
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Employment Type */}
                      <div className="space-y-2">
                        <Label htmlFor="employment_type">Employment Type</Label>

                        <Select
                          value={formData.employment_type}
                          onValueChange={(value) => {
                            handleSelectChange("employment_type", value);
                            if (!touched.employment_type)
                              setTouched((t) => ({
                                ...t,
                                employment_type: true,
                              }));
                          }}
                        >
                          {/* <Select
                    value={formData.employment_type}
                    onValueChange={(value) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        employment_type: value,
                      }))
                    }
                  > */}
                          <SelectTrigger>
                            <SelectValue placeholder="Select Employment" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="Government">
                              Government
                            </SelectItem>
                            <SelectItem value="Private">Private</SelectItem>
                            <SelectItem value="Self Employed">
                              Self Employed
                            </SelectItem>
                            <SelectItem value="Student">Student</SelectItem>
                            <SelectItem value="Homemaker">Homemaker</SelectItem>
                            <SelectItem value="Retired">Retired</SelectItem>
                            <SelectItem value="Others">Others</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* <div className="space-y-2">
                <Label htmlFor="placeOfBirth">Place of Birth</Label>
                <Input
                  id="placeOfBirth"
                  name="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={(e) => {
                    // Filter out digits from input
                    const value = e.target.value.replace(/[0-9]/g, "");
                    const customEvent = {
                      ...e,
                      target: {
                        ...e.target,
                        name: "placeOfBirth",
                        value,
                      },
                    };
                    handleChange(customEvent);
                  }}
                  onBlur={() =>
                    setTouched((t) => ({ ...t, placeOfBirth: true }))
                  }
                  placeholder="City, State, Country"
                  className="modern-input focus-animation"
                />
                {touched.placeOfBirth && errors.placeOfBirth && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.placeOfBirth}
                  </p>
                )}
              </div> */}
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
                    Please ensure all information matches your identification
                    documents exactly.
                  </p>
                </motion.div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t bg-[#FAFBFD] px-8 py-6">
              <Button
                variant="outline"
                onClick={prevStep}
                className="rounded-full px-6 h-11"
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
                  onClick={nextStep}
                  disabled={!isValid}
                  className="rounded-full h-11 px-8 bg-[#FFC107] hover:bg-[#FFB300] text-black font-semibold shadow-lg"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </CardFooter>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepAddressDetails;
