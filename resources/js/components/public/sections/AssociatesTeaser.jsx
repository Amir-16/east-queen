import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { stagger, fadeUp } from '@/lib/motion'
import { companies } from '@/data/companies'
import { associates } from '@/data/associates'



function CompanyLogoCard({ company, delay = 0 }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -4, scale: 1.03, transition: { duration: 0.2 } }}
    >
      <Link
        href={`/companies/${company.id}`}
        className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center gap-3 shadow-card hover:shadow-hover hover:border-gold-200 transition-all duration-300 group block"
      >
        <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center bg-white border border-slate-100 shadow-sm">
          {company.logo && !imgError ? (
            <img
              src={company.logo}
              alt={company.name}
              className="w-full h-full object-contain p-1"
              loading="lazy"
              decoding="async"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-white font-mono font-bold text-sm"
              style={{ backgroundColor: company.color ?? '#1e3a5f' }}
            >
              {company.name.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        <p className="text-slate-700 group-hover:text-navy-900 font-semibold text-xs text-center leading-snug transition-colors">
          {company.name}
        </p>
      </Link>
    </motion.div>
  )
}

function AssociateLogoCard({ associate, delay = 0 }) {
  const [imgError, setImgError] = useState(false)
  const showLogo = associate.logo && !imgError

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -4, scale: 1.03, transition: { duration: 0.2 } }}
      className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center gap-3 shadow-card hover:shadow-hover hover:border-gold-200 transition-all duration-300 cursor-default"
    >
      <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center bg-white border border-slate-100 shadow-sm">
        {showLogo ? (
          <img
            src={associate.logo}
            alt={associate.name}
            className="w-full h-full object-contain p-1"
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white font-mono font-bold text-sm"
            style={{ backgroundColor: associate.color ?? '#1e3a5f' }}
          >
            {associate.initials}
          </div>
        )}
      </div>
      <p className="text-slate-700 font-semibold text-xs text-center leading-snug">{associate.name}</p>
    </motion.div>
  )
}

export default function AssociatesTeaser({ companiesData = companies, associatesData = associates }) {
  return (
    <section className="section-padding bg-white">
      <div className="section-container space-y-16">

        {/* Group Companies */}
        <div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-8"
          >
            <motion.p variants={fadeUp} className="text-gold-500 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">
              Our Portfolio
            </motion.p>
            <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-5" />
            <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h3 text-navy-900">
              East Queen Group Companies
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {companiesData.map((c, i) => (
              <CompanyLogoCard key={c.id} company={c} delay={i * 0.06} />
            ))}
          </div>
        </div>

        {/* Business Associates */}
        <div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-8"
          >
            <motion.p variants={fadeUp} className="text-gold-500 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">
              Partners
            </motion.p>
            <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-5" />
            <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h3 text-navy-900">
              Business Associates & Partners
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {associatesData.map((a, i) => (
              <AssociateLogoCard key={a.id} associate={a} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
