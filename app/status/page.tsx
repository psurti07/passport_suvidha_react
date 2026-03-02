import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FileText, Search, Clock, CheckCircle, AlertTriangle, HelpCircle } from "lucide-react"

export default function Status() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">                 
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-heading mb-4">
                Check Application Status
              </h1>
              <p className="text-muted-foreground md:text-xl">Track the status of your passport application</p>
            </div>

            <div className="relative max-w-3xl mx-auto mb-16">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-navy/20 via-teal/20 to-navy/20 blur-xl opacity-50"></div>
              <Card className="rounded-3xl border-0 shadow-xl overflow-hidden relative">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Search className="h-5 w-5 text-navy" />
                    Track Your Application
                  </CardTitle>
                  <CardDescription>Enter your application details to check the status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="application-number" className="text-sm font-medium">
                        Application Number
                      </label>
                      <Input
                        id="application-number"
                        placeholder="Enter your application number"
                        className="modern-input"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium">
                          Last Name
                        </label>
                        <Input id="last-name" placeholder="Enter your last name" className="modern-input" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="dob" className="text-sm font-medium">
                          Date of Birth
                        </label>
                        <Input id="dob" type="date" className="modern-input" />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button h-12">
                    Check Status
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="floating-card">
                  <Card className="rounded-2xl border-0 shadow-lg overflow-hidden h-full">
                    <div className="h-2 w-full bg-navy"></div>
                    <CardHeader className="pb-2">
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-navy/10">
                        <Clock className="h-6 w-6 text-navy" />
                      </div>
                      <CardTitle className="text-lg">Application Received</CardTitle>
                      <CardDescription>First stage of processing</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Your application has been received and is awaiting review. This typically takes 1-2 weeks.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="floating-card">
                  <Card className="rounded-2xl border-0 shadow-lg overflow-hidden h-full">
                    <div className="h-2 w-full bg-teal"></div>
                    <CardHeader className="pb-2">
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-teal/10">
                        <Clock className="h-6 w-6 text-teal" />
                      </div>
                      <CardTitle className="text-lg">In Process</CardTitle>
                      <CardDescription>Application under review</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Your application is being processed and reviewed. This stage typically takes 4-6 weeks.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="floating-card">
                  <Card className="rounded-2xl border-0 shadow-lg overflow-hidden h-full">
                    <div className="h-2 w-full bg-gold"></div>
                    <CardHeader className="pb-2">
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                        <CheckCircle className="h-6 w-6 text-navy" />
                      </div>
                      <CardTitle className="text-lg">Approved & Shipped</CardTitle>
                      <CardDescription>Final stage</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Your passport has been approved, printed, and shipped. You should receive it within 1-2 weeks.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-navy/20 via-teal/20 to-navy/20 blur-xl opacity-50"></div>
                <Card className="rounded-3xl border-0 shadow-xl overflow-hidden relative">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-navy" />
                      Status Information
                    </CardTitle>
                    <CardDescription>Understanding your application status</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-navy/5 border border-navy/10">
                        <h3 className="font-medium text-navy flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4" />
                          Application Received
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Your application has been received and is in the initial processing queue. During this stage,
                          your payment is processed and your application is prepared for review.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-teal/5 border border-teal/10">
                        <h3 className="font-medium text-teal flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4" />
                          In Process
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Your application is being reviewed by a passport specialist. They will verify your identity,
                          citizenship, and ensure all required documents are in order. This is typically the longest
                          stage of the process.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-burgundy/5 border border-burgundy/10">
                        <h3 className="font-medium text-burgundy flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4" />
                          Additional Information Required
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Additional documentation or information is needed to process your application. You will be
                          contacted directly with specific instructions on what is needed and how to provide it.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-gold/5 border border-gold/10">
                        <h3 className="font-medium text-navy flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4" />
                          Approved
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Your passport application has been approved. Your passport is being printed and prepared for
                          shipping.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                        <h3 className="font-medium text-green-600 flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4" />
                          Shipped
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Your passport has been shipped. If you selected standard delivery, it will arrive via USPS
                          First Class Mail. If you paid for expedited delivery, you will receive a tracking number.
                        </p>
                      </div>
                    </div>

                    <div className="bg-navy/5 rounded-xl p-5 border border-navy/10">
                      <h3 className="text-lg font-medium text-navy mb-2">Current Processing Times</h3>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="w-1/3 font-medium">Routine Service:</div>
                          <div className="w-2/3 flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-navy h-2.5 rounded-full" style={{ width: "75%" }}></div>
                            </div>
                            <span className="ml-2 text-sm">8-11 weeks</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-1/3 font-medium">Expedited Service:</div>
                          <div className="w-2/3 flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-teal h-2.5 rounded-full" style={{ width: "60%" }}></div>
                            </div>
                            <span className="ml-2 text-sm">5-7 weeks</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-6">
                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                      <Button
                        className="flex-1 bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button"
                        asChild
                      >
                        <Link href="/contact">Contact Support</Link>
                      </Button>
                      <Button variant="outline" className="flex-1 rounded-xl border-navy/20 hover:bg-navy/5" asChild>
                        <Link href="/faq">View FAQs</Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>     
    </div>
  )
}

