import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FileText, FileCheck, Scale, AlertTriangle, Clock, Ban, CreditCard, ShieldCheck } from 'lucide-react'

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">      
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-heading mb-4">
                Terms of Service
              </h1>
              <p className="text-muted-foreground md:text-xl">
                The legal agreement between you and PassportSuvidha
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
                    <FileCheck className="h-5 w-5 text-navy" />
                    <CardTitle>Terms of Service Agreement</CardTitle>
                  </div>
                  <CardDescription>
                    Please read these Terms of Service carefully before using our website or services.
                  </CardDescription>
                </CardHeader>
                <CardContent className="prose prose-slate max-w-none">
                  <p>
                    These Terms of Service ("Terms") constitute a legally binding agreement between you and PassportSuvidha ("we," "us," or "our") governing your access to and use of our website, mobile applications, and services (collectively, the "Services").
                  </p>
                  <p>
                    By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use our Services.
                  </p>
                  <div className="bg-navy/5 p-4 rounded-lg my-6 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-navy mt-0.5" />
                    <div>
                      <h4 className="text-navy font-medium mb-1">Important Notice</h4>
                      <p className="text-sm text-muted-foreground m-0">
                        Our Services are intended for individuals who are at least 18 years old or accessing the Services under the supervision of a parent or legal guardian. By using our Services, you represent that you meet these requirements.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="border rounded-xl shadow-sm overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <FileText className="h-5 w-5 text-navy flex-shrink-0" />
                      <span className="font-medium">Services Description</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>
                        PassportSuvidha provides passport application and renewal services for U.S. citizens. Our Services include:
                      </p>
                      <ul>
                        <li>Processing new passport applications</li>
                        <li>Handling passport renewals</li>
                        <li>Expedited passport services</li>
                        <li>Passport status tracking</li>
                        <li>Document preparation assistance</li>
                        <li>Customer support related to passport applications</li>
                      </ul>
                      <p>
                        We act as an authorized service provider to assist with the passport application process. The actual issuance of passports is the responsibility of the U.S. Department of State.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border rounded-xl shadow-sm overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <Scale className="h-5 w-5 text-teal flex-shrink-0" />
                      <span className="font-medium">User Responsibilities</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>When using our Services, you agree to:</p>
                      <ul>
                        <li>Provide accurate, complete, and up-to-date information</li>
                        <li>Maintain the confidentiality of your account credentials</li>
                        <li>Promptly update any information that changes</li>
                        <li>Use the Services only for lawful purposes</li>
                        <li>Comply with all applicable laws and regulations</li>
                        <li>Not interfere with the operation of our Services</li>
                        <li>Not attempt to gain unauthorized access to any part of our Services</li>
                      </ul>
                      <p>
                        You are solely responsible for the accuracy of the information you provide. Inaccurate information may result in delays or rejection of your passport application by government authorities.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border rounded-xl shadow-sm overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <CreditCard className="h-5 w-5 text-burgundy flex-shrink-0" />
                      <span className="font-medium">Fees and Payment</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>
                        Our fee structure consists of government fees for passport issuance and our service fees for processing your application. All fees are clearly displayed before you complete your transaction.
                      </p>
                      <h4 className="text-lg font-medium text-navy">Payment Terms</h4>
                      <ul>
                        <li>All fees must be paid in full before we process your application</li>
                        <li>We accept major credit cards, debit cards, and other payment methods as specified on our website</li>
                        <li>All transactions are processed through secure payment gateways</li>
                        <li>Prices are subject to change, but changes will not affect orders already placed</li>
                      </ul>
                      <h4 className="text-lg font-medium text-navy">Refund Policy</h4>
                      <p>
                        Our refund policy varies based on the status of your application:
                      </p>
                      <ul>
                        <li>If we have not yet submitted your application to the government, you may be eligible for a partial refund of our service fees</li>
                        <li>Once your application has been submitted to the government, our service fees are non-refundable</li>
                        <li>Government fees are generally non-refundable, as they are controlled by the U.S. Department of State</li>
                        <li>Expedited service fees are non-refundable once processing has begun</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border rounded-xl shadow-sm overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <Clock className="h-5 w-5 text-navy flex-shrink-0" />
                      <span className="font-medium">Processing Times</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>
                        We strive to process all applications promptly, but processing times are estimates and not guarantees. Actual processing times may vary based on:
                      </p>
                      <ul>
                        <li>Current government processing volumes</li>
                        <li>Completeness and accuracy of your application</li>
                        <li>Type of service selected (standard or expedited)</li>
                        <li>Unforeseen circumstances or government delays</li>
                      </ul>
                      <p>
                        While we make every effort to meet our estimated processing times, we cannot guarantee passport issuance by a specific date. For time-sensitive travel, we recommend selecting our expedited services and applying well in advance of your travel date.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border rounded-xl shadow-sm overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <Ban className="h-5 w-5 text-burgundy flex-shrink-0" />
                      <span className="font-medium">Limitations of Liability</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>
                        To the maximum extent permitted by law, PassportSuvidha shall not be liable for:
                      </p>
                      <ul>
                        <li>Delays or denials of passport applications by government authorities</li>
                        <li>Errors or inaccuracies in the information you provide</li>
                        <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                        <li>Loss of profits, revenue, data, or business opportunities</li>
                        <li>Damages resulting from your failure to comply with these Terms</li>
                        <li>Issues arising from circumstances beyond our reasonable control</li>
                      </ul>
                      <p>
                        Our total liability for any claims arising from or related to these Terms or our Services shall not exceed the amount you paid to us for the Services giving rise to the claim.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="border rounded-xl shadow-sm overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <ShieldCheck className="h-5 w-5 text-teal flex-shrink-0" />
                      <span className="font-medium">Intellectual Property</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>
                        All content on our website and Services, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of PassportSuvidha or its content suppliers and is protected by United States and international copyright, trademark, and other intellectual property laws.
                      </p>
                      <p>
                        You may not reproduce, duplicate, copy, sell, resell, or otherwise exploit any portion of our Services, use of our Services, or access to our Services without our express written permission.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-10 space-y-6">
                <div className="bg-navy/5 rounded-xl p-6 border border-navy/10">
                  <h3 className="text-xl font-medium text-navy mb-4">Dispute Resolution</h3>
                  <p className="text-muted-foreground mb-4">
                    Any dispute arising from or relating to these Terms or our Services shall be resolved through the following process:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                    <li>Informal Resolution: We encourage you to contact us first to seek an informal resolution.</li>
                    <li>Mediation: If informal resolution is unsuccessful, the parties agree to mediate the dispute before a mutually agreed-upon mediator.</li>
                    <li>Arbitration: If mediation is unsuccessful, the dispute shall be resolved through binding arbitration in Washington, D.C., in accordance with the rules of the American Arbitration Association.</li>
                  </ol>
                  <p className="text-muted-foreground mt-4">
                    You agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action.
                  </p>
                </div>

                <div className="bg-teal/5 rounded-xl p-6 border border-teal/10">
                  <h3 className="text-xl font-medium text-teal mb-4">Changes to Terms</h3>
                  <p className="text-muted-foreground">
                    We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of our Services after such changes constitutes your acceptance of the new Terms. If you do not agree to the modified terms, you should discontinue your use of our Services.
                  </p>
                </div>

                <div className="bg-burgundy/5 rounded-xl p-6 border border-burgundy/10">
                  <h3 className="text-xl font-medium text-burgundy mb-4">Governing Law</h3>
                  <p className="text-muted-foreground">
                    These Terms shall be governed by and construed in accordance with the laws of the District of Columbia, without regard to its conflict of law provisions. Your use of our Services may also be subject to other local, state, national, or international laws.
                  </p>
                </div>

                <div className="bg-gold/5 rounded-xl p-6 border border-gold/10">
                  <h3 className="text-xl font-medium text-navy mb-4">Contact Information</h3>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-navy" />
                      <span>legal@PassportSuvidha.gov</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-navy" />
                      <span>1-800-123-4567 (Legal Department)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-navy mt-0.5" />
                      <div>
                        <p className="m-0">Legal Department</p>
                        <p className="m-0">PassportSuvidha</p>
                        <p className="m-0">123 Federal Plaza, Washington, DC 20001</p>
                      </div>
                    </div>
                  </div>
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
