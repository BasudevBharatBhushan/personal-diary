import { NextRequest, NextResponse } from "next/server";
import type { SundayResetState } from "@b3os/core";
import { isUnlocked } from "@/lib/auth";
import { rowToSundayReset } from "@/lib/mappers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMPTY_STATE: SundayResetState = {
  checked: {},
};

export async function GET() {
  if (!(await isUnlocked())) {
    return NextResponse.json({ error: "locked" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("sunday_reset")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ state: data ? rowToSundayReset(data) : EMPTY_STATE });
}

export async function PUT(req: NextRequest) {
  if (!(await isUnlocked())) {
    return NextResponse.json({ error: "locked" }, { status: 401 });
  }

  const { checked } = (await req.json()) as { checked: Record<string, boolean> };

  const { data, error } = await supabaseAdmin
    .from("sunday_reset")
    .upsert(
      {
        singleton: true,
        checked,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "singleton" },
    )
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ state: rowToSundayReset(data) });
}
