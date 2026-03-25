import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { IndianRupee, Clock, AlertTriangle, CreditCard, RefreshCcw, CheckCircle2, HelpCircle, Mail, Phone } from 'lucide-react'

export default function RefundPolicy() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">           
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-heading pb-4">
                Refund Policy
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Understanding our refund process and eligibility criteria
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Last Updated: April 7, 2025</span>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="rounded-xl border-0 shadow-lg overflow-hidden mb-8">
                <div className="h-1 w-full bg-gradient-to-r from-navy to-teal"></div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <IndianRupee className="h-5 w-5 text-navy" />
                    <CardTitle>Refund Policy Overview</CardTitle>
                  </div>
                  <CardDescription>
                    PassportSuvidha is committed to fair and transparent refund practices for all our services.
                  </CardDescription>
                </CardHeader>
                <CardContent className="prose prose-slate max-w-none">
                  <p>
                    This Refund Policy outlines the terms and conditions under which PassportSuvidha ("we," "us," or "our") will process refunds for passport application services and related fees. We understand that circumstances may arise where you need to cancel your application or service request, and we aim to make this process as smooth as possible.
                  </p>
                  <div className="bg-navy/5 p-4 rounded-lg my-6 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-navy mt-0.5" />
                    <div>
                      <h4 className="text-navy font-medium mb-1">Important Notice</h4>
                      <p className="text-sm text-muted-foreground m-0">
                        Refund requests must be submitted within 30 days of the initial payment. Government fees may not be refundable as they are subject to official policies.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="border rounded-xl shadow-sm overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <CheckCircle2 className="h-5 w-5 text-navy flex-shrink-0" />
                      <span className="font-medium">Refund Eligibility</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <h4 className="text-lg font-medium text-navy">Eligible for Refund</h4>
                      <ul>
                        <li>Unused service fees if cancelled within 24 hours of payment</li>
                        <li>Duplicate payments or overcharges</li>
                        <li>Services not rendered due to technical issues on our part</li>
                        <li>Application fees if the service is discontinued by PassportSuvidha</li>
                      </ul>

                      <h4 className="text-lg font-medium text-navy">Non-Refundable Items</h4>
                      <ul>
                        <li>Government fees once the application is submitted</li>
                        <li>Processing fees after the application review has begun</li>
                        <li>Service charges for completed transactions</li>
                        <li>Cancellations after 24 hours of payment</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border rounded-xl shadow-sm overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <RefreshCcw className="h-5 w-5 text-teal flex-shrink-0" />
                      <span className="font-medium">Refund Process</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>Our refund process typically follows these steps:</p>
                      <ol>
                        <li>Submit a refund request through your account dashboard or contact support</li>
                        <li>Provide the transaction ID and reason for the refund</li>
                        <li>Our team will review your request within 2-3 business days</li>
                        <li>If approved, refund will be processed to the original payment method</li>
                        <li>Refund may take 5-10 business days to reflect in your account</li>
                      </ol>

                      <p>
                        For expedited refund processing or special circumstances, please contact our customer support team directly.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border rounded-xl shadow-sm overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <CreditCard className="h-5 w-5 text-burgundy flex-shrink-0" />
                      <span className="font-medium">Payment Methods and Processing</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <h4 className="text-lg font-medium text-navy">Refund Methods</h4>
                      <p>Refunds will be processed back to the original payment method:</p>
                      <ul>
                        <li>Credit/Debit Cards: 5-10 business days</li>
                        <li>Net Banking: 3-5 business days</li>
                        <li>UPI: 1-3 business days</li>
                        <li>Digital Wallets: 1-3 business days</li>
                      </ul>

                      <p>
                        Note: Bank processing times may vary depending on your financial institution and payment method used.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border rounded-xl shadow-sm overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <HelpCircle className="h-5 w-5 text-navy flex-shrink-0" />
                      <span className="font-medium">Special Circumstances</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>We may consider refunds under special circumstances:</p>
                      <ul>
                        <li>Medical emergencies (with proper documentation)</li>
                        <li>Natural disasters affecting application processing</li>
                        <li>Service unavailability due to technical issues</li>
                        <li>Changes in government policies affecting eligibility</li>
                      </ul>

                      <p>
                        Each case will be reviewed individually, and decisions will be made based on the provided documentation and circumstances.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-10 space-y-6">
                <div className="bg-navy/5 rounded-xl p-6 border border-navy/10">
                  <h3 className="text-xl font-medium text-navy mb-4">Contact Us</h3>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about our refund policy or need to request a refund, please contact our support team:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-navy" />
                      <span>support@PassportSuvidha.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-navy" />
                      <span>7486046591</span>
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