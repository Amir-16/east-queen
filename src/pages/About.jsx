import { motion } from 'framer-motion'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { LightBulbIcon, RocketLaunchIcon, HeartIcon } from '@heroicons/react/24/outline'
import PageHero from '../components/ui/PageHero'
import SectionTitle from '../components/ui/SectionTitle'
import StatsSection from '../components/sections/home/StatsSection'
import ContactCTASection from '../components/sections/home/ContactCTASection'
import { fadeInLeft, fadeInRight, fadeInUp, staggerContainer } from '../utils/animations'

const coreValues = [
  { icon: CheckCircleIcon, title: 'Quality First', desc: 'We never compromise on materials or workmanship. Every project meets international standards.' },
  { icon: LightBulbIcon, title: 'Innovation', desc: 'We adopt modern technologies and industry best practices to deliver cutting-edge solutions.' },
  { icon: HeartIcon, title: 'Client Focus', desc: 'Long-term relationships built on trust, integrity, and exceptional customer service.' },
  { icon: RocketLaunchIcon, title: 'Commitment', desc: "From consultation to completion and beyond, we are dedicated to your project's success." },
]

const services = [
  'Supply and Installation of Sports Facilities',
  'Refurbishment and Maintenance of Sports Courts',
  'Sports Flooring Systems',
  'Indoor and Outdoor Flooring Solutions',
  'Chain Link, Mesh, and Perimeter Fencing',
  'Civil Works and Site Development',
  'Repair and Maintenance Services',
  'Custom Sports and Recreational Infrastructure Solutions',
]

export default function About() {
  return (
    <>
      <PageHero
        title="About"
        highlight="Jonith Bogdad"
        subtitle="Over a decade of delivering world-class technical services across the UAE."
        breadcrumbs={[{ label: 'About' }]}
        image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
      />

      {/* Story Section */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
                  alt="Our team"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border-4 border-accent/25 -z-10" />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -left-6 bg-primary rounded-2xl p-5 text-white"
              >
                <div className="font-display font-black text-3xl">10+</div>
                <div className="text-white/70 text-sm">Years in UAE</div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <SectionTitle
                tag="Our Story"
                title="Who We"
                highlight="Are"
                description=""
                center={false}
              />
              <p className="text-dark-300 leading-relaxed mb-4">
                <strong className="text-dark">Jonith Bogdad Technical Services L.L.C</strong> is a Dubai-based technical services company specializing in the supply, installation, refurbishment, and maintenance of sports facilities, flooring systems, fencing solutions, and civil works.
              </p>
              <p className="text-dark-300 leading-relaxed mb-6">
                With a strong focus on quality craftsmanship, safety, and customer satisfaction, our experienced team ensures that every project is completed efficiently, on time, and to the highest industry standards. We serve commercial, residential, educational, and government clients across the UAE.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((s) => (
                  <div key={s} className="flex items-start gap-2 text-sm text-dark-300">
                    <CheckCircleIcon className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    {s}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-light">
        <div className="container-custom">
          <SectionTitle
            tag="Our Purpose"
            title="Vision &"
            highlight="Mission"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="card p-8 border-t-4 border-primary"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                <LightBulbIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-xl text-dark mb-4">Our Vision</h3>
              <p className="text-dark-300 leading-relaxed">
                To become one of the UAE's most trusted and preferred technical services companies by delivering innovative, sustainable, and high-quality solutions that exceed client expectations.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card p-8 border-t-4 border-accent"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-5">
                <RocketLaunchIcon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display font-bold text-xl text-dark mb-4">Our Mission</h3>
              <ul className="space-y-3">
                {[
                  'Provide professional, reliable, and cost-effective technical services.',
                  'Maintain the highest standards of quality, safety, and workmanship.',
                  'Build long-term relationships through trust, integrity, and exceptional customer service.',
                  'Continuously improve by adopting modern technologies and best practices.',
                ].map((m) => (
                  <li key={m} className="flex items-start gap-2 text-dark-300 text-sm">
                    <CheckCircleIcon className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    {m}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle tag="Our Foundation" title="Core" highlight="Values" />
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {coreValues.map((v) => (
              <motion.div key={v.title} variants={fadeInUp} className="card p-7 text-center group hover:border-primary/20 border border-transparent">
                <div className="w-14 h-14 bg-primary/10 group-hover:bg-primary rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors duration-300">
                  <v.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="font-display font-bold text-dark text-base mb-2">{v.title}</h4>
                <p className="text-dark-300 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <StatsSection />
      <ContactCTASection />
    </>
  )
}
