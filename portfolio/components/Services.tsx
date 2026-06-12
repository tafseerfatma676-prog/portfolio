const services = [
  {
    icon: '⚡',
    title: 'Workflow Automation',
    desc: 'I map your manual processes and rebuild them as automated systems using n8n, Make.com, or Zapier — saving you 20–40 hours every month.',
    tags: ['n8n', 'Make.com', 'Zapier'],
    price: 'From ₹15,000',
  },
  {
    icon: '🤖',
    title: 'AI Chatbot & Assistants',
    desc: 'Custom GPT-powered chatbots for your website, WhatsApp, or Telegram that answer FAQs, qualify leads, and book appointments 24/7.',
    tags: ['ChatGPT API', 'WhatsApp', 'Telegram'],
    price: 'From ₹20,000',
  },
  {
    icon: '🎯',
    title: 'Lead Generation Automation',
    desc: 'Automated pipelines that find prospects, send personalised outreach, follow up, and deliver warm leads directly into your CRM.',
    tags: ['LinkedIn', 'Email', 'Airtable'],
    price: 'From ₹18,000',
  },
  {
    icon: '🔗',
    title: 'API & App Integration',
    desc: 'Connect any two apps that don\'t talk to each other. Sync data, trigger actions, and keep your entire tech stack in perfect harmony.',
    tags: ['REST API', 'Webhooks', 'JSON'],
    price: 'From ₹10,000',
  },
  {
    icon: '📊',
    title: 'Business Intelligence Dashboards',
    desc: 'Turn raw data from your tools into live dashboards that give you instant clarity on sales, operations, and team performance.',
    tags: ['Airtable', 'Notion', 'Google Sheets'],
    price: 'From ₹12,000',
  },
  {
    icon: '🧠',
    title: 'AI Strategy Consulting',
    desc: '1-on-1 sessions to audit your business, identify automation opportunities, and build a roadmap to save time and cut costs with AI.',
    tags: ['Consulting', 'Audit', 'Roadmap'],
    price: '₹2,500 / hour',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 relative">
      {/* BG accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-900/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-brand-400 text-sm font-medium mb-3 uppercase tracking-widest">What I Do</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Services Designed to<br />
            <span className="gradient-text">Scale Your Business</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Every service is hands-on, results-driven, and built around your specific business needs.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i}
              className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-brand-600/30 transition-all duration-300 card-hover">
              {/* Top glow on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />

              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="font-display font-semibold text-white text-lg mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {s.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-brand-600/10 text-brand-400 border border-brand-600/20">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-accent-400 font-medium text-sm">{s.price}</span>
                <a href="#contact" className="text-xs text-gray-600 hover:text-brand-400 transition-colors">
                  Enquire →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="mt-16 p-8 rounded-2xl border border-brand-600/20 bg-brand-600/5 text-center">
          <h3 className="font-display text-2xl font-bold text-white mb-2">Not sure which service you need?</h3>
          <p className="text-gray-500 mb-6">Book a free 30-minute discovery call — I'll tell you exactly what to automate first.</p>
          <a href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium transition-all hover:scale-105">
            Book Free Call →
          </a>
        </div>
      </div>
    </section>
  )
}
