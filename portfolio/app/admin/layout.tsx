import AdminNav from './AdminNav'

// No auth check here — middleware.ts handles it
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 flex">
      <aside className="w-56 border-r border-white/5 p-4 flex flex-col">
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-xs font-bold text-white">
            SF
          </div>
          <span className="text-white text-sm font-medium">Admin</span>
        </div>
        <AdminNav />
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
