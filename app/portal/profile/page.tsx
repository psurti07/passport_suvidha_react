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
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileData, ApiResponse } from "@/app/types/api";

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
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Your personal details used for passport applications
              </CardDescription>
            </div>

            {isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
            )}
          </CardHeader>

          <CardContent className="p-6">
            {loading ? (
              <div>Loading...</div>
            ) : profile ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LEFT SIDE */}
                <div className="space-y-4">
                  {/* FULL NAME */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <h3 className="text-sm text-muted-foreground">
                        First Name
                      </h3>
                      {isEditing ? (
                        <input
                          name="first_name"
                          value={formData.first_name || ""}
                          onChange={handleChange}
                          className="border p-2 rounded w-full"
                        />
                      ) : (
                        <p className="font-medium">{profile?.first_name}</p>
                      )}
                    </div>

                    <div>
                      <h3 className="text-sm text-muted-foreground">
                        Last Name
                      </h3>
                      {isEditing ? (
                        <input
                          name="last_name"
                          value={formData.last_name || ""}
                          onChange={handleChange}
                          className="border p-2 rounded w-full"
                        />
                      ) : (
                        <p className="font-medium">{profile?.last_name}</p>
                      )}
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div>
                    <h3 className="text-sm text-muted-foreground">Email</h3>
                    {isEditing ? (
                      <input
                        name="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      <p className="font-medium">{profile.email}</p>
                    )}
                  </div>

                  {/* PHONE */}
                  <div>
                    <h3 className="text-sm text-muted-foreground">Phone</h3>
                    {isEditing ? (
                      <input
                        name="mobile_number"
                        value={formData.mobile_number || ""}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      <p className="font-medium">{profile.mobile_number}</p>
                    )}
                  </div>

                  {/* ADDRESS */}
                  <div>
                    <h3 className="text-sm text-muted-foreground">Address</h3>
                    {isEditing ? (
                      <>
                        <input
                          name="address"
                          value={formData.address || ""}
                          onChange={handleChange}
                          className="border p-2 rounded w-full mb-2"
                        />
                        <input
                          name="city"
                          value={formData.city || ""}
                          onChange={handleChange}
                          className="border p-2 rounded w-full mb-2"
                        />
                        <input
                          name="state"
                          value={formData.state || ""}
                          onChange={handleChange}
                          className="border p-2 rounded w-full mb-2"
                        />
                        <input
                          name="pin_code"
                          value={formData.pin_code || ""}
                          onChange={handleChange}
                          className="border p-2 rounded w-full"
                        />
                      </>
                    ) : (
                      <>
                        <p className="font-medium">{profile.address}</p>
                        <p className="font-medium">
                          {profile.city}, {profile.state} {profile.pin_code}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-4">
                  {/* DOB */}
                  <div>
                    <h3 className="text-sm text-muted-foreground">
                      Date of Birth
                    </h3>
                    {isEditing ? (
                      <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth || ""}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      <p className="font-medium">
                        {formatDate(profile.date_of_birth)}
                      </p>
                    )}
                  </div>

                  {/* PLACE OF BIRTH */}
                  <div>
                    <h3 className="text-sm text-muted-foreground">
                      Place of Birth
                    </h3>
                    {isEditing ? (
                      <input
                        name="place_of_birth"
                        value={formData.place_of_birth || ""}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      <p className="font-medium">{profile.place_of_birth}</p>
                    )}
                  </div>

                  {/* GENDER */}
                  <div>
                    <h3 className="text-sm text-muted-foreground">Gender</h3>
                    {isEditing ? (
                      <select
                        name="gender"
                        value={formData.gender || ""}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    ) : (
                      <p className="font-medium">{profile.gender}</p>
                    )}
                  </div>

                  {/* NATIONALITY */}
                  <div>
                    <h3 className="text-sm text-muted-foreground">
                      Nationality
                    </h3>
                    {isEditing ? (
                      <input
                        name="nationality"
                        value={formData.nationality || ""}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      <p className="font-medium">{profile.nationality}</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-6">
                <p>No profile data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
