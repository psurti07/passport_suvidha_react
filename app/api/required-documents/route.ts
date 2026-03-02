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
        { status: 'error', message: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    const documentTypeId = request.nextUrl.searchParams.get('document_type_id');
    const isDownload = request.nextUrl.searchParams.get('download') === 'true';

    if (isDownload && documentTypeId) {
      // Handle document download
      const response = await axiosServer.get(
        `/required-documents/download/${documentTypeId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: 'application/json'
          },
          responseType: 'blob'
        }
      );

      // Get filename from Content-Disposition header or generate one
      const contentDisposition = response.headers['content-disposition'];
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : `document-${documentTypeId}.pdf`;

      // Create response with file
      return new NextResponse(response.data, {
        headers: {
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Content-Type': response.headers['content-type'] || 'application/octet-stream'
        }
      });
    }

    // Handle list documents request
    const response = await axiosServer.get('/required-documents', {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: 'application/json'
      }
    });

    return NextResponse.json(response.data, { status: 200 });

  } catch (error) {
    console.error('Documents API Error:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status || 500;
      const responseData = axiosError.response?.data as any;

      return NextResponse.json(
        { 
          status: 'error',
          message: responseData?.message || 'Failed to process request.',
          error: responseData?.error
        },
        { status }
      );
    } else {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Failed to process request.',
          error: 'An unexpected error occurred'
        },
        { status: 500 }
      );
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    if (!authToken) {
      return NextResponse.json(
        { status: 'error', message: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const documentTypeId = request.nextUrl.searchParams.get('document_type_id');

    if (!documentTypeId) {
      return NextResponse.json(
        { status: 'error', message: 'Document type ID is required.' },
        { status: 400 }
      );
    }

    const response = await axiosServer.post(
      `/required-documents/upload/${documentTypeId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json'
        }
      }
    );

    return NextResponse.json(response.data, { status: 200 });

  } catch (error) {
    console.error('Document Upload API Error:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status || 500;
      const responseData = axiosError.response?.data as any;

      return NextResponse.json(
        { 
          status: 'error',
          message: responseData?.message || 'Failed to upload document.',
          error: responseData?.error
        },
        { status }
      );
    } else {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Failed to upload document.',
          error: 'An unexpected error occurred'
        },
        { status: 500 }
      );
    }
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    if (!authToken) {
      return NextResponse.json(
        { status: 'error', message: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    const documentTypeId = request.nextUrl.searchParams.get('document_type_id');

    if (!documentTypeId) {
      return NextResponse.json(
        { status: 'error', message: 'Document type ID is required.' },
        { status: 400 }
      );
    }

    const response = await axiosServer.delete(
      `/required-documents/${documentTypeId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: 'application/json'
        }
      }
    );

    return NextResponse.json(response.data, { status: 200 });

  } catch (error) {
    console.error('Document Delete API Error:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status || 500;
      const responseData = axiosError.response?.data as any;

      return NextResponse.json(
        { 
          status: 'error',
          message: responseData?.message || 'Failed to delete document.',
          error: responseData?.error
        },
        { status }
      );
    } else {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Failed to delete document.',
          error: 'An unexpected error occurred'
        },
        { status: 500 }
      );
    }
  }
} 