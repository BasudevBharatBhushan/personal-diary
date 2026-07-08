import { NEVER_SKIP_DINNER_RULE } from "@b3os/core";
import { Card } from "@/components/ui/Card";
import { getAccentClasses } from "@/lib/accents";

export function FoodRule() {
  const accentClasses = getAccentClasses("green");

  return (
    <Card accent="green" className={`${accentClasses.bg} text-center`}>
      <div className="mb-4 text-4xl">💚</div>
      <h2 className={`font-heading text-2xl font-bold ${accentClasses.text}`}>
        The One Rule
      </h2>
      <p className={`mt-4 text-lg font-semibold ${accentClasses.text}`}>
        {NEVER_SKIP_DINNER_RULE}
      </p>
      <p className="mt-3 text-sm text-stone-600">
        This isn't about perfection. It's about survival. When everything feels hard, dinner is non-negotiable.
      </p>
    </Card>
  );
}
