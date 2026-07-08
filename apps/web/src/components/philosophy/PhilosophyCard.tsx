import { PHILOSOPHY_ENTRIES, PHILOSOPHY_TEXT } from "@b3os/core";
import { Card } from "@/components/ui/Card";

export function PhilosophyCard() {
  return (
    <div className="flex flex-col items-center gap-6">
      <Card accent="purple" className="max-w-2xl text-center space-y-6">
        <p className="text-lg leading-relaxed text-stone-700 whitespace-pre-line font-medium">
          {PHILOSOPHY_TEXT}
        </p>
      </Card>

      {PHILOSOPHY_ENTRIES.map((entry) => (
        <Card
          key={entry.text}
          accent="purple"
          className="max-w-2xl text-center space-y-4"
        >
          <p className="text-lg leading-relaxed text-stone-700 font-medium">
            {entry.text}
          </p>
          {entry.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={entry.imageUrl}
              alt={entry.text}
              className="mx-auto rounded-2xl"
            />
          )}
        </Card>
      ))}
    </div>
  );
}
