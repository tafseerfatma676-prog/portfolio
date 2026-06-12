'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Project {
  _id: string
  title: string
  shortDesc: string
  techStack: string[]
  coverImage: string
  liveUrl?: string
  featured: boolean
}

// Fallback sample projects for when DB is empty
const sampleProjects: Project[] = [
  {
    _id: '1',
    title: 'WhatsApp Lead Gen Bot',
    shortDesc: 'Automated WhatsApp bot that qualifies leads, collects info, and books discovery calls — all without human intervention.',
    techStack: ['n8n', 'WhatsApp API', 'Airtable', 'Google Calendar'],
    coverImage: '',
    featured: true,
  },
  {
    _id: '2',
    title: 'E-commerce Order Automation',
    shortDesc: 'End-to-end order processing pipeline: Shopify → invoice → shipping label → customer WhatsApp notification.',
    techStack: ['Make.com', 'Shopify', 'Google Sheets', 'Twilio'],
    coverImage: '',
    featured: true,
  },
  {
    _id: '3',
    title: 'AI Customer Support Agent',
    shortDesc: 'GPT-4 powered support agent trained on client docs, handling 80% of tickets automatically with human escalation.',
    techStack: ['ChatGPT API', 'Zendesk', 'Python', 'n8n'],
    coverImage: '',
    featured: false,
  },
  {
    _id: '4',
    title: 'LinkedIn Outreach Automation',
    shortDesc: 'Scrapes target audience, personalises connection requests and follow-ups using AI, delivering warm leads to CRM.',
    techStack: ['Python', 'OpenAI', 'Phantombuster', 'HubSpot'],
    coverImage: '',
    featured: false,
  },
]

const tagColors = [
  'bg-brand-600/10 text-brand-400 border-brand-600/20',
  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'bg-orange-500/10 text-orange-400 border-orange-500/20',
]

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects)
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setProjects(data)
      })
      .catch(() => {}) // keep sample data on error
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <p className="text-brand-400 text-sm font-medium mb-3 uppercase tracking-widest">Portfolio</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Real Automations,<br />
              <span className="gradient-text">Real Results</span>
            </h2>
          </div>
          <Link href="/projects" className="text-gray-500 hover:text-white text-sm transition-colors whitespace-nowrap">
            View all projects →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <div key={p._id}
              className="group relative rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/10 transition-all duration-300 card-hover">

              {/* Cover image / placeholder */}
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
                {p.coverImage ? (
                  <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-20">🤖</div>
                    {/* Decorative grid lines */}
                    <div className="absolute inset-0 grid-bg opacity-50" />
                    <div className={`absolute inset-0 bg-gradient-to-br opacity-10 ${
                      i % 2 === 0 ? 'from-brand-600 to-accent-500' : 'from-purple-600 to-pink-500'
                    }`} />
                  </div>
                )}
                {p.featured && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 text-xs rounded-full bg-accent-500/20 text-accent-400 border border-accent-500/30">
                    Featured
                  </span>
                )}
              </div>

              <div className="p-6">
                <h3 className="font-display font-bold text-white text-xl mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.shortDesc}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.techStack.map((t, ti) => (
                    <span key={t} className={`px-2 py-0.5 text-xs rounded-full border ${tagColors[ti % tagColors.length]}`}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-brand-400 hover:text-brand-300 transition-colors">
                      Live Demo ↗
                    </a>
                  )}
                  <Link href={`/projects/${p._id}`} className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                    Case Study →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
