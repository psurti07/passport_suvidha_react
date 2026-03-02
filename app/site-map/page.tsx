import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FileText,
  Home,
  FileCheck,
  Users,
  MapPin,
  HelpCircle,
  Mail,
  CreditCard,
  Clock,
  Shield,
  FileImage,
  Search,
} from "lucide-react"

export default function SiteMap() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">     
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-heading mb-4">
                Site Map
              </h1>
              <p className="text-muted-foreground md:text-xl">
                A complete overview of all pages on the PassportSuvidha website
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <Card className="rounded-xl border-0 shadow-lg overflow-hidden h-full">
                  <div className="h-1 w-full bg-navy"></div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Home className="h-5 w-5 text-navy" />
                      <CardTitle className="text-xl">Main Pages</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      <li>
                        <Link href="/" className="flex items-center gap-2 text-navy hover:text-teal transition-colors">
                          <Home className="h-4 w-4" />
                          <span>Home</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/services"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <FileCheck className="h-4 w-4" />
                          <span>Services</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/requirements"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <FileImage className="h-4 w-4" />
                          <span>Requirements</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/locations"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <MapPin className="h-4 w-4" />
                          <span>Locations</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/about"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <Users className="h-4 w-4" />
                          <span>About Us</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/contact"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <Mail className="h-4 w-4" />
                          <span>Contact</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/faq"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <HelpCircle className="h-4 w-4" />
                          <span>FAQ</span>
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="rounded-xl border-0 shadow-lg overflow-hidden h-full">
                  <div className="h-1 w-full bg-teal"></div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <FileCheck className="h-5 w-5 text-teal" />
                      <CardTitle className="text-xl">Application Pages</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/apply"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <FileText className="h-4 w-4" />
                          <span>Apply Now</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/apply-passport"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <FileText className="h-4 w-4" />
                          <span>Passport Application</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/status"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <Search className="h-4 w-4" />
                          <span>Check Status</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/services"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <CreditCard className="h-4 w-4" />
                          <span>Services & Pricing</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/requirements"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <Clock className="h-4 w-4" />
                          <span>Processing Times</span>
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="rounded-xl border-0 shadow-lg overflow-hidden h-full">
                  <div className="h-1 w-full bg-burgundy"></div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-burgundy" />
                      <CardTitle className="text-xl">Account Pages</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/signin"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <Users className="h-4 w-4" />
                          <span>Sign In</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/signup"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <Users className="h-4 w-4" />
                          <span>Sign Up</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/forgot-password"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <Shield className="h-4 w-4" />
                          <span>Forgot Password</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/account"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <Users className="h-4 w-4" />
                          <span>My Account</span>
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="rounded-xl border-0 shadow-lg overflow-hidden h-full">
                  <div className="h-1 w-full bg-gold"></div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-navy" />
                      <CardTitle className="text-xl">Legal Pages</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/privacy-policy"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <Shield className="h-4 w-4" />
                          <span>Privacy Policy</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/terms-of-service"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <FileCheck className="h-4 w-4" />
                          <span>Terms of Service</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/accessibility"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <Users className="h-4 w-4" />
                          <span>Accessibility</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/site-map"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <FileText className="h-4 w-4" />
                          <span>Site Map</span>
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="rounded-xl border-0 shadow-lg overflow-hidden h-full">
                  <div className="h-1 w-full bg-navy"></div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <HelpCircle className="h-5 w-5 text-navy" />
                      <CardTitle className="text-xl">Support Pages</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/faq"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <HelpCircle className="h-4 w-4" />
                          <span>Frequently Asked Questions</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/contact"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <Mail className="h-4 w-4" />
                          <span>Contact Us</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/status"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <Search className="h-4 w-4" />
                          <span>Application Status</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/help"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <HelpCircle className="h-4 w-4" />
                          <span>Help Center</span>
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="rounded-xl border-0 shadow-lg overflow-hidden h-full">
                  <div className="h-1 w-full bg-teal"></div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-5 w-5 text-teal" />
                      <CardTitle className="text-xl">Location Pages</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/locations"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <MapPin className="h-4 w-4" />
                          <span>All Locations</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/locations/search"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <Search className="h-4 w-4" />
                          <span>Find Nearest Office</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/locations/appointment"
                          className="flex items-center gap-2 text-navy hover:text-teal transition-colors"
                        >
                          <Calendar className="h-4 w-4" />
                          <span>Book Appointment</span>
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-navy/5 rounded-xl p-6 border border-navy/10 mb-8">
                <h3 className="text-xl font-medium text-navy mb-4 flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search Our Site
                </h3>
                <p className="text-muted-foreground mb-4">
                  Can't find what you're looking for? Use our search function to quickly locate information across the
                  entire website.
                </p>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search for passport information..."
                        className="pl-10 modern-input"
                      />
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button">
                    Search
                  </Button>
                </div>
              </div>

              <div className="bg-teal/5 rounded-xl p-6 border border-teal/10">
                <h3 className="text-xl font-medium text-teal mb-4">Need Help Finding Something?</h3>
                <p className="text-muted-foreground mb-4">
                  If you can't find what you're looking for, our customer support team is here to help. Contact us for
                  assistance navigating our website or finding specific information.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className="bg-gradient-to-r from-teal to-navy text-white hover:opacity-90 rounded-xl modern-button"
                    asChild
                  >
                    <Link href="/contact">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Support
                    </Link>
                  </Button>
                  <Button variant="outline" className="rounded-xl border-teal/20 hover:bg-teal/5" asChild>
                    <Link href="/faq">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      View FAQ
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

function Calendar({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}

