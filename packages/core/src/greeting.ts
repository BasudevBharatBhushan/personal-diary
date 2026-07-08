import { getCurrentBlock, getNowInKolkata, getPhaseMessage } from "./time";

const KOLKATA_TIME_FORMAT = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

/** A time-of-day salutation, in Kolkata local hours (0-23). */
function getTimeOfDayGreeting(hours: number): string {
  if (hours < 5) return "Good night";
  if (hours < 12) return "Good morning";
  if (hours < 17) return "Good afternoon";
  if (hours < 21) return "Good evening";
  return "Good night";
}

/**
 * Builds one warm, flowing sentence for the current moment: a time-of-day
 * greeting, the clock time, and the current phase's message — meant to be
 * both displayed and spoken aloud, unlike the short fragments in
 * `PhaseMessage.lines`.
 */
export function getGreetingSentence(now: Date = new Date()): string {
  const { hours } = getNowInKolkata(now);
  const time = KOLKATA_TIME_FORMAT.format(now);
  const message = getPhaseMessage(getCurrentBlock(now).phase);
  const body = message.lines.join(" ");

  // A few phase messages (e.g. wakeUp) already open with their own "Good
  // morning." — skip the salutation there so it doesn't repeat.
  const alreadyGreets = message.lines[0]?.toLowerCase().startsWith("good ");
  const prefix = alreadyGreets ? `It's ${time}.` : `${getTimeOfDayGreeting(hours)}! It's ${time}.`;

  return `${prefix} ${body}`;
}
