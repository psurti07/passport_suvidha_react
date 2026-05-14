import { NextRequest, NextResponse } from 'next/server';
import axiosServer from '@/lib/axiosServer';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    if (!authToken) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const response = await axiosServer.get(
      '/application-review/download',
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        responseType: 'arraybuffer',
      }
    );

    return new NextResponse(response.data, {
      status: 200,
      headers: {
        'Content-Type':
          response.headers['content-type'],
        'Content-Disposition':
          response.headers['content-disposition'],
      },
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        message: 'Failed to download file',
      },
      {
        status: 500,
      }
    );
  }
}