const BADGE_TONES = {
  sage: "text-[#355b44] bg-[#dce8d5]/85 border-[#cadcbd]",
  softSage: "text-[#4b7355] bg-[#eef3e8] border-[#dce8d5]",
  warm: "text-[#7a4c28] bg-[#fbf2e3] border-[#f0debe]",
  alert: "text-[#8c3b2b] bg-[#fdf0ec] border-[#f1cfc7]",
  neutral: "text-[#69836b] bg-[#f3f5ed] border-[#e7e9df]",
};

/**
 * Reusable CalmWind pill badge for section eyebrows, status tags, and slider readouts.
 */
export default function SectionBadge({
  children,
  icon = null,
  tone = "sage",
  className = "",
}) {
  const toneClass = BADGE_TONES[tone] || BADGE_TONES.sage;

  return (
    <span
      className={`inline-flex items-center gap-2 px-3.5 py-1 text-[11px] font-bold tracking-[1.8px] uppercase rounded-full border ${toneClass} ${className}`}
    >
      {icon && <span className="inline-flex items-center shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

