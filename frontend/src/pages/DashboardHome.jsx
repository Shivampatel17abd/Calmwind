import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Circle } from "lucide-react";
import {
  getJournalEntries,
  saveJournalEntry,
  REFLECTION_PROMPTS,
  MOOD_TAGS,
} from "../utils/journalStorage";
import JournalEditor from "../components/JournalEditor";
import JournalViewModal from "../components/JournalViewModal";
import BreathingCard from "../components/BreathingCard";
import { useAuth } from "../context/AuthContext";

// One thing at a time, in a single quiet column: breathe, write, one small
// step, then (only if wanted) look back. No scores, streaks or counts.
export default function DashboardHome() {
  const { user } = useAuth();
  const [entries, setEntries] = useState(() => getJournalEntries());
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [activePrompt] = useState(REFLECTION_PROMPTS[0]);

  const [quickTitle, setQuickTitle] = useState("");
  const [quickContent, setQuickContent] = useState("");
  const [quickMood, setQuickMood] = useState("Calm & Centered");
  const [quickSaved, setQuickSaved] = useState(false);

  const [practices, setPractices] = useState([
    { id: 1, title: "Take 3 slow breaths", subtitle: "A minute, if you like", done: false },
    { id: 2, title: "Drink a glass of water", subtitle: "Slowly, without your phone", done: false },
    { id: 3, title: "Notice one thing done well today", subtitle: "However small", done: false },
  ]);

  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  });

  function handleSaveQuickEntry(e) {
    e.preventDefault();
    if (!quickContent.trim()) return;

    saveJournalEntry({
      title: quickTitle.trim() || "Daily Reflection",
      content: quickContent.trim(),
      moodTag: quickMood,
      prompt: activePrompt,
    });

    setEntries(getJournalEntries());
    setQuickTitle("");
    setQuickContent("");
    setQuickSaved(true);
    setTimeout(() => setQuickSaved(false), 2500);
  }

  function togglePractice(id) {
    setPractices((prev) =>
      prev.map((p) => (p.id === id ? { ...p, done: !p.done } : p))
    );
  }

  return (
    <div className="animate-fade-in mx-auto w-full max-w-3xl space-y-10">
      <header>
        <h1 className="text-2xl font-semibold text-[#2e3d36] sm:text-3xl">
          {greeting}, {user?.name?.split(" ")[0] || "Student"}.
        </h1>
        <p className="mt-2 text-base text-[#66736a]">
          No need to do everything. One small thing, or nothing at all, is enough.
        </p>
      </header>

      <BreathingCard />

      {/* The one main task on this page */}
      <section className="rounded-[20px] border border-[#e8eae2] bg-[#fdfdfa] p-6 sm:p-7">
        <h2 className="text-lg font-semibold text-[#2e3d36]">Write, if it helps</h2>
        <p className="mt-1 text-sm leading-relaxed text-[#66736a]">
          A quiet, private space. Today's gentle prompt: “{activePrompt}”
        </p>

        <form onSubmit={handleSaveQuickEntry} className="mt-5 space-y-4">
          <div>
            <label htmlFor="quick-title" className="sr-only">
              Title (optional)
            </label>
            <input
              id="quick-title"
              type="text"
              placeholder="Title (optional)"
              value={quickTitle}
              onChange={(e) => setQuickTitle(e.target.value)}
              className="w-full border-0 border-b border-[#e8eae2] bg-transparent pb-2 text-base text-[#2e3d36] outline-none placeholder:text-[#9aa59c] focus:border-[#6d8a72]"
            />
          </div>

          <div>
            <label htmlFor="quick-content" className="sr-only">
              What's on your mind?
            </label>
            <textarea
              id="quick-content"
              placeholder="What's on your mind right now? No judgment, no right way to do this."
              rows={4}
              value={quickContent}
              onChange={(e) => setQuickContent(e.target.value)}
              className="w-full resize-y rounded-2xl border border-[#e8eae2] bg-[#f8f9f6] p-4 text-base leading-relaxed text-[#2e3d36] outline-none placeholder:text-[#9aa59c] focus:border-[#6d8a72]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm text-[#66736a]">Feeling:</span>
            {MOOD_TAGS.slice(0, 4).map((tag) => (
              <button
                key={tag.label}
                type="button"
                onClick={() => setQuickMood(tag.label)}
                aria-pressed={quickMood === tag.label}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  quickMood === tag.label
                    ? "border-[#6d8a72] bg-[#eef2e9] font-medium text-[#2e3d36]"
                    : "border-[#e8eae2] bg-white text-[#66736a] hover:border-[#cbdac2]"
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={!quickContent.trim()}
              className="btn-primary px-5 py-2.5 text-sm disabled:opacity-50"
            >
              {quickSaved ? "Saved. Thank you." : "Save entry"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditorOpen(true)}
              className="rounded-xl px-3 py-2 text-sm text-[#55705c] transition-colors hover:bg-[#eef2e9]"
            >
              Open the quiet editor
            </button>
            <Link to="/app/journal" className="px-2 py-2 text-sm text-[#55705c] hover:underline">
              All entries
            </Link>
          </div>
        </form>
      </section>

      {/* Optional, pressure-free: pick one, or none */}
      <section aria-label="One small step">
        <h2 className="text-base font-semibold text-[#2e3d36]">One small step, if you like</h2>
        <p className="mt-1 text-sm text-[#66736a]">Pick one, or none. Rest counts too.</p>
        <div className="mt-4 space-y-2">
          {practices.map((practice) => (
            <button
              key={practice.id}
              type="button"
              onClick={() => togglePractice(practice.id)}
              aria-pressed={practice.done}
              className="flex w-full items-center gap-3 rounded-2xl border border-[#e8eae2] bg-[#fdfdfa] px-4 py-3.5 text-left transition-colors hover:border-[#cbdac2]"
            >
              {practice.done ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#55705c]" />
              ) : (
                <Circle className="h-5 w-5 shrink-0 text-[#b6bfb2]" />
              )}
              <span>
                <span className={`block text-sm ${practice.done ? "text-[#66736a]" : "font-medium text-[#2e3d36]"}`}>
                  {practice.title}
                </span>
                <span className="block text-sm text-[#66736a]">{practice.subtitle}</span>
              </span>
              {practice.done && <span className="ml-auto text-sm text-[#55705c]">Done</span>}
            </button>
          ))}
        </div>
      </section>

      {/* Looking back is optional, and kept to just the latest two */}
      {entries.length > 0 && (
        <section aria-label="Recent reflections">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-base font-semibold text-[#2e3d36]">Recent reflections</h2>
            <Link to="/app/journal" className="text-sm text-[#55705c] hover:underline">
              See all
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {entries.slice(0, 2).map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => setSelectedEntry(entry)}
                className="block w-full rounded-[20px] border border-[#e8eae2] bg-[#fdfdfa] px-5 py-4 text-left transition-colors hover:border-[#cbdac2]"
              >
                <span className="text-sm text-[#66736a]">
                  {new Date(entry.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                  {entry.moodTag ? ` · ${entry.moodTag}` : ""}
                </span>
                <span className="mt-1 block text-base font-medium text-[#2e3d36]">
                  {entry.title}
                </span>
                <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-[#66736a]">
                  {entry.content}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      <p className="text-sm leading-relaxed text-[#66736a]">
        If things feel heavy, you don't have to carry it alone.{" "}
        <Link to="/app/support" className="font-medium text-[#55705c] underline underline-offset-4">
          People who can help
        </Link>
      </p>

      {isEditorOpen && (
        <JournalEditor
          initialPrompt={activePrompt}
          onSave={(entryData) => {
            saveJournalEntry(entryData);
            setEntries(getJournalEntries());
            setIsEditorOpen(false);
          }}
          onCancel={() => setIsEditorOpen(false)}
        />
      )}

      {selectedEntry && (
        <JournalViewModal
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
          onEdit={() => {
            setSelectedEntry(null);
            setIsEditorOpen(true);
          }}
          onDelete={(id) => {
            setEntries(getJournalEntries().filter((e) => e.id !== id));
            setSelectedEntry(null);
          }}
        />
      )}
    </div>
  );
}
