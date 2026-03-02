import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FileText, Search, HelpCircle, Clock, CreditCard, User, Globe, Mail } from "lucide-react"

export default function FAQ() {
  return (
    <div className="min-h-screen professional-gradient dot-pattern flex flex-col relative overflow-hidden">
      <div className="blob-shape bg-navy/10 w-[600px] h-[600px] -left-64 top-0 pulse-animation"></div>
      <div className="blob-shape bg-teal/10 w-[500px] h-[500px] -right-64 bottom-0"></div>

      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-heading mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Find answers to common questions about passport applications
              </p>
            </div>

            <div className="relative max-w-3xl mx-auto mb-16">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-navy/20 via-teal/20 to-navy/20 blur-xl opacity-50"></div>
              <Card className="rounded-3xl border-0 shadow-xl overflow-hidden relative">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Search className="h-5 w-5 text-navy" />
                    Search FAQ
                  </CardTitle>
                  <CardDescription>Search for answers to your passport questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input placeholder="Type your question here..." className="modern-input h-12" />
                    </div>
                    <Button className="bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button h-12">
                      Search
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="md:col-span-1">
                <div className="sticky top-28 space-y-4">
                  <h3 className="text-lg font-medium text-navy">Categories</h3>
                  <nav className="flex flex-col space-y-1">
                    <a
                      href="#general"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-navy bg-navy/5 font-medium"
                    >
                      <HelpCircle className="h-4 w-4" />
                      General Questions
                    </a>
                    <a
                      href="#application"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-navy/5 transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      Application Process
                    </a>
                    <a
                      href="#timing"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-navy/5 transition-colors"
                    >
                      <Clock className="h-4 w-4" />
                      Timing & Processing
                    </a>
                    <a
                      href="#fees"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-navy/5 transition-colors"
                    >
                      <CreditCard className="h-4 w-4" />
                      Fees & Payment
                    </a>
                    <a
                      href="#children"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-navy/5 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      Children's Passports
                    </a>
                    <a
                      href="#travel"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-navy/5 transition-colors"
                    >
                      <Globe className="h-4 w-4" />
                      Travel Requirements
                    </a>
                  </nav>
                  <div className="rounded-xl bg-navy/5 p-4 mt-6">
                    <h4 className="font-medium text-navy mb-2">Need more help?</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Can't find the answer you're looking for? Contact our support team.
                    </p>
                    <Button
                      className="w-full bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button"
                      asChild
                    >
                      <Link href="/contact">
                        <Mail className="mr-2 h-4 w-4" />
                        Contact Support
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="md:col-span-3 space-y-8">
                <div id="general" className="scroll-mt-28">
                  <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    General Questions
                  </h2>
                  <Card className="rounded-xl border-0 shadow-lg overflow-hidden">
                    <CardContent className="p-6">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className="border-b border-border">
                          <AccordionTrigger className="text-base font-medium py-4">
                            How long is my passport valid?
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 pt-1 text-muted-foreground">
                            <p>
                              For adults (18 and older), passports are valid for 10 years from the date of issue. For
                              minors under 18, passports are valid for 5 years from the date of issue.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="border-b border-border">
                          <AccordionTrigger className="text-base font-medium py-4">
                            What's the difference between normal and Tatkal passport?
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 pt-1 text-muted-foreground">
                            <p className="mb-2">
                              <strong>Normal Passport:</strong> Standard processing time of around 30-45 days. This is the regular passport application process.
                            </p>
                            <p>
                              <strong>Tatkal Passport:</strong> Expedited processing within 1-3 working days for urgent requirements. Additional documentation and higher fees apply.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="border-b border-border">
                          <AccordionTrigger className="text-base font-medium py-4">
                            What documents do I need for a first-time passport?
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 pt-1 text-muted-foreground">
                            <p>
                              For a first-time passport, you'll need proof of identity (Aadhaar/PAN/Voter ID), proof of address, 
                              proof of date of birth (Birth Certificate/Aadhaar), recent passport size photographs, and the completed 
                              application form. Additional documents may be required based on your category.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4" className="border-b border-border">
                          <AccordionTrigger className="text-base font-medium py-4">
                            Do I need a passport for domestic travel in India?
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 pt-1 text-muted-foreground">
                            <p>
                              No, passports are not required for domestic travel within India. You can use other valid government-issued 
                              ID proofs like Aadhaar Card, Voter ID, or Driving License for domestic flights.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                          <AccordionTrigger className="text-base font-medium py-4">
                            What should I do if my passport is lost or stolen?
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 pt-1 text-muted-foreground">
                            <p>
                              File an FIR at your local police station immediately. Then apply for a re-issue of passport with 
                              the FIR copy, affidavit explaining loss/theft, and other required documents. You may need to visit 
                              the Passport Seva Kendra for police verification.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>

                <div id="application" className="scroll-mt-28">
                  <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Application Process
                  </h2>
                  <Card className="rounded-xl border-0 shadow-lg overflow-hidden">
                    <CardContent className="p-6">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className="border-b border-border">
                          <AccordionTrigger className="text-base font-medium py-4">
                            Can I renew my passport online?
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 pt-1 text-muted-foreground">
                            <p>
                              Yes, you can renew your passport online if you meet certain eligibility requirements. Your
                              most recent passport must be in your possession, undamaged, issued when you were 16 or
                              older, issued within the last 15 years, and issued in your current name (or you can
                              document your name change).
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="border-b border-border">
                          <AccordionTrigger className="text-base font-medium py-4">
                            What documents do I need for a first-time passport?
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 pt-1 text-muted-foreground">
                            <p>
                              For a first-time passport, you'll need to submit Form DS-11, proof of U.S. citizenship
                              (such as a birth certificate), a government-issued photo ID, a photocopy of your ID, one
                              passport photo, and the application fee. You must apply in person at a passport acceptance
                              facility.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="border-b border-border">
                          <AccordionTrigger className="text-base font-medium py-4">
                            How do I change my name on my passport?
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 pt-1 text-muted-foreground">
                            <p>
                              If your passport was issued less than a year ago, you can request a name change at no
                              additional cost. If it's been more than a year, you'll need to follow the renewal process
                              and pay the applicable fees. In both cases, you'll need to provide documentation of your
                              name change, such as a marriage certificate or court order.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4" className="border-b border-border">
                          <AccordionTrigger className="text-base font-medium py-4">
                            Where can I apply for a passport?
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 pt-1 text-muted-foreground">
                            <p>
                              You can apply for a passport at passport acceptance facilities, which include many post
                              offices, libraries, county clerk offices, and other government offices. For expedited
                              service in urgent situations, you can make an appointment at a passport agency.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                          <AccordionTrigger className="text-base font-medium py-4">
                            Can I track my passport application status?
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 pt-1 text-muted-foreground">
                            <p>
                              Yes, you can check your application status online at the Department of State website or by
                              calling the National Passport Information Center. You'll need your last name, date of
                              birth, and the last four digits of your Social Security number.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>

                <div id="timing" className="scroll-mt-28">
                  <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Timing & Processing
                  </h2>
                  <Card className="rounded-xl border-0 shadow-lg overflow-hidden">
                    <CardContent className="p-6">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className="border-b border-border">
                          <AccordionTrigger className="text-base font-medium py-4">
                            How long does it take to get a passport?
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 pt-1 text-muted-foreground">
                            <p>
                              Normal passport processing takes approximately 30-45 days from the date of application. 
                              Tatkal service provides expedited processing within 1-3 working days. Processing time may 
                              vary based on police verification requirements and document verification.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="border-b border-border">
                          <AccordionTrigger className="text-base font-medium py-4">
                            What if I need a passport urgently?
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 pt-1 text-muted-foreground">
                            <p>
                              You can apply under the Tatkal scheme for urgent passport requirements. You'll need to provide 
                              additional documentation and pay higher fees. Tatkal applications are processed on priority 
                              and passports are typically issued within 1-3 working days.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="border-b border-border">
                          <AccordionTrigger className="text-base font-medium py-4">
                            When should I renew my passport?
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 pt-1 text-muted-foreground">
                            <p>
                              It's recommended to renew your passport at least 9 months before it expires. Many countries 
                              require that your passport be valid for at least 6 months beyond your planned stay. You can 
                              apply for renewal up to 1 year before the expiry date.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                          <AccordionTrigger className="text-base font-medium py-4">
                            Can I expedite my passport renewal?
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 pt-1 text-muted-foreground">
                            <p>
                              Yes, you can request expedited service for a passport renewal for an additional fee of
                              $60. This reduces the processing time to approximately 5-7 weeks. For even faster service,
                              you can add 1-2 day delivery for the return of your passport for an additional fee.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-center mt-8">
                  <Button className="bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button">
                    Load More FAQs
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

