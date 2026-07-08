import type { DinnerDay, GroceryList } from "./types";

/** The weekly dinner rotation — decided once, not re-decided nightly. */
export const DINNER_ROTATION: DinnerDay[] = [
  { day: "Monday", dinner: "Black Chana + Moong Dosa" },
  { day: "Tuesday", dinner: "Steamed Vegetables + Paneer" },
  { day: "Wednesday", dinner: "Outside Dosa" },
  { day: "Thursday", dinner: "Black Chana + Moong Dosa" },
  { day: "Friday", dinner: "Litti Chokha" },
  { day: "Saturday", dinner: "Healthy Wrap / Subway", note: "Max twice/month" },
  { day: "Sunday", dinner: "Free Choice" },
];

/** Fallback dinners for when there's no energy to cook or plan. */
export const EMERGENCY_DINNERS: string[] = [
  "Bread + Peanut Butter",
  "Instant Oats",
  "Roasted Chana",
  "Paneer Sandwich",
];

/** The one non-negotiable food rule. */
export const NEVER_SKIP_DINNER_RULE =
  "Never skip dinner. Anything is better than starving.";

/** Grocery list, grouped by category, for the weekly Sunday shop. */
export const GROCERY_LIST: GroceryList = {
  protein: ["Black Chana", "Green Moong", "Paneer", "Tofu", "Roasted Chana", "Peanuts"],
  vegetables: ["Carrot", "Beans", "Broccoli", "Capsicum"],
  emergencyShelf: ["Bread", "Oats", "Dry Fruits", "Peanut Butter", "Makhana"],
};
