import { Card } from "@/components/ui/Card";
import { getAccentClasses } from "@/lib/accents";

export interface RuleCardProps {
  number: number;
  text: string;
}

export function RuleCard({ number, text }: RuleCardProps) {
  const skyClasses = getAccentClasses("sky");

  return (
    <Card accent="sky" className="flex gap-4">
      <div
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-semibold text-white ${skyClasses.solidBg}`}
      >
        {number}
      </div>
      <p className="text-stone-700 leading-relaxed pt-1">{text}</p>
    </Card>
  );
}
