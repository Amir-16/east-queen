import { motion } from 'framer-motion'
import { pageTransition, staggerSlow, fadeDown, scaleIn } from '@/lib/motion'
import PageHero from '@/components/ui/PageHero'

const pillars = [
  {
    num: '01',
    label: 'Mission',
    heading: 'Excellence Through Integrity',
    body: 'Delivering industrial excellence through ethical, reliable trade and service that creates lasting value for clients, employees, and communities.',
    detail:
      'Every shipment, contract, and handshake is guided by the same commitment: to do what we say, deliver what we promise, and stand behind our work unconditionally. This commitment has defined us since 1982.',
    img: '/images/shipping/tristar-prosperity.jpeg',
  },
  {
    num: '02',
    label: 'Vision',
    heading: 'The Most Trusted Conglomerate in South Asia',
    body: 'To be the most trusted diversified conglomerate in South Asian markets, setting standards in quality, compliance, and international partnership.',
    detail:
      'We envision a future where East Queen Group is synonymous with reliability — a partner of choice for businesses from Chittagong to Chicago, Tokyo to London. Every decision we make today is a step toward that future.',
    img: '/images/shipping/vessel-1.jpeg',
  },
  {
    num: '03',
    label: 'Purpose',
    heading: "Connecting Bangladesh to the World",
    body: "To connect Bangladesh's industrial strength with global demand — driving economic growth while upholding the highest standards of integrity.",
    detail:
      "Bangladesh has enormous industrial potential. Our purpose is to be the bridge — creating pathways for this strength to reach global markets and returning tangible value to the communities that power our operations.",
    img: '/images/products/exports/mill-scale/mill-1.jpeg',
  },
]

export default function MissionVision() {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <PageHero
        title="Mission, Vision & Purpose"
        subtitle="The three pillars that define who we are, where we are going, and why it matters."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '/about-east-queen' },
          { label: 'Mission & Vision' },
        ]}
        image="/images/shipping/vessel-1.jpeg"
      />

      {pillars.map(({ num, label, heading, body, detail, img }, i) => {
        const isEven = i % 2 === 0
        return (
          <section
            key={label}
            className={`section-padding relative overflow-hidden ${isEven ? 'bg-white' : 'bg-slate-50'}`}
          >
            {isEven && (
              <div className="absolute inset-0 bg-light-grid pointer-events-none opacity-50" />
            )}

            <div className="section-container relative">
              <div
                className={`grid lg:grid-cols-2 gap-8 lg:gap-14 xl:gap-24 items-center ${
                  !isEven ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Image */}
                <motion.div
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  className="relative"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-hover">
                    <img
                      src={img}
                      alt={label}
                      className="w-full aspect-[4/3] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-navy-900/30 to-transparent" />

                    {/* Number badge */}
                    <div className="absolute top-5 left-5 bg-gold-500 rounded-xl px-4 py-3 shadow-gold-glow">
                      <p className="font-mono font-black text-white text-xl leading-none">{num}</p>
                    </div>

                    {/* Label */}
                    <div className="absolute bottom-5 right-5 bg-white/10 backdrop-blur-sm
                                    border border-white/20 rounded-lg px-4 py-2">
                      <p className="text-white text-xs font-semibold uppercase tracking-widest">{label}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Text — every element falls from above */}
                <motion.div
                  variants={staggerSlow}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                >
                  <motion.div variants={fadeDown} className="flex items-center gap-3 mb-5">
                    <div className="gold-rule" />
                    <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest">
                      {num} · {label}
                    </span>
                  </motion.div>

                  <motion.h2
                    variants={fadeDown}
                    className="font-playfair font-bold text-h1 text-slate-900 leading-tight mb-6"
                  >
                    {heading}
                  </motion.h2>

                  <motion.p variants={fadeDown} className="text-slate-600 text-lg leading-relaxed mb-5">
                    {body}
                  </motion.p>

                  <motion.p variants={fadeDown} className="text-slate-500 leading-relaxed">
                    {detail}
                  </motion.p>

                  <motion.div variants={fadeDown} className="mt-8 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="gold-rule" />
                      <span className="text-slate-400 text-sm">East Queen Group · Since 1982</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Bottom — dark accent bar */}
      <section className="py-20 bg-navy-900 relative overflow-hidden">
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
              className="font-playfair italic text-white/75 text-xl sm:text-2xl leading-relaxed mb-8"
            >
              These are not aspirational statements — they are the principles
              we have lived by for over four decades.
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
