import { NextRequest, NextResponse } from "next/server";
import { isUnlocked } from "@/lib/auth";
import { rowToDailyEntry } from "@/lib/mappers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ date: string }> },
) {
  if (!(await isUnlocked())) {
    return NextResponse.json({ error: "locked" }, { status: 401 });
  }

  const { date } = await params;

  const { data, error } = await supabaseAdmin
    .from("daily_entries")
    .select("*")
    .eq("entry_date", date)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ entry: data ? rowToDailyEntry(data) : null });
}
