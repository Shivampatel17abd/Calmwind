const STORAGE_KEY = "calmwind_notes_v1";
const GUEST_USER_ID_KEY = "calmwind_guest_user_id";

export const NOTE_CATEGORIES = [
  {
    id: "all",
    label: "All Points",
    shortLabel: "All",
    iconName: "ListTodo",
    tone: "neutral",
  },
  {
    id: "task",
    label: "Study & Tasks",
    shortLabel: "Tasks",
    iconName: "CheckSquare",
    tone: "softSage",
  },
  {
    id: "health",
    label: "Health & Wellbeing",
    shortLabel: "Health",
    iconName: "Heart",
    tone: "sage",
  },
  {
    id: "reflection",
    label: "Mindful Thoughts",
    shortLabel: "Thoughts",
    iconName: "Sparkles",
    tone: "warm",
  },
];

export const QUICK_SUGGESTIONS = [
  { text: "Drink a glass of water & stretch", category: "health" },
  { text: "Take a 5-minute screen-free pause", category: "health" },
  { text: "Review 1 priority task for 15 minutes", category: "task" },
  { text: "Write down 3 things you are grateful for", category: "reflection" },
  { text: "Set a peaceful bedtime routine tonight", category: "health" },
];

export const INITIAL_NOTES = [
  {
    id: "note-1",
    text: "Drink a tall glass of water & stretch neck/shoulders away from screen",
    category: "health",
    completed: false,
    pinned: true,
    createdAt: "Today · Health Check",
  },
  {
    id: "note-2",
    text: "Break today's assignment into one small 20-minute focus block",
    category: "task",
    completed: false,
    pinned: true,
    createdAt: "Today · Study Goal",
  },
  {
    id: "note-3",
    text: "Remember: You don't have to carry everything all at once.",
    category: "reflection",
    completed: false,
    pinned: false,
    createdAt: "Today · Mindful Thought",
  },
  {
    id: "note-4",
    text: "Went for a 10-minute fresh air walk outside",
    category: "health",
    completed: true,
    pinned: false,
    createdAt: "Yesterday · Wellbeing",
  },
];

/**
 * Retrieves the current logged-in user ID or a stable guest student ObjectId (24 hex chars)
 * compatible with MongoDB's Schema.Types.ObjectId.
 */
export function getCurrentUserId() {
  try {
    const rawUser = window.localStorage.getItem("user");
    if (rawUser) {
      const parsed = JSON.parse(rawUser);
      if (parsed?._id) return String(parsed._id);
      if (parsed?.id) return String(parsed.id);
    }

    const rawUserId = window.localStorage.getItem("userId");
    if (rawUserId && rawUserId.length === 24) return rawUserId;

    let guestId = window.localStorage.getItem(GUEST_USER_ID_KEY);
    if (!guestId || guestId.length !== 24) {
      // Valid 24-character hexadecimal ObjectId representation
      guestId = "673500000000000000000001";
      window.localStorage.setItem(GUEST_USER_ID_KEY, guestId);
    }
    return guestId;
  } catch {
    return "673500000000000000000001";
  }
}

/**
 * Formats a frontend note item into the string payload required by backend note field.
 */
export function formatNoteForBackend({ text, category, completed, pinned }) {
  return JSON.stringify({
    text: text.trim(),
    category: category || "task",
    completed: Boolean(completed),
    pinned: Boolean(pinned),
  });
}

/**
 * Parses a backend database note object into our frontend note model.
 */
export function parseBackendNote(dbItem) {
  let text = dbItem.note || "";
  let category = "task";
  let completed = false;
  let pinned = false;

  try {
    const parsed = JSON.parse(dbItem.note);
    if (parsed && typeof parsed === "object") {
      text = parsed.text || dbItem.note || "";
      category = parsed.category || "task";
      completed = Boolean(parsed.completed);
      pinned = Boolean(parsed.pinned);
    }
  } catch {
    text = dbItem.note || "";
    const lower = text.toLowerCase();
    if (
      lower.includes("water") ||
      lower.includes("walk") ||
      lower.includes("sleep") ||
      lower.includes("health") ||
      lower.includes("stretch") ||
      lower.includes("eat")
    ) {
      category = "health";
    } else if (
      lower.includes("breathe") ||
      lower.includes("grateful") ||
      lower.includes("calm") ||
      lower.includes("mind") ||
      lower.includes("relax")
    ) {
      category = "reflection";
    }
  }

  const dateObj = dbItem.createdAt ? new Date(dbItem.createdAt) : new Date();
  const dateStr = dateObj.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  const timeStr = dateObj.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    id: String(dbItem._id || dbItem.id),
    text,
    category,
    completed,
    pinned,
    createdAt: `${dateStr} · ${timeStr}`,
    synced: true,
  };
}

export function loadNotes() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_NOTES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_NOTES;
  } catch {
    return INITIAL_NOTES;
  }
}

export function saveNotes(notes) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // Graceful fallback
  }
  return notes;
}

export function createNoteItem({ text, category = "task", pinned = false }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    id: `note-${now.getTime()}-${Math.random().toString(36).slice(2, 7)}`,
    text: text.trim(),
    category,
    completed: false,
    pinned,
    createdAt: `${dateStr} · ${timeStr}`,
    synced: false,
  };
}
