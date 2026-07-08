import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { getAccentClasses, type Accent } from "@/lib/accents";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  accent?: Accent;
}

/** Friendly rounded single-line input. Defaults to the sky accent's focus ring. */
export function TextInput({ accent = "sky", className, ...rest }: TextInputProps) {
  const { ring } = getAccentClasses(accent);

  return (
    <input
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
