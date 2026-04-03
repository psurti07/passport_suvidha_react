import { NextRequest, NextResponse } from "next/server";
import axiosServer from "@/lib/axiosServer"; // Use server-safe Axios config
import axios, { AxiosError } from "axios";

// Define the expected response structure from the external API
interface VerifyOtpApiResponse {
  message: string;
  customer: any; // Define a proper customer type if available
  token: string;
  token_type: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await axiosServer.post("/otp/verify", {
      mobile_number: body.mobile_number,
      otp: body.otp,
      purpose: body.purpose,
    });

    // ✅ VERY IMPORTANT: return FULL response.data
    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error: any) {
    console.error("Verify OTP API Error:", error);

    if (error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
