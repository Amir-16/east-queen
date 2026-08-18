import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Building2 } from 'lucide-react'
import { companies } from '@/data'
import SectionHeader from '@/components/ui/SectionHeader'

const industryLabels: Record<string, string> = {
  trading:      'International Trade',
  shipping:     'Maritime / Ship Breaking',
  energy:       'LPG Energy',
  fisheries:    'Fisheries & Agri',
  construction: 'Construction Materials',
  food:         'Food Trading',
}

export default function CompaniesPreview() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section className="section-padding bg-slate-50 overflow-hidden">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="Our Portfolio"
            title="Six Companies. One Vision."
            subtitle="A carefully built portfolio spanning the most strategic sectors of Bangladesh's industrial economy."
          />
          <Link
            to="/companies"
            className="group inline-flex items-center gap-2 text-gold-500 hover:text-gold-600
                       font-semibold text-sm transition-colors duration-200 shrink-0 self-start lg:self-auto"
          >
            View All Companies
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* ── Large feature card (first company) + grid ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] grid-rows-auto gap-3">

          {/* Featured company — spans 2 cols */}
          {companies[0] && (
            <motion.div
              className="relative overflow-hidden rounded-2xl lg:col-span-2 h-[340px] lg:h-[420px] group cursor-pointer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onMouseEnter={() => setHovered(companies[0].id)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={companies[0].coverImage}
                alt={companies[0].name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center
                           scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-900/50 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <span className="inline-flex items-center gap-1.5 text-gold-400 text-[10px] font-bold
                                 uppercase tracking-[0.25em] mb-3">
                  <Building2 size={10} />
                  {industryLabels[companies[0].industry] ?? companies[0].industry}
                </span>
                <h3 className="font-playfair font-bold text-white text-2xl lg:text-3xl leading-tight mb-2">
                  {companies[0].name}
                </h3>
                <AnimatePresence>
                  {hovered === companies[0].id && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.22 }}
                    >
                      <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-md line-clamp-2">
                        {companies[0].description}
                      </p>
                      <Link
                        to={`/con-${companies[0].id}`}
                        className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300
                                   text-xs font-bold uppercase tracking-[0.2em] transition-colors"
                      >
                        Explore Company <ArrowRight size={11} />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
                {hovered !== companies[0].id && (
                  <p className="text-white/50 text-sm line-clamp-1">{companies[0].tagline}</p>
                )}
              </div>
            </motion.div>
          )}

          {/* Third company (tall right card) */}
          {companies[1] && (
            <motion.div
              className="relative overflow-hidden rounded-2xl h-[280px] lg:h-[420px] group cursor-pointer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onMouseEnter={() => setHovered(companies[1].id)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={companies[1].coverImage}
                alt={companies[1].name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center
                           scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-900/55 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="text-gold-400 text-[9px] font-bold uppercase tracking-[0.25em] mb-2">
                  {industryLabels[companies[1].industry] ?? companies[1].industry}
                </span>
                <h3 className="font-playfair font-bold text-white text-xl leading-tight mb-1">
                  {companies[1].name}
                </h3>
                <AnimatePresence>
                  {hovered === companies[1].id ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Link
                        to={`/con-${companies[1].id}`}
                        className="inline-flex items-center gap-1.5 text-gold-400 text-xs font-bold
                                   uppercase tracking-wider transition-colors mt-2"
                      >
                        Explore <ArrowRight size={10} />
                      </Link>
                    </motion.div>
                  ) : (
                    <p className="text-white/45 text-xs line-clamp-1">{companies[1].tagline}</p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Bottom row — 4 smaller cards */}
          {companies.slice(2).map((company, i) => (
            <motion.div
              key={company.id}
              className="relative overflow-hidden rounded-2xl h-[200px] group cursor-pointer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              onMouseEnter={() => setHovered(company.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={company.coverImage}
                alt={company.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center
                           scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-900/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <span className="text-gold-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-1.5">
                  {industryLabels[company.industry] ?? company.industry}
                </span>
                <h3 className="font-playfair font-bold text-white text-base leading-tight">
                  {company.name}
                </h3>
                <AnimatePresence>
                  {hovered === company.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Link
                        to={`/con-${company.id}`}
                        className="inline-flex items-center gap-1 text-gold-400 text-[10px] font-bold
                                   uppercase tracking-wider mt-1.5 transition-colors"
                      >
                        Explore <ArrowRight size={9} />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
