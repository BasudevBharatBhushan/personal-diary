import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { getAccentClasses, type Accent } from "@/lib/accents";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  accent?: Accent;
}

/** Friendly rounded multi-line input. Defaults to the sky accent's focus ring. */
export function TextArea({ accent = "sky", className, ...rest }: TextAreaProps) {
  const { ring } = getAccentClasses(accent);

  return (
    <textarea
      className={cn(
        "w-full rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-stone-800",
        "placeholder:text-stone-400 focus:outline-none focus-visible:ring-2",
        ring,
        className,
      )}
      {...rest}
    />
  );
}
