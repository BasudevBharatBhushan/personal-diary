"use client";

import { PageShell } from "@/components/ui/PageShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STORAGE_KEYS, type TomorrowCard } from "@b3os/core";
import { EditableField } from "@/components/decisions/EditableField";

const INITIAL_STATE: TomorrowCard = {
  dinner: "",
  productiveHour1: "",
  productiveHour2: "",
  importantThing: "",
  mood: "",
};

const MOOD_EMOJIS = ["😴", "😌", "😊", "🤗", "🚀"];

export default function TomorrowPage() {
  const [state, setState] = useLocalStorage<TomorrowCard>(
    STORAGE_KEYS.tomorrowCard,
    INITIAL_STATE,
  );

  const handleChange = <K extends keyof TomorrowCard>(
    field: K,
    value: string,
  ) => {
    setState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <PageShell>
      <PageHeader
        emoji="🌙"
        title="Tomorrow Card"
        subtitle="Make tomorrow easier."
        accent="purple"
      />
      <div className="flex flex-col gap-4 sm:gap-5">
        <EditableField
          label="Tomorrow Dinner"
          value={state.dinner}
          onChange={(value) => handleChange("dinner", value)}
          accent="purple"
          placeholder="What's for dinner?"
          multiline
        />
        <EditableField
          label="Tomorrow Productive Hour 1"
          value={state.productiveHour1}
          onChange={(value) => handleChange("productiveHour1", value)}
          accent="purple"
          placeholder="Focus on..."
          multiline
        />
        <EditableField
          label="Tomorrow Productive Hour 2"
          value={state.productiveHour2}
          onChange={(value) => handleChange("productiveHour2", value)}
          accent="purple"
          placeholder="Focus on..."
          multiline
        />
        <EditableField
          label="One Important Thing"
          value={state.importantThing}
          onChange={(value) => handleChange("importantThing", value)}
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
                  onClick={() => handleChange("mood", emoji)}
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition-all ${
                    state.mood === emoji
                      ? "scale-110 shadow-md"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`Select mood ${emoji}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            {state.mood && (
              <p className="text-xs text-stone-500">
                Mood selected: {state.mood}
              </p>
            )}
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
