"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Download, FileText, Mail, Printer } from "lucide-react"

export default function MonthlyStatementPage() {
  const [selectedMonth, setSelectedMonth] = useState("march-2023")

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

  // Mock statement data
  const statements = {
    "march-2023": {
      month: "March 2023",
      totalSpent: 180.0,
      transactions: [
        {
          id: "TXN-78945612",
          date: "March 30, 2025",
          description: "Passport Application Fee - Normal Processing (60 Pages)",
          amount: 145.0,
          applicationId: "PD-2023-7845",
        },
        {
          id: "TXN-78945611",
          date: "March 30, 2025",
          description: "Biometric Processing Fee",
          amount: 35.0,
          applicationId: "PD-2023-7845",
        },
      ],
    },
    "february-2023": {
      month: "February 2023",
      totalSpent: 230.0,
      transactions: [
        {
          id: "TXN-78945610",
          date: "February 10, 2023",
          description: "Passport Application Fee - Tatkal Processing (30 Pages)",
          amount: 195.0,
          applicationId: "PD-2023-6532",
        },
        {
          id: "TXN-78945609",
          date: "February 10, 2023",
          description: "Biometric Processing Fee",
          amount: 35.0,
          applicationId: "PD-2023-6532",
        },
      ],
    },
    "december-2022": {
      month: "December 2022",
      totalSpent: 145.0,
      transactions: [
        {
          id: "TXN-78945608",
          date: "December 5, 2022",
          description: "Passport Application Fee - Normal Processing (60 Pages)",
          amount: 145.0,
          applicationId: "PD-2022-9871",
        },
      ],
    },
  }

  const currentStatement = statements[selectedMonth as keyof typeof statements]

  const handlePrint = () => {
    window.print()
  }

  const handleEmailStatement = () => {
    // In a real app, this would trigger an API call to send the statement via email
    alert("Statement has been emailed to your registered email address.")
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
          <h1 className="text-3xl font-bold tracking-tight text-navy">Monthly Statement</h1>
          <p className="text-muted-foreground">View your monthly payment statements</p>
        </div>
      </motion.div>

      {/* Month selector and actions */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="w-full sm:w-64">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="rounded-xl">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="march-2023">March 2023</SelectItem>
              <SelectItem value="february-2023">February 2023</SelectItem>
              <SelectItem value="december-2022">December 2022</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="rounded-xl border-navy/20 hover:bg-navy/5" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button
            variant="outline"
            className="rounded-xl border-navy/20 hover:bg-navy/5"
            onClick={handleEmailStatement}
          >
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
          <Button variant="outline" className="rounded-xl border-navy/20 hover:bg-navy/5">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </motion.div>

      {/* Statement card */}
      <motion.div variants={itemVariants}>
        <Card className="border-2 print:border-black">
          <CardHeader className="border-b bg-navy/5 print:bg-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle className="text-2xl">Monthly Statement</CardTitle>
                <CardDescription>{currentStatement.month}</CardDescription>
              </div>
              <div className="text-right">
                <h3 className="font-bold text-xl text-navy">Passport Agency</h3>
                <p className="text-sm text-muted-foreground">456 Government Plaza, Washington, DC 20001</p>
                <p className="text-sm text-muted-foreground">+1 (800) 555-1234</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Statement summary */}
            <div className="bg-navy/5 p-4 rounded-lg">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="font-semibold">Statement Summary</h3>
                  <p className="text-sm text-muted-foreground">For the period of {currentStatement.month}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-2xl font-bold text-navy">${currentStatement.totalSpent.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Transactions list */}
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-4">TRANSACTIONS</h3>
              <div className="space-y-4">
                {currentStatement.transactions.map((transaction) => (
                  <div key={transaction.id} className="border rounded-lg overflow-hidden">
                    <div className="p-4 flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <h4 className="font-medium">{transaction.description}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                          <span className="text-sm text-muted-foreground">•</span>
                          <p className="text-sm text-navy">
                            <Link
                              href={`/portal/applications/${transaction.applicationId}`}
                              className="hover:underline"
                            >
                              {transaction.applicationId}
                            </Link>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-semibold">${transaction.amount.toFixed(2)}</p>
                        <Button variant="ghost" size="sm" className="h-8 rounded-lg" asChild>
                          <Link href={`/portal/payments/${transaction.id}`}>
                            <FileText className="h-4 w-4 mr-2" />
                            View Receipt
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Statement total */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Total</h3>
              <p className="text-xl font-bold">${currentStatement.totalSpent.toFixed(2)}</p>
            </div>
          </CardContent>
          <CardFooter className="border-t p-6 flex flex-col gap-4">
            <div className="text-center text-sm text-muted-foreground">
              <p>This is an official statement of your payments to the Passport Agency.</p>
              <p>For any questions regarding these transactions, please contact us at payments@passportagency.gov.</p>
            </div>
            <div className="flex justify-center">
              <div className="px-4 py-2 bg-navy/10 rounded-lg text-navy text-sm font-medium">
                Thank you for your business
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Statement archive */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Statement Archive</CardTitle>
            <CardDescription>Access your previous statements</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium text-muted-foreground">Period</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Transactions</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Total Amount</th>
                    <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(statements).map(([key, statement]) => (
                    <tr
                      key={key}
                      className={`border-b hover:bg-gray-50 transition-colors ${selectedMonth === key ? "bg-navy/5" : ""}`}
                    >
                      <td className="p-4 font-medium">{statement.month}</td>
                      <td className="p-4">{statement.transactions.length} transactions</td>
                      <td className="p-4 font-medium">${statement.totalSpent.toFixed(2)}</td>
                      <td className="p-4 text-right">
                        <Button
                          variant={selectedMonth === key ? "default" : "ghost"}
                          size="sm"
                          className={`h-8 rounded-lg ${selectedMonth === key ? "bg-navy text-white" : ""}`}
                          onClick={() => setSelectedMonth(key)}
                        >
                          {selectedMonth === key ? "Viewing" : "View"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

