import connectDB from '@/lib/mongodb'
import Contact from '@/lib/models/Contact'
import Link from 'next/link'

export default async function AdminContacts() {
  await connectDB()
  const contacts = await Contact.find().sort({ createdAt: -1 }).lean()

  const statusColor: Record<string, string> = {
    new:     'bg-rose-500/10 text-rose-400 border-rose-500/20',
    read:    'bg-amber-500/10 text-amber-400 border-amber-500/20',
    replied: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Leads & Inquiries</h1>
          <p className="text-gray-600 text-sm mt-1">{contacts.length} total submissions</p>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center py-24 text-gray-700">
          <p className="text-4xl mb-4">📭</p>
          <p>No inquiries yet. Share your site to start getting leads!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((c: any) => (
            <div key={c._id.toString()}
              className="p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white font-medium">{c.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColor[c.status]}`}>
                      {c.status}
                    </span>
                  </div>
                  <p className="text-brand-400 text-sm mb-1">{c.subject}</p>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{c.message}</p>
                </div>
                <div className="text-right text-xs text-gray-700 flex-shrink-0">
                  <a href={`mailto:${c.email}`} className="text-brand-400 hover:text-brand-300 block mb-1">
                    {c.email}
                  </a>
                  {new Date(c.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
