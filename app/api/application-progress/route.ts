import { NextRequest, NextResponse } from "next/server";
import axiosServer from '@/lib/axiosServer';
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { ApplicationProgress } from "@/app/types/application";
import { handleUnauthorizedResponse } from "@/lib/authUtils";

export async function GET(request: NextRequest) {
  try {
    // 1. Get auth token from HttpOnly cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken');

    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required.', status_code: 401 },
        { status: 401 }
      );
    }

    // 2. Call the external application progress API
    const response = await axiosServer.get('/application-progress', {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json',
      }
    });

    // 3. Process the data to ensure it matches our expected format
    const data = response.data;
    
    // Ensure the data is in the format expected by the frontend
    const processedData: ApplicationProgress = {
      progress_percentage: data.progress_percentage || 0,
      estimated_completion: data.estimated_completion || "Unknown",
      stages: Array.isArray(data.stages) ? data.stages.map((stage: any) => ({
        title: stage.title || "",
        description: stage.description || "",
        date: stage.date || "",
        completed: Boolean(stage.completed)
      })) : [],
      current_stage: data.current_stage || "",
      created_at: data.created_at || new Date().toISOString()
    };

    // 4. Return the processed data
    return NextResponse.json(processedData);
    
  } catch (error) {
    console.error('Application Progress API Error:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status || 500;
      
      // Get the error response from the external API
      const responseData = axiosError.response?.data as any;
      
      // Check for the specific unauthenticated error format
      if (handleUnauthorizedResponse(responseData)) {
        // Pass the same error structure to the client
        return NextResponse.json(
          responseData,
          { status: 401 }
        );
      }
      
      const externalMessage = responseData?.message;
      const message = externalMessage || 'An error occurred while fetching application progress.';
      return NextResponse.json(
        { message, status_code: status },
        { status }
      );
    } else {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected internal server error occurred.';
      return NextResponse.json(
        { message: errorMessage, status_code: 500 },
        { status: 500 }
      );
    }
  }
} 