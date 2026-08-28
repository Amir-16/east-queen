import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { pageTransition, stagger, fadeUp } from '@/lib/motion'
import PageHero from '@/components/public/ui/PageHero'
import { companies as defaultCompanies } from '@/data/companies'

export default function Companies({ companies = defaultCompanies }) {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <PageHero
        title="Our Companies"
        subtitle="Six specialised entities working together across Bangladesh's industrial, trading, and maritime landscape."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Companies' }]}
        image="/images/ship-breaking/yard-wide-1.jpeg"
      />

      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <motion.p variants={fadeUp} className="text-gold-500 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">Group Members</motion.p>
            <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-5" />
            <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h2 text-navy-900">The East Queen Group</motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company, i) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-navy-300 hover:shadow-hover transition-all duration-300"
              >
                {/* Cover image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={company.coverImage}
                    alt={company.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                  {company.logo && (
                    <div className="absolute bottom-4 left-5 w-10 h-10 rounded-xl overflow-hidden bg-white shadow-card">
                      <img src={company.logo} alt={company.name + ' logo'} className="w-full h-full object-contain p-1.5" />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <p className="text-[10px] text-gold-500 uppercase tracking-widest font-semibold mb-1.5">{company.industry}</p>
                  <h3 className="font-playfair font-bold text-xl text-navy-900 mb-2 group-hover:text-navy-700 transition-colors">{company.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">{company.description}</p>

                  {company.services?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {company.services.slice(0, 3).map((s) => (
                        <span key={s} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] rounded-full font-medium">{s}</span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Link
                      href={`/companies/${company.id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-gold-500 transition-colors"
                    >
                      View Details <ArrowRight size={14} />
                    </Link>
                    {company.website && (
                      <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-navy-700 transition-colors">
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
