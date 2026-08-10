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
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Shield,
  MapPin,
  ArrowLeft,
  ArrowRight,
  CalendarIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface StepPersonalDetailsProps {
  formData: any;
  handleChange: (e: any) => void;
  handleSelectChange: (name: string, value: string) => void;
  zipLoading: boolean;
  prevStep: () => void;
  nextStep: () => void;
  itemVariants: any;
  fetchPoliceStations: (pincode: string) => void;
  policeStationOptions: any[];
  loadingPoliceStations: boolean;
  errorMessage?: string;
}

const StepPersonalDetails = ({
  formData,
  handleChange,
  handleSelectChange,
  zipLoading,
  prevStep,
  nextStep,
  itemVariants,
  errorMessage,
  fetchPoliceStations,
  policeStationOptions,
  loadingPoliceStations,
}: StepPersonalDetailsProps) => {
  const [touched, setTouched] = useState({
    address: false,
    zipCode: false,
    city: false,
    state: false,
    gender: false,
    dateOfBirth: false,
    education_qualification: false,
    employment_type: false,
    policeStationName: false,
    placeOfBirth: false,
  });

  function getDateOfBirthError(date: string) {
    if (!date.trim()) {
      return "Date of birth is required";
    }

    // Must be exactly YYYY/MM/DD
    if (!/^\d{4}\/\d{2}\/\d{2}$/.test(date)) {
      return "Enter date in YYYY/MM/DD format";
    }

    const [year, month, day] = date.split("/").map(Number);

    if (year < 1900 || year > new Date().getFullYear()) {
      return "Enter a valid year";
    }

    if (month < 1 || month > 12) {
      return "Enter a valid month";
    }

    if (day < 1 || day > 31) {
      return "Enter a valid day";
    }

    // Check actual calendar date
    const parsedDate = new Date(year, month - 1, day);

    if (
      parsedDate.getFullYear() !== year ||
      parsedDate.getMonth() !== month - 1 ||
      parsedDate.getDate() !== day
    ) {
      return "Enter a valid date";
    }

    // Don't allow future dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (parsedDate > today) {
      return "Date of birth cannot be in the future";
    }

    return "";
  }

  const errors = {
    address: !formData.address.trim() ? "Address is required" : "",
    zipCode: !formData.zipCode.trim()
      ? "ZIP code is required"
      : !/^\d{6}$/.test(formData.zipCode)
        ? "Enter a valid 6-digit ZIP code"
        : "",
    policeStationName: !formData.policeStationName
      ? "Please select a police station"
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
    !errors.policeStationName &&
    !errors.gender &&
    !errors.dateOfBirth &&
    !errors.education_qualification &&
    !errors.employment_type &&
    !errors.placeOfBirth;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const cursorPosition = input.selectionStart ?? 0;

    const digitsBeforeCursor = input.value
      .slice(0, cursorPosition)
      .replace(/\D/g, "");

    let digits = input.value.replace(/\D/g, "");

    // YYYYMMDD = maximum 8 digits
    digits = digits.slice(0, 8);

    let formattedValue = digits;

    if (digits.length > 4) {
      formattedValue = digits.slice(0, 4) + "/" + digits.slice(4);
    }

    if (digits.length > 6) {
      formattedValue =
        digits.slice(0, 4) + "/" + digits.slice(4, 6) + "/" + digits.slice(6);
    }

    handleChange({
      target: {
        name: "dateOfBirth",
        value: formattedValue,
      },
    });

    let newCursorPosition = digitsBeforeCursor.length;

    if (digitsBeforeCursor.length > 4) {
      newCursorPosition += 1;
    }

    if (digitsBeforeCursor.length > 6) {
      newCursorPosition += 1;
    }

    requestAnimationFrame(() => {
      input.setSelectionRange(newCursorPosition, newCursorPosition);
    });
  };

  return (
    <>
      <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl mx-auto">
          <div className="rounded-3xl bg-white md:p-6 shadow-xl">
            <CardHeader className="pl-3 md:px-8 pt-8 pb-4">
              <motion.div variants={itemVariants}>
                <CardTitle className="md:text-2xl font-semibold tracking-tight text-2xl flex items-center gap-2 gradient-heading">
                  <MapPin className="h-5 w-5 text-navy" />
                  Personal Details
                </CardTitle>
              </motion.div>

              <motion.div variants={itemVariants}>
                <CardDescription className="!text-xs text-muted-foreground">
                  Please provide your additional personal information.
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className="sm:p-2 !pt-0">
              <div className="space-y-4">
                <motion.div variants={itemVariants} className="space-y-2">
                  {errorMessage && (
                    <div className=" p-3 bg-red-50 border border-red-200 rounded-lg ">
                      <p className="text-sm text-red-600">{errorMessage}</p>
                    </div>
                  )}
                  <h3 className="text-lg font-medium">Address Information</h3>
                  <div className="space-y-4">
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
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "");

                              handleChange({
                                target: {
                                  name: "zipCode",
                                  value,
                                },
                              });

                              // if (value.length === 6) {
                              //   fetchPoliceStations(value);
                              // }

                              if (value.length < 6) {
                                handleChange({
                                  target: {
                                    name: "city",
                                    value: "",
                                  },
                                });

                                handleChange({
                                  target: {
                                    name: "state",
                                    value: "",
                                  },
                                });

                                // handleSelectChange("policeStationPincode", "");
                              }
                            }}
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
                          disabled
                          readOnly
                          className="modern-input focus-animation bg-gray-100 cursor-not-allowed"
                        />
                        {touched.city && errors.city && (
                          <p className="text-xs text-red-600 mt-1">
                            {errors.city}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          readOnly
                          disabled
                          className="modern-input bg-gray-100 cursor-not-allowed"
                        />
                        {/* <Select
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
                        </Select> */}
                        {touched.state && errors.state && (
                          <p className="text-xs text-red-600 mt-1">
                            {errors.state}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Nearest Police Station Name</Label>

                      <Input
                        id="police Station"
                        name="policeStationName"
                        value={formData.policeStationName || ""}
                        onChange={handleChange}
                        className="modern-input focus-animation"
                        onBlur={() =>
                          setTouched((t) => ({
                            ...t,
                            policeStationName: true,
                          }))
                        }
                      />
                      {/* <Select
                        value={formData.policeStationName|| ""}
                        onValueChange={(value) => {
                          handleSelectChange("policeStation", value);

                          setTouched((t) => ({
                            ...t,
                            policeStation: true,
                          }));
                        }}
                      >
                        <SelectTrigger className="modern-input">
                          <SelectValue placeholder="Select Nearest Police Station" />
                        </SelectTrigger>

                        <SelectContent>
                          {policeStationOptions.map((station) => (
                            <SelectItem key={station.name} value={station.name}>
                              {station.name} ({station.pincode})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select> */}
                      {touched.policeStationName &&
                        errors.policeStationName && (
                          <p className="text-xs text-red-600">
                            {errors.policeStationName}
                          </p>
                        )}
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
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
                      <div className="relative">
                        <Input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="text"
                          placeholder="YYYY/MM/DD"
                          value={formData.dateOfBirth}
                          onChange={handleDateChange}
                          onBlur={() =>
                            setTouched((t) => ({
                              ...t,
                              dateOfBirth: true,
                            }))
                          }
                          className="modern-input focus-animation pr-12"
                          inputMode="numeric"
                          maxLength={10}
                        />

                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                              <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                            </button>
                          </PopoverTrigger>

                          <PopoverContent className="w-auto p-0" align="end">
                            <Calendar
                              mode="single"
                              captionLayout="dropdown"
                              selected={
                                formData.dateOfBirth &&
                                /^\d{4}\/\d{2}\/\d{2}$/.test(
                                  formData.dateOfBirth,
                                )
                                  ? (() => {
                                      const [year, month, day] =
                                        formData.dateOfBirth
                                          .split("/")
                                          .map(Number);

                                      return new Date(year, month - 1, day);
                                    })()
                                  : undefined
                              }
                              onSelect={(date) => {
                                if (!date) return;

                                const formattedDate = format(
                                  date,
                                  "yyyy/MM/dd",
                                );

                                handleChange({
                                  target: {
                                    name: "dateOfBirth",
                                    value: formattedDate,
                                  },
                                });

                                if (!touched.dateOfBirth) {
                                  setTouched((t) => ({
                                    ...t,
                                    dateOfBirth: true,
                                  }));
                                }
                              }}
                              disabled={(date) => date > new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      {/* <Input
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
                      /> */}

                      {touched.dateOfBirth && errors.dateOfBirth && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.dateOfBirth}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="placeOfBirth">Place of Birth</Label>
                      <Input
                        name="placeOfBirth"
                        value={formData.placeOfBirth || ""}
                        onChange={handleChange}
                        onBlur={() =>
                          setTouched((prev) => ({
                            ...prev,
                            placeOfBirth: true,
                          }))
                        }
                        placeholder="Enter your place of birth"
                        className="modern-input focus-animation"
                      />
                      {touched.placeOfBirth && errors.placeOfBirth && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.placeOfBirth}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {/* Education Qualification */}
                    <div className="space-y-2">
                      <Label htmlFor="education_qualification">
                        Education Qualification
                      </Label>

                      <Select
                        value={formData.education_qualification}
                        onValueChange={(value) => {
                          handleSelectChange("education_qualification", value);
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
                          <SelectItem value="10th Pass and Above">
                            10th Pass and Above
                          </SelectItem>
                          <SelectItem value="7th Pass Or Less">
                            7th Pass Or Less
                          </SelectItem>
                          <SelectItem value="Between 8th And 9th Standard">
                            Between 8th And 9th Standard
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
                          <SelectItem value="Government">Government</SelectItem>
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
          </div>

          <motion.div className="mt-4 flex">
            <CardFooter className="flex w-full gap-3 sm:flex-row justify-between">
              <Button
                onClick={prevStep}
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
                  onClick={nextStep}
                  disabled={!isValid}
                  className="rounded-xl bg-gradient-to-r from-navy to-teal px-4 text-white shadow-lg modern-button"
                >
                  Continue
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

export default StepPersonalDetails;
