import { getPhaseMessage, type TimelineBlock } from "@b3os/core";
import { cn } from "@/lib/cn";

/** Where a block sits relative to "now": already happened, happening now, or upcoming. */
export type TimelineItemStatus = "past" | "current" | "future";

export interface TimelineItemProps {
  block: TimelineBlock;
  status: TimelineItemStatus;
}

/** Formats an "HH:MM" 24h string as a friendly "7:24 PM" — no timezone math needed, the value is already Kolkata local time. */
function formatTime(hhmm: string): string {
  const [hours, minutes] = hhmm.split(":").map(Number);
  const period = (hours ?? 0) >= 12 ? "PM" : "AM";
  const twelveHour = (hours ?? 0) % 12 === 0 ? 12 : (hours ?? 0) % 12;
  const paddedMinutes = String(minutes ?? 0).padStart(2, "0");
  return `${twelveHour}:${paddedMinutes} ${period}`;
}

/** One row of the dashboard timeline — a time range, a label, and a "now" treatment when it's the active block. */
export function TimelineItem({ block, status }: TimelineItemProps) {
  const isCurrent = status === "current";
  const isPast = status === "past";
  const emoji = getPhaseMessage(block.phase).emoji;

  return (
    <li
      className={cn(
        "flex items-start gap-3 rounded-2xl px-3 py-2.5 transition-colors",
        isCurrent && "bg-sky-100 ring-1 ring-sky-300",
      )}
    >
      <span
        className={cn(
          "mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full",
          isCurrent ? "bg-sky-500" : isPast ? "bg-stone-300" : "bg-sky-200",
        )}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <p className={cn("text-xs font-medium", isCurrent ? "text-sky-700" : "text-stone-400")}>
          {formatTime(block.start)} – {formatTime(block.end)}
        </p>
        <p
          className={cn(
            "truncate text-base",
            isCurrent
              ? "font-bold text-sky-900"
              : isPast
                ? "font-medium text-stone-400"
                : "font-medium text-stone-700",
          )}
        >
          <span aria-hidden className={cn(isPast && "opacity-50")}>
            {emoji}
          </span>{" "}
          {block.label}
        </p>
      </div>
      {isCurrent ? (
        <span className="flex-shrink-0 rounded-full bg-sky-500 px-2 py-0.5 text-xs font-semibold text-white">
          👉 Now
        </span>
      ) : null}
    </li>
  );
}
