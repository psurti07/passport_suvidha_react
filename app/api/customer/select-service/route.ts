import { NextRequest, NextResponse } from "next/server";
import axiosServer from "@/lib/axiosServer";

interface ServiceSelectionRequestBody {
  service_code: string;
}

// Available service codes and their names
const SERVICE_TYPES = {
  'NORMAL_36': 'Normal Passport (36 pages)',
  'NORMAL_60': 'Normal Passport (60 pages)',
  'TATKAL_36': 'Tatkal Passport (36 pages)',
  'TATKAL_60': 'Tatkal Passport (60 pages)',
};

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
    
    const body: ServiceSelectionRequestBody = await request.json();
    
    // Validate service code
    if (!body.service_code?.trim()) {
      return NextResponse.json({
        errors: {
          service_code: ["Service code is required"]
        }
      }, { status: 422 });
    }
    
    if (!Object.keys(SERVICE_TYPES).includes(body.service_code)) {
      return NextResponse.json({
        errors: {
          service_code: ["Invalid service code"]
        }
      }, { status: 422 });
    }
    
    
    try {
      const response = await axiosServer.post('/customer/select-service', body, {
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
    
  } catch (error) {
    console.error("Error selecting service:", error);
    return NextResponse.json({ 
      error: "An error occurred while selecting service" 
    }, { status: 500 });
  }
} 