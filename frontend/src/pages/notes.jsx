import { useEffect, useMemo, useState } from "react";
import { Cloud, CloudOff, RefreshCw } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NotesHeader from "../components/notes/NotesHeader";
import NotesStats from "../components/notes/NotesStats";
import NoteInput from "../components/notes/NoteInput";
import NotesFilterBar from "../components/notes/NotesFilterBar";
import NoteItem from "../components/notes/NoteItem";
import NotesEmptyState from "../components/notes/NotesEmptyState";
import {
  createNoteApi,
  deleteNoteApi,
  getNotesByUserIdApi,
} from "../services/notesApi";
import {
  INITIAL_NOTES,
  createNoteItem,
  formatNoteForBackend,
  getCurrentUserId,
  loadNotes,
  parseBackendNote,
  saveNotes,
} from "../utils/notesStorage";

export default function Notes() {
  const [notes, setNotes] = useState(() => loadNotes());
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [syncStatus, setSyncStatus] = useState("connecting"); // "connected" | "offline" | "connecting"
  const [isSyncing, setIsSyncing] = useState(false);

  const userId = useMemo(() => getCurrentUserId(), []);

  const updateNotesState = (updater) => {
    setNotes((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveNotes(next);
      return next;
    });
  };

  // Fetch notes from backend on mount or when requested
  const fetchBackendNotes = async (silent = false) => {
    if (!silent) setIsSyncing(true);
    try {
      const response = await getNotesByUserIdApi(userId);
      const rawList = Array.isArray(response?.data) ? response.data : [];

      if (rawList.length > 0) {
        const parsed = rawList.map(parseBackendNote);
        updateNotesState(parsed);
      }
      setSyncStatus("connected");
    } catch {
      // Backend not running or offline: graceful fallback to local storage
      setSyncStatus("offline");
    } finally {
      if (!silent) setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchBackendNotes(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleAddNote = async ({ text, category, pinned }) => {
    const localItem = createNoteItem({ text, category, pinned });

    // Optimistic UI update
    updateNotesState((prev) => [localItem, ...prev]);

    // Async sync with backend
    try {
      const payload = formatNoteForBackend({ text, category, completed: false, pinned });
      const res = await createNoteApi({ userId, note: payload });

      if (res?.data?._id) {
        // Update local item with real MongoDB _id
        updateNotesState((prev) =>
          prev.map((item) =>
            item.id === localItem.id
              ? { ...item, id: String(res.data._id), synced: true }
              : item
          )
        );
        setSyncStatus("connected");
      }
    } catch {
      setSyncStatus("offline");
    }
  };

  const handleToggleCompleted = (id) => {
    updateNotesState((prev) =>
      prev.map((n) => (n.id === id ? { ...n, completed: !n.completed } : n))
    );
  };

  const handleTogglePin = (id) => {
    updateNotesState((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  };

  const handleDelete = async (id) => {
    // Optimistic delete
    updateNotesState((prev) => prev.filter((n) => n.id !== id));

    // If ID is a 24-character hex MongoDB ID, notify backend
    if (/^[0-9a-fA-F]{24}$/.test(id)) {
      try {
        await deleteNoteApi(id);
      } catch {
        // Silently handled; item is already deleted locally
      }
    }
  };

  const handleClearCompleted = async () => {
    const toDelete = notes.filter((n) => n.completed);
    updateNotesState((prev) => prev.filter((n) => !n.completed));

    // Delete completed from backend in parallel
    for (const item of toDelete) {
      if (/^[0-9a-fA-F]{24}$/.test(item.id)) {
        deleteNoteApi(item.id).catch(() => {});
      }
    }
  };

  const handleLoadDefault = () => {
    updateNotesState(INITIAL_NOTES);
  };

  const counts = useMemo(() => {
    return {
      all: notes.length,
      task: notes.filter((n) => n.category === "task").length,
      health: notes.filter((n) => n.category === "health").length,
      reflection: notes.filter((n) => n.category === "reflection").length,
      completed: notes.filter((n) => n.completed).length,
    };
  }, [notes]);

  const filteredNotes = useMemo(() => {
    return notes
      .filter((note) => {
        if (activeFilter === "completed") {
          if (!note.completed) return false;
        } else if (activeFilter !== "all") {
          if (note.category !== activeFilter) return false;
        }

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return note.text.toLowerCase().includes(q);
        }

        return true;
      })
      .sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
        return 0;
      });
  }, [notes, activeFilter, searchQuery]);

  return (
    <div className="min-h-screen calm-bg text-[#243b32] selection:bg-[#cadcbd] selection:text-[#1a2c25] flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Header & Sync status indicator */}
        <div className="relative">
          <NotesHeader />

          {/* Minimal Sync Status Pill */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                syncStatus === "connected"
                  ? "bg-[#eef3e8] border-[#cadcbd] text-[#355b44]"
                  : "bg-[#fbf2e3] border-[#f0debe] text-[#7a4c28]"
              }`}
            >
              {syncStatus === "connected" ? (
                <>
                  <Cloud size={13} className="text-[#355b44]" />
                  <span>Backend Synced</span>
                </>
              ) : (
                <>
                  <CloudOff size={13} className="text-[#7a4c28]" />
                  <span>Local Mode (Offline Safe)</span>
                </>
              )}
            </span>

            <button
              type="button"
              onClick={() => fetchBackendNotes(false)}
              disabled={isSyncing}
              title="Refresh notes from server"
              aria-label="Refresh notes from server"
              className="p-1 rounded-full text-[#7b827a] hover:text-[#243b32] hover:bg-[#dce8d5]/50 transition-colors cursor-pointer"
            >
              <RefreshCw size={13} className={isSyncing ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        <NotesStats
          total={counts.all}
          completed={counts.completed}
          healthCount={counts.health}
          taskCount={counts.task}
        />

        <NoteInput onAddNote={handleAddNote} />

        <NotesFilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          counts={counts}
          onClearCompleted={handleClearCompleted}
          hasCompleted={counts.completed > 0}
        />

        <div className="space-y-3 max-w-3xl mx-auto">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onToggleCompleted={handleToggleCompleted}
                onTogglePin={handleTogglePin}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <NotesEmptyState
              isFiltered={activeFilter !== "all" || Boolean(searchQuery.trim())}
              onResetFilter={() => {
                setActiveFilter("all");
                setSearchQuery("");
              }}
              onAddDefault={handleLoadDefault}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
