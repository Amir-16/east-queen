import { useState, useRef } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Mail, ChevronDown, ArrowRight, Clock } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/constants'
import { useNavbarScroll } from '@/hooks/useNavbarScroll'
import { stagger, fadeRight } from '@/lib/motion'

/* ─── Top utility bar ──────────────────────────────────────────────────────── */
function TopBar() {
  const { company } = usePage().props
  const phone = company?.phone ?? ''
  const email = company?.email ?? ''
  return (
    <div className="bg-gold-500 text-white hidden lg:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-9">
          <div className="flex items-center gap-5 text-[11px] font-medium">
            <span className="flex items-center gap-1.5 text-white/80">
              <Clock size={11} />
              Sun – Thu &nbsp;9:00 AM – 5:00 PM BST
            </span>
          </div>
          <div className="flex items-center gap-5 text-[11px] font-medium">
            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="flex items-center gap-1.5 text-white/85 hover:text-white transition-colors"
              >
                <Phone size={11} />
                {phone}
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-1.5 text-white/85 hover:text-white transition-colors"
              >
                <Mail size={11} />
                {email}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Companies mega-menu ──────────────────────────────────────────────────── */
function CompaniesMegaMenu({ open, onClose }) {
  const { navCompanies = [] } = usePage().props
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.18 }}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-[680px] max-w-[96vw]"
        >
          <div className="rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(13,11,30,0.18)] border border-slate-200">
            <div className="grid grid-cols-[1fr_280px] h-[340px]">

              {/* Left — company list */}
              <div className="bg-white flex flex-col py-5 px-5 relative">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold-500" />
                <p className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.3em] mb-3 px-2">
                  Our Portfolio
                </p>
                <div className="grid grid-cols-2 gap-0.5 flex-1">
                  {navCompanies.map((c, i) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.035 }}
                    >
                      <Link
                        href={`/companies/${c.slug}`}
                        onClick={onClose}
                        className="group flex items-center gap-2.5 px-3 py-2.5 rounded-xl
                                   hover:bg-slate-50 transition-colors duration-150"
                      >
                        <div className="w-7 h-7 rounded-lg bg-navy-900 group-hover:bg-gold-500
                                        flex items-center justify-center shrink-0
                                        transition-colors duration-200">
                          <span className="text-white font-bold text-[9px] font-mono">
                            {c.name.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-[13px] font-medium text-slate-800
                                         group-hover:text-slate-900 leading-tight">
                          {c.name}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="pt-3 mt-2 border-t border-slate-100 px-2">
                  <Link
                    href="/companies"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold
                               text-gold-500 hover:text-gold-600 uppercase tracking-[0.2em]
                               transition-colors duration-200"
                  >
                    View All Companies <ArrowRight size={10} />
                  </Link>
                </div>
              </div>

              {/* Right — dark image panel */}
              <div className="relative overflow-hidden bg-navy-900">
                <img
                  src="/images/shipping/bbg-master-night.jpeg"
                  alt="East Queen Group"
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 to-navy-900/90" />
                <div className="relative h-full flex flex-col justify-between p-6">
                  <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/30
                                  flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                  </div>
                  <div>
                    <p className="font-playfair font-bold text-white text-lg leading-snug mb-2">
                      Six companies.<br />One trusted group.
                    </p>
                    <p className="text-white/40 text-xs leading-relaxed mb-4">
                      Ship breaking · LPG energy<br />Fisheries · International trade
                    </p>
                    <Link
                      href="/about-east-queen"
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-gold-400 hover:text-gold-300
                                 text-xs font-semibold tracking-wide transition-colors"
                    >
                      Our Story <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── Export / Import simple dropdown ──────────────────────────────────────── */
function ProductDropdown({ open, item, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.16 }}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-56"
        >
          <div className="bg-white rounded-xl shadow-[0_16px_48px_rgba(13,11,30,0.14)]
                          border border-slate-200 overflow-hidden">
            <div className="h-[3px] bg-gold-500" />
            <div className="py-1.5">
              {item.children?.map((child, i) => (
                <motion.div
                  key={child.href}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    href={child.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-2.5 text-[13px]
                               text-slate-600 hover:text-gold-500 hover:bg-slate-50
                               transition-colors duration-150 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-gold-500
                                     transition-colors shrink-0" />
                    {child.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            {item.href && (
              <div className="border-t border-slate-100 px-4 py-2.5">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-1.5 text-[11px] font-bold text-gold-500
                             hover:text-gold-600 uppercase tracking-[0.2em] transition-colors"
                >
                  All {item.label} <ArrowRight size={9} />
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── Main Navbar ──────────────────────────────────────────────────────────── */
export default function Navbar() {
  const { url } = usePage()
  const { company } = usePage().props
  const [menuOpen, setMenuOpen] = useState(false)
  const [openLabel, setOpenLabel] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const timerRef = useRef(null)
  const scrolled = useNavbarScroll(48)
  const isHome = url === '/'
  const solidNav = scrolled || !isHome

  const openDrop  = (label) => { if (timerRef.current) clearTimeout(timerRef.current); setOpenLabel(label) }
  const closeDrop = () => { timerRef.current = setTimeout(() => setOpenLabel(null), 150) }

  return (
    <>
      <TopBar />

      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solidNav
            ? 'bg-white border-b border-slate-200 shadow-[0_2px_20px_rgba(13,11,30,0.08)]'
            : 'bg-white/95 backdrop-blur-sm border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[80px]">

            {/* Logo */}
            <Link href="/" className="shrink-0">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="origin-left"
              >
                <img
                  src="/images/brand/logo.svg"
                  alt="East Queen Group"
                  className="h-14 w-auto object-contain"
                />
              </motion.div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => {
                const isActive   = !!item.href && (url === item.href || url.startsWith(item.href + '-'))
                const isDropdown = !!item.children?.length
                const isOpen     = openLabel === item.label

                const baseCls = `relative flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-medium
                  transition-colors duration-200 whitespace-nowrap ${
                    isActive
                      ? 'text-gold-500 font-semibold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`

                if (isDropdown) {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => openDrop(item.label)}
                      onMouseLeave={closeDrop}
                    >
                      <button type="button" className={baseCls}>
                        {item.label}
                        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.18 }}>
                          <ChevronDown size={13} strokeWidth={2} className="text-slate-400" />
                        </motion.span>
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute bottom-0 left-2 right-2 h-0.5 bg-gold-500 rounded-full"
                          />
                        )}
                      </button>
                      {item.label === 'Companies' && (
                        <CompaniesMegaMenu open={isOpen} onClose={() => setOpenLabel(null)} />
                      )}
                      {(item.label === 'Export' || item.label === 'Import') && (
                        <ProductDropdown open={isOpen} item={item} onClose={() => setOpenLabel(null)} />
                      )}
                    </div>
                  )
                }

                return (
                  <Link key={item.href ?? item.label} href={item.href} className={baseCls}>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-gold-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact-us"
                className="flex items-center gap-2 px-5 py-2.5 bg-gold-500 hover:bg-gold-600
                           text-white text-[13px] font-semibold rounded-lg
                           transition-all duration-200"
              >
                Get In Touch
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[min(310px,90vw)] bg-white z-[70]
                         flex flex-col shadow-[0_0_80px_rgba(13,11,30,0.2)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 h-[70px] border-b border-slate-100">
                <img src="/images/brand/logo.svg" alt="East Queen Group" className="h-10 w-auto object-contain" />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-400 hover:text-slate-700 p-1 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav items with stagger */}
              <motion.nav
                className="flex flex-col gap-0.5 p-3 flex-1 overflow-y-auto"
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                {NAV_ITEMS.map((item) => {
                  const isActive   = !!item.href && url === item.href
                  const isDropdown = !!item.children?.length
                  const isExpanded = mobileExpanded === item.label

                  return (
                    <motion.div key={item.href ?? item.label} variants={fadeRight}>
                      {isDropdown ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl
                                       text-[14px] font-medium text-slate-700 hover:bg-slate-50
                                       transition-colors duration-150"
                          >
                            <span>{item.label}</span>
                            <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.18 }}>
                              <ChevronDown size={14} className="text-slate-400" />
                            </motion.span>
                          </button>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 pb-1 space-y-0.5">
                                  {item.href && (
                                    <Link
                                      href={item.href}
                                      onClick={() => setMenuOpen(false)}
                                      className="block px-4 py-2 text-[13px] font-semibold text-gold-500
                                                 hover:bg-slate-50 rounded-lg transition-colors"
                                    >
                                      All {item.label}s
                                    </Link>
                                  )}
                                  {item.children?.map((child) => (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={() => setMenuOpen(false)}
                                      className="block px-4 py-2 text-[13px] text-slate-500
                                                 hover:text-gold-500 hover:bg-slate-50 rounded-lg
                                                 transition-colors"
                                    >
                                      {child.label}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className={`block px-4 py-3 rounded-xl text-[14px] font-medium transition-colors duration-150 ${
                            isActive
                              ? 'bg-gold-50 text-gold-600 font-semibold border border-gold-100'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.div>
                  )
                })}
              </motion.nav>

              {/* Drawer footer — phone CTA + button */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-3">
                {company?.phone && (
                  <a
                    href={`tel:${company.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-2.5 px-3 py-2.5 bg-white rounded-xl
                               border border-slate-200 text-slate-700 text-sm
                               hover:border-gold-200 transition-colors"
                  >
                    <Phone size={15} className="text-gold-500" />
                    {company.phone}
                  </a>
                )}
                <Link
                  href="/contact-us"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 bg-gold-500 hover:bg-gold-600
                             text-white font-semibold rounded-xl text-sm transition-colors"
                >
                  Get In Touch
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
