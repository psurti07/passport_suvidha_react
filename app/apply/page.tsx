import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, ArrowLeft, ArrowRight, Check, CreditCard, User, MapPin, FileImage, Shield } from "lucide-react"

export default function ApplyNow() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">      
      <main className="flex-1 py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-heading mb-3">
                Passport Application
              </h1>
              <p className="text-muted-foreground md:text-xl">Complete your application in a few simple steps</p>
            </div>

            <div className="mb-10">
              <div className="relative">
                <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-border"></div>
                <ol className="relative z-10 flex justify-between">
                  <li className="flex items-center justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-navy to-teal text-white">
                      <User className="h-5 w-5" />
                    </div>
                    <span className="absolute -bottom-6 text-sm font-medium text-navy">Personal Info</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <FileImage className="h-5 w-5" />
                    </div>
                    <span className="absolute -bottom-6 text-sm font-medium text-muted-foreground">Documents</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <span className="absolute -bottom-6 text-sm font-medium text-muted-foreground">Travel Plans</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <span className="absolute -bottom-6 text-sm font-medium text-muted-foreground">Payment</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <Check className="h-5 w-5" />
                    </div>
                    <span className="absolute -bottom-6 text-sm font-medium text-muted-foreground">Review</span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="relative mt-16">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-navy/20 via-teal/20 to-navy/20 blur-xl opacity-50"></div>
              <Card className="rounded-3xl border-0 shadow-xl overflow-hidden relative">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <User className="h-5 w-5 text-navy" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Please provide your personal details as they appear on your identification documents
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Passport Type</h3>
                      <RadioGroup defaultValue="standard" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="flex-1 cursor-pointer">
                            <div className="font-medium">Standard Passport Book</div>
                            <div className="text-sm text-muted-foreground">Valid for all international travel</div>
                          </Label>
                          <div className="text-sm font-medium text-navy">$130</div>
                        </div>
                        <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex-1 cursor-pointer">
                            <div className="font-medium">Passport Card</div>
                            <div className="text-sm text-muted-foreground">
                              Land and sea travel to Canada, Mexico, Caribbean
                            </div>
                          </Label>
                          <div className="text-sm font-medium text-navy">$65</div>
                        </div>
                        <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value="both" id="both" />
                          <Label htmlFor="both" className="flex-1 cursor-pointer">
                            <div className="font-medium">Passport Book & Card</div>
                            <div className="text-sm text-muted-foreground">Get both for maximum flexibility</div>
                          </Label>
                          <div className="text-sm font-medium text-navy">$175</div>
                        </div>
                        <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value="expedited" id="expedited" />
                          <Label htmlFor="expedited" className="flex-1 cursor-pointer">
                            <div className="font-medium">Expedited Processing</div>
                            <div className="text-sm text-muted-foreground">Faster processing (additional fee)</div>
                          </Label>
                          <div className="text-sm font-medium text-navy">+$60</div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" placeholder="Enter your first name" className="modern-input" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" placeholder="Enter your last name" className="modern-input" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input id="dob" type="date" className="modern-input" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select>
                          <SelectTrigger className="modern-input">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="non-binary">Non-binary</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ssn">Social Security Number</Label>
                        <Input id="ssn" placeholder="XXX-XX-XXXX" className="modern-input" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthplace">Place of Birth (City, State, Country)</Label>
                      <Input id="birthplace" placeholder="e.g., New York, NY, USA" className="modern-input" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" placeholder="Enter your email" className="modern-input" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" placeholder="(XXX) XXX-XXXX" className="modern-input" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Mailing Address</h3>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="street">Street Address</Label>
                          <Input id="street" placeholder="Enter your street address" className="modern-input" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="Enter your city" className="modern-input" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Select>
                              <SelectTrigger className="modern-input">
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="AL">Alabama</SelectItem>
                                <SelectItem value="AK">Alaska</SelectItem>
                                <SelectItem value="AZ">Arizona</SelectItem>
                                {/* Add more states as needed */}
                                <SelectItem value="WY">Wyoming</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zip">ZIP Code</Label>
                            <Input id="zip" placeholder="Enter ZIP code" className="modern-input" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Emergency Contact</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="emergency-name">Full Name</Label>
                          <Input id="emergency-name" placeholder="Enter contact's full name" className="modern-input" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergency-phone">Phone Number</Label>
                          <Input id="emergency-phone" placeholder="(XXX) XXX-XXXX" className="modern-input" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergency-email">Email Address</Label>
                          <Input
                            id="emergency-email"
                            type="email"
                            placeholder="Enter contact's email"
                            className="modern-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergency-relationship">Relationship</Label>
                          <Input
                            id="emergency-relationship"
                            placeholder="e.g., Spouse, Parent, Friend"
                            className="modern-input"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button variant="outline" className="rounded-xl border-navy/20 hover:bg-navy/5">
                    Save as Draft
                  </Button>
                  <Button className="bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button">
                    Continue to Documents
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-2 text-sm text-navy">
                <Shield className="h-4 w-4" />
                Your information is secure and encrypted
              </div>
            </div>
          </div>
        </div>
      </main>
           
    </div>
  )
}

