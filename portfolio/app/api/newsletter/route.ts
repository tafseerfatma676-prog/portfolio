import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Subscriber from '@/lib/models/Subscriber'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    await connectDB()
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const exists = await Subscriber.findOne({ email })
    if (exists) {
      return NextResponse.json({ error: 'Already subscribed!' }, { status: 400 })
    }

    await Subscriber.create({ email })

    // Welcome email
    await resend.emails.send({
      from:    process.env.RESEND_FROM!,
      to:      email,
      subject: '🎉 You\'re subscribed to Shamsheer\'s AI Newsletter!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px;">
          <div style="background: white; border-radius: 8px; padding: 32px;">
            <h1 style="color: #4f46e5; margin-top: 0;">Welcome aboard! 🚀</h1>
            <p style="color: #374151; line-height: 1.7;">You're now subscribed to insights on <strong>AI automation, no-code tools, and business workflows</strong>.</p>
            <p style="color: #374151; line-height: 1.7;">I'll share tips, case studies, and tutorials to help you automate your business using AI — straight to your inbox.</p>
            <p style="color: #374151;">See you soon,<br /><strong>Shamsheer Fatma</strong></p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true, message: 'Subscribed successfully!' })
  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDB()
    const subscribers = await Subscriber.find({ active: true }).sort({ createdAt: -1 })
    return NextResponse.json({ count: subscribers.length, subscribers })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 })
  }
}
