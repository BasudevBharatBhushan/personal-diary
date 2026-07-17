/**
 * Maps snake_case Supabase rows to the camelCase `@b3os/core` domain types.
 */
import type { DailyEntry, DecisionPanel, Note, Question, SundayResetState, TomorrowCard } from "@b3os/core";

// The shapes below intentionally use `any` for the raw DB row — Supabase's
// generated row types are not wired up in this project, and these mappers
// are the single seam where snake_case → camelCase translation happens.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function rowToQuestion(r: any): Question {
  return {
    id: r.id,
    prompt: r.prompt,
    type: r.type,
    emoji: r.emoji ?? null,
    allowDetail: r.allow_detail,
    position: r.position,
    isActive: r.is_active,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function rowToDailyEntry(r: any): DailyEntry {
  return {
    id: r.id,
    entryDate: r.entry_date,
    answers: r.answers,
    createdAt: r.created_at,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function rowToTomorrow(r: any): TomorrowCard {
  return {
    dinner: r.dinner,
    productiveHour1: r.productive_hour1,
    productiveHour2: r.productive_hour2,
    importantThing: r.important_thing,
    mood: r.mood,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function rowToDecisionPanel(r: any): DecisionPanel {
  return {
    dinner: r.dinner,
    productiveHour1: r.productive_hour1,
    productiveHour2: r.productive_hour2,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function rowToNote(r: any): Note {
  return {
    id: r.id,
    title: r.title,
    content: r.content,
    createdAt: Date.parse(r.created_at),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function rowToSundayReset(r: any): SundayResetState {
  return {
    checked: r.checked ?? {},
  };
}
