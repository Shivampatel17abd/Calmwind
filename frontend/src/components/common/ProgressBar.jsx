const FILL_TONES = {
  sage: "bg-[#355b44]",
  softSage: "bg-[#62866b]",
  warm: "bg-[#b7793c]",
  alert: "bg-[#b85a47]",
};

const TEXT_TONES = {
  sage: "text-[#355b44]",
  softSage: "text-[#4b7355]",
  warm: "text-[#7a4c28]",
  alert: "text-[#8c3b2b]",
};

/**
 * Reusable progress meter for assessment steps and mental health domain breakdowns.
 */
export default function ProgressBar({
  value,
  max = 100,
  label = "",
  valueText = "",
  tone = "sage",
  size = "md",
  className = "",
}) {
  const clampedPercent = Math.max(0, Math.min(100, (value / max) * 100));
  const fillClass = FILL_TONES[tone] || FILL_TONES.sage;
  const textClass = TEXT_TONES[tone] || TEXT_TONES.sage;
  const heightClass = size === "sm" ? "h-2" : "h-2.5";

  return (
    <div className={className}>
      {(label || valueText) && (
        <div className="flex items-center justify-between gap-2 mb-2">
          {label && (
            <span className="text-sm font-semibold text-[#243b32]">{label}</span>
          )}
          {valueText && (
            <span className={`text-xs font-bold tracking-wide ${textClass}`}>
              {valueText}
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full rounded-full bg-[#e7e9df] overflow-hidden ${heightClass}`}
        role="progressbar"
        aria-valuenow={Math.round(value)}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || "Progress"}
      >
        <div
          className={`${heightClass} rounded-full transition-all duration-500 ease-out ${fillClass}`}
          style={{ width: `${clampedPercent}%` }}
        />
      </div>
    </div>
  );
}

