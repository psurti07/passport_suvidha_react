"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  User,
  Mail,
  Phone,
  Home,
  Calendar,
  MapPin,
  Globe,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileData, ApiResponse } from "@/app/types/api";
import ReactCountryFlag from "react-country-flag";

interface FormEvent {
  target: {
    name: string;
    value: string;
  };
}

interface PinCodeResponse {
  Message: string;
  Status: string;
  PostOffice: PostOffice[];
}

interface PostOffice {
  Name: string;
  Description: string;
  BranchType: string;
  DeliveryStatus: string;
  Circle: string;
  District: string;
  Division: string;
  Region: string;
  Block: string;
  State: string;
  Country: string;
  Pincode: string;
}

interface PinCodeResponse {
  Message: string;
  Status: string;
  PostOffice: PostOffice[];
}

export default function ProfilePage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [zipLoading, setZipLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<ProfileData>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [policeStationOptions, setPoliceStationOptions] = useState<any[]>([]);
  const [loadingPoliceStations, setLoadingPoliceStations] = useState(false);
  const [selectedPolicePincode, setSelectedPolicePincode] = useState("");

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  // ) => {
  //   const { name, value } = e.target;

  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleChange = async (e: FormEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name !== "pin_code") return;

    // Reset if pincode is incomplete
    if (value.length < 6) {
      setFormData((prev) => ({
        ...prev,
        pin_code: value,
        city: "",
        state: "",
      }));

      // setPoliceStationOptions([]);
      // setSelectedPolicePincode("");
      return;
    }

    // If pin_code is changed and has 6 digits, fetch city and state
    if (name === "pin_code" && value.length === 6) {
      setZipLoading(true);
      try {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${value}`,
        );
        const data: PinCodeResponse[] = await response.json();

        if (
          data[0].Status === "Success" &&
          data[0].PostOffice &&
          data[0].PostOffice.length > 0
        ) {
          const postOffice = data?.[0]?.PostOffice?.[0];

          if (!postOffice) {
            setFormData((prev) => ({
              ...prev,
              city: "",
              state: "",
            }));
            return;
          }

          setFormData((prev) => ({
            ...prev,
            pin_code: value,
            city: postOffice.District,
            state: postOffice.State,
          }));
          // fetchPoliceStations(value);
        } else {
          setFormData((prev) => ({
            ...prev,
            city: "",
            state: "",
          }));

          // setPoliceStationOptions([]);
        }
      } catch (error) {
        console.error("Error fetching address details:", error);
      } finally {
        setZipLoading(false);
      }
    }
  };
  const customerId = profile?.id; // gets the ID from loaded profile

  const fetchPoliceStations = async (pincode: string) => {
    try {
      setLoadingPoliceStations(true);

      const response = await fetch(`/api/police-stations?pincode=${pincode}`);

      const data = await response.json();

      setPoliceStationOptions(data || []);
    } catch (error) {
      console.error(error);
      setPoliceStationOptions([]);
    } finally {
      setLoadingPoliceStations(false);
    }
  };

  // useEffect(() => {
  //   if (formData.pin_code?.length === 6) {
  //     fetchPoliceStations(formData.pin_code);
  //   }
  // }, [formData.pin_code]);

  const handleSave = async () => {
    if (!profile?.id) return;

    try {
      setLoading(true);

      const response = await fetch(`/api/profile/${profile.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(
          typeof data.message === "string"
            ? data.message
            : JSON.stringify(data.message),
        );

      setProfile(data.data || data);
      setIsEditing(false);
    } catch (err) {
      console.error("Update error:", err);
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Fetch profile
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/profile", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch profile data");
        }

        setProfile(data.data || data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Sync form data
  useEffect(() => {
    if (profile) setFormData(profile);
  }, [profile]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Page header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-navy">
            My Profile
          </h1>
          <p className="text-muted-foreground">
            View your personal information
          </p>
        </div>
      </motion.div>

      {/* Error message */}
      {error && (
        <motion.div variants={itemVariants}>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Personal Information Card */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between flex-wrap">
            <div className="mb-3">
              <CardTitle className="mb-2">Personal Information</CardTitle>
              <CardDescription>
                Your personal details used for passport applications
              </CardDescription>
            </div>

            {isEditing ? (
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button"
                >
                  Save
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  // className="bg-gray-400 text-white hover:opacity-90 rounded-xl modern-button"
                  variant="outline"
                  // className="rounded-xl urgundy/20 hover:bg-burgundy/80"
                  className="flex items-center gap-1 urgundy text-burgundy hover:bg-burgundy hover:text-white hover:opacity-90 rounded-xl modern-button"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button"
              >
                Edit
              </Button>
            )}
          </CardHeader>

          <CardContent className="space-y-8">
            {loading ? (
              <div className="text-center py-10 text-muted-foreground animate-pulse">
                Loading profile...
              </div>
            ) : profile ? (
              <>
                {/* ================= BASIC INFORMATION ================= */}
                <div>
                  <h3 className="text-lg font-semibold text-navy  pb-2 mb-2">
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {/* Full Name */}
                    <div className="space-y-2">
                      {isEditing && <Label>Full Name</Label>}

                      {isEditing ? (
                        <Input
                          name="full_name"
                          value={formData.full_name || ""}
                          onChange={handleChange}
                          className="modern-input"
                          placeholder="Enter Full Name"
                        />
                      ) : (
                        <div className="rounded-xl border bg-muted/40 p-3 shadow-sm transition hover:bg-muted/60">
                          <p className="text-xs text-muted-foreground">
                            Full Name
                          </p>
                          <p className="text-base font-semibold">
                            {profile?.full_name || "-"}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* EMAIL */}

                    <div className="space-y-2">
                      {isEditing && <Label>Email</Label>}
                      {isEditing ? (
                        <Input
                          name="email"
                          value={formData.email || ""}
                          onChange={handleChange}
                          className="modern-input"
                          placeholder="john.doe@example.com"
                        />
                      ) : (
                        <div className="bg-muted/40 hover:bg-muted/60 transition p-3 rounded-xl border shadow-sm">
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="font-semibold">
                            {profile.email || "-"}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* PHONE */}
                    <div className="space-y-2">
                      {isEditing && <Label>Phone</Label>}

                      {isEditing ? (
                        <div className="relative">
                          {/* India Flag + Country Code */}
                          <div className="absolute inset-y-0 left-3 flex items-center gap-2 z-10">
                            <ReactCountryFlag
                              countryCode="IN"
                              svg
                              style={{
                                width: "16px",
                                height: "16px",
                              }}
                            />

                            <span className="text-xs font-medium text-gray-600">
                              +91
                            </span>

                            <div className="h-4 w-px bg-gray-300 ml-1" />
                          </div>

                          <Input
                            name="mobile_number"
                            value={formData.mobile_number || ""}
                            onChange={handleChange}
                            className="modern-input pl-24"
                            inputMode="numeric"
                            maxLength={10}
                            placeholder="98765 43210"
                          />
                        </div>
                      ) : (
                        <div className="bg-muted/40 hover:bg-muted/60 transition p-3 rounded-xl border shadow-sm">
                          <p className="text-xs text-muted-foreground">Phone</p>
                          <p className="font-semibold">
                            {profile.mobile_number || "-"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* ================= FAMILY DETAILS ================= */}
                <div>
                  <h3 className="text-lg font-semibold text-navy  pb-2 mb-2">
                    Family Details
                  </h3>

                  <div
                    className={`grid grid-cols-1 md:grid-cols-2 ${
                      (
                        isEditing
                          ? formData.marital_status === "married"
                          : profile?.marital_status === "married"
                      )
                        ? "xl:grid-cols-4"
                        : "xl:grid-cols-3"
                    } gap-5`}
                  >
                    {/* Father's Name */}
                    <div className="space-y-2">
                      {isEditing && <Label>Father's Name</Label>}
                      {isEditing ? (
                        <Input
                          name="father_name"
                          value={formData.father_name || ""}
                          onChange={handleChange}
                          className="modern-input"
                          placeholder="Enter Father's Name"
                        />
                      ) : (
                        <div className="bg-muted/40 hover:bg-muted/60 transition p-3 rounded-xl border shadow-sm">
                          <p className="text-xs text-muted-foreground">
                            Father's Name
                          </p>
                          <p className="font-semibold">
                            {profile?.father_name || "-"}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Mother's Name */}
                    <div className="space-y-2">
                      {isEditing && <Label>Mother's Name</Label>}
                      {isEditing ? (
                        <Input
                          name="mother_name"
                          value={formData.mother_name || ""}
                          onChange={handleChange}
                          className="modern-input"
                          placeholder="Enter Mother's Name"
                        />
                      ) : (
                        <div className="bg-muted/40 hover:bg-muted/60 transition p-3 rounded-xl border shadow-sm">
                          <p className="text-xs text-muted-foreground">
                            Mother's Name
                          </p>
                          <p className="font-semibold">
                            {profile?.mother_name || "-"}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Marital Status */}
                    <div className="space-y-2">
                      {isEditing && <Label>Marital Status</Label>}
                      {isEditing ? (
                        <Select
                          value={formData.marital_status || ""}
                          onValueChange={(value) =>
                            setFormData((prev: any) => ({
                              ...prev,
                              marital_status: value,
                            }))
                          }
                        >
                          <SelectTrigger className="modern-input">
                            <SelectValue placeholder="Select Marital Status" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="widow">Widow</SelectItem>
                            <SelectItem value="widower">Widower</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="bg-muted/40 hover:bg-muted/60 transition p-3 rounded-xl border shadow-sm">
                          <p className="text-xs text-muted-foreground">
                            Marital Status
                          </p>
                          <p className="font-semibold">
                            {profile?.marital_status || "-"}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Spouse Name */}
                    {(isEditing
                      ? formData.marital_status === "married"
                      : profile?.marital_status === "married") && (
                      <div className="space-y-2">
                        {isEditing && <Label>Spouse Name</Label>}
                        {isEditing ? (
                          <Input
                            name="spouse_name"
                            value={formData.spouse_name || ""}
                            onChange={handleChange}
                            className="modern-input"
                            placeholder="Enter Spouse Name"
                          />
                        ) : (
                          <div className="bg-muted/40 hover:bg-muted/60 transition p-3 rounded-xl border shadow-sm">
                            <p className="text-xs text-muted-foreground">
                              Spouse Name
                            </p>
                            <p className="font-semibold">
                              {profile?.spouse_name || "-"}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* ================= EMERGENCY CONTACT ================= */}
                <div>
                  <h3 className="text-lg font-semibold text-navy  pb-2 mb-2">
                    Emergency Contact
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {/* Contact Name */}
                    <div className="space-y-2">
                      {isEditing && <Label>Contact Name</Label>}
                      {isEditing ? (
                        <Input
                          name="emergency_contact_name"
                          value={formData.emergency_contact_name || ""}
                          onChange={handleChange}
                          className="modern-input"
                        />
                      ) : (
                        <div className="bg-muted/40 hover:bg-muted/60 transition p-3 rounded-xl border shadow-sm">
                          <p className="text-xs text-muted-foreground">
                            Contact Name
                          </p>
                          <p className="font-semibold">
                            {profile?.emergency_contact_name || "-"}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      {isEditing && <Label>Email</Label>}
                      {isEditing ? (
                        <Input
                          type="email"
                          name="emergency_contact_email"
                          value={formData.emergency_contact_email || ""}
                          onChange={handleChange}
                          className="modern-input"
                        />
                      ) : (
                        <div className="bg-muted/40 hover:bg-muted/60 transition p-3 rounded-xl border shadow-sm">
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="font-semibold">
                            {profile?.emergency_contact_email || "-"}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Contact Number */}
                    <div className="space-y-2">
                      {isEditing && <Label>Contact Number</Label>}
                      {isEditing ? (
                        <Input
                          name="emergency_contact_number"
                          value={formData.emergency_contact_mobile || ""}
                          onChange={handleChange}
                          className="modern-input"
                        />
                      ) : (
                        <div className="bg-muted/40 hover:bg-muted/60 transition p-3 rounded-xl border shadow-sm">
                          <p className="text-xs text-muted-foreground">
                            Contact Number
                          </p>
                          <p className="font-semibold">
                            {profile?.emergency_contact_mobile || "-"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* ================= ADDRESS DETAILS ================= */}
                <div>
                  <h3 className="text-lg font-semibold text-navy  pb-2 mb-2">
                    Address Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {/* ADDRESS */}
                    <div className="space-y-2">
                      {isEditing && <Label>Address</Label>}

                      {isEditing ? (
                        <div className="space-y-3">
                          <Input
                            name="address"
                            value={formData.address || ""}
                            onChange={handleChange}
                            placeholder="Flat 101, XYZ Residency, AB Road"
                          />

                          <Input
                            name="pin_code"
                            value={formData.pin_code || ""}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "");

                              setFormData((prev) => ({
                                ...prev,
                                pin_code: value,
                              }));

                              // if (value.length < 6) {
                              //   setPoliceStationOptions([]);

                              //   setFormData((prev) => ({
                              //     ...prev,
                              //     pin_code: value,
                              //     city: "",
                              //     state: "",
                              //     police_station_name: "",
                              //   }));

                              //   return;
                              // }

                              if (value.length === 6) {
                                handleChange({
                                  target: {
                                    name: "pin_code",
                                    value,
                                  },
                                });
                              }
                            }}
                            placeholder="395008"
                            className="modern-input focus-animation"
                            maxLength={6}
                            inputMode="numeric"
                          />

                          <Input
                            value={
                              zipLoading
                                ? "Fetching city..."
                                : formData.city || ""
                            }
                            placeholder="City"
                            readOnly
                            onChange={handleChange}
                            disabled
                            className="modern-input bg-muted cursor-not-allowed"
                          />

                          <Input
                            value={
                              zipLoading
                                ? "Fetching state..."
                                : formData.state || ""
                            }
                            placeholder="State"
                            readOnly
                            onChange={handleChange}
                            disabled
                            className="modern-input bg-muted cursor-not-allowed"
                          />
                        </div>
                      ) : (
                        <div className="bg-muted/40 hover:bg-muted/60 transition p-3 rounded-xl border shadow-sm">
                          <p className="text-xs text-muted-foreground">
                            Address
                          </p>

                          <p className="font-semibold">
                            {profile?.address || "-"}
                          </p>

                          <p className="text-sm text-muted-foreground mt-1">
                            {profile?.city || "-"}, {profile?.state || "-"} -{" "}
                            {profile?.pin_code || "-"}
                          </p>
                        </div>
                      )}
                    </div>
                    {/* Pincode */}
                    {/* City */}
                    {/* State */}
                    {/* Nearest Police Station */}
                    <div className="space-y-2">
                      {isEditing && <Label>Nearest Police Station</Label>}

                      {isEditing ? (
                        // <Select
                        //   value={formData.police_station_name || ""}
                        //   onValueChange={(value) =>
                        //     setFormData((prev: any) => ({
                        //       ...prev,
                        //       policeStationName: value,
                        //     }))
                        //   }
                        // >
                        //   <SelectTrigger className="modern-input">
                        //     <SelectValue placeholder="Select Police Station" />
                        //   </SelectTrigger>

                        //   <SelectContent>
                        //     {zipLoading || loadingPoliceStations ? (
                        //       <SelectItem value="loading" disabled>
                        //         Fetching police stations...
                        //       </SelectItem>
                        //     ) : policeStationOptions.length > 0 ? (
                        //       policeStationOptions.map((station: any) => (
                        //         <SelectItem
                        //           key={`${station.pincode}-${station.name}`}
                        //           value={station.name}
                        //         >
                        //           {station.name} ({station.pincode})
                        //         </SelectItem>
                        //       ))
                        //     ) : (
                        //       <SelectItem value="empty" disabled>
                        //         No Police Station Found
                        //       </SelectItem>
                        //     )}
                        //   </SelectContent>
                        // </Select>
                        <Input
                          value={formData.police_station_name || ""}
                          placeholder="Nearest Police Station Name"
                          onChange={handleChange}
                          className="modern-input focus-animation"
                          name="police_station_name"
                        />
                      ) : (
                        <div className="bg-muted/40 hover:bg-muted/60 transition p-3 rounded-xl border shadow-sm">
                          <p className="text-xs text-muted-foreground">
                            Nearest Police Station Name
                          </p>
                          <p className="font-semibold">
                            {profile?.police_station_name || "-"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* ================= PERSONAL INFORMATION ================= */}
                <div>
                  <h3 className="text-lg font-semibold text-navy  pb-2 mb-2">
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {/* Gender */}
                    <div className="space-y-2">
                      {isEditing && <Label>Gender</Label>}
                      {isEditing ? (
                        <select
                          name="gender"
                          value={formData.gender || ""}
                          onChange={handleChange}
                          className="modern-input rounded-md w-full hover:bg-muted/60 transition px-3 py-2 rounded-xl border shadow-sm md:text-sm"
                        >
                          <option value="">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      ) : (
                        <div className="bg-muted/40 hover:bg-muted/60 transition p-3 rounded-xl border shadow-sm">
                          <p className="text-xs text-muted-foreground">
                            Gender
                          </p>
                          <p className="font-semibold">
                            {profile.gender || "-"}
                          </p>
                        </div>
                      )}
                    </div>
                    {/* DOB */}
                    <div className="space-y-2">
                      {isEditing && <Label>Date of Birth</Label>}
                      {isEditing ? (
                        <Input
                          type="date"
                          name="date_of_birth"
                          value={formData.date_of_birth || ""}
                          onChange={handleChange}
                        />
                      ) : (
                        <div className="bg-muted/40 hover:bg-muted/60 transition p-3 rounded-xl border shadow-sm">
                          <p className="text-xs text-muted-foreground">
                            Date of Birth
                          </p>
                          <p className="font-semibold">
                            {formatDate(profile.date_of_birth) || "-"}
                          </p>
                        </div>
                      )}
                    </div>
                    {/* Place of Birth */}
                    <div className="space-y-2">
                      {isEditing && <Label>Place of Birth</Label>}

                      {isEditing ? (
                        <Input
                          name="place_of_birth"
                          value={formData.place_of_birth || ""}
                          onChange={handleChange}
                          className="modern-input"
                          placeholder="Enter Place of Birth"
                        />
                      ) : (
                        <div className="bg-muted/40 hover:bg-muted/60 transition p-3 rounded-xl border shadow-sm">
                          <p className="text-xs text-muted-foreground ">
                            Place of Birth
                          </p>
                          <p className="font-semibold">
                            {profile.place_of_birth || "-"}
                          </p>
                        </div>
                      )}
                    </div>
                    {/* Nationality */}
                    <div className="space-y-2">
                      {isEditing && <Label>Nationality</Label>}
                      {isEditing ? (
                        <Input
                          name="nationality"
                          value={formData.nationality || ""}
                          onChange={handleChange}
                          placeholder="Indian"
                        />
                      ) : (
                        <div className="bg-muted/40 hover:bg-muted/60 transition p-3 rounded-xl border shadow-sm">
                          <p className="text-xs text-muted-foreground">
                            Nationality
                          </p>
                          <p className="font-semibold">
                            {profile.nationality || "-"}
                          </p>
                        </div>
                      )}
                    </div>
                    {/* Education */}
                    <div className="space-y-2">
                      {isEditing ? (
                        <>
                          <Label>Education Qualification</Label>

                          <Select
                            value={formData.education_qualification || ""}
                            onValueChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                education_qualification: value,
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Qualification" />
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
                        </>
                      ) : (
                        <div className="bg-muted/40 hover:bg-muted/60 transition p-3 rounded-xl border shadow-sm">
                          <p className="text-xs text-muted-foreground">
                            Education Qualification
                          </p>
                          <p className="font-semibold">
                            {profile.education_qualification || "-"}
                          </p>
                        </div>
                      )}
                    </div>
                    {/* Employment */}
                    <div className="space-y-2">
                      {isEditing ? (
                        <>
                          <Label>Employment Type</Label>

                          <Select
                            value={formData.employment_type || ""}
                            onValueChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                employment_type: value,
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Employment Type" />
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
                              <SelectItem value="Homemaker">
                                Homemaker
                              </SelectItem>
                              <SelectItem value="Retired">Retired</SelectItem>
                              <SelectItem value="Others">Others</SelectItem>
                            </SelectContent>
                          </Select>
                        </>
                      ) : (
                        <div className="bg-muted/40 hover:bg-muted/60 transition p-3 rounded-xl border shadow-sm">
                          <p className="text-xs text-muted-foreground">
                            Employment Type
                          </p>
                          <p className="font-semibold">
                            {profile.employment_type || "-"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center p-6 text-muted-foreground">
                No profile data available
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
