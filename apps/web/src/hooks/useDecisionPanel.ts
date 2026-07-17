"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { DecisionPanel } from "@b3os/core";
import { fetchJson } from "@/lib/fetchJson";

const EMPTY_PANEL: DecisionPanel = {
  dinner: "",
  productiveHour1: "",
  productiveHour2: "",
};

const DEBOUNCE_MS = 500;

/** Manages the Decision Panel, debouncing writes to the API. */
export function useDecisionPanel() {
  const [panel, setPanel] = useState<DecisionPanel>(EMPTY_PANEL);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelRef = useRef<DecisionPanel>(EMPTY_PANEL);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchJson<{ panel: DecisionPanel }>("/api/decisions");
        if (!cancelled) {
          setPanel(data.panel);
          panelRef.current = data.panel;
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
    <K extends keyof DecisionPanel>(field: K, value: DecisionPanel[K]) => {
      setPanel((prev) => {
        const next = { ...prev, [field]: value };
        panelRef.current = next;
        return next;
      });

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(async () => {
        setSaving(true);
        try {
          const data = await fetchJson<{ panel: DecisionPanel }>("/api/decisions", {
            method: "PUT",
            body: JSON.stringify(panelRef.current),
          });
          setPanel(data.panel);
          panelRef.current = data.panel;
        } finally {
          setSaving(false);
        }
      }, DEBOUNCE_MS);
    },
    []
  );

  return { panel, loading, saving, setField };
}
