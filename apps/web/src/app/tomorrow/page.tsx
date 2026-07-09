"use client";

import { PageShell } from "@/components/ui/PageShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { useTomorrowCard } from "@/hooks/useTomorrowCard";
import { EditableField } from "@/components/decisions/EditableField";

const MOOD_EMOJIS = ["😴", "😌", "😊", "🤗", "🚀"];

export default function TomorrowPage() {
  const { card, loading, saving, setField } = useTomorrowCard();

  return (
    <PageShell>
      <PageHeader
        emoji="🌙"
        title="Tomorrow Card"
        subtitle="Make tomorrow easier."
        accent="purple"
      />
      {saving && <p className="mb-4 text-xs text-stone-400">saving…</p>}
      <div className="flex flex-col gap-4 sm:gap-5">
        <EditableField
          label="Tomorrow Dinner"
          value={card.dinner}
          onChange={(value) => setField("dinner", value)}
          accent="purple"
          placeholder="What's for dinner?"
          multiline
        />
        <EditableField
          label="Tomorrow Productive Hour 1"
          value={card.productiveHour1}
          onChange={(value) => setField("productiveHour1", value)}
          accent="purple"
          placeholder="Focus on..."
          multiline
        />
        <EditableField
          label="Tomorrow Productive Hour 2"
          value={card.productiveHour2}
          onChange={(value) => setField("productiveHour2", value)}
          accent="purple"
          placeholder="Focus on..."
          multiline
        />
        <EditableField
          label="One Important Thing"
          value={card.importantThing}
          onChange={(value) => setField("importantThing", value)}
          accent="purple"
          placeholder="What matters most?"
          multiline
        />
        <Card accent="purple">
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-stone-700">
              Tomorrow's Mood
            </label>
            <div className="flex gap-2">
              {MOOD_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setField("mood", emoji)}
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition-all ${
                    card.mood === emoji
                      ? "scale-110 shadow-md"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`Select mood ${emoji}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            {card.mood && (
              <p className="text-xs text-stone-500">
                Mood selected: {card.mood}
              </p>
            )}
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
