import { NextRequest, NextResponse } from "next/server";
import { isUnlocked } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!(await isUnlocked())) {
    return NextResponse.json({ error: "locked" }, { status: 401 });
  }

  const { orderedIds } = (await req.json()) as { orderedIds: string[] };

  if (!Array.isArray(orderedIds)) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const updatedAt = new Date().toISOString();

  const results = await Promise.all(
    orderedIds.map((id, index) =>
      supabaseAdmin
        .from("questions")
        .update({ position: index + 1, updated_at: updatedAt })
        .eq("id", id),
    ),
  );

  const failed = results.find((r) => r.error);
  if (failed?.error) {
    return NextResponse.json({ error: failed.error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
