import { notFound } from 'next/navigation'
import connectDB from '@/lib/mongodb'
import Blog from '@/lib/models/Blog'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  await connectDB()

  let blog = null
  try {
    blog = await Blog.findById(slug)
  } catch {
    blog = await Blog.findOne({ slug })
  }

  if (!blog || !blog.published) notFound()

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-6">
          <Link href="/blog" className="text-gray-600 hover:text-white text-sm mb-8 inline-block">
            ← All posts
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags?.map((t: string) => (
              <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-brand-600/10 text-brand-400 border border-brand-600/20">{t}</span>
            ))}
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-8 pb-8 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center text-xs font-bold text-white">SF</div>
              <span>Shamsheer Fatma</span>
            </div>
            <span>·</span>
            <span>{new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span>·</span>
            <span>{blog.readTime} min read</span>
          </div>

          {blog.coverImage && (
            <img src={blog.coverImage} alt={blog.title} className="w-full rounded-2xl mb-8 aspect-video object-cover" />
          )}

          <div
            className="prose-dark max-w-none text-gray-400 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className="mt-16 p-8 rounded-2xl border border-brand-600/20 bg-brand-600/5 text-center">
            <h3 className="font-display text-xl font-bold text-white mb-2">Want to automate your business?</h3>
            <p className="text-gray-500 mb-4">Let's build something together.</p>
            <Link href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium transition-all">
              Get in Touch →
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
