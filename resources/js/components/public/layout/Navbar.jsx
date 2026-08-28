import { useState, useRef, useEffect } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react'
import { NAV_ITEMS, CONTACT } from '@/lib/constants'
import { companies } from '@/data/companies'
import { useNavbarScroll } from '@/hooks/useNavbarScroll'

/* ── CompaniesMegaMenu ─────────────────────────────────────────────── */
function CompaniesMegaMenu({ items, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 z-50"
      style={{ width: 680 }}
    >
      <div className="bg-white border border-slate-200 rounded-2xl shadow-deep overflow-hidden">
        <div className="grid grid-cols-5">
          {/* Company list — 3 cols */}
          <div className="col-span-3 p-5 grid grid-cols-1 gap-1">
            <p className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.3em] mb-2 px-2">
              Group Companies
            </p>
            {companies.map((c) => (
              <Link
                key={c.id}
                href={`/con-${c.id}`}
                onClick={onClose}
                className="group flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors duration-150"
              >
                <div className="w-8 h-8 rounded-lg bg-navy-900 group-hover:bg-gold-500 flex items-center justify-center shrink-0 transition-colors duration-200">
                  <span className="text-white font-mono font-bold text-[10px]">
                    {c.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-slate-800 font-semibold text-sm group-hover:text-gold-600 transition-colors">{c.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{c.tagline?.split('—')[0]?.trim() ?? c.description?.slice(0, 50)}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Dark image panel — 2 cols */}
          <div className="col-span-2 bg-navy-900 p-6 flex flex-col justify-between">
            <div>
              <div className="w-8 h-[2px] bg-gold-500 rounded-full mb-4" />
              <p className="font-playfair font-bold text-white text-lg leading-snug mb-2">
                East Queen Group
              </p>
              <p className="text-white/40 text-xs leading-relaxed">
                42 years of industrial excellence across maritime, trading, energy, fisheries, and food sectors.
              </p>
            </div>
            <img
              src="/images/ship-breaking/coastal-view.jpeg"
              alt="East Queen Group"
              className="rounded-xl w-full h-28 object-cover mt-6 opacity-70"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── ProductDropdown ─────────────────────────────────────────────── */
function ProductDropdown({ items, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
      className="absolute top-full left-0 mt-1 w-56 z-50"
    >
      <div className="bg-white border border-slate-200 rounded-xl shadow-card overflow-hidden p-1.5">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 hover:text-gold-600 hover:bg-slate-50 text-sm transition-colors duration-150"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 shrink-0" />
            {item.label}
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

/* ── NavItem ─────────────────────────────────────────────────────── */
function NavItem({ item, currentUrl, onClose }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const isActive = currentUrl === item.href || (item.children?.some((c) => currentUrl.startsWith(c.href)))

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={`relative text-sm font-semibold transition-colors duration-200 px-1 py-1 ${
          isActive ? 'text-gold-500' : 'text-white/70 hover:text-white'
        }`}
      >
        {item.label}
        {isActive && <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold-500 rounded-full" />}
      </Link>
    )
  }

  const isCompanies = item.label === 'Companies'

  return (
    <div ref={ref} className="relative">
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((p) => !p)}
        className={`relative flex items-center gap-1 text-sm font-semibold transition-colors duration-200 px-1 py-1 ${
          isActive ? 'text-gold-500' : 'text-white/70 hover:text-white'
        }`}
      >
        {item.label}
        <ChevronDown size={13} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        {isActive && <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold-500 rounded-full" />}
      </button>

      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <AnimatePresence>
          {open && (
            isCompanies
              ? <CompaniesMegaMenu items={item.children} onClose={() => setOpen(false)} />
              : <ProductDropdown items={item.children} onClose={() => setOpen(false)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── Navbar ─────────────────────────────────────────────────────── */
export default function Navbar() {
  const { url } = usePage()
  const scrolled = useNavbarScroll(48)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(null)

  return (
    <>
      {/* TopBar */}
      <div className="bg-gold-500 text-navy-950 text-xs font-semibold py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {CONTACT.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="flex items-center gap-1.5 hover:opacity-75 transition-opacity">
                <Phone size={11} />
                {p}
              </a>
            ))}
          </div>
          <a href={`mailto:${CONTACT.emails[0]}`} className="flex items-center gap-1.5 hover:opacity-75 transition-opacity">
            <Mail size={11} />
            {CONTACT.emails[0]}
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-950/95 backdrop-blur-md shadow-deep border-b border-white/[0.06]'
          : 'bg-navy-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 bg-gold-500 rounded-lg flex items-center justify-center">
                <span className="font-mono font-black text-navy-950 text-sm leading-none">EQ</span>
              </div>
              <div className="hidden sm:block">
                <p className="font-playfair font-bold text-white text-[15px] leading-tight">East Queen</p>
                <p className="text-gold-500/70 text-[10px] tracking-widest uppercase leading-none">Group</p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-5">
              {NAV_ITEMS.map((item) => (
                <NavItem key={item.href} item={item} currentUrl={url} onClose={() => {}} />
              ))}
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact-us"
                className="hidden md:inline-flex items-center gap-1.5 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs px-4 py-2 rounded-lg transition-all duration-200"
              >
                Get in Touch
              </Link>
              <button
                onClick={() => setMobileOpen((p) => !p)}
                className="lg:hidden w-9 h-9 flex items-center justify-center text-white/70 hover:text-white rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="lg:hidden border-t border-white/10 bg-navy-950 overflow-hidden"
            >
              <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <div key={item.href}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() => setMobileExpanded((p) => p === item.label ? null : item.label)}
                          className="w-full flex items-center justify-between px-3 py-2.5 text-white/70 hover:text-white text-sm font-semibold rounded-lg hover:bg-white/5 transition-colors"
                        >
                          {item.label}
                          <ChevronDown size={14} className={`transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {mobileExpanded === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 mt-1 space-y-1 overflow-hidden"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block px-3 py-2 text-white/50 hover:text-gold-400 text-sm rounded-lg hover:bg-white/5 transition-colors"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                          url === item.href ? 'text-gold-400 bg-gold-500/10' : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-3 border-t border-white/10">
                  <Link
                    href="/contact-us"
                    onClick={() => setMobileOpen(false)}
                    className="block text-center py-3 bg-gold-500 text-navy-950 font-bold text-sm rounded-xl"
                  >
                    Get in Touch
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
