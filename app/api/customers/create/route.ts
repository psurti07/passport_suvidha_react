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
    const body: CustomerRequestBody = await request.json();
    
    // Validate required fields
    const errors: ValidationErrors = {};
    
    if (!body.first_name?.trim()) {
      errors.first_name = ["First name is required"];
    } else if (!/^[A-Za-z ]+$/.test(body.first_name)) {
      errors.first_name = ["First name should only contain letters"];
    }
    
    if (!body.last_name?.trim()) {
      errors.last_name = ["Last name is required"];
    } else if (!/^[A-Za-z ]+$/.test(body.last_name)) {
      errors.last_name = ["Last name should only contain letters"];
    }
    
    if (!body.email?.trim()) {
      errors.email = ["Email is required"];
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email)) {
      errors.email = ["Enter a valid email address"];
    }
    
    if (!body.mobile_number?.trim()) {
      errors.mobile_number = ["Mobile number is required"];
    } else if (!/^\d{10}$/.test(body.mobile_number)) {
      errors.mobile_number = ["Enter a valid 10-digit mobile number"];
    } else if (!/^[6-9]/.test(body.mobile_number)) {
      errors.mobile_number = ["Mobile number should start with 6, 7, 8, or 9"];
    }
    
    // If there are validation errors, return them
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 422 });
    }
    
    // Send request to the external API for customer creation
    try {
      const response = await axiosServer.post('/customers/create', body);
      return NextResponse.json(response.data, { status: response.status });
    } catch (apiError: any) {
      if (apiError.response) {
        return NextResponse.json(apiError.response.data, { status: apiError.response.status });
      }
      return NextResponse.json({ error: "Failed to connect to the external API" }, { status: 503 });
    }               
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json({ 
      error: "An error occurred while creating the customer" 
    }, { status: 500 });
  }
} 