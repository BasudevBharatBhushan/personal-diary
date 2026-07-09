import { NextRequest, NextResponse } from "next/server";
import { isUnlocked } from "@/lib/auth";
import { JOURNAL_BUCKET, supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isUnlocked())) {
    return NextResponse.json({ error: "locked" }, { status: 401 });
  }

  const { id } = await params;

  const { data: row, error: fetchError } = await supabaseAdmin
    .from("journal_entries")
    .select("photo_paths")
    .eq("id", id)
    .maybeSingle();

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  const paths: string[] = row?.photo_paths ?? [];
  if (paths.length > 0) {
    await supabaseAdmin.storage.from(JOURNAL_BUCKET).remove(paths);
  }

  const { error: deleteError } = await supabaseAdmin
    .from("journal_entries")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
