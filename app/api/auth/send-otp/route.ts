import { NextRequest, NextResponse } from 'next/server';
import axiosServer from '@/lib/axiosServer'; // Use server-safe Axios config
import axios, { AxiosError } from 'axios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mobile_number } = body; // Expect 'mobile' from the frontend

    if (!mobile_number) {
      return NextResponse.json(
        { message: 'Mobile number is required.' },
        { status: 400 }
      );
    }

    // Call the external OTP send API, mapping 'mobile' to 'mobile_number' and adding purpose="login"
    const response = await axiosServer.post('/otp/send', {
      mobile_number, // Map to the expected field name
      purpose: "login" // Add purpose parameter as per the flow
    });

    // Forward the successful response from the external API
    // Add the mobile number back to the response as per the example
    const responseData = { ...response.data, mobile_number };
    return NextResponse.json(responseData, { status: response.status });

  } catch (error) {
    console.error('Send OTP API Error:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status || 500;
      const responseData = axiosError.response?.data as any; // Get the full response data

      // Extract message - Check nested structure first, then top-level message, then default
      let message = 'An error occurred while sending the OTP.';
      if (responseData?.errors?.mobile_number && Array.isArray(responseData.errors.mobile_number) && responseData.errors.mobile_number.length > 0) {
        message = responseData.errors.mobile_number[0]; // Use the specific error from the array
      } else if (responseData?.message) {
        message = responseData.message; // Use the top-level message if available
      }

      // Send the extracted message back to the frontend
      return NextResponse.json({ message }, { status });
    } else {
      return NextResponse.json(
        { message: 'An unexpected internal server error occurred.' },
        { status: 500 }
      );
    }
  }
} 