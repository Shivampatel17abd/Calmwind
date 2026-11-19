import { useState } from "react";
import { X, Calendar, Clock, Edit3, Trash2, Sparkles } from "lucide-react";
import { MOOD_TAGS } from "../utils/journalStorage";

export default function JournalViewModal({
  entry,
  onClose,
  onEdit,
  onDelete,
}) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  if (!entry) return null;

  const moodTagInfo =
    MOOD_TAGS.find((m) => m.label === entry.moodTag) || MOOD_TAGS[0];

  const wordCount = entry.content?.trim()
    ? entry.content.trim().split(/\s+/).length
    : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const formattedDate = new Date(entry.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/35 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-[#fffefa] border border-[#e7e9df] w-full max-w-2xl rounded-[26px] shadow-[0_25px_60px_rgba(39,62,48,0.16)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-[#eceee7] flex items-center justify-between bg-[#fbfaf6]">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${moodTagInfo.color}`}>
            {entry.moodTag || "Reflection"}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onEdit(entry)}
              className="p-2 rounded-xl text-[#62866b] hover:text-[#355b44] hover:bg-[#eef2ea] transition-colors"
              title="Edit entry"
              aria-label="Edit entry"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowConfirmDelete(true)}
              className="p-2 rounded-xl text-[#7b827a] hover:text-[#b04f44] hover:bg-[#faeae8] transition-colors"
              title="Delete entry"
              aria-label="Delete entry"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#7b827a] hover:text-[#243b32] hover:bg-[#eef2ea] transition-colors ml-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {showConfirmDelete && (
            <div className="p-4 rounded-2xl bg-[#faeae8] border border-[#f5d0cc] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in">
              <p className="text-xs text-[#8e3c35] font-medium">
                Are you sure you want to delete this entry? This cannot be undone.
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-[#7b827a] bg-white border border-[#e7e9df] hover:bg-[#f8f9f5]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => onDelete(entry.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#b04f44] hover:bg-[#993e34]"
                >
                  Delete
                </button>
              </div>
            </div>
          )}

          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#243b32] leading-tight">
              {entry.title}
            </h2>
            <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-[#7b827a]">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#62866b]" />
                {formattedDate}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#62866b]" />
                {wordCount} words ({readingTime} min read)
              </span>
            </div>
          </div>

          {entry.prompt && (
            <div className="p-3.5 rounded-2xl bg-[#f4f7f0] border border-[#dce8d5] text-xs text-[#355b44] flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#52765a] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-[11px] text-[#69836b] uppercase tracking-wider mb-0.5">
                  Reflection Prompt
                </span>
                <p className="italic font-serif text-sm text-[#2b4c37]">
                  "{entry.prompt}"
                </p>
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-[#f1f3ed]">
            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#243b32] whitespace-pre-wrap font-normal">
              {entry.content}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-3.5 border-t border-[#eceee7] bg-[#fbfaf6] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-[#7b827a] hover:text-[#243b32] hover:bg-[#eef2ea] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
