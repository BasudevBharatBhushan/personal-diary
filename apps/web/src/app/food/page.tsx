import { PageShell } from "@/components/ui/PageShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { DinnerRotation } from "@/components/food/DinnerRotation";
import { EmergencyDinners } from "@/components/food/EmergencyDinners";
import { FoodRule } from "@/components/food/FoodRule";
import { GroceryList } from "@/components/food/GroceryList";

export default function FoodPage() {
  return (
    <PageShell>
      <PageHeader
        emoji="🍽️"
        title="Food System"
        subtitle="Eat well. Think less. Live better."
        accent="green"
      />
      <div className="space-y-6">
        <DinnerRotation />
        <FoodRule />
        <EmergencyDinners />
        <GroceryList />
      </div>
    </PageShell>
  );
}
