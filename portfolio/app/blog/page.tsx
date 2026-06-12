import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import Blog from '@/lib/models/Blog'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = { title: 'Blog | Shamsheer Fatma — AI Automation' }

export default async function BlogPage() {
  await connectDB()
  const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 }).select('-content')

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-brand-400 text-sm font-medium mb-3 uppercase tracking-widest">Blog</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              AI & Automation <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-gray-500">Practical guides, case studies, and tips for automating your business.</p>
          </div>

          {blogs.length === 0 ? (
            <p className="text-gray-600 text-center py-24">No posts yet — check back soon!</p>
          ) : (
            <div className="space-y-6">
              {blogs.map((b: any) => (
                <Link key={b._id.toString()} href={`/blog/${b._id}`}
                  className="group flex gap-6 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all">
                  {b.coverImage && (
                    <img src={b.coverImage} alt={b.title} className="w-32 h-24 object-cover rounded-xl flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {b.tags?.slice(0, 3).map((t: string) => (
                        <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-brand-600/10 text-brand-400 border border-brand-600/20">{t}</span>
                      ))}
                    </div>
                    <h2 className="font-display font-bold text-white text-xl mb-2 group-hover:text-brand-300 transition-colors">{b.title}</h2>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3">{b.excerpt}</p>
                    <p className="text-xs text-gray-700">
                      {new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      {' · '}{b.readTime} min read
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
