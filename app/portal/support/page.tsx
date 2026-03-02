"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Phone, Mail, Search, ChevronDown, ChevronUp, FileText, Clock, CheckCircle, Info, AlertCircle, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

// Type definition for a support ticket based on the provided JSON
interface SupportTicket {
  id: number;
  ticket_number: string;
  subject: string;
  message: string;
  status: 'open' | 'closed' | 'in_progress'; // Adjust status types if needed
  user_name: string;
  user_email: string;
  created_at: string; // Keep as string for now, format later
  updated_at: string;
}

// Utility function to format date (simple example)
function formatDate(dateString: string) {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric' 
    });
  } catch (e) {
    return dateString; // Return original if parsing fails
  }
}

export default function SupportPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // State for fetching/displaying tickets
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [ticketsError, setTicketsError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("contact"); // Track active tab

  // Fetch tickets when the tickets tab becomes active
  useEffect(() => {
    if (activeTab === 'tickets') {
      const fetchTickets = async () => {
        setTicketsLoading(true);
        setTicketsError(null);
        try {
          const response = await fetch('/api/support/tickets');
          if (!response.ok) {
            let errorData = null;
            try {
              errorData = await response.json();
            } catch (parseError) {}
            throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setTickets(data.data); // Assuming tickets are in the 'data' array
        } catch (err) {
          console.error("Failed to fetch tickets:", err);
          setTicketsError(err instanceof Error ? err.message : "Failed to load support tickets. Please try again.");
        } finally {
          setTicketsLoading(false);
        }
      };
      fetchTickets();
    }
  }, [activeTab]); // Re-run effect when activeTab changes

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (!subject || !message) {
      setError("Please select a subject and enter a message.");
      setIsLoading(false);
      return;
    }

    try {
      // Removed authToken check as it's handled by HttpOnly cookie
      
      // Actual API call - Now pointing to the Next.js API route
      const response = await fetch('/api/support/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // No manual Authorization header needed here - handled by backend route
        },
        body: JSON.stringify({ subject, message }),
      });

      if (!response.ok) {
        // Attempt to get error details from response body
        let errorData = null;
        try {
          errorData = await response.json();
        } catch (parseError) {
          // Ignore if response body is not JSON or empty
        }
        console.error("API Error Response:", errorData);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }
      
      // Assuming success if response.ok is true
      // const responseData = await response.json(); // Optional: process response data
      // console.log("Submission successful:", responseData);

      setSuccessMessage("Your support request has been submitted successfully!");
      setSubject("");
      setMessage("");

    } catch (err) {
      console.error("Submission error:", err);
      setError("Failed to submit support request. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

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
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  }

  // Status Badge Component (copied from details page for consistency)
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 border-blue-300 whitespace-nowrap"
          >
            Open
          </Badge>
        );
      case "in_progress":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-300 whitespace-nowrap"
          >
            In Progress
          </Badge>
        );
      case "closed":
        return <Badge variant="secondary" className="whitespace-nowrap">Closed</Badge>;
      default:
        return <Badge variant="outline" className="whitespace-nowrap">{status}</Badge>;
    }
  };

  // Helper function for CardHeader background based on status
  const getHeaderBgClass = (status: string): string => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-blue-50 border-b border-blue-100";
      case "in_progress":
        return "bg-yellow-50 border-b border-yellow-100";
      case "closed":
        return "bg-gray-100 border-b border-gray-200";
      default:
        return "bg-gray-50 border-b border-gray-100"; // Default background
    }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      {/* Page header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-navy">Help & Support</h1>
          <p className="text-muted-foreground">Get assistance with your passport applications and account</p>
        </div>
      </motion.div>

      {/* Support tabs */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="contact" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full h-full grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 mb-6">
            <TabsTrigger value="contact" className="w-full">Contact Support</TabsTrigger>
            <TabsTrigger value="faq" className="w-full">FAQs</TabsTrigger>
            <TabsTrigger value="tickets" className="w-full">My Support Tickets</TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Fill out the form below to get assistance from our support team</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form id="support-form" className="space-y-6" onSubmit={handleSubmit}>
                    {/* Display Success/Error Messages */}
                    {successMessage && (
                      <div className="p-3 rounded-md bg-green-100 text-green-800 border border-green-300">
                        {successMessage}
                      </div>
                    )}
                    {error && (
                      <div className="p-3 rounded-md bg-red-100 text-red-800 border border-red-300">
                        {error}
                      </div>
                    )}
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <select 
                        id="subject"
                        className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      >
                        <option value="" disabled>Select a subject</option>
                        <option value="application_status">Application Status</option>
                        <option value="document_verification">Document Verification</option>
                        <option value="payment_issue">Payment Issue</option>
                        <option value="appointment_scheduling">Appointment Scheduling</option>
                        <option value="technical_support">Technical Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Describe your issue or question in detail"
                        className="rounded-xl min-h-[150px] resize-none"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="border-t p-6">
                  <Button type="submit" form="support-form" className="w-full bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl" disabled={isLoading}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {isLoading ? "Submitting..." : "Submit Support Request"}
                  </Button>
                </CardFooter>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Alternative ways to reach our support team</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-navy/10 p-2 mt-1">
                          <Phone className="h-4 w-4 text-navy" />
                        </div>
                        <div>
                          <h3 className="font-medium">Phone Support</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Call us at{" "}
                            <a href="tel:+18005555555" className="text-navy hover:underline">
                              1-800-555-5555
                            </a>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Monday - Friday: 8:00 AM - 8:00 PM EST
                            <br />
                            Saturday: 9:00 AM - 5:00 PM EST
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-navy/10 p-2 mt-1">
                          <Mail className="h-4 w-4 text-navy" />
                        </div>
                        <div>
                          <h3 className="font-medium">Email Support</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Send an email to{" "}
                            <a href="mailto:support@PassportSuvidha.com" className="text-navy hover:underline">
                              support@PassportSuvidha.com
                            </a>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">We typically respond within 24 hours</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Support Hours</CardTitle>
                    <CardDescription>When our support team is available</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Monday - Friday</span>
                        <span>8:00 AM - 8:00 PM EST</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Saturday</span>
                        <span>9:00 AM - 5:00 PM EST</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Sunday</span>
                        <span>Closed</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Holidays</span>
                        <span>Limited Hours</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to common questions about passport applications</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search FAQs" className="pl-10 rounded-xl" />
                </div>

                <div className="space-y-4">
                  <FAQItem
                    question="How long does it take to process a passport application?"
                    answer="Standard processing time for a passport application is 8-11 weeks from the date of application. Expedited service (Tatkal) typically takes 2-3 weeks. Processing times may vary based on application volume and completeness of your application."
                  />

                  <FAQItem
                    question="What documents do I need to apply for a passport?"
                    answer="You'll need proof of citizenship (such as a birth certificate), a government-issued photo ID, a recent passport photo, and a completed application form. Additional documents may be required depending on your specific situation, such as proof of name change or parental consent for minors."
                  />

                  <FAQItem
                    question="How can I check the status of my passport application?"
                    answer="You can check your application status through your PassportSuvidha account dashboard. Simply log in and navigate to 'My Applications' to see real-time updates on your application's progress. You can also contact our support team with your application ID for assistance."
                  />

                  <FAQItem
                    question="What is the difference between normal and Tatkal (expedited) processing?"
                    answer="Normal processing follows the standard timeline of 8-11 weeks, while Tatkal (expedited) processing prioritizes your application for faster processing, typically within 2-3 weeks. Tatkal processing requires an additional fee but is recommended if you have urgent travel plans."
                  />

                  <FAQItem
                    question="Can I update my personal information after submitting my application?"
                    answer="Yes, you can update certain personal information after submission. Log in to your account, navigate to the specific application, and select 'Update Information.' Note that significant changes may require additional verification and could affect processing time."
                  />

                  <FAQItem
                    question="What should I do if my application requires additional information?"
                    answer="If your application requires additional information, you'll receive a notification in your account and via email. Log in to your account, go to the application details page, and follow the instructions to provide the requested information as soon as possible to avoid delays."
                  />

                  <FAQItem
                    question="How do I schedule an appointment for biometric data collection?"
                    answer="You can schedule an appointment through your PassportSuvidha account. Navigate to the 'Appointments' section, select a convenient date, time, and location, and confirm your booking. You'll receive a confirmation email with details about your appointment and what to bring."
                  />

                  <FAQItem
                    question="What payment methods are accepted for passport applications?"
                    answer="We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), as well as digital payment methods like PayPal and Apple Pay. All payments are processed securely through our encrypted payment system."
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t p-6">
                <p className="text-sm text-muted-foreground">
                  Can't find what you're looking for?{" "}
                  <Link href="/portal/support" className="text-navy hover:underline">
                    Contact our support team
                  </Link>{" "}
                  for assistance.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Support Tickets</CardTitle>
                <CardDescription>Track and manage your support requests</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {/* Loading State */}
                {ticketsLoading && (
                   <div className="space-y-4">
                       <Skeleton className="h-24 w-full rounded-lg" />
                       <Skeleton className="h-24 w-full rounded-lg" />
                   </div>
                 )}
                {/* Error State */}
                {ticketsError && (
                   <Alert variant="destructive">
                     <AlertCircle className="h-4 w-4" />
                     <AlertTitle>Error Loading Tickets</AlertTitle>
                     <AlertDescription>{ticketsError}</AlertDescription>
                   </Alert>
                 )}
                {/* No Tickets State */}
                {!ticketsLoading && !ticketsError && tickets.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    <Info className="mx-auto h-8 w-8 mb-2" />
                    <p>You haven't submitted any support tickets yet.</p>
                    <Button size="sm" className="mt-4" onClick={() => setActiveTab('contact')}>
                       Create a Ticket
                    </Button>
                  </div>
                )}
                {/* Tickets List */}
                {!ticketsLoading && !ticketsError && tickets.length > 0 && (
                  <div className="space-y-4">
                    {tickets.map((ticket) => (
                      <Card key={ticket.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
                        <CardHeader className={`p-4 ${getHeaderBgClass(ticket.status)}`}>
                           <div className="flex items-start justify-between gap-4">
                               <div>
                                   <CardTitle className="text-lg font-medium leading-tight">
                                       <Link href={`/portal/support/tickets/${ticket.ticket_number}`} className="hover:underline text-navy">
                                           {ticket.subject}
                                       </Link>
                                   </CardTitle>
                                   <CardDescription className="text-xs mt-1">
                                       Ticket #{ticket.ticket_number}
                                   </CardDescription>
                               </div>
                               {getStatusBadge(ticket.status)}
                           </div>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                           <p className="text-sm text-muted-foreground line-clamp-2" title={ticket.message}>
                               {ticket.message || "No message content."}
                           </p>
                           <Separator />
                           <div className="flex items-center justify-between text-xs text-muted-foreground">
                               <span className="flex items-center gap-1">
                                   <Calendar className="h-3.5 w-3.5" />
                                   Opened: {formatDate(ticket.created_at)}
                               </span>
                               <span className="flex items-center gap-1">
                                   <Clock className="h-3.5 w-3.5" />
                                   Updated: {formatDate(ticket.updated_at)}
                               </span>
                           </div>
                        </CardContent>
                        <CardFooter className="p-4 border-t bg-gray-50/50">
                            <Button variant="outline" size="sm" className="ml-auto rounded-lg" asChild>
                                <Link href={`/portal/support/tickets/${ticket.ticket_number}`}>
                                    View Details
                                </Link>
                            </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border rounded-xl overflow-hidden">
      <button
        className="flex justify-between items-center w-full p-4 text-left font-medium focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 pt-0 border-t">
          <p className="text-muted-foreground">{answer}</p>
        </div>
      )}
    </div>
  )
}

