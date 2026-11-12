import { Activity, Brain } from "lucide-react";
import OptionSelector from "../common/OptionSelector";
import RangeSliderField from "../common/RangeSliderField";
import { FOCUS_OPTIONS, MOOD_OPTIONS } from "../../utils/mentalHealthModel";

function getIntensityTone(val) {
  if (val >= 7) return "warm";
  if (val >= 4) return "softSage";
  return "sage";
}

function getIntensityBadge(val) {
  const level = val >= 7 ? "High" : val >= 4 ? "Moderate" : "Low";
  return `${val}/10 · ${level}`;
}

/**
 * Step 1: Collects core emotional state (mood, stress, anxiety, focus/overwhelm)
 * by composing reusable OptionSelector and RangeSliderField components.
 */
export default function EmotionalCheckInStep({ form, onUpdate }) {
  return (
    <div>
      <OptionSelector
        label="1. How have you been feeling overall lately?"
        subtitle="Select the option that feels closest to your mood over the last few days."
        options={MOOD_OPTIONS}
        value={form.mood}
        onChange={(val) => onUpdate("mood", val)}
        variant="card"
      />

      <RangeSliderField
        id="stress-slider"
        label="2. Current stress level"
        subtitle="Consider academic deadlines, workload, or everyday pressure."
        icon={Activity}
        value={form.stress}
        onChange={(val) => onUpdate("stress", val)}
        min={1}
        max={10}
        minLabel="1 · Very calm"
        maxLabel="10 · Overwhelming"
        getTone={getIntensityTone}
        getBadgeLabel={getIntensityBadge}
      />

      <RangeSliderField
        id="anxiety-slider"
        label="3. Anxiety or worry frequency"
        subtitle="How often have restless or anxious thoughts been showing up?"
        icon={Brain}
        value={form.anxiety}
        onChange={(val) => onUpdate("anxiety", val)}
        min={1}
        max={10}
        minLabel="1 · Rarely"
        maxLabel="10 · Very frequently"
        getTone={getIntensityTone}
        getBadgeLabel={getIntensityBadge}
      />

      <OptionSelector
        label="4. How does your mental focus feel right now?"
        options={FOCUS_OPTIONS}
        value={form.focusOverwhelm}
        onChange={(val) => onUpdate("focusOverwhelm", val)}
        variant="pill"
      />
    </div>
  );
}

