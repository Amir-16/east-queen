import { motion } from 'framer-motion'
import { Shield, Target, Handshake, Lightbulb } from 'lucide-react'
import { pageTransition, staggerSlow, fadeDown, stagger } from '@/lib/motion'
import PageHead from '@/components/public/ui/PageHead'
import PageHero from '@/components/public/ui/PageHero'

const values = [
  {
    icon:    Shield,
    num:     '01',
    title:   'Integrity',
    tagline: 'We say what we mean. We do what we say.',
    desc:    'Ethical practices and transparent dealings in every transaction. Our partners trust us because we have never compromised on honesty — not in good times, not in difficult ones.',
    detail:  'Integrity is our most valuable asset. In an industry where relationships are everything, our word is our bond. Every contract, every negotiation, every delivery reflects this core commitment.',
  },
  {
    icon:    Target,
    num:     '02',
    title:   'Quality',
    tagline: 'International standards. No exceptions.',
    desc:    'Strict adherence to international standards across all operations. We comply with ISO requirements, industry certifications, and regulatory frameworks in every market we serve.',
    detail:  'Quality is not a checklist — it is a culture. From sourcing to delivery, every step is governed by documented processes and third-party verification that our partners can trust and audit.',
  },
  {
    icon:    Handshake,
    num:     '03',
    title:   'Partnership',
    tagline: 'Long-term relationships over short-term gains.',
    desc:    "Long-term relationships built on trust and mutual success. We invest in understanding our partners' businesses and growing alongside them — not just transacting with them.",
    detail:  'We measure our success not just in revenue, but in the longevity of our partnerships. Many of our most valued business relationships span more than a decade — a testament to this commitment.',
  },
  {
    icon:    Lightbulb,
    num:     '04',
    title:   'Innovation',
    tagline: 'Always improving. Always adapting.',
    desc:    'Continuously improving processes to meet evolving market needs. We embrace change as an opportunity, investing in digital infrastructure and operational efficiency year after year.',
    detail:  'Four decades in business requires constant reinvention. We have evolved from a local ship-breaking operation to a multi-continent trading conglomerate by embracing innovation at every stage of growth.',
  },
]

export default function CoreValues() {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <PageHead title="Core Values" />
      <PageHero
        title="Our Core Values"
        subtitle="Four principles that have guided every decision, every partnership, and every milestone for over four decades."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '/about-east-queen' },
          { label: 'Core Values' },
        ]}
        image="/images/shipping/harmonia-arrival.jpeg"
      />

      {/* Intro */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-light-grid pointer-events-none opacity-50" />
        <div className="section-container relative">
          <motion.div
            variants={staggerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeDown} className="flex justify-center mb-5">
              <div className="flex items-center gap-3">
                <div className="gold-rule" />
                <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest">
                  What We Stand For
                </span>
                <div className="gold-rule" />
              </div>
            </motion.div>

            <motion.h2
              variants={fadeDown}
              className="font-playfair font-bold text-h1 text-slate-900 leading-tight mb-6"
            >
              Values That Drive<br />
              <span className="text-gradient-gold">Every Decision</span>
            </motion.h2>

            <motion.p variants={fadeDown} className="text-slate-500 text-lg leading-relaxed">
              These are not aspirational statements — they are the operational principles proven across
              40+ years of global trade, tested through market cycles, geopolitical shifts, and the
              evolving demands of international business.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Values grid */}
      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <motion.div
            className="grid md:grid-cols-2 gap-4 md:gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {values.map(({ icon: Icon, num, title, tagline, desc, detail }, i) => (
              <motion.div
                key={title}
                variants={fadeDown}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm-card
                           border border-slate-100 hover:border-gold-200 hover:shadow-hover
                           transition-all duration-300 cursor-default"
              >
                {/* Expanding top bar */}
                <div className="h-[3px] bg-gold-500 w-14 group-hover:w-full
                                transition-all duration-500 ease-out" />

                <div className="p-8 xl:p-10">
                  <div className="flex items-start justify-between mb-7">
                    <div className="w-14 h-14 rounded-2xl bg-gold-50 border border-gold-100
                                    flex items-center justify-center
                                    group-hover:bg-gold-500 group-hover:border-gold-500
                                    transition-all duration-300">
                      <Icon
                        size={22}
                        className="text-gold-500 group-hover:text-white transition-colors duration-300"
                      />
                    </div>
                    <span className="font-mono font-black text-[4.5rem] leading-none text-slate-100
                                     group-hover:text-gold-500/15 transition-colors duration-500 select-none">
                      {num}
                    </span>
                  </div>

                  <h3 className="font-playfair font-bold text-slate-900 text-2xl mb-1">{title}</h3>
                  <p className="text-gold-500 text-sm font-semibold italic mb-5">"{tagline}"</p>
                  <p className="text-slate-600 leading-relaxed">{desc}</p>

                  <div className="overflow-hidden max-h-0 group-hover:max-h-48
                                  transition-all duration-500 ease-out">
                    <p className="text-slate-400 text-sm leading-relaxed pt-5 mt-4 border-t border-slate-100">
                      {detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Chairman quote */}
      <section className="py-24 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[3px]
                        bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
        <div className="section-container relative">
          <motion.div
            variants={staggerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.span
              variants={fadeDown}
              className="block font-playfair font-black text-[6rem] leading-none
                         text-gold-500/15 select-none -mb-4"
            >
              "
            </motion.span>
            <motion.p
              variants={fadeDown}
              className="font-playfair italic text-white/80 text-xl sm:text-2xl leading-relaxed mb-8"
            >
              At East Queen Group, our values are not just words on a wall — they are the
              lived experience of every interaction with our partners, employees, and communities.
            </motion.p>
            <motion.div variants={fadeDown} className="flex flex-col items-center gap-2">
              <div className="gold-rule" />
              <p className="text-gold-500 text-sm font-semibold uppercase tracking-wider mt-3">
                A K M Abu Taher BSc.
              </p>
              <p className="text-white/40 text-xs uppercase tracking-widest">
                Chairman, East Queen Group
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
