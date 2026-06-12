import connectDB from '@/lib/mongodb'
import Project from '@/lib/models/Project'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = { title: 'Projects | Shamsheer Fatma — AI Automation' }

export default async function ProjectsPage() {
  await connectDB()
  const projects = await Project.find().sort({ order: 1, createdAt: -1 })

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-brand-400 text-sm font-medium mb-3 uppercase tracking-widest">Portfolio</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              All <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-gray-500">Real automations built for real businesses.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p: any) => (
              <Link key={p._id.toString()} href={`/projects/${p._id}`}
                className="group rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/10 transition-all card-hover">
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 relative">
                  {p.coverImage
                    ? <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                    : <div className="absolute inset-0 grid-bg opacity-50 flex items-center justify-center text-5xl opacity-20">🤖</div>
                  }
                  {p.featured && (
                    <span className="absolute top-3 left-3 text-xs px-2 py-0.5 rounded-full bg-accent-500/20 text-accent-400 border border-accent-500/30">Featured</span>
                  )}
                </div>
                <div className="p-5">
                  <h2 className="font-display font-bold text-white text-lg mb-2 group-hover:text-brand-300 transition-colors">{p.title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{p.shortDesc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.techStack.slice(0, 4).map((t: string) => (
                      <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-brand-600/10 text-brand-400 border border-brand-600/20">{t}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {projects.length === 0 && (
            <p className="text-gray-600 text-center py-24">Projects coming soon!</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
