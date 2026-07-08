"use client";

import { getCurrentBlock, getNextBlock, getPhaseMessage } from "@b3os/core";
import { Card } from "@/components/ui/Card";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { useNow } from "@/hooks/useNow";

const TIME_FORMAT = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

/**
 * The big friendly top-of-dashboard card: live Kolkata time, the current
 * phase, what's up next, and the phase's personal message. Ticks every
 * minute via `useNow`. Renders a calm skeleton until mounted so the server
 * render never shows a time value (avoids hydration mismatch).
 */
export function CurrentStatusCard() {
  const now = useNow();
  const location = useCurrentLocation();

  if (!now) {
    return (
      <Card accent="sky">
        <div className="flex flex-col gap-3 animate-pulse">
          <div className="h-4 w-32 rounded-full bg-sky-100" />
          <div className="h-10 w-40 rounded-full bg-sky-100" />
          <div className="h-6 w-56 rounded-full bg-sky-50" />
        </div>
      </Card>
    );
  }

  const currentBlock = getCurrentBlock(now);
  const nextBlock = getNextBlock(now);
  const message = getPhaseMessage(currentBlock.phase);

  return (
    <Card accent="sky">
      <p className="text-sm font-medium text-sky-600">📍 Right now in {location}</p>
      <p className="font-heading text-4xl font-bold text-sky-700 sm:text-5xl">
        {TIME_FORMAT.format(now)}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
          🕒 {currentBlock.label}
        </span>
        <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-stone-600">
          Up next · {nextBlock.label}
        </span>
      </div>

      <div className="mt-5 rounded-2xl bg-sky-50 p-4">
        <p className="text-2xl" aria-hidden>
          {message.emoji}
        </p>
        <div className="mt-1 space-y-0.5">
          {message.lines.map((line) => (
            <p key={line} className="text-stone-700">
              {line}
            </p>
          ))}
        </div>
      </div>
    </Card>
  );
}
