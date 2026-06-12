'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function NewBlogPost() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', coverImage: '',
    tags: '', published: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        }),
      })
      if (res.ok) {
        toast.success('Blog post created!')
        router.push('/admin/blog')
      } else {
        const d = await res.json()
        toast.error(d.error || 'Failed to create post')
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
        <h1 className="font-display text-2xl font-bold text-white">New Blog Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Title *</label>
          <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
            placeholder="How to Automate Your WhatsApp Business in 2025" className={inputClass} required />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Excerpt (shown on blog cards) *</label>
          <textarea value={form.excerpt} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))}
            rows={2} placeholder="A short summary of the post..." className={inputClass} required />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Cover Image URL</label>
          <input value={form.coverImage} onChange={e => setForm(p => ({ ...p, coverImage: e.target.value }))}
            placeholder="https://res.cloudinary.com/..." className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Tags (comma-separated)</label>
          <input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
            placeholder="WhatsApp, n8n, Automation" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Content *</label>
          <p className="text-gray-700 text-xs mb-2">Write in plain HTML or Markdown. Read time is auto-calculated.</p>
          <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
            rows={20} placeholder="Write your full blog post here..." className={`${inputClass} font-mono`} required />
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" id="published" checked={form.published}
            onChange={e => setForm(p => ({ ...p, published: e.target.checked }))} className="rounded" />
          <label htmlFor="published" className="text-sm text-gray-400">Publish immediately (uncheck to save as draft)</label>
        </div>
        <button type="submit" disabled={loading}
          className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-medium transition-all">
          {loading ? 'Saving...' : form.published ? 'Publish Post →' : 'Save as Draft'}
        </button>
      </form>
    </div>
  )
}
