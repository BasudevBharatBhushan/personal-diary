"use client";

import type { Note } from "@b3os/core";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onDelete }: NoteCardProps) {
  // Format the created time using Intl.DateTimeFormat
  // Render client-side only to avoid hydration mismatch
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(note.createdAt));

  return (
    <Card accent="yellow" className="flex flex-col justify-between space-y-3">
      {note.title && (
        <h3 className="text-lg font-semibold text-stone-800">{note.title}</h3>
      )}
      <p className="whitespace-pre-wrap text-stone-700">{note.content}</p>
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-stone-500">{formattedTime}</span>
        <Button
          variant="soft"
          accent="yellow"
          onClick={() => onDelete(note.id)}
          className="px-3 py-1.5 text-sm"
        >
          🗑️
        </Button>
      </div>
    </Card>
  );
}
