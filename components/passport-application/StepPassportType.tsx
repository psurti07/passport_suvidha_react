import React from "react";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import {
  CreditCard,
  FileText,
  Clock,
  Check,
  ArrowLeft,
  Loader2,
  Info,
  Star,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
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

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateCarousel = () => {
      setCurrent(api.selectedScrollSnap());
    };

    // Initial values
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    // Listen for slide changes
    api.on("select", updateCarousel);

    return () => {
      api.off("select", updateCarousel);
    };
  }, [api]);

  // Auto scroll
  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [api]);

  const reviews = [
    {
      name: "Divya Patel",
      // location: "New Delhi",
      rating: 3,
      review:
        "Passport Suvidha provided clear instructions and timely assistance, making the process smooth and reliable.",
    },
    {
      name: "Jevin Pipaliya",
      // location: "Ahmedabad",
      rating: 4,
      review:
        "Very reliable and responsive service. I was unsure about the passport documentation requirements, but the team explained everything clearly and helped me avoid unnecessary delays. The entire experience was smooth and well-organized. Highly recommended",
    },
    {
      name: "SAVANI KRISHA",
      // location: "Mumbai",
      rating: 5,
      review:
        "Passport Suvidha is truly reliable. Their consulting made the entire application simple and easy to understand. I would definitely recommend them to others.",
    },
    {
      name: "Rinkal Golakiya",
      // location: "Pune",
      rating: 4,
      review:
        "When I applied for my passport, I was concerned about delays and errors. Passport Suvidha gave me confidence by handling everything correctly. Their team was courteous, efficient, and highly professional. I received my passport on time, and I truly appreciate their reliable support.",
    },
    {
      name: "Alkesh Patel",
      // location: "Mumbai",
      rating: 4,
      review:
        "I appreciated how quickly the staff responded to my queries. They ensured all documents were correct, which saved me from unnecessary delays",
    },
    {
      name: "Himmat Bhai",
      // location: "Mumbai",
      rating: 3,
      review:
        "Passport Suvidha delivered top-notch service during my passport application. Their attention to detail and customer-first approach made the process smooth and reliable.",
    },
    {
      name: "Kaushik Ghoghari",
      // location: "Mumbai",
      rating: 5,
      review:
        "Passport Suvidha made my Tatkal passport application stress-free. They provided accurate guidance on the required documents and kept me updated throughout the process. Their professionalism and attention to detail were impressive. I would definitely use their services again. Himmatbhai tarsariya , Amreli.",
    },
    {
      name: "Sejal Jasoliya",
      // location: "Mumbai",
      rating: 5,
      review:
        "Passport Suvidha made my passport application journey effortless. Their guidance was clear, their support was timely, and their professionalism exceeded expectations.",
    },
    {
      name: "Rashikbhai Kanani",
      // location: "Mumbai",
      rating: 3,
      review:
        "I had a great experience with Passport Suvidha. The team guided me through every step of my passport application and made the entire process simple and hassle-free. They were quick to respond to my queries and ensured all my documents were in order. Highly recommended for anyone looking for professional passport assistance.",
    },
    {
      name: "Vipul Rathod",
      // location: "Mumbai",
      rating: 5,
      review:
        "I am vipul, I am very satisfied with Passport Suvidha’s services. The team was professional, supportive, and made the passport application process smooth and easy. Highly recommended.",
    },
    {
      name: "Poonam Roy",
      // location: "Mumbai",
      rating: 5,
      review:
        "I used PassportSuvidha for both my new passport application and my father's passport renewal, and the experience was excellent. The team provided clear guidance on the required documents, helped with the application process, and ensured everything was completed correctly. Their prompt support and professional approach made the entire process smooth and hassle-free. I highly recommend PassportSuvidha for anyone looking for reliable passport assistance services.",
    },
    {
      name: "Krishna Dhola",
      // location: "Mumbai",
      rating: 3,
      review:
        "Passport Suvidha turned what I thought would be a complicated process into a simple and well-organized journey. Their trustworthy service ensured every step was completed smoothly.",
    },
    {
      name: "Krish Sutariya",
      // location: "Mumbai",
      rating: 5,
      review:
        "Good passport application assistance with helpful customer service. The staff was patient and responsive throughout.",
    },
    {
      name: "Deepak Sharma",
      // location: "Mumbai",
      rating: 3,
      review:
        "Reliable and trustworthy service. I would recommend Passport Suvidha to anyone needing passport assistance.",
    },
    {
      name: "Tapaniya Sadulbhai",
      // location: "Mumbai",
      rating: 4,
      review:
        "Great customer service of Passport Suvidha! The team was friendly and supportive throughout the process Hareshbhai, Tataniya",
    },
  ];

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

          <div className="mb-6 flex justify-center">
            <div className="w-full overflow-hidden rounded-sm bg-teal/5 shadow-sm">
              <div className="landing-marquee py-2">
                {/* First copy */}
                <div className="marquee-item px-6">
                  <span className="text-xs md:text-sm font-medium text-teal">
                    This website is owned by a Private Consultancy Firm
                    BOUNDLESS PASSPORT SUVIDHA LLP (Passport Suvidha). We are
                    not Authorised by any Government Department. The fee paid on
                    this platform is towards consultancy fee. No Government Fee
                    is collected by us. Passport application government fees
                    paid separately on government website. यह वेबसाइट एक
                    प्राइवेट कंसल्टेंसी फर्म, 'बाउंडलेस पासपोर्ट सुविधा LLP'
                    (पासपोर्ट सुविधा) की है। हम किसी भी सरकारी विभाग द्वारा
                    अधिकृत नहीं हैं। इस प्लेटफ़ॉर्म पर दी जाने वाली फ़ीस
                    कंसल्टेंसी फ़ीस है। हम कोई सरकारी फ़ीस नहीं लेते हैं।
                    पासपोर्ट आवेदन के लिए सरकारी फ़ीस का भुगतान अलग से सरकारी
                    वेबसाइट पर करना होता है।
                  </span>
                </div>

                {/* Second copy */}
                <div className="marquee-item px-6">
                  <span className="text-xs md:text-sm font-medium text-teal">
                    This website is owned by a Private Consultancy Firm
                    BOUNDLESS PASSPORT SUVIDHA LLP (Passport Suvidha). We are
                    not Authorised by any Government Department. The fee paid on
                    this platform is towards consultancy fee. No Government Fee
                    is collected by us. Passport application government fees
                    paid separately on government website. यह वेबसाइट एक
                    प्राइवेट कंसल्टेंसी फर्म, 'बाउंडलेस पासपोर्ट सुविधा LLP'
                    (पासपोर्ट सुविधा) की है। हम किसी भी सरकारी विभाग द्वारा
                    अधिकृत नहीं हैं। इस प्लेटफ़ॉर्म पर दी जाने वाली फ़ीस
                    कंसल्टेंसी फ़ीस है। हम कोई सरकारी फ़ीस नहीं लेते हैं।
                    पासपोर्ट आवेदन के लिए सरकारी फ़ीस का भुगतान अलग से सरकारी
                    वेबसाइट पर करना होता है।
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Review Section */}
          <section className="w-full py-10 md:py-16 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 max-w-[100vw] relative">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                {/* <div className="inline-block rounded-full bg-navy/5 px-4 py-1.5 text-sm text-navy">
              <span>Reviews</span>
            </div> */}
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-4xl font-bold gradient-heading">
                    What Our Users Say
                  </h2>
                  <p className="mt-3 text-muted-foreground text-xs lg:text-sm max-w-2xl mx-auto">
                    See what people say about their passport application
                    experience
                  </p>
                </div>
              </div>
              <div className="mx-auto max-w-5xl relative">
                {/* Background Glow */}
                <div className="absolute -inset-4 rounded-3xl " />
                <Carousel
                  setApi={setApi}
                  opts={{ align: "start", loop: true }}
                  className="relative w-full"
                >
                  <CarouselContent>
                    {reviews.map((review, index) => (
                      <CarouselItem
                        key={index}
                        className="basis-full md:basis-1/2"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.1 * index }}
                          className="p-2"
                        >
                          <Card className="rounded-3xl border-0 shadow-lg overflow-hidden bg-white">
                            {/* Gradient Top Border */}
                            <div className="h-2 w-full bg-gradient-to-r from-teal to-navy" />

                            <CardHeader>
                              <div className="flex gap-1 mb-2">
                                {Array(review.rating)
                                  .fill(0)
                                  .map((_, i) => (
                                    <Star
                                      key={i}
                                      className="h-4 w-4 fill-gold text-gold"
                                    />
                                  ))}
                              </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                              <p className="italic text-muted-foreground leading-relaxed">
                                "{review.review}"
                              </p>

                              <div>
                                <p className="font-medium text-navy">
                                  {review.name}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {/* <CarouselPrevious
                        className="
                          left-0
                          h-12 w-12
                          rounded-full
                          border-0
                          bg-gradient-to-r from-teal to-navy
                          text-white
                          shadow-xl
                          transition-all duration-300
                          hover:scale-110
                          hover:shadow-2xl
                          disabled:opacity-40
                        "
                      />
                      <CarouselNext
                        className="
                          right-0
                          h-12 w-12
                          rounded-full
                          border-0
                          bg-gradient-to-r from-teal to-navy
                          text-white
                          shadow-xl
                          transition-all duration-300
                          hover:scale-110
                          hover:shadow-2xl
                          disabled:opacity-40
                        "
                      /> */}
                </Carousel>
                {/* Dots */}
                <div className="mt-6 flex items-center justify-center gap-2">
                  {Array.from({ length: count }).map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        api?.scrollTo(index);
                      }}
                      aria-label={`Go to slide ${index + 1}`}
                      aria-current={current === index ? "true" : undefined}
                      className={`
              h-2.5
              rounded-full
              transition-all
              duration-500
              ease-out
              cursor-pointer
              ${
                current === index
                  ? "w-8 bg-navy shadow-sm"
                  : "w-2.5 bg-navy/20 hover:w-5 hover:bg-navy/40"
              }
            `}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default StepPassportType;
