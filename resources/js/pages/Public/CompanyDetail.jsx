import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { ExternalLink, ArrowLeft, ArrowRight, Building2, Globe, Users, Calendar } from 'lucide-react'
import { pageTransition, stagger, fadeUp, fadeLeft, fadeRight } from '@/lib/motion'
import { companies as defaultCompanies } from '@/data/companies'

function NotFoundFallback({ slug }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <p className="text-slate-400 mb-4">Company "{slug}" not found.</p>
      <Link href="/companies" className="text-gold-500 font-semibold hover:underline">← Back to Companies</Link>
    </div>
  )
}

export default function CompanyDetail({ slug, companies = defaultCompanies }) {
  const company = companies.find((c) => c.id === slug) || defaultCompanies.find((c) => c.id === slug)

  if (!company) return <NotFoundFallback slug={slug} />

  const otherCompanies = (companies.length ? companies : defaultCompanies).filter((c) => c.id !== company.id)

  const META = [
    { icon: Building2, label: 'Industry',   value: company.industry           },
    { icon: Calendar,  label: 'Founded',    value: company.founded             },
    { icon: Users,     label: 'Team Size',  value: company.teamSize            },
    { icon: Globe,     label: 'Website',    value: company.website, isLink: true },
  ].filter((m) => m.value)

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden bg-navy-950 flex items-end">
        <img
          src={company.coverImage}
          alt={company.name}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/10" />

        <div className="relative z-10 section-container pb-12">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} className="mb-4">
              <Link href="/companies" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs transition-colors">
                <ArrowLeft size={12} /> All Companies
              </Link>
            </motion.div>
            <motion.p variants={fadeUp} className="text-gold-400 text-[11px] font-semibold uppercase tracking-widest mb-2">{company.industry}</motion.p>
            <motion.h1 variants={fadeUp} className="font-playfair font-bold text-h1 text-white mb-3">{company.name}</motion.h1>
            <motion.p variants={fadeUp} className="text-white/55 text-lg max-w-xl">{company.tagline}</motion.p>
          </motion.div>
        </div>
      </div>

      {/* Key facts bar */}
      <div className="bg-navy-900 py-6 border-b border-white/5">
        <div className="section-container">
          <div className="flex flex-wrap gap-6 md:gap-12">
            {META.map(({ icon: Icon, label, value, isLink }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon size={14} className="text-gold-500 shrink-0" />
                <div>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest">{label}</p>
                  {isLink ? (
                    <a href={value} target="_blank" rel="noopener noreferrer" className="text-white/80 text-sm font-medium hover:text-gold-400 transition-colors flex items-center gap-1">
                      {value.replace(/^https?:\/\//, '')} <ExternalLink size={10} />
                    </a>
                  ) : (
                    <p className="text-white/80 text-sm font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Sidebar */}
            <motion.aside
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-1 space-y-6"
            >
              {company.logo && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-center justify-center h-28">
                  <img src={company.logo} alt={company.name + ' logo'} className="max-h-full max-w-full object-contain" />
                </div>
              )}

              {company.services?.length > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-4">Services</p>
                  <ul className="space-y-2">
                    {company.services.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-navy-900 text-navy-900 rounded-xl text-sm font-bold hover:bg-navy-900 hover:text-white transition-all duration-200"
                >
                  Visit Website <ExternalLink size={13} />
                </a>
              )}
              <Link
                href="/contact-us"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-gold-500 hover:bg-gold-600 text-white rounded-xl text-sm font-bold transition-colors"
              >
                Get In Touch
              </Link>
            </motion.aside>

            {/* Body */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              {/* Gallery strip */}
              {company.galleryImages?.length > 0 && (
                <div className="flex gap-3 overflow-x-auto pb-4 mb-8 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
                  {company.galleryImages.map((img, i) => (
                    <div key={i} className="shrink-0 w-48 h-32 rounded-xl overflow-hidden">
                      <img src={img} alt={`${company.name} ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              )}

              {/* Long description */}
              <div className="prose prose-slate prose-sm max-w-none mb-10">
                {(company.longDescription || company.description).split('\n').map((p, i) => p.trim() && <p key={i}>{p}</p>)}
              </div>

              {/* Export items */}
              {company.exportItems?.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold text-navy-900 uppercase text-[11px] tracking-widest mb-4 border-b border-slate-100 pb-3">Export Products</h3>
                  <div className="flex flex-wrap gap-2">
                    {company.exportItems.map((item) => (
                      <span key={item} className="px-3 py-1.5 bg-navy-50 border border-navy-100 text-navy-700 text-xs rounded-lg font-medium">{item}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Import items */}
              {company.importItems?.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold text-navy-900 uppercase text-[11px] tracking-widest mb-4 border-b border-slate-100 pb-3">Import Products</h3>
                  <div className="flex flex-wrap gap-2">
                    {company.importItems.map((item) => (
                      <span key={item} className="px-3 py-1.5 bg-teal-50 border border-teal-100 text-teal-700 text-xs rounded-lg font-medium">{item}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/contact-us" className="inline-flex items-center gap-2 px-7 py-3.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-sm font-bold transition-colors">
                  Enquire Now <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other companies */}
      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <h2 className="font-playfair font-bold text-xl text-navy-900 mb-6">Other Group Companies</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherCompanies.slice(0, 3).map((c) => (
              <Link
                key={c.id}
                href={`/companies/${c.id}`}
                className="group flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4 hover:border-navy-300 hover:shadow-card transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                  <img src={c.coverImage} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gold-500 uppercase tracking-widest font-semibold mb-0.5">{c.industry}</p>
                  <p className="font-semibold text-navy-900 text-sm truncate group-hover:text-navy-700 transition-colors">{c.name}</p>
                </div>
                <ArrowRight size={14} className="text-slate-300 group-hover:text-gold-500 shrink-0 ml-auto transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
