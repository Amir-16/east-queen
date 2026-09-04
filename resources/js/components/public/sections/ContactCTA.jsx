import { Link, usePage } from '@inertiajs/react'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react'
import { fadeUp, fadeLeft, stagger } from '@/lib/motion'

export default function ContactCTA() {
  const { company } = usePage().props
  return (
    <section className="section-padding bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-60"
           style={{ backgroundImage: "radial-gradient(circle, #e2e8f0 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      {/* Gold accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px]
                      bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="relative section-container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">

          {/* Left */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeLeft} className="flex items-center gap-3 mb-5">
              <div className="h-[3px] w-10 bg-gold-500 rounded-full" />
              <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-[0.25em]">
                Get In Touch
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-playfair font-bold text-h1 text-slate-900 mb-6 leading-tight"
            >
              Ready to Do Business<br />With Us?
            </motion.h2>

            <motion.p variants={fadeUp} className="text-slate-500 text-lg leading-relaxed mb-10">
              Whether you're looking to import, export, or explore partnership
              opportunities, our team is ready to support you. Reach out today.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                href="/contact-us"
                className="group inline-flex items-center gap-2.5 px-7 py-4
                           bg-gold-500 hover:bg-gold-600 text-white
                           font-bold rounded-xl text-sm tracking-wide
                           transition-all duration-200 hover:shadow-gold-glow"
              >
                Send Us a Message
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              {company?.phone && (
                <a
                  href={`tel:${company.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 px-7 py-4
                             bg-white hover:bg-slate-50 border border-slate-200
                             hover:border-gold-500/40 text-slate-700 font-semibold
                             rounded-xl text-sm tracking-wide transition-all duration-200
                             shadow-sm hover:shadow-card"
                >
                  <Phone size={14} className="text-gold-500" />
                  {company.phone}
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Right — contact info card */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-card"
          >
            <h3 className="text-slate-400 font-semibold text-[10px] uppercase tracking-[0.25em]
                           pb-4 border-b border-slate-100">
              Contact Information
            </h3>

            <div className="space-y-5">
              {company?.address && (
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-gold-50 border border-gold-100
                                  flex items-center justify-center shrink-0">
                    <MapPin size={14} className="text-gold-500" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">Office</p>
                    <p className="text-slate-700 text-sm">{company.address}</p>
                  </div>
                </div>
              )}

              {company?.phone && (
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-gold-50 border border-gold-100
                                  flex items-center justify-center shrink-0">
                    <Phone size={14} className="text-gold-500" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">Phone</p>
                    <a
                      href={`tel:${company.phone.replace(/\s/g, '')}`}
                      className="text-slate-700 hover:text-gold-500 text-sm transition-colors"
                    >
                      {company.phone}
                    </a>
                  </div>
                </div>
              )}

              {company?.email && (
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-gold-50 border border-gold-100
                                  flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-gold-500" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">Email</p>
                    <a
                      href={`mailto:${company.email}`}
                      className="text-slate-700 hover:text-gold-500 text-sm transition-colors break-all"
                    >
                      {company.email}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
