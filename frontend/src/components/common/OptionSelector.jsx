/**
 * Reusable single-select option input supporting rich visual cards ("card")
 * and compact pill buttons ("pill").
 */
export default function OptionSelector({
  label,
  subtitle = "",
  options = [],
  value,
  onChange,
  variant = "pill",
  columnsClass = "grid-cols-2 sm:grid-cols-5",
}) {
  const normalized = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  return (
    <div className="mb-7 last:mb-0">
      {label && (
        <label className="block text-[15px] font-semibold text-[#243b32] mb-1.5">
          {label}
        </label>
      )}
      {subtitle && (
        <p className="text-xs sm:text-sm text-[#7b827a] mb-3.5 leading-relaxed">
          {subtitle}
        </p>
      )}

      {variant === "card" ? (
        <div className={`grid gap-3 mt-3 ${columnsClass}`}>
          {normalized.map((opt) => {
            const isSelected = value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onChange(opt.value)}
                className={`p-4 rounded-2xl border-2 text-center cursor-pointer transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#62866b] ${
                  isSelected
                    ? "border-[#355b44] bg-[#dce8d5]/70 text-[#1a2c25] shadow-xs -translate-y-0.5"
                    : "border-[#e7e9df] bg-white hover:border-[#cadcbd] hover:bg-[#f7f9f4] text-[#243b32]"
                }`}
              >
                {opt.emoji && (
                  <div className="text-3xl mb-2 leading-none" aria-hidden="true">
                    {opt.emoji}
                  </div>
                )}
                <span className="text-xs font-semibold block">{opt.label}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2.5 mt-3">
          {normalized.map((opt) => {
            const isSelected = value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onChange(opt.value)}
                className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium cursor-pointer transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#62866b] ${
                  isSelected
                    ? "bg-[#355b44] border-[#355b44] text-white shadow-xs"
                    : "bg-white border-[#dfe4d9] text-[#243b32] hover:border-[#8bb99a] hover:bg-[#f7f9f4]"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

