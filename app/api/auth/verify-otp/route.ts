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
    const { mobile_number, otp } = body; // Expect 'mobile' and 'otp' from the frontend

    if (!mobile_number || !otp) {
      return NextResponse.json(
        { message: "Mobile number and OTP are required." },
        { status: 400 },
      );
    }

    // Call the external OTP verify API, mapping 'mobile' to 'mobile_number' and adding purpose="login"
    const response = await axiosServer.post<VerifyOtpApiResponse>(
      "/otp/verify",
      {
        mobile_number, // Map to the expected field name
        otp,
        purpose: "login", // Add purpose parameter as per the flow
      },
    );

    // Extract data for the response body and the token for the cookie
    const { token, ...responseData } = response.data;

    // Create the response object to send back to the client
    const nextResponse = NextResponse.json(
      {
        ...responseData,
        token, //  ADD TOKEN BACK
      },
      { status: response.status },
    );

    // Set the token in an HttpOnly cookie on the response
    nextResponse.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "lax", // Mitigate CSRF
      path: "/", // Cookie available across the entire site
      maxAge: 60 * 60, // Expires in 1 hour (adjust as needed)
    });

    return nextResponse;
  } catch (error) {
    console.error("Verify OTP API Error:", error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status || 500;
      // Try to extract the message from the external API's error response
      const externalMessage = (axiosError.response?.data as any)?.message;
      const message =
        externalMessage || "An error occurred during OTP verification.";
      // Include details in the error response if possible
      const responseData = {
        message,
        mobile_number: error.config?.data
          ? JSON.parse(error.config.data).mobile_number
          : undefined,
        // You might not want to include the OTP in the error response
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
