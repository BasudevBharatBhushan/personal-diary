import { NextRequest, NextResponse } from "next/server";
import type { TomorrowCard } from "@b3os/core";
import { isUnlocked } from "@/lib/auth";
import { rowToTomorrow } from "@/lib/mappers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMPTY_CARD: TomorrowCard = {
  dinner: "",
  productiveHour1: "",
  productiveHour2: "",
  importantThing: "",
  mood: "",
};

export async function GET() {
  if (!(await isUnlocked())) {
    return NextResponse.json({ error: "locked" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("tomorrow_card")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ card: data ? rowToTomorrow(data) : EMPTY_CARD });
}

export async function PUT(req: NextRequest) {
  if (!(await isUnlocked())) {
    return NextResponse.json({ error: "locked" }, { status: 401 });
  }

  const { dinner, productiveHour1, productiveHour2, importantThing, mood } =
    (await req.json()) as TomorrowCard;

  const { data, error } = await supabaseAdmin
    .from("tomorrow_card")
    .upsert(
      {
        singleton: true,
        dinner,
        productive_hour1: productiveHour1,
        productive_hour2: productiveHour2,
        important_thing: importantThing,
        mood,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "singleton" },
    )
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ card: rowToTomorrow(data) });
}
