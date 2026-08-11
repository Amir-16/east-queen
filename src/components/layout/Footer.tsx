import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react'
import { NAV_ITEMS, CONTACT } from '@/lib/constants'
import { companies } from '@/data'
import { stagger, fadeUp } from '@/lib/motion'

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
      {/* Red top accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px]
                      bg-gradient-to-r from-transparent via-gold-500/70 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Col 1 — Brand */}
          <motion.div variants={fadeUp}>
            <Link to="/" className="inline-block mb-5 group">
              <img
                src="/images/brand/logo-white.svg"
                alt="East Queen Group"
                className="h-10 w-auto object-contain
                           group-hover:opacity-80 transition-opacity duration-200"
              />
            </Link>

            <p className="text-white/45 text-sm leading-relaxed mb-6">
              A diversified industrial conglomerate with over four decades of excellence in
              international trade, shipping, energy, and agriculture.
            </p>

            <div className="flex items-center gap-2.5">
              {['LI', 'FB'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/8 hover:bg-gold-500/20
                             border border-white/12 hover:border-gold-500/40
                             flex items-center justify-center
                             text-white/40 hover:text-gold-400
                             transition-all duration-200 text-[10px] font-mono font-bold"
                >
                  {s}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Col 2 — Quick Links */}
          <motion.div variants={fadeUp}>
            <h4 className="text-white/45 font-semibold text-[10px] uppercase tracking-[0.25em] mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {NAV_ITEMS.filter((item) => item.href).map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href!}
                    className="text-white/45 hover:text-gold-400 text-sm
                               transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-500/0
                                     group-hover:bg-gold-500 transition-colors duration-200" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — Companies */}
          <motion.div variants={fadeUp}>
            <h4 className="text-white/45 font-semibold text-[10px] uppercase tracking-[0.25em] mb-5">
              Our Companies
            </h4>
            <ul className="space-y-2.5">
              {companies.map((c) => (
                <li key={c.id}>
                  <Link
                    to="/companies"
                    className="text-white/45 hover:text-gold-400 text-sm
                               transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ExternalLink
                      size={11}
                      className="text-white/20 group-hover:text-gold-500 transition-colors shrink-0"
                    />
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4 — Contact */}
          <motion.div variants={fadeUp}>
            <h4 className="text-white/45 font-semibold text-[10px] uppercase tracking-[0.25em] mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-gold-500 mt-0.5 shrink-0" />
                <span className="text-white/45 text-sm">{CONTACT.address}</span>
              </li>
              {CONTACT.phones.map((phone) => (
                <li key={phone} className="flex items-center gap-3">
                  <Phone size={14} className="text-gold-500 shrink-0" />
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="text-white/45 hover:text-gold-400 text-sm transition-colors duration-200"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              {CONTACT.emails.map((email) => (
                <li key={email} className="flex items-center gap-3">
                  <Mail size={14} className="text-gold-500 shrink-0" />
                  <a
                    href={`mailto:${email}`}
                    className="text-white/45 hover:text-gold-400 text-sm
                               transition-colors duration-200 break-all"
                  >
                    {email}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3">
                <Clock size={14} className="text-gold-500 shrink-0" />
                <span className="text-white/45 text-sm">{CONTACT.hours}</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/8
                        flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            © {currentYear} East Queen Group. All rights reserved.
          </p>
          <p className="text-white/18 text-xs">
            Designed & Developed with precision
          </p>
        </div>
      </div>
    </footer>
  )
}
