import type { Accent } from "@/lib/accents";

export interface NavItem {
  href: string;
  label: string;
  /** Compact label for the mobile bottom nav (avoids clipping on narrow phones). */
  short: string;
  emoji: string;
  accent: Accent;
}

/** The app's full navigation, in sidebar/nav order. Shared by Sidebar and any future nav UI. */
export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Dashboard", short: "Home", emoji: "🏠", accent: "sky" },
  { href: "/decisions", label: "Decision Panel", short: "Decide", emoji: "📝", accent: "orange" },
  { href: "/tomorrow", label: "Tomorrow Card", short: "Tomorrow", emoji: "🌙", accent: "purple" },
  { href: "/reflect", label: "Day Close", short: "Reflect", emoji: "🌙", accent: "purple" },
  { href: "/thoughts", label: "Random Thoughts", short: "Notes", emoji: "💭", accent: "yellow" },
  { href: "/journal", label: "Journal", short: "Journal", emoji: "📔", accent: "green" },
  { href: "/food", label: "Food System", short: "Food", emoji: "🍽️", accent: "green" },
  { href: "/sunday", label: "Sunday Reset", short: "Reset", emoji: "🧺", accent: "pink" },
  { href: "/rules", label: "Rules", short: "Rules", emoji: "📏", accent: "sky" },
  { href: "/philosophy", label: "Philosophy", short: "Wisdom", emoji: "🌿", accent: "purple" },
];
