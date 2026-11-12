import {
  Activity,
  Brain,
  Heart,
  Moon,
  Smile,
  Sun,
  Users,
} from "lucide-react";

const ICON_MAP = {
  Activity,
  Brain,
  Heart,
  Moon,
  Smile,
  Sun,
  Users,
};

const ICON_TONES = {
  sage: "bg-[#dce8d5] text-[#355b44]",
  softSage: "bg-[#e3ebdf] text-[#4b7355]",
  warm: "bg-[#fbf2e3] text-[#7a4c28]",
  alert: "bg-[#fdf0ec] text-[#8c3b2b]",
};

const LABEL_TONES = {
  sage: "text-[#69836b]",
  softSage: "text-[#69836b]",
  warm: "text-[#7a4c28]",
  alert: "text-[#8c3b2b]",
};

/**
 * Reusable metric card styled after CalmWind Hero's floating status cards.
 */
export default function MetricCard({
  icon = null,
  iconName = "",
  label,
  value,
  sublabel = "",
  tone = "sage",
  className = "",
}) {
  const IconComponent = icon || (iconName ? ICON_MAP[iconName] : null);
  const iconTone = ICON_TONES[tone] || ICON_TONES.sage;
  const labelTone = LABEL_TONES[tone] || LABEL_TONES.sage;

  return (
    <div
      className={`calm-card p-4 sm:p-5 bg-[#fffefa]/95 flex items-center gap-3.5 ${className}`}
    >
      {IconComponent && (
        <div
          className={`h-10 w-10 grid place-items-center rounded-xl shrink-0 ${iconTone}`}
          aria-hidden="true"
        >
          <IconComponent size={20} />
        </div>
      )}
      <div className="text-left min-w-0">
        <p
          className={`text-[11px] font-semibold tracking-wider uppercase truncate ${labelTone}`}
        >
          {label}
        </p>
        <p className="text-base font-medium text-[#243b32] truncate">{value}</p>
        {sublabel && (
          <p className="text-xs text-[#7b827a] truncate mt-0.5">{sublabel}</p>
        )}
      </div>
    </div>
  );
}
