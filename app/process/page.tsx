"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axiosServer from "@/lib/axiosServer";

export default function Process() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const encryptId = searchParams.get("id");

    if (!encryptId) return;

    const getCustomerDetails = async () => {
      try {
        const { data } = await axiosServer.post("/customer/encryptId", {
          id: encryptId,
        });

        const customer = data.customer;

        const serviceCode = customer.service?.service_code ?? "";

        const passportType = serviceCode.startsWith("TP") ? "tatkal" : "normal";

        const bookSize = serviceCode.endsWith("60") ? "60" : "36";

        const passportFormData = {
          passportType,
          bookSize,
          fullName: customer.full_name ?? "",
          email: customer.email ?? "",
          mobile: customer.mobile_number ?? "",
          otp: "",
          fatherName: customer.father_name ?? "",
          motherName: customer.mother_name ?? "",
          maritalStatus: customer.marital_status ?? "",
          spouseName: customer.spouse_name ?? "",
          emergencyContactName: customer.emergency_contact_name ?? "",
          emergencyContactMobile: customer.emergency_contact_mobile ?? "",
          emergencyContactEmail: customer.emergency_contact_email ?? "",
          address: customer.address ?? "",
          city: customer.city ?? "",
          state: customer.state ?? "",
          zipCode: customer.pin_code ?? "",
          gender: customer.gender ?? "",
          dateOfBirth: customer.date_of_birth ?? "",
          policeStationName: customer.police_station_name ?? "",
          placeOfBirth: customer.place_of_birth ?? "",
          education_qualification: customer.education_qualification ?? "",
          employment_type: customer.employment_type ?? "",
          nationality: customer.nationality ?? "",
          paymentMethod: "",
          encryptId: encryptId,
        };

        const token = data.token;

        localStorage.setItem("token", token);

        localStorage.setItem(
          "passportFormData",
          JSON.stringify(passportFormData),
        );

        // Store registration step separately if needed
        localStorage.setItem(
          "passportFormStep",
          data.customer.registration_step,
        );

        router.replace("/apply-passport");
      } catch (error) {
        console.error(error);
      }
    };

    getCustomerDetails();
  }, [router, searchParams]);

  return <></>;
}
