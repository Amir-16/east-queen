import { useRef, useEffect, useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Globe, ArrowRight, ExternalLink, ArrowUpRight } from 'lucide-react'
import { SITE, NAV_LINKS } from '../../data/siteConfig'

const E = [0.22, 1, 0.36, 1]

/* ── palette — warm cream · near-black · navy/teal ── */
const C = {
  bg:        '#f8f6f2',
  bgCard:    '#ffffff',
  bgHover:   '#eef3fb',
  border:    'rgba(10,15,30,0.09)',
  borderNav: 'rgba(26,74,133,0.18)',
  navy:      '#1a4a85',
  teal:      '#0891b2',
  tealBright:'#22d3ee',
  ink:       '#0d0f1a',          /* near-black — headings */
  body:      '#2d3748',          /* dark slate — body text */
  muted:     '#64748b',          /* slate-500 — captions, labels */
  /* legacy aliases kept so JSX below still works */
  gold:      '#1a4a85',
  green:     '#22d3ee',
  greenDim:  '#0e7490',
  white:     '#0d0f1a',
}

/* ── count-up hook ── */
function useCountUp(target, active, duration = 1400) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const num = parseInt(String(target).replace(/\D/g, ''), 10) || 0
    if (!num) return
    const start = Date.now()
    const tick = () => {
      const t = Math.min((Date.now() - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setVal(Math.round(ease * num))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])
  return String(target).replace(/\d+/, val)
}

/* ── animation variants ── */
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.08 } },
}
const colVariants = {
  hidden:   { opacity: 0, y: 36 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.72, ease: E } },
}

const PROJECTS = [
  { label: 'Fisheries Network',  emoji: '🐟' },
  { label: 'Paddy & Grain',      emoji: '🌾' },
  { label: 'Fruits & Orchards',  emoji: '🍌' },
  { label: 'Cattle & Livestock', emoji: '🐃' },
  { label: 'Solar Power Plant',  emoji: '☀️' },
  { label: 'Blackfly Protein',   emoji: '🦟' },
  { label: 'Research Center',    emoji: '🔬' },
]

const STATS = [
  { v: '65+',    l: 'Acres'        },
  { v: '38',     l: 'Ponds'        },
  { v: '800 MT', l: 'Annual Yield' },
  { v: '2028',   l: 'Full Scale'   },
]

/* ── nav / project link ── */
function FLink({ to, href, children, icon, className = '' }) {
  const base = { color: C.body, textDecoration: 'none', transition: 'color 0.22s' }
  const hov  = {
    onMouseEnter: e => (e.currentTarget.style.color = C.navy),
    onMouseLeave: e => (e.currentTarget.style.color = C.body),
  }
  if (href) return <a href={href} style={base} {...hov} className={className}>{children}</a>
  return <Link href={to} style={base} {...hov} className={className}>{children}</Link>
}

/* ── column eyebrow ── */
function ColHead({ color = C.navy, children }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <span className="block h-px w-5 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-[10px] font-black uppercase tracking-[0.22em]"
        style={{ color: C.ink }}>{children}</span>
    </div>
  )
}

/* ── stat cell with count-up ── */
function StatCell({ s, i, active }) {
  const display = useCountUp(s.v, active)
  return (
    <div className="px-6 py-2"
      style={{ borderRight: i < STATS.length - 1 ? `1px solid ${C.border}` : 'none' }}>
      <motion.div
        className="text-xl font-black leading-none"
        style={{ color: C.ink }}
        initial={{ opacity: 0, y: 12 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.38 + i * 0.09, duration: 0.55, ease: E }}
      >
        {display}
      </motion.div>
      <motion.div
        className="text-[10px] mt-0.5 font-bold"
        style={{ color: C.teal }}
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 0.48 + i * 0.09, duration: 0.5 }}
      >
        {s.l}
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════════════ */
export default function Footer() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const { company = {} } = usePage().props

  // Merge DB settings over siteConfig defaults
  const co = {
    name:     company.name     ?? SITE.name,
    founded:  company.founded  ?? SITE.founded,
    location: company.location ?? SITE.location,
    email:    company.email    ?? SITE.email,
    phone1:   company.phone1   ?? SITE.phone1,
    phone2:   company.phone2   ?? SITE.phone2,
    website:  company.website  ?? SITE.website,
  }

  return (
    <footer ref={ref} className="relative overflow-hidden" style={{ backgroundColor: C.bg }}>

      {/* ── ambient orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-1/3 w-[560px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse,rgba(34,211,238,0.07) 0%,transparent 65%)' }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-60 rounded-full"
          style={{ background: 'radial-gradient(ellipse,rgba(26,74,133,0.06) 0%,transparent 65%)' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle,rgba(15,25,45,0.4) 1px,transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
      </div>

      {/* ════════════════════════════════════
          TOP CTA BAND
      ════════════════════════════════════ */}
      <div className="relative" style={{ borderBottom: `1px solid ${C.border}` }}>

        {/* animated gold accent line */}
        <motion.div
          className="h-[2px] origin-left"
          style={{
            background: `linear-gradient(to right,transparent 0%,#22d3ee 30%,#1a4a85 70%,transparent 100%)`,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 0.5 } : {}}
          transition={{ duration: 1.1, ease: E }}
        />

        <div className="section-pad max-content py-14 sm:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center gap-10">

            {/* ── copy ── */}
            <div className="flex-1 max-w-xl">
              {/* badge */}
              <motion.div
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 mb-5"
                style={{ background: 'rgba(26,74,133,0.08)', border: `1px solid rgba(26,74,133,0.22)` }}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: E }}
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: C.gold }}
                  animate={{ opacity: [1, 0.35, 1] }}
                  transition={{ repeat: Infinity, duration: 2.2 }}
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: C.gold }}>
                  Open for Investment
                </span>
              </motion.div>

              {/* headline — slide-up word reveal */}
              <div className="overflow-hidden mb-1">
                <motion.h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight"
                  style={{ color: C.white }}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.12, duration: 0.75, ease: E }}
                >
                  Grow with Bangladesh's{' '}
                  <span style={{
                    background: `linear-gradient(120deg,#1a4a85 0%,#22d3ee 55%,#0e7490 100%)`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>
                    future of food
                  </span>
                </motion.h2>
              </div>

              <motion.p
                className="text-sm font-medium leading-relaxed mt-3"
                style={{ color: C.body }}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.28, duration: 0.65, ease: E }}
              >
                $6.25M precision agro ecosystem · 1.65-year payback · $5.44M revenue target by 2028.
              </motion.p>
            </div>

            {/* ── CTAs ── */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 shrink-0"
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.22, duration: 0.7, ease: E }}
            >
              <Link href="/partnership">
                <motion.span
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold"
                  style={{
                    background: `linear-gradient(135deg,#1a4a85,#153c6e)`,
                    color: '#ffffff',
                    boxShadow: `0 6px 28px rgba(26,74,133,0.30)`,
                  }}
                >
                  Explore Partnership
                  <motion.span whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                    <ArrowRight size={15} />
                  </motion.span>
                </motion.span>
              </Link>
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold transition-colors duration-200"
                  style={{
                    background: C.bgCard,
                    border: `1px solid rgba(26,74,133,0.22)`,
                    color: C.body,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#e8eef7'; e.currentTarget.style.color = '#1a4a85' }}
                  onMouseLeave={e => { e.currentTarget.style.background = C.bgCard;  e.currentTarget.style.color = C.body  }}
                >
                  Contact Us
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* ── stats row with count-up ── */}
          <motion.div
            className="mt-10 flex flex-wrap"
            style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20 }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {STATS.map((s, i) => (
              <StatCell key={s.l} s={s} i={i} active={inView} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* ════════════════════════════════════
          MAIN GRID — staggered columns
      ════════════════════════════════════ */}
      <div className="section-pad max-content py-14"
        style={{ borderBottom: `1px solid ${C.border}` }}>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8"
          variants={gridVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >

          {/* ── Brand (4 cols) ── */}
          <motion.div variants={colVariants} className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <img src="/agrologo.png" alt="SFF Agro" className="h-12 w-auto object-contain" />
              <div className="flex items-center gap-3">
                <div className="w-px h-9 rounded-full" style={{ backgroundColor: 'rgba(26,74,133,0.20)' }} />
                <div className="leading-none">
                  <div className="text-[12px] font-black uppercase tracking-[0.18em] leading-none"
                    style={{ color: C.ink }}>
                    Syedpur
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.14em] mt-[5px]"
                    style={{ color: C.teal }}>
                    Fisheries and Farms
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm font-medium leading-relaxed mb-6" style={{ color: C.body }}>
              Bangladesh's most advanced precision aquaculture and integrated agribusiness —
              65 acres of fish ponds, orchards, livestock, and green energy working as one ecosystem.
            </p>

            {/* live badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 mb-6"
              style={{ background: 'rgba(34,211,238,0.10)', border: `1px solid rgba(34,211,238,0.30)` }}>
              <motion.span
                animate={{ opacity: [1, 0.25, 1], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2.2 }}
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: C.green, boxShadow: `0 0 8px ${C.green}` }}
              />
              <span className="text-xs font-semibold" style={{ color: C.green }}>
                Est. {co.founded} · Operational
              </span>
            </div>

            {/* contact list */}
            <div className="space-y-3">
              {[
                { Icon: MapPin, text: co.location, href: null },
                { Icon: Phone,  text: co.phone1,   href: `tel:${co.phone1}` },
                { Icon: Mail,   text: co.email,    href: `mailto:${co.email}` },
              ].map(({ Icon, text, href }) => {
                const Tag = href ? 'a' : 'div'
                return (
                  <Tag key={text} href={href}
                    className="flex items-center gap-3 text-xs font-semibold group"
                    style={{ color: C.body, textDecoration: 'none', transition: 'color 0.22s' }}
                    onMouseEnter={href ? e => e.currentTarget.style.color = C.navy : undefined}
                    onMouseLeave={href ? e => e.currentTarget.style.color = C.body : undefined}
                  >
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200"
                      style={{ background: 'rgba(26,74,133,0.08)', border: `1px solid rgba(26,74,133,0.18)` }}>
                      <Icon size={12} style={{ color: C.green }} />
                    </span>
                    <span>{text}</span>
                  </Tag>
                )
              })}
            </div>
          </motion.div>

          {/* ── Navigation (2 cols) ── */}
          <motion.div variants={colVariants} className="lg:col-span-2">
            <ColHead color={C.gold}>Navigate</ColHead>
            <ul className="space-y-1">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="flex items-center justify-between text-sm font-semibold py-1.5 group"
                    style={{ color: C.body, textDecoration: 'none', transition: 'color 0.22s' }}
                    onMouseEnter={e => e.currentTarget.style.color = C.navy}
                    onMouseLeave={e => e.currentTarget.style.color = C.body}
                  >
                    <span>{link.label}</span>
                    {link.badge
                      ? <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full"
                          style={{ background: 'rgba(34,211,238,0.12)', color: '#0891b2' }}>
                          {link.badge}
                        </span>
                      : <ArrowUpRight size={11}
                          className="opacity-0 group-hover:opacity-60 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    }
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Projects (3 cols) ── */}
          <motion.div variants={colVariants} className="lg:col-span-3">
            <ColHead color={C.green}>Projects</ColHead>
            <ul className="space-y-1">
              {PROJECTS.map(p => (
                <li key={p.label}>
                  <Link href="/projects"
                    className="flex items-center gap-2 text-sm font-semibold py-1.5 group"
                    style={{ color: C.body, textDecoration: 'none', transition: 'color 0.22s' }}
                    onMouseEnter={e => e.currentTarget.style.color = C.navy}
                    onMouseLeave={e => e.currentTarget.style.color = C.body}
                  >
                    <span className="text-sm leading-none group-hover:scale-110 transition-transform duration-200 inline-block">
                      {p.emoji}
                    </span>
                    <span>{p.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Reach Us (3 cols) ── */}
          <motion.div variants={colVariants} className="lg:col-span-3">
            <ColHead color={C.green}>Reach Us</ColHead>

            {/* investment mini-card */}
            <div className="rounded-2xl p-5 mb-5"
              style={{
                background: 'linear-gradient(135deg,rgba(26,74,133,0.06) 0%,rgba(34,211,238,0.04) 100%)',
                border: `1px solid rgba(26,74,133,0.18)`,
              }}>
              <p className="text-xs font-semibold leading-relaxed mb-4" style={{ color: C.body }}>
                Interested in equity investment, technical collaboration, or market access?
              </p>
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 text-xs font-bold rounded-lg px-4 py-2.5"
                  style={{
                    background: `linear-gradient(135deg,#1a4a85,#22d3ee)`,
                    color: '#ffffff',
                    boxShadow: `0 4px 16px rgba(26,74,133,0.25)`,
                  }}
                >
                  Schedule a Call <ArrowRight size={12} />
                </motion.span>
              </Link>
            </div>

            {/* contact links */}
            <div className="space-y-3">
              {[
                { Icon: Phone, text: co.phone1,            href: `tel:${co.phone1}` },
                { Icon: Phone, text: co.phone2,            href: `tel:${co.phone2}` },
                { Icon: Globe, text: 'eastqueengroup.com', href: co.website,   ext: true },
              ].map(({ Icon, text, href, ext }) => (
                <a key={text} href={href}
                  target={ext ? '_blank' : undefined}
                  rel={ext ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-2.5 text-xs font-semibold group"
                  style={{ color: C.body, textDecoration: 'none', transition: 'color 0.22s' }}
                  onMouseEnter={e => e.currentTarget.style.color = C.navy}
                  onMouseLeave={e => e.currentTarget.style.color = C.body}
                >
                  <Icon size={11} style={{ color: C.green }} />
                  {text}
                  {ext && <ExternalLink size={9} className="opacity-0 group-hover:opacity-70 transition-opacity duration-200" />}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ════════════════════════════════════
          BOTTOM BAR
      ════════════════════════════════════ */}
      <motion.div
        className="section-pad max-content py-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.65, duration: 0.6 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs font-semibold" style={{ color: C.muted }}>
            © {new Date().getFullYear()}{' '}
            <span style={{ color: C.ink, fontWeight: 700 }}>{co.name}</span>
            . All rights reserved.
          </p>
          <a href="https://soft-m.com" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold group"
            style={{ color: C.teal, textDecoration: 'none', transition: 'color 0.22s' }}
            onMouseEnter={e => e.currentTarget.style.color = C.navy}
            onMouseLeave={e => e.currentTarget.style.color = C.teal}
          >
            Powered by soft-m.com
            <ExternalLink size={9} className="opacity-0 group-hover:opacity-80 transition-opacity duration-200" />
          </a>
        </div>
      </motion.div>

    </footer>
  )
}
