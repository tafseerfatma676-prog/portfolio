import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import Blog from '@/lib/models/Blog'

export default async function AdminBlog() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  await connectDB()
  const blogs = await Blog.find().sort({ createdAt: -1 })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-gray-600 text-sm mt-1">{blogs.length} posts</p>
        </div>
        <Link href="/admin/blog/new"
          className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium transition-all">
          + Write Post
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-24 text-gray-700">
          <p className="text-4xl mb-4">✍️</p>
          <p>No blog posts yet. <Link href="/admin/blog/new" className="text-brand-400">Write your first post →</Link></p>
        </div>
      ) : (
        <div className="space-y-3">
          {blogs.map((b: any) => (
            <div key={b._id.toString()} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-medium">{b.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${
                    b.published
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-gray-500/10 text-gray-500 border-gray-500/20'
                  }`}>
                    {b.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-gray-600 text-xs mt-1">{b.readTime} min read · {new Date(b.createdAt).toLocaleDateString('en-IN')}</p>
              </div>
              <Link href={`/admin/blog/${b._id}`}
                className="px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white text-xs transition-all">
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
