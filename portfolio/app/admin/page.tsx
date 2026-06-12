import connectDB from '@/lib/mongodb'
import Contact    from '@/lib/models/Contact'
import Project    from '@/lib/models/Project'
import Blog       from '@/lib/models/Blog'
import Subscriber from '@/lib/models/Subscriber'
import Link       from 'next/link'

export default async function AdminDashboard() {
  await connectDB()
  const [contacts, projects, blogs, subscribers] = await Promise.all([
    Contact.countDocuments(),
    Project.countDocuments(),
    Blog.countDocuments(),
    Subscriber.countDocuments({ active: true }),
  ])
  const newLeads = await Contact.countDocuments({ status: 'new' })

  const stats = [
    { label: 'New Leads',   value: newLeads,    icon: '🔥', href: '/admin/contacts', color: 'border-rose-500/20 bg-rose-500/5'     },
    { label: 'Total Leads', value: contacts,    icon: '📬', href: '/admin/contacts', color: 'border-brand-600/20 bg-brand-600/5'   },
    { label: 'Projects',    value: projects,    icon: '🛠',  href: '/admin/projects', color: 'border-purple-500/20 bg-purple-500/5' },
    { label: 'Blog Posts',  value: blogs,       icon: '✍️',  href: '/admin/blog',     color: 'border-amber-500/20 bg-amber-500/5'   },
    { label: 'Subscribers', value: subscribers, icon: '📧', href: '#',               color: 'border-emerald-500/20 bg-emerald-500/5'},
  ]

  const recentContacts = await Contact.find().sort({ createdAt: -1 }).limit(5).lean()

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-600 text-sm mt-1">Welcome back, Shamsheer 👋</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {stats.map(s => (
          <Link key={s.label} href={s.href}
            className={`p-4 rounded-xl border ${s.color} hover:brightness-110 transition-all`}>
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="font-display text-2xl font-bold text-white">{s.value}</div>
            <div className="text-gray-600 text-xs mt-0.5">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-display font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Add Project', href: '/admin/projects/new', icon: '➕' },
              { label: 'Write Blog',  href: '/admin/blog/new',     icon: '✍️' },
              { label: 'View Leads',  href: '/admin/contacts',     icon: '👥' },
              { label: 'Go to Site',  href: '/',                   icon: '🌐' },
            ].map(a => (
              <Link key={a.label} href={a.href}
                className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all text-sm text-gray-400 hover:text-white">
                <span>{a.icon}</span> {a.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display font-semibold text-white mb-4">Recent Inquiries</h2>
          <div className="space-y-2">
            {recentContacts.length === 0 && (
              <p className="text-gray-700 text-sm p-4 rounded-xl border border-white/5">No inquiries yet.</p>
            )}
            {recentContacts.map((c: any) => (
              <div key={c._id.toString()}
                className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                <div>
                  <p className="text-white text-sm font-medium">{c.name}</p>
                  <p className="text-gray-600 text-xs">{c.subject}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  c.status === 'new'     ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  : c.status === 'read' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
