import { Card } from "@/components/ui/Card";
import type { Accent } from "@/lib/accents";

export interface EmptyStateProps {
  accent: Accent;
  message: string;
}

/** A friendly placeholder card — used for "coming soon" routes and empty lists. */
export function EmptyState({ accent, message }: EmptyStateProps) {
  return (
    <Card accent={accent} className="text-center text-stone-500">
      {message}
    </Card>
  );
}
