import { useState } from 'react'
import { Head } from '@inertiajs/react'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition } from '@/lib/motion'
import PageHero from '@/components/public/ui/PageHero'
import SectionHeader from '@/components/public/ui/SectionHeader'
import CompanyCard from '@/components/public/cards/CompanyCard'
import { companies as defaultCompanies } from '@/data/companies'

const FILTERS = [
  { label: 'All',          value: 'all'          },
  { label: 'Shipping',     value: 'shipping'     },
  { label: 'Energy',       value: 'energy'       },
  { label: 'Fisheries',    value: 'fisheries'    },
  { label: 'Food',         value: 'food'         },
  { label: 'Construction', value: 'construction' },
  { label: 'Trading',      value: 'trading'      },
]

export default function Companies({ companies = defaultCompanies }) {
  const [active, setActive] = useState('all')

  const filtered = active === 'all' ? companies : companies.filter((c) => c.industry === active)

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <Head title="Our Companies | East Queen Group" />
      <PageHero
        title="Our Companies"
        subtitle="Six specialised entities working together across Bangladesh's industrial, trading, and maritime landscape."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Companies' }]}
        image="/images/ship-breaking/yard-wide-1.jpeg"
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
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className={`relative px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active === f.value
                    ? 'text-white shadow-card'
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
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.28 }}
                >
                  <CompanyCard company={company} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
