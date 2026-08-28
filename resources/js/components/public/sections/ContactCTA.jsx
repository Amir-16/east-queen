import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { ArrowRight, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { stagger, fadeLeft, fadeRight, fadeUp } from '@/lib/motion'
import { CONTACT } from '@/lib/constants'

export default function ContactCTA({ contact = CONTACT }) {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — CTA text */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <p className="text-gold-500 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">
              Get in Touch
            </p>
            <div className="h-[2px] w-10 bg-gold-500 rounded-full mb-6" />
            <h2 className="font-playfair font-bold text-h2 text-navy-900 mb-6 leading-tight">
              Ready to start a conversation?
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8">
              Whether you're looking to export Bangladeshi goods, source quality imports, or explore a business partnership — our team is ready to assist.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-7 py-3.5 rounded-xl text-sm transition-all duration-200 hover:shadow-gold-glow group"
              >
                Send a Message <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`tel:${contact.phones[0].replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 hover:border-gold-300 hover:text-gold-500 font-semibold px-7 py-3.5 rounded-xl text-sm transition-all duration-200"
              >
                <Phone size={14} /> Call Now
              </a>
            </div>
          </motion.div>

          {/* Right — Contact info card */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <div className="bg-navy-900 rounded-2xl p-7 space-y-5">
              {[
                { icon: MapPin, label: 'Office',  values: [contact.address] },
                { icon: Phone,  label: 'Phone',   values: contact.phones },
                { icon: Mail,   label: 'Email',   values: contact.emails },
                { icon: Clock,  label: 'Hours',   values: [contact.hours] },
              ].map(({ icon: Icon, label, values }) => (
                <motion.div key={label} variants={fadeUp} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/15 border border-gold-500/20 flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">{label}</p>
                    {values.map((v) => (
                      <p key={v} className="text-white/70 text-sm leading-relaxed">{v}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
