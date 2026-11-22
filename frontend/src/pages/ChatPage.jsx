import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PhoneCall, RotateCcw, Send } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getChatHistory, sendChatMessage } from "../services/chatApi";

const STARTER_PROMPTS = [
  "I feel overwhelmed with deadlines. Where do I start?",
  "I can't sleep because my mind keeps racing.",
  "How do I calm down before an exam?",
];

let messageSeq = 0;
function nextId() {
  messageSeq += 1;
  return `msg-${Date.now()}-${messageSeq}`;
}

function SourceChips({ sources }) {
  if (!sources?.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Sources">
      {sources.map((item, index) => (
        <span
          key={`${item.source}-${index}`}
          className="inline-flex items-center gap-1 rounded-full border border-[#dde5d8] bg-[#f4f6f1] px-2.5 py-1 text-xs text-[#55705c]"
          title={item.category}
        >
          <span className="font-medium">{item.source}</span>
          <span aria-hidden="true">·</span>
          <span>{item.category}</span>
          {item.score !== null && (
            <>
              <span aria-hidden="true">·</span>
              <span>{Math.round(item.score * 100)}%</span>
            </>
          )}
        </span>
      ))}
    </div>
  );
}

export default function ChatPage() {
  const { user } = useAuth();
  const userId = user?.id || "";
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [historyError, setHistoryError] = useState("");
  const [sendError, setSendError] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    if (!userId) return undefined;
    (async () => {
      try {
        const history = await getChatHistory(userId);
        if (!cancelled) setMessages(history);
      } catch {
        if (!cancelled) {
          setHistoryError("Couldn't load earlier messages. You can still start a new conversation.");
        }
      } finally {
        if (!cancelled) setIsLoadingHistory(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isSending]);

  const requestReply = useCallback(
    async (query) => {
      setIsSending(true);
      setSendError(null);
      try {
        const { reply, sources } = await sendChatMessage(userId, query);
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: "assistant",
            content: reply || "I didn't get a reply that time. Could you try again?",
            sources,
          },
        ]);
      } catch (error) {
        setSendError({
          query,
          message:
            error?.status === 0
              ? "Can't reach CalmWind right now. Check that the backend is running, then retry."
              : error?.message || "Something went wrong. Please retry.",
        });
      } finally {
        setIsSending(false);
        inputRef.current?.focus();
      }
    },
    [userId]
  );

  async function handleSend(text) {
    const query = (text ?? input).trim();
    if (!query || isSending || !userId) return;
    setMessages((prev) => [...prev, { id: nextId(), role: "user", content: query }]);
    setInput("");
    await requestReply(query);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  const hasHistoryOnly = messages.length > 0 && messages.every((m) => m.fromHistory);

  return (
    <div className="animate-fade-in mx-auto flex w-full max-w-3xl flex-col space-y-5">
      <header>
        <h1 className="text-2xl font-semibold text-[#2e3d36] sm:text-3xl">AI Companion</h1>
        <p className="mt-2 text-base text-[#66736a]">
          A calm space to talk things through. I'm an AI assistant, not a therapist — for urgent
          help, use the support lines below.
        </p>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[16px] border border-[#f0debe] bg-[#fbf5eb] px-4 py-3">
        <p className="text-sm text-[#7a4c28]">
          In crisis or feeling unsafe? Call <strong>14416</strong> (Tele-MANAS) anytime in India, or <strong>112</strong> in immediate danger.
        </p>
        <div className="flex items-center gap-2">
          <a
            href="tel:14416"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#7a4c28] px-3 py-1.5 text-sm font-medium text-white"
          >
            <PhoneCall className="h-4 w-4" /> Call 14416
          </a>
          <Link to="/app/support" className="px-2 py-1.5 text-sm font-medium text-[#7a4c28] hover:underline">
            All support options
          </Link>
        </div>
      </div>

      <section
        aria-label="Conversation"
        className="rounded-[20px] border border-[#e8eae2] bg-[#fdfdfa] px-4 py-5 sm:px-6"
      >
        {isLoadingHistory && userId ? (
          <p className="py-10 text-center text-sm text-[#66736a]" role="status">
            Loading your conversation…
          </p>
        ) : messages.length === 0 ? (
          <div className="py-6">
            <p className="text-base font-medium text-[#2e3d36]">What's on your mind?</p>
            <p className="mt-1 text-sm leading-relaxed text-[#66736a]">
              Share what's weighing on you, or start with one of these:
            </p>
            <div className="mt-4 flex flex-col items-start gap-2">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  disabled={isSending || !userId}
                  onClick={() => handleSend(prompt)}
                  className="rounded-full border border-[#dde5d8] bg-[#f8f9f6] px-4 py-2 text-left text-sm text-[#3a5f4a] transition-colors hover:border-[#9db89f] disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4" aria-live="polite">
            {hasHistoryOnly && (
              <p className="rounded-xl bg-[#f4f6f1] px-3 py-2 text-xs leading-relaxed text-[#66736a]">
                Showing your earlier messages. Companion replies from past visits aren't saved by
                the server yet, so only your side of those conversations appears here.
              </p>
            )}
            {messages.map((message) =>
              message.role === "user" ? (
                <div key={message.id} className="flex justify-end">
                  <div className="max-w-[85%] rounded-[18px] rounded-br-md bg-[#355b44] px-4 py-3 text-sm leading-relaxed text-white sm:max-w-[75%]">
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ) : (
                <div key={message.id} className="flex justify-start">
                  <div className="max-w-[85%] rounded-[18px] rounded-bl-md border border-[#e8eae2] bg-white px-4 py-3 text-sm leading-relaxed text-[#2e3d36] sm:max-w-[75%]">
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <SourceChips sources={message.sources} />
                  </div>
                </div>
              )
            )}
            {isSending && (
              <div className="flex justify-start" role="status" aria-label="Companion is thinking">
                <div className="rounded-[18px] rounded-bl-md border border-[#e8eae2] bg-white px-4 py-3 text-sm text-[#66736a]">
                  Thinking…
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}

        {historyError && !isLoadingHistory && (
          <p className="mt-4 text-sm text-[#8e3c35]" role="alert">
            {historyError}
          </p>
        )}

        {sendError && (
          <div
            className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#f0c9c4] bg-[#faeae8] px-4 py-3"
            role="alert"
          >
            <p className="text-sm text-[#8e3c35]">{sendError.message}</p>
            <button
              type="button"
              disabled={isSending}
              onClick={() => requestReply(sendError.query)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-[#8e3c35] disabled:opacity-50"
            >
              <RotateCcw className="h-4 w-4" /> Retry
            </button>
          </div>
        )}

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSend();
          }}
          className="mt-5 border-t border-[#eceee7] pt-4"
        >
          <label htmlFor="chat-input" className="sr-only">
            Message the companion
          </label>
          <div className="flex items-end gap-2">
            <textarea
              id="chat-input"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              placeholder="Write what's on your mind… (Enter to send, Shift+Enter for a new line)"
              disabled={isSending}
              className="min-h-[52px] flex-1 resize-y rounded-2xl border border-[#e8eae2] bg-[#f8f9f6] px-4 py-3 text-base leading-relaxed text-[#2e3d36] outline-none placeholder:text-[#9aa59c] focus:border-[#6d8a72] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || isSending || !userId}
              className="btn-primary shrink-0 px-4 py-3 text-sm disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
              <span className="ml-1.5 hidden sm:inline">Send</span>
            </button>
          </div>
          {!userId && (
            <p className="mt-2 text-sm text-[#8e3c35]">Your session expired. Please log in again to chat.</p>
          )}
        </form>
      </section>
    </div>
  );
}
