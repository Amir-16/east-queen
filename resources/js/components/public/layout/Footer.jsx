import { Link } from '@inertiajs/react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react'

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)
import { NAV_ITEMS, CONTACT } from '@/lib/constants'
import { companies } from '@/data/companies'
import { stagger, fadeUp } from '@/lib/motion'

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-white relative overflow-hidden border-t border-slate-200">
      {/* Subtle light grid texture */}
      <div className="absolute inset-0 bg-light-grid pointer-events-none" />

      {/* Gold top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px]
                      bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >

          {/* Col 1 — Brand */}
          <motion.div variants={fadeUp}>
            <Link href="/" className="inline-block mb-6">
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
                <LinkedInIcon />
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
                <FacebookIcon />
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
                    href={item.href}
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

          {/* Col 3 — Our Companies */}
          <motion.div variants={fadeUp}>
            <h4 className="text-slate-900 font-semibold text-[11px] uppercase tracking-[0.25em] mb-5
                           after:block after:w-8 after:h-[2px] after:bg-gold-500 after:mt-2">
              Our Companies
            </h4>
            <ul className="space-y-2.5">
              {companies.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/con-${c.id}`}
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
            <Link href="/privacy-policy" className="hover:text-slate-700 transition-colors duration-200">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/terms-and-conditions" className="hover:text-slate-700 transition-colors duration-200">
              Terms & Conditions
            </Link>
            <span>·</span>
            <span>
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
