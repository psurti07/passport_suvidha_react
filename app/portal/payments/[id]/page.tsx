"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, Mail, Printer, Share2 } from "lucide-react"

export default function PaymentReceiptPage({ params }: { params: { id: string } }) {
  const { id } = params

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

  // Mock payment data - in a real app, this would be fetched from an API
  const payment = {
    id: id,
    date: "March 30, 2025",
    time: "10:45 AM",
    amount: 145.0,
    description: "Passport Application Fee - Normal Processing (60 Pages)",
    method: "Credit Card (ending in 4242)",
    status: "Completed",
    applicationId: "PD-2023-7845",
    billingAddress: {
      name: "John Smith",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    items: [
      {
        description: "Passport Application Fee",
        amount: 110.0,
      },
      {
        description: "Processing Fee",
        amount: 35.0,
      },
    ],
    taxes: 0,
    total: 145.0,
    receiptNumber: "REC-2023-45678",
    merchantName: "Passport Agency",
    merchantAddress: "456 Government Plaza, Washington, DC 20001",
    merchantPhone: "+1 (800) 555-1234",
    merchantEmail: "payments@passportagency.gov",
  }

  const handlePrint = () => {
    window.print()
  }

  const handleEmailReceipt = () => {
    // In a real app, this would trigger an API call to send the receipt via email
    alert("Receipt has been emailed to your registered email address.")
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 max-w-4xl mx-auto">
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
          <h1 className="text-3xl font-bold tracking-tight text-navy">Payment Receipt</h1>
          <p className="text-muted-foreground">Transaction ID: {payment.id}</p>
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
        <Button variant="outline" className="rounded-xl border-navy/20 hover:bg-navy/5" onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" />
          Print Receipt
        </Button>
        <Button variant="outline" className="rounded-xl border-navy/20 hover:bg-navy/5" onClick={handleEmailReceipt}>
          <Mail className="h-4 w-4 mr-2" />
          Email Receipt
        </Button>
        <Button variant="outline" className="rounded-xl border-navy/20 hover:bg-navy/5">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
        <Button variant="outline" className="rounded-xl border-navy/20 hover:bg-navy/5">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </motion.div>

      {/* Receipt card */}
      <motion.div variants={itemVariants}>
        <Card className="border-2 print:border-black">
          <CardHeader className="border-b bg-navy/5 print:bg-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle className="text-2xl">Payment Receipt</CardTitle>
                <CardDescription>Receipt #{payment.receiptNumber}</CardDescription>
              </div>
              <div className="text-right">
                <h3 className="font-bold text-xl text-navy">{payment.merchantName}</h3>
                <p className="text-sm text-muted-foreground">{payment.merchantAddress}</p>
                <p className="text-sm text-muted-foreground">{payment.merchantPhone}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Transaction details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-2">TRANSACTION DETAILS</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Transaction ID:</span>
                    <span className="font-medium">{payment.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Date:</span>
                    <span className="font-medium">{payment.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Time:</span>
                    <span className="font-medium">{payment.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Status:</span>
                    <span className="font-medium text-green-600">{payment.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Payment Method:</span>
                    <span className="font-medium">{payment.method}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-2">BILLING INFORMATION</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Name:</span>
                    <span className="font-medium">{payment.billingAddress.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Address:</span>
                    <span className="font-medium">{payment.billingAddress.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">City:</span>
                    <span className="font-medium">{payment.billingAddress.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">State/Zip:</span>
                    <span className="font-medium">
                      {payment.billingAddress.state}, {payment.billingAddress.zip}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Country:</span>
                    <span className="font-medium">{payment.billingAddress.country}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Application details */}
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">APPLICATION DETAILS</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Application ID:</span>
                  <Link
                    href={`/portal/applications/${payment.applicationId}`}
                    className="font-medium text-navy hover:underline"
                  >
                    {payment.applicationId}
                  </Link>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Description:</span>
                  <span className="font-medium">{payment.description}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment breakdown */}
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-4">PAYMENT BREAKDOWN</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  {payment.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-sm">{item.description}</span>
                      <span className="font-medium">${item.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Subtotal:</span>
                    <span className="font-medium">
                      ${payment.items.reduce((total, item) => total + item.amount, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Taxes:</span>
                    <span className="font-medium">${payment.taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${payment.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t p-6 flex flex-col gap-4">
            <div className="text-center text-sm text-muted-foreground">
              <p>This is an official receipt for your payment to the Passport Agency.</p>
              <p>For any questions regarding this transaction, please contact us at {payment.merchantEmail}.</p>
            </div>
            <div className="flex justify-center">
              <div className="px-4 py-2 bg-navy/10 rounded-lg text-navy text-sm font-medium">
                Thank you for your payment
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Related transactions */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Related Transactions</CardTitle>
            <CardDescription>Other transactions for this application</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium text-muted-foreground">Transaction ID</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Description</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Amount</th>
                    <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium">TXN-78945611</td>
                    <td className="p-4">March 30, 2025</td>
                    <td className="p-4">Biometric Processing Fee</td>
                    <td className="p-4 font-medium">$35.00</td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="sm" className="h-8 rounded-lg" asChild>
                        <Link href="/portal/payments/TXN-78945611">View</Link>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

