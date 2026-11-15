import { useState } from "react";
import { CheckSquare, Heart, Pin, Plus, Sparkles } from "lucide-react";
import CalmCard from "../common/CalmCard";
import { QUICK_SUGGESTIONS } from "../../utils/notesStorage";

const CATEGORY_OPTIONS = [
  { id: "task", label: "Study & Task", icon: CheckSquare, tone: "softSage" },
  { id: "health", label: "Health & Wellbeing", icon: Heart, tone: "sage" },
  { id: "reflection", label: "Mindful Thought", icon: Sparkles, tone: "warm" },
];

/**
 * Minimalist input card for creating points and health reminders.
 * Reuses CalmCard and standard CalmWind button styles.
 */
export default function NoteInput({ onAddNote }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("task");
  const [pinned, setPinned] = useState(false);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!text.trim()) return;

    onAddNote({ text: text.trim(), category, pinned });
    setText("");
    setPinned(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleApplySuggestion = (suggestion) => {
    onAddNote({
      text: suggestion.text,
      category: suggestion.category,
      pinned: false,
    });
  };

  return (
    <CalmCard padding="md" className="max-w-3xl mx-auto mb-7 shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <label
            htmlFor="notepad-input"
            className="text-sm font-semibold text-[#243b32]"
          >
            Add a new point or reminder
          </label>

          {/* Category Selector Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORY_OPTIONS.map((cat) => {
              const Icon = cat.icon;
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[#355b44] text-white shadow-xs"
                      : "bg-[#f3f5ed] text-[#7b827a] hover:bg-[#dce8d5]/60 hover:text-[#243b32]"
                  }`}
                >
                  <Icon size={13} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Textarea */}
        <div className="relative">
          <textarea
            id="notepad-input"
            rows={2}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              category === "health"
                ? "e.g., Drink water & stretch for 5 minutes away from the desk..."
                : category === "task"
                  ? "e.g., Review chapter 3 summary before tomorrow's class..."
                  : "e.g., A calm reminder: take things one moment at a time..."
            }
            className="w-full rounded-xl border border-[#dfe4d9] bg-white p-3.5 sm:p-4 text-sm text-[#243b32] outline-none resize-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#a5aaa2] focus:border-[#62866b] focus:shadow-[0_0_0_3px_rgba(98,134,107,0.13)]"
          />
        </div>

        {/* Controls row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-[#eceee7]">
          <label className="inline-flex items-center gap-2 text-xs font-medium text-[#7b827a] cursor-pointer hover:text-[#243b32] select-none">
            <input
              type="checkbox"
              checked={pinned}
              onChange={(e) => setPinned(e.target.checked)}
              className="accent-[#355b44] h-3.5 w-3.5 rounded"
            />
            <Pin size={13} className={pinned ? "text-[#355b44]" : ""} />
            <span>Pin to top</span>
          </label>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[11px] text-[#7b827a]">
              Press <kbd className="px-1.5 py-0.5 rounded bg-[#f3f5ed] border border-[#e7e9df] text-[10px] font-mono">Enter ↵</kbd> to add
            </span>
            <button
              type="submit"
              disabled={!text.trim()}
              className="btn-primary py-2 px-4 text-xs sm:text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus size={15} />
              <span>Add Point</span>
            </button>
          </div>
        </div>
      </form>

      {/* Quick suggestions row */}
      <div className="mt-3.5 pt-3 border-t border-[#f3f5ed] flex items-center gap-2 overflow-x-auto text-xs pb-0.5">
        <span className="text-[11px] font-semibold text-[#7b827a] shrink-0 uppercase tracking-wider">
          Quick add:
        </span>
        {QUICK_SUGGESTIONS.map((s, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleApplySuggestion(s)}
            className="shrink-0 px-2.5 py-1 rounded-lg bg-[#f7f9f4] hover:bg-[#dce8d5]/70 text-[#4b7355] border border-[#e7e9df] transition-colors cursor-pointer text-xs"
          >
            + {s.text}
          </button>
        ))}
      </div>
    </CalmCard>
  );
}

