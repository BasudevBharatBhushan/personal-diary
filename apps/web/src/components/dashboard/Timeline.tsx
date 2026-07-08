"use client";

import { SCHEDULE, getCurrentBlock, getNowInKolkata, type TimelineBlock } from "@b3os/core";
import { Card } from "@/components/ui/Card";
import { useNow } from "@/hooks/useNow";
import { TimelineItem, type TimelineItemStatus } from "@/components/dashboard/TimelineItem";

function toMinutes(hhmm: string): number {
  const [hours, minutes] = hhmm.split(":").map(Number);
  return (hours ?? 0) * 60 + (minutes ?? 0);
}

/**
 * Classifies a block as past/current/future relative to `nowMinutes`.
 * The one block that wraps past midnight (Sleep) is treated as "future"
 * whenever it isn't the active block, since — from today's schedule view —
 * it's still ahead tonight.
 */
function getBlockStatus(
  block: TimelineBlock,
  nowMinutes: number,
  currentBlockId: string,
): TimelineItemStatus {
  if (block.id === currentBlockId) return "current";

  const start = toMinutes(block.start);
  const end = toMinutes(block.end);
  const wraps = end <= start;

  if (wraps) return "future";
  return nowMinutes >= end ? "past" : "future";
}

/**
 * The day's full schedule as a friendly vertical timeline, with the
 * currently-active block highlighted. Re-evaluates every minute via
 * `useNow`. Before mount (no `now` yet) every block renders as neutral
 * "future" styling to avoid a hydration mismatch.
 */
export function Timeline() {
  const now = useNow();
  const currentBlockId = now ? getCurrentBlock(now).id : null;
  const nowMinutes = now ? getNowInKolkata(now).totalMinutes : null;

  return (
    <Card accent="sky">
      <h2 className="font-heading text-lg font-bold text-sky-700 sm:text-xl">🗓️ Today's Timeline</h2>
      <p className="mt-1 text-sm text-stone-500">Your whole day, one gentle block at a time.</p>

      <ol className="mt-4 flex flex-col gap-1">
        {SCHEDULE.map((block) => {
          const status: TimelineItemStatus =
            nowMinutes !== null && currentBlockId
              ? getBlockStatus(block, nowMinutes, currentBlockId)
              : "future";
          return <TimelineItem key={block.id} block={block} status={status} />;
        })}
      </ol>
    </Card>
  );
}
