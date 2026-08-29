import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { ArrowRight } from 'lucide-react'
import { pageTransition, stagger, fadeUp } from '@/lib/motion'
import PageHero from '@/components/public/ui/PageHero'
import SectionHeader from '@/components/public/ui/SectionHeader'
import AssociateCard from '@/components/public/cards/AssociateCard'
import { associates as defaultAssociates } from '@/data/associates'

export default function Associates({ associates = defaultAssociates }) {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <PageHero
        title="Business Associates"
        subtitle="A trusted global network of partners spanning Bangladesh, the Middle East, Asia, and Europe."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Business Associates' }]}
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80"
      />

      <section className="section-padding bg-white">
        <div className="section-container">
          <SectionHeader
            eyebrow="Our Partners"
            title="Trusted Partners Across the Globe"
            subtitle="Our business network is built on decades of trust, mutual growth, and shared commitment to quality."
            align="center"
            className="mb-12"
          />

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {associates.map((associate) => (
              <motion.div key={associate.id} variants={fadeUp}>
                <AssociateCard associate={associate} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 p-6 sm:p-10 bg-navy-900 rounded-2xl text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-pattern" />
            <div className="relative">
              <h3 className="font-playfair font-bold text-white text-h3 mb-4">Become a Business Partner</h3>
              <p className="text-white/60 text-base mb-8 max-w-lg mx-auto">
                We are always open to new partnerships that align with our values of quality, integrity, and mutual growth.
              </p>
              <Link
                href="/contact-us"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold rounded-xl transition-all duration-200 text-sm hover:shadow-gold-glow"
              >
                Get In Touch
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
