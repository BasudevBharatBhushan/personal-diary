"use client";

import { useEffect, useRef } from "react";
import { getCurrentBlock, getGreetingSentence, getNextBlock, getPhaseMessage } from "@b3os/core";
import { useNow } from "@/hooks/useNow";
import { useSpeak } from "@/hooks/useSpeak";

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
  const { supported, speak } = useSpeak();
  const hasGreetedRef = useRef(false);

  // Browsers only let speech synthesis produce sound after a user gesture
  // on the page, so a plain speak-on-mount call is silently swallowed.
  // Greet on the very first interaction anywhere on the page instead —
  // the closest thing to "on load" that actually works.
  useEffect(() => {
    if (!supported) return;

    const greetOnce = () => {
      if (hasGreetedRef.current) return;
      hasGreetedRef.current = true;
      speak(getGreetingSentence(new Date()));
    };

    const events = ["pointerdown", "keydown", "touchstart"] as const;
    events.forEach((event) => document.addEventListener(event, greetOnce));
    return () => events.forEach((event) => document.removeEventListener(event, greetOnce));
  }, [supported, speak]);

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

        {now ? <HeaderStatus now={now} onReplay={supported ? () => speak(getGreetingSentence(now)) : undefined} /> : null}
      </div>
    </header>
  );
}

function HeaderStatus({ now, onReplay }: { now: Date; onReplay?: () => void }) {
  const current = getCurrentBlock(now);
  const next = getNextBlock(now);
  const message = getPhaseMessage(current.phase);

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
      <span className="font-semibold text-stone-700">
        {message.emoji} {current.label}
      </span>
      <span className="text-stone-400">Next: {next.label}</span>
      <span className="animate-pulse bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 bg-clip-text font-semibold text-transparent">
        ✨ {getGreetingSentence(now)}
      </span>
      {onReplay ? (
        <button
          type="button"
          onClick={onReplay}
          aria-label="Read the greeting aloud"
          title="Read aloud"
          className="cursor-pointer rounded-full px-1.5 py-0.5 text-stone-400 transition-colors hover:bg-sky-50 hover:text-sky-600"
        >
          🔊
        </button>
      ) : null}
    </div>
  );
}
