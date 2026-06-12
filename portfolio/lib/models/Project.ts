import mongoose, { Schema, Document, models } from 'mongoose'

export interface IProject extends Document {
  title: string
  slug: string
  shortDesc: string
  longDesc: string
  techStack: string[]
  coverImage: string
  images: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  order: number
  createdAt: Date
}

const ProjectSchema = new Schema<IProject>(
  {
    title:      { type: String, required: true, trim: true },
    slug:       { type: String, required: true, unique: true, lowercase: true },
    shortDesc:  { type: String, required: true },
    longDesc:   { type: String, required: true },
    techStack:  [{ type: String }],
    coverImage: { type: String, required: true },
    images:     [{ type: String }],
    liveUrl:    { type: String },
    githubUrl:  { type: String },
    featured:   { type: Boolean, default: false },
    order:      { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default models.Project || mongoose.model<IProject>('Project', ProjectSchema)
