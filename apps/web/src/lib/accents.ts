/**
 * The six-color accent palette used across B3 OS. Every page picks one
 * accent and stays consistent with it (see scope.md's design philosophy).
 */
export type Accent = "sky" | "green" | "orange" | "yellow" | "pink" | "purple";

/** Tailwind class strings for one accent, covering the common UI needs. */
export interface AccentClasses {
  /** Soft tinted background, e.g. for page headers or subtle sections. */
  bg: string;
  /** Solid background, e.g. for buttons and badges. */
  solidBg: string;
  /** Hover state for the solid background. */
  solidBgHover: string;
  /** Readable accent text color. */
  text: string;
  /** Border color that pairs with `bg`. */
  border: string;
  /** Focus ring color. */
  ring: string;
  /** Background + text combo for small chips/badges. */
  chip: string;
}

/**
 * Pre-built Tailwind class strings per accent. Every value below is a
 * complete, literal class name so Tailwind's scanner can find it.
 */
export const ACCENT_CLASSES: Record<Accent, AccentClasses> = {
  sky: {
    bg: "bg-sky-50",
    solidBg: "bg-sky-400",
    solidBgHover: "hover:bg-sky-500",
    text: "text-sky-700",
    border: "border-sky-200",
    ring: "ring-sky-300",
    chip: "bg-sky-100 text-sky-700",
  },
  green: {
    bg: "bg-emerald-50",
    solidBg: "bg-emerald-400",
    solidBgHover: "hover:bg-emerald-500",
    text: "text-emerald-700",
    border: "border-emerald-200",
    ring: "ring-emerald-300",
    chip: "bg-emerald-100 text-emerald-700",
  },
  orange: {
    bg: "bg-orange-50",
    solidBg: "bg-orange-400",
    solidBgHover: "hover:bg-orange-500",
    text: "text-orange-700",
    border: "border-orange-200",
    ring: "ring-orange-300",
    chip: "bg-orange-100 text-orange-700",
  },
  yellow: {
    bg: "bg-yellow-50",
    solidBg: "bg-yellow-400",
    solidBgHover: "hover:bg-yellow-500",
    text: "text-yellow-700",
    border: "border-yellow-200",
    ring: "ring-yellow-300",
    chip: "bg-yellow-100 text-yellow-700",
  },
  pink: {
    bg: "bg-pink-50",
    solidBg: "bg-pink-400",
    solidBgHover: "hover:bg-pink-500",
    text: "text-pink-700",
    border: "border-pink-200",
    ring: "ring-pink-300",
    chip: "bg-pink-100 text-pink-700",
  },
  purple: {
    bg: "bg-purple-50",
    solidBg: "bg-purple-400",
    solidBgHover: "hover:bg-purple-500",
    text: "text-purple-700",
    border: "border-purple-200",
    ring: "ring-purple-300",
    chip: "bg-purple-100 text-purple-700",
  },
};

/** Looks up the class set for an accent. Convenience wrapper over `ACCENT_CLASSES`. */
export function getAccentClasses(accent: Accent): AccentClasses {
  return ACCENT_CLASSES[accent];
}
