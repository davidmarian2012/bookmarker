export function normalizeUrl(url: string): string {
  if (!url) return '';

  let normalized = url.trim();

  if (!/^https?:\/\//i.test(normalized)) {
    normalized = 'https://' + normalized;
  }

  try {
    return new URL(normalized).toString();
  } catch {
    return normalized;
  }
}
