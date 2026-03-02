import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export function handleUnauthorizedResponse(response: any): boolean {
  // Check if the response has the specific unauthenticated format
  if (
    response && 
    response.status_code === 401 && 
    response.message === "Unauthenticated."
  ) {
    return true;
  }
  return false;
}

export function clearAuthCookies(): void {
  const cookieStore = cookies();
  cookieStore.delete('authToken');
  // Delete any other auth-related cookies here
}

export async function serverLogout(): Promise<Response> {
  clearAuthCookies();
  return Response.json(
    { success: true, redirectUrl: '/signin' },
    { status: 200 }
  );
}