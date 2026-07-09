"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";

/**
 * Full-screen PIN gate, outside the app shell/nav. Uses plain `fetch` (not
 * the `fetchJson` helper) because a 401 here must not trigger a redirect.
 */
export default function UnlockPage() {
  const [pin, setPin] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    if (submitting || !pin) return;
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      if (res.ok) {
        window.location.href = "/";
        return;
      }
      setError(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl bg-white p-8 text-center shadow-sm">
        <span className="text-5xl" aria-hidden>
          🔒
        </span>
        <h1 className="font-heading text-2xl font-bold text-purple-700">B3 OS</h1>
        <p className="text-sm text-stone-500">Enter your secret PIN to come in ✨</p>
        <TextInput
          accent="purple"
          type="password"
          inputMode="numeric"
          autoFocus
          value={pin}
          onChange={(event) => setPin(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="••••"
          className="text-center text-lg tracking-widest"
        />
        {error ? (
          <p className="text-sm text-pink-600">Hmm, that&apos;s not it 🙈 try again</p>
        ) : null}
        <Button
          accent="purple"
          className="w-full"
          disabled={submitting}
          onClick={handleSubmit}
        >
          {submitting ? "Unlocking…" : "Unlock ✨"}
        </Button>
      </div>
    </div>
  );
}
