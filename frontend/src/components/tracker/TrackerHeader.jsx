import SectionBadge from "../common/SectionBadge";
import MetricCard from "../common/MetricCard";
import { WELLNESS_DIMENSIONS } from "../../utils/mentalHealthModel";

/**
 * Hero header for the Mental Health Tracker page using CalmWind's signature
 * serif typography, ambient sage glow, and reusable MetricCards.
 */
export default function TrackerHeader({ isCompleted = false }) {
  return (
    <header className="relative text-center max-w-4xl mx-auto mb-10 sm:mb-12">
      <div
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-56 w-[520px] max-w-full rounded-full bg-[radial-gradient(ellipse_at_center,rgba(202,220,189,0.5),transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">
        <SectionBadge icon={<span aria-hidden="true">✿</span>} tone="sage">
          {isCompleted ? "Your Mental Health Status" : "Mental Wellbeing Check-in"}
        </SectionBadge>

        <h1 className="mt-5 font-serif text-3xl sm:text-5xl font-normal tracking-[-1px] text-[#243b32] leading-[1.16]">
          {isCompleted
            ? "Here is how your mind is doing today"
            : "Understand your mental wellbeing"}
        </h1>

        <p className="mt-4 text-sm sm:text-base text-[#7b827a] leading-[1.7] max-w-2xl mx-auto">
          {isCompleted
            ? "A calm, holistic reflection based on your emotional state, stress load, sleep, and daily support."
            : "Take two quiet minutes to share your mood, stress, sleep, and daily habits to check your current mental health status."}
        </p>
      </div>

      {!isCompleted && (
        <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {WELLNESS_DIMENSIONS.map((item) => (
            <MetricCard
              key={item.label}
              iconName={item.iconName}
              label={item.label}
              value={item.value}
              sublabel={item.sublabel}
              tone={item.tone}
            />
          ))}
        </div>
      )}
    </header>
  );
}

