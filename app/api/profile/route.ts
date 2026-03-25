import { NextRequest, NextResponse } from "next/server";
import axiosServer from "@/lib/axiosServer"; // Use server-safe Axios config
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    // Get auth token from cookies - fix Promise issue
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken")?.value;

    if (!authToken) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 },
      );
    }

    // Call the external API to fetch profile data
    // Changed from /profile to /customers/profile based on API patterns
    const response = await axiosServer.get("/profile", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Return the profile data from the external API
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Profile API Error:", error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status || 500;
      const responseData = axiosError.response?.data as any;

      // Extract error message
      let message = "An error occurred while fetching profile data.";
      if (responseData?.message) {
        message = responseData.message;
      }

      return NextResponse.json({ message }, { status });
    } else {
      return NextResponse.json(
        {
          message: "An unexpected error occurred while fetching profile data.",
        },
        { status: 500 },
      );
    }
  }
}


