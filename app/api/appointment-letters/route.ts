import { NextRequest, NextResponse } from 'next/server';
import axiosServer from '@/lib/axiosServer'; 
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

    // Call the external API to fetch user's appointment letters
    const response = await axiosServer.get('/appointment-letters', {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: 'application/json'
      }
    });

    const responseData = response.data;
    
    // Check the data structure and format it consistently
    // This ensures our frontend always gets data in the same format
    let formattedData;
    
    // Handle different potential response formats
    if (responseData && responseData.data && Array.isArray(responseData.data.appointment_letters)) {
      // The format is as expected - pass it through
      formattedData = responseData;
    } else if (responseData && Array.isArray(responseData.data)) {
      // The data is directly in response.data
      formattedData = {
        status: 'success',
        data: {
          appointment_letters: responseData.data
        }
      };
    } else if (Array.isArray(responseData)) {
      // The response is the array itself
      formattedData = {
        status: 'success',
        data: {
          appointment_letters: responseData
        }
      };
    } else if (responseData && responseData.appointment_letters && Array.isArray(responseData.appointment_letters)) {
      // The appointment_letters is directly in the response
      formattedData = {
        status: 'success',
        data: {
          appointment_letters: responseData.appointment_letters
        }
      };
    } else {
      // Couldn't find an expected format, return empty array
      formattedData = {
        status: 'success',
        data: {
          appointment_letters: []
        }
      };
      console.warn('Unknown appointment letters response format:', responseData);
    }

    // Return the standardized response data
    return NextResponse.json(formattedData);

  } catch (error) {
    console.error('Appointment Letters API Error:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status || 500;
      const responseData = axiosError.response?.data as any;

      let message = 'An error occurred while fetching appointment letters.';
      if (responseData?.message) {
        message = responseData.message;
      }

      return NextResponse.json({ message }, { status });
    } else {
      return NextResponse.json(
        { message: 'An unexpected error occurred while fetching appointment letters.' },
        { status: 500 }
      );
    }
  }
} 