/**
 * Domain types for B3 OS. Framework-agnostic — no React, no DOM types
 * (aside from the plain objects/strings below).
 */

/** Every distinct phase of the day, in the order they occur. */
export type Phase =
  | "wakeUp"
  | "workout"
  | "breakfast"
  | "mindfulness"
  | "bonusFocus"
  | "getReady"
  | "commute"
  | "office"
  | "decisionTime"
  | "recovery"
  | "dinner"
  | "productiveHour1"
  | "breakTime"
  | "aiLearning"
  | "reading"
  | "relax"
  | "overthinking"
  | "tomorrowCard"
  | "sleep";

/**
 * A single slot in the day's schedule. `start`/`end` are "HH:MM" 24h strings
 * in Asia/Kolkata local time. The final block (Sleep) wraps past midnight,
 * i.e. `end` < `start`.
 */
export interface TimelineBlock {
  id: string;
  label: string;
  start: string;
  end: string;
  phase: Phase;
}

/** The friendly one-liner shown for a given phase. */
export interface PhaseMessage {
  emoji: string;
  lines: string[];
}

/** One day's planned dinner in the weekly rotation. */
export interface DinnerDay {
  day:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  dinner: string;
  note?: string;
}

/** Grocery items grouped by category. */
export interface GroceryList {
  protein: string[];
  vegetables: string[];
  emergencyShelf: string[];
}

/** Editable "Decision Panel" state — decided once, executed later, today. */
export interface DecisionPanel {
  dinner: string;
  productiveHour1: string;
  productiveHour2: string;
}

/** Editable "Tomorrow Card" state — set up tonight for tomorrow. */
export interface TomorrowCard {
  dinner: string;
  productiveHour1: string;
  productiveHour2: string;
  importantThing: string;
  mood: string;
}

/** A single free-form note in Random Thoughts. No folders, no markdown. */
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
}

/** Checklist state for the weekly Sunday Reset ritual. */
export interface SundayResetState {
  checked: Record<string, boolean>;
}

/** A reflection question the user can add/edit/delete. */
export type QuestionType = "text" | "yesno" | "scale";

export interface Question {
  id: string;
  prompt: string;
  type: QuestionType;
  emoji: string | null;
  allowDetail: boolean;
  position: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** One answer inside a day's reflection. Self-describing (snapshots prompt+type) for later analysis. */
export interface Answer {
  questionId: string;
  prompt: string;
  type: QuestionType;
  value: string | boolean | number;
  detail: string | null;
}

/** One reflection entry per date. */
export interface DailyEntry {
  id: string;
  entryDate: string; // "YYYY-MM-DD" in Asia/Kolkata
  answers: Answer[];
  createdAt: string;
}

/** A journal post with optional embedded photos (served as signed URLs). */
export interface JournalEntry {
  id: string;
  body: string;
  photoUrls: string[];
  createdAt: string;
  updatedAt: string;
}
