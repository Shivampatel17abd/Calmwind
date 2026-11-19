import { useState } from "react";
import {
  PenLine,
  Search,
  Filter,
  Calendar,
  Sparkles,
  Edit3,
  Trash2,
  ArrowUpDown,
  CheckCircle,
} from "lucide-react";
import {
  getJournalEntries,
  saveJournalEntry,
  deleteJournalEntry,
  MOOD_TAGS,
} from "../utils/journalStorage";
import JournalEditor from "../components/JournalEditor";
import JournalViewModal from "../components/JournalViewModal";
import { EmptyJournalArt } from "../components/BotanicalDecor";

export default function JournalPage() {
  const [entries, setEntries] = useState(() => getJournalEntries());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [sortBy, setSortBy] = useState("newest"); // "newest" | "oldest"

  // Modals state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [entryToEdit, setEntryToEdit] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  function showToast(msg) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  }

  function handleSave(entryData) {
    saveJournalEntry(entryData);
    setEntries(getJournalEntries());
    setIsEditorOpen(false);
    setEntryToEdit(null);
    showToast(entryData.id ? "Reflection updated gently." : "New reflection saved.");
  }

  function handleDelete(id) {
    const updated = deleteJournalEntry(id);
    setEntries(updated);
    if (selectedEntry?.id === id) {
      setSelectedEntry(null);
    }
    showToast("Entry removed.");
  }

  function handleOpenNew() {
    setEntryToEdit(null);
    setIsEditorOpen(true);
  }

  function handleOpenEdit(entry, e) {
    e?.stopPropagation();
    setEntryToEdit(entry);
    setSelectedEntry(null);
    setIsEditorOpen(true);
  }

  // Filter & Search logic
  const filteredEntries = entries
    .filter((entry) => {
      const matchesTag =
        selectedTag === "All" || entry.moodTag === selectedTag;
      const matchesSearch =
        !searchQuery.trim() ||
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (entry.prompt && entry.prompt.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTag && matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#355b44] text-white px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2 text-xs sm:text-sm font-medium animate-fade-in">
          <CheckCircle className="w-4 h-4 text-[#cadcbd]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#eceee7]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e3ebd9] text-[#355b44] text-[11px] font-bold tracking-wider uppercase mb-2">
            <span>✿</span>
            <span>Personal Sanctuary</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#243b32]">
            My Journal & Reflections
          </h1>
          <p className="mt-1 text-sm text-[#7b827a]">
            Private, judgment-free space to untangle thoughts and record moments of peace.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="btn-primary text-xs sm:text-sm px-5 py-3 shadow-md hover:shadow-lg shrink-0 self-start md:self-auto"
        >
          <PenLine className="w-4 h-4" />
          <span>Write New Entry</span>
        </button>
      </div>

      {/* Search, Filter & Controls Bar */}
      <div className="bg-[#fffefa] border border-[#e7e9df] p-4 sm:p-5 rounded-[22px] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8c9489] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, prompt, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#faf9f5] border border-[#e7e9df] focus:border-[#62866b] focus:ring-2 focus:ring-[#62866b]/10 text-xs sm:text-sm text-[#243b32] placeholder:text-[#a0a89d] outline-none transition-all"
            />
          </div>

          {/* Sort order toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#7b827a] hidden sm:inline">Sort:</span>
            <button
              onClick={() => setSortBy(sortBy === "newest" ? "oldest" : "newest")}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#faf9f5] border border-[#e7e9df] text-xs font-medium text-[#243b32] hover:bg-[#eef2ea] transition-colors"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#62866b]" />
              <span>{sortBy === "newest" ? "Newest First" : "Oldest First"}</span>
            </button>
          </div>
        </div>

        {/* Mood Tag Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#f1f3ed]">
          <span className="text-xs font-semibold text-[#69836b] mr-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>Filter:</span>
          </span>

          <button
            onClick={() => setSelectedTag("All")}
            className={`px-3 py-1 rounded-xl text-xs font-medium border transition-all ${
              selectedTag === "All"
                ? "bg-[#355b44] text-white border-[#355b44] shadow-xs"
                : "bg-white text-[#7b827a] border-[#e7e9df] hover:border-[#cadcbd]"
            }`}
          >
            All ({entries.length})
          </button>

          {MOOD_TAGS.map((tag) => {
            const isSelected = selectedTag === tag.label;
            const count = entries.filter((e) => e.moodTag === tag.label).length;
            return (
              <button
                key={tag.label}
                onClick={() => setSelectedTag(tag.label)}
                className={`px-3 py-1 rounded-xl text-xs font-medium border transition-all ${
                  isSelected
                    ? `${tag.color} ring-2 ring-[#355b44]/25 shadow-xs font-semibold`
                    : "bg-white text-[#7b827a] border-[#e7e9df] hover:border-[#cadcbd]"
                }`}
              >
                {tag.label} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Entries Grid or Empty State */}
      {filteredEntries.length === 0 ? (
        <div className="p-12 text-center bg-[#fffefa] border border-[#e7e9df] rounded-[26px] shadow-xs flex flex-col items-center justify-center space-y-4">
          <EmptyJournalArt className="w-36 h-36 mx-auto opacity-90" />
          <div className="max-w-md mx-auto">
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#243b32]">
              {searchQuery || selectedTag !== "All"
                ? "No matching reflections found"
                : "Your personal journal is waiting"}
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-[#7b827a] leading-relaxed">
              {searchQuery || selectedTag !== "All"
                ? "Try adjusting your search terms or clearing the mood filter."
                : "Take a gentle pause, breathe deeply, and capture your first thoughts. Your entries are saved privately right here."}
            </p>
          </div>

          {searchQuery || selectedTag !== "All" ? (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTag("All");
              }}
              className="btn-secondary text-xs px-4 py-2"
            >
              Reset filters
            </button>
          ) : (
            <button
              onClick={handleOpenNew}
              className="btn-primary text-xs sm:text-sm px-5 py-2.5 shadow-sm"
            >
              <PenLine className="w-4 h-4" />
              <span>Write your first entry</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEntries.map((entry) => {
            const tagInfo =
              MOOD_TAGS.find((m) => m.label === entry.moodTag) || MOOD_TAGS[0];
            const wordCount = entry.content?.trim()
              ? entry.content.trim().split(/\s+/).length
              : 0;
            const readingTime = Math.max(1, Math.ceil(wordCount / 200));

            return (
              <div
                key={entry.id}
                onClick={() => setSelectedEntry(entry)}
                className="p-6 bg-[#fffefa] border border-[#e7e9df] hover:border-[#cadcbd] rounded-[24px] shadow-[0_4px_20px_rgba(39,62,48,0.04)] hover:shadow-[0_16px_40px_rgba(39,62,48,0.08)] hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Top card metadata */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${tagInfo.color}`}
                    >
                      {entry.moodTag}
                    </span>

                    <span className="text-[11px] text-[#8c9489] inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#62866b]" />
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg font-medium text-[#243b32] group-hover:text-[#355b44] transition-colors leading-snug line-clamp-2">
                    {entry.title}
                  </h3>

                  {/* Prompt tag if used */}
                  {entry.prompt && (
                    <div className="mt-2.5 p-2 rounded-xl bg-[#f5f8f2] border border-[#e0e8d7] text-[11px] text-[#4b7355] italic font-serif flex items-start gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#52765a] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">"{entry.prompt}"</span>
                    </div>
                  )}

                  {/* Excerpt */}
                  <p className="mt-3 text-xs sm:text-sm text-[#7b827a] leading-relaxed line-clamp-3 font-normal">
                    {entry.content}
                  </p>
                </div>

                {/* Bottom card footer */}
                <div className="mt-5 pt-3 border-t border-[#f1f3ed] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#8c9489]">
                    {wordCount} words • {readingTime}m read
                  </span>

                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleOpenEdit(entry, e)}
                      className="p-1.5 rounded-lg text-[#62866b] hover:text-[#355b44] hover:bg-[#eef2ea] transition-colors"
                      title="Edit entry"
                      aria-label="Edit entry"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm("Delete this entry?")) {
                          handleDelete(entry.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-[#7b827a] hover:text-[#b04f44] hover:bg-[#faeae8] transition-colors"
                      title="Delete entry"
                      aria-label="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Editor Modal */}
      {isEditorOpen && (
        <JournalEditor
          entryToEdit={entryToEdit}
          onSave={handleSave}
          onCancel={() => {
            setIsEditorOpen(false);
            setEntryToEdit(null);
          }}
        />
      )}

      {/* Detail Viewer Modal */}
      {selectedEntry && (
        <JournalViewModal
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
          onEdit={(entry) => handleOpenEdit(entry)}
          onDelete={(id) => handleDelete(id)}
        />
      )}
    </div>
  );
}
