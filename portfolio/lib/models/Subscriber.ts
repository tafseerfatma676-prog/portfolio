import mongoose, { Schema, Document, models } from 'mongoose'

export interface ISubscriber extends Document {
  email: string
  active: boolean
  subscribedAt: Date
}

const SubscriberSchema = new Schema<ISubscriber>(
  {
    email:  { type: String, required: true, unique: true, lowercase: true, trim: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default models.Subscriber || mongoose.model<ISubscriber>('Subscriber', SubscriberSchema)
