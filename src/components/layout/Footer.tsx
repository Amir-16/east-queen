import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, ExternalLink, Facebook, Linkedin } from 'lucide-react'
import { NAV_ITEMS, CONTACT } from '@/lib/constants'
import { companies } from '@/data'
import { stagger, fadeUp } from '@/lib/motion'

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-white relative overflow-hidden border-t border-slate-200">
      {/* Subtle light grid texture */}
      <div className="absolute inset-0 bg-light-grid pointer-events-none" />

      {/* Red top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px]
                      bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Col 1 — Brand */}
          <motion.div variants={fadeUp}>
            <Link to="/" className="inline-block mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className="origin-left"
              >
                <img
                  src="/images/brand/logo.svg"
                  alt="East Queen Group"
                  className="h-20 w-auto object-contain"
                />
              </motion.div>
            </Link>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              A diversified industrial conglomerate with over four decades of excellence in
              international trade, shipping, energy, and agriculture.
            </p>

            <div className="flex items-center gap-2.5">
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-gold-500
                           border border-slate-200 hover:border-gold-500
                           flex items-center justify-center
                           text-slate-500 hover:text-white
                           transition-all duration-200"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-gold-500
                           border border-slate-200 hover:border-gold-500
                           flex items-center justify-center
                           text-slate-500 hover:text-white
                           transition-all duration-200"
              >
                <Facebook size={15} />
              </a>
            </div>
          </motion.div>

          {/* Col 2 — Quick Links */}
          <motion.div variants={fadeUp}>
            <h4 className="text-slate-900 font-semibold text-[11px] uppercase tracking-[0.25em] mb-5
                           after:block after:w-8 after:h-[2px] after:bg-gold-500 after:mt-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {NAV_ITEMS.filter((item) => item.href).map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href!}
                    className="text-slate-600 hover:text-gold-500 text-sm
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
            <h4 className="text-slate-900 font-semibold text-[11px] uppercase tracking-[0.25em] mb-5
                           after:block after:w-8 after:h-[2px] after:bg-gold-500 after:mt-2">
              Our Companies
            </h4>
            <ul className="space-y-2.5">
              {companies.map((c) => (
                <li key={c.id}>
                  <Link
                    to="/companies"
                    className="text-slate-600 hover:text-gold-500 text-sm
                               transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ExternalLink
                      size={11}
                      className="text-slate-400 group-hover:text-gold-500 transition-colors shrink-0"
                    />
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4 — Contact */}
          <motion.div variants={fadeUp}>
            <h4 className="text-slate-900 font-semibold text-[11px] uppercase tracking-[0.25em] mb-5
                           after:block after:w-8 after:h-[2px] after:bg-gold-500 after:mt-2">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-gold-500 mt-0.5 shrink-0" />
                <span className="text-slate-600 text-sm">{CONTACT.address}</span>
              </li>
              {CONTACT.phones.map((phone) => (
                <li key={phone} className="flex items-center gap-3">
                  <Phone size={14} className="text-gold-500 shrink-0" />
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="text-slate-600 hover:text-gold-500 text-sm transition-colors duration-200"
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
                    className="text-slate-600 hover:text-gold-500 text-sm
                               transition-colors duration-200 break-all"
                  >
                    {email}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3">
                <Clock size={14} className="text-gold-500 shrink-0" />
                <span className="text-slate-600 text-sm">{CONTACT.hours}</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-200
                        flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">
            © {currentYear} East Queen Group. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <Link to="/privacy-policy" className="hover:text-slate-700 transition-colors duration-200">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link to="/terms-and-conditions" className="hover:text-slate-700 transition-colors duration-200">
              Terms & Conditions
            </Link>
            <span>·</span>
            <span className="text-slate-400">
              Powered by{' '}
              <a
                href="https://soft-m.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-800 font-medium transition-colors duration-200"
              >
                soft-m.com
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
