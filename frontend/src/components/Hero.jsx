import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-4 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
      {/* Decorative ambient glowing orbs */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[380px] w-[620px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(202,220,189,0.5),transparent_70%)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-48 right-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(220,232,213,0.45),transparent_65%)] blur-2xl animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-64 left-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(240,222,190,0.3),transparent_70%)] blur-2xl animate-pulse-glow"
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-[11px] font-bold tracking-[2.5px] uppercase text-[#4b7355] bg-[#dce8d5]/80 border border-[#cadcbd] rounded-full shadow-xs">
          <span className="text-xs">✿</span>
          <span>Your space to breathe</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-[-1.5px] text-[#243b32] leading-[1.15]">
          Take a moment for yourself
        </h1>

        {/* Tagline */}
        <p className="mt-5 text-base sm:text-lg text-[#7b827a] leading-[1.7] max-w-2xl mx-auto font-normal">
          CalmWind helps students understand their mood, sleep and stress, and connects them to real help when they need it.
        </p>

        {/* Actions */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          <Link
            to="/signup"
            className="btn-primary text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 shadow-[0_8px_25px_rgba(53,91,68,0.22)] hover:shadow-[0_14px_30px_rgba(53,91,68,0.3)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
          >
            <span>Start your check-in</span>
            <span aria-hidden="true">→</span>
          </Link>

          <a
            href="#features"
            className="btn-secondary text-sm sm:text-base px-5 sm:px-6 py-3 sm:py-3.5 border border-[#dfe4d9] hover:border-[#cadcbd] hover:bg-[#dce8d5] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
          >
            Explore features
          </a>
        </div>

        {/* Interactive aesthetic float cards preview */}
        <div className="mt-14 max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4">
          <div className="calm-card p-4 flex items-center gap-3 bg-[#fffefa]/90 animate-float">
            <div className="h-9 w-9 grid place-items-center rounded-xl bg-[#dce8d5] text-[#355b44] text-base shrink-0">
              🌿
            </div>
            <div className="text-left">
              <p className="text-[11px] font-semibold tracking-wider text-[#69836b] uppercase">Mood</p>
              <p className="text-sm font-medium text-[#243b32]">Calm & Mindful</p>
            </div>
          </div>

          <div className="calm-card p-4 flex items-center gap-3 bg-[#fffefa]/90 animate-float-slow">
            <div className="h-9 w-9 grid place-items-center rounded-xl bg-[#e3ebdf] text-[#355b44] text-base shrink-0">
              🌙
            </div>
            <div className="text-left">
              <p className="text-[11px] font-semibold tracking-wider text-[#69836b] uppercase">Sleep</p>
              <p className="text-sm font-medium text-[#243b32]">7.5 hrs Rested</p>
            </div>
          </div>

          <div className="calm-card p-4 flex items-center gap-3 bg-[#fffefa]/90 animate-float">
            <div className="h-9 w-9 grid place-items-center rounded-xl bg-[#fbf2e3] text-[#7a4c28] text-base shrink-0">
              ☁️
            </div>
            <div className="text-left">
              <p className="text-[11px] font-semibold tracking-wider text-[#7a4c28] uppercase">Stress</p>
              <p className="text-sm font-medium text-[#243b32]">Gentle & Low</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
