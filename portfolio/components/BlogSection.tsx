'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Blog {
  _id: string
  title: string
  excerpt: string
  tags: string[]
  readTime: number
  coverImage: string
  createdAt: string
}

const sampleBlogs: Blog[] = [
  {
    _id: '1',
    title: 'How to Automate Your WhatsApp Business in 2025',
    excerpt: 'A step-by-step guide to setting up a WhatsApp automation that handles enquiries, sends catalogues, and books appointments — without touching your phone.',
    tags: ['WhatsApp', 'n8n', 'Automation'],
    readTime: 6,
    coverImage: '',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: '5 AI Tools Every Indian Entrepreneur Should Be Using',
    excerpt: 'From writing product descriptions to automating customer support, here are the tools saving Indian founders 30+ hours per month right now.',
    tags: ['AI Tools', 'Productivity', 'India'],
    readTime: 4,
    coverImage: '',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '3',
    title: 'n8n vs Make.com: Which Automation Tool is Right for You?',
    excerpt: 'A practical comparison of both platforms with real use cases, pricing, and my personal recommendation based on 50+ client projects.',
    tags: ['n8n', 'Make.com', 'Comparison'],
    readTime: 8,
    coverImage: '',
    createdAt: new Date().toISOString(),
  },
]

export default function BlogSection() {
  const [blogs,   setBlogs]   = useState<Blog[]>(sampleBlogs)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blog')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setBlogs(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <section id="blog" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <p className="text-brand-400 text-sm font-medium mb-3 uppercase tracking-widest">Blog</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Insights on AI &<br />
              <span className="gradient-text">Automation</span>
            </h2>
          </div>
          <Link href="/blog" className="text-gray-500 hover:text-white text-sm transition-colors whitespace-nowrap">
            Read all posts →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((b, i) => (
            <Link key={b._id} href={`/blog/${b._id}`}
              className="group rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/10 transition-all card-hover">

              {/* Cover */}
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
                {b.coverImage ? (
                  <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 grid-bg opacity-50">
                    <div className={`absolute inset-0 bg-gradient-to-br opacity-20 ${
                      ['from-brand-600 to-purple-600','from-teal-600 to-brand-600','from-pink-600 to-orange-500'][i % 3]
                    }`} />
                  </div>
                )}
              </div>

              <div className="p-5">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {b.tags.slice(0, 2).map(t => (
                    <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-brand-600/10 text-brand-400 border border-brand-600/20">
                      {t}
                    </span>
                  ))}
                </div>

                <h3 className="font-display font-bold text-white text-base leading-snug mb-2 group-hover:text-brand-300 transition-colors">
                  {b.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">{b.excerpt}</p>

                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span>{formatDate(b.createdAt)}</span>
                  <span>·</span>
                  <span>{b.readTime} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
