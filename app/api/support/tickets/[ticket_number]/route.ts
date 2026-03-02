import { NextRequest, NextResponse } from 'next/server';
import axiosServer from '@/lib/axiosServer'; // Use server-safe Axios config
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';

interface Params {
  ticket_number: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { ticket_number } = params;

  if (!ticket_number) {
    return NextResponse.json({ message: 'Ticket number is required.' }, { status: 400 });
  }

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

    // 2. Call the external support ticket API (GET request for a specific ticket)
    const response = await axiosServer.get(`/support/tickets/${ticket_number}`, {
      headers: {
        'Authorization': `Bearer ${token.value}`, // Add the Bearer token header
        'Accept': 'application/json', // Often needed for APIs
      },
    });

    // 3. Forward the successful response from the external API
    // The external API seems to wrap the ticket in a "data" object,
    // so we forward the whole response. The frontend will handle extracting it.
    return NextResponse.json(response.data, { status: response.status });

  } catch (error) {
    console.error(`Get Support Ticket (${ticket_number}) API Error:`, error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status || 500;
      const externalMessage = (axiosError.response?.data as any)?.message;
      // Handle 404 specifically
      if (status === 404) {
         return NextResponse.json({ message: 'Ticket not found.' }, { status: 404 });
      }
      const message = externalMessage || `An error occurred while fetching ticket ${ticket_number}.`;
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