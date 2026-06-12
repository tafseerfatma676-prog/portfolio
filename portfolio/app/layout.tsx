import type { Metadata } from 'next'
import { Inter, Syne } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const syne  = Syne({ subsets: ['latin'], variable: '--font-syne', weight: ['400','600','700','800'] })

export const metadata: Metadata = {
  title: 'Shamsheer Fatma | AI Automation Specialist',
  description: 'I help businesses automate workflows, save time, and scale revenue using cutting-edge AI tools and no-code automation.',
  keywords: ['AI automation', 'no-code', 'workflow automation', 'n8n', 'Make.com', 'ChatGPT', 'AI consultant'],
  authors: [{ name: 'Shamsheer Fatma' }],
  openGraph: {
    title: 'Shamsheer Fatma | AI Automation Specialist',
    description: 'Automate your business with AI. Save hours, scale faster.',
    url: 'https://shamsheerfatma.tech',
    siteName: 'Shamsheer Fatma',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shamsheer Fatma | AI Automation Specialist',
    description: 'Automate your business with AI. Save hours, scale faster.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="bg-gray-950 text-white antialiased">
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#1f2937', color: '#f9fafb', border: '1px solid #374151' },
            success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
            error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />
        {children}
      </body>
    </html>
  )
}
