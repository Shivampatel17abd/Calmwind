import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import CalmCard from "../common/CalmCard";
import ProgressBar from "../common/ProgressBar";
import SectionBadge from "../common/SectionBadge";

/**
 * Multi-step assessment shell reusing CalmCard, SectionBadge, and ProgressBar.
 */
export default function AssessmentStepper({
  step,
  totalSteps,
  stepTitle,
  stepSubtitle,
  onPrev,
  onNext,
  onSubmit,
  children,
}) {
  const isFinalStep = step === totalSteps;
  const progressValue = (step / totalSteps) * 100;

  return (
    <CalmCard padding="lg" className="max-w-3xl mx-auto animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <SectionBadge tone="softSage">
          Section {step} of {totalSteps}
        </SectionBadge>
        <span className="text-xs font-semibold text-[#69836b]">
          {Math.round(progressValue)}% complete
        </span>
      </div>

      <ProgressBar value={progressValue} max={100} size="sm" className="mb-8" />

      <div className="mb-7 pb-5 border-b border-[#eceee7]">
        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#243b32]">
          {stepTitle}
        </h2>
        {stepSubtitle && (
          <p className="mt-1.5 text-sm text-[#7b827a] leading-relaxed">
            {stepSubtitle}
          </p>
        )}
      </div>

      <form onSubmit={onSubmit}>
        <div>{children}</div>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-9 pt-6 border-t border-[#eceee7]">
          {step > 1 ? (
            <button
              type="button"
              onClick={onPrev}
              className="btn-secondary cursor-pointer text-sm"
            >
              <ArrowLeft size={16} />
              <span>Previous</span>
            </button>
          ) : (
            <span className="text-xs text-[#7b827a]">
              Private & saved only in your browser
            </span>
          )}

          {!isFinalStep ? (
            <button
              type="button"
              onClick={onNext}
              className="btn-primary cursor-pointer text-sm ml-auto"
            >
              <span>Continue to Habits</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="submit"
              className="btn-primary cursor-pointer text-sm ml-auto"
            >
              <Sparkles size={16} />
              <span>Check Mental Health Status</span>
            </button>
          )}
        </div>
      </form>
    </CalmCard>
  );
}

