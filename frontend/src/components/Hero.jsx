import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SproutLogo } from "./BotanicalDecor";

export default function Hero() {
  return (
    <section id="home" className="relative px-4 pt-16 pb-16 sm:pt-20 sm:pb-20 text-center">
      <div className="relative max-w-3xl mx-auto">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-[11px] font-bold tracking-[2.5px] uppercase text-[#4b7355] bg-[#dce8d5]/80 border border-[#cadcbd] rounded-full shadow-xs">
          <SproutLogo className="w-3.5 h-3.5" color="#355b44" />
          <span>Your space to breathe</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#243b32] leading-[1.15]">
          Take a moment for yourself
        </h1>

        {/* Tagline */}
        <p className="mt-5 text-base sm:text-lg text-[#7b827a] leading-[1.7] max-w-2xl mx-auto font-normal">
          CalmWind helps students understand their mood, sleep and stress, and connects them to real help when they need it.
        </p>

        {/* Actions */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          <Link
            to="/track-health"
            className="btn-primary text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5"
          >
            <span>Start your check-in</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/app/journal"
            className="btn-secondary text-sm sm:text-base px-5 sm:px-6 py-3 sm:py-3.5 border border-[#e8eae2]"
          >
            Open Journal
          </Link>
        </div>

      </div>
    </section>
  );
}
