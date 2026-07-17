"use client";

import { PageShell } from "@/components/ui/PageShell";
import { PageHeader } from "@/components/ui/PageHeader";
import type { DecisionPanel } from "@b3os/core";
import { useDecisionPanel } from "@/hooks/useDecisionPanel";
import { EditableField } from "@/components/decisions/EditableField";

export default function DecisionsPage() {
  const { panel, saving, setField } = useDecisionPanel();

  return (
    <PageShell>
      <PageHeader
        emoji="📝"
        title="Decision Panel"
        subtitle="Decide once. Execute later."
        accent="orange"
      />
      {saving && <p className="mb-4 text-xs text-stone-400">saving…</p>}
      <div className="flex flex-col gap-4 sm:gap-5">
        <EditableField
          label="Today's Dinner"
          value={panel.dinner}
          onChange={(value) => setField("dinner", value)}
          accent="orange"
          placeholder="What's for dinner?"
          multiline
        />
        <EditableField
          label="Today's Productive Hour 1"
          value={panel.productiveHour1}
          onChange={(value) => setField("productiveHour1", value)}
          accent="orange"
          placeholder="Focus on..."
          multiline
        />
        <EditableField
          label="Today's Productive Hour 2"
          value={panel.productiveHour2}
          onChange={(value) => setField("productiveHour2", value)}
          accent="orange"
          placeholder="Focus on..."
          multiline
        />
      </div>
    </PageShell>
  );
}
