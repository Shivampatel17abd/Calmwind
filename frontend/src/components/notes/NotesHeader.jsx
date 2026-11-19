import SectionBadge from "../common/SectionBadge";

/**
 * Minimalist header for the Notepad page using CalmWind's signature
 * serif typography, ambient sage glow, and SectionBadge.
 */
export default function NotesHeader() {
  return (
    <header className="relative text-center max-w-3xl mx-auto mb-8 sm:mb-10">
      <div
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-52 w-[480px] max-w-full rounded-full bg-[radial-gradient(ellipse_at_center,rgba(202,220,189,0.5),transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">
        <SectionBadge icon={<span aria-hidden="true">✿</span>} tone="sage">
          Mindful Notepad
        </SectionBadge>

        <h1 className="mt-4 font-serif text-3xl sm:text-5xl font-normal tracking-[-1px] text-[#243b32] leading-[1.16]">
          Your space for daily points & reflections
        </h1>

        <p className="mt-3.5 text-sm sm:text-base text-[#7b827a] leading-[1.7] max-w-xl mx-auto">
          Capture study tasks, health reminders, and quiet thoughts in one calm,
          uncluttered place. Saved automatically on your device.
        </p>
      </div>
    </header>
  );
}
