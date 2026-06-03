"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import axiosServer from "@/lib/axiosServer";

import { CheckCircle, XCircle, Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function StarOfferResponsePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");

  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading",
  );

  const orderId =
    searchParams.get("order_id") || localStorage.getItem("phonepe_order_id");

  // const [status, setStatus] = useState<"loading" | "success" | "failed">(
  //   "loading",
  // );

  useEffect(() => {
    if (statusParam === "success") {
      setStatus("success");
      return;
    }

    if (statusParam === "failed") {
      setStatus("failed");
      return;
    }

    if (!orderId) {
      setStatus("failed");
      return;
    }

    let attempts = 0;

    const interval = setInterval(async () => {
      try {
        attempts++;

        const { data } = await axiosServer.post("/check-phonepe-status", {
          order_id: orderId,
        });

        if (data.status === "success") {
          clearInterval(interval);

          localStorage.removeItem("phonepe_order_id");

          setStatus("success");

          router.replace("/staroffer-response?status=success");

          return;
        }

        if (data.status === "failed") {
          clearInterval(interval);

          localStorage.removeItem("phonepe_order_id");

          setStatus("failed");

          router.replace("/staroffer-response?status=failed");

          return;
        }

        if (attempts >= 40) {
          clearInterval(interval);
          setStatus("failed");
        }
      } catch (error) {
        console.error(error);

        clearInterval(interval);

        setStatus("failed");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [statusParam, orderId, router]);

  useEffect(() => {
    if (!statusParam) return;

    if (statusParam === "success") {
      setStatus("success");
      localStorage.removeItem("phonepe_order_id");
      return;
    }

    if (statusParam === "failed") {
      setStatus("failed");
      localStorage.removeItem("phonepe_order_id");
      return;
    }
  }, [statusParam]);

  useEffect(() => {
    if (statusParam) return;

    if (!orderId) {
      setStatus("failed");
      return;
    }

    // polling logic here
  }, [statusParam, orderId]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin" />
          <p className="text-gray-600">Verifying payment...</p>
        </div>
      </div>
    );
  }

  const isSuccess = status === "success";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200 p-6">
      <Card className="w-full max-w-md rounded-2xl shadow-2xl border-0 relative overflow-hidden">
        <div className="absolute -inset-1 bg-gradient-to-r from-green-200/40 to-blue-200/40 blur-2xl opacity-50"></div>

        <CardHeader className="text-center pb-2 relative z-10">
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

          <CardTitle
            className={`text-2xl font-bold ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {isSuccess ? "Payment Successful" : "Payment Failed"}
          </CardTitle>

          <CardDescription className="text-gray-500 mt-2">
            {isSuccess
              ? "Your passport application has been successfully submitted."
              : "Your payment was unsuccessful. Please try again."}
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center space-y-4 relative z-10">
          {isSuccess ? (
            <p className="text-sm text-gray-600">
              Our team will contact you shortly. Please check your email for
              further instructions.
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              If the amount was deducted, it will be automatically refunded as
              per PhonePe's settlement process.
            </p>
          )}

          <div className="flex flex-col gap-3 pt-4">
            <Link href="/">
              <Button variant="outline" className="w-full rounded-xl">
                Go to Home
              </Button>
            </Link>

            {!isSuccess && (
              <Link href="/staroffer">
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
