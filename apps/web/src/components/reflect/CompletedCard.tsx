"use client";

import { Card } from "@/components/ui/Card";
import type { Accent } from "@/lib/accents";
import type { Answer, DailyEntry } from "@b3os/core";

const SCALE_EMOJIS = ["😞", "😕", "😐", "🙂", "😄"];

function renderValue(answer: Answer): string {
  if (answer.type === "yesno") {
    return answer.value ? "Yes 👍" : "No 👎";
  }
  if (answer.type === "scale") {
    const score = typeof answer.value === "number" ? answer.value : 0;
    const emoji = SCALE_EMOJIS[score - 1] ?? "😐";
    return `${emoji} (${score}/5)`;
  }
  return String(answer.value);
}

export interface CompletedCardProps {
  entry: DailyEntry;
  accent: Accent;
}

/** Read-only summary shown once today's reflection entry already exists. */
export function CompletedCard({ entry, accent }: CompletedCardProps) {
  return (
    <Card accent={accent} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-xl font-bold text-stone-800">
          ✅ Today&apos;s page is closed
        </h2>
        <p className="text-sm text-stone-500">See you tomorrow 🌙</p>
      </div>

      <div className="flex flex-col gap-3">
        {entry.answers.map((answer) => (
          <div key={answer.questionId} className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-stone-700">{answer.prompt}</span>
            <span className="text-stone-800">{renderValue(answer)}</span>
            {answer.detail ? (
              <span className="text-sm text-stone-500">{answer.detail}</span>
            ) : null}
          </div>
        ))}
      </div>
    </Card>
  );
}
