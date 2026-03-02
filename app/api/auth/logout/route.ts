import { NextRequest } from 'next/server';
import { serverLogout } from '@/lib/authUtils';

export async function POST(request: NextRequest) {
  return serverLogout();
} 