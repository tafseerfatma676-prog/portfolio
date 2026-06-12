import mongoose, { Schema, Document, models } from 'mongoose'

export interface IBlog extends Document {
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  tags: string[]
  published: boolean
  readTime: number
  createdAt: Date
}

const BlogSchema = new Schema<IBlog>(
  {
    title:      { type: String, required: true, trim: true },
    slug:       { type: String, required: true, unique: true, lowercase: true },
    excerpt:    { type: String, required: true },
    content:    { type: String, required: true },
    coverImage: { type: String, required: true },
    tags:       [{ type: String }],
    published:  { type: Boolean, default: false },
    readTime:   { type: Number, default: 5 },
  },
  { timestamps: true }
)

export default models.Blog || mongoose.model<IBlog>('Blog', BlogSchema)
