import { NextRequest, NextResponse } from "next/server";
import { isUnlocked } from "@/lib/auth";
import { rowToNote } from "@/lib/mappers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isUnlocked())) {
    return NextResponse.json({ error: "locked" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ notes: (data ?? []).map(rowToNote) });
}

export async function POST(req: NextRequest) {
  if (!(await isUnlocked())) {
    return NextResponse.json({ error: "locked" }, { status: 401 });
  }

  const { title, content } = (await req.json()) as {
    title: string;
    content: string;
  };

  const { data, error } = await supabaseAdmin
    .from("notes")
    .insert({ title, content })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ note: rowToNote(data) }, { status: 201 });
}
