import { motion } from 'framer-motion'
import {
  StarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import SectionTitle from '../../ui/SectionTitle'
import { fadeInLeft, fadeInRight, fadeInUp, staggerContainer } from '../../../utils/animations'

const reasons = [
  { icon: StarIcon, title: 'Experienced Professionals', desc: 'Over a decade of hands-on expertise delivering complex technical projects across the UAE.' },
  { icon: ShieldCheckIcon, title: 'High-Quality Materials', desc: 'We use only internationally certified materials that meet the highest industry standards.' },
  { icon: ClockIcon, title: 'On-Time Delivery', desc: 'Our streamlined project management ensures every project is completed on schedule.' },
  { icon: CurrencyDollarIcon, title: 'Competitive Pricing', desc: 'Premium quality at fair, transparent prices with no hidden costs or surprises.' },
  { icon: WrenchScrewdriverIcon, title: 'Customized Solutions', desc: 'Every project is tailored to your specific needs, budget, and site requirements.' },
  { icon: HeartIcon, title: 'Excellent Support', desc: 'Dedicated customer support from initial consultation through ongoing maintenance.' },
]

export default function WhyChooseUsSection() {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Image with floating card */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="Our team at work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
            </div>
            {/* Accent border frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border-4 border-accent/30 -z-10" />
            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-card-hover p-5 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircleIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="font-display font-black text-2xl text-dark">500+</div>
                <div className="text-dark-300 text-xs font-medium">Successful Projects</div>
              </div>
            </motion.div>
            {/* ISO badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute top-6 -right-6 bg-primary rounded-2xl shadow-card p-4 text-center"
            >
              <div className="font-display font-black text-white text-xl">10+</div>
              <div className="text-white/70 text-[10px] font-medium leading-tight mt-0.5">Years<br />in UAE</div>
            </motion.div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionTitle
              tag="Why Choose Us"
              title="Your Trusted Partner"
              highlight="in Dubai"
              description="We combine technical expertise, premium materials, and a client-first approach to deliver results that stand the test of time."
              center={false}
            />

            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8"
            >
              {reasons.map((reason) => (
                <motion.div
                  key={reason.title}
                  variants={fadeInUp}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-light transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 bg-primary/10 group-hover:bg-primary rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                    <reason.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-200" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-dark text-sm">{reason.title}</h4>
                    <p className="text-dark-300 text-xs mt-1 leading-relaxed">{reason.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
