"use client";

import { Fragment } from "react";
import type { JournalEntry } from "@b3os/core";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { Accent } from "@/lib/accents";

export interface JournalEntryCardProps {
  entry: JournalEntry;
  onDelete: (id: string) => void;
  accent: Accent;
}

/** One posted Journal entry: timestamp, optional body text, optional photo grid. */
export function JournalEntryCard({ entry, onDelete, accent }: JournalEntryCardProps) {
  const formattedTime = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(entry.createdAt));

  return (
    <Card accent={accent} className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-stone-500">{formattedTime}</span>
        <Button
          variant="soft"
          accent={accent}
          onClick={() => onDelete(entry.id)}
          className="px-3 py-1.5 text-sm"
        >
          🗑️
        </Button>
      </div>

      {entry.body && (
        <p className="whitespace-pre-wrap text-stone-800">{entry.body}</p>
      )}

      {entry.photoUrls.length > 0 && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {entry.photoUrls.map((url, index) => (
            <Fragment key={`${entry.id}-photo-${index}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt="journal photo"
                className="h-32 w-full rounded-2xl object-cover"
              />
            </Fragment>
          ))}
        </div>
      )}
    </Card>
  );
}
