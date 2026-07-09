import { NextRequest, NextResponse } from "next/server";
import type { QuestionType } from "@b3os/core";
import { isUnlocked } from "@/lib/auth";
import { rowToQuestion } from "@/lib/mappers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_TYPES: QuestionType[] = ["text", "yesno", "scale"];

export async function GET() {
  if (!(await isUnlocked())) {
    return NextResponse.json({ error: "locked" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("questions")
    .select("*")
    .eq("is_active", true)
    .order("position", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ questions: (data ?? []).map(rowToQuestion) });
}

export async function POST(req: NextRequest) {
  if (!(await isUnlocked())) {
    return NextResponse.json({ error: "locked" }, { status: 401 });
  }

  const body = await req.json();
  const { prompt, type, emoji, allowDetail } = body ?? {};

  if (!VALID_TYPES.includes(type)) {
    return NextResponse.json({ error: "invalid_type" }, { status: 400 });
  }

  const { data: maxRow, error: maxError } = await supabaseAdmin
    .from("questions")
    .select("position")
    .order("position", { ascending: false })
    .limit(1);

  if (maxError) {
    return NextResponse.json({ error: maxError.message }, { status: 500 });
  }

  const nextPosition = (maxRow?.[0]?.position ?? 0) + 1;

  const { data, error } = await supabaseAdmin
    .from("questions")
    .insert({
      prompt,
      type,
      emoji: emoji ?? null,
      allow_detail: !!allowDetail,
      position: nextPosition,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ question: rowToQuestion(data) }, { status: 201 });
}
