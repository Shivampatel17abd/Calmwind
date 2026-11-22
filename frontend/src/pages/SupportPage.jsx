import { useState, useEffect } from "react";
import {
  PhoneCall,
  MessageSquare,
  ShieldAlert,
  Wind,
  Compass,
  CheckCircle,
  ExternalLink,
  Play,
  Pause,
} from "lucide-react";

export default function SupportPage() {
  const [breathingOn, setBreathingOn] = useState(false);
  const [phase, setPhase] = useState("Inhale");
  const [seconds, setSeconds] = useState(4);

  useEffect(() => {
    if (!breathingOn) return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 1) return prev - 1;

        if (phase === "Inhale") {
          setPhase("Hold");
          return 7;
        } else if (phase === "Hold") {
          setPhase("Exhale");
          return 8;
        } else {
          setPhase("Inhale");
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [breathingOn, phase]);

  function toggleBreathing() {
    if (breathingOn) {
      setBreathingOn(false);
      setPhase("Inhale");
      setSeconds(4);
    } else {
      setPhase("Inhale");
      setSeconds(4);
      setBreathingOn(true);
    }
  }

  const helplines = [
    {
      title: "Tele-MANAS (National Tele Mental Health)",
      desc: "Government of India's free 24/7 mental health helpline, in multiple languages. Also reachable toll-free on 1-800-891-4416.",
      actionText: "Call 14416",
      actionHref: "tel:14416",
      badge: "24/7 Free & Confidential",
      primary: true,
    },
    {
      title: "Vandrevala Foundation",
      desc: "Free, confidential 24/7 mental health support by trained counsellors, in multiple languages.",
      actionText: "Call 1860-2662-345",
      actionHref: "tel:18602662345",
      badge: "24/7 Helpline",
      primary: false,
    },
    {
      title: "AASRA",
      desc: "Mumbai-based 24/7 suicide prevention and emotional support helpline.",
      actionText: "Call +91 98204 66726",
      actionHref: "tel:+919820466726",
      badge: "Mumbai · 24/7",
      primary: false,
    },
    {
      title: "Campus Counseling Services",
      desc: "Connect with campus health centers, licensed university therapists, and drop-in counseling.",
      actionText: "Contact Student Health",
      actionHref: "tel:14416",
      badge: "Student Health",
      primary: false,
    },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="pb-4 border-b border-[#eceee7]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#faeae8] text-[#8e3c35] text-[11px] font-bold tracking-wider uppercase mb-2">
          <ShieldAlert className="w-3.5 h-3.5 text-[#b04f44]" />
          <span>Immediate Care & Safety</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#243b32]">
          Help & Crisis Resources
        </h1>
        <p className="mt-1 text-sm sm:text-base text-[#7b827a] max-w-2xl">
          You are never alone. Reaching out is a sign of courage and strength. Free, confidential support is available at any hour.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-[26px] bg-[#fbf5eb] border border-[#f0debe] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7a4c28] text-white text-[10px] font-bold uppercase tracking-wider mb-2.5">
            Emergency Hotline
          </span>
          <h2 className="font-serif text-2xl font-medium text-[#5c371d]">
            Need immediate help or someone to talk to?
          </h2>
          <p className="text-sm text-[#7a4c28] mt-1 max-w-xl leading-relaxed">
            Call <strong>14416</strong> (Tele-MANAS) anytime, anywhere in India. You will be connected directly with trained counselors. In immediate danger, call <strong>112</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href="tel:14416"
            className="px-5 py-3 rounded-xl bg-[#7a4c28] hover:bg-[#5c371d] text-white text-sm font-semibold shadow-sm hover:shadow transition-all inline-flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 14416 Now</span>
          </a>
          <a
            href="tel:18008914416"
            className="px-4 py-3 rounded-xl bg-white text-[#7a4c28] border border-[#f0debe] hover:bg-[#fcf7ee] text-sm font-semibold transition-all inline-flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Call 1-800-891-4416</span>
          </a>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-[26px] bg-[#fffefa] border border-[#e7e9df] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#eceee7]">
          <div>
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-[#355b44]" />
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#243b32]">
                Instant Grounding: 4-7-8 Breath
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#7b827a] mt-1">
              A scientifically backed rhythm to activate your parasympathetic nervous system and soften tension.
            </p>
          </div>

          <button
            onClick={toggleBreathing}
            className="btn-primary text-xs sm:text-sm px-5 py-2.5 shrink-0 self-start sm:self-auto"
          >
            {breathingOn ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause Exercise</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Begin Breathing</span>
              </>
            )}
          </button>
        </div>

        <div className="py-8 flex flex-col items-center justify-center text-center">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 grid place-items-center">
            <div
              className={`absolute inset-0 rounded-full bg-[#dce8d5]/40 transition-all duration-1000 ${
                breathingOn
                  ? phase === "Inhale"
                    ? "scale-105 bg-[#cadcbd]/70"
                    : phase === "Hold"
                    ? "scale-105 bg-[#dce8d5]"
                    : "scale-90 bg-[#eef3ea]"
                  : "scale-95"
              }`}
            />
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-[#fffefa] border border-[#cadcbd] shadow-md flex flex-col items-center justify-center p-4">
              <span className="font-serif text-lg sm:text-xl font-medium text-[#243b32]">
                {breathingOn ? phase : "Ready"}
              </span>
              <span className="font-sans text-2xl sm:text-3xl font-light text-[#355b44] mt-1">
                {breathingOn ? `${seconds}s` : "Relax"}
              </span>
            </div>
          </div>

          <p className="mt-5 text-xs text-[#69836b] max-w-sm font-medium">
            {breathingOn
              ? phase === "Inhale"
                ? "Inhale deeply through your nose for 4 seconds..."
                : phase === "Hold"
                ? "Gently hold the breath in stillness for 7 seconds..."
                : "Exhale slowly and completely through mouth for 8 seconds..."
              : "Click 'Begin Breathing' when you are ready to center yourself."}
          </p>
        </div>
      </div>

      <div>
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#243b32] mb-4">
          Trusted Support Directory
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {helplines.map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-[22px] bg-[#fffefa] border border-[#e7e9df] hover:border-[#cadcbd] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#f3f5ed] text-[#4b7355] border border-[#e0e8d7]">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-medium text-[#243b32]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-[#7b827a] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#f1f3ed]">
                <a
                  href={item.actionHref}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#355b44] hover:text-[#1a2c25] hover:underline"
                >
                  <span>{item.actionText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-[24px] bg-[#f8faf4] border border-[#e2ebd9]">
        <h3 className="font-serif text-lg font-medium text-[#243b32] mb-3 flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#355b44]" />
          <span>Gentle reminders when things feel heavy</span>
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#52765a]">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-[#62866b] shrink-0 mt-0.5" />
            <span>You do not have to carry everything alone today.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-[#62866b] shrink-0 mt-0.5" />
            <span>Take a pause before replying to stressful academic emails.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-[#62866b] shrink-0 mt-0.5" />
            <span>Eat a warm meal, drink water, and prioritize rest tonight.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-[#62866b] shrink-0 mt-0.5" />
            <span>Reaching out for counseling is a practical and caring act.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
