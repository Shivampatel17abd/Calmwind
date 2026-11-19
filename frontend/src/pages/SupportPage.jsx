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
  // Grounding 4-7-8 Breathing Exercise
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState("Inhale"); // "Inhale" (4s) | "Hold" (7s) | "Exhale" (8s)
  const [secondsLeft, setSecondsLeft] = useState(4);

  useEffect(() => {
    if (!isBreathingActive) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;

        if (breathPhase === "Inhale") {
          setBreathPhase("Hold");
          return 7;
        } else if (breathPhase === "Hold") {
          setBreathPhase("Exhale");
          return 8;
        } else {
          setBreathPhase("Inhale");
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isBreathingActive, breathPhase]);

  function handleToggleBreathing() {
    if (isBreathingActive) {
      setIsBreathingActive(false);
      setBreathPhase("Inhale");
      setSecondsLeft(4);
    } else {
      setBreathPhase("Inhale");
      setSecondsLeft(4);
      setIsBreathingActive(true);
    }
  }

  const helplines = [
    {
      title: "988 Suicide & Crisis Lifeline",
      desc: "Free, confidential 24/7 support for anyone in emotional distress or suicidal crisis.",
      actionText: "Call or Text 988",
      actionHref: "tel:988",
      badge: "24/7 Free & Confidential",
      primary: true,
    },
    {
      title: "Crisis Text Line",
      desc: "Text with a trained volunteer crisis counselor 24/7 for immediate support.",
      actionText: "Text HOME to 741741",
      actionHref: "sms:741741",
      badge: "24/7 Text Support",
      primary: false,
    },
    {
      title: "The Trevor Project",
      desc: "Crisis intervention and suicide prevention for LGBTQ+ young people.",
      actionText: "Call 1-866-488-7386",
      actionHref: "tel:18664887386",
      badge: "LGBTQ+ Youth",
      primary: false,
    },
    {
      title: "Campus Counseling Services",
      desc: "Connect with campus health centers, licensed university therapists, and drop-in counseling.",
      actionText: "Contact Student Health",
      actionHref: "tel:988",
      badge: "Student Health",
      primary: false,
    },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Page Header */}
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

      {/* Emergency Crisis Banner */}
      <div className="p-6 sm:p-8 rounded-[26px] bg-[#fbf5eb] border border-[#f0debe] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7a4c28] text-white text-[10px] font-bold uppercase tracking-wider mb-2.5">
            Emergency Hotline
          </span>
          <h2 className="font-serif text-2xl font-medium text-[#5c371d]">
            Need immediate help or someone to talk to?
          </h2>
          <p className="text-sm text-[#7a4c28] mt-1 max-w-xl leading-relaxed">
            Call or text <strong>988</strong> anytime from anywhere in the US and Canada. You will be connected directly with trained counselors.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href="tel:988"
            className="px-5 py-3 rounded-xl bg-[#7a4c28] hover:bg-[#5c371d] text-white text-sm font-semibold shadow-sm hover:shadow transition-all inline-flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 988 Now</span>
          </a>
          <a
            href="sms:741741"
            className="px-4 py-3 rounded-xl bg-white text-[#7a4c28] border border-[#f0debe] hover:bg-[#fcf7ee] text-sm font-semibold transition-all inline-flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Text 741741</span>
          </a>
        </div>
      </div>

      {/* Grounding 4-7-8 Breathing Tool */}
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
            onClick={handleToggleBreathing}
            className="btn-primary text-xs sm:text-sm px-5 py-2.5 shrink-0 self-start sm:self-auto"
          >
            {isBreathingActive ? (
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

        {/* Breathing Circle Visualization */}
        <div className="py-8 flex flex-col items-center justify-center text-center">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 grid place-items-center">
            {/* Outer animated halo */}
            <div
              className={`absolute inset-0 rounded-full bg-[#dce8d5]/40 transition-all duration-1000 ${
                isBreathingActive
                  ? breathPhase === "Inhale"
                    ? "scale-105 bg-[#cadcbd]/70"
                    : breathPhase === "Hold"
                    ? "scale-105 bg-[#dce8d5]"
                    : "scale-90 bg-[#eef3ea]"
                  : "scale-95"
              }`}
            />
            {/* Inner Core */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-[#fffefa] border border-[#cadcbd] shadow-md flex flex-col items-center justify-center p-4">
              <span className="font-serif text-lg sm:text-xl font-medium text-[#243b32]">
                {isBreathingActive ? breathPhase : "Ready"}
              </span>
              <span className="font-sans text-2xl sm:text-3xl font-light text-[#355b44] mt-1">
                {isBreathingActive ? `${secondsLeft}s` : "Relax"}
              </span>
            </div>
          </div>

          <p className="mt-5 text-xs text-[#69836b] max-w-sm font-medium">
            {isBreathingActive
              ? breathPhase === "Inhale"
                ? "Inhale deeply through your nose for 4 seconds..."
                : breathPhase === "Hold"
                ? "Gently hold the breath in stillness for 7 seconds..."
                : "Exhale slowly and completely through mouth for 8 seconds..."
              : "Click 'Begin Breathing' when you are ready to center yourself."}
          </p>
        </div>
      </div>

      {/* Directory of Helplines Grid */}
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

      {/* Student Self-Care Checklist */}
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
