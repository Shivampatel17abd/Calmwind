import { CheckCircle2, CheckSquare, Heart, Search, Sparkles, X } from "lucide-react";

const FILTER_ITEMS = [
  { id: "all", label: "All", icon: null },
  { id: "task", label: "Tasks", icon: CheckSquare },
  { id: "health", label: "Health", icon: Heart },
  { id: "reflection", label: "Thoughts", icon: Sparkles },
  { id: "completed", label: "Done", icon: CheckCircle2 },
];

/**
 * Filter bar for filtering notes by category or search text.
 */
export default function NotesFilterBar({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  counts = {},
  onClearCompleted,
  hasCompleted = false,
}) {
  return (
    <div className="max-w-3xl mx-auto mb-5 space-y-3">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {FILTER_ITEMS.map((item) => {
            const count = counts[item.id] || 0;
            const isSelected = activeFilter === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onFilterChange(item.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  isSelected
                    ? "bg-[#355b44] text-white shadow-xs"
                    : "bg-[#fffefa] text-[#7b827a] border border-[#e7e9df] hover:border-[#cadcbd] hover:text-[#243b32]"
                }`}
              >
                {Icon && <Icon size={12} />}
                <span>{item.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-[#243b32] text-white" : "bg-[#f3f5ed] text-[#7b827a]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Clear Completed Action */}
        {hasCompleted && (
          <button
            type="button"
            onClick={onClearCompleted}
            className="self-end sm:self-auto text-xs font-medium text-[#7b827a] hover:text-[#8c3b2b] transition-colors cursor-pointer"
          >
            Clear completed
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#7b827a]">
          <Search size={15} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search points by keyword..."
          className="w-full h-10 pl-9 pr-9 rounded-xl border border-[#dfe4d9] bg-[#fffefa] text-xs sm:text-sm text-[#243b32] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#a5aaa2] focus:border-[#62866b] focus:shadow-[0_0_0_3px_rgba(98,134,107,0.13)]"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute inset-y-0 right-3 flex items-center text-[#7b827a] hover:text-[#243b32] cursor-pointer"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

