import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon, ChevronDownIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { NAV_LINKS, COMPANY } from '../../utils/constants'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const dropdownRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setOpenDropdown(null)
  }, [location.pathname])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isHome = location.pathname === '/'
  const isTransparent = isHome && !scrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent py-4'
          : 'bg-dark/95 backdrop-blur-md py-2 shadow-lg'
      }`}
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
          {/* Logo image with glow ring */}
          <div className="relative">
            <div
              className={`absolute -inset-1 rounded-2xl blur-md transition-all duration-500 ${
                isTransparent
                  ? 'bg-accent/20 group-hover:bg-accent/35'
                  : 'bg-white/10 group-hover:bg-accent/20'
              }`}
            />
            <img
              src="/images/logo/JB -LOGO.png"
              alt="Jonith Bogdad Technical Services"
              className="relative h-14 sm:h-16 w-auto object-contain rounded-xl bg-white p-1.5 shadow-xl transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Company name — visible sm and up */}
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-display font-black text-white text-sm md:text-base tracking-wide uppercase">
              Jonith Bogdad
            </span>
            <span className="text-accent text-[10px] md:text-xs font-display font-bold tracking-[0.18em] uppercase">
              Technical Services
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav ref={dropdownRef} className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.label} className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg font-display font-medium text-sm transition-colors duration-200 ${
                    isTransparent
                      ? 'text-white/90 hover:text-white hover:bg-white/10'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                  <ChevronDownIcon
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      openDropdown === link.label ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-card-hover overflow-hidden border border-light-200"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="flex items-center gap-3 px-5 py-3 text-sm text-dark hover:bg-primary-50 hover:text-primary font-medium transition-colors duration-150 border-b border-light-200 last:border-0"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-display font-medium text-sm transition-colors duration-200 ${
                    isActive
                      ? 'text-accent bg-white/10'
                      : isTransparent
                      ? 'text-white/90 hover:text-white hover:bg-white/10'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        {/* ── CTA + Hamburger ── */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${COMPANY.mobile}`}
            className="hidden md:flex items-center gap-2 text-accent hover:text-accent-light font-display font-semibold text-sm transition-colors duration-200"
          >
            <PhoneIcon className="w-4 h-4" />
            {COMPANY.mobile}
          </a>
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-display font-semibold text-sm px-5 py-2.5 rounded-lg transition-all duration-200 shadow-accent hover:shadow-lg"
          >
            Get Quote
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-dark/98 backdrop-blur-md border-t border-white/10"
          >
            <div className="container-custom px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <div className="px-4 py-2 text-white/50 font-display font-semibold text-xs uppercase tracking-widest">
                      {link.label}
                    </div>
                    {link.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="flex items-center gap-3 px-6 py-2.5 text-sm text-white/75 hover:text-white hover:bg-white/5 rounded-lg transition-colors font-medium"
                      >
                        <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 rounded-lg font-display font-semibold text-sm transition-colors ${
                        isActive ? 'bg-primary text-white' : 'text-white/80 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )
              )}
              <div className="pt-3 pb-1 flex flex-col gap-3 border-t border-white/10 mt-2">
                <a
                  href={`tel:${COMPANY.mobile}`}
                  className="flex items-center gap-2 px-4 py-2.5 text-accent font-semibold text-sm"
                >
                  <PhoneIcon className="w-4 h-4" />
                  {COMPANY.mobile}
                </a>
                <Link to="/contact" className="btn-primary text-center justify-center">
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
