export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display font-bold text-lg">
              <span className="gradient-text">SF</span>
              <span className="text-white/40 ml-1 text-sm font-normal">/ AI Automation</span>
            </p>
            <p className="text-gray-700 text-sm mt-1">shamsheerfatma.tech</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            {['About','Services','Projects','Blog','Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white transition-colors">{l}</a>
            ))}
          </nav>

          <p className="text-gray-700 text-sm">© {year} Shamsheer Fatma. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
