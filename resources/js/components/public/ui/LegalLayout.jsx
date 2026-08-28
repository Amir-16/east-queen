import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { ArrowRight } from 'lucide-react'
import { pageTransition, fadeLeft, fadeRight } from '@/lib/motion'

export default function LegalLayout({ title, eyebrow, date, description, sections = [], otherPage }) {
  const [active, setActive] = useState(sections[0]?.id ?? '')

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      {/* Hero */}
      <section className="bg-navy-950 py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold-500/60 text-[11px] font-bold tracking-[0.35em] uppercase mb-3">{eyebrow}</p>
          <div className="h-[2px] w-10 bg-gold-500 rounded-full mb-6" />
          <h1 className="font-playfair font-bold text-display text-white leading-tight mb-4">{title}</h1>
          {date && <p className="text-white/35 text-sm mb-5">{date}</p>}
          {description && <p className="text-white/55 text-base max-w-xl leading-relaxed">{description}</p>}
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-4 gap-10">

            {/* Sticky sidebar */}
            <motion.aside
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <nav className="sticky top-24 space-y-1">
                <p className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.25em] mb-3 px-3">
                  Contents
                </p>
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setActive(s.id)}
                    className={`block px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      active === s.id
                        ? 'text-gold-600 bg-gold-50 border-l-2 border-gold-500 pl-4 font-semibold'
                        : 'text-slate-500 hover:text-gold-600 hover:bg-slate-50'
                    }`}
                  >
                    {s.title}
                  </a>
                ))}

                {otherPage && (
                  <Link
                    href={otherPage.href}
                    className="mt-6 flex items-center gap-2 text-sm text-navy-900 hover:text-gold-600 font-semibold pt-4 border-t border-slate-100 px-3 transition-colors"
                  >
                    {otherPage.label} <ArrowRight size={13} />
                  </Link>
                )}
              </nav>
            </motion.aside>

            {/* Main content */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3 space-y-10"
            >
              {sections.map((s) => (
                <div key={s.id} id={s.id} className="scroll-mt-28">
                  <h2 className="font-playfair font-bold text-h3 text-navy-900 mb-5 pb-4 border-b border-slate-100">
                    {s.title}
                  </h2>
                  <div className="text-slate-600 leading-relaxed text-[15px] space-y-4 prose-sm max-w-none">
                    {s.content}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
