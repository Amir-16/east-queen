import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import PageHead from '@/components/public/ui/PageHead'
import {
  ArrowRight, Globe, Users, Calendar,
  Briefcase, MapPin, Download, CheckCircle, ChevronRight,
} from 'lucide-react'
import { pageTransition, stagger, fadeUp, fadeLeft, fadeRight } from '@/lib/motion'
const INDUSTRY_LABELS = {
  shipping:     'Maritime & Shipping',
  energy:       'LPG Energy',
  fisheries:    'Fisheries & Agriculture',
  food:         'Food & Trade',
  construction: 'Construction Materials',
  trading:      'International Trading',
}

export default function CompanyDetail({ company, otherCompanies = [] }) {
  const paragraphs = Array.isArray(company.long_description) && company.long_description.length
    ? company.long_description
    : [company.description]

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <PageHead title={company.name} description={company.description} image={company.cover_image} />

      {/* Hero */}
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden bg-navy-950 flex items-end">
        <img src={company.cover_image} alt={company.name} className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 to-transparent" />

        <div className="relative z-10 section-container pb-12">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.nav variants={fadeUp} className="flex items-center gap-2 text-white/50 text-sm mb-5">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link href="/companies" className="hover:text-white transition-colors">Companies</Link>
              <ChevronRight size={12} />
              <span className="text-gold-400">{company.name}</span>
            </motion.nav>
            <motion.p variants={fadeUp} className="text-gold-400 text-[11px] font-semibold uppercase tracking-widest mb-2">
              {INDUSTRY_LABELS[company.industry] ?? company.industry}
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-playfair font-bold text-h1 text-white mb-3">{company.name}</motion.h1>
            <motion.p variants={fadeUp} className="text-white/65 text-lg max-w-2xl">{company.tagline}</motion.p>
          </motion.div>
        </div>
      </div>

      {/* Key facts bar */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="section-container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {company.founded && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold-50 border border-gold-100 flex items-center justify-center shrink-0">
                  <Calendar size={15} className="text-gold-500" />
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] uppercase tracking-wider">Founded</p>
                  <p className="font-mono font-semibold text-slate-900">{company.founded}</p>
                </div>
              </div>
            )}
            {company.team_size && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold-50 border border-gold-100 flex items-center justify-center shrink-0">
                  <Users size={15} className="text-gold-500" />
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] uppercase tracking-wider">Team</p>
                  <p className="font-mono font-semibold text-slate-900">{company.team_size}+ members</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gold-50 border border-gold-100 flex items-center justify-center shrink-0">
                <Briefcase size={15} className="text-gold-500" />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase tracking-wider">Industry</p>
                <p className="font-semibold text-slate-900 text-sm">{INDUSTRY_LABELS[company.industry] ?? company.industry}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gold-50 border border-gold-100 flex items-center justify-center shrink-0">
                <MapPin size={15} className="text-gold-500" />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase tracking-wider">Based</p>
                <p className="font-semibold text-slate-900 text-sm">Bangladesh</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-12">

            {/* Sidebar */}
            <motion.aside
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="space-y-4"
            >
              {company.logo && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-center min-h-[130px] shadow-sm">
                  <img src={company.logo} alt={company.name + ' logo'} className="max-h-16 max-w-full object-contain" />
                </div>
              )}

              {company.pdf_url && (
                <a
                  href={company.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full bg-white border border-slate-200 p-4 rounded-xl hover:border-gold-300 hover:shadow-card transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-gold-50 border border-gold-100 flex items-center justify-center shrink-0">
                    <Download size={15} className="text-gold-500" />
                  </div>
                  <div>
                    <p className="text-slate-800 font-semibold text-sm group-hover:text-gold-500 transition-colors">Company Profile</p>
                    <p className="text-slate-400 text-xs">Download PDF</p>
                  </div>
                </a>
              )}

              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full bg-white border border-slate-200 p-4 rounded-xl hover:border-gold-300 hover:shadow-card transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-gold-50 border border-gold-100 flex items-center justify-center shrink-0">
                    <Globe size={15} className="text-gold-500" />
                  </div>
                  <div>
                    <p className="text-slate-800 font-semibold text-sm group-hover:text-gold-500 transition-colors">Visit Website</p>
                    <p className="text-slate-400 text-xs truncate">{company.website.replace(/^https?:\/\//, '')}</p>
                  </div>
                </a>
              )}

              {company.services?.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                  <h3 className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.25em] mb-4">Services</h3>
                  <ul className="space-y-2.5">
                    {company.services.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-slate-600 text-sm">
                        <CheckCircle size={14} className="text-gold-500 mt-0.5 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.aside>

            {/* Body */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="md:col-span-2 space-y-6"
            >
              {/* Gallery grid */}
              {company.gallery_images?.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {company.gallery_images.map((img, i) => (
                    <div key={i} className="aspect-video rounded-xl overflow-hidden">
                      <img
                        src={img}
                        alt={`${company.name} ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Long description */}
              <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
                {paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Export + Import items */}
              {company.export_items?.length > 0 && company.import_items?.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                    <h4 className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.25em] mb-3">Export Products</h4>
                    <div className="h-px bg-slate-200 mb-3" />
                    <ul className="space-y-2">
                      {company.export_items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                          <CheckCircle size={13} className="text-gold-500 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                    <h4 className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.25em] mb-3">Import Products</h4>
                    <div className="h-px bg-slate-200 mb-3" />
                    <ul className="space-y-2">
                      {company.import_items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                          <CheckCircle size={13} className="text-gold-500 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <>
                  {company.export_items?.length > 0 && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                      <h4 className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.25em] mb-3">Export Products</h4>
                      <div className="h-px bg-slate-200 mb-3" />
                      <ul className="space-y-2">
                        {company.export_items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                            <CheckCircle size={13} className="text-gold-500 mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {company.import_items?.length > 0 && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                      <h4 className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.25em] mb-3">Import Products</h4>
                      <div className="h-px bg-slate-200 mb-3" />
                      <ul className="space-y-2">
                        {company.import_items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                            <CheckCircle size={13} className="text-gold-500 mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}

              {/* CTA */}
              <div className="pt-5 border-t border-slate-100 flex flex-wrap gap-3">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:shadow-gold-glow"
                >
                  Get In Touch <ArrowRight size={15} />
                </Link>
                <Link
                  href="/companies"
                  className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 hover:border-gold-300 hover:text-gold-500 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200"
                >
                  All Companies
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other companies */}
      <section className="section-padding bg-slate-50 border-t border-slate-200">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-[3px] w-8 bg-gold-500 rounded-full" />
            <h2 className="font-playfair font-bold text-h3 text-slate-900">Other Companies in the Group</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherCompanies.map((c) => (
              <Link
                key={c.id}
                href={`/companies/${c.slug}`}
                className="group flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4 hover:border-gold-300 hover:shadow-card transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-navy-900 group-hover:bg-gold-500 flex items-center justify-center shrink-0 transition-colors duration-200">
                  <span className="text-white font-mono font-bold text-xs">
                    {c.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 font-semibold text-sm truncate">{c.name}</p>
                  <p className="text-slate-400 text-xs">{INDUSTRY_LABELS[c.industry] ?? c.industry}</p>
                </div>
                <ArrowRight size={14} className="text-slate-300 group-hover:text-gold-500 shrink-0 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

    </motion.div>
  )
}
