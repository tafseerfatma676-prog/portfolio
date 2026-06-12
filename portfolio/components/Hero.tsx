'use client'
import { useEffect, useRef } from 'react'

const stats = [
  { value: '50+', label: 'Workflows Built' },
  { value: '30+', label: 'Hours Saved / Client' },
  { value: '15+', label: 'Happy Clients'   },
  { value: '100%', label: 'On-time Delivery' },
]

const tools = ['n8n', 'Make.com', 'Zapier', 'ChatGPT API', 'Python', 'Airtable', 'Notion', 'WhatsApp API']

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Animated particle dots background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(129,140,248,${p.alpha})`
        ctx.fill()
      })
      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 100) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(129,140,248,${0.08 * (1 - d / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-600/30 bg-brand-600/10 text-brand-400 text-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
          Available for new projects
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] mb-6 max-w-4xl">
          I Build{' '}
          <span className="gradient-text">AI Automations</span>
          <br />That Work While You Sleep
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          I help businesses automate repetitive workflows, generate leads on autopilot,
          and unlock hours every week — using AI tools, APIs, and no-code platforms.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-16">
          <a href="#projects" className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium transition-all hover:scale-105">
            See My Work →
          </a>
          <a href="#contact" className="px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 text-white font-medium transition-all hover:bg-white/5">
            Let's Talk
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map(s => (
            <div key={s.label} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="font-display text-3xl font-bold gradient-text">{s.value}</div>
              <div className="text-gray-500 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tool belt */}
        <div className="flex flex-wrap gap-2">
          <span className="text-gray-600 text-sm mr-2 self-center">Tools I use:</span>
          {tools.map(t => (
            <span key={t} className="px-3 py-1 text-xs rounded-full border border-white/10 text-gray-400 bg-white/[0.03]">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 text-xs">
        <span>Scroll to explore</span>
        <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center pt-1">
          <div className="w-1 h-2 bg-brand-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
