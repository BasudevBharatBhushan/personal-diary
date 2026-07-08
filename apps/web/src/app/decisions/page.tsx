"use client";

import { PageShell } from "@/components/ui/PageShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STORAGE_KEYS, type DecisionPanel } from "@b3os/core";
import { EditableField } from "@/components/decisions/EditableField";

const INITIAL_STATE: DecisionPanel = {
  dinner: "",
  productiveHour1: "",
  productiveHour2: "",
};

export default function DecisionsPage() {
  const [state, setState] = useLocalStorage<DecisionPanel>(
    STORAGE_KEYS.decisionPanel,
    INITIAL_STATE,
  );

  const handleChange = <K extends keyof DecisionPanel>(
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
        emoji="📝"
        title="Decision Panel"
        subtitle="Decide once. Execute later."
        accent="orange"
      />
      <div className="flex flex-col gap-4 sm:gap-5">
        <EditableField
          label="Today's Dinner"
          value={state.dinner}
          onChange={(value) => handleChange("dinner", value)}
          accent="orange"
          placeholder="What's for dinner?"
          multiline
        />
        <EditableField
          label="Today's Productive Hour 1"
          value={state.productiveHour1}
          onChange={(value) => handleChange("productiveHour1", value)}
          accent="orange"
          placeholder="Focus on..."
          multiline
        />
        <EditableField
          label="Today's Productive Hour 2"
          value={state.productiveHour2}
          onChange={(value) => handleChange("productiveHour2", value)}
          accent="orange"
          placeholder="Focus on..."
          multiline
        />
      </div>
    </PageShell>
  );
}
