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

    // Get appointment ID from URL query parameters
    const { searchParams } = new URL(request.url);
    const appointmentId = searchParams.get('id');

    if (!appointmentId) {
      return NextResponse.json(
        { message: 'Appointment ID is required' },
        { status: 400 }
      );
    }

    // Call the external API to fetch specific appointment letter by ID
    const response = await axiosServer.get(`/appointment-letters/download/${appointmentId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: 'application/pdf'
      },
      responseType: 'arraybuffer' // Important for handling binary data
    });

    // Get the content type from the response
    const contentType = response.headers['content-type'] || 'application/pdf';
    
    // Get the filename from the Content-Disposition header or use a default
    const contentDisposition = response.headers['content-disposition'];
    const filename = contentDisposition
      ? contentDisposition.split('filename=')[1].replace(/"/g, '')
      : 'appointment_letter.pdf';

    // Create a new response with the file data
    return new NextResponse(response.data, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    });

  } catch (error) {
    console.error('Appointment Letter Download API Error:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status || 500;
      const responseData = axiosError.response?.data as any;

      let message = 'An error occurred while downloading appointment letter.';
      if (responseData?.message) {
        message = responseData.message;
      }

      return NextResponse.json({ message }, { status });
    } else {
      return NextResponse.json(
        { message: 'An unexpected error occurred while downloading appointment letter.' },
        { status: 500 }
      );
    }
  }
} 