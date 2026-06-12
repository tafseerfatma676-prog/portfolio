import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AdminNav from './AdminNav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <aside className="w-56 border-r border-white/5 p-4 flex flex-col">
        <Link href="/admin" className="flex items-center gap-2 px-2 mb-8">
          <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-xs font-bold">SF</div>
          <span className="text-white text-sm font-medium">Admin</span>
        </Link>
        <AdminNav />
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
