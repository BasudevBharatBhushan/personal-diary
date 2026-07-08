"use client";

import { useState } from "react";
import { SUNDAY_RESET_ITEMS, STORAGE_KEYS, type SundayResetState } from "@b3os/core";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function SundayChecklist() {
  const [state, setState] = useLocalStorage<SundayResetState>(
    STORAGE_KEYS.sundayReset,
    { checked: {} },
  );

  const checked = Object.values(state.checked).filter(Boolean).length;
  const total = SUNDAY_RESET_ITEMS.length;

  const handleCheck = (item: string, isChecked: boolean) => {
    setState((prev) => ({
      checked: { ...prev.checked, [item]: isChecked },
    }));
  };

  const handleReset = () => {
    setState({ checked: {} });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Progress section */}
      <Card accent="pink" className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-stone-700">
            {checked} / {total} done
          </span>
          <span className="text-lg">🎉</span>
        </div>
        {/* Soft progress bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-pink-100">
          <div
            className="h-full bg-pink-400 transition-all duration-300"
            style={{ width: `${(checked / total) * 100}%` }}
          />
        </div>
      </Card>

      {/* Checklist items */}
      <div className="flex flex-col gap-3">
        {SUNDAY_RESET_ITEMS.map((item) => (
          <Checkbox
            key={item}
            id={`sunday-${item}`}
            label={item}
            accent="pink"
            checked={state.checked[item] || false}
            onChange={(e) => handleCheck(item, e.currentTarget.checked)}
            className={
              state.checked[item]
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
        onClick={handleReset}
        className="self-start"
      >
        Reset All
      </Button>
    </div>
  );
}
