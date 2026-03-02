import { NextRequest, NextResponse } from 'next/server';
import axiosServer from '@/lib/axiosServer'; // Use server-safe Axios config
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers'; // Import cookies

export async function GET(request: NextRequest) {
  try {
    // 1. Get auth token from HttpOnly cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken'); // <<< Replace 'authToken' if your cookie has a different name

    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required.' },
        { status: 401 }
      );
    }

    // 2. Call the external support ticket API (GET request)
    // You might need to handle query parameters for pagination if your external API supports it
    // Example: const { searchParams } = new URL(request.url); const page = searchParams.get('page');
    const response = await axiosServer.get('/support/tickets', {
      headers: {
        'Authorization': `Bearer ${token.value}`, // Add the Bearer token header
        'Accept': 'application/json', // Often needed for APIs
      },
      // params: { page } // Example: Pass pagination parameter if needed
    });

    // 3. Forward the successful response from the external API
    return NextResponse.json(response.data, { status: response.status });

  } catch (error) {
    console.error('Get Support Tickets API Error:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status || 500;
      const externalMessage = (axiosError.response?.data as any)?.message;
      const message = externalMessage || 'An error occurred while fetching support tickets.';
      return NextResponse.json({ message }, { status });
    } else {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected internal server error occurred.';
      return NextResponse.json(
        { message: errorMessage },
        { status: 500 }
      );
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Get auth token from HttpOnly cookie
    const cookieStore = await cookies(); // Await the promise
    const token = cookieStore.get('authToken'); // <<< Replace 'authToken' if your cookie has a different name

    // 2. Get request body
    const body = await request.json();
    const { subject, message, ...additionalData } = body;

    if (!subject || !message) {
      return NextResponse.json(
        { message: 'Subject and message are required.' },
        { status: 400 }
      );
    }

    // If not authenticated, check for additional data
    if (!token && Object.keys(additionalData).length === 0) {
      return NextResponse.json(
        { message: 'Authentication required.' },
        { status: 401 }
      );
    }
    
    // Define headers based on whether additional data is available
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // Only add Authorization header if no additional data AND token exists
    if (Object.keys(additionalData).length === 0 && token) {
      headers['Authorization'] = `Bearer ${token.value}`;
    }
    
    // 3. Call the external support ticket API
    const response = await axiosServer.post('/support/tickets',
      {
        subject,
        message,
        ...additionalData
      },
      { headers }
    );

    // 4. Forward the successful response from the external API
    return NextResponse.json(response.data, { status: response.status });

  } catch (error) {
    console.error('Support Ticket API Error:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status || 500;
      // Try to extract the message from the external API's error response
      const externalMessage = (axiosError.response?.data as any)?.message;
      const message = externalMessage || 'An error occurred while submitting the support ticket.';
      return NextResponse.json({ message }, { status });
    } else {
      // Handle non-Axios errors (e.g., error reading cookies, JSON parsing)
      const errorMessage = error instanceof Error ? error.message : 'An unexpected internal server error occurred.';
      return NextResponse.json(
        { message: errorMessage },
        { status: 500 }
      );
    }
  }
} 