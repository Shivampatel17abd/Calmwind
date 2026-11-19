const STORAGE_KEYS = {
  ENTRIES: "calmwind_journal_entries",
  DRAFT: "calmwind_journal_draft",
};

const SEED_ENTRIES = [
  {
    id: "seed-1",
    title: "Quiet morning under the campus oaks",
    content:
      "Took twenty minutes before my lecture to sit on the library lawn without my laptop or notifications. Watching the autumn leaves drift down reminded me that not every hour of student life has to be an emergency. Taking deep, steady breaths restored a quiet sense of balance that stayed with me all day.",
    moodTag: "Calm & Centered",
    prompt: "What brought you unexpected peace today?",
    date: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
  {
    id: "seed-2",
    title: "Learning to let go of mid-semester perfection",
    content:
      "Submitted my engineering milestone tonight. My old instinct was to stay up until 3 AM over-analyzing every single line of code, but I chose to turn off my monitor and sleep instead. Waking up rested felt ten times more valuable than another micro-optimization. Giving myself permission to be a human being first and a student second.",
    moodTag: "Relieved",
    prompt: "What is one expectation you can gently release?",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: "seed-3",
    title: "A warm tea and a long walk by the lake",
    content:
      "Midterm study groups were overwhelming today, so I took a solo walk down to the lake trail with chamomile tea in a thermos. The cool breeze and open water always put things into perspective. Reminded myself that grades are a snapshot of this moment, not the measure of my worth or future.",
    moodTag: "Grateful",
    prompt: "Describe a small win from your week.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
  },
];

export const REFLECTION_PROMPTS = [
  "What brought you unexpected peace today?",
  "What is one expectation you can gently release right now?",
  "Describe a small win or moment of gratitude from your day.",
  "How does your body feel in this moment, and what does it need?",
  "What would you say to a close friend who is feeling what you feel today?",
  "Name three simple things in your immediate surroundings that comfort you.",
];

export const MOOD_TAGS = [
  { label: "Calm & Centered", color: "bg-[#e8f1e3] text-[#355b44] border-[#cadcbd]" },
  { label: "Grateful", color: "bg-[#fbf2e3] text-[#7a4c28] border-[#f0debe]" },
  { label: "Reflective", color: "bg-[#eef2ea] text-[#4b7355] border-[#d8e0d3]" },
  { label: "Stressed", color: "bg-[#fbeeed] text-[#8e3c35] border-[#f5d0cc]" },
  { label: "Fatigued", color: "bg-[#f1f1ed] text-[#696b67] border-[#dddcd7]" },
  { label: "Hopeful", color: "bg-[#e6f4ea] text-[#29683b] border-[#c0e4cb]" },
];

export function getJournalEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ENTRIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(SEED_ENTRIES));
      return SEED_ENTRIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED_ENTRIES;
  } catch {
    return SEED_ENTRIES;
  }
}

export function saveJournalEntry(entry) {
  const entries = getJournalEntries();
  const now = new Date().toISOString();

  if (entry.id) {
    // update
    const updated = entries.map((item) =>
      item.id === entry.id
        ? {
            ...item,
            ...entry,
            updatedAt: now,
          }
        : item
    );
    localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(updated));
    return entry;
  } else {
    // create
    const newEntry = {
      ...entry,
      id: "entry-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
      date: now,
      updatedAt: now,
    };
    const updated = [newEntry, ...entries];
    localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(updated));
    return newEntry;
  }
}

export function deleteJournalEntry(id) {
  const entries = getJournalEntries();
  const updated = entries.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(updated));
  return updated;
}

export function getJournalDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DRAFT);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveJournalDraft(draft) {
  try {
    localStorage.setItem(STORAGE_KEYS.DRAFT, JSON.stringify(draft));
  } catch {
    // ignore
  }
}

export function clearJournalDraft() {
  try {
    localStorage.removeItem(STORAGE_KEYS.DRAFT);
  } catch {
    // ignore
  }
}

// User identity is owned by the backend auth session (see context/AuthContext).
// This module only stores journal entries and drafts locally for now.
