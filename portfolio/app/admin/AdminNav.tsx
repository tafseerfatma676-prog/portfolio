'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const nav = [
  { href: '/admin',          label: 'Dashboard', icon: '📊' },
  { href: '/admin/contacts', label: 'Leads',     icon: '📬' },
  { href: '/admin/projects', label: 'Projects',  icon: '🛠'  },
  { href: '/admin/blog',     label: 'Blog',      icon: '✍️'  },
]

export default function AdminNav() {
  const path = usePathname()

  return (
    <nav className="flex flex-col gap-1 flex-1">
      {nav.map(n => (
        <Link key={n.href} href={n.href}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
            path === n.href
              ? 'bg-brand-600/20 text-brand-300 border border-brand-600/30'
              : 'text-gray-500 hover:text-white hover:bg-white/5'
          }`}>
          <span>{n.icon}</span> {n.label}
        </Link>
      ))}
      <div className="mt-auto pt-4 border-t border-white/5">
        <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-white">
          🌐 View Site
        </Link>
        <button onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-rose-400 transition-colors rounded-lg text-left">
          🚪 Sign Out
        </button>
      </div>
    </nav>
  )
}
