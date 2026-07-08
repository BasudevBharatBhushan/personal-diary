"use client";

import { useEffect, useState } from "react";

/**
 * A ticking clock for client components. Returns the current `Date`,
 * updated every minute by default (pass a smaller `intervalMs` for a
 * seconds-resolution clock). Starts from `null` until mounted so
 * server-rendered markup never includes a time value that could mismatch
 * the client on hydration — consumers should render a neutral placeholder
 * while `now` is `null`.
 */
export function useNow(intervalMs: number = 60_000): Date | null {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return now;
}
