import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

// Slow breathing at ~6 breaths/min (5s in, 5s out, no holds) is the pace
// with the strongest evidence for raising HRV and settling arousal.
// It never starts on its own — the person chooses to begin.
export default function BreathingCard() {
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState("in"); // "in" | "out"
  const [cycles, setCycles] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    if (!running) return undefined;
    timer.current = setInterval(() => {
      setPhase((prev) => {
        if (prev === "out") setCycles((c) => c + 1);
        return prev === "in" ? "out" : "in";
      });
    }, 5000);
    return () => clearInterval(timer.current);
  }, [running]);

  function toggle() {
    if (running) {
      setRunning(false);
      setPhase("in");
    } else {
      setPhase("in");
      setCycles(0);
      setRunning(true);
    }
  }

  return (
    <section
      aria-label="Slow breathing"
      className="rounded-[20px] border border-[#e8eae2] bg-[#fdfdfa] px-6 py-6"
    >
      <div className="flex items-center gap-6">
        <div
          aria-hidden="true"
          className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[#eef2e9]"
        >
          <div
            className="rounded-full bg-[#cbdac2] transition-transform ease-in-out"
            style={{
              width: 44,
              height: 44,
              transform: running
                ? phase === "in"
                  ? "scale(1.35)"
                  : "scale(1)"
                : "scale(1)",
              transitionDuration: "5000ms",
            }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold text-[#2e3d36]">
            A minute of slow breathing
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-[#66736a]" role="status">
            {!running
              ? "If you like, breathe with the circle. Nothing to get right."
              : phase === "in"
                ? "Breathe in, slowly…"
                : "And out, even slower…"}
            {running && cycles > 0 ? ` ${cycles} round${cycles === 1 ? "" : "s"}.` : ""}
          </p>
          <button
            type="button"
            onClick={toggle}
            className="btn-secondary mt-3 px-4 py-2 text-sm"
            aria-pressed={running}
          >
            {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{running ? "Pause" : cycles > 0 ? "Breathe again" : "Begin"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
