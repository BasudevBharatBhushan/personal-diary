import { PageShell } from "@/components/ui/PageShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SundayChecklist } from "@/components/sunday/SundayChecklist";

export default function SundayPage() {
  return (
    <PageShell>
      <PageHeader
        emoji="🧺"
        title="Sunday Reset"
        subtitle="The weekly reset checklist."
        accent="pink"
      />
      <SundayChecklist />
    </PageShell>
  );
}
