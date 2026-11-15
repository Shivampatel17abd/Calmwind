import { ClipboardList, Plus, RotateCcw } from "lucide-react";
import CalmCard from "../common/CalmCard";

/**
 * Empty state card for when no notes match search or category filter.
 */
export default function NotesEmptyState({
  isFiltered = false,
  onResetFilter,
  onAddDefault,
}) {
  return (
    <CalmCard padding="lg" className="max-w-2xl mx-auto text-center py-12">
      <div className="h-12 w-12 rounded-2xl bg-[#f0f4ea] text-[#355b44] grid place-items-center mx-auto mb-4">
        <ClipboardList size={24} />
      </div>

      <h3 className="font-serif text-xl font-medium text-[#243b32] mb-1.5">
        {isFiltered ? "No matching points found" : "Your notepad is clear"}
      </h3>

      <p className="text-sm text-[#7b827a] max-w-sm mx-auto leading-relaxed mb-6">
        {isFiltered
          ? "Try adjusting your search terms or switching to another category tab."
          : "Keep track of tasks, water reminders, study breaks, and mindful reflections right here."}
      </p>

      {isFiltered ? (
        <button
          type="button"
          onClick={onResetFilter}
          className="btn-secondary text-xs sm:text-sm cursor-pointer"
        >
          <RotateCcw size={14} />
          <span>Show all points</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onAddDefault}
          className="btn-primary text-xs sm:text-sm cursor-pointer"
        >
          <Plus size={14} />
          <span>Load sample points</span>
        </button>
      )}
    </CalmCard>
  );
}

