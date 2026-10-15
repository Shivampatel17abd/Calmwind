export default function Hero() {
  return (
    <section id="home" className="px-4 py-16 text-center sm:py-24">
      <div className="max-w-2xl mx-auto">
        <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-amber-900 bg-amber-100 rounded-full">
          Student Mental Wellbeing
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Take a moment for yourself
        </h1>
        <p className="mt-4 text-base text-slate-600 sm:text-lg">
          CalmWind helps students understand their mood, sleep and stress, and connects them to real help when they need it.
        </p>
        <div className="mt-8">
          <button className="px-6 py-3 font-medium text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600">
            Start your check-in
          </button>
        </div>
      </div>
    </section>
  )
}
