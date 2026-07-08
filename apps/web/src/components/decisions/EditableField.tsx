"use client";

import type { ChangeEvent, ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { TextInput } from "@/components/ui/TextInput";
import { TextArea } from "@/components/ui/TextArea";
import type { Accent } from "@/lib/accents";

export interface EditableFieldProps {
  label: ReactNode;
  value: string;
  onChange: (value: string) => void;
  accent: Accent;
  multiline?: boolean;
  placeholder?: string;
}

/**
 * Reusable editable field card used in Decision Panel and Tomorrow Card.
 * Wraps a label and input/textarea inside a styled Card with accent border.
 */
export function EditableField({
  label,
  value,
  onChange,
  accent,
  multiline = false,
  placeholder,
}: EditableFieldProps) {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange(event.target.value);
  };

  return (
    <Card accent={accent}>
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-stone-700">{label}</label>
        {multiline ? (
          <TextArea
            accent={accent}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            rows={3}
          />
        ) : (
          <TextInput
            accent={accent}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
          />
        )}
      </div>
    </Card>
  );
}
