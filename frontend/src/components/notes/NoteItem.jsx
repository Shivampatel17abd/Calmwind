import { useState } from "react";
import {
  Check,
  CheckSquare,
  Copy,
  Heart,
  Pin,
  PinOff,
  Sparkles,
  Trash2,
} from "lucide-react";
import CalmCard from "../common/CalmCard";
import SectionBadge from "../common/SectionBadge";

const CATEGORY_MAP = {
  health: {
    label: "Health",
    icon: Heart,
    tone: "sage",
  },
  task: {
    label: "Task",
    icon: CheckSquare,
    tone: "softSage",
  },
  reflection: {
    label: "Thought",
    icon: Sparkles,
    tone: "warm",
  },
};

/**
 * Reusable point item card reusing CalmCard and SectionBadge.
 */
export default function NoteItem({
  note,
  onToggleCompleted,
  onTogglePin,
  onDelete,
}) {
  const [copied, setCopied] = useState(false);
  const cat = CATEGORY_MAP[note.category] || CATEGORY_MAP.task;
  const CategoryIcon = cat.icon;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(note.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback
    }
  };

  return (
    <CalmCard
      padding="sm"
      hoverable={true}
      className={`relative transition-all duration-200 ${
        note.completed ? "bg-[#fbfcf9] opacity-75" : "bg-[#fffefa]"
      } ${note.pinned ? "border-l-4 border-l-[#355b44]" : ""}`}
    >
      <div className="flex items-start gap-3">
        {/* Completion Checkbox */}
        <button
          type="button"
          role="checkbox"
          aria-checked={note.completed}
          aria-label={note.completed ? "Mark incomplete" : "Mark completed"}
          onClick={() => onToggleCompleted(note.id)}
          className={`mt-0.5 h-5 w-5 rounded-md border flex items-center justify-center shrink-0 cursor-pointer transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#62866b] ${
            note.completed
              ? "bg-[#355b44] border-[#355b44] text-white shadow-xs"
              : "border-[#dfe4d9] bg-white hover:border-[#8bb99a]"
          }`}
        >
          {note.completed && <Check size={13} strokeWidth={3} />}
        </button>

        {/* Note Body */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <SectionBadge
              tone={cat.tone}
              icon={<CategoryIcon size={11} />}
              className="text-[10px] py-0.5 px-2.5"
            >
              {cat.label}
            </SectionBadge>

            {note.pinned && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-[#355b44] uppercase bg-[#dce8d5]/60 px-2 py-0.5 rounded-full">
                <Pin size={10} className="fill-[#355b44]" />
                Pinned
              </span>
            )}

            <span className="text-[11px] text-[#7b827a] ml-auto">
              {note.createdAt}
            </span>
          </div>

          <p
            className={`text-sm text-[#243b32] leading-relaxed break-words whitespace-pre-wrap ${
              note.completed
                ? "line-through text-[#7b827a]"
                : "font-normal"
            }`}
          >
            {note.text}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 shrink-0 pt-0.5">
          <button
            type="button"
            onClick={() => onTogglePin(note.id)}
            title={note.pinned ? "Unpin point" : "Pin to top"}
            aria-label={note.pinned ? "Unpin point" : "Pin to top"}
            className={`h-7 w-7 rounded-lg grid place-items-center transition-colors cursor-pointer ${
              note.pinned
                ? "text-[#355b44] bg-[#dce8d5]/80 hover:bg-[#cadcbd]"
                : "text-[#7b827a] hover:bg-[#f3f5ed] hover:text-[#243b32]"
            }`}
          >
            {note.pinned ? (
              <PinOff size={13} />
            ) : (
              <Pin size={13} />
            )}
          </button>

          <button
            type="button"
            onClick={handleCopy}
            title={copied ? "Copied!" : "Copy text"}
            aria-label={copied ? "Copied!" : "Copy text"}
            className="h-7 w-7 rounded-lg grid place-items-center text-[#7b827a] hover:bg-[#f3f5ed] hover:text-[#243b32] transition-colors cursor-pointer"
          >
            {copied ? (
              <Check size={13} className="text-[#355b44]" />
            ) : (
              <Copy size={13} />
            )}
          </button>

          <button
            type="button"
            onClick={() => onDelete(note.id)}
            title="Delete point"
            aria-label="Delete point"
            className="h-7 w-7 rounded-lg grid place-items-center text-[#7b827a] hover:bg-[#fdf0ec] hover:text-[#8c3b2b] transition-colors cursor-pointer"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </CalmCard>
  );
}

