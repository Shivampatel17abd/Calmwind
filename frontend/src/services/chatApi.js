import { apiRequest, ApiError } from "../utils/api";

function normalizeSource(source) {
  if (!source) return null;
  return {
    source: source.source || "CalmWind knowledge",
    category: source.category || "general",
    score: typeof source.score === "number" ? source.score : null,
  };
}

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
