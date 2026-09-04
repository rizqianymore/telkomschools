// lib/rateLimit.ts
// Simple in‑memory rate limiter (no external dependencies)
// Limits to 60 requests per minute per IP address.

type RateInfo = {
  count: number;
  reset: number; // timestamp (ms) when count resets
};

const LIMIT = 60;
const WINDOW_MS = 60 * 1000; // 1 minute

const ipMap = new Map<string, RateInfo>();

/**
 * Throws an Error when the request exceeds the rate limit.
 * Use in API routes: await runRateLimit(request);
 */
export async function runRateLimit(req: Request) {
  const ip = (req as any).socket?.remoteAddress || 'unknown';
  const now = Date.now();
  let info = ipMap.get(ip);
  if (!info) {
    info = { count: 1, reset: now + WINDOW_MS };
    ipMap.set(ip, info);
    return;
  }
  if (now > info.reset) {
    // reset window
    info.count = 1;
    info.reset = now + WINDOW_MS;
    return;
  }
  if (info.count >= LIMIT) {
    throw new Error('Rate limit exceeded');
  }
  info.count++;
}
