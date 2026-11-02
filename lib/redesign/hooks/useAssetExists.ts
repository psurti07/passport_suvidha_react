import { useEffect, useState } from 'react';

export type AssetStatus = 'checking' | 'available' | 'missing';

const cache = new Map<string, Promise<boolean>>();

/**
 * Checks whether a static file exists without downloading it (HEAD request).
 * The Content-Type check matters: SPA servers (Vite dev, Laravel catch-all
 * routes) often answer missing files with index.html and a 200 status.
 */
export function checkAsset(url: string, typePrefix: string): Promise<boolean> {
  const key = `${typePrefix}|${url}`;
  let pending = cache.get(key);
  if (!pending) {
    pending = fetch(url, { method: 'HEAD' })
      .then((res) => res.ok && (res.headers.get('content-type') ?? '').startsWith(typePrefix))
      .catch(() => false);
    cache.set(key, pending);
  }
  return pending;
}

export function useAssetExists(url: string | undefined, typePrefix: 'video/' | 'image/'): AssetStatus {
  const [status, setStatus] = useState<AssetStatus>(url ? 'checking' : 'missing');
  useEffect(() => {
    if (!url) {
      setStatus('missing');
      return;
    }
    let active = true;
    setStatus('checking');
    checkAsset(url, typePrefix).then((ok) => {
      if (active) setStatus(ok ? 'available' : 'missing');
    });
    return () => {
      active = false;
    };
  }, [url, typePrefix]);
  return status;
}
