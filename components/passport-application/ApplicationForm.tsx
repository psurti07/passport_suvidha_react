"use client";
import React, { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";
import useWindowSize from "@/hooks/useWindowSize";
import StepBasicInfo from "./StepBasicInfo";
import StepVerification from "./StepVerification";
import StepAddressDetails from "./StepAddressDetails";
import StepPassportType from "./StepPassportType";
import ProgressBar from "./ProgressBar";
import ConfettiOverlay from "./ConfettiOverlay";
import { formatDate } from "@/lib/utils";
import { clearToken } from "@/lib/auth";
import axiosServer from "@/lib/axiosServer";
import StepFamilyDetails from "./StepFamilyDetails";

// Type definitions
interface FormData {
  passportType: "normal" | "tatkal";
  bookSize: "36" | "60";
  fullName: string;
  email: string;
  mobile: string;
  otp: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  gender: string;
  dateOfBirth: string;
  // placeOfBirth: string;
  education_qualification: string;
  employment_type: string;
  nationality: string;
  paymentMethod: "credit" | "upi" | "netBanking";
  fbclid: string;
}

interface FormEvent {
  target: {
    name: string;
    value: string;
  };
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

const stateNameToCode: { [key: string]: string } = {
  "Andaman and Nicobar Islands": "AN",
  "Andhra Pradesh": "AP",
  "Arunachal Pradesh": "AR",
  Assam: "AS",
  Bihar: "BR",
  Chandigarh: "CH",
  Chhattisgarh: "CT",
  Delhi: "DL",
  Goa: "GA",
  Gujarat: "GJ",
  Haryana: "HR",
  "Himachal Pradesh": "HP",
  "Jammu and Kashmir": "JK",
  Jharkhand: "JH",
  Karnataka: "KA",
  Kerala: "KL",
  "Madhya Pradesh": "MP",
  Maharashtra: "MH",
  Manipur: "MN",
  Meghalaya: "ML",
  Mizoram: "MZ",
  Nagaland: "NL",
  Odisha: "OR",
  Puducherry: "PY",
  Punjab: "PB",
  Rajasthan: "RJ",
  Sikkim: "SK",
  "Tamil Nadu": "TN",
  Telangana: "TG",
  Tripura: "TR",
  "Uttar Pradesh": "UP",
  Uttarakhand: "UT",
  "West Bengal": "WB",
};

// Helper function to convert date from DD/MM/YYYY to YYYY-MM-DD format
const formatDateForApi = (dateString: string): string => {
  if (!dateString) return "";

  // Check if it's already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }

  // Convert from DD/MM/YYYY to YYYY-MM-DD
  const parts = dateString.split("/");
  if (parts.length !== 3) return dateString;

  return `${parts[2]}-${parts[1]}-${parts[0]}`;
};

function ApplicationForm() {
  const [step, setStep] = useState(3);
  const [loading, setLoading] = useState(false);
  const [zipLoading, setZipLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [animatePrice, setAnimatePrice] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [priceAnimationTimeout, setPriceAnimationTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const [formData, setFormData] = useState<FormData>({
    passportType: "normal",
    bookSize: "36",
    fullName: "",
    email: "",
    mobile: "",
    otp: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    gender: "",
    dateOfBirth: "",
    // placeOfBirth: "",
    education_qualification: "",
    employment_type: "",
    nationality: "India",
    paymentMethod: "credit",
    fbclid: "",
  });
  const windowSize = useWindowSize();

  // Load saved form data and step from localStorage on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFormData = localStorage.getItem("passportFormData");
      const savedStep = localStorage.getItem("passportFormStep");
      const savedOtpVerified = localStorage.getItem("otpVerified");
      const savedTimestamp = localStorage.getItem("passportFormTimestamp");

      const currentTime = Date.now();
      // const threeHoursInMs = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
      const threeHoursInMs = 5 * 60 * 1000;

      // Check if data is older than 3 hours
      if (
        savedTimestamp &&
        currentTime - parseInt(savedTimestamp) > threeHoursInMs
      ) {
        // Clear expired data
        clearSavedFormData();
        return;
      }

      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
      }

      if (savedStep) {
        setStep(parseInt(savedStep));
      }

      if (savedOtpVerified === "true") {
        setOtpVerified(true);
      }
    }
  }, []);

  // Save form data and current step to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("passportFormData", JSON.stringify(formData));
      localStorage.setItem("passportFormStep", step.toString());
      localStorage.setItem("otpVerified", otpVerified.toString());
      localStorage.setItem("passportFormTimestamp", Date.now().toString());
    }
  }, [formData, step, otpVerified]);

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
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
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

  const slideVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    exit: {
      x: -100,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  // Add step titles
  const stepTitles = {
    1: "Basic Info",
    2: "Verification",
    3: "Family Details",
    4: "Address Details",
    5: "Passport Type",
    // 5: "Payment"
  };

  // Function to clear saved form data when needed
  const clearSavedFormData = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("passportFormData");
      localStorage.removeItem("passportFormStep");
      localStorage.removeItem("otpVerified");
      localStorage.removeItem("passportFormTimestamp");

      // Also clear authentication tokens
      clearToken();
    }
  };

  // Update progress width based on current step
  useEffect(() => {
    const width = ((step - 1) / 3) * 100;
    const margin = windowSize.width >= 768 ? "5rem" : "4rem";
    setProgressWidth(width);
  }, [step, windowSize.width]);

  // Add a function to handle price animation
  const triggerPriceAnimation = () => {
    // Clear any existing timeout
    if (priceAnimationTimeout) {
      clearTimeout(priceAnimationTimeout);
    }

    setAnimatePrice(true);
    const timer = setTimeout(() => setAnimatePrice(false), 1000);
    setPriceAnimationTimeout(timer);
  };

  const handleChange = async (e: FormEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // If zipCode is changed and has 6 digits, fetch city and state
    if (name === "zipCode" && value.length === 6) {
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
          const postOffice = data[0].PostOffice[0];
          setFormData((prev) => ({
            ...prev,
            city: postOffice.District,
            state: postOffice.State,
          }));
        }
      } catch (error) {
        console.error("Error fetching address details:", error);
      } finally {
        setZipLoading(false);
      }
    }
  };

  // const handleOTPChange = (index: number, value: string) => {
  //   // Only allow numbers
  //   if (value && !/^\d+$/.test(value)) return;

  //   // Update the OTP digits array
  //   const newOtpDigits = [...otpDigits];
  //   newOtpDigits[index] = value;
  //   setOtpDigits(newOtpDigits);

  //   // Update the main form data with combined OTP
  //   setFormData((prev) => ({ ...prev, otp: newOtpDigits.join("") }));

  //   // Auto-focus next input if value is entered
  //   if (value && index < 3) {
  //     const nextInput = document.querySelector(
  //       `input[name=otp-${index + 1}]`,
  //     ) as HTMLInputElement;
  //     if (nextInput) nextInput.focus();
  //   }
  // };

  const handleOTPChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);

    const fullOtp = newOtpDigits.join("");

    setFormData((prev) => ({ ...prev, otp: fullOtp }));

    // Move focus
    if (value && index < 3) {
      const nextInput = document.querySelector(
        `input[name=otp-${index + 1}]`,
      ) as HTMLInputElement;

      if (nextInput) nextInput.focus();
    }

    if (fullOtp.length === 4 && !newOtpDigits.includes("") && !loading) {
      verifyOTP(fullOtp);
    }
  };

  const handleOTPKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Handle backspace
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const prevInput = document.querySelector(
        `input[name=otp-${index - 1}]`,
      ) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
        e.preventDefault();
      }
    }
  };

  const handleOTPPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtpDigits = [...otpDigits];
    pastedData.split("").forEach((char, index) => {
      if (index < 4) newOtpDigits[index] = char;
    });
    setOtpDigits(newOtpDigits);
    setFormData((prev) => ({ ...prev, otp: newOtpDigits.join("") }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendOTP = async () => {
    setLoading(true);
    setOtpSent(false);
    setErrorMessage("");

    try {
      const otpResponse = await fetch("/api/otp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile_number: formData.mobile,
          purpose: "registration",
        }),
      });

      const data = await otpResponse.json();

      if (!otpResponse.ok) {
        throw { response: { data, status: otpResponse.status } };
      }

      setOtpSent(true);
    } catch (error: any) {
      console.error("Error sending OTP:", error);

      if (error.response?.data?.errors?.mobile_number) {
        setErrorMessage(error.response.data.errors.mobile_number[0]);
      } else {
        setErrorMessage("Failed to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (otpValue?: string, e?: React.FormEvent) => {
    e?.preventDefault?.();

    const finalOtp = otpValue ?? formData.otp;

    if (!finalOtp || finalOtp.length !== 4) {
      setErrorMessage("The otp must be 4 digits");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`/api/otp/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
        body: JSON.stringify({
          mobile_number: formData.mobile,
          otp: finalOtp,
          purpose: "registration",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw { response: { data, status: response.status } };
      }

      setOtpVerified(true);

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      const nextStepFromAPI = data?.next_step;

      const stepMapping: any = {
        otp_verification: 2,
        additional_information: 3,
        service_selection: 4,
        payment: 4,
      };

      setTimeout(() => {
        if (!nextStepFromAPI) {
          console.error("Invalid next_step from API");
          return;
        }

        setStep(stepMapping[nextStepFromAPI] ?? 1);
      }, 1500);
    } catch (error: any) {
      // 🔥 Handle BOTH API + unexpected errors here

      setOtpDigits(["", "", "", ""]);
      setFormData((prev) => ({ ...prev, otp: "" }));

      if (error?.response?.status === 401) {
        setErrorMessage("Invalid or expired OTP. Please request a new one.");
      } else if (error?.response?.data?.errors?.otp) {
        setErrorMessage(error.response.data.errors.otp[0]);
      } else {
        console.error("Unexpected error:", error);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const nextStep = async () => {
    // If moving from step 1 to 2, send OTP
    if (step === 1) {
      setLoading(true);
      setErrorMessage("");

      try {
        const customerResponse = await fetch("/api/customers/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: formData.fullName,
            email: formData.email,
            mobile_number: formData.mobile,
            service_code:
              formData.passportType === "normal"
                ? `NP${formData.bookSize}`
                : `TP${formData.bookSize}`,
            fbclid: formData.fbclid,
          }),
        });

        const customerData = await customerResponse.json();

        if (!customerResponse.ok && customerResponse.status !== 200) {
          const firstError = Object.values(customerData.errors || {})[0];

          setErrorMessage(
            Array.isArray(firstError) ? firstError[0] : "Validation error",
          );

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });

          return;
        }

        // if (customerResponse.status === 200) {
        //   const nextStepFromAPI = customerData?.next_step;
        //   const registrationStep = customerData?.registration_step;

        //   const stepMapping: any = {
        //     otp_verification: 2,
        //     additional_information: 3,
        //     service_selection: 4,
        //     payment: 4,
        //   };

        //   if (registrationStep >= 2) {
        //     setOtpVerified(true);
        //   }

        //   setStep(stepMapping[nextStepFromAPI] || 1);
        //   return;
        // }

        // if (customerResponse.status === 201) {
        //   console.log("Customer created successfully, sending OTP...");
        //   const otpResponse = await fetch("/api/otp/send", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //       mobile_number: formData.mobile,
        //       purpose: "registration",
        //     }),
        //   });

        //   const otpData = await otpResponse.json();

        //   if (!otpResponse.ok) {
        //     setErrorMessage(
        //       otpData.errors?.mobile_number?.[0] || "Failed to send OTP",
        //     );
        //     return;
        //   }

        //   setOtpSent(true);
        //   setStep(2);
        // }
        if (
          customerResponse.status === 200 ||
          customerResponse.status === 201
        ) {
          console.log("Customer saved/updated successfully");

          // ALWAYS SEND OTP
          const otpResponse = await fetch("/api/otp/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mobile_number: formData.mobile,
              purpose: "registration",
            }),
          });

          const otpData = await otpResponse.json();

          if (!otpResponse.ok) {
            setErrorMessage(
              otpData.errors?.mobile_number?.[0] || "Failed to send OTP",
            );

            return;
          }

          // OTP SENT SUCCESSFULLY
          setOtpSent(true);

          // ALWAYS GO TO OTP STEP
          setStep(2);

          return;
        }
      } catch (error) {
        console.error("Unexpected Error:", error);
        setErrorMessage("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }

      return;
    }

    // If moving from step 3 to 4, submit additional information
    if (step === 3) {
      setLoading(true);
      setErrorMessage("");

      try {
        // Get the stored token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authentication token not found");
          setErrorMessage("Session expired. Please start over.");
          setLoading(false);
          return;
        }

        // Format date for API
        // const formattedDob = formatDateForApi(formData.dateOfBirth);

        // Send additional information to API using the internal API route
        const response = await fetch(`/api/customer/additional-info`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            address: formData.address,
            pin_code: formData.zipCode,
            city: formData.city,
            state: formData.state,
            gender: formData.gender,
            // date_of_birth: formattedDob,
            date_of_birth: formData.dateOfBirth,
            // place_of_birth: formData.placeOfBirth,
            education_qualification: formData.education_qualification,
            employment_type: formData.employment_type,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw { response: { data, status: response.status } };
        }

        // If we get here, the API call was successful
      } catch (error: any) {
        console.error("Error submitting additional information:", error);

        // Handle errors
        if (error.response?.data?.errors) {
          const firstError = Object.values(error.response.data.errors)[0];
          if (Array.isArray(firstError) && firstError.length > 0) {
            setErrorMessage(firstError[0]);
          } else {
            setErrorMessage("Invalid information. Please check your details.");
          }
        } else {
          setErrorMessage("Failed to save your information. Please try again.");
        }

        setLoading(false);
        return;
      } finally {
        setLoading(false);
      }
    }

    // Move to the next step for other transitions
    setStep((prevStep) => prevStep + 1);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [step]);

  const prevStep = () => {
    setStep(step - 1);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      // Prevent loading script multiple times
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // const completePayment = async () => {
  //   if (typeof window === "undefined") return;

  //   setLoading(true);
  //   setErrorMessage("");

  //   try {
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //       setErrorMessage("Session expired. Please login again.");
  //       return;
  //     }

  //     let serviceCode: string | undefined;

  //     if (formData.passportType === "normal" && formData.bookSize === "36") {
  //       serviceCode = "NP36";
  //     } else if (
  //       formData.passportType === "normal" &&
  //       formData.bookSize === "60"
  //     ) {
  //       serviceCode = "NP60";
  //     } else if (
  //       formData.passportType === "tatkal" &&
  //       formData.bookSize === "36"
  //     ) {
  //       serviceCode = "TP36";
  //     } else if (
  //       formData.passportType === "tatkal" &&
  //       formData.bookSize === "60"
  //     ) {
  //       serviceCode = "TP60";
  //     }

  //     if (!serviceCode) {
  //       setErrorMessage("Invalid service selection");
  //       return;
  //     }

  //     await axiosServer.post(
  //       "/customer/select-service",
  //       {
  //         service_code: serviceCode,
  //         book_size: String(formData.bookSize),
  //         passport_type: formData.passportType,
  //         nationality: formData.nationality,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const orderRes = await axiosServer.post(
  //       "/create-order",
  //       {
  //         service_code: serviceCode,
  //         mobile: formData.mobile,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const order = orderRes.data;

  //     const loaded = await loadRazorpayScript();
  //     if (!loaded) {
  //       setErrorMessage("Razorpay SDK failed to load");
  //       return;
  //     }

  //     const rzp = new window.Razorpay({
  //       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
  //       amount: order.amount,
  //       currency: "INR",
  //       name: "Passport Service",
  //       description: "Application Fee",
  //       order_id: order.id,

  //       prefill: {
  //         name: order.name,
  //         email: order.email,
  //         contact: order.mobile,
  //       },

  //       // handler: async function (response: any) {
  //       //   try {
  //       //     await axiosServer.post(
  //       //       "/verify-payment",
  //       //       {
  //       //         razorpay_order_id: response.razorpay_order_id,
  //       //         razorpay_payment_id: response.razorpay_payment_id,
  //       //         razorpay_signature: response.razorpay_signature,
  //       //       },
  //       //       {
  //       //         headers: {
  //       //           Authorization: `Bearer ${token}`,
  //       //         },
  //       //       },
  //       //     );

  //       //     window.location.href = "/payment-response?status=success";
  //       //   } catch {
  //       //     setErrorMessage("Payment verification failed. Please try again.");
  //       //   }
  //       // },

  //       // handler: function (response: any) {
  //       //   window.location.href = `/payment-response?status=success`;

  //       //   axiosServer
  //       //     .post(
  //       //       "/verify-payment",
  //       //       {
  //       //         razorpay_order_id: response.razorpay_order_id,
  //       //         razorpay_payment_id: response.razorpay_payment_id,
  //       //         razorpay_signature: response.razorpay_signature,
  //       //       },
  //       //       {
  //       //         headers: {
  //       //           Authorization: `Bearer ${token}`,
  //       //         },
  //       //       },
  //       //     )
  //       //     .catch(console.error);
  //       // },

  //       handler: async function (response: any) {
  //         try {
  //           await axiosServer.post(
  //             "/verify-payment",
  //             {
  //               razorpay_order_id: response.razorpay_order_id,
  //               razorpay_payment_id: response.razorpay_payment_id,
  //               razorpay_signature: response.razorpay_signature,
  //             },
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${token}`,
  //               },
  //             },
  //           );

  //           window.location.href = "/payment-response?status=success";
  //         } catch (err) {
  //           console.error(err);

  //           window.location.href = "/payment-response?status=failed";
  //         }
  //       },

  //       modal: {
  //         ondismiss: async function () {
  //           console.log("Payment popup closed by user");

  //           // try {
  //           //   await axiosServer.post(
  //           //     "/payment-failed",
  //           //     {
  //           //       razorpay_order_id: order.id,
  //           //       reason: "User closed payment popup",
  //           //     },
  //           //     {
  //           //       headers: {
  //           //         Authorization: `Bearer ${token}`,
  //           //       },
  //           //     },
  //           //   );
  //           // } catch (err) {
  //           //   console.error("Failed to update dismiss status:", err);
  //           // }

  //           // refresh current page
  //           window.location.reload();
  //         },
  //       },
  //     });

  //     // rzp.on("payment.failed", async function (response) {
  //     //   try {
  //     //     await axiosServer.post(
  //     //       "/payment-failed",
  //     //       {
  //     //         razorpay_order_id: response.error.metadata.order_id,
  //     //         razorpay_payment_id: response.error.metadata.payment_id,
  //     //       },
  //     //       {
  //     //         headers: {
  //     //           Authorization: `Bearer ${token}`,
  //     //         },
  //     //       },
  //     //     );
  //     //   } catch (err) {
  //     //     console.error("Failed to update payment failure:", err);
  //     //   }

  //     //   // reload current page
  //     //   window.location.reload();
  //     // });

  //     rzp.open();
  //   } catch (err: any) {
  //     console.error("MAIN ERROR:", err.response?.data || err);

  //     setErrorMessage(
  //       err.response?.data?.message || "Something went wrong during payment",
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const completePayment = async () => {
    if (typeof window === "undefined") return;

    setLoading(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("Session expired. Please login again.");
        return;
      }

      let serviceCode: string | undefined;

      if (formData.passportType === "normal" && formData.bookSize === "36") {
        serviceCode = "NP36";
      } else if (
        formData.passportType === "normal" &&
        formData.bookSize === "60"
      ) {
        serviceCode = "NP60";
      } else if (
        formData.passportType === "tatkal" &&
        formData.bookSize === "36"
      ) {
        serviceCode = "TP36";
      } else if (
        formData.passportType === "tatkal" &&
        formData.bookSize === "60"
      ) {
        serviceCode = "TP60";
      }

      if (!serviceCode) {
        setErrorMessage("Invalid service selected");
        return;
      }

      // Select Service
      await axiosServer.post(
        "/customer/select-service",
        {
          service_code: serviceCode,
          book_size: String(formData.bookSize),
          passport_type: formData.passportType,
          nationality: formData.nationality,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Create Razorpay Order
      const { data: order } = await axiosServer.post(
        "/create-order",
        {
          service_code: serviceCode,
          mobile: formData.mobile,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const loaded = await loadRazorpayScript();

      if (!loaded) {
        setErrorMessage("Unable to load Razorpay.");
        return;
      }

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,

        amount: order.amount,
        currency: "INR",

        name: "Passport Service",
        description: "Application Fee",

        order_id: order.id,

        prefill: {
          name: order.name,
          email: order.email,
          contact: order.mobile,
        },

        handler: async function (response: any) {
          try {
            await axiosServer.post(
              "/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );

            window.location.href = "/payment-response?status=success";
          } catch (error: any) {
            console.log("VERIFY ERROR");

            console.log(error);

            console.log(error.response);

            console.log(error.response?.data);

            window.location.reload();
            // window.location.href = "/payment-response?status=failed";
          }
        },

        modal: {
          escape: false,

          ondismiss: function () {
            console.log("User closed payment popup");
            window.location.reload();

            // window.location.href = "/payment-response?status=cancelled";
          },
        },
      });

      // Only actual payment failures
      rzp.on("payment.failed", async function (response: any) {
        try {
          await axiosServer.post(
            "/payment-failed",
            {
              razorpay_order_id: response.error.metadata.order_id,
              razorpay_payment_id: response.error.metadata.payment_id,
              reason: response.error.description,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
        } catch (err) {
          console.error("Payment Failed API Error", err);
        }
        window.location.reload();

        // window.location.href = "/payment-response?status=failed";
      });

      rzp.open();
    } catch (err: any) {
      console.error(err);

      setErrorMessage(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const calculatePrice = () => {
    const basePrice = formData.passportType === "normal" ? 1500 : 3500;
    const bookSizePrice = formData.bookSize === "36" ? 0 : 500;
    const processingFee = 500;
    const administrativeFee = 200;

    const subtotal = basePrice + bookSizePrice;
    const totalFees = processingFee + administrativeFee;
    const total = subtotal + totalFees;

    return {
      basePrice,
      bookSizePrice,
      processingFee,
      administrativeFee,
      subtotal,
      totalFees,
      total,
    };
  };

  const price = calculatePrice();

  // Update the handlers to use the new animation function
  const handlePassportTypeChange = (value: "normal" | "tatkal") => {
    setFormData((prev) => ({ ...prev, passportType: value }));
    triggerPriceAnimation();
  };

  const handleBookSizeChange = (value: "36" | "60") => {
    setFormData((prev) => ({ ...prev, bookSize: value }));
    triggerPriceAnimation();
  };

  // Clean up the animation timeout when component unmounts
  useEffect(() => {
    return () => {
      if (priceAnimationTimeout) {
        clearTimeout(priceAnimationTimeout);
      }
    };
  }, [priceAnimationTimeout]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const fbclid = params.get("fbclid");

    if (fbclid) {
      setFormData((prev) => ({
        ...prev,
        fbclid,
      }));

      localStorage.setItem("fbclid", fbclid);
    }
  }, []);

  const passportTitle = `${formData.passportType === "normal" ? "NORMAL PASSPORT" : "TATKAL PASSPORT"} - ${formData.bookSize}-PAGE`;

  // --- RETURN STATEMENT ---
  return (
    <>
      <ConfettiOverlay showConfetti={showConfetti} />

      <div className="relative mt-10">
        {step !== 1 && (
          <div className="mb-12 md:mb-8 text-center">
            {/* Passport Type Badge */}
            <div className="mb-4 h-8 inline-flex items-center rounded-full border border-yellow-300 bg-yellow-50 px-4 py-1 text-xs font-semibold tracking-widest text-blue-900">
              <span className="mr-2 text-yellow-500">•</span>
              {passportTitle}
            </div>

            {/* Main Title */}
            <h1 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl gradient-heading">
              Passport Application
            </h1>

            {/* Subtitle */}
            <p className="text-muted-foreground text-sm md:text-xl mt-2">
              Complete your application in a few simple steps
            </p>
          </div>
        )}

        {step !== 1 && (
          <ProgressBar
            step={step}
            stepTitles={stepTitles}
            progressWidth={progressWidth}
            windowSize={windowSize}
          />
        )}

        {/* ...rest of the JSX for all steps and UI... */}
        {step === 1 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <StepBasicInfo
              formData={formData}
              handleChange={handleChange}
              nextStep={nextStep}
              itemVariants={itemVariants}
              errorMessage={errorMessage}
              loading={loading}
            />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            className="card-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <StepVerification
              formData={formData}
              otpDigits={otpDigits}
              handleOTPChange={handleOTPChange}
              handleOTPKeyDown={handleOTPKeyDown}
              handleOTPPaste={handleOTPPaste}
              verifyOTP={verifyOTP}
              sendOTP={sendOTP}
              loading={loading}
              otpVerified={otpVerified}
              errorMessage={errorMessage}
              itemVariants={itemVariants}
              slideVariants={slideVariants}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {step === 3 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <StepFamilyDetails
                  formData={formData}
                  handleChange={handleChange}
                  prevStep={prevStep}
                  nextStep={nextStep}
                  loading={zipLoading}
                  slideVariants={containerVariants}
                />
              </motion.div>
            )}
          </motion.div>
        )}
        {step === 4 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <StepAddressDetails
              formData={formData}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              zipLoading={zipLoading}
              prevStep={prevStep}
              nextStep={nextStep}
              itemVariants={itemVariants}
            />
          </motion.div>
        )}
        {step === 5 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <StepPassportType
              formData={formData}
              handlePassportTypeChange={handlePassportTypeChange}
              handleBookSizeChange={handleBookSizeChange}
              animatePrice={animatePrice}
              prevStep={prevStep}
              completePayment={completePayment}
              loading={loading}
              errorMessage={errorMessage}
              itemVariants={itemVariants}
              windowSize={windowSize}
            />
          </motion.div>
        )}
      </div>

      {/* <div className="mt-4 md:mt-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-navy"
          >
            <Shield className="h-3 w-3 md:h-4 md:w-4" />
            Your information is secure and encrypted
          </motion.div>
        </div> */}
    </>
  );
}

export default ApplicationForm;
