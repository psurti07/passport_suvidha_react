import React from "react";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  CreditCard,
  FileText,
  Clock,
  Check,
  ArrowLeft,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Users,
  Clock3,
  AlertCircle,
  Headphones,
  FileCheck,
  Info,
} from "lucide-react";
import { motion } from "framer-motion";
import axiosServer from "@/lib/axiosServer";

interface StepPassportTypeProps {
  formData: any;
  handlePassportTypeChange: (value: "normal" | "tatkal") => void;
  handleBookSizeChange: (value: "36" | "60") => void;
  animatePrice: boolean;
  prevStep: () => void;
  completePayment: () => Promise<void>;
  loading: boolean;
  errorMessage?: string;
  itemVariants: any;
  windowSize: { width: number; height: number };
}

const passportTypes = [
  {
    key: "normal-36",
    passportType: "normal",
    bookSize: "36",
    title: "Normal 36-Page",
    price: "₹999",
    description: "Perfect for occasional travelers",
    badge: "Most Popular",
    features: [
      {
        icon: <Clock className="h-3.5 w-3.5 text-navy" />,
        text: "15-25 days processing",
      },
      {
        icon: <FileText className="h-3.5 w-3.5 text-navy" />,
        text: "36 pages capacity",
      },
      {
        icon: <Check className="h-3.5 w-3.5 text-navy" />,
        text: "Most economical choice",
      },
    ],
  },
  {
    key: "normal-60",
    passportType: "normal",
    bookSize: "60",
    title: "Normal 60-Page",
    price: "₹999",
    description: "Ideal for frequent travelers",
    badge: "Extra Capacity",
    features: [
      {
        icon: <Clock className="h-3.5 w-3.5 text-navy" />,
        text: "15-25 days processing",
      },
      {
        icon: <FileText className="h-3.5 w-3.5 text-navy" />,
        text: "60 pages capacity",
      },
      {
        icon: <Check className="h-3.5 w-3.5 text-navy" />,
        text: "Extra space for visas",
      },
    ],
  },
  {
    key: "tatkal-36",
    passportType: "tatkal",
    bookSize: "36",
    title: "Tatkal 36-Page",
    price: "₹999",
    description: "For urgent travel needs",
    badge: "Express Service",
    features: [
      {
        icon: <Clock className="h-3.5 w-3.5 text-navy" />,
        text: "1-7 days working",
      },
      {
        icon: <FileText className="h-3.5 w-3.5 text-navy" />,
        text: "36 pages capacity",
      },
      {
        icon: <Check className="h-3.5 w-3.5 text-navy" />,
        text: "Priority verification",
      },
    ],
  },
  {
    key: "tatkal-60",
    passportType: "tatkal",
    bookSize: "60",
    title: "Tatkal 60-Page",
    price: "₹999",
    description: "Ultimate express package",
    badge: "Premium Service",
    features: [
      {
        icon: <Clock className="h-3.5 w-3.5 text-navy" />,
        text: "1-7 days working",
      },
      {
        icon: <FileText className="h-3.5 w-3.5 text-navy" />,
        text: "60 pages capacity",
      },
      {
        icon: <Check className="h-3.5 w-3.5 text-navy" />,
        text: "Premium processing",
      },
    ],
  },
];

const mapServiceCodeToType = (serviceCode: string) => {
  switch (serviceCode) {
    case "NP36":
      return { passportType: "normal", bookSize: "36" };
    case "NP60":
      return { passportType: "normal", bookSize: "60" };
    case "TP36":
      return { passportType: "tatkal", bookSize: "36" };
    case "TP60":
      return { passportType: "tatkal", bookSize: "60" };
    default:
      return { passportType: "", bookSize: "" };
  }
};

const StepPassportType = ({
  formData,
  handlePassportTypeChange,
  handleBookSizeChange,
  animatePrice,
  prevStep,
  completePayment,
  loading,
  errorMessage,
  itemVariants,
  windowSize,
}: StepPassportTypeProps) => {
  const [services, setServices] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axiosServer.get("/services/passport");

        if (res.data.success) {
          setServices(res.data.data);
        }
      } catch (err: any) {
        console.error(
          "Failed to load services",
          err.response?.data || err.message,
        );
      }
    };

    fetchServices();
  }, []);

  const selectedService = services.find((service) => {
    const { passportType, bookSize } = mapServiceCodeToType(
      service.service_code,
    );

    return (
      passportType === formData.passportType && bookSize === formData.bookSize
    );
  });

  const selectedStaticData = passportTypes.find(
    (entry) =>
      entry.passportType === formData.passportType &&
      entry.bookSize === formData.bookSize,
  );

  const selectedTitle = (
    selectedService?.service_name ||
    selectedStaticData?.title ||
    "Selected Passport"
  ).replace(/\s*\(.*?\)/, "");
  const selectedDescription =
    selectedStaticData?.description ||
    selectedService?.service_name ||
    "Review your selected passport service before completing payment.";

  return (
    <>
      <div className="min-h-screen px-4 md:py-6 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl mx-auto">
          <div className="rounded-3xl bg-white md:p-6 shadow-xl">
            <CardHeader className="pb-6">
              <motion.div variants={itemVariants}>
                <CardTitle className="md:text-2xl font-semibold tracking-tight text-2xl flex items-center gap-2 gradient-heading">
                  <Clock className="h-5 w-5 text-navy" />
                  Review & Pay
                </CardTitle>
              </motion.div>
              <motion.div variants={itemVariants}>
                <CardDescription className="!text-xs text-muted-foreground">
                  Review your selection and complete the payment to submit your
                  application
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className="sm:p-2 !pt-0">
              {errorMessage && (
                <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-lg ">
                  <p className="text-sm text-red-600">{errorMessage}</p>
                </div>
              )}

              <motion.div
                variants={itemVariants}
                className="grid gap-6 lg:grid-cols-2"
              >
                <div className="space-y-6">
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Selected Service
                        </p>
                        <h2 className="md:mt-3 text-2xl font-semibold text-navy">
                          {selectedTitle}
                        </h2>
                        <p className=" text-sm font-medium text-muted-foreground">
                          {formData.bookSize} Pages
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-8 space-y-3">
                      {(selectedStaticData?.features || []).map(
                        (feature, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 rounded-xl bg-muted px-4 py-2 md:py-3"
                          >
                            <div className="mt-1 flex">{feature.icon}</div>
                            <p className="text-sm text-muted-foreground">
                              {feature.text}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="md:mt-3 flex items-center gap-2">
                    <div className="rounded-2xl bg-teal-50 text-teal-700">
                      <CreditCard className="h-5 w-5 text-navy" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-navy">
                        Price Breakdown
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-8 space-y-3 md:space-y-4">
                    <div className="rounded-2xl bg-slate-50">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Service Charge</span>
                        <span>₹{selectedService?.service_charges || 0}</span>
                      </div>
                    </div>
                    <div className="rounded-2xl bg-slate-50">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>GST (18%)</span>
                        <span>₹{selectedService?.service_gst || 0}</span>
                      </div>
                    </div>
                    <div className="rounded-xl bg-muted px-4 py-2 md:py-3">
                      <div className="flex justify-between items-center text-base font-semibold text-navy">
                        <span>Total Amount</span>
                        <span>
                          ₹{selectedService?.service_total_amount || 0}
                        </span>
                      </div>
                    </div>
                    <div className="rounded-xl bg-muted px-4 py-2 md:py-3">
                      <div className="flex gap-3">
                        <Info className="h-5 w-5 text-navy flex-shrink-0 pt-1" />

                        <p className="text-xs font-semibold text-navy">
                          Important:{" "}
                          <span className="font-medium text-muted-foreground">
                            This fee is for consultation only. Government
                            charges will be applicable separately.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </div>

          <motion.div className="mt-4 flex">
            <CardFooter className="flex w-full gap-3 sm:flex-row justify-between">
              <Button
                variant="outline"
                className="rounded-md bg-primary text-primary-foreground px-4 modern-buttonlg"
                onClick={prevStep}
                disabled={loading}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                className="rounded-xl bg-gradient-to-r from-navy to-teal px-4 text-white shadow-lg modern-button"
                onClick={completePayment}
                disabled={
                  !formData.passportType || !formData.bookSize || loading
                }
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Complete Payment • ₹
                    {selectedService?.service_total_amount || 0}
                  </>
                )}
              </Button>
            </CardFooter>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default StepPassportType;
