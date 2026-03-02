import { NextRequest, NextResponse } from 'next/server';
import axiosServer from '@/lib/axiosServer'; // Use server-safe Axios config
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Get auth token from cookies
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    if (!authToken) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get request body
    const body = await request.json();
    const { is_verified } = body;

    if (typeof is_verified !== 'boolean') {
      return NextResponse.json(
        { message: 'is_verified field is required and must be a boolean' },
        { status: 400 }
      );
    }

    // Call the external API to verify application
    const response = await axiosServer.post('/application-review/verify', 
      { is_verified },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );

    return NextResponse.json(response.data, { status: 200 });

  } catch (error) {
    console.error('Application Verify API Error:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status || 500;
      const responseData = axiosError.response?.data as any;

      let message = 'An error occurred while verifying the application.';
      if (responseData?.message) {
        message = responseData.message;
      }

      return NextResponse.json({ message }, { status });
    } else {
      return NextResponse.json(
        { message: 'An unexpected error occurred while verifying the application.' },
        { status: 500 }
      );
    }
  }
} 