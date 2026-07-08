import { RULES } from "@b3os/core";
import { RuleCard } from "./RuleCard";

export function RulesDisplay() {
  return (
    <div className="flex flex-col gap-4">
      {RULES.map((rule, index) => (
        <RuleCard key={index} number={index + 1} text={rule} />
      ))}
    </div>
  );
}
