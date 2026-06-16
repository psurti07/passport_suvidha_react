"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  Gift,
  CheckCircle,
  ArrowRight,
  Loader2,
  Menu,
  FileText,
  Phone,
  Mail,
  BadgeCheck,
  SearchCheck,
  Users,
  Clock3,
  FileCheck,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import Head from "next/head";
import axiosServer from "@/lib/axiosServer";
import Script from "next/script";

const CardOfferPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if ((window as any).Cashfree) {
        console.log("Cashfree detected manually");
        setSdkLoaded(true);
        clearInterval(interval);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
  });

  const [loading, setLoading] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axiosServer.get("/services/passport");
        setServices(res.data.data);
      } catch (err) {
        console.error("Failed to load services", err);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (services.length > 0) {
      setSelectedService(services[0].service_code);
    }
  }, [services]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValid =
    formData.fullName &&
    formData.email &&
    formData.mobile.length === 10 &&
    selectedService;

  const checkPaymentStatus = (order_id: string) => {
    let attempts = 0;

    const interval = setInterval(async () => {
      attempts++;

      try {
        const res = await axiosServer.get("/check-payment-status", {
          params: { order_id },
        });

        const status = res.data.status;

        // console.log("PAYMENT STATUS =>", status);

        if (status === "success") {
          clearInterval(interval);

          window.location.href = `/cardoffer-response?order_id=${order_id}&status=success`;

          return;
        }

        if (status === "failed") {
          clearInterval(interval);

          window.location.reload();

          // window.location.href = `/cardoffer-response?order_id=${order_id}&status=failed`;

          return;
        }

        if (status === "pending") {
          setErrorMessage("Waiting for payment confirmation...");
          window.location.reload();
        }
      } catch (err) {
        console.error("STATUS CHECK ERROR", err);
      }

      if (attempts >= 30) {
        clearInterval(interval);
        window.location.reload();
        // window.location.href = `/cardoffer-response?order_id=${order_id}&status=timeout`;
      }
    }, 2000);
  };

  const selectedServiceData = services.find(
    (s) => s.service_code === selectedService,
  );

  useEffect(() => {
    if (errorMessage) {
      window.scrollTo({
        top: 700,
        behavior: "smooth",
      });
    }
  }, [errorMessage]);

  const handleSubmit = async () => {
    if (!isValid) return;

    if (!sdkLoaded) {
      alert("Payment system loading... please wait");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const { data } = await axiosServer.post("/create-payment", {
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        service_code: selectedServiceData.service_code,
        amount: selectedServiceData.service_total_amount,
        offer_type: "card_offer",
        type: "offer",
      });

      if (!data.success) {
        setErrorMessage(data.message || "Payment failed");
        setLoading(false);
        return;
      }

      const cashfree = new (window as any).Cashfree({
        mode: process.env.NEXT_PUBLIC_CASHFREE_MODE || "sandbox",
      });

      const checkoutOptions = {
        paymentSessionId: String(data.payment_session_id).trim(),
        redirectTarget: "_modal",
      };

      const result = await cashfree.checkout(checkoutOptions);

      console.log("CASHFREE RESULT", result);

      setErrorMessage("Checking payment status...");

      checkPaymentStatus(data.order_id);
    } catch (error: any) {
      // console.error("PAYMENT ERROR", error);

      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";

      setErrorMessage(msg);

      setLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://sdk.cashfree.com/js/v3/cashfree.js"
        strategy="lazyOnload"
        onLoad={() => {
          setSdkLoaded(true);
        }}
      />
      <div className="relative min-h-screen flex flex-col bg-white">
        {/* <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-white" />

          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-white to-white" />

          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-100 opacity-30 rounded-full blur-3xl" />
          <div className="absolute top-[30%] right-0 w-[500px] h-[500px] bg-teal-100 opacity-20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-[30%] w-[400px] h-[400px] bg-blue-50 opacity-30 rounded-full blur-2xl" />
        </div> */}

        <header className="w-full border-b border-slate-200 bg-transparent mt-2 pb-2">
          <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6 ">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center transition-opacity hover:opacity-90"
              aria-label="Passport Suvidha Home"
            >
              <Image
                src="/logo/passport-suvidha.png"
                alt="Passport Suvidha"
                width={180}
                height={40}
                priority
                className="h-16 md:h-16 w-auto"
              />
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center">
              <div
                className="relative"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <Menu className="h-6 w-6 cursor-pointer text-navy" />

                {showTooltip && (
                  <div className="absolute right-0 mt-3 w-72 rounded-xl border bg-white shadow-lg p-4 text-sm text-slate-700 space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-navy" />
                      <span className="text-navy">+91-7486046591</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-navy" />
                      <span className="text-navy">
                        support@passportsuvidha.com
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="md:hidden ml-auto hover:bg-transparent"
                >
                  <Menu className="h-6 w-6 text-slate-700" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-full sm:w-[400px] bg-white"
              >
                <div className="mt-16 flex flex-col items-center gap-8">
                  <h2 className="text-xl font-semibold">Contact Us</h2>

                  <div className="w-full rounded-2xl border p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-teal-600" />
                      <span>+91-7486046591</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-teal-600" />
                      <span>support@passportsuvidha.com</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <div className="max-w-4xl mx-auto text-center mt-10 px-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl gradient-heading">
            Passport Made Easy!
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            No queues. No confusion. Just smooth processing.
          </p>
        </div>

        <div className="flex-grow flex items-center justify-center pb-10 mx-2 md:mx-5 lg:mx-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="w-full max-w-5xl"
          >
            <Card className="grid md:grid-cols-2 rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-br from-navy to-teal text-white p-8 rounded-3xl flex flex-col h-full min-h-[650px] relative overflow-hidden order-2 md:order-1">
                {/* Decorative circles */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full" />

                {/* TOP */}
                <div className="relative z-10">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold">Passport Made Easy</h2>

                    <p className="text-white/80 mt-2">
                      Expert guidance from application to approval.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    <Card className="bg-white/10 border-white/10 backdrop-blur">
                      <CardContent className="p-4 flex items-center gap-3">
                        <Users className="w-5 h-5 text-cyan-300" />
                        <div>
                          <p className="font-bold text-white">5000+</p>
                          <p className="text-xs text-white/70">Applications</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/10 border-white/10 backdrop-blur">
                      <CardContent className="p-4 flex items-center gap-3">
                        <Clock3 className="w-5 h-5 text-cyan-300" />
                        <div>
                          <p className="font-bold text-white">24x7</p>
                          <p className="text-xs text-white/70">Support</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    {[
                      {
                        icon: FileCheck,
                        text: "Easy Online Application",
                      },
                      {
                        icon: BadgeCheck,
                        text: "Expert Passport Assistance",
                      },
                      {
                        icon: SearchCheck,
                        text: "Track Status Anytime",
                      },
                      {
                        icon: ShieldCheck,
                        text: "Trusted & Secure Service",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-green-300" />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* IMAGE */}
                <div className="relative z-10 flex justify-center mt-5">
                  <Image
                    src="/offer_img/offer_img2.png"
                    alt="Passport Holder"
                    width={250}
                    height={300}
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>

                {/* Bottom Badge */}
                <div className="relative z-10">
                  <Card className="bg-white/10 border-white/10 backdrop-blur">
                    <CardContent className="p-3 md:p-3 md:px-8 flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-green-300" />
                      <span className="text-sm text-white">
                        Trusted Passport Consultancy Across India
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* RIGHT FORM */}
              <div className="p-8 bg-white space-y-5 order-1 md:order-2">
                {/* TITLE */}
                <div className="space-y-2">
                  <CardTitle className="text-lg lg:text-xl flex items-start gap-2 text-gray-900">
                    <div>
                      <Gift className="h-5 w-5 mt-1 text-teal" />
                    </div>
                    Choose Your Passport Plan
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    Select a service that suits your requirement
                  </p>
                </div>

                {/* SERVICES GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => {
                    const isSelected = selectedService === service.service_code;

                    return (
                      <div
                        key={service.id}
                        onClick={() => setSelectedService(service.service_code)}
                        className={`
                            relative cursor-pointer rounded-2xl border p-4 transition-all duration-200
                            ${
                              isSelected
                                ? "border-teal ring-2 ring-teal/20 shadow-md"
                                : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                            }
                          `}
                      >
                        {/* RADIO */}
                        <div className="flex justify-between mb-3">
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-base font-semibold text-gray-900 whitespace-nowrap">
                              ₹{service.service_total_amount}
                            </span>
                          </div>
                          <div
                            className={`
                              h-4 w-4 rounded-full border-2 flex items-center justify-center
                              ${isSelected ? "border-teal" : "border-gray-300"}
                            `}
                          >
                            {isSelected && (
                              <div className="h-2 w-2 bg-teal rounded-full"></div>
                            )}
                          </div>
                        </div>

                        {/* TITLE + PRICE */}

                        {/* SUB TEXT */}
                        <h3 className="text-sm font-medium text-gray-800 leading-snug pr-2">
                          {service.service_name}
                        </h3>
                        <p className="text-[10px] text-gray-500 mt-2">
                          {/* ₹{service.service_gov_amount} (Govt. Fees) + Charges ₹
                          {service.service_charges} (Service Charges + GST) */}
                          ₹{service.service_gov_amount} (Govt. Fees) + ₹
                          {service.service_charges + service.service_gst}{" "}
                          (Service Charges + GST)
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* DIVIDER */}
                <div className="border-t border-gray-200 pt-6 space-y-5">
                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{errorMessage}</p>
                    </div>
                  )}

                  {/* INPUTS */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-gray-700">Full Name</Label>
                      <Input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="mt-1 h-11 rounded-lg"
                      />
                    </div>

                    <div>
                      <Label className="text-sm text-gray-700">Email</Label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john.doe@example.com"
                        className="mt-1 h-11 rounded-lg"
                      />
                    </div>

                    <div>
                      <Label className="text-sm text-gray-700">Mobile</Label>
                      <Input
                        name="mobile"
                        value={formData.mobile}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^\d]/g, "");
                          e.target.value = value;
                          handleChange(e);
                        }}
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="Enter mobile number"
                        className="mt-1 h-11 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* BUTTON */}
                  <Button
                    onClick={handleSubmit}
                    disabled={!isValid || loading}
                    className="w-full h-12 bg-gradient-to-r from-navy to-teal text-white rounded-xl shadow-md hover:shadow-lg transition"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default CardOfferPage;
