import { NextRequest, NextResponse } from "next/server";
import axiosServer from "@/lib/axiosServer";

interface OTPVerifyRequestBody {
  mobile_number: string;
  otp: string;
  purpose: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: OTPVerifyRequestBody = await request.json();
    
    // Validate required fields
    if (!body.mobile_number?.trim()) {
      return NextResponse.json({
        errors: {
          mobile_number: ["Mobile number is required"]
        }
      }, { status: 422 });
    }
    
    if (!body.otp?.trim()) {
      return NextResponse.json({
        errors: {
          otp: ["OTP is required"]
        }
      }, { status: 422 });
    }
    
    if (!body.purpose || !["registration", "login"].includes(body.purpose)) {
      return NextResponse.json({
        errors: {
          purpose: ["Purpose must be either 'registration' or 'login'"]
        }
      }, { status: 422 });
    }
    
    // Forward the request to the external API using axiosServer
    try {
      const response = await axiosServer.post('/otp/verify', {
        mobile_number: body.mobile_number,
        otp: body.otp,
        purpose: body.purpose
      });
      
      // Return the external API response
      return NextResponse.json(response.data, { status: response.status });
    } catch (apiError: any) {
      // Handle API error response
      if (apiError.response) {
        return NextResponse.json(
          apiError.response.data, 
          { status: apiError.response.status }
        );
      }
      
      // Handle network errors
      return NextResponse.json({ 
        error: "Failed to connect to the external API" 
      }, { status: 503 });
    }
    
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json({ 
      error: "An error occurred while verifying OTP" 
    }, { status: 500 });
  }
} 