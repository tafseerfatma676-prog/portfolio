const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Founder, TechStartup India',
    avatar: 'RS',
    color: 'from-blue-600 to-indigo-600',
    text: "Shamsheer automated our entire onboarding process. What used to take our team 3 hours per client now happens in 10 minutes — completely hands-free. The ROI paid for itself in the first week.",
    result: '18 hrs/week saved',
  },
  {
    name: 'Priya Mehta',
    role: 'E-commerce Store Owner',
    avatar: 'PM',
    color: 'from-pink-600 to-rose-600',
    text: "My Shopify store notifications, invoices, and follow-ups are all automated now. I get more 5-star reviews than ever because customers are hearing from me instantly — and I'm not doing anything manually.",
    result: '40% more reviews',
  },
  {
    name: 'Arjun Nair',
    role: 'Digital Marketing Agency',
    avatar: 'AN',
    color: 'from-emerald-600 to-teal-600',
    text: "The lead gen bot Shamsheer built for our agency books 3–5 discovery calls per week on autopilot. It's like having a salesperson who never sleeps. Absolutely game-changing for our pipeline.",
    result: '5x more qualified leads',
  },
  {
    name: 'Sana Khan',
    role: 'Consultant & Coach',
    avatar: 'SK',
    color: 'from-amber-600 to-orange-600',
    text: "As a solopreneur, I was drowning in admin. Now my CRM, emails, and calendar are all connected and automated. I focus purely on coaching and the backend runs itself.",
    result: '100% focus on coaching',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-brand-400 text-sm font-medium mb-3 uppercase tracking-widest">Testimonials</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">Real results from real businesses that trusted me with their automation.</p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div key={i}
              className="relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all">
              {/* Quote mark */}
              <div className="absolute top-4 right-6 text-6xl text-brand-600/10 font-serif leading-none">"</div>

              <p className="text-gray-400 leading-relaxed mb-6 relative z-10">"{t.text}"</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-xs font-bold text-white`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{t.name}</p>
                    <p className="text-gray-600 text-xs">{t.role}</p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-accent-500/10 text-accent-400 border border-accent-500/20">
                  {t.result}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
