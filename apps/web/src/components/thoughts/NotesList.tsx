"use client";

import type { Note } from "@b3os/core";
import { EmptyState } from "@/components/ui/EmptyState";
import { NoteCard } from "./NoteCard";

export interface NotesListProps {
  notes: Note[];
  onDeleteNote: (id: string) => void;
}

export function NotesList({ notes, onDeleteNote }: NotesListProps) {
  if (notes.length === 0) {
    return (
      <EmptyState
        accent="yellow"
        message="No thoughts yet. Share your first one above."
      />
    );
  }

  // Sort by createdAt descending (newest first)
  const sortedNotes = [...notes].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sortedNotes.map((note) => (
        <NoteCard key={note.id} note={note} onDelete={onDeleteNote} />
      ))}
    </div>
  );
}
