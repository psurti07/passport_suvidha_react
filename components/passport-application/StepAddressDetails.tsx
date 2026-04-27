import {
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
    placeOfBirth: false,
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
    placeOfBirth: !formData.placeOfBirth.trim()
      ? "Place of birth is required"
      : /\d/.test(formData.placeOfBirth)
        ? "Place of birth should not contain digits"
        : "",
  };

  const isValid =
    !errors.address &&
    !errors.zipCode &&
    !errors.city &&
    !errors.state &&
    !errors.gender &&
    !errors.dateOfBirth &&
    !errors.placeOfBirth;

  return (
    <>
      <CardHeader>
        <motion.div variants={itemVariants}>
          <CardTitle className="text-2xl flex items-center gap-2">
            <MapPin className="h-5 w-5 text-navy" />
            Personal Details
          </CardTitle>
        </motion.div>
        <motion.div variants={itemVariants}>
          <CardDescription>
            Please provide your additional personal information
          </CardDescription>
        </motion.div>
      </CardHeader>
      <CardContent className="space-y-8">
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
                  onBlur={() => setTouched((t) => ({ ...t, address: true }))}
                  placeholder="Enter your street address"
                  className="modern-input focus-animation"
                />
                {touched.address && errors.address && (
                  <p className="text-xs text-red-600 mt-1">{errors.address}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <div className="relative">
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      onBlur={() =>
                        setTouched((t) => ({ ...t, zipCode: true }))
                      }
                      placeholder="Enter ZIP code"
                      className="modern-input focus-animation"
                      maxLength={6}
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
                    onBlur={() => setTouched((t) => ({ ...t, city: true }))}
                    placeholder="Enter your city"
                    className="modern-input focus-animation"
                  />
                  {touched.city && errors.city && (
                    <p className="text-xs text-red-600 mt-1">{errors.city}</p>
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
                      <SelectItem value="Chandigarh">Chandigarh</SelectItem>
                      <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
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
                      <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="Manipur">Manipur</SelectItem>
                      <SelectItem value="Meghalaya">Meghalaya</SelectItem>
                      <SelectItem value="Mizoram">Mizoram</SelectItem>
                      <SelectItem value="Nagaland">Nagaland</SelectItem>
                      <SelectItem value="Odisha">Odisha</SelectItem>
                      <SelectItem value="Puducherry">Puducherry</SelectItem>
                      <SelectItem value="Punjab">Punjab</SelectItem>
                      <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                      <SelectItem value="Sikkim">Sikkim</SelectItem>
                      <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                      <SelectItem value="Telangana">Telangana</SelectItem>
                      <SelectItem value="Tripura">Tripura</SelectItem>
                      <SelectItem value="Uttar Pradesh">
                        Uttar Pradesh
                      </SelectItem>
                      <SelectItem value="Uttarakhand">Uttarakhand</SelectItem>
                      <SelectItem value="West Bengal">West Bengal</SelectItem>
                    </SelectContent>
                  </Select>
                  {touched.state && errors.state && (
                    <p className="text-xs text-red-600 mt-1">{errors.state}</p>
                  )}
                </div>
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
                  <p className="text-xs text-red-600 mt-1">{errors.gender}</p>
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
              <div className="space-y-2">
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
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 p-3 bg-navy/5 rounded-lg text-sm text-muted-foreground"
            whileHover={{ backgroundColor: "rgba(0, 51, 102, 0.1)" }}
          >
            <Shield className="h-5 w-5 text-navy" />
            <p>
              Please ensure all information matches your identification
              documents exactly.
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
            disabled={!isValid}
          >
            Select Passport Type
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </CardFooter>
    </>
  );
};

export default StepAddressDetails;
