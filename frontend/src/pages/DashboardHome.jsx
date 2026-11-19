import { useState } from "react";
import { Link } from "react-router-dom";
import {
  PenLine,
  BookOpen,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  Circle,
  Heart,
  ChevronRight,
} from "lucide-react";
import {
  getJournalEntries,
  saveJournalEntry,
  REFLECTION_PROMPTS,
  MOOD_TAGS,
} from "../utils/journalStorage";
import JournalEditor from "../components/JournalEditor";
import JournalViewModal from "../components/JournalViewModal";
import { useAuth } from "../context/AuthContext";

export default function DashboardHome() {
  const { user } = useAuth();
  const [entries, setEntries] = useState(() => getJournalEntries());
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [activePrompt] = useState(REFLECTION_PROMPTS[0]);

  // Quick reflection card on homepage
  const [quickTitle, setQuickTitle] = useState("");
  const [quickContent, setQuickContent] = useState("");
  const [quickMood, setQuickMood] = useState("Calm & Centered");
  const [quickSaved, setQuickSaved] = useState(false);

  // Mindful micro-habits check-in
  const [practices, setPractices] = useState([
    { id: 1, title: "Take 3 conscious deep breaths", subtitle: "2 min • Grounding", done: true },
    { id: 2, title: "Drink a glass of water mindfully", subtitle: "Physical ease", done: false },
    { id: 3, title: "Acknowledge one small thing done well", subtitle: "Self-compassion", done: false },
  ]);

  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  });

  const [currentDateFormatted] = useState(() =>
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  );

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

  const doneCount = practices.filter((p) => p.done).length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Greeting Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#eceee7]">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#243b32]">
            {greeting}, {user?.name?.split(" ")[0] || "Student"}.
          </h1>
          <p className="mt-1.5 text-sm sm:text-base text-[#7b827a] flex items-center gap-2">
            <span>How are you feeling today?</span>
            <span className="text-[#cadcbd]">•</span>
            <span className="font-medium text-[#52765a]">{currentDateFormatted}</span>
          </p>
        </div>

        {/* User Pill Badge */}
        <div className="inline-flex items-center gap-3 bg-[#fffefa] border border-[#e7e9df] px-4 py-2 rounded-full shadow-xs self-start md:self-auto">
          <div className="w-8 h-8 rounded-full bg-[#355b44] text-[#fffefa] font-serif text-xs font-semibold grid place-items-center">
            {user?.name
              ? user.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
              : "CW"}
          </div>
          <div className="text-left pr-1">
            <p className="text-xs font-semibold text-[#243b32]">{user?.name || "Student"}</p>
            <p className="text-[10px] text-[#69836b] flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#52765a]"></span>
              Grounding Space
            </p>
          </div>
        </div>
      </div>

      {/* Main 2-Column Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Primary Column: Reflection Journal Hero & Recent Entries */}
        <div className="lg:col-span-8 space-y-8">
          {/* Daily Reflection Prompt Callout */}
          <div className="p-5 sm:p-6 rounded-[24px] bg-[#fbfbf8] border border-[#e5ecdc] shadow-xs relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e3ebd9] text-[#355b44] text-[11px] font-bold tracking-wider uppercase mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#52765a]" />
                  <span>Daily Reflection Prompt</span>
                </div>
                <p className="font-serif text-lg sm:text-xl text-[#243b32] italic mt-1 leading-relaxed">
                  "{activePrompt}"
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsEditorOpen(true)}
                className="btn-primary text-xs sm:text-sm px-4 py-2.5 shrink-0 self-start sm:self-auto"
              >
                <PenLine className="w-4 h-4" />
                <span>Write about this</span>
              </button>
            </div>
          </div>

          {/* Prominent Reflection Journal Writing Card */}
          <section className="bg-[#fffefa] border border-[#e7e9df] rounded-[26px] p-6 sm:p-8 shadow-[0_12px_40px_rgba(39,62,48,0.06)] relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#eceee7] mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#eef3e8] grid place-items-center text-[#355b44]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#243b32]">
                    Reflection Journal
                  </h2>
                  <p className="text-xs text-[#7b827a]">
                    Unburden your mind in a quiet, private space.
                  </p>
                </div>
              </div>

              <Link
                to="/app/journal"
                className="text-xs font-semibold text-[#4b7355] hover:text-[#243b32] flex items-center gap-1 group transition-colors"
              >
                <span>View All Entries</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Quick in-place editor */}
            <form onSubmit={handleSaveQuickEntry} className="space-y-4">
              <input
                type="text"
                placeholder="Title (optional, e.g. An afternoon pause...)"
                value={quickTitle}
                onChange={(e) => setQuickTitle(e.target.value)}
                className="w-full text-base font-serif text-[#243b32] placeholder:text-[#a0a89d] bg-transparent border-0 border-b border-[#e7e9df] focus:border-[#355b44] pb-2 outline-none transition-colors"
              />

              <div className="relative">
                <textarea
                  placeholder="What's on your mind right now? Express whatever you are feeling without judgment..."
                  rows={4}
                  value={quickContent}
                  onChange={(e) => setQuickContent(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-[#faf9f5] border border-[#e7e9df] focus:border-[#62866b] focus:ring-3 focus:ring-[#62866b]/10 text-sm leading-relaxed text-[#243b32] placeholder:text-[#a5aaa2] outline-none transition-all resize-y"
                />
              </div>

              {/* Mood pills selector & Save action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-[#69836b] mr-1">Mood:</span>
                  {MOOD_TAGS.slice(0, 4).map((tag) => (
                    <button
                      key={tag.label}
                      type="button"
                      onClick={() => setQuickMood(tag.label)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all ${
                        quickMood === tag.label
                          ? `${tag.color} ring-1 ring-[#355b44]/25 font-semibold`
                          : "bg-white text-[#7b827a] border-[#e7e9df] hover:border-[#cadcbd]"
                      }`}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setIsEditorOpen(true)}
                    className="px-3 py-2 text-xs font-medium text-[#62866b] hover:text-[#355b44] hover:bg-[#eef2ea] rounded-xl transition-colors"
                  >
                    Open Distraction-Free Editor
                  </button>

                  <button
                    type="submit"
                    disabled={!quickContent.trim()}
                    className={`btn-primary text-xs sm:text-sm px-5 py-2.5 shadow-sm transition-all ${
                      !quickContent.trim() ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {quickSaved ? (
                      <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        Saved!
                      </span>
                    ) : (
                      <span>Save Entry</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </section>

          {/* Recent Journal Entries Preview Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-medium text-[#243b32]">
                Recent Reflections
              </h3>
              <Link
                to="/app/journal"
                className="text-xs font-semibold text-[#4b7355] hover:underline flex items-center gap-1"
              >
                <span>All {entries.length} entries</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {entries.length === 0 ? (
              <div className="p-8 text-center bg-[#fffefa] border border-[#e7e9df] rounded-[22px]">
                <p className="font-serif text-lg text-[#243b32]">No reflections yet</p>
                <p className="text-xs text-[#7b827a] mt-1 mb-4">
                  Write your first entry above or open the full editor.
                </p>
                <button
                  onClick={() => setIsEditorOpen(true)}
                  className="btn-primary text-xs px-4 py-2"
                >
                  Write first entry
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {entries.slice(0, 4).map((entry) => {
                  const tagInfo =
                    MOOD_TAGS.find((m) => m.label === entry.moodTag) || MOOD_TAGS[0];
                  return (
                    <div
                      key={entry.id}
                      onClick={() => setSelectedEntry(entry)}
                      className="p-5 bg-[#fffefa] border border-[#e7e9df] hover:border-[#cadcbd] rounded-[20px] shadow-[0_4px_20px_rgba(39,62,48,0.04)] hover:shadow-[0_12px_30px_rgba(39,62,48,0.08)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${tagInfo.color}`}
                          >
                            {entry.moodTag}
                          </span>
                          <span className="text-[11px] text-[#8c9489] inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(entry.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>

                        <h4 className="font-serif text-base font-medium text-[#243b32] group-hover:text-[#355b44] transition-colors line-clamp-1">
                          {entry.title}
                        </h4>

                        <p className="mt-2 text-xs text-[#7b827a] leading-relaxed line-clamp-2">
                          {entry.content}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#f1f3ed] flex items-center justify-between text-[11px] text-[#69836b] group-hover:text-[#355b44]">
                        <span>Read full reflection</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Right / Secondary Column: Daily Grounding & Support */}
        <div className="lg:col-span-4 space-y-6">
          {/* Daily Practices / Habits Card (inspired by reference image) */}
          <div className="p-6 rounded-[24px] bg-[#fffefa] border border-[#e7e9df] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#eceee7]">
              <div>
                <h3 className="font-serif text-lg font-medium text-[#243b32]">
                  Daily Practices
                </h3>
                <p className="text-xs text-[#7b827a]">Gentle rhythm for your day</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#f2f5ec] text-[#4b7355] border border-[#e0e8d7]">
                ● {doneCount}/{practices.length} Done
              </span>
            </div>

            <div className="space-y-2.5">
              {practices.map((practice) => (
                <div
                  key={practice.id}
                  onClick={() => togglePractice(practice.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    practice.done
                      ? "bg-[#f5f8f2] border-[#d8e4cf] text-[#243b32]"
                      : "bg-[#fffefa] border-[#e7e9df] hover:border-[#cadcbd] text-[#243b32]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="text-[#4b7355] focus:outline-none"
                      aria-label="Toggle practice"
                    >
                      {practice.done ? (
                        <CheckCircle2 className="w-5 h-5 text-[#4b7355] fill-[#e3ebd9]" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#a5aaa2]" />
                      )}
                    </button>
                    <div>
                      <p
                        className={`text-xs font-medium ${
                          practice.done ? "line-through text-[#7b827a]" : "text-[#243b32]"
                        }`}
                      >
                        {practice.title}
                      </p>
                      <p className="text-[10px] text-[#8c9489]">{practice.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Help & Sanctuary Resource Card */}
          <div className="p-6 rounded-[24px] bg-[#fbf5eb] border border-[#f0debe] shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/80 grid place-items-center text-[#7a4c28]">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-base font-medium text-[#5c371d]">
                  Campus Support Always Open
                </h3>
                <p className="text-[11px] text-[#7a4c28]">Confidential & free for students</p>
              </div>
            </div>

            <p className="text-xs text-[#7a4c28] leading-relaxed">
              If exams, stress, or life feel heavy, talking with a professional counselor can give you room to breathe.
            </p>

            <Link
              to="/app/support"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#7a4c28] hover:bg-[#5c371d] text-white text-xs font-medium shadow-xs transition-colors"
            >
              <span>Explore Help & Helplines</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Full Distraction-Free Journal Editor Modal */}
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

      {/* Journal View Details Modal */}
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
