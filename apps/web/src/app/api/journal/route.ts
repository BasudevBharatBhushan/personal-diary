import { NextRequest, NextResponse } from "next/server";
import type { JournalEntry } from "@b3os/core";
import { isUnlocked } from "@/lib/auth";
import { JOURNAL_BUCKET, supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SIGNED_URL_TTL_SECONDS = 60 * 60; // 1 hour
const MAX_PHOTO_BYTES = 8 * 1024 * 1024; // 8 MB

async function resolvePhotoUrls(paths: string[]): Promise<string[]> {
  if (paths.length === 0) return [];

  const { data, error } = await supabaseAdmin.storage
    .from(JOURNAL_BUCKET)
    .createSignedUrls(paths, SIGNED_URL_TTL_SECONDS);

  if (error || !data) return [];

  return data
    .map((entry) => entry.signedUrl)
    .filter((url): url is string => Boolean(url));
}

function extensionFor(file: File): string {
  const nameExt = file.name.includes(".")
    ? file.name.split(".").pop()
    : undefined;
  if (nameExt) return nameExt;
  const subtype = file.type.split("/")[1];
  return subtype || "bin";
}

export async function GET() {
  if (!(await isUnlocked())) {
    return NextResponse.json({ error: "locked" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("journal_entries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const entries: JournalEntry[] = await Promise.all(
    (data ?? []).map(async (row) => ({
      id: row.id,
      body: row.body,
      photoUrls: await resolvePhotoUrls(row.photo_paths ?? []),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    })),
  );

  return NextResponse.json({ entries });
}

export async function POST(req: NextRequest) {
  if (!(await isUnlocked())) {
    return NextResponse.json({ error: "locked" }, { status: 401 });
  }

  const form = await req.formData();
  const body = String(form.get("body") ?? "");
  const files = form
    .getAll("photos")
    .filter((f): f is File => f instanceof File);

  const { data: inserted, error: insertError } = await supabaseAdmin
    .from("journal_entries")
    .insert({ body, photo_paths: [] })
    .select()
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  const entryId = inserted.id as string;
  const paths: string[] = [];

  for (const file of files) {
    if (!file.type.startsWith("image/") || file.size > MAX_PHOTO_BYTES) {
      continue;
    }

    const ext = extensionFor(file);
    const path = `${entryId}/${crypto.randomUUID()}.${ext}`;
    const buf = await file.arrayBuffer();

    const { error: uploadError } = await supabaseAdmin.storage
      .from(JOURNAL_BUCKET)
      .upload(path, buf, { contentType: file.type, upsert: false });

    if (!uploadError) {
      paths.push(path);
    }
  }

  const { data: updated, error: updateError } = await supabaseAdmin
    .from("journal_entries")
    .update({ photo_paths: paths, updated_at: new Date().toISOString() })
    .eq("id", entryId)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  const entry: JournalEntry = {
    id: updated.id,
    body: updated.body,
    photoUrls: await resolvePhotoUrls(updated.photo_paths ?? []),
    createdAt: updated.created_at,
    updatedAt: updated.updated_at,
  };

  return NextResponse.json({ entry }, { status: 201 });
}
