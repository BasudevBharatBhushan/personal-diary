import { NextRequest, NextResponse } from "next/server";
import type { Answer } from "@b3os/core";
import { isUnlocked } from "@/lib/auth";
import { rowToDailyEntry } from "@/lib/mappers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!(await isUnlocked())) {
    return NextResponse.json({ error: "locked" }, { status: 401 });
  }

  const { date, answers } = (await req.json()) as {
    date: string;
    answers: Answer[];
  };

  const { data, error } = await supabaseAdmin
    .from("daily_entries")
    .insert({ entry_date: date, answers })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "already_submitted" }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ entry: rowToDailyEntry(data) }, { status: 201 });
}
