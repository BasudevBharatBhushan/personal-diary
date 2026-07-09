/**
 * Edge-safe session token helpers.
 *
 * IMPORTANT: This module must stay edge-safe — no `next/headers`, no
 * `node:crypto`. It is imported directly by `middleware.ts` (which runs on
 * the Edge runtime) as well as by `@/lib/auth.ts` (Node runtime). Only Web
 * Crypto (`crypto.subtle`) is used here.
 */

export const SESSION_COOKIE = "b3os_session";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET environment variable is not set");
  }
  return secret;
}

function base64UrlEncode(bytes: ArrayBuffer): string {
  const arr = new Uint8Array(bytes);
  let binary = "";
  for (let i = 0; i < arr.length; i++) {
    binary += String.fromCharCode(arr[i]!);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmacSha256(key: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    encoder.encode(message),
  );
  return base64UrlEncode(signature);
}

/**
 * Constant-time string comparison. Length-safe: strings of differing
 * lengths are still compared in constant time (relative to the longer
 * string) so timing does not leak length information either.
 */
export function constantTimeEqual(a: string, b: string): boolean {
  const maxLen = Math.max(a.length, b.length);
  let mismatch = a.length === b.length ? 0 : 1;
  for (let i = 0; i < maxLen; i++) {
    const charA = i < a.length ? a.charCodeAt(i) : 0;
    const charB = i < b.length ? b.charCodeAt(i) : 0;
    mismatch |= charA ^ charB;
  }
  return mismatch === 0;
}

/**
 * Creates a signed session token: `${exp}.${sigB64Url}`.
 */
export async function createSessionToken(now?: number): Promise<string> {
  const exp = (now ?? Date.now()) + THIRTY_DAYS_MS;
  const sig = await hmacSha256(getSecret(), String(exp));
  return `${exp}.${sig}`;
}

/**
 * Verifies a session token: checks structure, signature, and expiry.
 */
export async function verifySessionToken(
  token: string | undefined,
  now?: number,
): Promise<boolean> {
  if (!token) return false;

  const dotIndex = token.indexOf(".");
  if (dotIndex <= 0 || dotIndex === token.length - 1) return false;

  const expPart = token.slice(0, dotIndex);
  const sigPart = token.slice(dotIndex + 1);

  if (!/^\d+$/.test(expPart)) return false;
  const exp = Number(expPart);
  if (!Number.isFinite(exp)) return false;

  const currentTime = now ?? Date.now();
  if (exp <= currentTime) return false;

  const expectedSig = await hmacSha256(getSecret(), String(exp));
  return constantTimeEqual(sigPart, expectedSig);
}
