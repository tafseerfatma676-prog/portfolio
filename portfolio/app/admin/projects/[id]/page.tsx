'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import toast from 'react-hot-toast'

export default function EditProject() {
  const router  = useRouter()
  const params  = useParams()
  const id      = params.id as string
  const [loading,  setLoading]  = useState(false)
  const [fetching, setFetching] = useState(true)
  const [form, setForm] = useState({
    title: '', shortDesc: '', longDesc: '', coverImage: '',
    techStack: '', liveUrl: '', githubUrl: '', featured: false, order: 0,
  })

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then(r => r.json())
      .then(data => {
        setForm({
          title:      data.title      || '',
          shortDesc:  data.shortDesc  || '',
          longDesc:   data.longDesc   || '',
          coverImage: data.coverImage || '',
          techStack:  (data.techStack || []).join(', '),
          liveUrl:    data.liveUrl    || '',
          githubUrl:  data.githubUrl  || '',
          featured:   data.featured   || false,
          order:      data.order      || 0,
        })
      })
      .catch(() => toast.error('Failed to load project'))
      .finally(() => setFetching(false))
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          techStack: form.techStack.split(',').map((t: string) => t.trim()).filter(Boolean),
        }),
      })
      if (res.ok) {
        toast.success('Project updated!')
        router.push('/admin/projects')
      } else {
        const d = await res.json()
        toast.error(d.error || 'Failed to update')
      }
    } catch {
      toast.error('Network error')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Delete this project? This cannot be undone.')) return
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Project deleted')
        router.push('/admin/projects')
      }
    } catch {
      toast.error('Delete failed')
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder-gray-700 focus:outline-none focus:border-brand-600/50 text-sm"

  if (fetching) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-6 h-6 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-gray-600 hover:text-white text-sm">← Back</button>
          <h1 className="font-display text-2xl font-bold text-white">Edit Project</h1>
        </div>
        <button onClick={handleDelete} className="px-4 py-2 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-sm transition-all">
          Delete
        </button>
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
            placeholder="One-line description" className={inputClass} required />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Long Description</label>
          <textarea value={form.longDesc} onChange={e => setForm(p => ({ ...p, longDesc: e.target.value }))}
            rows={6} placeholder="Full project details..." className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Cover Image URL</label>
          <input value={form.coverImage} onChange={e => setForm(p => ({ ...p, coverImage: e.target.value }))}
            placeholder="https://..." className={inputClass} />
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
            onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} />
          <label htmlFor="featured" className="text-sm text-gray-400">Mark as Featured</label>
        </div>
        <button type="submit" disabled={loading}
          className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-medium transition-all">
          {loading ? 'Saving...' : 'Save Changes →'}
        </button>
      </form>
    </div>
  )
}
