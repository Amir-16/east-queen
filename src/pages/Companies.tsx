import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition } from '@/lib/motion'
import PageHero from '@/components/ui/PageHero'
import SectionHeader from '@/components/ui/SectionHeader'
import { companies } from '@/data'
import { INDUSTRY_COLORS } from '@/lib/constants'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import type { Company } from '@/types'

type Filter = 'all' | Company['industry']

const filters: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Shipping', value: 'shipping' },
  { label: 'Energy', value: 'energy' },
  { label: 'Fisheries', value: 'fisheries' },
  { label: 'Food', value: 'food' },
  { label: 'Construction', value: 'construction' },
  { label: 'Trading', value: 'trading' },
]

export default function Companies() {
  const [active, setActive] = useState<Filter>('all')

  const filtered = active === 'all' ? companies : companies.filter((c) => c.industry === active)

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <PageHero
        title="Our Companies"
        subtitle="Six specialized subsidiaries, each a leader in its sector, united under one trusted group."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Our Companies' }]}
        image="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&q=80"
      />

      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <SectionHeader
            eyebrow="Our Portfolio"
            title="Six Companies. One Vision."
            subtitle="From maritime operations to agricultural exports, our portfolio spans the most strategic sectors of industrial Bangladesh."
            align="center"
            className="mb-12"
          />

          {/* Filter bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className={`relative px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active === f.value
                    ? 'bg-navy-900 text-white shadow-card'
                    : 'bg-white text-slate-600 hover:text-navy-900 border border-slate-200 hover:border-navy-900/30'
                }`}
              >
                {active === f.value && (
                  <motion.span
                    layoutId="filter-active"
                    className="absolute inset-0 bg-navy-900 rounded-xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative">{f.label}</span>
              </button>
            ))}
          </div>

          {/* Companies grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((company) => (
                <motion.div
                  key={company.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden hover:shadow-hover hover:border-gold-300/40 transition-all duration-300 group"
                >
                  {/* Top bar */}
                  <div className={`h-2 w-full bg-gradient-to-r ${company.color}`} />

                  {/* Cover — white logo panel */}
                  <div className="relative h-44 bg-white border-b border-slate-100">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-full h-full object-contain p-6"
                    />
                    <span className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${INDUSTRY_COLORS[company.industry]}`}>
                      {company.industry}
                    </span>
                  </div>

                  <div className="p-7">
                    <h3 className="font-inter font-bold text-navy-900 text-xl mb-1.5 group-hover:text-gold-600 transition-colors duration-200">
                      {company.name}
                    </h3>
                    <p className="text-gold-600 text-xs font-medium italic mb-4">{company.tagline}</p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">{company.description}</p>

                    {/* Services */}
                    <div className="space-y-2 mb-7">
                      {company.services.map((s) => (
                        <div key={s} className="flex items-center gap-2.5 text-sm text-slate-600">
                          <CheckCircle2 size={13} className="text-gold-500 shrink-0" />
                          {s}
                        </div>
                      ))}
                    </div>

                    <button className="group/btn inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-sm font-semibold rounded-xl transition-colors duration-200">
                      Send Enquiry
                      <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
