import { NextRequest, NextResponse } from "next/server";
import type { DecisionPanel } from "@b3os/core";
import { isUnlocked } from "@/lib/auth";
import { rowToDecisionPanel } from "@/lib/mappers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMPTY_PANEL: DecisionPanel = {
  dinner: "",
  productiveHour1: "",
  productiveHour2: "",
};

export async function GET() {
  if (!(await isUnlocked())) {
    return NextResponse.json({ error: "locked" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("decision_panel")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ panel: data ? rowToDecisionPanel(data) : EMPTY_PANEL });
}

export async function PUT(req: NextRequest) {
  if (!(await isUnlocked())) {
    return NextResponse.json({ error: "locked" }, { status: 401 });
  }

  const { dinner, productiveHour1, productiveHour2 } =
    (await req.json()) as DecisionPanel;

  const { data, error } = await supabaseAdmin
    .from("decision_panel")
    .upsert(
      {
        singleton: true,
        dinner,
        productive_hour1: productiveHour1,
        productive_hour2: productiveHour2,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "singleton" },
    )
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ panel: rowToDecisionPanel(data) });
}
