// Simple token management utilities

// Save token to local storage with expiry time (default 1 hour)
export const saveToken = (token: string, expiryHours: number = 1) => {
  if (typeof window === 'undefined') return;
  
  const expiryTime = Date.now() + expiryHours * 60 * 60 * 1000;
  
  localStorage.setItem('authToken', token);
  localStorage.setItem('authTokenExpiry', expiryTime.toString());
};

// Get token from local storage
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  const token = localStorage.getItem('authToken');
  const expiry = localStorage.getItem('authTokenExpiry');
  
  // If token exists and is not expired, return it
  if (token && expiry && parseInt(expiry) > Date.now()) {
    return token;
  }
  
  // If token is expired, clear it
  if (token) {
    clearToken();
  }
  
  return null;
};

// Clear token from local storage
export const clearToken = () => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('authToken');
  localStorage.removeItem('authTokenExpiry');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getToken() !== null;
};

// Add token to request headers
export const addAuthHeader = (headers: HeadersInit = {}): HeadersInit => {
  const token = getToken();
  
  if (!token) return headers;
  
  return {
    ...headers,
    'Authorization': `Bearer ${token}`
  };
}; 