import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { ArrowRight } from 'lucide-react'
import { stagger, fadeUp } from '@/lib/motion'
import { companies } from '@/data/companies'

export default function CompaniesPreview({ companiesData = companies }) {
  const [featured, tall, ...rest] = companiesData

  return (
    <section className="section-padding bg-slate-50">
      <div className="section-container">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mb-12"
        >
          <motion.p variants={fadeUp} className="text-gold-500 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">
            Our Portfolio
          </motion.p>
          <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-5" />
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h2 text-navy-900">
              Companies of the Group
            </motion.h2>
            <motion.div variants={fadeUp}>
              <Link
                href="/companies"
                className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-600 text-sm font-semibold transition-colors"
              >
                View All <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">

          {/* Featured — col-span-2 row-span-2 */}
          {featured && (
            <CompanyCard company={featured} className="col-span-2 row-span-2" size="lg" />
          )}

          {/* Tall right card */}
          {tall && (
            <CompanyCard company={tall} className="col-span-1 row-span-2" size="md" />
          )}

          {/* 4 small cards */}
          {rest.slice(0, 4).map((c) => (
            <CompanyCard key={c.id} company={c} className="col-span-1 row-span-1" size="sm" />
          ))}
        </div>
      </div>
    </section>
  )
}

function CompanyCard({ company, className = '', size = 'sm' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45 }}
      whileHover={{ scale: 1.015, transition: { duration: 0.22 } }}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${className}`}
    >
      <Link href={`/con-${company.id}`} className="absolute inset-0 z-10" aria-label={company.name} />

      {/* Background image */}
      {company.coverImage ? (
        <img
          src={company.coverImage}
          alt={company.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      ) : (
        <div className="absolute inset-0" style={{ backgroundColor: company.color ?? '#1e3a5f' }} />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent" />

      {/* Content */}
      <div className={`absolute inset-0 flex flex-col justify-end ${size === 'lg' ? 'p-8' : 'p-4'}`}>
        <p className="text-gold-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {company.industry}
        </p>
        <h3 className={`font-playfair font-bold text-white leading-tight ${size === 'lg' ? 'text-2xl mb-3' : size === 'md' ? 'text-lg mb-2' : 'text-sm mb-1'}`}>
          {company.name}
        </h3>
        {size !== 'sm' && (
          <p className="text-white/55 text-xs leading-relaxed line-clamp-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {company.tagline}
          </p>
        )}
        <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Explore <ArrowRight size={12} />
        </div>
      </div>
    </motion.div>
  )
}
