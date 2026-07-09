"use client";

import type { ChangeEvent } from "react";
import { Card } from "@/components/ui/Card";
import { TextArea } from "@/components/ui/TextArea";
import { cn } from "@/lib/cn";
import { getAccentClasses, type Accent } from "@/lib/accents";
import type { Question } from "@b3os/core";

const SCALE_EMOJIS = ["😞", "😕", "😐", "🙂", "😄"];

export interface QuestionFieldProps {
  question: Question;
  value: string | boolean | number | null;
  detail: string;
  onValue: (value: string | boolean | number | null) => void;
  onDetail: (detail: string) => void;
  accent: Accent;
}

/** Renders a single reflection question, controlled by the parent's answers state. */
export function QuestionField({
  question,
  value,
  detail,
  onValue,
  onDetail,
  accent,
}: QuestionFieldProps) {
  const { chip } = getAccentClasses(accent);

  const answered =
    question.type === "text"
      ? Boolean(value)
      : question.type === "yesno"
        ? typeof value === "boolean"
        : typeof value === "number" && value > 0;

  return (
    <Card accent={accent} className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span aria-hidden>{question.emoji}</span>
        <span className="text-sm font-semibold text-stone-700">{question.prompt}</span>
      </div>

      {question.type === "text" ? (
        <TextArea
          accent={accent}
          rows={3}
          placeholder="Type your thoughts…"
          value={typeof value === "string" ? value : ""}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onValue(event.target.value)}
        />
      ) : null}

      {question.type === "yesno" ? (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onValue(true)}
            className={cn(
              "flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-all",
              value === true ? cn(chip, "scale-110 shadow-md") : "bg-stone-100 text-stone-500 opacity-60 hover:opacity-100",
            )}
          >
            👍 Yes
          </button>
          <button
            type="button"
            onClick={() => onValue(false)}
            className={cn(
              "flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-all",
              value === false ? cn(chip, "scale-110 shadow-md") : "bg-stone-100 text-stone-500 opacity-60 hover:opacity-100",
            )}
          >
            👎 No
          </button>
        </div>
      ) : null}

      {question.type === "scale" ? (
        <div className="flex gap-2">
          {SCALE_EMOJIS.map((emoji, index) => {
            const score = index + 1;
            const selected = value === score;
            return (
              <button
                key={emoji}
                type="button"
                onClick={() => onValue(score)}
                aria-label={`Rate ${score} out of 5`}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition-all",
                  selected ? cn(chip, "scale-110 shadow-md") : "opacity-60 hover:opacity-100",
                )}
              >
                {emoji}
              </button>
            );
          })}
        </div>
      ) : null}

      {question.allowDetail && answered ? (
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-stone-500">add a note (optional)</label>
          <TextArea
            accent={accent}
            rows={2}
            placeholder="Anything more to add?"
            value={detail}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onDetail(event.target.value)}
          />
        </div>
      ) : null}
    </Card>
  );
}
