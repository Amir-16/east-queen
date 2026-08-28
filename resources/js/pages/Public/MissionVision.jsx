import { motion } from 'framer-motion'
import { pageTransition, stagger, fadeUp, fadeLeft, fadeRight } from '@/lib/motion'
import PageHero from '@/components/public/ui/PageHero'

const PILLARS = [
  {
    tag:   'Mission',
    title: 'Why We Exist',
    body:  "To build enduring business relationships by delivering industrial excellence, reliable trade solutions, and sustainable practices — creating real value for our clients, employees, and the communities we serve across Bangladesh and global markets.",
    image: '/images/ship-breaking/workers-2.jpeg',
    bg:    'bg-navy-950',
    text:  'text-white',
  },
  {
    tag:   'Vision',
    title: 'Where We Are Going',
    body:  "To become the most trusted and diversified industrial conglomerate in South Asia — expanding our ship recycling, energy, export, and food businesses while upholding the highest standards of environmental responsibility and corporate governance.",
    image: '/images/ship-breaking/coastal-view.jpeg',
    bg:    'bg-slate-50',
    text:  'text-navy-900',
    reverse: true,
  },
  {
    tag:   'Purpose',
    title: 'What Drives Us',
    body:  "We believe that business growth and community uplift are inseparable. Every ship we recycle creates hundreds of livelihoods. Every ton of produce we export carries Bangladesh's agricultural potential to the world. Every gallon of gas we distribute powers homes and factories. That ripple effect — from Chittagong to the globe — is our purpose.",
    image: '/images/ship-breaking/yard-wide-1.jpeg',
    bg:    'bg-navy-900',
    text:  'text-white',
  },
]

export default function MissionVision() {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <PageHero
        title="Mission, Vision & Purpose"
        subtitle="The strategic direction and long-term commitments that guide everything we do."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Mission & Vision' }]}
        image="/images/ship-breaking/yard-wide-1.jpeg"
      />

      {PILLARS.map(({ tag, title, body, image, bg, text, reverse }, i) => (
        <section key={tag} className={`${bg} section-padding overflow-hidden`}>
          <div className="section-container">
            <div className={`grid lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:grid-flow-col-dense' : ''}`}>
              <motion.div
                variants={reverse ? fadeRight : fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className={reverse ? 'lg:col-start-2' : ''}
              >
                <p className={`text-[11px] font-bold uppercase tracking-[0.35em] mb-3 ${i === 1 ? 'text-gold-500' : 'text-gold-400'}`}>{tag}</p>
                <div className="h-[2px] w-10 bg-gold-500 rounded-full mb-6" />
                <h2 className={`font-playfair font-bold text-h2 mb-6 ${text}`}>{title}</h2>
                <p className={`leading-relaxed text-body-lg ${i === 1 ? 'text-slate-600' : 'text-white/60'}`}>{body}</p>
              </motion.div>

              <motion.div
                variants={reverse ? fadeLeft : fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className={reverse ? 'lg:col-start-1 lg:row-start-1' : ''}
              >
                <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-deep">
                  <img src={image} alt={tag} className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </motion.div>
  )
}
