const hits = new Map<string, number[]>();

const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);
  return timestamps.length > MAX_HITS;
}
