"use client";

import { useNow } from "@/hooks/useNow";
import { DINNER_ROTATION } from "@b3os/core";
import { Card } from "@/components/ui/Card";
import { getAccentClasses } from "@/lib/accents";

const DINNER_EMOJIS = {
  Monday: "🌙",
  Tuesday: "🥦",
  Wednesday: "🌮",
  Thursday: "🌙",
  Friday: "🍲",
  Saturday: "🥙",
  Sunday: "✨",
};

export function DinnerRotation() {
  const now = useNow();

  // Get today's weekday name in Asia/Kolkata timezone
  const todayWeekday = now
    ? new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        weekday: "long",
      }).format(now)
    : null;

  const accentClasses = getAccentClasses("green");

  return (
    <Card accent="green">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-2xl">🔄</span>
        <h2 className={`font-heading text-xl font-bold ${accentClasses.text}`}>
          Weekly Rotation
        </h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {DINNER_ROTATION.map((day) => {
          const isToday = todayWeekday === day.day;
          return (
            <div
              key={day.day}
              className={`rounded-2xl border-2 p-4 transition-all ${
                isToday
                  ? `${accentClasses.bg} ${accentClasses.border} ring-2 ${accentClasses.ring} shadow-md`
                  : "border-stone-200 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${isToday ? accentClasses.text : "text-stone-600"}`}>
                    {day.day}
                    {isToday && " 🎯"}
                  </p>
                  <p className={`text-base font-bold ${isToday ? accentClasses.text : "text-stone-900"}`}>
                    {day.dinner}
                  </p>
                  {day.note && (
                    <p className="mt-1 text-xs text-stone-500">{day.note}</p>
                  )}
                </div>
                <span className="text-2xl">
                  {DINNER_EMOJIS[day.day as keyof typeof DINNER_EMOJIS]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
