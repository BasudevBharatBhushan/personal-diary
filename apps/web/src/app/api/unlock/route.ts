import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  constantTimeEqual,
  createSessionToken,
} from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const THIRTY_DAYS_SECONDS = 60 * 60 * 24 * 30;

export async function POST(req: NextRequest) {
  const { pin } = await req.json();
  const isMatch = constantTimeEqual(String(pin ?? ""), process.env.APP_PIN ?? "");

  // Blunt brute-force attempts with a fixed delay regardless of outcome.
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!isMatch) {
    return NextResponse.json({ error: "bad_pin" }, { status: 401 });
  }

  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: THIRTY_DAYS_SECONDS,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { maxAge: 0, path: "/" });
  return res;
}
