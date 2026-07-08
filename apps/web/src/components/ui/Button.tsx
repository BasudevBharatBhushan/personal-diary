import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { getAccentClasses, type Accent } from "@/lib/accents";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  accent?: Accent;
  /** `solid` (filled, primary) or `soft` (tinted, secondary). Defaults to `solid`. */
  variant?: "solid" | "soft";
}

/**
 * Rounded, playful, accent-aware button. Defaults to the sky accent.
 *
 * @example <Button accent="pink" onClick={save}>Save</Button>
 */
export function Button({
  accent = "sky",
  variant = "solid",
  className,
  ...rest
}: ButtonProps) {
  const classes = getAccentClasses(accent);

  const variantClasses =
    variant === "solid"
      ? cn(classes.solidBg, classes.solidBgHover, "text-white")
      : cn(classes.chip, "hover:opacity-80");

  return (
    <button
      className={cn(
        "cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold transition-colors sm:text-base",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        classes.ring,
        variantClasses,
        className,
      )}
      {...rest}
    />
  );
}
