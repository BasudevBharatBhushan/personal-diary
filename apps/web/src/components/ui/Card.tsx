import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { getAccentClasses, type Accent } from "@/lib/accents";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Optional accent color — tints the border. Defaults to a neutral border. */
  accent?: Accent;
  className?: string;
}

/**
 * The base rounded, soft-shadow card used throughout B3 OS. Generous
 * padding and rounding by default — feature pages compose their content
 * inside this rather than rolling their own container.
 *
 * @example <Card accent="orange">...</Card>
 */
export function Card({ children, accent, className, ...rest }: CardProps) {
  const border = accent ? getAccentClasses(accent).border : "border-stone-200";

  return (
    <div
      className={cn(
        "rounded-3xl border bg-white p-5 shadow-sm sm:p-6",
        border,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
