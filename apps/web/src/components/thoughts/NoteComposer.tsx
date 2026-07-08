"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { TextInput } from "@/components/ui/TextInput";
import { TextArea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";

export interface NoteComposerProps {
  onAddNote: (title: string, content: string) => void;
}

export function NoteComposer({ onAddNote }: NoteComposerProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAdd = () => {
    // Guard against adding fully-empty notes
    if (!title.trim() && !content.trim()) {
      return;
    }

    onAddNote(title, content);
    setTitle("");
    setContent("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Allow Ctrl+Enter or Cmd+Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <Card accent="yellow" className="space-y-3">
      <TextInput
        accent="yellow"
        placeholder="Thought title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextArea
        accent="yellow"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={3}
      />
      <div className="flex justify-end">
        <Button
          accent="yellow"
          onClick={handleAdd}
          disabled={!title.trim() && !content.trim()}
        >
          Add Note
        </Button>
      </div>
    </Card>
  );
}
