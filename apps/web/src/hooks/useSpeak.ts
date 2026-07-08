"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Common female voice names across Chrome, Safari, Edge, and Android — matched case-insensitively. */
const FEMALE_VOICE_HINTS = [
  "female",
  "samantha",
  "victoria",
  "karen",
  "moira",
  "tessa",
  "susan",
  "zira",
  "salli",
  "joanna",
  "kendra",
  "kimberly",
  "ivy",
  "amy",
  "emma",
  "aria",
  "jenny",
  "michelle",
  "allison",
  "ava",
  "google us english",
  "google uk english female",
];

function pickFemaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  if (voices.length === 0) return undefined;
  const english = voices.filter((voice) => voice.lang.toLowerCase().startsWith("en"));
  const pool = english.length > 0 ? english : voices;
  return (
    pool.find((voice) => FEMALE_VOICE_HINTS.some((hint) => voice.name.toLowerCase().includes(hint))) ?? pool[0]
  );
}

/**
 * Speaks text aloud via the browser's built-in speech synthesis, preferring
 * a female-sounding voice. `supported` is false (and `speak` a no-op) when
 * the Web Speech API isn't available. `ready` flips true once voices have
 * loaded (or a short grace period has passed) so callers can wait for a
 * good voice pick instead of speaking with whatever default loads first.
 */
export function useSpeak() {
  const [supported, setSupported] = useState(false);
  const [ready, setReady] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    setSupported(true);

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        voicesRef.current = voices;
        setReady(true);
      }
    };
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    // Some browsers never fire `voiceschanged`; don't block forever on it.
    const fallback = setTimeout(() => setReady(true), 500);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      clearTimeout(fallback);
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = pickFemaleVoice(voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices());
    if (voice) utterance.voice = voice;
    utterance.rate = 0.98;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  }, []);

  return { supported, ready, speak };
}
