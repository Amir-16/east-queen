import { useState } from 'react'
import { Link } from '@inertiajs/react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Building2 } from 'lucide-react'
import { companies } from '@/data/companies'
import SectionHeader from '@/components/public/ui/SectionHeader'

const industryLabels = {
  trading:      'International Trade',
  shipping:     'Maritime / Ship Breaking',
  energy:       'LPG Energy',
  fisheries:    'Fisheries & Agri',
  construction: 'Construction Materials',
  food:         'Food Trading',
}

export default function CompaniesPreview({ companiesData = companies }) {
  const [hovered, setHovered] = useState(null)

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
            href="/companies"
            className="group inline-flex items-center gap-2 text-gold-500 hover:text-gold-600
                       font-semibold text-sm transition-colors duration-200 shrink-0 self-start lg:self-auto"
          >
            View All Companies
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] grid-rows-auto gap-3">

          {/* Featured — spans 2 cols */}
          {companiesData[0] && (
            <motion.div
              className="relative overflow-hidden rounded-2xl lg:col-span-2 h-[260px] md:h-[340px] lg:h-[420px] group cursor-pointer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onMouseEnter={() => setHovered(companiesData[0].id)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link href={`/companies/${companiesData[0].id}`} className="absolute inset-0 z-10" aria-label={companiesData[0].name} />
              <img
                src={companiesData[0].coverImage}
                alt={companiesData[0].name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center
                           scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-900/50 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-8 z-20 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 text-gold-400 text-[10px] font-bold
                                 uppercase tracking-[0.25em] mb-3">
                  <Building2 size={10} />
                  {industryLabels[companiesData[0].industry] ?? companiesData[0].industry}
                </span>
                <h3 className="font-playfair font-bold text-white text-2xl lg:text-3xl leading-tight mb-2">
                  {companiesData[0].name}
                </h3>
                <AnimatePresence>
                  {hovered === companiesData[0].id ? (
                    <motion.div
                      key="hover"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.22 }}
                    >
                      <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-md line-clamp-2">
                        {companiesData[0].description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-gold-400
                                       text-xs font-bold uppercase tracking-[0.2em]">
                        Explore Company <ArrowRight size={11} />
                      </span>
                    </motion.div>
                  ) : (
                    <motion.p key="tagline" className="text-white/50 text-sm line-clamp-1" initial={false}>
                      {companiesData[0].tagline}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Tall right card */}
          {companiesData[1] && (
            <motion.div
              className="relative overflow-hidden rounded-2xl h-[220px] md:h-[280px] lg:h-[420px] group cursor-pointer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onMouseEnter={() => setHovered(companiesData[1].id)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link href={`/companies/${companiesData[1].id}`} className="absolute inset-0 z-10" aria-label={companiesData[1].name} />
              <img
                src={companiesData[1].coverImage}
                alt={companiesData[1].name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center
                           scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-900/55 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 pointer-events-none">
                <span className="text-gold-400 text-[9px] font-bold uppercase tracking-[0.25em] mb-2">
                  {industryLabels[companiesData[1].industry] ?? companiesData[1].industry}
                </span>
                <h3 className="font-playfair font-bold text-white text-xl leading-tight mb-1">
                  {companiesData[1].name}
                </h3>
                <AnimatePresence>
                  {hovered === companiesData[1].id ? (
                    <motion.span
                      key="hover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="inline-flex items-center gap-1.5 text-gold-400 text-xs font-bold
                                 uppercase tracking-wider mt-2"
                    >
                      Explore <ArrowRight size={10} />
                    </motion.span>
                  ) : (
                    <p key="tagline" className="text-white/45 text-xs line-clamp-1">{companiesData[1].tagline}</p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Bottom row — smaller cards */}
          {companiesData.slice(2).map((company, i) => (
            <motion.div
              key={company.id}
              className="relative overflow-hidden rounded-2xl h-[160px] sm:h-[200px] group cursor-pointer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              onMouseEnter={() => setHovered(company.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link href={`/companies/${company.id}`} className="absolute inset-0 z-10" aria-label={company.name} />
              <img
                src={company.coverImage}
                alt={company.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center
                           scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-900/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 z-20 pointer-events-none">
                <span className="text-gold-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-1.5">
                  {industryLabels[company.industry] ?? company.industry}
                </span>
                <h3 className="font-playfair font-bold text-white text-base leading-tight">
                  {company.name}
                </h3>
                <AnimatePresence>
                  {hovered === company.id && (
                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="inline-flex items-center gap-1 text-gold-400 text-[10px] font-bold
                                 uppercase tracking-wider mt-1.5"
                    >
                      Explore <ArrowRight size={9} />
                    </motion.span>
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
