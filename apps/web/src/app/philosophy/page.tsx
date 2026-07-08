import { PageShell } from "@/components/ui/PageShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { PhilosophyCard } from "@/components/philosophy/PhilosophyCard";

export default function PhilosophyPage() {
  return (
    <PageShell>
      <PageHeader
        emoji="🌿"
        title="Philosophy"
        subtitle="Why this system exists."
        accent="purple"
      />
      <PhilosophyCard />
    </PageShell>
  );
}
