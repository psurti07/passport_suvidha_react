/**
 * Handle API response that indicates authentication issues
 * @param response The API response object
 * @returns true if auth error was detected and handled
 */
export async function handleApiAuthError(response: any): Promise<boolean> {
  // Check if response has the specific unauthenticated format
  if (
    response && 
    response.status_code === 401 && 
    response.message === "Unauthenticated."
  ) {
    await clientLogout();
    return true;
  }
  return false;
}

/**
 * Client-side logout function that makes a request to the logout API
 * and redirects to the signin page
 */
export async function clientLogout(): Promise<void> {
  try {
    // Make request to logout API endpoint
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await res.json();
    
    // Redirect to signin page
    window.location.href = data.redirectUrl || '/signin';
  } catch (error) {
    console.error('Logout failed:', error);
    // Fallback redirect
    window.location.href = '/signin';
  }
} 