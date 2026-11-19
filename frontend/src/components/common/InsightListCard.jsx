import CalmCard from "./CalmCard";

const HEADER_ICON_TONES = {
  sage: "bg-[#dce8d5] text-[#355b44]",
  softSage: "bg-[#eef3e8] text-[#4b7355]",
  warm: "bg-[#fbf2e3] text-[#7a4c28]",
};

const ITEM_CONTAINER_TONES = {
  sage: "bg-[#f7f9f4] border-[#e7e9df]",
  softSage: "bg-[#f3f5ed] border-[#dce8d5]",
  warm: "bg-[#fbf2e3]/70 border-[#f0debe]",
};

const ITEM_ICON_TONES = {
  sage: "text-[#355b44]",
  softSage: "text-[#4b7355]",
  warm: "text-[#7a4c28]",
};

/**
 * Reusable card presenting a header and list of observations or recommendations.
 */
export default function InsightListCard({
  title,
  subtitle = "",
  icon: Icon,
  itemIcon: ItemIcon,
  items = [],
  tone = "sage",
  emptyText = "Nothing to note yet.",
}) {
  const headerTone = HEADER_ICON_TONES[tone] || HEADER_ICON_TONES.sage;
  const itemBg = ITEM_CONTAINER_TONES[tone] || ITEM_CONTAINER_TONES.sage;
  const itemIconColor = ITEM_ICON_TONES[tone] || ITEM_ICON_TONES.sage;

  return (
    <CalmCard padding="md" className="h-full">
      <div className="flex items-center gap-3.5 mb-5">
        {Icon && (
          <div
            className={`h-11 w-11 grid place-items-center rounded-2xl shrink-0 ${headerTone}`}
            aria-hidden="true"
          >
            <Icon size={21} />
          </div>
        )}
        <div>
          <h3 className="font-serif text-xl font-medium text-[#243b32]">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs sm:text-sm text-[#7b827a]">{subtitle}</p>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-[#7b827a]">{emptyText}</p>
      ) : (
        <ul className="space-y-3">
          {items.map((text, index) => (
            <li
              key={`${index}-${text.slice(0, 18)}`}
              className={`p-3.5 rounded-xl border flex items-start gap-3 ${itemBg}`}
            >
              {ItemIcon && (
                <ItemIcon
                  size={18}
                  className={`mt-0.5 shrink-0 ${itemIconColor}`}
                  aria-hidden="true"
                />
              )}
              <p className="text-sm text-[#243b32] leading-relaxed">{text}</p>
            </li>
          ))}
        </ul>
      )}
    </CalmCard>
  );
}

