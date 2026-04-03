import { NextRequest, NextResponse } from "next/server";
import axiosServer from "@/lib/axiosServer";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken")?.value;

    if (!authToken) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const customerId = params.id; // ✅ get ID from URL
    if (!customerId) {
      return NextResponse.json(
        { message: "Customer ID is required" },
        { status: 400 },
      );
    }
    console.log("Updating customer", customerId, "with body:", body);
    // Forward PUT to backend
    const response = await axiosServer.put(`/customers/${customerId}`, body, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Update Profile Error:", error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      let message = "Update failed";

      const responseData = axiosError.response?.data as any;

      if (responseData) {
        // ✅ Laravel validation errors
        if (responseData.errors) {
          const firstErrorKey = Object.keys(responseData.errors)[0];
          message = responseData.errors[firstErrorKey][0];
        }
        // ✅ Normal message
        else if (responseData.message) {
          message = responseData.message;
        }
        // ✅ Fallback
        else {
          message = JSON.stringify(responseData);
        }
      }

      return NextResponse.json(
        { message },
        { status: axiosError.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { message: "Unexpected error while updating profile" },
      { status: 500 },
    );
  }
}
