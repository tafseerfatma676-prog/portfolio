import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import connectDB from '@/lib/mongodb'
import Blog from '@/lib/models/Blog'

// GET all published blogs (public)
export async function GET(req: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const all = searchParams.get('all') // admin flag to get drafts too

    const filter = all ? {} : { published: true }
    const blogs = await Blog.find(filter).sort({ createdAt: -1 }).select('-content') // exclude heavy content from list
    return NextResponse.json(blogs)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  }
}

// POST create blog (admin only)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()
    const body = await req.json()

    if (!body.slug) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }

    // Auto-calc read time (~200 words per minute)
    const wordCount = body.content?.split(/\s+/).length || 0
    body.readTime = Math.max(1, Math.ceil(wordCount / 200))

    const blog = await Blog.create(body)
    return NextResponse.json(blog, { status: 201 })
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}
