import { PageShell } from "@/components/ui/PageShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { RulesDisplay } from "@/components/rules/RulesDisplay";

export default function RulesPage() {
  return (
    <PageShell>
      <PageHeader
        emoji="📏"
        title="Rules"
        subtitle="The five rules the whole system runs on."
        accent="sky"
      />
      <RulesDisplay />
    </PageShell>
  );
}
