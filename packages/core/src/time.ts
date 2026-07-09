import { SCHEDULE } from "./schedule";
import { PHASE_MESSAGES } from "./messages";
import type { Phase, PhaseMessage, TimelineBlock } from "./types";

const KOLKATA_TZ = "Asia/Kolkata";

/** Current wall-clock time in Kolkata, both as h/m and total minutes since midnight. */
export interface KolkataNow {
  hours: number;
  minutes: number;
  totalMinutes: number;
}

/**
 * Converts an arbitrary Date to Asia/Kolkata local time using Intl — this
 * correctly accounts for the +5:30 offset (and any historical rules)
 * without hand-rolled offset math.
 */
export function getNowInKolkata(now: Date = new Date()): KolkataNow {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: KOLKATA_TZ,
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);

  const hours = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minutes = Number(parts.find((p) => p.type === "minute")?.value ?? "0");

  return { hours, minutes, totalMinutes: hours * 60 + minutes };
}

/** Parses an "HH:MM" string into minutes since midnight. */
function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

/**
 * True if `totalMinutes` falls within [start, end) of a block, handling the
 * case where the block wraps past midnight (end <= start numerically).
 */
function isWithinBlock(totalMinutes: number, block: TimelineBlock): boolean {
  const start = toMinutes(block.start);
  const end = toMinutes(block.end);

  if (start === end) return false; // zero-length guard, shouldn't happen
  if (start < end) {
    return totalMinutes >= start && totalMinutes < end;
  }
  // Wraps past midnight, e.g. 23:45 -> 08:00
  return totalMinutes >= start || totalMinutes < end;
}

/** Finds the schedule block that contains the given (or current) Kolkata time. */
export function getCurrentBlock(now: Date = new Date()): TimelineBlock {
  const { totalMinutes } = getNowInKolkata(now);
  const match = SCHEDULE.find((block) => isWithinBlock(totalMinutes, block));
  // SCHEDULE covers the full 24h day, so this should always be found.
  // Fall back to the last block (Sleep) defensively.
  return match ?? SCHEDULE[SCHEDULE.length - 1]!;
}

/** Finds the block that comes immediately after the current one, wrapping to the first block after the last. */
export function getNextBlock(now: Date = new Date()): TimelineBlock {
  const current = getCurrentBlock(now);
  const index = SCHEDULE.findIndex((block) => block.id === current.id);
  const nextIndex = (index + 1) % SCHEDULE.length;
  return SCHEDULE[nextIndex]!;
}

/** Looks up the friendly message for a given phase. */
export function getPhaseMessage(phase: Phase): PhaseMessage {
  return PHASE_MESSAGES[phase];
}

/*
 * __dev sanity checks (manual, no test framework wired up yet):
 *
 *   isWithinBlock(8 * 60, { start: "08:00", end: "08:20", ... })       -> true
 *   isWithinBlock(8 * 60 + 20, { start: "08:00", end: "08:20", ... })  -> false (end exclusive)
 *   isWithinBlock(0, { start: "23:45", end: "08:00", ... })            -> true  (midnight, inside Sleep)
 *   isWithinBlock(23 * 60 + 50, { start: "23:45", end: "08:00", ... }) -> true  (23:50, inside Sleep)
 *   isWithinBlock(9 * 60, { start: "23:45", end: "08:00", ... })       -> false (09:00, outside Sleep)
 *   getCurrentBlock(new Date("2026-01-01T02:00:00Z")) // 07:30 IST -> still "sleep" (wraps)
 */

/**
 * The current calendar date in Asia/Kolkata as a "YYYY-MM-DD" string.
 * Used as the stable key for one-per-day records regardless of server timezone.
 */
export function getKolkataDateKey(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
