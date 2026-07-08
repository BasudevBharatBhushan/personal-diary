import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { getAccentClasses, type Accent } from "@/lib/accents";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  accent?: Accent;
  label: string;
}

/** A friendly checklist row — used by Sunday Reset and any future checklists. */
export function Checkbox({ accent = "pink", label, className, id, ...rest }: CheckboxProps) {
  const { text } = getAccentClasses(accent);

  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3",
        className,
      )}
    >
      <input
        id={id}
        type="checkbox"
        className={cn("h-5 w-5 rounded-md accent-current", text)}
        {...rest}
      />
      <span className="text-stone-700">{label}</span>
    </label>
  );
}
