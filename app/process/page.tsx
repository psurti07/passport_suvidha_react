"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axiosServer from "@/lib/axiosServer";

export default function Process() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

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

        const currentStep = Number(data.customer.registration_step || 1);
        const nextStep = currentStep + 1;

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
        localStorage.setItem("passportFormStep", nextStep.toString());

        router.replace("/apply-passport");
      } catch (error: any) {
        console.error(error);
        const customerError = error?.response?.data?.errors?.customer?.[0];

        const message =
          customerError ||
          error?.response?.data?.message ||
          "Unable to process customer information.";

        setError(message);
      }
    };

    getCustomerDetails();
  }, [router, searchParams]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {error && (
        <div className="w-full max-w-md rounded-xl border border-red-200 bg-red-50 shadow-sm">
          <div className="flex items-start gap-3 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-5 w-5 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M10.29 3.86l-7.82 14a1 1 0 001.74 1.72h15.58a1 1 0 001.74-1.72l-7.82-14a1 1 0 00-3.42 0z"
                />
              </svg>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-red-800">
                Unable to Continue
              </h3>

              <p className="mt-1 text-sm leading-5 text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
