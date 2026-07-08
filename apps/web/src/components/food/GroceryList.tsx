import { GROCERY_LIST } from "@b3os/core";
import { Card } from "@/components/ui/Card";
import { getAccentClasses } from "@/lib/accents";

const CATEGORY_EMOJIS = {
  protein: "🥚",
  vegetables: "🥗",
  emergencyShelf: "📦",
};

interface GroceryCategory {
  id: keyof typeof GROCERY_LIST;
  label: string;
  emoji: string;
}

const CATEGORIES: GroceryCategory[] = [
  { id: "protein", label: "Protein", emoji: "🥚" },
  { id: "vegetables", label: "Vegetables", emoji: "🥗" },
  { id: "emergencyShelf", label: "Emergency Shelf", emoji: "📦" },
];

export function GroceryList() {
  const accentClasses = getAccentClasses("green");

  return (
    <Card accent="green">
      <div className="mb-6 flex items-center gap-2">
        <span className="text-2xl">🛒</span>
        <h2 className={`font-heading text-xl font-bold ${accentClasses.text}`}>
          Grocery List
        </h2>
      </div>
      <div className="space-y-6">
        {CATEGORIES.map((category) => (
          <div key={category.id}>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xl">{category.emoji}</span>
              <h3 className={`font-semibold ${accentClasses.text}`}>
                {category.label}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {GROCERY_LIST[category.id].map((item) => (
                <div
                  key={item}
                  className={`rounded-full ${accentClasses.chip} px-3 py-2 text-sm font-medium`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
