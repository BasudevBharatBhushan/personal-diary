"use client";

import { useCallback, useEffect, useState } from "react";
import type { JournalEntry } from "@b3os/core";
import { fetchJson } from "@/lib/fetchJson";

/** Manages journal entries with optional embedded photos. */
export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchJson<{ entries: JournalEntry[] }>("/api/journal");
        if (!cancelled) setEntries(data.entries);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const add = useCallback(async (body: string, files: File[]) => {
    setAdding(true);
    try {
      const formData = new FormData();
      formData.append("body", body);
      for (const file of files) {
        formData.append("photos", file);
      }
      const data = await fetchJson<{ entry: JournalEntry }>("/api/journal", {
        method: "POST",
        body: formData,
      });
      setEntries((prev) => [data.entry, ...prev]);
    } finally {
      setAdding(false);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    await fetchJson<{ ok: true }>(`/api/journal/${id}`, { method: "DELETE" });
  }, []);

  return { entries, loading, adding, add, remove };
}
