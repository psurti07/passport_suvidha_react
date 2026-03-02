"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CreditCard, Search, Filter, Download, FileText, ChevronRight, ChevronLeft, Calendar } from "lucide-react"

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")

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

  // Mock payment data
  const payments = [
    {
      id: "TXN-78945612",
      date: "March 30, 2025",
      amount: 145.0,
      description: "Passport Application Fee - Normal Processing (60 Pages)",
      method: "Credit Card (ending in 4242)",
      status: "Completed",
      applicationId: "PD-2023-7845",
    },
    {
      id: "TXN-78945611",
      date: "March 30, 2025",
      amount: 35.0,
      description: "Biometric Processing Fee",
      method: "Credit Card (ending in 4242)",
      status: "Completed",
      applicationId: "PD-2023-7845",
    },
    {
      id: "TXN-78945610",
      date: "February 10, 2023",
      amount: 195.0,
      description: "Passport Application Fee - Tatkal Processing (30 Pages)",
      method: "Credit Card (ending in 4242)",
      status: "Completed",
      applicationId: "PD-2023-6532",
    },
    {
      id: "TXN-78945609",
      date: "February 10, 2023",
      amount: 35.0,
      description: "Biometric Processing Fee",
      method: "Credit Card (ending in 4242)",
      status: "Completed",
      applicationId: "PD-2023-6532",
    },
    {
      id: "TXN-78945608",
      date: "December 5, 2022",
      amount: 145.0,
      description: "Passport Application Fee - Normal Processing (60 Pages)",
      method: "Credit Card (ending in 4242)",
      status: "Completed",
      applicationId: "PD-2022-9871",
    },
  ]

  const filteredPayments = payments.filter(
    (payment) =>
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.applicationId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calculate totals
  const totalSpent = payments.reduce((total, payment) => total + payment.amount, 0)

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      {/* Page header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-navy">Payment History</h1>
          <p className="text-muted-foreground">View and manage your payment transactions</p>
        </div>
        <Button variant="outline" className="rounded-xl border-navy/20 hover:bg-navy/5">
          <Download className="h-4 w-4 mr-2" />
          Download Statement
        </Button>
      </motion.div>

      {/* Payment summary */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">Across all applications</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Recent Transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${payments[0].amount.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">{payments[0].date}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Visa •••• 4242</div>
              <p className="text-xs text-muted-foreground mt-1">Default payment method</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Search and filter */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions by ID, description, or application"
            className="pl-10 rounded-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="rounded-xl border-navy/20 hover:bg-navy/5">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </motion.div>

      {/* Transactions list */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>View all your payment transactions</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium text-muted-foreground">Transaction ID</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Description</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Application</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Amount</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium">{payment.id}</td>
                      <td className="p-4">{payment.date}</td>
                      <td className="p-4">{payment.description}</td>
                      <td className="p-4">
                        <Link
                          href={`/portal/applications/${payment.applicationId}`}
                          className="text-navy hover:underline"
                        >
                          {payment.applicationId}
                        </Link>
                      </td>
                      <td className="p-4 font-medium">${payment.amount.toFixed(2)}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                          {payment.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full" asChild>
                          <Link href={`/portal/payments/${payment.id}`}>
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download Receipt</span>
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{filteredPayments.length}</span> of{" "}
                <span className="font-medium">{filteredPayments.length}</span> transactions
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-lg" disabled>
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="rounded-lg" disabled>
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Payment methods */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Manage your saved payment methods</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-navy/10 p-3">
                    <CreditCard className="h-5 w-5 text-navy" />
                  </div>
                  <div>
                    <h3 className="font-medium">Visa ending in 4242</h3>
                    <p className="text-sm text-muted-foreground">Expires 04/25</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-navy/10 text-navy rounded-full text-xs font-medium">Default</span>
                  <Button variant="ghost" size="sm" className="h-8 rounded-lg">
                    Edit
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-navy/10 p-3">
                    <CreditCard className="h-5 w-5 text-navy" />
                  </div>
                  <div>
                    <h3 className="font-medium">Mastercard ending in 5678</h3>
                    <p className="text-sm text-muted-foreground">Expires 08/24</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 rounded-lg">
                    Set as Default
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 rounded-lg">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t p-6">
            <Button className="bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl">
              <CreditCard className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Billing information */}
      <motion.div variants={itemVariants}>
        <Card className="bg-navy/5 border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-navy">Need a Receipt?</h3>
                <p className="text-muted-foreground mt-2">
                  You can download receipts for any of your transactions. These receipts can be used for reimbursement
                  or tax purposes.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-xl border-navy/20 hover:bg-navy/5" asChild>
                  <Link href="/portal/payments/statement">
                    <Calendar className="h-4 w-4 mr-2" />
                    Monthly Statement
                  </Link>
                </Button>
                <Button className="bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl" asChild>
                  <Link href="/portal/support">
                    <FileText className="h-4 w-4 mr-2" />
                    Request Custom Receipt
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

