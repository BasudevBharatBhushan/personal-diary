/** The exact philosophy quote, verbatim from the product spec. */
export const PHILOSOPHY_TEXT = `I don't need more motivation.

I need fewer decisions.

My system should make low-energy days easier and high-energy days productive.

The goal isn't perfect days.

The goal is consistency.`;

export interface PhilosophyEntry {
  text: string;
  imageUrl?: string;
}

/** Standalone philosophy statements, rendered below the main quote. */
export const PHILOSOPHY_ENTRIES: PhilosophyEntry[] = [
  {
    text: "The only thing permanent in life is impermanence.",
    imageUrl:
      "https://cdn.mos.cms.futurecdn.net/Ldv5w2rJeCePjaHAoNHf6f-1200-80.png",
  },
];
