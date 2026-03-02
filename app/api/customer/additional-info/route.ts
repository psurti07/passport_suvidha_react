import { NextRequest, NextResponse } from "next/server";
import axiosServer from "@/lib/axiosServer";

interface AdditionalInfoRequestBody {
  address: string;
  pin_code: string;
  city: string;
  state: string;
  gender: string;
  date_of_birth: string;
  place_of_birth: string;
}

interface ValidationErrors {
  [key: string]: string[];
}

export async function POST(request: NextRequest) {
  try {
    // Check for Authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({
        error: "Unauthorized"
      }, { status: 401 });
    }
    
    // Extract token
    const token = authHeader.split(" ")[1];
    
    const body: AdditionalInfoRequestBody = await request.json();
    
    // Validate required fields
    const errors: ValidationErrors = {};
    
    if (!body.address?.trim()) {
      errors.address = ["Address is required"];
    }
    
    if (!body.pin_code?.trim()) {
      errors.pin_code = ["PIN code is required"];
    } else if (!/^\d{6}$/.test(body.pin_code)) {
      errors.pin_code = ["Enter a valid 6-digit PIN code"];
    }
    
    if (!body.city?.trim()) {
      errors.city = ["City is required"];
    }
    
    if (!body.state?.trim()) {
      errors.state = ["State is required"];
    }
    
    if (!body.gender?.trim()) {
      errors.gender = ["Gender is required"];
    } else if (!["male", "female", "other"].includes(body.gender)) {
      errors.gender = ["Gender must be male, female, or other"];
    }
    
    if (!body.date_of_birth?.trim()) {
      errors.date_of_birth = ["Date of birth is required"];
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(body.date_of_birth)) {
      errors.date_of_birth = ["Date must be in YYYY-MM-DD format"];
    }
    
    if (!body.place_of_birth?.trim()) {
      errors.place_of_birth = ["Place of birth is required"];
    }
    
    // If there are validation errors, return them
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 422 });
    }
    
    // TODO: Uncomment this when external API is available
    try {
      const response = await axiosServer.post('/customer/additional-info', body, {
        headers: {
          'Authorization': authHeader
        }
      });
      return NextResponse.json(response.data, { status: response.status });
    } catch (apiError: any) {
      if (apiError.response) {
        return NextResponse.json(apiError.response.data, { status: apiError.response.status });
      }
      return NextResponse.json({ error: "Failed to connect to the external API" }, { status: 503 });
    }
    
    // Mock implementation
    const customer = {
      id: `CUS_${Date.now()}`,
      first_name: "Demo",
      last_name: "User",
      email: "demo@example.com",
      mobile_number: "9876543210",
      address: body.address,
      pin_code: body.pin_code,
      city: body.city,
      state: body.state,
      gender: body.gender,
      date_of_birth: body.date_of_birth,
      place_of_birth: body.place_of_birth,
      updated_at: new Date().toISOString()
    };
    
    return NextResponse.json({
      message: "Additional information saved successfully",
      customer,
      next_step: "service_selection"
    }, { status: 200 });
    
  } catch (error) {
    console.error("Error saving additional information:", error);
    return NextResponse.json({ 
      error: "An error occurred while saving additional information" 
    }, { status: 500 });
  }
} 