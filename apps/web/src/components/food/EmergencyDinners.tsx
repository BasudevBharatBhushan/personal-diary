import { EMERGENCY_DINNERS } from "@b3os/core";
import { Card } from "@/components/ui/Card";
import { getAccentClasses } from "@/lib/accents";

const EMERGENCY_EMOJIS = ["🚨", "🆘", "💚", "⚡"];

export function EmergencyDinners() {
  const accentClasses = getAccentClasses("green");

  return (
    <Card accent="green">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-2xl">🚀</span>
        <h2 className={`font-heading text-xl font-bold ${accentClasses.text}`}>
          Emergency Options
        </h2>
      </div>
      <p className="mb-4 text-sm text-stone-600">
        When energy is low, these are your no-think solutions. Any of these is infinitely better than skipping dinner.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {EMERGENCY_DINNERS.map((dinner, idx) => (
          <div
            key={dinner}
            className={`rounded-2xl ${accentClasses.bg} border-2 ${accentClasses.border} p-4`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">
                {EMERGENCY_EMOJIS[idx % EMERGENCY_EMOJIS.length]}
              </span>
              <p className={`text-base font-semibold ${accentClasses.text}`}>
                {dinner}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
