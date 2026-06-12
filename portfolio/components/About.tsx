const timeline = [
  { year: '2022', event: 'Started learning AI tools & automation' },
  { year: '2023', event: 'Built first client workflow — saved 20hrs/week' },
  { year: '2024', event: 'Scaled to 10+ clients across 5 industries' },
  { year: '2025', event: 'Launched shamsheerfatma.tech — full AI consultancy' },
]

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left — image + decoration */}
          <div className="relative">
            <div className="relative w-full max-w-sm mx-auto">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-600/30 to-accent-500/20 blur-2xl scale-105" />
              {/* Avatar placeholder — replace with real photo */}
              <div className="relative rounded-2xl border border-white/10 bg-gray-900 aspect-square flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-600 to-accent-500 flex items-center justify-center text-4xl font-display font-bold mx-auto mb-4">
                    SF
                  </div>
                  <p className="text-gray-500 text-sm">Add your photo here</p>
                  <p className="text-gray-600 text-xs mt-1">Replace this div with an &lt;Image /&gt; tag</p>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-gray-900 border border-white/10 rounded-xl px-4 py-3 glow-green">
                <p className="text-accent-400 font-bold text-lg">50+</p>
                <p className="text-gray-500 text-xs">Automations built</p>
              </div>
            </div>
          </div>

          {/* Right — text */}
          <div>
            <p className="text-brand-400 text-sm font-medium mb-3 uppercase tracking-widest">About Me</p>
            <h2 className="font-display text-4xl font-bold text-white mb-6">
              Turning Manual Work into<br />
              <span className="gradient-text">Automated Systems</span>
            </h2>

            <p className="text-gray-400 leading-relaxed mb-4">
              Hi, I'm <strong className="text-white">Shamsheer Fatma</strong> — an AI Automation Specialist
              based in India. I partner with entrepreneurs, startups, and growing businesses to replace
              time-draining manual tasks with intelligent, always-on workflows.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Whether it's automating your lead generation, connecting your apps, building a custom
              ChatGPT-powered assistant, or designing an end-to-end business pipeline — I turn your
              biggest bottlenecks into your biggest competitive advantages.
            </p>

            {/* Timeline */}
            <div className="space-y-4">
              {timeline.map((t, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 text-right">
                    <span className="text-brand-400 text-sm font-mono font-medium">{t.year}</span>
                  </div>
                  <div className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-brand-500" />
                  <p className="text-gray-400 text-sm leading-relaxed">{t.event}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <a href="/resume.pdf" target="_blank"
                className="px-5 py-2.5 rounded-lg border border-white/10 hover:border-white/20 text-white text-sm transition-all hover:bg-white/5">
                Download Resume
              </a>
              <a href="#contact"
                className="px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium transition-all">
                Work With Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
