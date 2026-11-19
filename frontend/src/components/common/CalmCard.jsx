const TONE_STYLES = {
  default: "bg-[#fffefa] border-[#e7e9df]",
  sage: "bg-[#f7f9f4] border-[#cadcbd]",
  softSage: "bg-[#f3f5ed] border-[#dce8d5]",
  warm: "bg-[#fbf2e3] border-[#f0debe]",
  alert: "bg-[#fdf0ec] border-[#f1cfc7]",
};

const PADDING_STYLES = {
  none: "",
  sm: "p-4 sm:p-5",
  md: "p-6 sm:p-7",
  lg: "p-7 sm:p-9",
};

/**
 * Reusable CalmWind surface card matching the site's organic cream-and-sage aesthetic.
 */
export default function CalmCard({
  children,
  tone = "default",
  padding = "md",
  hoverable = false,
  className = "",
}) {
  const toneClass = TONE_STYLES[tone] || TONE_STYLES.default;
  const paddingClass = PADDING_STYLES[padding] ?? PADDING_STYLES.md;
  const hoverClass = hoverable
    ? "hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(39,62,48,0.12)] hover:border-[#cadcbd]"
    : "";

  return (
    <div
      className={`rounded-[22px] border shadow-[0_18px_55px_rgba(39,62,48,0.08)] transition-all duration-300 ${toneClass} ${paddingClass} ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
}

