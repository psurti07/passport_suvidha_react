"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertTriangle, ArrowLeft, CreditCard, MoreHorizontal, Plus, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function PaymentMethodsPage() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)

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

  // Mock payment methods data
  const paymentMethods = [
    {
      id: "card-1",
      type: "Visa",
      last4: "4242",
      expMonth: "04",
      expYear: "25",
      name: "John Smith",
      isDefault: true,
    },
    {
      id: "card-2",
      type: "Mastercard",
      last4: "5678",
      expMonth: "08",
      expYear: "24",
      name: "John Smith",
      isDefault: false,
    },
  ]

  const handleDeleteCard = (cardId: string) => {
    setSelectedCardId(cardId)
    setShowDeleteDialog(true)
  }

  const confirmDeleteCard = () => {
    // In a real app, this would call an API to delete the card
    alert(`Card ${selectedCardId} would be deleted`)
    setShowDeleteDialog(false)
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-navy">Payment Methods</h1>
            <p className="text-muted-foreground">Manage your saved payment methods</p>
          </div>
          <Button className="bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl" asChild>
            <Link href="/portal/payments/add">
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Payment methods list */}
      <motion.div variants={itemVariants} className="space-y-4">
        {paymentMethods.map((card) => (
          <Card key={card.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-navy/10 p-3">
                    <CreditCard className="h-5 w-5 text-navy" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">
                        {card.type} •••• {card.last4}
                      </h3>
                      {card.isDefault && (
                        <span className="px-2 py-1 bg-navy/10 text-navy rounded-full text-xs font-medium">Default</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Expires {card.expMonth}/{card.expYear}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  {!card.isDefault && (
                    <Button variant="outline" size="sm" className="h-8 rounded-lg">
                      Set as Default
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/portal/payments/edit/${card.id}`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => handleDeleteCard(card.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* No payment methods state */}
      {paymentMethods.length === 0 && (
        <motion.div variants={itemVariants}>
          <Card className="border-dashed">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="rounded-full bg-navy/10 p-4">
                <CreditCard className="h-6 w-6 text-navy" />
              </div>
              <div>
                <h3 className="font-medium text-lg">No Payment Methods</h3>
                <p className="text-muted-foreground mt-1">You haven't added any payment methods yet.</p>
              </div>
              <Button className="bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl" asChild>
                <Link href="/portal/payments/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Information card */}
      <motion.div variants={itemVariants}>
        <Card className="bg-navy/5 border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="rounded-full bg-navy/10 p-3 mt-1">
                <CreditCard className="h-5 w-5 text-navy" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-navy">About Payment Methods</h3>
                <div className="text-muted-foreground mt-2 space-y-2">
                  <p>Payment methods added here will be available for all your passport applications and services.</p>
                  <p>
                    Your default payment method will be automatically selected when making payments, but you can always
                    choose a different method during checkout.
                  </p>
                  <p>
                    For security reasons, we don't store your complete card information. All payment processing is
                    handled securely by our payment provider.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Remove Payment Method
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this payment method? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteCard}>
              <Trash className="h-4 w-4 mr-2" />
              Remove Payment Method
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

