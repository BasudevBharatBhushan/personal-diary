"use client";

import { SUNDAY_RESET_ITEMS } from "@b3os/core";
import { useSundayReset } from "@/hooks/useSundayReset";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function SundayChecklist() {
  const { checked, saving, setChecked, resetAll } = useSundayReset();

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const total = SUNDAY_RESET_ITEMS.length;

  return (
    <div className="flex flex-col gap-6">
      {/* Progress section */}
      <Card accent="pink" className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-stone-700">
            {checkedCount} / {total} done
          </span>
          <span className="text-lg">🎉</span>
        </div>
        {/* Soft progress bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-pink-100">
          <div
            className="h-full bg-pink-400 transition-all duration-300"
            style={{ width: `${(checkedCount / total) * 100}%` }}
          />
        </div>
        {saving && (
          <span className="text-xs text-stone-400">saving…</span>
        )}
      </Card>

      {/* Checklist items */}
      <div className="flex flex-col gap-3">
        {SUNDAY_RESET_ITEMS.map((item) => (
          <Checkbox
            key={item}
            id={`sunday-${item}`}
            label={item}
            accent="pink"
            checked={checked[item] || false}
            onChange={(e) => setChecked(item, e.currentTarget.checked)}
            className={
              checked[item]
                ? "bg-pink-50 opacity-70"
                : ""
            }
          />
        ))}
      </div>

      {/* Reset button */}
      <Button
        accent="pink"
        variant="soft"
        onClick={resetAll}
        className="self-start"
      >
        Reset All
      </Button>
    </div>
  );
}
