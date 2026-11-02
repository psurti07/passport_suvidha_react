const STORAGE_KEY = 'ps:attribution';
const PARAM = /^(utm_[a-z_]+|gclid|gbraid|wbraid|fbclid|msclkid)$/;
const APPLY_PATH = '/apply-passport';

const pick = (search: string) => {
  const found = new URLSearchParams();
  new URLSearchParams(search).forEach((value, key) => {
    if (PARAM.test(key)) found.set(key, value);
  });
  return found;
};

/** Campaign parameters from this session's landing URL. Campaign ids only, never form data. */
function readAttribution() {
  const current = pick(window.location.search);
  try {
    if ([...current.keys()].length) {
      sessionStorage.setItem(STORAGE_KEY, current.toString());
      return current;
    }
    return new URLSearchParams(sessionStorage.getItem(STORAGE_KEY) ?? '');
  } catch {
    return current;
  }
}

/** Adds the campaign parameters to links to Apply Now; other links are returned unchanged. */
export function withAttribution(to: string) {
  const attribution = readAttribution();
  const [pathAndQuery, hash] = to.split('#');
  const [pathname, query] = pathAndQuery.split('?');
  if (pathname !== APPLY_PATH) return to;
  const params = new URLSearchParams(query ?? '');
  attribution.forEach((value, key) => {
    if (!params.has(key)) params.set(key, value);
  });
  const qs = params.toString();
  return `${pathname}${qs ? `?${qs}` : ''}${hash ? `#${hash}` : ''}`;
}
