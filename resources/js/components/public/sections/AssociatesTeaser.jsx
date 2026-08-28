import { motion } from 'framer-motion'
import { stagger, fadeUp } from '@/lib/motion'
import { companies } from '@/data/companies'
import { associates } from '@/data/associates'

function LogoCard({ name, initials, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -4, scale: 1.03, transition: { duration: 0.2 } }}
      className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center gap-3 shadow-card hover:shadow-hover hover:border-gold-200 transition-all duration-300 cursor-default"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-mono font-bold text-sm"
        style={{ backgroundColor: color ?? '#1e3a5f' }}
      >
        {initials}
      </div>
      <p className="text-slate-700 font-semibold text-xs text-center leading-snug">{name}</p>
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
              <LogoCard
                key={c.id}
                name={c.name}
                initials={c.name.slice(0, 2).toUpperCase()}
                color={c.color}
                delay={i * 0.06}
              />
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
              <LogoCard
                key={a.id}
                name={a.name}
                initials={a.initials}
                color={a.color}
                delay={i * 0.06}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
