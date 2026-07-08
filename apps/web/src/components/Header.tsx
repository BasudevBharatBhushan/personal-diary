"use client";

import { getCurrentBlock, getNextBlock, getPhaseMessage } from "@b3os/core";
import { useNow } from "@/hooks/useNow";

const DATE_FORMAT = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  weekday: "long",
  day: "numeric",
  month: "long",
});

const TIME_FORMAT = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

/**
 * The always-visible top header: app name, current date/time (Asia/Kolkata),
 * current phase, next activity, and the phase's friendly message. Ticks
 * every minute via `useNow`. Time is client-only to avoid hydration
 * mismatches — renders a neutral placeholder until mounted.
 */
export function Header() {
  const now = useNow(60_000);

  return (
    <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <span className="font-heading text-lg font-bold text-sky-600">B3 OS</span>
          {now ? (
            <span className="text-sm text-stone-500">
              {DATE_FORMAT.format(now)} &middot; {TIME_FORMAT.format(now)} IST
            </span>
          ) : (
            <span className="text-sm text-stone-400">&nbsp;</span>
          )}
        </div>

        {now ? <HeaderStatus now={now} /> : null}
      </div>
    </header>
  );
}

function HeaderStatus({ now }: { now: Date }) {
  const current = getCurrentBlock(now);
  const next = getNextBlock(now);
  const message = getPhaseMessage(current.phase);

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
      <span className="font-semibold text-stone-700">
        {message.emoji} {current.label}
      </span>
      <span className="text-stone-400">Next: {next.label}</span>
      <span className="text-stone-500 italic">{message.lines.join(" ")}</span>
    </div>
  );
}
