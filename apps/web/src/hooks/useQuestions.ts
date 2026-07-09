"use client";

import { useCallback, useEffect, useState } from "react";
import type { Question, QuestionType } from "@b3os/core";
import { fetchJson } from "@/lib/fetchJson";

export interface CreateQuestionInput {
  prompt: string;
  type: QuestionType;
  emoji?: string | null;
  allowDetail?: boolean;
}

export interface UpdateQuestionInput {
  prompt?: string;
  type?: QuestionType;
  emoji?: string | null;
  allowDetail?: boolean;
}

/** Manages the active reflection question list. */
export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJson<{ questions: Question[] }>("/api/questions");
      setQuestions(data.questions);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load questions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = useCallback(
    async (input: CreateQuestionInput) => {
      await fetchJson<{ question: Question }>("/api/questions", {
        method: "POST",
        body: JSON.stringify(input),
      });
      await refresh();
    },
    [refresh]
  );

  const update = useCallback(
    async (id: string, patch: UpdateQuestionInput) => {
      await fetchJson<{ question: Question }>(`/api/questions/${id}`, {
        method: "PATCH",
        body: JSON.stringify(patch),
      });
      await refresh();
    },
    [refresh]
  );

  const remove = useCallback(async (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    await fetchJson<{ ok: true }>(`/api/questions/${id}`, { method: "DELETE" });
  }, []);

  const reorder = useCallback(
    async (orderedIds: string[]) => {
      setQuestions((prev) => {
        const byId = new Map(prev.map((q) => [q.id, q]));
        const next = orderedIds
          .map((id) => byId.get(id))
          .filter((q): q is Question => Boolean(q));
        // Include any questions not present in orderedIds, preserving them at the end.
        const remaining = prev.filter((q) => !orderedIds.includes(q.id));
        return [...next, ...remaining];
      });
      await fetchJson<{ ok: true }>("/api/questions/reorder", {
        method: "POST",
        body: JSON.stringify({ orderedIds }),
      });
      await refresh();
    },
    [refresh]
  );

  return { questions, loading, error, create, update, remove, reorder, refresh };
}
