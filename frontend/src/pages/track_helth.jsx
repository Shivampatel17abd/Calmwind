import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TrackerHeader from "../components/tracker/TrackerHeader";
import AssessmentStepper from "../components/tracker/AssessmentStepper";
import EmotionalCheckInStep from "../components/tracker/EmotionalCheckInStep";
import LifestyleCheckInStep from "../components/tracker/LifestyleCheckInStep";
import MentalStatusResult from "../components/tracker/MentalStatusResult";
import CheckInHistory from "../components/tracker/CheckInHistory";
import {
  INITIAL_TRACKER_DATA,
  clearCheckInHistory,
  evaluateMentalHealth,
  loadCheckInHistory,
  saveCheckInHistory,
} from "../utils/mentalHealthModel";

const STEP_META = {
  1: {
    title: "Emotional & Mind Check-in",
    subtitle: "Let's understand how your mood, stress, and focus have felt lately.",
  },
  2: {
    title: "Sleep, Energy & Daily Habits",
    subtitle: "Daily rest, movement, and support play a big role in mental resilience.",
  },
};

export default function MentalHealthTracker() {
  const [form, setForm] = useState(INITIAL_TRACKER_DATA);
  const [step, setStep] = useState(1);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(() => loadCheckInHistory());

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextStep = () => {
    setStep(2);
    scrollToTop();
  };

  const handlePrevStep = () => {
    setStep(1);
    scrollToTop();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const evaluation = evaluateMentalHealth(form);
    const updatedHistory = saveCheckInHistory({
      ...evaluation,
      mood: evaluation.moodLabel,
      sleepHours: form.sleepHours,
      stress: form.stress,
    });

    setResult(evaluation);
    setHistory(updatedHistory);
    setStep(3);
    scrollToTop();
  };

  const handleReset = () => {
    setForm(INITIAL_TRACKER_DATA);
    setResult(null);
    setStep(1);
    scrollToTop();
  };

  const handleClearHistory = () => {
    setHistory(clearCheckInHistory());
  };

  const activeMeta = STEP_META[step] || STEP_META[1];

  return (
    <div className="min-h-screen calm-bg text-[#243b32] selection:bg-[#cadcbd] selection:text-[#1a2c25] flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <TrackerHeader isCompleted={step === 3 && Boolean(result)} />

        {step !== 3 && (
          <AssessmentStepper
            step={step}
            totalSteps={2}
            stepTitle={activeMeta.title}
            stepSubtitle={activeMeta.subtitle}
            onPrev={handlePrevStep}
            onNext={handleNextStep}
            onSubmit={handleSubmit}
          >
            {step === 1 ? (
              <EmotionalCheckInStep form={form} onUpdate={updateField} />
            ) : (
              <LifestyleCheckInStep form={form} onUpdate={updateField} />
            )}
          </AssessmentStepper>
        )}

        {step === 3 && result && (
          <MentalStatusResult result={result} onReset={handleReset} />
        )}

        <CheckInHistory history={history} onClear={handleClearHistory} />
      </main>

      <Footer />
    </div>
  );
}
