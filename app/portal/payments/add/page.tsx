"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CreditCard, Lock, ShieldCheck } from "lucide-react"

export default function AddPaymentMethodPage() {
  const [cardType, setCardType] = useState("credit")

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would handle the form submission
    alert("Payment method added successfully!")
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 max-w-3xl mx-auto">
      {/* Page header */}
      <motion.div variants={itemVariants} className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="rounded-full" asChild>
            <Link href="/portal/payments">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Payments
            </Link>
          </Button>
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-navy">Add Payment Method</h1>
          <p className="text-muted-foreground">Add a new payment method to your account</p>
        </div>
      </motion.div>

      {/* Payment method form */}
      <motion.div variants={itemVariants}>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Enter your payment card information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Card type selection */}
              <div className="space-y-3">
                <Label>Card Type</Label>
                <RadioGroup
                  defaultValue="credit"
                  value={cardType}
                  onValueChange={setCardType}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-navy/5 transition-colors">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit" className="cursor-pointer">
                      Credit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-navy/5 transition-colors">
                    <RadioGroupItem value="debit" id="debit" />
                    <Label htmlFor="debit" className="cursor-pointer">
                      Debit Card
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Card information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="John Smith" className="rounded-lg" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="rounded-lg pl-10" required />
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Select required>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="MM / YY" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="04/23">04/23</SelectItem>
                        <SelectItem value="05/23">05/23</SelectItem>
                        <SelectItem value="06/23">06/23</SelectItem>
                        <SelectItem value="07/23">07/23</SelectItem>
                        <SelectItem value="08/23">08/23</SelectItem>
                        <SelectItem value="09/23">09/23</SelectItem>
                        <SelectItem value="10/23">10/23</SelectItem>
                        <SelectItem value="11/23">11/23</SelectItem>
                        <SelectItem value="12/23">12/23</SelectItem>
                        <SelectItem value="01/24">01/24</SelectItem>
                        <SelectItem value="02/24">02/24</SelectItem>
                        <SelectItem value="03/24">03/24</SelectItem>
                        <SelectItem value="04/24">04/24</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <div className="relative">
                      <Input id="cvv" placeholder="123" className="rounded-lg pl-10" maxLength={4} required />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Billing address */}
              <div className="space-y-4">
                <h3 className="font-medium">Billing Address</h3>

                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="123 Main Street" className="rounded-lg" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" className="rounded-lg" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select required>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AL">Alabama</SelectItem>
                        <SelectItem value="AK">Alaska</SelectItem>
                        <SelectItem value="AZ">Arizona</SelectItem>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="CO">Colorado</SelectItem>
                        <SelectItem value="CT">Connecticut</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="WA">Washington</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" className="rounded-lg" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select defaultValue="US" required>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Set as default */}
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="defaultPayment" className="rounded border-gray-300" />
                <Label htmlFor="defaultPayment">Set as default payment method</Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                <span>Your payment information is secure and encrypted</span>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-xl border-navy/20 hover:bg-navy/5" asChild>
                  <Link href="/portal/payments">Cancel</Link>
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl"
                >
                  Save Payment Method
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </motion.div>

      {/* Security information */}
      <motion.div variants={itemVariants}>
        <Card className="bg-navy/5 border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="rounded-full bg-navy/10 p-4">
                <Lock className="h-6 w-6 text-navy" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-navy">Secure Payment Processing</h3>
                <p className="text-muted-foreground mt-2">
                  Your payment information is protected with industry-standard encryption. We never store your full card
                  details on our servers. All transactions are processed securely through our payment gateway.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

