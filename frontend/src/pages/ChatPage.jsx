import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PhoneCall, RotateCcw, Send } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getChatHistory, sendChatMessage } from "../services/chatApi";

const starterQuestions = [
  "I feel overwhelmed with deadlines. Where do I start?",
  "I can't sleep because my mind keeps racing.",
  "How do I calm down before an exam?",
];

function Sources({ sources }) {
  if (!sources || sources.length === 0) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {sources.map((s, i) => (
        <span key={i} className="chip">
          {s.source} · {s.category}
          {s.score !== null && <> · {Math.round(s.score * 100)}%</>}
        </span>
      ))}
    </div>
  );
}

export default function ChatPage() {
  const { user } = useAuth();
  const userId = user?.id || "";

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [historyError, setHistoryError] = useState("");
  const [error, setError] = useState(null);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const idRef = useRef(0);

  function nextId() {
    idRef.current += 1;
    return "msg-" + idRef.current;
  }

  useEffect(() => {
    if (!userId) return;
    let ignore = false;
    getChatHistory(userId)
      .then((old) => {
        if (!ignore) setMessages(old);
      })
      .catch(() => {
        if (!ignore) setHistoryError("Could not load old messages. You can still chat below.");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  async function getReply(question) {
    setSending(true);
    setError(null);
    try {
      const data = await sendChatMessage(userId, question);
      const reply = {
        id: nextId(),
        role: "assistant",
        content: data.reply || "I could not reply that time. Please try again.",
        sources: data.sources,
      };
      setMessages((old) => [...old, reply]);
    } catch (err) {
      const rawMsg = err?.message || "";
      const technical = err?.status >= 500 || /ssl|tls|fetch|network|socket/i.test(rawMsg);
      setError({
        question,
        message:
          err?.status === 0
            ? "Server is not reachable. Please check the backend is running."
            : technical
              ? "AI service could not reply right now. Please retry after some time."
              : rawMsg || "Something went wrong. Please retry.",
      });
    }
    setSending(false);
    inputRef.current?.focus();
  }

  function send(question) {
    const q = (question ?? text).trim();
    if (q === "" || sending || !userId) return;
    setMessages((old) => [...old, { id: nextId(), role: "user", content: q }]);
    setText("");
    getReply(q);
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  const onlyOldMessages = messages.length > 0 && messages.every((m) => m.fromHistory);

  return (
    <div className="animate-fade-in mx-auto w-full max-w-3xl space-y-5">
      <div>
        <h1 className="page-title">AI Companion</h1>
        <p className="small-text mt-2">
          Talk about what is on your mind. This is an AI assistant, not a therapist.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#f0debe] bg-[#fbf5eb] px-4 py-3">
        <p className="text-sm text-[#7a4c28]">
          Feeling unsafe? Call <b>14416</b> (Tele-MANAS) anytime in India, or <b>112</b> for emergency.
        </p>
        <div className="flex items-center gap-2">
          <a href="tel:14416" className="btn-primary px-3 py-1.5 text-sm">
            <PhoneCall className="h-4 w-4" /> Call 14416
          </a>
          <Link to="/app/support" className="text-sm font-medium text-[#7a4c28] hover:underline">
            More help
          </Link>
        </div>
      </div>

      <div className="calm-card px-4 py-5 sm:px-6">
        {loading && userId ? (
          <p className="py-10 text-center text-sm text-[#66736a]">Loading old messages...</p>
        ) : messages.length === 0 ? (
          <div className="py-4">
            <p className="font-medium text-[#2e3d36]">What is on your mind?</p>
            <p className="small-text mt-1">You can type your own question, or pick one:</p>
            <div className="mt-4 flex flex-col items-start gap-2">
              {starterQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  disabled={sending || !userId}
                  onClick={() => send(q)}
                  className="chip px-4 py-2 text-sm disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {onlyOldMessages && (
              <p className="rounded-xl bg-[#f4f6f1] px-3 py-2 text-xs text-[#66736a]">
                These are your old questions. Old replies are not saved on the server yet.
              </p>
            )}
            {messages.map((m) => (
              <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[80%] rounded-2xl bg-[#355b44] px-4 py-3 text-sm leading-relaxed text-white"
                      : "max-w-[80%] rounded-2xl border border-[#e8eae2] bg-white px-4 py-3 text-sm leading-relaxed text-[#2e3d36]"
                  }
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>
                  {m.role === "assistant" && <Sources sources={m.sources} />}
                </div>
              </div>
            ))}
            {sending && (
              <p className="inline-block rounded-2xl border border-[#e8eae2] bg-white px-4 py-3 text-sm text-[#66736a]">
                Thinking...
              </p>
            )}
            <div ref={bottomRef} />
          </div>
        )}

        {historyError && <p className="mt-4 text-sm text-[#8e3c35]">{historyError}</p>}

        {error && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#f0c9c4] bg-[#faeae8] px-4 py-3">
            <p className="text-sm text-[#8e3c35]">{error.message}</p>
            <button
              type="button"
              disabled={sending}
              onClick={() => getReply(error.question)}
              className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-[#8e3c35] disabled:opacity-50"
            >
              <RotateCcw className="h-4 w-4" /> Retry
            </button>
          </div>
        )}

        <form
          className="mt-5 flex items-end gap-2 border-t border-[#eceee7] pt-4"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <textarea
            ref={inputRef}
            className="input"
            rows={2}
            value={text}
            disabled={sending}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Write here... (Enter to send)"
            aria-label="Write your message"
          />
          <button type="submit" disabled={text.trim() === "" || sending || !userId} className="btn-primary px-4 py-3 text-sm disabled:opacity-50">
            <Send className="h-4 w-4" /> Send
          </button>
        </form>
        {!userId && <p className="mt-2 text-sm text-[#8e3c35]">Please login again to chat.</p>}
      </div>
    </div>
  );
}
