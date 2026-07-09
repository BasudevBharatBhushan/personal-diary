"use client";

import { useCallback, useEffect, useState } from "react";
import type { Answer, DailyEntry } from "@b3os/core";
import { fetchJson } from "@/lib/fetchJson";

export interface SubmitResult {
  ok: boolean;
  already?: boolean;
}

/** Manages a single day's reflection entry, keyed by "YYYY-MM-DD" dateKey. */
export function useDailyEntry(dateKey: string) {
  const [entry, setEntry] = useState<DailyEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJson<{ entry: DailyEntry | null }>(
        `/api/entries/${dateKey}`
      );
      setEntry(data.entry);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load entry");
    } finally {
      setLoading(false);
    }
  }, [dateKey]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const submit = useCallback(
    async (answers: Answer[]): Promise<SubmitResult> => {
      setSubmitting(true);
      setError(null);
      try {
        const data = await fetchJson<{ entry: DailyEntry }>("/api/entries", {
          method: "POST",
          body: JSON.stringify({ date: dateKey, answers }),
        });
        setEntry(data.entry);
        return { ok: true };
      } catch (e) {
        const status = (e as Error & { status?: number }).status;
        if (status === 409) {
          await refresh();
          return { ok: false, already: true };
        }
        setError(e instanceof Error ? e.message : "Failed to submit entry");
        throw e;
      } finally {
        setSubmitting(false);
      }
    },
    [dateKey, refresh]
  );

  return { entry, loading, submitting, error, submit };
}
