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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileData, ApiResponse } from "@/app/types/api";
import ReactCountryFlag from "react-country-flag";

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
  const [formData, setFormData] = useState<Partial<ProfileData>>({});
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const customerId = profile?.id; // gets the ID from loaded profile

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

  // Sync form data
  useEffect(() => {
    if (profile) setFormData(profile);
  }, [profile]);

  // Function to get full name
  const getFullName = () => {
    if (!profile) return "";
    return `${profile.first_name} ${profile.last_name}`.trim();
  };

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
                  // className="rounded-xl border-burgundy/20 hover:bg-burgundy/80"
                  className="flex items-center gap-1 border-burgundy text-burgundy hover:bg-burgundy hover:text-white hover:opacity-90 rounded-xl modern-button"
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

          <CardContent className="p-6">
            {loading ? (
              <div className="text-center py-10 text-muted-foreground animate-pulse">
                Loading profile...
              </div>
            ) : profile ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-8">
                {/* LEFT SIDE */}
                <div className="space-y-6">
                  {/* NAME */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-6">
                    {/* First Name */}
                    <div className="space-y-2">
                      {isEditing && <Label>First Name</Label>}
                      {isEditing ? (
                        <Input
                          name="first_name"
                          value={formData.first_name || ""}
                          onChange={handleChange}
                          className="modern-input"
                          placeholder="John"
                        />
                      ) : (
                        <div className="bg-muted/40 hover:bg-muted/60 transition p-3 rounded-xl border shadow-sm">
                          <p className="text-xs text-muted-foreground">
                            First Name
                          </p>
                          <p className="font-semibold text-base">
                            {profile?.first_name || "-"}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                      {isEditing && <Label>Last Name</Label>}
                      {isEditing ? (
                        <Input
                          name="last_name"
                          value={formData.last_name || ""}
                          onChange={handleChange}
                          className="modern-input"
                          placeholder="Doe"
                        />
                      ) : (
                        <div className="bg-muted/40 hover:bg-muted/60 transition p-3 rounded-xl border shadow-sm">
                          <p className="text-xs text-muted-foreground">
                            Last Name
                          </p>
                          <p className="font-semibold text-base">
                            {profile?.last_name || "-"}
                          </p>
                        </div>
                      )}
                    </div>
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
                        <p className="font-semibold">{profile.email || "-"}</p>
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

                  {/* ADDRESS */}
                  <div className="space-y-2">
                    {isEditing && <Label>Address</Label>}

                    {isEditing ? (
                      <div className="space-y-3">
                        <Input
                          name="address"
                          value={formData.address || ""}
                          onChange={handleChange}
                          placeholder="Flat 101, XYZ residency, AB Road"
                        />
                        <Input
                          name="pin_code"
                          value={formData.pin_code || ""}
                          onChange={handleChange}
                          placeholder="395001"
                        />
                        <Input
                          name="city"
                          value={formData.city || ""}
                          onChange={handleChange}
                          placeholder="Surat"
                        />
                        <Input
                          name="state"
                          value={formData.state || ""}
                          onChange={handleChange}
                          placeholder="Gujarat"
                        />
                      </div>
                    ) : (
                      <div className="bg-muted/40 hover:bg-muted/60 transition p-3 rounded-xl border shadow-sm">
                        <p className="text-xs text-muted-foreground">Address</p>
                        <p className="font-semibold">
                          {profile.address || "-"}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {profile.city}, {profile.state} - {profile.pin_code}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-6">
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

                  {/* PLACE OF BIRTH */}
                  {/* <div className="space-y-2">
                    {isEditing && <Label>Place of Birth</Label>}
                    {isEditing ? (
                      <Input
                        name="place_of_birth"
                        value={formData.place_of_birth || ""}
                        onChange={handleChange}
                        placeholder="Surat"
                      />
                    ) : (
                      <div className="bg-muted/40 hover:bg-muted/60 transition p-3 rounded-xl border shadow-sm">
                        <p className="text-xs text-muted-foreground">
                          Place of Birth
                        </p>
                        <p className="font-semibold">
                          {profile.place_of_birth || "-"}
                        </p>
                      </div>
                    )}
                  </div> */}

                  {/* GENDER */}
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
                        <p className="text-xs text-muted-foreground">Gender</p>
                        <p className="font-semibold">{profile.gender || "-"}</p>
                      </div>
                    )}
                  </div>

                  {/* NATIONALITY */}
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
                </div>
              </div>
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
