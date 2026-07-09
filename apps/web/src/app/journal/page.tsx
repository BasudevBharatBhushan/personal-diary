"use client";

import { PageShell } from "@/components/ui/PageShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { useJournal } from "@/hooks/useJournal";
import { JournalComposer } from "@/components/journal/JournalComposer";
import { JournalEntryCard } from "@/components/journal/JournalEntryCard";

export default function JournalPage() {
  const { entries, loading, adding, add, remove } = useJournal();

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <PageShell>
      <PageHeader
        emoji="📔"
        title="Journal"
        subtitle="Little moments, with photos 📷"
        accent="green"
      />
      <div className="flex flex-col gap-4 sm:gap-5">
        <JournalComposer onPost={add} busy={adding} accent="green" />

        {loading ? (
          <p className="text-center text-sm text-stone-400">
            Loading your journal… 📔
          </p>
        ) : entries.length === 0 ? (
          <EmptyState
            accent="green"
            message="No entries yet — write your first memory! 📔"
          />
        ) : (
          <div className="flex flex-col gap-4">
            {sortedEntries.map((entry) => (
              <JournalEntryCard
                key={entry.id}
                entry={entry}
                onDelete={remove}
                accent="green"
              />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
