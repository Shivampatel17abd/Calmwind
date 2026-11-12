import { Link } from "react-router-dom";
import {
  Brain,
  CheckCircle2,
  Heart,
  PhoneCall,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import CalmCard from "../common/CalmCard";
import InsightListCard from "../common/InsightListCard";
import MetricCard from "../common/MetricCard";
import ProgressBar from "../common/ProgressBar";
import SectionBadge from "../common/SectionBadge";

const BANNER_STYLES = {
  sage: {
    cardTone: "sage",
    scoreBg: "bg-[#355b44] text-white",
    subtext: "text-[#4b7355]",
  },
  softSage: {
    cardTone: "softSage",
    scoreBg: "bg-[#4b7355] text-white",
    subtext: "text-[#4b7355]",
  },
  warm: {
    cardTone: "warm",
    scoreBg: "bg-[#7a4c28] text-white",
    subtext: "text-[#7a4c28]",
  },
  alert: {
    cardTone: "alert",
    scoreBg: "bg-[#8c3b2b] text-white",
    subtext: "text-[#8c3b2b]",
  },
};

/**
 * Displays the computed Mental Health Status, domain breakdown, snapshot metrics,
 * personalized insights, and support guidance using reusable CalmWind components.
 */
export default function MentalStatusResult({ result, onReset }) {
  const bannerStyle = BANNER_STYLES[result.tone] || BANNER_STYLES.sage;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
      {/* Primary Mental Health Status Banner */}
      <CalmCard tone={bannerStyle.cardTone} padding="lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <SectionBadge
                tone={result.tone}
                icon={<CheckCircle2 size={13} />}
              >
                {result.badgeLabel}
              </SectionBadge>
              <span className="text-xs font-medium text-[#7b827a]">
                Checked on {result.date} at {result.time}
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#243b32] tracking-tight">
              {result.status}
            </h2>

            <p className="text-sm sm:text-base text-[#243b32]/85 leading-relaxed">
              {result.summary}
            </p>
          </div>

          <div className="shrink-0 flex md:flex-col items-center justify-center gap-3 md:gap-2 p-5 rounded-2xl bg-[#fffefa]/90 border border-[#e7e9df] min-w-[148px]">
            <div
              className={`h-16 w-16 rounded-2xl grid place-items-center font-serif text-2xl font-medium shadow-xs ${bannerStyle.scoreBg}`}
            >
              {result.score}
            </div>
            <div className="text-left md:text-center">
              <p className="text-[11px] font-bold tracking-[1.6px] uppercase text-[#69836b]">
                Wellbeing Index
              </p>
              <p className={`text-xs font-semibold ${bannerStyle.subtext}`}>
                Out of 100
              </p>
            </div>
          </div>
        </div>
      </CalmCard>

      {/* Domain Breakdown */}
      <CalmCard padding="md">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#243b32]">
              Mental Health Breakdown
            </h3>
            <p className="text-xs sm:text-sm text-[#7b827a]">
              How each part of your wellbeing contributed to today&apos;s status
            </p>
          </div>
          <SectionBadge tone="neutral">4 Core Domains</SectionBadge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {result.domainScores.map((domain) => (
            <div
              key={domain.key}
              className="p-4 rounded-2xl bg-[#f7f9f4] border border-[#e7e9df]"
            >
              <ProgressBar
                label={domain.label}
                value={domain.score}
                max={100}
                valueText={`${domain.score}% · ${domain.text}`}
                tone={domain.tone}
              />
            </div>
          ))}
        </div>
      </CalmCard>

      {/* Snapshot Metrics Grid (reusing MetricCard) */}
      <div>
        <h3 className="font-serif text-xl font-medium text-[#243b32] mb-3 px-1">
          Your Check-in Snapshot
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
          {result.snapshotMetrics.map((metric) => (
            <MetricCard
              key={metric.label}
              iconName={metric.iconName}
              label={metric.label}
              value={metric.value}
              sublabel={metric.sublabel}
              tone={metric.tone}
            />
          ))}
        </div>
      </div>

      {/* Observations & Recommendations (reusing InsightListCard twice) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InsightListCard
          title="Key Observations"
          subtitle="Patterns noticed in your check-in"
          icon={Brain}
          itemIcon={CheckCircle2}
          items={result.observations}
          tone="softSage"
        />

        <InsightListCard
          title="Gentle Next Steps"
          subtitle="Practical actions tailored to today"
          icon={Heart}
          itemIcon={Sparkles}
          items={result.recommendations}
          tone="sage"
        />
      </div>

      {/* Extra support prompt when strain or distress is elevated */}
      {result.needsSupportNotice && (
        <CalmCard tone="warm" padding="md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/80 text-[#7a4c28] grid place-items-center shrink-0">
                <PhoneCall size={19} />
              </div>
              <div>
                <h4 className="font-serif text-lg font-medium text-[#5c371d]">
                  Reaching out is a sign of strength
                </h4>
                <p className="text-sm text-[#7a4c28] leading-relaxed mt-0.5">
                  If things feel overwhelming today, free confidential support is available anytime—or jump to the helpline options below.
                </p>
              </div>
            </div>

            <a
              href="#help"
              className="px-4 py-2.5 rounded-xl bg-[#7a4c28] hover:bg-[#5c371d] text-white text-xs sm:text-sm font-semibold transition-all shrink-0 text-center"
            >
              View Support Resources ↓
            </a>
          </div>
        </CalmCard>
      )}

      {/* Disclaimer */}
      <CalmCard tone="warm" padding="sm">
        <div className="flex items-start gap-3">
          <ShieldCheck
            size={20}
            className="text-[#7a4c28] shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div>
            <h4 className="text-sm font-semibold text-[#5c371d]">
              Wellness reflection disclaimer
            </h4>
            <p className="text-xs sm:text-sm text-[#7a4c28] leading-relaxed mt-1">
              This mental health status check is for personal self-reflection only and does not provide a medical diagnosis. If emotional distress persists or affects your daily safety, please connect with a campus counselor or licensed professional.
            </p>
          </div>
        </div>
      </CalmCard>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
        <button
          type="button"
          onClick={onReset}
          className="btn-primary w-full sm:flex-1 py-3.5 cursor-pointer"
        >
          <RotateCcw size={17} />
          <span>Take Another Check-in</span>
        </button>

        <Link
          to="/"
          className="btn-secondary w-full sm:w-auto px-6 py-3.5 text-center border border-[#cadcbd]"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

