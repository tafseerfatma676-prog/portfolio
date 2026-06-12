import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import connectDB from '@/lib/mongodb'
import Blog from '@/lib/models/Blog'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const id = params.id
    let blog = null
    try {
      blog = await Blog.findById(id)
    } catch {
      blog = await Blog.findOne({ slug: id })
    }
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(blog)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()
    const id = params.id
    const body = await req.json()
    if (body.content) {
      const wordCount = body.content.split(/\s+/).length
      body.readTime = Math.max(1, Math.ceil(wordCount / 200))
    }
    const blog = await Blog.findByIdAndUpdate(id, body, { new: true })
    return NextResponse.json(blog)
  } catch {
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()
    const id = params.id
    await Blog.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 })
  }
}
