"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Clock,
  FileText,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Globe,
  CheckCircle,
  Heart,
  Award,
  Star,
  Target,
  Users,
  Eye,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Image from "next/image";
import axiosServer from "@/lib/axiosServer";

export default function Home() {
  const [contactFirstName, setContactFirstName] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactSubmitStatus, setContactSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsContactSubmitting(true);
    setContactSubmitStatus("idle");

    const name = `${contactFirstName} ${contactLastName}`.trim();
    const subject = contactSubject || "General Inquiry";

    try {
      //  Get token (if logged in)
      const token = localStorage.getItem("authToken");

      const response = await axiosServer.post(
        "/public/support/tickets",
        {
          name,
          email: contactEmail,
          subject,
          message: contactMessage,
        },
        {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        },
      );

      const resData = response.data;

      //  SUCCESS
      setContactSubmitStatus("success");

      toast.success("Message Sent!", {
        description:
          resData?.message ||
          "We have received your message and will get back to you soon.",
      });

      //  Reset form
      setContactFirstName("");
      setContactLastName("");
      setContactEmail("");
      setContactSubject("");
      setContactMessage("");
    } catch (error: any) {
      console.error("API Error:", error);

      setContactSubmitStatus("error");

      let errorMessage = "Something went wrong. Please try again.";

      //  Laravel validation errors
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const firstError = Object.values(errors)[0];
        errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
      }

      //  Laravel custom message
      else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      //  Network / Axios error
      else if (error.message) {
        errorMessage = error.message;
      }

      //  ERROR TOAST (FIXED — no more success here)
      toast.error("Error", {
        description: errorMessage,
      });
    } finally {
      setIsContactSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <main className="flex-1">
        <section className="w-full py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-navy via-navy/90 to-navy/80 text-white relative overflow-hidden">
          <div className="blob-shape bg-teal/20 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] -left-32 sm:-left-48 md:-left-64 top-0"></div>
          <div className="blob-shape bg-gold/20 w-[400px] sm:w-[500px] md:w-[600px] h-[400px] sm:h-[500px] md:h-[600px] -right-48 sm:-right-64 md:-right-96 bottom-0 pulse-animation"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4 sm:space-y-6">
                <div className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs sm:text-sm backdrop-blur-sm">
                  <span className="text-gold">
                    Indian Passport Application Service
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                  Making Your{" "}
                  <span className="text-gold">Passport Services</span> Digitally
                  Seamless!
                </h1>
                <p className="max-w-[600px] text-sm sm:text-base md:text-lg lg:text-xl text-white/80">
                  Be it Tatkal or Normal Passport, our online secure platform is
                  all about fulfilling your passport pursuits with comprehensive
                  services.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/apply-passport" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto px-6 sm:px-8 bg-gradient-to-r from-gold to-gold/80 text-navy hover:opacity-90 rounded-full modern-button text-sm sm:text-base"
                    >
                      Apply for Passport
                    </Button>
                  </Link>
                  <Link href="/services" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-gold rounded-full modern-button text-sm sm:text-base"
                    >
                      Our Services
                    </Button>
                  </Link>
                </div>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-gold" />
                    <span className="text-xs sm:text-sm text-white/80">
                      Secure Process
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-gold" />
                    <span className="text-xs sm:text-sm text-white/80">
                      Tatkal Available
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-gold" />
                    <span className="text-xs sm:text-sm text-white/80">
                      24/7 Support
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center relative mt-8 lg:mt-0">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-gold/30 to-teal/30 blur-xl opacity-70"></div>
                <div className="relative float-animation w-full max-w-[500px] lg:max-w-none">
                  {/* 1200x1200 need this image size */}
                  <Image
                    src="/1.jpg"
                    alt="Indian Passport and travel documents"
                    className="rounded-3xl object-cover shadow-2xl border border-white/10 w-full"
                    width={600}
                    height={400}
                  />
                  <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-white rounded-2xl p-3 sm:p-4 shadow-xl float-animation-delay">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="rounded-full bg-teal/10 p-1.5 sm:p-2">
                        <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-teal" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-navy">
                          Global Access
                        </p>
                        <p className="text-[10px] sm:text-xs text-slate">
                          60+ countries visa-free
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="w-full py-12 sm:py-16 md:py-24 bg-white"
        >
          <div className="container px-4 md:px-6 relative">
            <div className="blob-shape bg-navy/10 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] right-0 top-0"></div>
            <div className="blob-shape bg-teal/10 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] left-0 bottom-0"></div>
            <div className="flex flex-col items-center justify-center space-y-4 text-center relative mb-12">
              <div className="inline-block rounded-full bg-navy/5 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm text-navy">
                <span>Our Services</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl gradient-heading">
                  Your Passport, Your Preference!
                </h2>
                <p className="max-w-[900px] text-sm sm:text-base md:text-lg text-muted-foreground">
                  Go for your suitable passport services. Take off with no
                  hassle!
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="group relative">
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-navy to-navy/50 opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
                <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white">
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-12 sm:h-14 w-12 sm:w-14 items-center justify-center rounded-full bg-navy/10 text-navy">
                      <FileText className="h-6 sm:h-7 w-6 sm:w-7" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl">
                      Normal Passport
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Standard Application
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm sm:text-base">
                      With regular processing time, a Normal Passport is the
                      best for those with a planned schedule.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-navy hover:bg-navy/80 rounded-xl modern-button group-hover:bg-gradient-to-r group-hover:from-navy group-hover:to-teal text-sm sm:text-base"
                      asChild
                    >
                      <Link href="/apply-passport">
                        Apply Normal
                        <ChevronRight className="ml-2 h-3 sm:h-4 w-3 sm:w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="group relative">
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-teal to-teal/50 opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
                <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white h-full">
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-12 sm:h-14 w-12 sm:w-14 items-center justify-center rounded-full bg-teal/10 text-teal">
                      <Clock className="h-6 sm:h-7 w-6 sm:w-7" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl">
                      Tatkal Passport
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Express Application
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm sm:text-base">
                      Need to travel abroad urgently? Well, a Tatkal Passport is
                      just what you need to fly quickly!
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-teal hover:bg-teal/80 rounded-xl modern-button group-hover:bg-gradient-to-r group-hover:from-teal group-hover:to-navy text-sm sm:text-base"
                      asChild
                    >
                      <Link href="/apply-passport">
                        Apply Tatkal
                        <ChevronRight className="ml-2 h-3 sm:h-4 w-3 sm:w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why PassportSuvidha Emerges as The Best? */}
        <section
          className="w-full py-12 sm:py-16 md:py-24 bg-gradient-to-br 
        from-navy/5 to-teal/5"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <div
                  className="absolute -inset-4 rounded-3xl bg-gradient-to-r 
                from-navy/20 via-teal/20 to-navy/20 blur-xl opacity-50"
                ></div>
                {/* 1200x1200 need this image size */}
                <Image
                  src="/2.jpg"
                  alt="Indian Passport and travel documents"
                  className="rounded-3xl object-cover shadow-2xl border border-white/10 w-full"
                  width={600}
                  height={400}
                />
              </div>
              <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                font-bold tracking-tighter"
                >
                  How <span className="text-teal">Passport Suvidha</span> Eases
                  Your Passport Journey?
                </h2>
                <p
                  className="text-sm sm:text-base md:text-lg 
                text-muted-foreground"
                >
                  When it comes to getting a passport, it's just so crucial to
                  get things right – from error-free application to timely
                  submission! With Passport Suvidha's experiential digital
                  services and assistance, our experts make sure you receive
                  high-standard and timely solutions – so that your passport
                  needs are well taken care of.
                </p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className="flex-shrink-0 h-12 sm:h-14 md:h-16 w-12 sm:w-14 
                  md:w-16 rounded-full bg-teal/10 flex items-center 
                  justify-center"
                  >
                    <Users
                      className="h-6 sm:h-7 md:h-8 w-6 sm:w-7 md:w-8 
                    text-teal"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-navy">
                      5k+ Satisfied Customers
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      We're growing big, day by day!
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mt-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div
                        className="h-10 w-10 rounded-full bg-navy/10 flex 
                      items-center justify-center"
                      >
                        <Eye className="h-5 w-5 text-navy" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy">Vision</h4>
                      <p className="text-muted-foreground">
                        Become the go-to name for trusted passport services.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div
                        className="h-10 w-10 rounded-full bg-teal/10 flex 
                      items-center justify-center"
                      >
                        <Target className="h-5 w-5 text-teal" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy">Mission</h4>
                      <p className="text-muted-foreground">
                        Make passport services accessible to every individual
                        seeking.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div
                        className="h-10 w-10 rounded-full bg-gold/10 flex 
                      items-center justify-center"
                      >
                        <Award className="h-5 w-5 text-gold" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy">Values</h4>
                      <p className="text-muted-foreground">
                        Uncompromising Service Quality & Customer-First
                        Approach.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="w-full py-20 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-[100vw]">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col items-center justify-center space-y-4 text-center relative mb-12">
                  <div className="inline-block rounded-full bg-navy/5 px-4 py-1.5 text-sm text-navy">
                    <span>Why Choose Us</span>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl gradient-heading">
                      Our Achievements
                    </h2>
                    <p className="mt-4 text-muted-foreground md:text-xl">
                      We take pride in our track record of excellence and
                      customer satisfaction.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <Tabs defaultValue="stats" className="max-w-5xl mx-auto">
              <TabsList className="grid w-full h-full grid-row-1 md:grid-cols-3 gap-2 mb-8">
                <TabsTrigger
                  value="stats"
                  className="flex items-center justify-center text-sm md:text-base font-medium px-3 py-2.5 rounded-xl transition-colors hover:text-navy focus:text-navy w-full"
                >
                  <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">By The Numbers</span>
                </TabsTrigger>
                <TabsTrigger
                  value="awards"
                  className="flex items-center justify-center text-sm md:text-base font-medium px-3 py-2.5 rounded-xl transition-colors hover:text-navy focus:text-navy w-full"
                >
                  <Award className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">Awards & Recognition</span>
                </TabsTrigger>
                <TabsTrigger
                  value="testimonials"
                  className="flex items-center justify-center text-sm md:text-base font-medium px-3 py-2.5 rounded-xl transition-colors hover:text-navy focus:text-navy w-full"
                >
                  <Star className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">Client Testimonials</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stats">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    {
                      number: "1.2K+",
                      label: "Passports Processed",
                      icon: <FileText className="h-6 w-6 text-navy" />,
                      color: "navy",
                    },
                    {
                      number: "98%",
                      label: "Customer Satisfaction",
                      icon: <Star className="h-6 w-6 text-teal" />,
                      color: "teal",
                    },
                    {
                      number: "12+",
                      label: "Months of Experience",
                      icon: <Clock className="h-6 w-6 text-burgundy" />,
                      color: "burgundy",
                    },
                    {
                      number: "24/7",
                      label: "Service Availability",
                      icon: <CheckCircle className="h-6 w-6 text-navy" />,
                      color: "navy",
                    },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <Card className="text-center p-6 rounded-3xl border-0 shadow-lg h-full">
                        <div
                          className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-${stat.color}/10`}
                        >
                          {stat.icon}
                        </div>
                        <motion.div
                          initial={{ scale: 0.9 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 10,
                            delay: 0.2 + 0.1 * index,
                          }}
                        >
                          <h3 className="text-3xl font-bold text-navy mb-2">
                            {stat.number}
                          </h3>
                        </motion.div>
                        <p className="text-muted-foreground">{stat.label}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="awards">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      title: "Excellence in Customer Service",
                      organization: "National Passport Association",
                      year: "2023",
                      description:
                        "Recognized for outstanding customer service and satisfaction rates above industry average.",
                    },
                    {
                      title: "Best Passport Service Provider",
                      organization: "Travel Industry Awards",
                      year: "2022",
                      description:
                        "Voted as the top passport service provider by travel industry professionals.",
                    },
                    {
                      title: "Innovation in Government Services",
                      organization: "Public Service Excellence Awards",
                      year: "2021",
                      description:
                        "Honored for our innovative approach to streamlining government documentation processes.",
                    },
                    {
                      title: "Trusted Partner Award",
                      organization: "International Travel Association",
                      year: "2020",
                      description:
                        "Recognized for reliability and excellence in passport processing services.",
                    },
                  ].map((award, index) => (
                    <motion.div
                      key={award.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <Card className="rounded-3xl border-0 shadow-lg overflow-hidden h-full">
                        <div className="h-2 w-full bg-gradient-to-r from-gold to-gold/70"></div>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl">
                                {award.title}
                              </CardTitle>
                              <CardDescription>
                                {award.organization}
                              </CardDescription>
                            </div>
                            <div className="bg-gold/10 text-navy text-sm font-medium px-3 py-1 rounded-full">
                              {award.year}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">
                            {award.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="testimonials">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      quote:
                        "PassportSuvidha made getting my first passport incredibly easy. Their step-by-step guidance saved me hours of research and stress.",
                      author: "Emily R.",
                      location: "Chicago, IL",
                      rating: 5,
                    },
                    {
                      quote:
                        "When I needed an expedited passport for an unexpected business trip, PassportSuvidha delivered in just 3 days. Absolutely worth every penny!",
                      author: "Marcus T.",
                      location: "Atlanta, GA",
                      rating: 5,
                    },
                    {
                      quote:
                        "The customer service team went above and beyond to help with my complicated name change situation. I couldn't be more grateful.",
                      author: "Sophia L.",
                      location: "San Francisco, CA",
                      rating: 5,
                    },
                    {
                      quote:
                        "As someone who travels frequently for work, I appreciate the efficiency and reliability of PassportSuvidha. They've handled my renewals for years.",
                      author: "James K.",
                      location: "Boston, MA",
                      rating: 5,
                    },
                  ].map((testimonial, index) => (
                    <motion.div
                      key={testimonial.author}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <Card className="rounded-3xl border-0 shadow-lg overflow-hidden h-full">
                        <div className="h-2 w-full bg-gradient-to-r from-teal to-navy"></div>
                        <CardHeader>
                          <div className="flex gap-1 mb-2">
                            {Array(testimonial.rating)
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
                          <p className="italic text-muted-foreground">
                            "{testimonial.quote}"
                          </p>
                          <div>
                            <p className="font-medium">{testimonial.author}</p>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.location}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Locations Section */}
        <section className="w-full py-20 md:py-24 bg-gradient-to-br from-navy/5 to-teal/5 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 max-w-[100vw] relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-full bg-navy/5 px-4 py-1.5 text-sm text-navy">
                <span>Find Us</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl gradient-heading">
                  Passport Office Locations
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find your nearest passport office or acceptance facility
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-navy/20 via-teal/20 to-navy/20 blur-xl opacity-50"></div>
              <Card className="rounded-3xl border-0 shadow-xl overflow-hidden relative">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-1 p-8 space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-navy">
                          Find Nearby Locations
                        </h3>
                        <p className="text-muted-foreground">
                          Enter your city name to find passport offices and
                          acceptance facilities near you.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                          <Input
                            id="cityInput"
                            className="modern-input w-full h-12 text-lg px-4 font-medium text-navy placeholder:text-navy/40 rounded-xl"
                            type="text"
                            placeholder="Enter city name (e.g. Mumbai)"
                            aria-label="City name input"
                          />
                        </div>
                        <Button
                          className="bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button h-12 px-6 flex items-center gap-2 text-base font-medium"
                          aria-label="Search locations"
                        >
                          <MapPin className="h-5 w-5" />
                          Search Locations
                        </Button>
                      </div>
                      <div className="space-y-4" id="locationsList">
                        <div className="rounded-xl border p-4 transition-all hover:border-navy hover:shadow-md bg-white cursor-pointer">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-navy">
                                Regional Passport Office
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                123 Nehru Road, Mumbai, Maharashtra 400001
                              </p>
                              <p className="text-sm text-muted-foreground">
                                3.7 km away
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-1 border-navy text-navy hover:bg-navy hover:text-white rounded-full"
                            >
                              <MapPin className="h-4 w-4" />
                              Directions
                            </Button>
                          </div>
                        </div>
                        <div className="rounded-xl border p-4 transition-all hover:border-navy hover:shadow-md bg-white cursor-pointer">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-navy">
                                Passport Seva Kendra
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                456 MG Road, Andheri East, Mumbai 400069
                              </p>
                              <p className="text-sm text-muted-foreground">
                                5.2 km away
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-1 border-navy text-navy hover:bg-navy hover:text-white rounded-full"
                            >
                              <MapPin className="h-4 w-4" />
                              Directions
                            </Button>
                          </div>
                        </div>
                        <div className="rounded-xl border p-4 transition-all hover:border-navy hover:shadow-md bg-white cursor-pointer">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-navy">
                                Post Office Passport Seva Kendra
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                789 SV Road, Borivali West, Mumbai 400092
                              </p>
                              <p className="text-sm text-muted-foreground">
                                8.3 km away
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-1 border-navy text-navy hover:bg-navy hover:text-white rounded-full"
                            >
                              <MapPin className="h-4 w-4" />
                              Directions
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 relative min-h-[400px] md:min-h-full">
                      <iframe
                        id="locationMap"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995644531!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1628599512345!5m2!1sen!2sin"
                        className="absolute inset-0 w-full h-full border-0 rounded-xl"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      ></iframe>
                      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1 border-navy text-navy hover:bg-navy hover:text-white rounded-full"
                        >
                          <MapPin className="h-4 w-4" />
                          Find My Location
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* <PassportLocator /> */}

        {/* FAQ Section */}
        <section className="w-full py-20 md:py-24 bg-white">
          <div className="container px-4 md:px-6 relative">
            <div className="blob-shape bg-navy/10 w-[300px] h-[300px] right-0 top-0"></div>
            <div className="blob-shape bg-teal/10 w-[400px] h-[400px] left-0 bottom-0"></div>
            <div className="flex flex-col items-center justify-center space-y-4 text-center relative  mb-12">
              <div className="inline-block rounded-full bg-navy/5 px-4 py-1.5 text-sm text-navy">
                <span>Common Questions</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl gradient-heading">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about passport applications
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-6">
              <Card className="rounded-xl border-0 shadow-lg overflow-hidden">
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem
                      value="item-1"
                      className="border-b border-border"
                    >
                      <AccordionTrigger className="text-base font-medium py-4">
                        How long does it take to get a passport?
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pt-1 text-muted-foreground">
                        <p>
                          Standard processing takes approximately 8-11 weeks
                          from the time of application. Expedited service (for
                          an additional fee) takes approximately 5-7 weeks. For
                          urgent travel within 14 days, you can make an
                          appointment at a passport agency for faster
                          processing.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="item-2"
                      className="border-b border-border"
                    >
                      <AccordionTrigger className="text-base font-medium py-4">
                        How long is my passport valid?
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pt-1 text-muted-foreground">
                        <p>
                          For adults (16 and older), passports are valid for 10
                          years from the date of issue. For children under 16,
                          passports are valid for 5 years from the date of
                          issue.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="item-3"
                      className="border-b border-border"
                    >
                      <AccordionTrigger className="text-base font-medium py-4">
                        Can I renew my passport online?
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pt-1 text-muted-foreground">
                        <p>
                          Yes, you can renew your passport online if you meet
                          certain eligibility requirements. Your most recent
                          passport must be in your possession, undamaged, issued
                          when you were 16 or older, issued within the last 15
                          years, and issued in your current name (or you can
                          document your name change).
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="item-4"
                      className="border-b border-border"
                    >
                      <AccordionTrigger className="text-base font-medium py-4">
                        What if I need a passport urgently?
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pt-1 text-muted-foreground">
                        <p>
                          For urgent travel within 14 days, you can make an
                          appointment at a passport agency for expedited
                          processing. You'll need to provide proof of immediate
                          international travel, such as a flight itinerary. In
                          life-or-death emergencies involving immediate family
                          members, special appointments are available.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-base font-medium py-4">
                        Do children need passports?
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pt-1 text-muted-foreground">
                        <p>
                          Yes, all U.S. citizens, including infants and
                          children, need their own passport to travel
                          internationally by air. Children under 16 must apply
                          in person with both parents or legal guardians
                          present, or provide additional documentation if one
                          parent cannot be present.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              <div className="flex justify-center mt-8">
                <Button
                  className="bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button"
                  asChild
                >
                  <Link href="/faq">View All FAQs</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="w-full py-20 md:py-24 bg-gradient-to-br from-navy/5 to-teal/5 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 max-w-[100vw] relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-full bg-navy/5 px-4 py-1.5 text-sm text-navy">
                <span>Get In Touch</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl gradient-heading">
                  Contact Us
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get in touch with our support team for assistance
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 mt-16">
              <div className="floating-card">
                <Card className="rounded-2xl border-0 shadow-lg overflow-hidden">
                  <div className="h-2 w-full bg-gradient-to-r from-navy to-teal"></div>
                  <CardHeader>
                    <CardTitle className="text-navy">
                      Send Us a Message
                    </CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon
                      as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6" onSubmit={handleContactSubmit}>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label
                            htmlFor="first-name-contact-home"
                            className="text-sm font-medium"
                          >
                            First Name
                          </label>
                          <Input
                            id="first-name-contact-home"
                            placeholder="Enter your first name"
                            className="modern-input"
                            value={contactFirstName}
                            onChange={(e) =>
                              setContactFirstName(e.target.value)
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="last-name-contact-home"
                            className="text-sm font-medium"
                          >
                            Last Name
                          </label>
                          <Input
                            id="last-name-contact-home"
                            placeholder="Enter your last name"
                            className="modern-input"
                            value={contactLastName}
                            onChange={(e) => setContactLastName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email-contact-home"
                          className="text-sm font-medium"
                        >
                          Email
                        </label>
                        <Input
                          id="email-contact-home"
                          type="email"
                          placeholder="Enter your email"
                          className="modern-input"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="subject-home"
                          className="text-sm font-medium"
                        >
                          Subject
                        </label>
                        <Input
                          id="subject-home"
                          placeholder="Enter subject"
                          className="modern-input"
                          value={contactSubject}
                          onChange={(e) => setContactSubject(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message-home"
                          className="text-sm font-medium"
                        >
                          Message
                        </label>
                        <Textarea
                          id="message-home"
                          placeholder="Enter your message"
                          className="min-h-[178px] modern-input"
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button h-12 text-base"
                        disabled={isContactSubmitting}
                      >
                        {isContactSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                      {contactSubmitStatus === "error" && (
                        <p className="text-red-600 text-sm text-center">
                          Failed to send message. Please try again.
                        </p>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <div className="floating-card">
                  <Card className="rounded-2xl border-0 shadow-lg overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-teal to-navy"></div>
                    <CardHeader>
                      <CardTitle className="text-teal">
                        Contact Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-teal/10 text-teal">
                          <Phone className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-medium text-teal">
                            Phone Support
                          </h4>
                          <p className="text-muted-foreground">7486046591</p>
                          <p className="text-sm text-muted-foreground">
                            Monday-Saturday, 10am-5pm IST
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-teal/10 text-teal">
                          <Mail className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-medium text-teal">
                            Email Support
                          </h4>
                          <p className="text-muted-foreground">
                            support@passportsuvidha.com
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Responses within 24-48 hours
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-teal/10 text-teal">
                          <MapPin className="h-6 w-6" />
                        </div>
                        <div className="flex items-start gap-4">
                          <div>
                            <h4 className="font-medium text-teal">
                              Main Office
                            </h4>
                            <p className="text-muted-foreground">
                              Second Floor, Shop No. 227,
                            </p>
                            <p className="text-muted-foreground">
                              Unique Square,
                            </p>
                            <p className="text-muted-foreground">
                              Opposite Shubham K Mart,
                            </p>
                            <p className="text-muted-foreground">
                              Singanpore Road, Singanpore,
                            </p>
                            <p className="text-muted-foreground">
                              Surat, Gujarat - 395004
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="floating-card">
                  <Card className="rounded-2xl border-0 shadow-lg overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-gold to-gold/70"></div>
                    <CardHeader>
                      <CardTitle className="text-navy">
                        Hours of Operation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between p-3 rounded-xl bg-gold/5">
                          <span className="font-medium">Monday - Saturday</span>
                          <span>10:00 AM to 05:00 PM</span>
                        </div>
                        {/* <div className="flex justify-between p-3 rounded-xl bg-gold/5">
                          <span className="font-medium">Saturday</span>
                          <span>9:00 AM - 1:00 PM</span>
                        </div> */}
                        <div className="flex justify-between p-3 rounded-xl bg-gold/5">
                          <span className="font-medium">Sunday</span>
                          <span>Closed</span>
                        </div>
                        <div className="pt-3 text-sm text-muted-foreground">
                          <p>
                            Hours may vary by location. Please check with your
                            local office before visiting.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
