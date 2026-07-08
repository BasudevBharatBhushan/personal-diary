"use client";

import { useCallback } from "react";
import { STORAGE_KEYS, type Note } from "@b3os/core";
import { PageShell } from "@/components/ui/PageShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { NoteComposer } from "@/components/thoughts/NoteComposer";
import { NotesList } from "@/components/thoughts/NotesList";

export default function ThoughtsPage() {
  const [notes, setNotes] = useLocalStorage<Note[]>(STORAGE_KEYS.notes, []);

  const handleAddNote = useCallback(
    (title: string, content: string) => {
      const newNote: Note = {
        id: crypto.randomUUID(),
        title,
        content,
        createdAt: Date.now(),
      };
      setNotes([newNote, ...notes]);
    },
    [notes, setNotes],
  );

  const handleDeleteNote = useCallback(
    (id: string) => {
      setNotes(notes.filter((note) => note.id !== id));
    },
    [notes, setNotes],
  );

  return (
    <PageShell>
      <PageHeader
        emoji="💭"
        title="Random Thoughts"
        subtitle="Simple notes. No folders, no markdown."
        accent="yellow"
      />
      <div className="space-y-6">
        <NoteComposer onAddNote={handleAddNote} />
        <NotesList notes={notes} onDeleteNote={handleDeleteNote} />
      </div>
    </PageShell>
  );
}
