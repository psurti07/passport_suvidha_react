import { NextRequest, NextResponse } from "next/server";
import axiosServer from "@/lib/axiosServer"; // Use server-safe Axios config
import axios, { AxiosError } from "axios";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mobile_number } = body;

    //  Validate input
    if (!mobile_number) {
      return NextResponse.json(
        { message: "Mobile number is required." },
        { status: 400 },
      );
    }

    //  Call backend API
    const response = await axiosServer.post("/customers/login", {
      mobile_number,
    });

    //  RETURN RESPONSE (THIS WAS MISSING)
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Customer Login API Error:", error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status || 500;
      const responseData = axiosError.response?.data as any;

      let message = "An error occurred during login.";
      if (
        responseData?.errors?.mobile_number &&
        Array.isArray(responseData.errors.mobile_number)
      ) {
        message = responseData.errors.mobile_number[0];
      } else if (responseData?.message) {
        message = responseData.message;
      }

      return NextResponse.json({ message }, { status });
    }

    return NextResponse.json(
      { message: "An unexpected internal server error occurred." },
      { status: 500 },
    );
  }
}
