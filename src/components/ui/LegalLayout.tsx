import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Calendar, ArrowRight, BookOpen } from 'lucide-react'

export interface LegalSection {
  id: string
  title: string
  content: ReactNode
}

interface LegalLayoutProps {
  title: string
  eyebrow: string
  date: string
  description: string
  sections: LegalSection[]
  otherPage: { label: string; href: string }
}

// ── Scroll-triggered section block ──────────────────────────────────────────
function SectionBlock({ section, index }: { section: LegalSection; index: number }) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      id={section.id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      className="scroll-mt-28"
    >
      {/* Number + title */}
      <div className="flex items-center gap-3.5 mb-4">
        <motion.span
          initial={{ opacity: 0, scale: 0.75 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.08, ease: [0.34, 1.4, 0.64, 1] }}
          className="shrink-0 font-mono text-[10px] font-bold tracking-widest
                     text-white bg-navy-900 px-2.5 py-1.5 rounded-lg"
        >
          {num}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-playfair font-bold text-h3 text-navy-900 leading-snug"
        >
          {section.title}
        </motion.h2>
      </div>

      {/* Animated separator — thin, slate-colored */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-6 h-px bg-slate-200 origin-left"
      />

      {/* Body content */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-slate-600 text-[15px] leading-[1.88] space-y-4"
      >
        {section.content}
      </motion.div>
    </motion.div>
  )
}

// ── Layout ───────────────────────────────────────────────────────────────────
export default function LegalLayout({
  title,
  eyebrow,
  date,
  description,
  sections,
  otherPage,
}: LegalLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 sm:pt-32 md:pt-36 pb-14 sm:pb-20 md:pb-24 bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern" />
        <div className="absolute top-0 left-0 right-0 h-[3px]
                        bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
        <div className="absolute -top-24 right-1/3 w-[560px] h-[360px]
                        bg-gold-500/[0.05] blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />

        <div className="relative section-container">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex items-center gap-2 text-white/30 text-[13px] mb-10"
          >
            <Link to="/" className="hover:text-white/60 transition-colors duration-200">
              Home
            </Link>
            <ChevronRight size={11} className="text-white/20" />
            <span className="text-white/55">{title}</span>
          </motion.nav>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center gap-3 mb-7"
          >
            <div className="h-px w-7 bg-gold-500" />
            <span className="text-gold-500 text-[10px] font-bold uppercase tracking-[0.3em]">
              {eyebrow}
            </span>
          </motion.div>

          {/* Title — clip reveal */}
          <div className="overflow-hidden mb-5">
            <motion.h1
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ type: 'spring', stiffness: 175, damping: 28, delay: 0.12 }}
              className="font-playfair font-bold text-h1 text-white leading-tight"
            >
              {title}
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-white/40 text-[15px] leading-relaxed max-w-xl mb-8"
          >
            {description}
          </motion.p>

          {/* Date chip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.32 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                       border border-white/[0.08] bg-white/[0.04]
                       text-white/30 text-[11px] font-mono tracking-wide"
          >
            <Calendar size={10} />
            {date}
          </motion.div>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">

            {/* ── Sidebar TOC ───────────────────────────────────────────── */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="hidden lg:block lg:w-72 shrink-0"
            >
              <div className="sticky top-24 space-y-3">

                {/* TOC card — light, clean */}
                <div className="rounded-2xl border border-slate-200 bg-white
                                shadow-[0_2px_16px_rgba(17,24,39,0.06)] overflow-hidden">

                  {/* Card header */}
                  <div className="flex items-center gap-2.5 px-5 py-4
                                  bg-slate-50 border-b border-slate-100">
                    <BookOpen size={12} className="text-slate-400" />
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.25em]">
                      Contents
                    </span>
                  </div>

                  {/* TOC nav */}
                  <nav className="p-2.5">
                    {sections.map((s, i) => (
                      <motion.a
                        key={s.id}
                        href={`#${s.id}`}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
                        className="group flex items-center gap-3 pl-3 pr-4 py-2.5 rounded-xl
                                   border-l-2 border-transparent
                                   hover:border-gold-500 hover:bg-slate-50
                                   transition-all duration-200"
                      >
                        <span className="shrink-0 font-mono text-[10px] text-slate-300
                                         group-hover:text-gold-500 transition-colors duration-200">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[12px] text-slate-500 group-hover:text-slate-900
                                         font-medium leading-snug transition-colors duration-200">
                          {s.title}
                        </span>
                      </motion.a>
                    ))}
                  </nav>

                  {/* CTA */}
                  <div className="p-3 border-t border-slate-100">
                    <Link
                      to="/contact-us"
                      className="group flex items-center justify-between
                                 px-4 py-3 rounded-xl
                                 bg-navy-950 hover:bg-navy-800 text-white
                                 text-[12px] font-semibold
                                 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                        Have Questions?
                      </div>
                      <ArrowRight
                        size={12}
                        className="text-white/50 group-hover:translate-x-1 group-hover:text-white
                                   transition-all duration-200"
                      />
                    </Link>
                  </div>
                </div>

                {/* Cross-link to the other legal page */}
                <Link
                  to={otherPage.href}
                  className="group flex items-center justify-between
                             px-4 py-3 rounded-xl
                             border border-slate-200 bg-white hover:bg-slate-50
                             text-slate-500 hover:text-slate-800
                             text-[12px] font-medium
                             transition-all duration-200"
                >
                  {otherPage.label}
                  <ArrowRight
                    size={12}
                    className="text-slate-300 group-hover:translate-x-1 group-hover:text-slate-500
                               transition-all duration-200"
                  />
                </Link>
              </div>
            </motion.aside>

            {/* ── Sections ──────────────────────────────────────────────── */}
            <div className="flex-1 min-w-0 space-y-12">
              {sections.map((section, i) => (
                <SectionBlock key={section.id} section={section} index={i} />
              ))}

              {/* Footer bar */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="pt-8 border-t border-slate-100
                           flex items-center justify-between gap-4 flex-wrap"
              >
                <p className="text-slate-400 text-[11px] flex items-center gap-1.5 font-mono">
                  <Calendar size={10} />
                  {date}
                </p>
                <Link
                  to="/contact-us"
                  className="text-gold-500 hover:text-gold-600 text-[12px] font-semibold
                             transition-colors duration-200 flex items-center gap-1.5"
                >
                  Questions? Contact us
                  <ArrowRight size={10} />
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </motion.div>
  )
}
