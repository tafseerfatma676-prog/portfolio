import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Contact from '@/lib/models/Contact'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    await connectDB()
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Save lead to MongoDB
    await Contact.create({ name, email, subject, message })

    // Email notification to you
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to:   process.env.RESEND_TO!,
      subject: `🚀 New inquiry: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #4f46e5; margin-bottom: 4px;">New Contact Form Submission</h2>
          <p style="color: #6b7280; margin-top: 0;">From shamsheerfatma.tech</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb;" />
          <table style="width: 100%; margin-top: 16px;">
            <tr><td style="color: #6b7280; padding: 6px 0; width: 100px;">Name</td><td style="font-weight: 500;">${name}</td></tr>
            <tr><td style="color: #6b7280; padding: 6px 0;">Email</td><td><a href="mailto:${email}" style="color: #4f46e5;">${email}</a></td></tr>
            <tr><td style="color: #6b7280; padding: 6px 0;">Subject</td><td style="font-weight: 500;">${subject}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 6px;">
            <p style="margin: 0; color: #374151; line-height: 1.6;">${message}</p>
          </div>
          <p style="margin-top: 24px; color: #9ca3af; font-size: 13px;">Reply directly to this email to respond to ${name}.</p>
        </div>
      `,
      replyTo: email,
    })

    // Auto-reply to sender
    await resend.emails.send({
      from:    process.env.RESEND_FROM!,
      to:      email,
      subject: `Thanks for reaching out, ${name}! 👋`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px;">
          <h2 style="color: #4f46e5;">Hi ${name}, I got your message!</h2>
          <p style="color: #374151; line-height: 1.6;">Thank you for reaching out. I've received your message and will get back to you within 24 hours.</p>
          <p style="color: #374151; line-height: 1.6;">Here's a copy of what you sent:</p>
          <blockquote style="border-left: 3px solid #4f46e5; margin: 16px 0; padding: 12px 16px; background: #f9fafb; color: #6b7280;">${message}</blockquote>
          <p style="color: #374151;">Talk soon,<br /><strong>Shamsheer Fatma</strong><br />AI Automation Specialist</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true, message: 'Message sent successfully!' })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}

// GET all contacts (admin only — protect this in production with middleware)
export async function GET() {
  try {
    await connectDB()
    const contacts = await Contact.find().sort({ createdAt: -1 })
    return NextResponse.json(contacts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}
