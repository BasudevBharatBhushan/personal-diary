/** Joins class name fragments, dropping falsy values. Tiny `clsx`-alike so we don't need the dependency. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
