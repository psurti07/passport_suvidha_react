"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PaymentResponsePage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  const isSuccess = status === "success";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 flex items-center justify-center px-6 py-12">
      <Card className="w-full max-w-2xl rounded-[28px] border-0 shadow-[0_20px_60px_rgba(15,23,42,0.08)] overflow-hidden">
        <CardContent className="md:p-8 p-12 text-center">
          {/* Icon */}
          <div
            className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${
              isSuccess ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            ) : (
              <XCircle className="h-12 w-12 text-red-600" />
            )}
          </div>

          {/* Heading */}
          <h1
            className={`mt-6 text-4xl font-semibold ${
              isSuccess ? "gradient-heading" : "text-red-600"
            }`}
          >
            {isSuccess ? "Thank You!" : "Oops!"}
          </h1>

          {/* Message */}
          <p className="mt-4 text-base text-muted-foreground leading-8 max-w-xl mx-auto">
            {isSuccess
              ? "Your payment has been received successfully. Your passport application has been submitted successfully. Our team will contact you shortly with the next steps."
              : "We couldn't complete your payment. Please try again. If the amount was deducted, it will be refunded automatically as per your bank's processing timeline."}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-row justify-center gap-4">
            {isSuccess ? (
              <>
                <Link href="/signin">
                  <Button className="md:h-12 md:px-8 rounded-xl bg-gradient-to-r from-navy to-teal text-white shadow-lg modern-button">
                    Login Now
                  </Button>
                </Link>

                <Link href="/">
                  <Button
                    variant="outline"
                    className="md:h-12 md:px-8 rounded-xl border border-teal text-teal modern-button"
                  >
                    Back to Home
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/apply-passport">
                  <Button className="md:h-12 md:px-8 rounded-xl bg-gradient-to-r from-navy to-teal text-white shadow-lg modern-button">
                    Try Again
                  </Button>
                </Link>

                <Link href="/">
                  <Button
                    variant="outline"
                    className="md:h-12 md:px-8 rounded-xl border border-teal text-teal modern-button"
                  >
                    Back to Home
                  </Button>
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
