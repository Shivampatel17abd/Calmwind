import { apiRequest, ApiError } from "../utils/api";

function normalizeSource(source) {
  if (!source) return null;
  return {
    source: source.source || "CalmWind knowledge",
    category: source.category || "general",
    score: typeof source.score === "number" ? source.score : null,
  };
}

/**
 * Sends one message to the RAG companion:
 * POST /api/v1/chats/create-chat  Body: { userId, query }
 * Returns { reply, sources: [{ source, category, score }] }.
 */
export async function sendChatMessage(userId, query) {
  const payload = await apiRequest("/chats/create-chat", {
    method: "POST",
    body: { userId, query },
  });
  const data = payload?.data || {};
  return {
    reply: typeof data.reply === "string" ? data.reply : "",
    sources: Array.isArray(data.sources)
      ? data.sources.map(normalizeSource).filter(Boolean)
      : [],
  };
}

/**
 * Loads past chats for a user:
 * GET /api/v1/chats/get-chats?userId=...
 * Backend currently stores only the user's query (no assistant reply),
 * so each entry maps to a single user message, oldest first.
 * 404 means "no chats yet" and resolves to an empty list.
 */
export async function getChatHistory(userId) {
  let payload;
  try {
    payload = await apiRequest(
      `/chats/get-chats?userId=${encodeURIComponent(userId)}`
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return [];
    throw error;
  }

  const chats = Array.isArray(payload?.data) ? payload.data : [];
  return [...chats]
    .filter((chat) => chat?.query)
    .sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0))
    .map((chat) => ({
      id: chat._id || `${chat.createdAt}-${chat.query}`,
      role: "user",
      content: chat.query,
      createdAt: chat.createdAt || null,
      fromHistory: true,
    }));
}
