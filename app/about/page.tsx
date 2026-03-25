"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  FileText,
  Users,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  Shield,
  CheckCircle,
  Building,
  History,
  Target,
  Heart,
  Lightbulb,
} from "lucide-react";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <main className="flex-1">
        <section className="w-full py-12 sm:py-16 md:py-24 bg-gradient-to-b from-navy via-navy/90 to-navy/80 text-white relative overflow-hidden">
          <div className="blob-shape bg-teal/20 w-[500px] h-[500px] -left-64 top-0"></div>
          <div className="blob-shape bg-gold/20 w-[600px] h-[600px] -right-96 bottom-0 pulse-animation"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur-sm border border-white/20">
                  <span className="text-gold font-medium">
                    2+ Years of Offering Professional Passport Services
                  </span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  We Excel In Digital{" "}
                  <span className="text-gold">Passport Services</span> for{" "}
                  <span className="text-gold">India</span>
                </h1>
                <p className="max-w-[600px] text-white/90 md:text-lg leading-relaxed">
                Passport Suvidha tops the chart by providing every Indian with a digitally equipped platform to relish a top-notch, transparent and timely passport application process – at the comfort of home!
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <Button
                    size="lg"
                    className="px-6 bg-gradient-to-r from-gold via-gold/90 to-gold/80 text-navy hover:opacity-90 rounded-full shadow-lg shadow-gold/20 transition-all duration-300"
                    asChild
                  >
                    <Link href="/apply-passport">Apply for Tatkal</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-gold rounded-full transition-all duration-300"
                    asChild
                  >
                    <Link href="/apply-passport">Apply for Normal</Link>
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-gold/20 p-1">
                      <Clock className="h-4 w-4 text-gold" />
                    </div>
                    <span className="text-sm text-white/90">
                    Quick Processing
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-gold/20 p-1">
                      <Shield className="h-4 w-4 text-gold" />
                    </div>
                    <span className="text-sm text-white/90">
                    100% Safe & Secure
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-gold/20 p-1">
                      <Star className="h-4 w-4 text-gold" />
                    </div>
                    <span className="text-sm text-white/90">Expert Assistance</span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="flex justify-center relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-gold/30 via-teal/30 to-gold/30 blur-xl opacity-70"></div>
                <div className="relative float-animation">
                  {/* Image size 1400x800px */}
                  <Image
                    src="/3-1.jpg"
                    alt="Modern Passport Office"
                    className="rounded-2xl md:rounded-3xl object-cover shadow-2xl border border-white/10 w-full"
                    width={1400}
                    height={800}
                  />
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-3 shadow-xl float-animation-delay">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-gradient-to-r from-teal to-teal/80 p-1.5">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-navy">
                          Trusted Service
                        </p>
                        <p className="text-xs text-navy">
                          2000+ Passports Processed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 sm:py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block rounded-full bg-navy/5 px-4 py-1.5 text-sm text-navy mb-4">
                  <span>Our Story</span>
                </div>
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl gradient-heading">
                We Go Beyond Ordinary, Always!
                </h2>
                <p className="mt-4 text-muted-foreground md:text-xl">
                Defining unparalleled digital passport services with commitment and dedication, Passport Suvidha is remarkably becoming the first choice for efficient passport application.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-navy to-navy/50 opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
                <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white h-full">
                  <div className="h-2 w-full bg-navy rounded-t-3xl"></div>
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-navy/10 text-navy">
                      <Award className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl">Our Forte</CardTitle>
                    <CardDescription>Established in 1998</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>
                    Making the passport application process really simple, easy and accessible – is what we have excelled with Passport Suvidha. Over time, backed by our team of experts' customer-oriented approach, we have been able to successfully help out our customers in fulfilling their passport needs with a process that's just too easy and convenient.
                    </p>                    
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-teal to-teal/50 opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
                <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white h-full">
                  <div className="h-2 w-full bg-teal rounded-t-3xl"></div>
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-teal">
                      <Lightbulb className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl">Our Vision</CardTitle>
                    <CardDescription>
                      Simplifying passport services
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>
                    We envision every Indian making the most of our digital services for their passport pursuits so that any confusion or apprehension could be avoided, making way for our customers towards a smooth passport journey!
                    </p>                    
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-gold to-gold/50 opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
                <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white h-full">
                  <div className="h-2 w-full bg-gold rounded-t-3xl"></div>
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-navy">
                      <Heart className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl">Our Values</CardTitle>
                    <CardDescription>What drives our service</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>
                    While making the passport application process simple, we always ensure that transparency stays intact in terms of our services, application processes, and our service prices. We believe in being a part of the customer's happiness by fulfilling their global experiences through our passport services.
                    </p>                    
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* <section className="w-full py-20 md:py-24 bg-gradient-to-br from-navy/5 to-teal/5 relative overflow-hidden">      
          <div className="container px-4 md:px-6 relative">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block rounded-full bg-navy/5 px-4 py-1.5 text-sm text-navy mb-4">
                  <span>Our Team</span>
                </div>
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl gradient-heading">Meet The Experts</h2>
                <p className="mt-4 text-muted-foreground md:text-xl">
                  Our team of passport specialists brings decades of combined experience to serve you better.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Chief Executive Officer",
                  bio: "Former State Department official with 15+ years of experience in passport services.",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Michael Chen",
                  role: "Operations Director",
                  bio: "Streamlined our application process to reduce processing times by 40%.",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Aisha Patel",
                  role: "Customer Service Lead",
                  bio: "Passionate about creating exceptional experiences for every applicant.",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Robert Garcia",
                  role: "Passport Specialist",
                  bio: "Expert in complex cases with 10+ years at the Passport Agency.",
                  image: "/placeholder.svg?height=300&width=300",
                },
              ].map((member, index) => (
                <motion.div
                  key={member.name}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-navy to-teal opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
                  <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-navy to-teal"></div>
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <CardDescription>{member.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}

        <section className="w-full py-20 md:py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-[100vw]">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block rounded-full bg-navy/5 px-4 py-1.5 text-sm text-navy mb-4">
                  <span>Why Choose Us</span>
                </div>
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl gradient-heading">
                  Our Achievements
                </h2>
                <p className="mt-4 text-muted-foreground md:text-xl">
                  We take pride in our track record of excellence and customer
                  satisfaction.
                </p>
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

        <section className="w-full py-20 md:py-20 bg-gradient-to-br from-navy/5 to-teal/5 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-navy/20 via-teal/20 to-navy/20 blur-xl opacity-50"></div>
                <Card className="rounded-3xl border-0 shadow-xl overflow-hidden relative">
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl flex items-center justify-center gap-2">
                      <Building className="h-5 w-5 text-navy" />
                      Our Commitment to You
                    </CardTitle>
                    <CardDescription>
                      At PassportSuvidha, we promise to deliver:
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          title: "Accuracy & Compliance",
                          description:
                            "Every application we process meets all government requirements and standards.",
                          icon: <CheckCircle className="h-5 w-5 text-teal" />,
                        },
                        {
                          title: "Transparent Pricing",
                          description:
                            "No hidden fees or surprise charges—just clear, upfront pricing for our services.",
                          icon: <Shield className="h-5 w-5 text-navy" />,
                        },
                        {
                          title: "Timely Processing",
                          description:
                            "We meet or exceed our promised processing times for every application type.",
                          icon: <Clock className="h-5 w-5 text-burgundy" />,
                        },
                        {
                          title: "Expert Support",
                          description:
                            "Our knowledgeable team is always available to answer questions and provide guidance.",
                          icon: <Users className="h-5 w-5 text-navy" />,
                        },
                      ].map((commitment, index) => (
                        <motion.div
                          key={commitment.title}
                          initial={{
                            opacity: 0,
                            x: index % 2 === 0 ? -20 : 20,
                          }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.1 * index }}
                          className="flex gap-4 p-4 rounded-xl bg-white shadow-sm"
                        >
                          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy/10">
                            {commitment.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-navy">
                              {commitment.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {commitment.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex justify-center mt-6">
                      <Button
                        className="bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button"
                        asChild
                      >
                        <Link href="/apply-passport">
                          Start Your Application Today
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block rounded-full bg-navy/5 px-4 py-1.5 text-sm text-navy mb-4">
                  <span>Get In Touch</span>
                </div>
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl gradient-heading">
                  Contact Our Team
                </h2>
                <p className="mt-4 text-muted-foreground md:text-xl">
                  Have questions about our services? Our team is here to help.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-navy to-navy/50 opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
                <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white h-full">
                  <div className="h-2 w-full bg-navy rounded-t-3xl"></div>
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-navy/10 text-navy">
                      <Phone className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl">Call Us</CardTitle>
                    <CardDescription>
                      Speak with a passport specialist
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="font-medium">7486046591</p>
                    <p className="text-sm text-muted-foreground">
                      Monday-Friday, 8am-8pm EST
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Saturday, 9am-5pm EST
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-teal to-teal/50 opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
                <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white h-full">
                  <div className="h-2 w-full bg-teal rounded-t-3xl"></div>
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-teal">
                      <Mail className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl">Email Us</CardTitle>
                    <CardDescription>Send us your questions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="font-medium">support@PassportSuvidha.gov</p>
                    <p className="text-sm text-muted-foreground">
                      For general inquiries
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Response within 24 hours
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-gold to-gold/50 opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
                <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white h-full">
                  <div className="h-2 w-full bg-gold rounded-t-3xl"></div>
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-navy">
                      <Globe className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl">
                      Hours of Operation
                    </CardTitle>
                    <CardDescription>When you can reach us</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium">Monday - Friday</p>
                      <p className="text-sm text-muted-foreground">
                        8:00 AM - 5:00 PM
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-medium">Saturday</p>
                      <p className="text-sm text-muted-foreground">
                        9:00 AM - 1:00 PM
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-medium">Sunday</p>
                      <p className="text-sm text-muted-foreground">Closed</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
