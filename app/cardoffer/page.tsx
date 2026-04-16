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

<Head>
  <script src="https://sdk.cashfree.com/js/v3/cashfree.js"></script>
</Head>;

const CardOfferPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
  });

  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValid =
    formData.fullName && formData.email && formData.mobile.length === 10;

  const checkPaymentStatus = async (order_id: string) => {
    let attempts = 0;

    const interval = setInterval(async () => {
      attempts++;

      try {
        const res = await axiosServer.get(
          `/check-payment-status?order_id=${order_id}`,
        );

        if (res.data.status === "SUCCESS") {
          clearInterval(interval);

          window.location.href = "/cardoffer-response?status=success";
        }

        if (res.data.status === "FAILED") {
          clearInterval(interval);
          window.location.href = "/cardoffer-response?status=failed";
        }
      } catch (err) {
        console.error(err);
      }

      if (attempts > 10) {
        clearInterval(interval);
        window.location.href = "/cardoffer-response?status=failed";
      }
    }, 3000); 
  };

  const handleSubmit = async () => {
    if (!isValid) return;

    setLoading(true);

    try {
      const { data } = await axiosServer.post("/createOffer-order", {
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
      });

      if (!data.success) {
        alert(data.message);
        return;
      }

      if (!(window as any).Cashfree) {
        alert("Payment SDK not loaded");
        return;
      }

      const cashfree = (window as any).Cashfree({
        mode: "sandbox",
      });

      cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_modal",
      });

      checkPaymentStatus(data.order_id);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white" />

        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-white to-white" />

        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-100 opacity-30 rounded-full blur-3xl" />
        <div className="absolute top-[30%] right-0 w-[500px] h-[500px] bg-teal-100 opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-[30%] w-[400px] h-[400px] bg-blue-50 opacity-30 rounded-full blur-2xl" />
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "glass-nav-scrolled backdrop-blur-md bg-navy/80"
            : "glass-nav",
        )}
      >
        <div className="container flex h-16 sm:h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 transition-opacity hover:opacity-90"
            aria-label="Passport Suvidha Home"
          >
            <div className="relative">
              <Image
                src="/logo/ps-logo-1.png"
                alt="Passport Suvidha"
                width={180}
                height={40}
                priority
                className="h-12 w-auto sm:h-10 md:h-16"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-6 lg:gap-8"
            role="navigation"
            aria-label="Main navigation"
          >
            <div
              className="relative"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Menu className="h-6 w-6 cursor-pointer text-white" />

              {showTooltip && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-lg p-4 text-sm w-72 text-black space-y-3">
                  {/* PHONE */}
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-teal flex-shrink-0" />
                    <span className="whitespace-nowrap">+91 7486046591</span>
                  </div>

                  {/* EMAIL */}
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-teal flex-shrink-0" />
                    <span className="break-all">
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
                className="md:hidden ml-auto bg-transparent hover:bg-transparent"
              >
                <Menu className="h-6 w-6 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full bg-navy/95 backdrop-blur-lg border-none p-6"
            >
              <div className="mt-16 flex flex-col items-center text-center gap-8">
                {/* HEADING */}
                <h2 className="text-white text-xl font-semibold">Contact Us</h2>

                {/* CONTACT CARD */}
                <div className="bg-white text-black rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-4">
                  <div className="flex items-center gap-3 justify-center">
                    <Phone className="h-5 w-5 text-teal" />
                    <span className="font-medium">+91 7486046591</span>
                  </div>

                  <div className="flex items-center gap-3 justify-center">
                    <Mail className="h-5 w-5 text-teal" />
                    <span className="break-all">
                      support@passportsuvidha.com
                    </span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="max-w-4xl mx-auto text-center mt-10 px-4">
        <p className="mt-4 text-lg text-gray-600">
          Quickly Process Your Passport Application!
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Apply for Your Passport Easily & Get Fast Approval Assistance
        </h1>
      </div>

      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="w-full max-w-5xl"
        >
          <Card className="grid md:grid-cols-2 rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-br from-navy to-teal text-white p-8 flex flex-col justify-between h-full min-h-[520px] rounded-3xl">
              {/* TOP */}
              <div className="space-y-6">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Gift className="h-5 w-5 text-navy" />
                    Why Choose Passport Suvidha?
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-5 p-0">
                  <ul className="space-y-4 text-sm">
                    {[
                      "Apply for passport from the comfort of your home",
                      "Expert assistance throughout the entire process",
                      "Fast & hassle-free documentation support",
                      "Track your application anytime, anywhere",
                      "Our team handles verification & processing support",
                      "Dedicated on-call support for all your queries",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-300 mt-1" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>

              <CardFooter className="p-0 mt-6">
                {/* BOTTOM BADGE */}
                <div className="mt-8">
                  <div className="flex items-center gap-3 text-sm bg-white/10 px-4 py-3 rounded-xl w-fit backdrop-blur">
                    <Shield className="h-5 w-5 text-green-300" />
                    <span>100% Secure & Trusted</span>
                  </div>
                </div>
              </CardFooter>
            </div>

            {/* RIGHT FORM */}
            <div className="p-8 bg-white">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Gift className="h-5 w-5 text-navy" />
                  Unlock Your Offer
                </CardTitle>
                <CardDescription>Fill your details to proceed</CardDescription>
              </CardHeader>

              <CardContent className="space-y-5 p-0">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Mobile</Label>
                  <Input
                    name="mobile"
                    value={formData.mobile}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, "");
                      e.target.value = value;
                      handleChange(e);
                    }}
                    maxLength={10}
                    placeholder="Enter mobile number"
                  />
                </div>
              </CardContent>

              <CardFooter className="p-0 mt-6">
                <Button
                  onClick={handleSubmit}
                  disabled={!isValid || loading}
                  className="w-full bg-gradient-to-r from-navy to-teal text-white rounded-xl"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Get Instant Offer
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </div>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default CardOfferPage;
