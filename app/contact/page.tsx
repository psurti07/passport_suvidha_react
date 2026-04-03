"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

export default function Contact() {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true); // ✅ default checked
  const [marketingConsent, setMarketingConsent] = useState(true); // optional
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const name = `${firstName} ${lastName}`;
    const subject = inquiryType ? `Inquiry: ${inquiryType}` : "General Inquiry";

    try {
      const response = await fetch("/api/support/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setSubmitStatus("success");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setInquiryType("");
      setMessage("");
      // console.log("Attempting to show success toast...");
      toast({
        title: "Message Sent!",
        description:
          "We have received your message and will get back to you soon.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-heading mb-4">
                Contact Us
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Get in touch with our support team for assistance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="space-y-8">
                <div className="floating-card">
                  <Card className="rounded-2xl border-0 shadow-lg overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-navy to-teal"></div>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-navy" />
                        Send Us a Message
                      </CardTitle>
                      <CardDescription>
                        Fill out the form and we'll get back to you as soon as
                        possible
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          <div className="space-y-2">
                            <label
                              htmlFor="first-name-contact"
                              className="text-sm font-medium"
                            >
                              First Name
                            </label>
                            <Input
                              id="first-name-contact"
                              placeholder="Enter your first name"
                              className="modern-input"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="last-name-contact"
                              className="text-sm font-medium"
                            >
                              Last Name
                            </label>
                            <Input
                              id="last-name-contact"
                              placeholder="Enter your last name"
                              className="modern-input"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email-contact"
                            className="text-sm font-medium"
                          >
                            Email
                          </label>
                          <Input
                            id="email-contact"
                            type="email"
                            placeholder="Enter your email"
                            className="modern-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="phone-contact"
                            className="text-sm font-medium"
                          >
                            Phone Number (Optional)
                          </label>
                          <Input
                            id="phone-contact"
                            placeholder="Enter your phone number"
                            className="modern-input"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="inquiry-type"
                            className="text-sm font-medium"
                          >
                            Inquiry Type
                          </label>
                          <Select
                            value={inquiryType}
                            onValueChange={setInquiryType}
                          >
                            <SelectTrigger className="modern-input">
                              <SelectValue placeholder="Select inquiry type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="application">
                                Application Help
                              </SelectItem>
                              <SelectItem value="status">
                                Application Status
                              </SelectItem>
                              <SelectItem value="requirements">
                                Document Requirements
                              </SelectItem>
                              <SelectItem value="fees">
                                Fees & Payment
                              </SelectItem>
                              <SelectItem value="locations">
                                Office Locations
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="message"
                            className="text-sm font-medium"
                          >
                            Message
                          </label>
                          <Textarea
                            id="message"
                            placeholder="Enter your message"
                            className="min-h-[120px] modern-input"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                          />
                        </div>
                        <motion.div
                          // variants={itemVariants}
                          className="space-y-4"
                        >
                          {/* Terms & Privacy */}
                          <div className="flex items-start gap-2">
                            <input
                              type="checkbox"
                              id="terms"
                              name="terms"
                              checked={termsAccepted}
                              onChange={(e) =>
                                setTermsAccepted(e.target.checked)
                              }
                              required
                              className="mt-1"
                            />
                            <Label
                              htmlFor="terms"
                              className="text-xs leading-5"
                            >
                              By submitting the form, you agree to the{" "}
                              <a
                                href="/terms"
                                className="text-muted-foreground"
                              >
                                Terms of Use
                              </a>{" "}
                              and{" "}
                              <a
                                href="/privacy-policy"
                                className="text-muted-foreground"
                              >
                                Privacy Policy
                              </a>{" "}
                              of PassportSuvidha.
                            </Label>
                          </div>

                          {/* Marketing Consent */}
                          <div className="flex items-start gap-2">
                            <input
                              type="checkbox"
                              id="marketing"
                              checked={marketingConsent}
                              onChange={(e) =>
                                setMarketingConsent(e.target.checked)
                              }
                              name="marketing"
                              className="mt-1"
                            />
                            <Label
                              htmlFor="marketing"
                              className="text-xs leading-5"
                            >
                              I agree to receive promotional & informational
                              communications from PassportSuvidha through
                              Emails, calls or SMS, RCS Services.
                            </Label>
                          </div>
                        </motion.div>
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button h-12 text-base"
                          disabled={ !termsAccepted || !marketingConsent ||isSubmitting}
                        >
                          {isSubmitting ? (
                            "Sending..."
                          ) : (
                            <>
                              {" "}
                              <Send className="mr-2 h-4 w-4" /> Send
                              Message{" "}
                            </>
                          )}
                        </Button>
                        {submitStatus === "error" && (
                          <p className="text-red-600 text-sm text-center">
                            Failed to send message. Please try again.
                          </p>
                        )}
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-8">
                <div className="floating-card">
                  <Card className="rounded-2xl border-0 shadow-lg overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-teal to-navy"></div>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Phone className="h-5 w-5 text-teal" />
                        Contact Information
                      </CardTitle>
                      <CardDescription>
                        Reach out to us through these channels
                      </CardDescription>
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
                        <div>
                          <h4 className="font-medium text-teal">Main Office</h4>
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
                    </CardContent>
                  </Card>
                </div>

                <div className="floating-card">
                  <Card className="rounded-2xl border-0 shadow-lg overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-gold to-gold/70"></div>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Clock className="h-5 w-5 text-navy" />
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

            <div className="mt-16 max-w-6xl mx-auto">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-navy/20 via-teal/20 to-navy/20 blur-xl opacity-50"></div>
                <Card className="rounded-3xl border-0 shadow-xl overflow-hidden relative">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-navy" />
                      Find Us
                    </CardTitle>
                    <CardDescription>
                      Visit our main office or find a location near you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* <div className="aspect-video bg-muted rounded-xl overflow-hidden relative">
                      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-4">
                          <div className="bg-white rounded-full p-4 shadow-lg inline-block mb-4">
                            <MapPin className="h-8 w-8 text-navy" />
                          </div>
                          <p className="text-navy font-medium">Interactive map will display here</p>
                          <p className="text-sm text-navy/60">Showing our main office location</p>
                        </div>
                      </div>
                    </div> */}
                    <div className="aspect-video rounded-xl overflow-hidden">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d29751.157881229865!2d72.7900887!3d21.2360224!3m2!1i1024!2i768!4f13.1!2m1!1sSecond%20Floor%20Shop%20No%20227%20Unique%20Square%20Opposite%20Shubham%20K%20Mart%20Singanpore%20Road%20Singanpore%20Surat%20Gujarat%20395004!5e0!3m2!1sen!2sin!4v1774001253699!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                      ></iframe>
                    </div>
                    <div className="mt-6 flex justify-center">
                      <Button className="bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button">
                        Find Nearest Location
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
