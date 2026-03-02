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

// Type definitions
interface FormData {
  passportType: "normal" | "tatkal";
  bookSize: "36" | "60";
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  otp: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  gender: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  paymentMethod: "credit" | "upi" | "netBanking";
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
  if (!dateString) return '';
  
  // Check if it's already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }
  
  // Convert from DD/MM/YYYY to YYYY-MM-DD
  const parts = dateString.split('/');
  if (parts.length !== 3) return dateString;
  
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
};

function ApplicationForm() {
  const [step, setStep] = useState(1);
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
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    otp: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    gender: "",
    dateOfBirth: "",
    placeOfBirth: "",
    nationality: "India",
    paymentMethod: "credit",
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
      const threeHoursInMs = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
      
      // Check if data is older than 3 hours
      if (savedTimestamp && currentTime - parseInt(savedTimestamp) > threeHoursInMs) {
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
    3: "Address Details",
    4: "Passport Type",
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
          `https://api.postalpincode.in/pincode/${value}`
        );
        const data: PinCodeResponse[] = await response.json();

        if (
          data[0].Status === "Success" &&
          data[0].PostOffice &&
          data[0].PostOffice.length > 0
        ) {
          const postOffice = data[0].PostOffice[0];
          const stateCode =
            stateNameToCode[postOffice.State] || postOffice.State;
          setFormData((prev) => ({
            ...prev,
            city: postOffice.District,
            state: stateCode,
          }));
        }
      } catch (error) {
        console.error("Error fetching address details:", error);
      } finally {
        setZipLoading(false);
      }
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    // Update the OTP digits array
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);

    // Update the main form data with combined OTP
    setFormData((prev) => ({ ...prev, otp: newOtpDigits.join("") }));

    // Auto-focus next input if value is entered
    if (value && index < 3) {
      const nextInput = document.querySelector(
        `input[name=otp-${index + 1}]`
      ) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleOTPKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const prevInput = document.querySelector(
        `input[name=otp-${index - 1}]`
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

  // Resend OTP function for when users want to resend on verification page
  const sendOTP = async () => {
    setLoading(true);
    setOtpSent(false);
    setErrorMessage("");

    try {
      // Use internal API route instead of direct external API call
      const otpResponse = await fetch('/api/otp/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile_number: formData.mobile,
          purpose: 'registration',
        }),
      });
      
      const data = await otpResponse.json();
      
      if (!otpResponse.ok) {
        throw { response: { data, status: otpResponse.status } };
      }
      
      setOtpSent(true);
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      
      // Set error message for OTP send errors
      if (error.response?.data?.errors?.mobile_number) {
        setErrorMessage(error.response.data.errors.mobile_number[0]);
      } else {
        setErrorMessage('Failed to send OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setLoading(true);
    setErrorMessage("");
    
    try {
      // Prevent default form submission behavior that might cause navigation
      event?.preventDefault?.();
      
      try {
        const response = await fetch('/api/otp/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            mobile_number: formData.mobile,
            otp: formData.otp,
            purpose: 'registration',
          })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw { response: { data, status: response.status } };
        }
  
        // OTP verification successful
        setOtpVerified(true);
        
        // Store the auth token if needed for future authenticated requests
        if (data?.token) {
          localStorage.setItem('token', data.token);
        }
        
        // Automatically move to the next step after successful verification
        setTimeout(() => {
          setStep((prevStep) => prevStep + 1);
        }, 1500); // Small delay to show the success message before moving on
      } catch (apiError: any) {
        // Handle API error (invalid OTP)
        // console.log('OTP validation failed:', apiError.response?.status);
        
        // Reset OTP digits
        setOtpDigits(['', '', '', '']);
        setFormData((prev) => ({ ...prev, otp: '' }));
        
        // Set appropriate error message based on response
        if (apiError.response?.status === 401) {
          setErrorMessage('Invalid or expired OTP. Please request a new one.');
        } else if (apiError.response?.data?.errors?.otp) {
          setErrorMessage(apiError.response.data.errors.otp[0]);
        } else {
          setErrorMessage('Invalid OTP. Please try again.');
        }
      }
    } catch (error) {
      // Handle any other unexpected errors
      console.error('Unexpected error during OTP verification:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
      
      // Reset OTP digits
      setOtpDigits(['', '', '', '']);
      setFormData((prev) => ({ ...prev, otp: '' }));
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
        // First save the basic customer information and send OTP
        try {
          const customerResponse = await fetch('/api/customers/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              first_name: formData.firstName,
              last_name: formData.lastName,
              email: formData.email,
              mobile_number: formData.mobile,
            }),
          });
          
          const customerData = await customerResponse.json();
          
          if (!customerResponse.ok) {
            throw { response: { data: customerData, status: customerResponse.status } };
          }
          
          // If successful, send OTP
          try {
            const otpResponse = await fetch('/api/otp/send', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                mobile_number: formData.mobile,
                purpose: 'registration',
              }),
            });
            
            const otpData = await otpResponse.json();
            
            if (!otpResponse.ok) {
              throw { response: { data: otpData, status: otpResponse.status } };
            }
            
            setOtpSent(true);
            // Now proceed to next step
            setStep((prevStep) => prevStep + 1);
          } catch (otpError: any) {
            console.error('Error sending OTP:', otpError);
            
            // Set error message for OTP send errors
            if (otpError.response?.data?.errors?.mobile_number) {
              setErrorMessage(otpError.response.data.errors.mobile_number[0]);
            } else {
              setErrorMessage('Failed to send OTP. Please try again.');
            }
          }
        } catch (customerError: any) {
          console.error('Error saving customer information:', customerError);
          
          // Set error message for customer data validation errors
          if (customerError.response?.data?.errors) {
            const firstError = Object.values(customerError.response.data.errors)[0];
            if (Array.isArray(firstError) && firstError.length > 0) {
              setErrorMessage(firstError[0]);
            } else {
              setErrorMessage('Invalid customer information. Please check your details.');
            }
          } else {
            setErrorMessage('Failed to save customer information. Please try again.');
          }
        }
      } catch (error) {
        console.error('Error in OTP process:', error);
        setErrorMessage('An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
      
      return; // Return here to prevent moving to next step if there was an error
    }
    
    // If moving from step 3 to 4, submit additional information
    if (step === 3) {
      setLoading(true);
      setErrorMessage("");
      
      try {
        // Get the stored token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Authentication token not found');
          setErrorMessage('Session expired. Please start over.');
          setLoading(false);
          return;
        }
        
        // Format date for API
        const formattedDob = formatDateForApi(formData.dateOfBirth);
        
        // Send additional information to API using the internal API route
        const response = await fetch('/api/customer/additional-info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            address: formData.address,
            pin_code: formData.zipCode,
            city: formData.city,
            state: formData.state,
            gender: formData.gender,
            date_of_birth: formattedDob,
            place_of_birth: formData.placeOfBirth
          })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw { response: { data, status: response.status } };
        }
        
        // If we get here, the API call was successful
      } catch (error: any) {
        console.error('Error submitting additional information:', error);
        
        // Handle errors
        if (error.response?.data?.errors) {
          const firstError = Object.values(error.response.data.errors)[0];
          if (Array.isArray(firstError) && firstError.length > 0) {
            setErrorMessage(firstError[0]);
          } else {
            setErrorMessage('Invalid information. Please check your details.');
          }
        } else {
          setErrorMessage('Failed to save your information. Please try again.');
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

  const prevStep = () => {
    setStep(step - 1);
  };

  const completePayment = async () => {
    setLoading(true);
    setErrorMessage("");
    
    try {
      // Get the stored token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Authentication token not found');
        setErrorMessage('Session expired. Please start over.');
        setLoading(false);
        return;
      }
      
      // Map the passport type and book size to the API's service codes
      let serviceCode;
      if (formData.passportType === 'normal' && formData.bookSize === '36') {
        serviceCode = 'NORMAL_36';
      } else if (formData.passportType === 'normal' && formData.bookSize === '60') {
        serviceCode = 'NORMAL_60';
      } else if (formData.passportType === 'tatkal' && formData.bookSize === '36') {
        serviceCode = 'TATKAL_36';
      } else if (formData.passportType === 'tatkal' && formData.bookSize === '60') {
        serviceCode = 'TATKAL_60';
      }
      
      // Send service selection to API using internal API route
      const response = await fetch('/api/customer/select-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ service_code: serviceCode })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw { response: { data, status: response.status } };
      }
      
      // If we get here, the API call was successful
      // Show confetti for successful submission
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
      
      // Clear saved form data on successful completion
      clearSavedFormData();
    } catch (error: any) {
      console.error('Error completing payment:', error);
      
      // Handle errors
      if (error.response?.data?.errors) {
        const firstError = Object.values(error.response.data.errors)[0];
        if (Array.isArray(firstError) && firstError.length > 0) {
          setErrorMessage(firstError[0]);
        } else {
          setErrorMessage('Invalid service selection. Please try again.');
        }
      } else {
        setErrorMessage('Failed to complete your application. Please try again.');
      }
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

  // --- RETURN STATEMENT ---
  return (
    <>
      <ConfettiOverlay showConfetti={showConfetti} />

      <div className="relative">
        <ProgressBar
          step={step}
          stepTitles={stepTitles}
          progressWidth={progressWidth}
          windowSize={windowSize}
        />

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
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit">
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
        {step === 4 && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit">
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

      <div className="mt-4 md:mt-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-navy"
        >
          <Shield className="h-3 w-3 md:h-4 md:w-4" />
          Your information is secure and encrypted
        </motion.div>
      </div>
    </>
  );
}

export default ApplicationForm; 