import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FileText, Shield, Lock, Eye, Database, Globe, Clock, AlertTriangle } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">           
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-heading pb-4">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground md:text-xl">
                How we collect, use, and protect your personal information
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Last Updated: March 27, 2025</span>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="rounded-xl border-0 shadow-lg overflow-hidden mb-8">
                <div className="h-1 w-full bg-gradient-to-r from-navy to-teal"></div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-navy" />
                    <CardTitle>Privacy Policy Overview</CardTitle>
                  </div>
                  <CardDescription>
                    PassportSuvidha is committed to protecting your privacy and ensuring the security of your personal information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="prose prose-slate max-w-none">
                  <p>
                    This Privacy Policy explains how PassportSuvidha ("we," "us," or "our") collects, uses, shares, and protects personal information obtained from users ("you" or "your") of our website, mobile applications, and services. By using our services, you consent to the data practices described in this policy.
                  </p>
                  <p>
                    We take your privacy seriously and are committed to maintaining the confidentiality and security of your personal information. This policy is designed to help you understand what information we collect, why we collect it, and how you can update, manage, and delete your information.
                  </p>
                  <div className="bg-navy/5 p-4 rounded-lg my-6 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-navy mt-0.5" />
                    <div>
                      <h4 className="text-navy font-medium mb-1">Important Notice</h4>
                      <p className="text-sm text-muted-foreground m-0">
                        PassportSuvidha processes sensitive personal information as required for passport applications. This information is handled with the utmost care and in compliance with all applicable privacy laws and regulations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="border rounded-xl shadow-sm overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <Database className="h-5 w-5 text-navy flex-shrink-0" />
                      <span className="font-medium">Information We Collect</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <h4 className="text-lg font-medium text-navy">Personal Information</h4>
                      <p>We may collect the following types of personal information:</p>
                      <ul>
                        <li>Contact information (name, email address, phone number, mailing address)</li>
                        <li>Government-issued identification (passport details, driver's license, etc.)</li>
                        <li>Demographic information (date of birth, gender, nationality)</li>
                        <li>Payment information (credit card details, billing address)</li>
                        <li>Biometric data (passport photos)</li>
                        <li>Travel information (travel dates, destinations)</li>
                      </ul>

                      <h4 className="text-lg font-medium text-navy">Automatically Collected Information</h4>
                      <p>When you visit our website or use our applications, we may automatically collect:</p>
                      <ul>
                        <li>Device information (IP address, browser type, operating system)</li>
                        <li>Usage data (pages visited, time spent on pages, links clicked)</li>
                        <li>Location data (with your permission)</li>
                        <li>Cookies and similar tracking technologies</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border rounded-xl shadow-sm overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <Eye className="h-5 w-5 text-teal flex-shrink-0" />
                      <span className="font-medium">How We Use Your Information</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>We use your personal information for the following purposes:</p>
                      <ul>
                        <li>Processing passport applications and renewals</li>
                        <li>Verifying your identity</li>
                        <li>Communicating with you about your application status</li>
                        <li>Processing payments</li>
                        <li>Providing customer support</li>
                        <li>Sending service-related notifications</li>
                        <li>Improving our services and website</li>
                        <li>Complying with legal obligations</li>
                      </ul>

                      <h4 className="text-lg font-medium text-navy">Legal Basis for Processing</h4>
                      <p>We process your personal information based on one or more of the following legal grounds:</p>
                      <ul>
                        <li>Performance of a contract when we provide you with services</li>
                        <li>Your consent, where you have given us permission</li>
                        <li>Compliance with legal obligations</li>
                        <li>Our legitimate interests, which do not override your fundamental rights and freedoms</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border rounded-xl shadow-sm overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <Globe className="h-5 w-5 text-burgundy flex-shrink-0" />
                      <span className="font-medium">Information Sharing and Disclosure</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>We may share your personal information with:</p>
                      <ul>
                        <li>Government agencies responsible for passport issuance</li>
                        <li>Service providers who assist us in processing applications</li>
                        <li>Payment processors to complete transactions</li>
                        <li>Legal and regulatory authorities when required by law</li>
                      </ul>

                      <p>We do not sell, rent, or lease your personal information to third parties. We may share anonymized, aggregated data for statistical purposes.</p>

                      <h4 className="text-lg font-medium text-navy">International Transfers</h4>
                      <p>
                        Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. When we transfer your information, we implement appropriate safeguards to ensure your information remains protected.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border rounded-xl shadow-sm overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <Lock className="h-5 w-5 text-navy flex-shrink-0" />
                      <span className="font-medium">Data Security</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>
                        We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, accidental loss, alteration, or destruction. These measures include:
                      </p>
                      <ul>
                        <li>Encryption of sensitive data</li>
                        <li>Secure socket layer (SSL) technology</li>
                        <li>Access controls and authentication procedures</li>
                        <li>Regular security assessments and audits</li>
                        <li>Employee training on data protection</li>
                      </ul>

                      <p>
                        While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security of your data.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border rounded-xl shadow-sm overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <Clock className="h-5 w-5 text-teal flex-shrink-0" />
                      <span className="font-medium">Data Retention</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>
                        We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, including legal, accounting, or reporting requirements. The retention periods depend on the type of information and the purpose for which it was collected.
                      </p>
                      <p>
                        For passport applications, we typically retain your information for:
                      </p>
                      <ul>
                        <li>Completed applications: 7 years from the date of passport issuance</li>
                        <li>Incomplete applications: 1 year from the last activity</li>
                        <li>Account information: As long as your account is active, plus a reasonable period thereafter</li>
                      </ul>
                      <p>
                        When your personal information is no longer required, we will securely delete or anonymize it.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="border rounded-xl shadow-sm overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <Shield className="h-5 w-5 text-burgundy flex-shrink-0" />
                      <span className="font-medium">Your Privacy Rights</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                      <ul>
                        <li>Right to access and receive a copy of your personal information</li>
                        <li>Right to correct inaccurate or incomplete information</li>
                        <li>Right to delete your personal information in certain circumstances</li>
                        <li>Right to restrict or object to processing of your personal information</li>
                        <li>Right to data portability</li>
                        <li>Right to withdraw consent at any time (where processing is based on consent)</li>
                      </ul>

                      <p>
                        To exercise these rights, please contact us using the information provided in the "Contact Us" section below. We will respond to your request within the timeframe required by applicable law.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-10 space-y-6">
                <div className="bg-navy/5 rounded-xl p-6 border border-navy/10">
                  <h3 className="text-xl font-medium text-navy mb-4">Contact Us</h3>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Data Protection Officer:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-navy" />
                      <span>privacy@PassportSuvidha.gov</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-navy" />
                      <span>1-800-123-4567 (Privacy Office)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-navy mt-0.5" />
                      <div>
                        <p className="m-0">Privacy Office</p>
                        <p className="m-0">PassportSuvidha</p>
                        <p className="m-0">123 Federal Plaza, Washington, DC 20001</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-teal/5 rounded-xl p-6 border border-teal/10">
                  <h3 className="text-xl font-medium text-teal mb-4">Changes to This Privacy Policy</h3>
                  <p className="text-muted-foreground">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date. We encourage you to review this policy periodically to stay informed about how we protect your personal information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>   
    </div>
  )
}

function Mail({ className }: { className?: string }) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function MapPin({ className }: { className?: string }) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function Phone({ className }: { className?: string }) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
