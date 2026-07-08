import type { Phase, PhaseMessage } from "./types";

/** Shown when a phase has no specific message defined (currently unused, kept for safety). */
export const FALLBACK_MESSAGE: PhaseMessage = {
  emoji: "✨",
  lines: ["One small step is enough today."],
};

/**
 * The friendly one-liner for every phase, verbatim from the product spec.
 * `commute` has no dedicated copy in the spec, so it falls back to
 * `FALLBACK_MESSAGE`.
 */
export const PHASE_MESSAGES: Record<Phase, PhaseMessage> = {
  wakeUp: {
    emoji: "🌅",
    lines: ["Good morning.", "Today starts with movement."],
  },
  workout: {
    emoji: "💪",
    lines: ["Take care of your body.", "Everything else can wait."],
  },
  breakfast: {
    emoji: "🥣",
    lines: ["Fuel yourself well."],
  },
  mindfulness: {
    emoji: "🧘",
    lines: ["Slow down.", "Presence is productive."],
  },
  bonusFocus: {
    emoji: "🎯",
    lines: ["Bonus progress is still progress."],
  },
  getReady: {
    emoji: "🚿",
    lines: ["Take your time.", "No rushing."],
  },
  commute: FALLBACK_MESSAGE,
  office: {
    emoji: "💼",
    lines: ["You're at work.", "Just focus on work."],
  },
  decisionTime: {
    emoji: "📝",
    lines: ["Decide now.", "Don't decide again tonight."],
  },
  recovery: {
    emoji: "😌",
    lines: ["Relax.", "You've earned it."],
  },
  dinner: {
    emoji: "🍽️",
    lines: ["Dinner is already decided.", "Don't think.", "Just eat."],
  },
  productiveHour1: {
    emoji: "📚",
    lines: ["One focused hour."],
  },
  breakTime: {
    emoji: "☕",
    lines: ["Recharge."],
  },
  aiLearning: {
    emoji: "🤖",
    lines: ["This hour belongs to AI."],
  },
  reading: {
    emoji: "📖",
    lines: ["Slow down.", "Enjoy your book."],
  },
  relax: {
    emoji: "🏔️",
    lines: ["Mountains before dreams."],
  },
  overthinking: {
    emoji: "🌙",
    lines: ["Overthink all you want.", "Just stop after five minutes."],
  },
  tomorrowCard: {
    emoji: "📝",
    lines: ["Make tomorrow easier."],
  },
  sleep: {
    emoji: "😴",
    lines: ["The day is complete.", "Sleep peacefully."],
  },
};
