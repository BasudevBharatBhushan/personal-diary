import type { TimelineBlock } from "./types";

/**
 * The single source of truth for the day's schedule. Non-overlapping,
 * ordered, and covers a full 24 hours. Times are "HH:MM" 24h in
 * Asia/Kolkata local time. The last block (Sleep) wraps past midnight —
 * its `end` ("08:00") is numerically before its `start` ("23:45").
 */
export const SCHEDULE: TimelineBlock[] = [
  { id: "wake-up", label: "Wake Up", start: "08:00", end: "08:20", phase: "wakeUp" },
  { id: "workout", label: "Workout + Yoga", start: "08:20", end: "09:00", phase: "workout" },
  { id: "breakfast", label: "Breakfast", start: "09:00", end: "09:20", phase: "breakfast" },
  { id: "mindfulness", label: "Mindfulness", start: "09:20", end: "09:35", phase: "mindfulness" },
  { id: "bonus-focus", label: "Bonus Focus", start: "09:35", end: "10:20", phase: "bonusFocus" },
  { id: "get-ready", label: "Get Ready", start: "10:20", end: "11:15", phase: "getReady" },
  { id: "commute", label: "Leave for Office", start: "11:15", end: "11:30", phase: "commute" },
  { id: "office-1", label: "Office", start: "11:30", end: "17:00", phase: "office" },
  { id: "decision-time", label: "Decision Time", start: "17:00", end: "17:15", phase: "decisionTime" },
  { id: "office-2", label: "Office", start: "17:15", end: "19:00", phase: "office" },
  { id: "recovery", label: "Recovery (Instagram)", start: "19:00", end: "19:30", phase: "recovery" },
  { id: "dinner", label: "Dinner", start: "19:30", end: "19:45", phase: "dinner" },
  { id: "productive-hour-1", label: "Productive Hour 1", start: "19:45", end: "20:45", phase: "productiveHour1" },
  { id: "break", label: "Break", start: "20:45", end: "21:00", phase: "breakTime" },
  { id: "ai-learning", label: "AI Learning", start: "21:00", end: "22:00", phase: "aiLearning" },
  { id: "reading", label: "Reading", start: "22:00", end: "23:15", phase: "reading" },
  { id: "relax", label: "Travel Videos", start: "23:15", end: "23:35", phase: "relax" },
  { id: "overthinking", label: "Overthinking Window", start: "23:35", end: "23:40", phase: "overthinking" },
  { id: "tomorrow-card", label: "Tomorrow Card", start: "23:40", end: "23:45", phase: "tomorrowCard" },
  { id: "sleep", label: "Sleep", start: "23:45", end: "08:00", phase: "sleep" },
];
