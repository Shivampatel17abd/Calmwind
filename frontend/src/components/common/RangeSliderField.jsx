import SectionBadge from "./SectionBadge";

/**
 * Reusable slider field styled in CalmWind's forest-and-sage palette.
 */
export default function RangeSliderField({
  id,
  label,
  subtitle = "",
  icon: Icon = null,
  value,
  onChange,
  min = 1,
  max = 10,
  step = 1,
  unit = "",
  minLabel = "",
  maxLabel = "",
  getTone = null,
  getBadgeLabel = null,
}) {
  const badgeText = getBadgeLabel ? getBadgeLabel(value) : `${value}${unit}`;
  const badgeTone = getTone ? getTone(value) : "sage";

  return (
    <div className="mb-7 last:mb-0">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <label
          htmlFor={id}
          className="text-[15px] font-semibold text-[#243b32] flex items-center gap-2"
        >
          {Icon && <Icon size={18} className="text-[#4b7355] shrink-0" />}
          <span>{label}</span>
        </label>

        <SectionBadge tone={badgeTone}>{badgeText}</SectionBadge>
      </div>

      {subtitle && (
        <p className="text-xs sm:text-sm text-[#7b827a] mb-3 leading-relaxed">
          {subtitle}
        </p>
      )}

      <div className="rounded-xl bg-[#f7f9f4] border border-[#e7e9df] px-4 py-3.5">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-[#355b44] cursor-pointer"
        />

        {(minLabel || maxLabel) && (
          <div className="flex justify-between text-[11px] font-medium text-[#7b827a] mt-2">
            <span>{minLabel}</span>
            <span>{maxLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}

