import { NextRequest, NextResponse } from "next/server";
import axiosServer from "@/lib/axiosServer";

interface CustomerRequestBody {
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
}

interface ValidationErrors {
  [key: string]: string[];
}

export async function POST(request: NextRequest) {
  try {
    let body: CustomerRequestBody;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const errors: ValidationErrors = {};

    if (!body.first_name?.trim()) {
      errors.first_name = ["First name is required"];
    } else if (!/^[A-Za-z ]+$/.test(body.first_name)) {
      errors.first_name = ["Only letters allowed"];
    }

    if (!body.last_name?.trim()) {
      errors.last_name = ["Last name is required"];
    }

    if (!body.email?.trim()) {
      errors.email = ["Email is required"];
    }

    if (!body.mobile_number?.trim()) {
      errors.mobile_number = ["Mobile number is required"];
    } else if (!/^\d{10}$/.test(body.mobile_number)) {
      errors.mobile_number = ["Enter a valid 10-digit mobile number"];
    } else if (!/^[6-9]/.test(body.mobile_number)) {
      errors.mobile_number = ["Mobile number should start with 6, 7, 8, or 9"];
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 422 });
    }

    const response = await axiosServer.post("/customers/create", body);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error("ERROR:", error);

    if (error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }

    return NextResponse.json(
      {
        message: error?.message || "Internal server error",
      },
      { status: 500 },
    );
  }
}
