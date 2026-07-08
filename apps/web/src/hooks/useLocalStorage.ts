"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe, autosaving LocalStorage state. Renders `initialValue` on the
 * server and on first client paint (so there's no hydration mismatch),
 * then lazily hydrates from LocalStorage right after mount, and writes
 * back to LocalStorage on every subsequent change.
 *
 * @example
 * const [notes, setNotes] = useLocalStorage<Note[]>(STORAGE_KEYS.notes, []);
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from LocalStorage after mount (client-only). `setValue` and
  // `setHydrated` below are batched into a single re-render, so the
  // "persist" effect never fires with a stale (pre-hydration) value.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        setValue(JSON.parse(raw) as T);
      }
    } catch {
      // Ignore malformed/blocked storage — fall back to initialValue.
    }
    setHydrated(true);
    // Only run once per key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Persist on every change, but skip the pre-hydration render so we don't
  // clobber existing storage with `initialValue` before it's been read.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or unavailable — silently no-op, data stays in memory.
    }
  }, [key, value, hydrated]);

  return [value, setValue];
}
