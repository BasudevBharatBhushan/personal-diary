"use client";

import { useCallback, useEffect, useState } from "react";
import type { Note } from "@b3os/core";
import { fetchJson } from "@/lib/fetchJson";

/** Manages the free-form "Random Thoughts" notes list. */
export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchJson<{ notes: Note[] }>("/api/notes");
        if (!cancelled) setNotes(data.notes);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const add = useCallback(async (title: string, content: string) => {
    const data = await fetchJson<{ note: Note }>("/api/notes", {
      method: "POST",
      body: JSON.stringify({ title, content }),
    });
    setNotes((prev) => [data.note, ...prev]);
  }, []);

  const remove = useCallback(async (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    await fetchJson<{ ok: true }>(`/api/notes/${id}`, { method: "DELETE" });
  }, []);

  return { notes, loading, add, remove };
}
