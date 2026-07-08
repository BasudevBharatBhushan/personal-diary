import { PageShell } from "@/components/ui/PageShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { CurrentStatusCard } from "@/components/dashboard/CurrentStatusCard";
import { Timeline } from "@/components/dashboard/Timeline";

export default function DashboardPage() {
  return (
    <PageShell>
      <PageHeader
        emoji="🏠"
        title="Dashboard"
        subtitle="A gentle look at where your day is right now."
        accent="sky"
      />
      <div className="flex flex-col gap-6 sm:gap-8">
        <CurrentStatusCard />
        <Timeline />
      </div>
    </PageShell>
  );
}
