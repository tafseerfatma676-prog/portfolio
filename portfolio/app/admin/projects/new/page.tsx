'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function NewProject() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '', shortDesc: '', longDesc: '', coverImage: '',
    techStack: '', liveUrl: '', githubUrl: '', featured: false, order: 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean),
        }),
      })
      if (res.ok) {
        toast.success('Project created!')
        router.push('/admin/projects')
      } else {
        const d = await res.json()
        toast.error(d.error || 'Failed to create project')
      }
    } catch {
      toast.error('Network error')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder-gray-700 focus:outline-none focus:border-brand-600/50 text-sm"

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-gray-600 hover:text-white text-sm">← Back</button>
        <h1 className="font-display text-2xl font-bold text-white">New Project</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Title *</label>
          <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
            placeholder="WhatsApp Lead Gen Bot" className={inputClass} required />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Short Description *</label>
          <input value={form.shortDesc} onChange={e => setForm(p => ({ ...p, shortDesc: e.target.value }))}
            placeholder="One-line description shown on cards" className={inputClass} required />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Long Description (case study)</label>
          <textarea value={form.longDesc} onChange={e => setForm(p => ({ ...p, longDesc: e.target.value }))}
            rows={6} placeholder="Full project details, problem, solution, results..." className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Cover Image URL</label>
          <input value={form.coverImage} onChange={e => setForm(p => ({ ...p, coverImage: e.target.value }))}
            placeholder="https://res.cloudinary.com/..." className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Tech Stack (comma-separated)</label>
          <input value={form.techStack} onChange={e => setForm(p => ({ ...p, techStack: e.target.value }))}
            placeholder="n8n, WhatsApp API, Airtable" className={inputClass} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Live URL</label>
            <input value={form.liveUrl} onChange={e => setForm(p => ({ ...p, liveUrl: e.target.value }))}
              placeholder="https://..." className={inputClass} />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">GitHub URL</label>
            <input value={form.githubUrl} onChange={e => setForm(p => ({ ...p, githubUrl: e.target.value }))}
              placeholder="https://github.com/..." className={inputClass} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" id="featured" checked={form.featured}
            onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))}
            className="rounded" />
          <label htmlFor="featured" className="text-sm text-gray-400">Mark as Featured</label>
        </div>
        <button type="submit" disabled={loading}
          className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-medium transition-all">
          {loading ? 'Creating...' : 'Create Project →'}
        </button>
      </form>
    </div>
  )
}
