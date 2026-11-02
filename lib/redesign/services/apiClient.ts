/**
 * Minimal fetch wrapper for the existing backend.
 * The base URL comes from VITE_API_BASE_URL — never hard-code backend URLs.
 */

export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(/\/$/, '');

/** True when the app should use local mock adapters instead of the real API. */
export const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS !== 'false' || !API_BASE_URL;

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type Query = Record<string, string | number | undefined | null>;

function buildUrl(path: string, query?: Query, sameOrigin = false): string {
  const base = sameOrigin ? '' : API_BASE_URL;
  const url = new URL(`${base}${path.startsWith('/') ? path : `/${path}`}`, window.location.origin);
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v));
    });
  }
  return url.toString();
}

export async function apiRequest<T>(
  path: string,
  options: { method?: string; query?: Query; body?: unknown; signal?: AbortSignal; headers?: Record<string, string>; sameOrigin?: boolean } = {},
): Promise<T> {
  const { method = 'GET', query, body, signal, headers, sameOrigin = false } = options;
  const res = await fetch(buildUrl(path, query, sameOrigin), {
    method,
    signal,
    headers: {
      Accept: 'application/json',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    // Uncomment if the backend uses cookie/session auth (e.g. Laravel Sanctum):
    // credentials: 'include',
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  const data = text ? safeJson(text) : undefined;
  if (!res.ok) throw new ApiError(`Request failed: ${res.status}`, res.status, data);
  return data as T;
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
