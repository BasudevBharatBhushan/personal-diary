"use client";

import { PageShell } from "@/components/ui/PageShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { useNotes } from "@/hooks/useNotes";
import { NoteComposer } from "@/components/thoughts/NoteComposer";
import { NotesList } from "@/components/thoughts/NotesList";

export default function ThoughtsPage() {
  const { notes, loading, add, remove } = useNotes();

  return (
    <PageShell>
      <PageHeader
        emoji="💭"
        title="Random Thoughts"
        subtitle="Simple notes. No folders, no markdown."
        accent="yellow"
      />
      <div className="space-y-6">
        <NoteComposer onAddNote={add} />
        {loading ? (
          <p className="text-center text-sm text-stone-400">
            Loading your thoughts… 💭
          </p>
        ) : (
          <NotesList notes={notes} onDeleteNote={remove} />
        )}
      </div>
    </PageShell>
  );
}
