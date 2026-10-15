const features = [
  { title: 'Connected tracking', description: 'See how mood, sleep and stress affect each other, not just a mood log on its own.' },
  { title: 'Daily check-in', description: 'A quick form for sleep, mood and stress, plus a one-time setup so insights fit you.' },
  { title: 'Pattern dashboard', description: 'Graphs of your mood, sleep and stress over time to spot warning signs early.' },
  { title: 'Private journal', description: 'A safe place to write, with optional mood tags.' },
  { title: 'Mood-based picks', description: 'Calming or uplifting music, books and movies based on how you feel.' },
  { title: 'Helpline directory', description: 'Campus counselors and crisis helplines, always easy to find.' },
  { title: 'Habit nudges', description: 'Gentle reminders and streaks for sleep, water and breaks.' },
  { title: 'Peer support forum', description: 'An anonymous space to share and support each other, with basic safety moderation.' },
]

export default function Features() {
  return (
    <section id="features" className="max-w-6xl px-4 py-16 mx-auto sm:px-6">
      <h2 className="mb-10 text-2xl font-bold text-center text-slate-900 sm:text-3xl">
        Features
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((item) => (
          <div key={item.title} className="p-6 bg-white border border-blue-100 rounded-xl">
            <h3 className="mb-2 text-lg font-semibold text-slate-800">{item.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
