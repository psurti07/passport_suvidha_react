"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PaymentResponsePage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  const isSuccess = status === "success";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200 p-6">
      
      <Card className="w-full max-w-md rounded-2xl shadow-2xl border-0 relative overflow-hidden">
        
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-green-200/40 to-blue-200/40 blur-2xl opacity-50"></div>

        <CardHeader className="text-center pb-2 relative z-10">
          
          {/* ICON */}
          <div
            className={`mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full ${
              isSuccess ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {isSuccess ? (
              <CheckCircle className="h-14 w-14 text-green-600" />
            ) : (
              <XCircle className="h-14 w-14 text-red-600" />
            )}
          </div>

          {/* TITLE */}
          <CardTitle
            className={`text-2xl font-bold ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {isSuccess ? "Payment Successful" : "Payment Failed"}
          </CardTitle>

          {/* DESCRIPTION */}
          <CardDescription className="text-gray-500 mt-2">
            {isSuccess
              ? "Your passport application has been successfully submitted."
              : "Your payment was unsuccessful. Please try again."}
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center space-y-4 relative z-10">
          
          {/* EXTRA TEXT */}
          {isSuccess ? (
            <p className="text-sm text-gray-600">
              Our team will contact you shortly. Please check your email for further instructions.
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              If the amount was deducted, it will be refunded automatically within 5-7 working days.
            </p>
          )}

          {/* BUTTONS */}
          <div className="flex flex-col gap-3 pt-4">
            
            <Link href="/">
              <Button variant="outline" className="w-full rounded-xl">
                Go to Home
              </Button>
            </Link>

            {!isSuccess && (
              <Link href="/apply-passport">
                <Button className="w-full bg-black text-white rounded-xl">
                  Try Again
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}