'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import toast from 'react-hot-toast'

export default function EditBlog() {
  const router  = useRouter()
  const params  = useParams()
  const id      = params.id as string
  const [loading,  setLoading]  = useState(false)
  const [fetching, setFetching] = useState(true)
  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', coverImage: '', tags: '', published: false,
  })

  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then(r => r.json())
      .then(data => {
        setForm({
          title:       data.title      || '',
          excerpt:     data.excerpt    || '',
          content:     data.content    || '',
          coverImage:  data.coverImage || '',
          tags:        (data.tags      || []).join(', '),
          published:   data.published  || false,
        })
      })
      .catch(() => toast.error('Failed to load blog post'))
      .finally(() => setFetching(false))
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(',').map((t: string) => t.trim()).filter(Boolean),
        }),
      })
      if (res.ok) {
        toast.success('Post updated!')
        router.push('/admin/blog')
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
    if (!confirm('Delete this post? This cannot be undone.')) return
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Post deleted')
        router.push('/admin/blog')
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
          <h1 className="font-display text-2xl font-bold text-white">Edit Blog Post</h1>
        </div>
        <button onClick={handleDelete} className="px-4 py-2 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-sm transition-all">
          Delete
        </button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Title *</label>
          <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
            placeholder="How to Automate Your WhatsApp Business" className={inputClass} required />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Excerpt *</label>
          <textarea value={form.excerpt} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))}
            rows={2} placeholder="Short summary shown on blog cards..." className={inputClass} required />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Cover Image URL</label>
          <input value={form.coverImage} onChange={e => setForm(p => ({ ...p, coverImage: e.target.value }))}
            placeholder="https://..." className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Tags (comma-separated)</label>
          <input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
            placeholder="WhatsApp, n8n, Automation" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Content *</label>
          <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
            rows={20} placeholder="Full blog post content (HTML or plain text)..." className={`${inputClass} font-mono`} required />
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" id="published" checked={form.published}
            onChange={e => setForm(p => ({ ...p, published: e.target.checked }))} />
          <label htmlFor="published" className="text-sm text-gray-400">
            {form.published ? 'Published (uncheck to unpublish)' : 'Draft (check to publish)'}
          </label>
        </div>
        <button type="submit" disabled={loading}
          className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-medium transition-all">
          {loading ? 'Saving...' : 'Save Changes →'}
        </button>
      </form>
    </div>
  )
}
