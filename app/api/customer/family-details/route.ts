import { NextRequest, NextResponse } from "next/server";
import axiosServer from "@/lib/axiosServer";

interface FamilyDetailsRequestBody {
  father_name: string;
  mother_name: string;
  marital_status: string;
  spouse_name?: string;
  emergency_contact_name: string;
  emergency_contact_mobile: string;
  emergency_contact_email: string;
}

interface ValidationErrors {
  [key: string]: string[];
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    let body: FamilyDetailsRequestBody;

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

    // Father's Name
    if (!body.father_name?.trim()) {
      errors.father_name = ["Father's name is required"];
    }

    // Mother's Name
    if (!body.mother_name?.trim()) {
      errors.mother_name = ["Mother's name is required"];
    }

    // Marital Status
    if (!body.marital_status?.trim()) {
      errors.marital_status = ["Marital status is required"];
    }

    // Spouse Name (Required if married)
    if (
      body.marital_status?.toLowerCase() === "married" &&
      !body.spouse_name?.trim()
    ) {
      errors.spouse_name = ["Spouse name is required"];
    }

    // Emergency Contact Name
    if (!body.emergency_contact_name?.trim()) {
      errors.emergency_contact_name = ["Emergency contact name is required"];
    }

    // Emergency Contact Mobile
    if (!body.emergency_contact_mobile?.trim()) {
      errors.emergency_contact_mobile = [
        "Emergency contact mobile is required",
      ];
    } else if (!/^\d{10}$/.test(body.emergency_contact_mobile)) {
      errors.emergency_contact_mobile = [
        "Enter a valid 10-digit mobile number",
      ];
    } else if (!/^[6-9]/.test(body.emergency_contact_mobile)) {
      errors.emergency_contact_mobile = [
        "Mobile number should start with 6, 7, 8, or 9",
      ];
    }

    // Emergency Contact Email
    if (!body.emergency_contact_email?.trim()) {
      errors.emergency_contact_email = ["Emergency contact email is required"];
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.emergency_contact_email)
    ) {
      errors.emergency_contact_email = ["Enter a valid email address"];
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 422 });
    }

    const response = await axiosServer.post("/customer/family-details", body, {
      headers: {
        Authorization: authHeader,
      },
    });

    return NextResponse.json(response.data, {
      status: response.status,
    });
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
