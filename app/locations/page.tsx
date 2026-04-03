import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FileText, MapPin, Phone, Clock, Calendar, ArrowRight, Search } from "lucide-react"

export default function Locations() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
            
      <main className="flex-1">
        <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="space-y-2">
    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl gradient-heading">
                Passport Office Locations
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Find your nearest passport office or Seva Kendra
              </p>
              </div>
          
            </div>

            <div className="relative max-w-4xl mx-auto mb-16">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-navy/20 via-teal/20 to-navy/20 blur-xl opacity-50"></div>
              <Card className="rounded-3xl border-0 shadow-xl overflow-hidden relative">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Search className="h-5 w-5 text-navy" />
                    Find Passport Offices
                  </CardTitle>
                  <CardDescription>Enter your PIN code or city to find passport offices near you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Input placeholder="Enter PIN code or city" className="modern-input h-12" />
                    </div>
                    <Button className="bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button h-12">
                      Search Locations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Using grid-rows-1 to ensure same height and h-full on cards */}
              <div className="group relative grid-rows-1">
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-navy to-navy/50 opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
                <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-navy/10 text-navy">
                      <MapPin className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl">Delhi Regional Passport Office</CardTitle>
                    <CardDescription>Regional Passport Office</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 flex-grow">
                    <p className="text-sm text-muted-foreground">Bhikaji Cama Place, New Delhi, Delhi 110066</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>1800-258-1800</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Mon-Fri: 9:30 AM - 4:30 PM</span>
                    </div>
                    <div className="mt-2 rounded-lg bg-navy/5 p-2 text-sm">
                      <span className="font-medium text-navy">Note:</span> Prior appointment required
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between mt-auto gap-2">
                    <Button variant="outline" className="rounded-xl border-navy/20 hover:bg-navy/5">
                      Get Directions
                    </Button>
                    <Button className="bg-navy hover:bg-navy/80 rounded-xl modern-button">
                      Book Appointment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="group relative grid-rows-1">
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-teal to-teal/50 opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
                <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-teal">
                      <MapPin className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl">Mumbai Regional Passport Office</CardTitle>
                    <CardDescription>Regional Passport Office</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 flex-grow">
                    <p className="text-sm text-muted-foreground">Worli, Mumbai, Maharashtra 400030</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>1800-258-1800</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Mon-Fri: 9:30 AM - 4:30 PM</span>
                    </div>
                    <div className="mt-2 rounded-lg bg-teal/5 p-2 text-sm">
                      <span className="font-medium text-teal">Note:</span> Prior appointment required
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between mt-auto">
                    <Button variant="outline" className="rounded-xl border-teal/20 hover:bg-teal/5">
                      Get Directions
                    </Button>
                    <Button className="bg-teal hover:bg-teal/80 rounded-xl modern-button">
                      Book Appointment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="group relative grid-rows-1">
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-burgundy to-burgundy/50 opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
                <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
                      <MapPin className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl">Bangalore Regional Passport Office</CardTitle>
                    <CardDescription>Regional Passport Office</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 flex-grow">
                    <p className="text-sm text-muted-foreground">Koramangala, Bangalore, Karnataka 560034</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>1800-258-1800</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Mon-Fri: 9:30 AM - 4:30 PM</span>
                    </div>
                    <div className="mt-2 rounded-lg bg-burgundy/5 p-2 text-sm">
                      <span className="font-medium text-burgundy">Note:</span> Prior appointment required
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between mt-auto">
                    <Button variant="outline" className="rounded-xl border-burgundy/20 hover:bg-burgundy/5">
                      Get Directions
                    </Button>
                    <Button className="bg-burgundy hover:bg-burgundy/80 rounded-xl modern-button text-white">
                      Book Appointment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="group relative grid-rows-1">
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-gold to-gold/50 opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
                <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-navy">
                      <MapPin className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl">Andheri Passport Seva Kendra</CardTitle>
                    <CardDescription>Passport Seva Kendra</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 flex-grow">
                    <p className="text-sm text-muted-foreground">Andheri East, Mumbai, Maharashtra 400093</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>1800-258-1800</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Mon-Fri: 9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="mt-2 rounded-lg bg-gold/5 p-2 text-sm">
                      <span className="font-medium text-navy">Services:</span> New applications, photos available
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between mt-auto">
                    <Button variant="outline" className="rounded-xl border-gold/20 hover:bg-gold/5">
                      Get Directions
                    </Button>
                    <Button className="bg-gold text-navy hover:bg-gold/80 rounded-xl modern-button">
                      Book Appointment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="group relative grid-rows-1">
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-navy to-navy/50 opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
                <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-navy/10 text-navy">
                      <MapPin className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl">Saligramam Passport Seva Kendra</CardTitle>
                    <CardDescription>Passport Seva Kendra</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 flex-grow">
                    <p className="text-sm text-muted-foreground">Saligramam, Chennai, Tamil Nadu 600093</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>1800-258-1800</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Mon-Fri: 9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="mt-2 rounded-lg bg-navy/5 p-2 text-sm">
                      <span className="font-medium text-navy">Services:</span> New applications, renewals, photos
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between mt-auto">
                    <Button variant="outline" className="rounded-xl border-navy/20 hover:bg-navy/5">
                      Get Directions
                    </Button>
                    <Button className="bg-navy hover:bg-navy/80 rounded-xl modern-button">
                      Book Appointment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="group relative grid-rows-1">
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-teal to-teal/50 opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
                <Card className="card-hover rounded-3xl border-0 shadow-lg relative bg-white h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-teal">
                      <MapPin className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl">Ghaziabad Passport Seva Kendra</CardTitle>
                    <CardDescription>Passport Seva Kendra</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 flex-grow">
                    <p className="text-sm text-muted-foreground">Vaishali, Ghaziabad, Uttar Pradesh 201010</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>1800-258-1800</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Mon-Fri: 9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="mt-2 rounded-lg bg-teal/5 p-2 text-sm">
                      <span className="font-medium text-teal">Services:</span> New applications, photos available
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between mt-auto">
                    <Button variant="outline" className="rounded-xl border-teal/20 hover:bg-teal/5">
                      Get Directions
                    </Button>
                    <Button className="bg-teal hover:bg-teal/80 rounded-xl modern-button">
                      Book Appointment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>

            <div className="mt-16 max-w-4xl mx-auto mt-8">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-navy/20 via-teal/20 to-navy/20 blur-xl opacity-50"></div>
                <Card className="rounded-3xl border-0 shadow-xl overflow-hidden relative">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-navy" />
                      Apply for Passport
                    </CardTitle>
                    <CardDescription>Choose your passport type and apply online</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Normal Passport</h3>
                        <p className="text-sm text-muted-foreground">
                          Standard processing time with regular fees. Ideal for planned travel and general purposes.
                        </p>
                        <Link href="/apply-passport">
                          <Button className="w-full bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button mt-4">
                            Apply for Normal Passport
                          </Button>
                        </Link>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Tatkal Passport</h3>
                        <p className="text-sm text-muted-foreground">
                          Expedited processing with higher fees for urgent passport requirements.
                        </p>
                        <Link href="/apply-passport">
                          <Button className="w-full bg-gradient-to-r from-burgundy to-navy text-white hover:opacity-90 rounded-xl modern-button mt-4">
                            Apply for Tatkal Passport
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
           
    </div>
  )
}