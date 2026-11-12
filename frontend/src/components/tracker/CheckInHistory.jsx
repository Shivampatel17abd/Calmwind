import { Trash2 } from "lucide-react";
import CalmCard from "../common/CalmCard";
import ProgressBar from "../common/ProgressBar";
import SectionBadge from "../common/SectionBadge";

/**
 * Displays recent mental health check-ins stored locally in the browser.
 */
export default function CheckInHistory({ history = [], onClear }) {
  if (history.length === 0) return null;

  return (
    <section className="max-w-4xl mx-auto mt-10 animate-fade-in">
      <CalmCard padding="md">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="font-serif text-xl font-medium text-[#243b32]">
              Recent Check-in History
            </h3>
            <p className="text-xs sm:text-sm text-[#7b827a]">
              Your last {history.length} mental wellbeing snapshot
              {history.length > 1 ? "s" : ""} saved on this device
            </p>
          </div>

          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#7b827a] hover:text-[#8c3b2b] hover:bg-[#fdf0ec] border border-[#e7e9df] transition-colors cursor-pointer"
          >
            <Trash2 size={14} />
            <span>Clear history</span>
          </button>
        </div>

        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-[#f7f9f4] border border-[#e7e9df] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <SectionBadge tone={item.tone || "sage"}>
                    {item.badgeLabel}
                  </SectionBadge>
                  <span className="text-xs text-[#7b827a]">
                    {item.date} · {item.time}
                  </span>
                </div>
                <p className="text-sm font-medium text-[#243b32]">
                  {item.status}
                </p>
                <p className="text-xs text-[#7b827a] mt-0.5">
                  Mood: {item.mood} · Stress: {item.stress}/10 · Sleep:{" "}
                  {item.sleepHours} hrs
                </p>
              </div>

              <div className="w-full sm:w-44 shrink-0">
                <ProgressBar
                  value={item.score}
                  max={100}
                  valueText={`${item.score}/100`}
                  tone={item.tone || "sage"}
                  size="sm"
                />
              </div>
            </div>
          ))}
        </div>
      </CalmCard>
    </section>
  );
}

