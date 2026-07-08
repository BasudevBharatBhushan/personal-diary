import { PHILOSOPHY_TEXT } from "@b3os/core";
import { Card } from "@/components/ui/Card";

export function PhilosophyCard() {
  return (
    <div className="flex justify-center">
      <Card accent="purple" className="max-w-2xl text-center space-y-6">
        <p className="text-lg leading-relaxed text-stone-700 whitespace-pre-line font-medium">
          {PHILOSOPHY_TEXT}
        </p>
      </Card>
    </div>
  );
}
