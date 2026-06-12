'use client'
import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      })
      if (res?.ok) {
        toast.success('Welcome back!')
        router.push('/admin')
        router.refresh()
      } else {
        toast.error('Invalid email or password')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 grid-bg">
      <div className="w-full max-w-sm mx-4">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-brand-600 flex items-center justify-center text-xl font-bold mx-auto mb-4 text-white">
            SF
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-gray-600 text-sm mt-1">shamsheerfatma.tech</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder-gray-700 focus:outline-none focus:border-brand-600/50 text-sm"
              placeholder="admin@shamsheerfatma.tech"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder-gray-700 focus:outline-none focus:border-brand-600/50 text-sm"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-medium transition-all">
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  )
}
