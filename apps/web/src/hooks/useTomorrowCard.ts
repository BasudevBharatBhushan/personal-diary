"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TomorrowCard } from "@b3os/core";
import { fetchJson } from "@/lib/fetchJson";

const EMPTY_CARD: TomorrowCard = {
  dinner: "",
  productiveHour1: "",
  productiveHour2: "",
  importantThing: "",
  mood: "",
};

const DEBOUNCE_MS = 500;

/** Manages tonight's "Tomorrow Card", debouncing writes to the API. */
export function useTomorrowCard() {
  const [card, setCard] = useState<TomorrowCard>(EMPTY_CARD);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardRef = useRef<TomorrowCard>(EMPTY_CARD);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchJson<{ card: TomorrowCard }>("/api/tomorrow");
        if (!cancelled) {
          setCard(data.card);
          cardRef.current = data.card;
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const setField = useCallback(
    <K extends keyof TomorrowCard>(field: K, value: TomorrowCard[K]) => {
      setCard((prev) => {
        const next = { ...prev, [field]: value };
        cardRef.current = next;
        return next;
      });

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(async () => {
        setSaving(true);
        try {
          const data = await fetchJson<{ card: TomorrowCard }>("/api/tomorrow", {
            method: "PUT",
            body: JSON.stringify(cardRef.current),
          });
          setCard(data.card);
          cardRef.current = data.card;
        } finally {
          setSaving(false);
        }
      }, DEBOUNCE_MS);
    },
    []
  );

  return { card, loading, saving, setField };
}
