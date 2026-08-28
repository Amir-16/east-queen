import { useState, useEffect } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, SITE } from '../../data/siteConfig'
import AnnouncementBar from '../AnnouncementBar'

const EASE = [0.22, 1, 0.36, 1]

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { url: pathname }       = usePage()
  const { scrollYProgress }     = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: 'left', background: 'linear-gradient(to right, #1a4a85, #c9901a)' }}
        className="fixed top-0 left-0 right-0 h-[2px] z-[70] origin-left"
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-[60] transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(253,252,248,0.97)' : 'rgba(253,252,248,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.07), 0 4px 24px rgba(0,0,0,0.05)' : 'none',
        }}
      >
        {/* Announcement strip */}
        <AnnouncementBar />

        {/* Nav row */}
        <div style={{ paddingTop: scrolled ? '10px' : '16px', paddingBottom: scrolled ? '10px' : '16px' }}>
        <div className="section-pad max-content flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <motion.img
              src="/agrologo.png"
              alt="SFF Agro"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="h-9 w-auto object-contain"
            />
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-px h-6 rounded-full" style={{ backgroundColor: 'rgba(10,34,9,0.12)' }} />
              <div className="leading-none">
                <div className="text-[11px] font-black uppercase tracking-[0.18em] leading-none"
                  style={{ color: '#071424' }}>
                  Syedpur
                </div>
                <div className="text-[8px] font-bold uppercase tracking-[0.15em] mt-[4px]"
                  style={{ color: '#1a4a85' }}>
                  Fisheries and Farms
                </div>
              </div>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center">
            {NAV_LINKS.map(link => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-2 flex items-center gap-1.5"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ backgroundColor: '#eef3fb' }}
                      transition={{ duration: 0.28, ease: EASE }}
                    />
                  )}
                  <span
                    className="relative z-10 text-[13px] font-medium transition-colors duration-200 whitespace-nowrap"
                    style={{ color: isActive ? '#1a4a85' : '#2d5a8e' }}
                    onMouseEnter={e => { if (!isActive) e.target.style.color = '#153c6e' }}
                    onMouseLeave={e => { if (!isActive) e.target.style.color = '#2d5a8e' }}
                  >
                    {link.label}
                  </span>
                  {link.badge && (
                    <span
                      className="relative z-10 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full leading-none"
                      style={{ backgroundColor: '#c9901a', color: '#fff' }}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* ── Desktop CTA ── */}
          <Link href="/contact" className="hidden lg:block shrink-0">
            <motion.span
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary text-sm px-5 py-2.5 inline-flex items-center gap-2"
            >
              Get in Touch
            </motion.span>
          </Link>

          {/* ── Mobile toggle ── */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setOpen(o => !o)}
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center border transition-colors duration-200"
            style={{ borderColor: '#e9e0c5', color: '#2d5a8e' }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open
                ? <motion.div key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90,  opacity: 0 }} transition={{ duration: 0.18 }}><X    size={16} /></motion.div>
                : <motion.div key="menu" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><Menu size={16} /></motion.div>
              }
            </AnimatePresence>
          </motion.button>
        </div>
        </div>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="lg:hidden overflow-hidden"
              style={{ borderTop: '1px solid #f0e8d5', backgroundColor: '#fdfcf8' }}
            >
              <div className="px-4 py-4 space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.28, ease: EASE }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200"
                      style={{
                        color:           pathname === link.href ? '#1a4a85' : '#2d5a8e',
                        backgroundColor: pathname === link.href ? '#eef3fb'  : 'transparent',
                      }}
                    >
                      {link.label}
                      {link.badge && (
                        <span
                          className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full leading-none"
                          style={{ backgroundColor: '#c9901a', color: '#fff' }}
                        >
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-2 pb-1">
                  <Link href="/contact" className="block btn-primary text-sm text-center py-2.5">
                    Get in Touch
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
