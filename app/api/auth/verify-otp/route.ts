import { NextRequest, NextResponse } from "next/server";
import axiosServer from "@/lib/axiosServer";
import axios, { AxiosError } from "axios";

interface VerifyOtpApiResponse {
  message: string;
  customer: any;
  token: string;
  token_type: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mobile_number, otp } = body;

    if (!mobile_number || !otp) {
      return NextResponse.json(
        { message: "Mobile number and OTP are required." },
        { status: 400 },
      );
    }

    const response = await axiosServer.post<VerifyOtpApiResponse>(
      "/otp/verify",
      {
        mobile_number,
        otp,
        purpose: "login",
      },
    );

    const { token, ...responseData } = response.data;

    const nextResponse = NextResponse.json(
      {
        ...responseData,
        token,
      },
      { status: response.status },
    );

    // Set the token in an HttpOnly cookie on the response
    nextResponse.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "lax", // Mitigate CSRF
      path: "/", // Cookie available across the entire site
      maxAge: 60 * 60 * 2, // Expires in 2 hour (adjust as needed)
    });

    return nextResponse;
  } catch (error) {
    console.error("Verify OTP API Error:", error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status || 500;

      const externalMessage = (axiosError.response?.data as any)?.message;
      const message =
        externalMessage || "An error occurred during OTP verification.";

      const responseData = {
        message,
        mobile_number: error.config?.data
          ? JSON.parse(error.config.data).mobile_number
          : undefined,
      };
      return NextResponse.json(responseData, { status });
    } else {
      return NextResponse.json(
        { message: "An unexpected internal server error occurred." },
        { status: 500 },
      );
    }
  }
}
