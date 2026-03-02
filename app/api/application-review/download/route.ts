import { NextRequest, NextResponse } from 'next/server';
import axiosServer from '@/lib/axiosServer'; // Use server-safe Axios config
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
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

    // Call the external API to fetch PDF for download
    const response = await axiosServer.get('/application-review/download', {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: 'application/pdf'
      },
      responseType: 'arraybuffer' // Important for handling binary data
    });

    // Create a new response with the PDF data
    return new NextResponse(response.data, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Application_Summary.pdf"'
      }
    });

  } catch (error) {
    console.error('Application Download API Error:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status || 500;
      const responseData = axiosError.response?.data as any;

      let message = 'An error occurred while downloading application summary.';
      if (responseData?.message) {
        message = responseData.message;
      }

      return NextResponse.json({ message }, { status });
    } else {
      return NextResponse.json(
        { message: 'An unexpected error occurred while downloading application summary.' },
        { status: 500 }
      );
    }
  }
} 