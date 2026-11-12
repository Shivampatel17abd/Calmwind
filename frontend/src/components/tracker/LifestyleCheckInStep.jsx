import { Moon } from "lucide-react";
import OptionSelector from "../common/OptionSelector";
import RangeSliderField from "../common/RangeSliderField";
import { LIFESTYLE_QUESTIONS } from "../../utils/mentalHealthModel";

function getSleepTone(hours) {
  if (hours >= 7 && hours <= 9) return "sage";
  if (hours >= 6) return "softSage";
  return "warm";
}

function getSleepBadge(hours) {
  const note =
    hours >= 7 && hours <= 9 ? "Restorative" : hours < 6 ? "Short" : "Fair";
  return `${hours} hrs · ${note}`;
}

/**
 * Step 2: Collects sleep, energy, movement, support, self-care, and optional thoughts
 * by reusing RangeSliderField and mapping OptionSelector across question definitions.
 */
export default function LifestyleCheckInStep({ form, onUpdate }) {
  return (
    <div>
      <RangeSliderField
        id="sleep-slider"
        label="5. Average nightly sleep duration"
        subtitle="Slide to your usual hours of sleep over the past few nights."
        icon={Moon}
        value={form.sleepHours}
        onChange={(val) => onUpdate("sleepHours", val)}
        min={2}
        max={12}
        step={0.5}
        minLabel="2 hrs"
        maxLabel="12 hrs"
        getTone={getSleepTone}
        getBadgeLabel={getSleepBadge}
      />

      {LIFESTYLE_QUESTIONS.map((q) => (
        <OptionSelector
          key={q.field}
          label={q.label}
          subtitle={q.subtitle}
          options={q.options}
          value={form[q.field]}
          onChange={(val) => onUpdate(q.field, val)}
          variant="pill"
        />
      ))}

      <div className="mt-7 pt-6 border-t border-[#eceee7]">
        <label
          htmlFor="tracker-concerns"
          className="block text-[15px] font-semibold text-[#243b32] mb-1.5"
        >
          11. Anything specific on your mind? (Optional)
        </label>
        <p className="text-xs sm:text-sm text-[#7b827a] mb-3 leading-relaxed">
          Mention exams, sleep struggles, relationships, or anything else you want reflected in your status.
        </p>
        <textarea
          id="tracker-concerns"
          rows={3}
          value={form.concerns}
          onChange={(e) => onUpdate("concerns", e.target.value)}
          placeholder="e.g., Upcoming exams have made it hard to wind down at night..."
          className="w-full rounded-[12px] border border-[#dfe4d9] bg-white p-4 text-sm text-[#243b32] outline-none resize-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#a5aaa2] focus:border-[#62866b] focus:shadow-[0_0_0_3px_rgba(98,134,107,0.13)]"
        />
      </div>
    </div>
  );
}
