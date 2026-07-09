"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { TextArea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";
import type { Accent } from "@/lib/accents";

export interface JournalComposerProps {
  onPost: (body: string, files: File[]) => Promise<void>;
  busy: boolean;
  accent: Accent;
}

/** Composer for a new Journal entry: a body textarea plus an optional multi-photo picker. */
export function JournalComposer({ onPost, busy, accent }: JournalComposerProps) {
  const [body, setBody] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Object URLs for the thumbnail previews — revoked whenever the file list changes/unmounts.
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleFilesSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files ? Array.from(event.target.files) : [];
    if (selected.length > 0) {
      setFiles((prev) => [...prev, ...selected]);
    }
    event.target.value = "";
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePost = async () => {
    await onPost(body, files);
    setBody("");
    setFiles([]);
  };

  const disabled = busy || (!body.trim() && files.length === 0);

  return (
    <Card accent={accent} className="flex flex-col gap-3">
      <TextArea
        accent={accent}
        rows={3}
        placeholder="What happened today? ✍️"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFilesSelected}
      />

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="soft"
          accent={accent}
          onClick={() => fileInputRef.current?.click()}
        >
          📷 Add photos
        </Button>
      </div>

      {files.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrls[index]}
                alt="Selected preview"
                className="h-16 w-16 rounded-2xl object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                aria-label="Remove photo"
                className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-stone-800 text-xs text-white shadow-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <Button accent={accent} onClick={handlePost} disabled={disabled}>
          Post ✨
        </Button>
      </div>
    </Card>
  );
}
