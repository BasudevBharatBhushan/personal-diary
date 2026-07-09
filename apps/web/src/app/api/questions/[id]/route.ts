import { NextRequest, NextResponse } from "next/server";
import type { QuestionType } from "@b3os/core";
import { isUnlocked } from "@/lib/auth";
import { rowToQuestion } from "@/lib/mappers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_TYPES: QuestionType[] = ["text", "yesno", "scale"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isUnlocked())) {
    return NextResponse.json({ error: "locked" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { prompt, type, emoji, allowDetail } = body ?? {};

  if (type !== undefined && !VALID_TYPES.includes(type)) {
    return NextResponse.json({ error: "invalid_type" }, { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const update: Record<string, any> = { updated_at: new Date().toISOString() };
  if (prompt !== undefined) update.prompt = prompt;
  if (type !== undefined) update.type = type;
  if (emoji !== undefined) update.emoji = emoji;
  if (allowDetail !== undefined) update.allow_detail = !!allowDetail;

  const { data, error } = await supabaseAdmin
    .from("questions")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ question: rowToQuestion(data) });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isUnlocked())) {
    return NextResponse.json({ error: "locked" }, { status: 401 });
  }

  const { id } = await params;

  const { error } = await supabaseAdmin
    .from("questions")
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
