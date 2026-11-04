const features = [
  {
    icon: '🌿',
    title: 'Connected tracking',
    description: 'See how mood, sleep and stress affect each other, not just a mood log on its own.',
    tag: 'Holistic',
  },
  {
    icon: '☀️',
    title: 'Daily check-in',
    description: 'A quick form for sleep, mood and stress, plus a one-time setup so insights fit you.',
    tag: 'Quick 2 min',
  },
  {
    icon: '📊',
    title: 'Pattern dashboard',
    description: 'Graphs of your mood, sleep and stress over time to spot warning signs early.',
    tag: 'Insights',
  },
  {
    icon: '📖',
    title: 'Private journal',
    description: 'A safe place to write, with optional mood tags.',
    tag: 'Private',
  },
  {
    icon: '🎵',
    title: 'Mood-based picks',
    description: 'Calming or uplifting music, books and movies based on how you feel.',
    tag: 'Mindful',
  },
  {
    icon: '🤝',
    title: 'Helpline directory',
    description: 'Campus counselors and crisis helplines, always easy to find.',
    tag: '24/7 Access',
  },
  {
    icon: '🌱',
    title: 'Habit nudges',
    description: 'Gentle reminders and streaks for sleep, water and breaks.',
    tag: 'Routines',
  },
  {
    icon: '💬',
    title: 'Peer support forum',
    description: 'An anonymous space to share and support each other, with basic safety moderation.',
    tag: 'Safe Space',
  },
]

export default function Features() {
  return (
    <section id="features" className="max-w-7xl px-4 py-20 mx-auto sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 text-[11px] font-bold tracking-[2px] uppercase text-[#4b7355] bg-[#dce8d5]/80 border border-[#cadcbd] rounded-full">
          <span>✿</span>
          <span>Gentle & Thoughtful Tools</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#243b32]">
          Designed for peace of mind
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#7b827a] font-normal leading-relaxed">
          Every feature is intentionally crafted to help students slow down, reflect with clarity, and find genuine care.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((item) => (
          <div
            key={item.title}
            className="group relative p-7 bg-[#fffefa] border border-[#e7e9df] hover:border-[#cadcbd] rounded-[22px] shadow-[0_10px_35px_rgba(39,62,48,0.05)] hover:shadow-[0_20px_45px_rgba(39,62,48,0.1)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="h-11 w-11 grid place-items-center rounded-2xl bg-[#f0f4ea] text-xl group-hover:scale-110 group-hover:bg-[#dce8d5] transition-all duration-300">
                  {item.icon}
                </div>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#f3f5ed] text-[#69836b] border border-[#e7e9df]">
                  {item.tag}
                </span>
              </div>
              <h3 className="font-serif text-xl font-medium text-[#243b32] group-hover:text-[#355b44] transition-colors">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm text-[#7b827a] leading-relaxed font-normal">
                {item.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#f3f5ed] flex items-center gap-1.5 text-xs font-semibold text-[#4b7355] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span>Learn more</span>
              <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
