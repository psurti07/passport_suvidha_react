import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Camera, CreditCard, Clock, AlertTriangle, CheckCircle, Info, Check } from "lucide-react"

export default function Requirements() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">            
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-5xl gradient-heading mb-4">
                Passport Requirements
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Everything you need to know about passport application requirements
              </p>
            </div>

            <Tabs defaultValue="documents" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="documents" className="text-sm">
                  Documents
                </TabsTrigger>
                <TabsTrigger value="fees" className="text-sm">
                  Fees
                </TabsTrigger>
              </TabsList>

              <TabsContent value="documents" className="space-y-8">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-navy/20 via-teal/20 to-navy/20 blur-xl opacity-50"></div>
                  <Card className="rounded-3xl border-0 shadow-xl overflow-hidden relative">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <FileText className="h-5 w-5 text-navy" />
                        Required Documents
                      </CardTitle>
                      <CardDescription>Documents needed for passport applications and renewals</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="bg-navy/5 rounded-xl p-5 border border-navy/10">
                          <h3 className="text-lg font-medium text-navy mb-2 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-navy" />
                            Fresh Passport Applications
                          </h3>
                          <ul className="space-y-2 pl-7 list-disc">
                            <li>Completed online application form</li>
                            <li>Proof of Identity (Aadhaar Card/Voter ID/PAN Card)</li>
                            <li>Proof of Address (Aadhaar/Utility Bills/Bank Statement)</li>
                            <li>Proof of Date of Birth (Birth Certificate/Aadhaar)</li>
                            <li>Recent passport size photographs (5.0 cm x 5.0 cm)</li>
                            <li>Payment of applicable fees</li>
                          </ul>                          
                        </div>

                        <div className="bg-teal/5 rounded-xl p-5 border border-teal/10">
                          <h3 className="text-lg font-medium text-teal mb-2 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-teal" />
                            Passport Re-issue/Renewal
                          </h3>
                          <ul className="space-y-2 pl-7 list-disc">
                            <li>Completed online application form</li>
                            <li>Original old passport</li>
                            <li>Self-attested copies of first and last pages</li>
                            <li>Recent passport size photographs</li>
                            <li>Payment of applicable fees</li>
                          </ul>                         
                        </div>

                        <div className="bg-burgundy/5 rounded-xl p-5 border border-burgundy/10">
                          <h3 className="text-lg font-medium text-burgundy mb-2 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-burgundy" />
                            Minor Passports (Under 18)
                          </h3>
                          <ul className="space-y-2 pl-7 list-disc">
                            <li>Completed online application form</li>
                            <li>Birth Certificate of minor</li>
                            <li>Aadhaar Card of minor (if available)</li>
                            <li>Parents' passports/valid ID proofs</li>
                            <li>Parents' presence required at PSK</li>
                            <li>Recent passport size photographs</li>
                            <li>Payment of applicable fees</li>
                          </ul>                          
                        </div>

                        {/* <div className="bg-gold/5 rounded-xl p-5 border border-gold/10">
                          <h3 className="text-lg font-medium text-navy mb-2 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-gold" />
                            Special Circumstances
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium">Lost or Stolen Passport</h4>
                              <p className="text-sm text-muted-foreground">
                                Submit Form DS-64 along with a new application
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium">Name Change</h4>
                              <p className="text-sm text-muted-foreground">
                                Provide legal name change document (e.g., marriage certificate, court order)
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium">One Parent Cannot Appear</h4>
                              <p className="text-sm text-muted-foreground">
                                Submit Form DS-3053 with notarized signature of absent parent
                              </p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button
                              variant="outline"
                              className="rounded-xl border-gold text-navy hover:bg-gold hover:text-navy"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download Special Forms
                            </Button>
                          </div>
                        </div> */}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* <TabsContent value="photos" className="space-y-8">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-navy/20 via-teal/20 to-navy/20 blur-xl opacity-50"></div>
                  <Card className="rounded-3xl border-0 shadow-xl overflow-hidden relative">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <Camera className="h-5 w-5 text-navy" />
                        Photo Requirements
                      </CardTitle>
                      <CardDescription>Specifications for passport photos</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div className="bg-navy/5 rounded-xl p-5 border border-navy/10">
                            <h3 className="text-lg font-medium text-navy mb-2">Photo Specifications</h3>
                            <ul className="space-y-2 pl-7 list-disc">
                              <li>2x2 inches (51x51 mm) in size</li>
                              <li>Taken within the last 6 months</li>
                              <li>
                                Head must be between 1-1 3/8 inches from the bottom of the chin to the top of the head
                              </li>
                              <li>Printed on matte or glossy photo quality paper</li>
                              <li>Printed in color</li>
                              <li>High resolution, not pixelated, blurry, or grainy</li>
                            </ul>
                          </div>

                          <div className="bg-teal/5 rounded-xl p-5 border border-teal/10">
                            <h3 className="text-lg font-medium text-teal mb-2">Composition Requirements</h3>
                            <ul className="space-y-2 pl-7 list-disc">
                              <li>Plain white or off-white background</li>
                              <li>Full face view directly facing the camera</li>
                              <li>Neutral facial expression or natural smile</li>
                              <li>Both eyes open and clearly visible</li>
                              <li>No glasses (if possible) or glare on glasses</li>
                              <li>No head coverings (except for religious purposes)</li>
                              <li>No headphones or wireless hands-free devices</li>
                            </ul>
                          </div>

                          <div className="bg-burgundy/5 rounded-xl p-5 border border-burgundy/10">
                            <h3 className="text-lg font-medium text-burgundy mb-2">Common Mistakes to Avoid</h3>
                            <ul className="space-y-2 pl-7 list-disc">
                              <li>Shadows on face or background</li>
                              <li>Overexposed or underexposed photos</li>
                              <li>Red-eye effect</li>
                              <li>Digitally altered photos</li>
                              <li>Selfies or low-quality camera phone photos</li>
                              <li>Photos with other people visible</li>
                            </ul>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="bg-white rounded-xl p-5 border shadow-md">
                            <h3 className="text-lg font-medium text-navy mb-4 text-center">Photo Examples</h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                                  <img
                                    src="/placeholder.svg?height=200&width=200"
                                    alt="Acceptable passport photo example"
                                    className="object-cover"
                                  />
                                  <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-xs py-1 text-center">
                                    Acceptable
                                  </div>
                                </div>
                                <p className="text-xs text-center text-muted-foreground">
                                  Proper lighting, neutral expression
                                </p>
                              </div>
                              <div className="space-y-2">
                                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                                  <img
                                    src="/placeholder.svg?height=200&width=200"
                                    alt="Unacceptable passport photo example"
                                    className="object-cover"
                                  />
                                  <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-xs py-1 text-center">
                                    Unacceptable
                                  </div>
                                </div>
                                <p className="text-xs text-center text-muted-foreground">
                                  Shadows on face, colored background
                                </p>
                              </div>
                              <div className="space-y-2">
                                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                                  <img
                                    src="/placeholder.svg?height=200&width=200"
                                    alt="Acceptable passport photo with glasses example"
                                    className="object-cover"
                                  />
                                  <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-xs py-1 text-center">
                                    Acceptable
                                  </div>
                                </div>
                                <p className="text-xs text-center text-muted-foreground">Glasses with no glare</p>
                              </div>
                              <div className="space-y-2">
                                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                                  <img
                                    src="/placeholder.svg?height=200&width=200"
                                    alt="Unacceptable passport photo with glasses example"
                                    className="object-cover"
                                  />
                                  <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-xs py-1 text-center">
                                    Unacceptable
                                  </div>
                                </div>
                                <p className="text-xs text-center text-muted-foreground">
                                  Glare on glasses, tilted head
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gold/5 rounded-xl p-5 border border-gold/10">
                            <h3 className="text-lg font-medium text-navy mb-2">Where to Get Photos</h3>
                            <p className="mb-4 text-sm text-muted-foreground">You can get passport photos at:</p>
                            <ul className="space-y-2 pl-7 list-disc">
                              <li>Passport acceptance facilities</li>
                              <li>Post offices</li>
                              <li>Photo studios</li>
                              <li>Pharmacy chains (CVS, Walgreens, etc.)</li>
                              <li>Retail stores (Walmart, Costco, etc.)</li>
                              <li>Online services (with home printing)</li>
                            </ul>
                            <div className="mt-4">
                              <Button className="w-full bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button">
                                Find Photo Services Near You
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent> */}

              <TabsContent value="fees" className="space-y-8">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-navy/20 via-teal/20 to-navy/20 blur-xl opacity-50"></div>
                  <Card className="rounded-3xl border-0 shadow-xl overflow-hidden relative">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-navy" />
                        Passport Fees                    
                      </CardTitle>
                      <CardDescription>Current fees for passport books, cards, and services</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-navy text-white">
                              <th className="p-3 text-left rounded-tl-lg">Type of Passport</th>
                              <th className="p-3 text-left">Gov. Fees</th>
                              <th className="p-3 text-left">Service Charge</th>
                              <th className="p-3 text-left">GST (18%)</th>
                              <th className="p-3 text-left rounded-tr-lg">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-border">
                              <td className="p-3 font-medium">Normal Passport (36 Page)</td>
                              <td className="p-3">₹1,500</td>
                              <td className="p-3">₹1,000</td>
                              <td className="p-3">₹180</td>
                              <td className="p-3 font-medium">₹2,680</td>
                            </tr>
                            <tr className="border-b border-border bg-muted/30">
                              <td className="p-3 font-medium">Normal Passport (60 Page)</td>
                              <td className="p-3">₹2,000</td>
                              <td className="p-3">₹1,000</td>
                              <td className="p-3">₹180</td>
                              <td className="p-3 font-medium">₹3,180</td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="p-3 font-medium">Tatkal Passport (36 Page)</td>
                              <td className="p-3">₹3,500</td>
                              <td className="p-3">₹1,000</td>
                              <td className="p-3">₹180</td>
                              <td className="p-3 font-medium">₹4,680</td>
                            </tr>
                            <tr className="border-b border-border bg-muted/30">
                              <td className="p-3 font-medium">Tatkal Passport (60 Page)</td>
                              <td className="p-3">₹4,000</td>
                              <td className="p-3">₹1,000</td>
                              <td className="p-3">₹180</td>
                              <td className="p-3 font-medium">₹5,180</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-navy/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-full bg-navy/10 flex items-center justify-center">
                              <CreditCard className="h-5 w-5 text-navy" />
                            </div>
                            <h3 className="text-lg font-semibold text-navy">Normal Passport (36 Page)</h3>
                          </div>
                          <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-navy/5 flex items-center justify-center">
                                <Check className="h-4 w-4 text-navy" />
                              </div>
                              <span className="text-gray-700">Ideal for occasional travelers</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-navy/5 flex items-center justify-center">
                                <Check className="h-4 w-4 text-navy" />
                              </div>
                              <span className="text-gray-700">36 pages for visa stamps</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-navy/5 flex items-center justify-center">
                                <Check className="h-4 w-4 text-navy" />
                              </div>
                              <span className="text-gray-700">Standard processing time</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-navy/5 flex items-center justify-center">
                                <Check className="h-4 w-4 text-navy" />
                              </div>
                              <span className="text-gray-700">Most economical option</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-navy/5 flex items-center justify-center">
                                <Check className="h-4 w-4 text-navy" />
                              </div>
                              <span className="text-gray-700">10 years validity</span>
                            </li>
                          </ul>
                          <div className="mt-5 p-3 bg-navy/5 rounded-lg text-sm text-navy flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            Perfect for basic travel needs
                          </div>
                        </div>

                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-teal/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-full bg-teal/10 flex items-center justify-center">
                              <CreditCard className="h-5 w-5 text-teal" />
                            </div>
                            <h3 className="text-lg font-semibold text-teal">Normal Passport (60 Page)</h3>
                          </div>
                          <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-teal/5 flex items-center justify-center">
                                <Check className="h-4 w-4 text-teal" />
                              </div>
                              <span className="text-gray-700">Perfect for frequent travelers</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-teal/5 flex items-center justify-center">
                                <Check className="h-4 w-4 text-teal" />
                              </div>
                              <span className="text-gray-700">60 pages for extra visa stamps</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-teal/5 flex items-center justify-center">
                                <Check className="h-4 w-4 text-teal" />
                              </div>
                              <span className="text-gray-700">Standard processing time</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-teal/5 flex items-center justify-center">
                                <Check className="h-4 w-4 text-teal" />
                              </div>
                              <span className="text-gray-700">Longer validity period</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-teal/5 flex items-center justify-center">
                                <Check className="h-4 w-4 text-teal" />
                              </div>
                              <span className="text-gray-700">10 years validity</span>
                            </li>
                          </ul>
                          <div className="mt-5 p-3 bg-teal/5 rounded-lg text-sm text-teal flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            Recommended for business travelers
                          </div>
                        </div>

                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-navy/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-full bg-navy/10 flex items-center justify-center">
                              <Clock className="h-5 w-5 text-navy" />
                            </div>
                            <h3 className="text-lg font-semibold text-navy">Tatkal Passport (36 Page)</h3>
                          </div>
                          <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-navy/5 flex items-center justify-center">
                                <Check className="h-4 w-4 text-navy" />
                              </div>
                              <span className="text-gray-700">Expedited processing (1-3 days)</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-navy/5 flex items-center justify-center">
                                <Check className="h-4 w-4 text-navy" />
                              </div>
                              <span className="text-gray-700">36 pages for visa stamps</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-navy/5 flex items-center justify-center">
                                <Check className="h-4 w-4 text-navy" />
                              </div>
                              <span className="text-gray-700">Priority verification</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-navy/5 flex items-center justify-center">
                                <Check className="h-4 w-4 text-navy" />
                              </div>
                              <span className="text-gray-700">Emergency travel support</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-navy/5 flex items-center justify-center">
                                <Check className="h-4 w-4 text-navy" />
                              </div>
                              <span className="text-gray-700">10 years validity</span>
                            </li>
                          </ul>
                          <div className="mt-5 p-3 bg-navy/5 rounded-lg text-sm text-navy flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            Best for urgent travel needs
                          </div>
                        </div>

                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-teal/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-full bg-teal/10 flex items-center justify-center">
                              <Clock className="h-5 w-5 text-teal" />
                            </div>
                            <h3 className="text-lg font-semibold text-teal">Tatkal Passport (60 Page)</h3>
                          </div>
                          <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-teal/5 flex items-center justify-center">
                                <Check className="h-4 w-4 text-teal" />
                              </div>
                              <span className="text-gray-700">Expedited processing (1-3 days)</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-teal/5 flex items-center justify-center">
                                <Check className="h-4 w-4 text-teal" />
                              </div>
                              <span className="text-gray-700">60 pages for extra visa stamps</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-teal/5 flex items-center justify-center">
                                <Check className="h-4 w-4 text-teal" />
                              </div>
                              <span className="text-gray-700">Priority verification</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-teal/5 flex items-center justify-center">
                                <Check className="h-4 w-4 text-teal" />
                              </div>
                              <span className="text-gray-700">Premium service benefits</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-teal/5 flex items-center justify-center">
                                <Check className="h-4 w-4 text-teal" />
                              </div>
                              <span className="text-gray-700">10 years validity</span>
                            </li>
                          </ul>
                          <div className="mt-5 p-3 bg-teal/5 rounded-lg text-sm text-teal flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            Ideal for urgent business travel
                          </div>
                        </div>
                      </div>

                      {/* <div className="bg-gold/5 rounded-xl p-5 border border-gold/10">
                        <h3 className="text-lg font-medium text-navy mb-2">Payment Methods</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-1">Online Payment</h4>
                            <ul className="space-y-1 pl-7 list-disc text-sm">
                              <li>Credit/Debit cards</li>
                              <li>Net Banking</li>
                              <li>UPI Payment</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">At Passport Seva Kendra</h4>
                            <ul className="space-y-1 pl-7 list-disc text-sm">
                              <li>Debit/Credit cards accepted</li>
                              <li>Cash payments not accepted</li>
                            </ul>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button className="w-full bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button">
                            Calculate Your Fees
                          </Button>
                        </div>
                      </div> */}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* <TabsContent value="processing" className="space-y-8">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-navy/20 via-teal/20 to-navy/20 blur-xl opacity-50"></div>
                  <Card className="rounded-3xl border-0 shadow-xl overflow-hidden relative">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <Clock className="h-5 w-5 text-navy" />
                        Processing Times
                      </CardTitle>
                      <CardDescription>Current processing times and expedited options</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-navy/5 rounded-xl p-5 border border-navy/10 flex flex-col h-full">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-navy">Routine Service</h3>
                            <span className="bg-navy/10 text-navy text-sm font-medium px-3 py-1 rounded-full">
                              Standard
                            </span>
                          </div>
                          <div className="text-3xl font-bold text-navy mb-2">8-11 Weeks</div>
                          <p className="text-sm text-muted-foreground mb-4">From application date</p>
                          <ul className="space-y-2 pl-7 list-disc text-sm flex-grow">
                            <li>Standard processing time</li>
                            <li>No additional fees</li>
                            <li>Recommended for non-urgent travel</li>
                          </ul>
                          <div className="mt-4">
                            <Button
                              variant="outline"
                              className="w-full rounded-xl border-navy text-navy hover:bg-navy hover:text-white"
                            >
                              Apply with Routine Service
                            </Button>
                          </div>
                        </div>

                        <div className="bg-teal/5 rounded-xl p-5 border border-teal/10 flex flex-col h-full">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-teal">Expedited Service</h3>
                            <span className="bg-teal/10 text-teal text-sm font-medium px-3 py-1 rounded-full">
                              Faster
                            </span>
                          </div>
                          <div className="text-3xl font-bold text-teal mb-2">5-7 Weeks</div>
                          <p className="text-sm text-muted-foreground mb-4">From application date</p>
                          <ul className="space-y-2 pl-7 list-disc text-sm flex-grow">
                            <li>Faster processing time</li>
                            <li>Additional $60 fee</li>
                            <li>Optional 1-2 day delivery ($18.32)</li>
                            <li>Available at all acceptance facilities</li>
                          </ul>
                          <div className="mt-4">
                            <Button
                              variant="outline"
                              className="w-full rounded-xl border-teal text-teal hover:bg-teal hover:text-white"
                            >
                              Apply with Expedited Service
                            </Button>
                          </div>
                        </div>

                        <div className="bg-burgundy/5 rounded-xl p-5 border border-burgundy/10 flex flex-col h-full">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-burgundy">Urgent Travel Service</h3>
                            <span className="bg-burgundy/10 text-burgundy text-sm font-medium px-3 py-1 rounded-full">
                              Urgent
                            </span>
                          </div>
                          <div className="text-3xl font-bold text-burgundy mb-2">3-5 Business Days</div>
                          <p className="text-sm text-muted-foreground mb-4">
                            For life-or-death emergencies and urgent travel
                          </p>
                          <ul className="space-y-2 pl-7 list-disc text-sm flex-grow">
                            <li>For travel within 14 days</li>
                            <li>Requires appointment at passport agency</li>
                            <li>Proof of travel required</li>
                            <li>Expedited fee ($60) applies</li>
                          </ul>
                          <div className="mt-4">
                            <Button
                              variant="outline"
                              className="w-full rounded-xl border-burgundy text-burgundy hover:bg-burgundy hover:text-white"
                            >
                              Schedule Urgent Appointment
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gold/5 rounded-xl p-5 border border-gold/10">
                        <h3 className="text-lg font-medium text-navy mb-4">Current Processing Status</h3>
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
                          <div className="flex items-center">
                            <div className="w-1/3 font-medium">Urgent Travel:</div>
                            <div className="w-2/3 flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-burgundy h-2.5 rounded-full" style={{ width: "30%" }}></div>
                              </div>
                              <span className="ml-2 text-sm">3-5 days</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 text-sm text-muted-foreground">
                          <Info className="h-4 w-4 inline mr-1" />
                          Processing times are updated weekly and may vary based on application volume
                        </div>
                        <div className="mt-4">
                          <Button className="w-full bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button">
                            Check Your Application Status
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent> */}
            </Tabs>
          </div>
        </section>
      </main>     
    </div>
  )
}

