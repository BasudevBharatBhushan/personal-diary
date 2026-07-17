"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SundayResetState } from "@b3os/core";
import { fetchJson } from "@/lib/fetchJson";

const EMPTY_STATE: SundayResetState = {
  checked: {},
};

const DEBOUNCE_MS = 500;

/** Manages the Sunday Reset checklist, debouncing writes to the API. */
export function useSundayReset() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const checkedRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchJson<{ state: SundayResetState }>("/api/sunday");
        if (!cancelled) {
          setChecked(data.state.checked);
          checkedRef.current = data.state.checked;
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

  const handleSetChecked = useCallback((item: string, isChecked: boolean) => {
    setChecked((prev) => {
      const next = { ...prev, [item]: isChecked };
      checkedRef.current = next;
      return next;
    });

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setSaving(true);
      try {
        const data = await fetchJson<{ state: SundayResetState }>("/api/sunday", {
          method: "PUT",
          body: JSON.stringify({ checked: checkedRef.current }),
        });
        setChecked(data.state.checked);
        checkedRef.current = data.state.checked;
      } finally {
        setSaving(false);
      }
    }, DEBOUNCE_MS);
  }, []);

  const resetAll = useCallback(async () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    
    setChecked({});
    checkedRef.current = {};
    
    setSaving(true);
    try {
      const data = await fetchJson<{ state: SundayResetState }>("/api/sunday", {
        method: "PUT",
        body: JSON.stringify({ checked: {} }),
      });
      setChecked(data.state.checked);
      checkedRef.current = data.state.checked;
    } finally {
      setSaving(false);
    }
  }, []);

  return { checked, loading, saving, setChecked: handleSetChecked, resetAll };
}
