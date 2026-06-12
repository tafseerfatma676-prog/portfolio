'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'

const subjects = [
  'Workflow Automation',
  'AI Chatbot / Assistant',
  'Lead Generation',
  'API Integration',
  'Strategy Consulting',
  'Other',
]

export default function Contact() {
  const [form,     setForm]     = useState({ name: '', email: '', subject: '', message: '' })
  const [loading,  setLoading]  = useState(false)
  const [subEmail, setSubEmail] = useState('')
  const [subLoading, setSubLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Please fill in all fields')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success('Message sent! I\'ll reply within 24 hours 🚀')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        toast.error(data.error || 'Something went wrong')
      }
    } catch {
      toast.error('Network error — please try again')
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subEmail) return
    setSubLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: subEmail }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success('Subscribed! Welcome to the newsletter 🎉')
        setSubEmail('')
      } else {
        toast.error(data.error || 'Subscription failed')
      }
    } catch {
      toast.error('Network error — please try again')
    } finally {
      setSubLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-900/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <p className="text-brand-400 text-sm font-medium mb-3 uppercase tracking-widest">Contact</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Automate Your<br />
            <span className="gradient-text">Business?</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Tell me what you're working on. I'll respond within 24 hours with ideas and a plan.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left — form */}
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1.5">Your name</label>
                  <input
                    name="name" value={form.name} onChange={handleChange}
                    placeholder="Rahul Sharma"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder-gray-700 focus:outline-none focus:border-brand-600/50 focus:bg-white/[0.05] transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1.5">Email address</label>
                  <input
                    name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="rahul@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder-gray-700 focus:outline-none focus:border-brand-600/50 focus:bg-white/[0.05] transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1.5">What do you need?</label>
                <select
                  name="subject" value={form.subject} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-gray-900 text-white focus:outline-none focus:border-brand-600/50 transition-all text-sm">
                  <option value="">Select a service...</option>
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1.5">Tell me about your project</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange} rows={5}
                  placeholder="Describe your current process, what you want automated, and your timeline..."
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder-gray-700 focus:outline-none focus:border-brand-600/50 focus:bg-white/[0.05] transition-all text-sm resize-none"
                />
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-all hover:scale-[1.02] active:scale-[0.98]">
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          </div>

          {/* Right — info + newsletter */}
          <div className="md:col-span-2 space-y-6">
            {/* Contact info */}
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] space-y-4">
              <h3 className="font-display font-semibold text-white">Get in touch directly</h3>
              {[
                { icon: '📧', label: 'Email', value: 'hello@shamsheerfatma.tech', href: 'mailto:hello@shamsheerfatma.tech' },
                { icon: '💬', label: 'WhatsApp', value: '+91 XXXXX XXXXX', href: 'https://wa.me/91XXXXXXXXXX' },
                { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/shamsheerfatma', href: 'https://linkedin.com' },
              ].map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-500 hover:text-white transition-colors group">
                  <span className="text-xl">{c.icon}</span>
                  <div>
                    <p className="text-xs text-gray-700">{c.label}</p>
                    <p className="group-hover:text-brand-400 transition-colors">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="p-6 rounded-2xl border border-brand-600/20 bg-brand-600/5">
              <h3 className="font-display font-semibold text-white mb-1">Get AI tips in your inbox</h3>
              <p className="text-gray-600 text-sm mb-4">Weekly automation ideas, tools, and case studies. No spam.</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email" value={subEmail} onChange={e => setSubEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.05] text-white placeholder-gray-700 focus:outline-none focus:border-brand-600/50 text-sm"
                />
                <button
                  type="submit" disabled={subLoading}
                  className="px-4 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium transition-all disabled:opacity-50">
                  {subLoading ? '...' : 'Join'}
                </button>
              </form>
            </div>

            {/* Response time */}
            <div className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-400 animate-pulse flex-shrink-0" />
              <p className="text-sm text-gray-500">Typically responds within <span className="text-white">24 hours</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
