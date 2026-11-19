import { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  Check,
  Calendar,
  Clock,
  ChevronDown,
} from "lucide-react";
import {
  REFLECTION_PROMPTS,
  MOOD_TAGS,
  getJournalDraft,
  saveJournalDraft,
  clearJournalDraft,
} from "../utils/journalStorage";

export default function JournalEditor({
  entryToEdit = null,
  initialPrompt = "",
  onSave,
  onCancel,
}) {
  const isEditing = Boolean(entryToEdit?.id);

  // Load from draft if new entry and draft exists
  const existingDraft = !isEditing ? getJournalDraft() : null;

  const [title, setTitle] = useState(
    entryToEdit?.title || existingDraft?.title || ""
  );
  const [content, setContent] = useState(
    entryToEdit?.content || existingDraft?.content || ""
  );
  const [moodTag, setMoodTag] = useState(
    entryToEdit?.moodTag || existingDraft?.moodTag || "Calm & Centered"
  );
  const [selectedPrompt, setSelectedPrompt] = useState(
    entryToEdit?.prompt || initialPrompt || existingDraft?.prompt || ""
  );
  const [showPromptList, setShowPromptList] = useState(false);
  const [isSavedRecently, setIsSavedRecently] = useState(false);
  const [error, setError] = useState("");

  const [formattedDate] = useState(() =>
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  );

  // Auto-save draft when creating new entry
  useEffect(() => {
    if (!isEditing) {
      if (title.trim() || content.trim()) {
        saveJournalDraft({
          title,
          content,
          moodTag,
          prompt: selectedPrompt,
          lastSaved: new Date().toISOString(),
        });
      }
    }
  }, [title, content, moodTag, selectedPrompt, isEditing]);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  function handleSave(e) {
    e?.preventDefault();
    if (!title.trim() && !content.trim()) {
      setError("Please write a title or reflection before saving.");
      return;
    }

    const finalTitle = title.trim() || "Untitled Reflection";
    const entryData = {
      ...(entryToEdit || {}),
      title: finalTitle,
      content: content.trim(),
      moodTag,
      prompt: selectedPrompt || null,
    };

    setIsSavedRecently(true);
    setTimeout(() => {
      if (!isEditing) {
        clearJournalDraft();
      }
      onSave(entryData);
    }, 300);
  }

  function handleDiscard() {
    if (!isEditing && (title.trim() || content.trim())) {
      if (window.confirm("Do you want to discard your unsaved draft?")) {
        clearJournalDraft();
        onCancel();
      }
    } else {
      onCancel();
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/35 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-[#fffefa] border border-[#e7e9df] w-full max-w-3xl rounded-[26px] shadow-[0_25px_60px_rgba(39,62,48,0.16)] flex flex-col max-h-[92vh] overflow-hidden transition-all">
        {/* Editor Top Bar */}
        <div className="px-6 sm:px-8 py-5 border-b border-[#eceee7] flex items-center justify-between bg-[#fbfaf6]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#52765a]"></span>
            <span className="font-serif text-lg font-medium text-[#243b32]">
              {isEditing ? "Edit Journal Entry" : "New Reflection"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing && (title.trim() || content.trim()) && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#7b827a] px-2.5 py-1 rounded-full bg-[#f2f4ec] border border-[#e4ebd9]">
                <Check className="w-3.5 h-3.5 text-[#52765a]" />
                Draft saved locally
              </span>
            )}
            <button
              onClick={handleDiscard}
              className="p-2 rounded-xl text-[#7b827a] hover:text-[#243b32] hover:bg-[#eef2ea] transition-colors"
              aria-label="Close editor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Editor Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-[#fbeeed] border border-[#f5d0cc] text-xs text-[#8e3c35]">
              {error}
            </div>
          )}

          {/* Date & Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#7b827a]">
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

          {/* Title input */}
          <div>
            <input
              type="text"
              placeholder="Title your reflection..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError("");
              }}
              autoFocus
              className="w-full font-serif text-2xl sm:text-3xl font-medium text-[#243b32] placeholder:text-[#a0a89d] bg-transparent border-0 border-b border-[#e7e9df] focus:border-[#355b44] pb-2 outline-none transition-colors"
            />
          </div>

          {/* Mood Tag Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#69836b] uppercase tracking-wider mb-2.5">
              How does this moment feel?
            </label>
            <div className="flex flex-wrap gap-2">
              {MOOD_TAGS.map((tag) => {
                const isSelected = moodTag === tag.label;
                return (
                  <button
                    key={tag.label}
                    type="button"
                    onClick={() => setMoodTag(tag.label)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all duration-150 ${
                      isSelected
                        ? `${tag.color} ring-2 ring-[#355b44]/25 shadow-xs font-semibold`
                        : "bg-[#fffefa] text-[#7b827a] border-[#e7e9df] hover:border-[#cadcbd] hover:bg-[#f8faf5]"
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prompt Selector Accordion */}
          <div className="rounded-2xl border border-[#e2ebd9] bg-[#f8faf4] p-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowPromptList(!showPromptList)}
                className="flex items-center gap-2 text-xs font-semibold text-[#355b44] hover:text-[#1a2c25] transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#52765a]" />
                <span>{selectedPrompt ? "Reflection prompt applied" : "Need gentle inspiration? Choose a prompt"}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    showPromptList ? "rotate-180" : ""
                  }`}
                />
              </button>

              {selectedPrompt && (
                <button
                  type="button"
                  onClick={() => setSelectedPrompt("")}
                  className="text-[11px] text-[#7b827a] hover:text-[#b04f44] transition-colors"
                >
                  Remove prompt
                </button>
              )}
            </div>

            {selectedPrompt && (
              <p className="mt-2 text-xs text-[#4b7355] italic font-serif bg-white/70 p-2.5 rounded-xl border border-[#dce8d5]">
                "{selectedPrompt}"
              </p>
            )}

            {showPromptList && (
              <div className="mt-3 pt-3 border-t border-[#e2ebd9] space-y-1.5">
                {REFLECTION_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => {
                      setSelectedPrompt(prompt);
                      setShowPromptList(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-colors ${
                      selectedPrompt === prompt
                        ? "bg-[#e3ebd9] text-[#1f3729] font-medium"
                        : "hover:bg-[#fffefa] text-[#52765a]"
                    }`}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Main writing canvas */}
          <div>
            <textarea
              placeholder="What's on your mind? Take a deep breath and begin here..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setError("");
              }}
              rows={9}
              className="w-full p-4 rounded-2xl bg-[#fffefa] border border-[#e7e9df] focus:border-[#62866b] focus:ring-3 focus:ring-[#62866b]/10 text-sm sm:text-base leading-relaxed text-[#243b32] placeholder:text-[#a5aaa2] outline-none transition-all resize-y font-sans"
            />
          </div>
        </div>

        {/* Editor Bottom Actions */}
        <div className="px-6 sm:px-8 py-4 border-t border-[#eceee7] bg-[#fbfaf6] flex items-center justify-between">
          <button
            type="button"
            onClick={handleDiscard}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-[#7b827a] hover:text-[#243b32] hover:bg-[#eef2ea] transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSavedRecently}
              className="btn-primary text-xs sm:text-sm px-5 py-2.5 shadow-sm hover:shadow transition-all"
            >
              {isSavedRecently ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved</span>
                </>
              ) : (
                <span>Save Entry</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
