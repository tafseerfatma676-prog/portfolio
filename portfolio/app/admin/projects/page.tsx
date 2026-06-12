import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import Project from '@/lib/models/Project'

export default async function AdminProjects() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  await connectDB()
  const projects = await Project.find().sort({ order: 1, createdAt: -1 })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-600 text-sm mt-1">{projects.length} projects</p>
        </div>
        <Link href="/admin/projects/new"
          className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium transition-all">
          + Add Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-24 text-gray-700">
          <p className="text-4xl mb-4">🛠</p>
          <p>No projects yet. <Link href="/admin/projects/new" className="text-brand-400">Add your first one →</Link></p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((p: any) => (
            <div key={p._id.toString()} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-medium">{p.title}</h3>
                  {p.featured && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent-500/10 text-accent-400 border border-accent-500/20">Featured</span>
                  )}
                </div>
                <div className="flex gap-1.5 mt-1">
                  {p.techStack.slice(0, 3).map((t: string) => (
                    <span key={t} className="text-xs text-gray-600">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/projects/${p._id}`}
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white text-xs transition-all">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
