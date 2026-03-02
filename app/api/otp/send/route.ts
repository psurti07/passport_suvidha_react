import { NextRequest, NextResponse } from "next/server";
import axiosServer from "@/lib/axiosServer";

interface OTPSendRequestBody {
  mobile_number: string;
  purpose: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: OTPSendRequestBody = await request.json();
    
    // Validate required fields
    if (!body.mobile_number?.trim()) {
      return NextResponse.json({
        errors: {
          mobile_number: ["Mobile number is required"]
        }
      }, { status: 422 });
    }
    
    if (!/^\d{10}$/.test(body.mobile_number)) {
      return NextResponse.json({
        errors: {
          mobile_number: ["Enter a valid 10-digit mobile number"]
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
      const response = await axiosServer.post('/otp/send', {
        mobile_number: body.mobile_number,
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
    console.error("Error sending OTP:", error);
    return NextResponse.json({ 
      error: "An error occurred while sending OTP" 
    }, { status: 500 });
  }
} 