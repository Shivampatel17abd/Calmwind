import { CheckSquare, Heart, Sparkles } from "lucide-react";
import CalmCard from "../common/CalmCard";
import MetricCard from "../common/MetricCard";
import ProgressBar from "../common/ProgressBar";

/**
 * Reusable stats summary card for the Notepad, reusing MetricCard and ProgressBar.
 */
export default function NotesStats({
  total = 0,
  completed = 0,
  healthCount = 0,
  taskCount = 0,
}) {
  if (total === 0) return null;

  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto mb-7 space-y-3.5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <MetricCard
          icon={CheckSquare}
          label="Tasks & Study"
          value={`${taskCount} point${taskCount === 1 ? "" : "s"}`}
          sublabel="Daily actionable items"
          tone="softSage"
        />

        <MetricCard
          icon={Heart}
          label="Health & Habits"
          value={`${healthCount} point${healthCount === 1 ? "" : "s"}`}
          sublabel="Wellbeing & body care"
          tone="sage"
        />

        <MetricCard
          icon={Sparkles}
          label="Overall Progress"
          value={`${completed} / ${total} done`}
          sublabel={`${percent}% completed`}
          tone={percent === 100 ? "sage" : "warm"}
        />
      </div>

      <CalmCard padding="sm" className="bg-[#fffefa]/90">
        <ProgressBar
          label="Points Completion"
          value={completed}
          max={total}
          valueText={`${percent}% completed (${completed}/${total})`}
          tone={percent === 100 ? "sage" : "softSage"}
          size="sm"
        />
      </CalmCard>
    </div>
  );
}

