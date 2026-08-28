import { Link } from 'react-router-dom'
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { COMPANY, NAV_LINKS } from '../../utils/constants'

const serviceLinks = [
  { label: 'Sports Facilities', path: '/services/sports-facilities' },
  { label: 'Flooring Solutions', path: '/services/flooring-solutions' },
  { label: 'Fencing & Safety', path: '/services/fencing-safety' },
  { label: 'Swimming Pool Works', path: '/services/swimming-pool' },
  { label: 'Civil & Construction', path: '/services/civil-works' },
  { label: 'Refurbishment', path: '/services/refurbishment' },
]

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* Main Footer */}
      <div className="container-custom section-padding pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Brand Column ── */}
          <div className="lg:col-span-1">
            {/* Logo with premium glow */}
            <Link to="/" className="inline-flex mb-6 group">
              <div className="relative">
                {/* Ambient glow */}
                <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-2xl group-hover:bg-accent/20 transition-all duration-500" />
                <div className="absolute -inset-1.5 bg-white/5 rounded-3xl blur-sm" />
                <img
                  src="/images/logo/JB -LOGO.png"
                  alt="Jonith Bogdad Technical Services"
                  className="relative h-24 sm:h-28 w-auto object-contain rounded-2xl bg-white p-2.5 shadow-2xl transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            {/* Company name block */}
            <div className="mb-5">
              <h3 className="font-display font-black text-white text-xl sm:text-2xl leading-tight uppercase tracking-wide">
                Jonith Bogdad
              </h3>
              <p className="text-accent text-xs sm:text-sm font-display font-bold tracking-[0.2em] uppercase mt-0.5">
                Technical Services
              </p>
              {/* Accent underline */}
              <div className="mt-2.5 h-0.5 w-14 bg-gradient-to-r from-accent to-transparent rounded-full" />
            </div>

            <p className="text-white/55 text-sm leading-relaxed mb-6">
              Dubai-based technical services company delivering high-quality sports facilities,
              flooring systems, fencing, and civil works across the UAE.
            </p>

            {/* Social buttons */}
            <div className="flex items-center gap-3">
              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-500 hover:bg-green-400 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="w-10 h-10 bg-primary hover:bg-primary-dark rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                aria-label="Email"
              >
                <EnvelopeIcon className="w-5 h-5 text-white" />
              </a>
              <a
                href={`tel:${COMPANY.mobile}`}
                className="w-10 h-10 bg-accent hover:bg-accent-dark rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                aria-label="Call"
              >
                <PhoneIcon className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 className="font-display font-bold text-white text-base mb-5 pb-2 border-b border-white/10">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.filter((l) => !l.children).map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-white/60 hover:text-accent text-sm transition-colors duration-200 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0 group-hover:scale-150 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services ── */}
          <div>
            <h4 className="font-display font-bold text-white text-base mb-5 pb-2 border-b border-white/10">
              Our Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-white/60 hover:text-accent text-sm transition-colors duration-200 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0 group-hover:scale-150 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4 className="font-display font-bold text-white text-base mb-5 pb-2 border-b border-white/10">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm leading-relaxed">
                  {COMPANY.addressLine1}<br />{COMPANY.addressLine2}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="flex items-center gap-3 text-white/60 hover:text-accent text-sm transition-colors"
                >
                  <PhoneIcon className="w-5 h-5 text-accent flex-shrink-0" />
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.mobile}`}
                  className="flex items-center gap-3 text-white/60 hover:text-accent text-sm transition-colors"
                >
                  <PhoneIcon className="w-5 h-5 text-accent flex-shrink-0" />
                  {COMPANY.mobile}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-3 text-white/60 hover:text-accent text-sm transition-colors break-all"
                >
                  <EnvelopeIcon className="w-5 h-5 text-accent flex-shrink-0" />
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/10">
        <div className="container-custom px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>

          {/* Powered by */}
          <a
            href="https://soft-m.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/70 transition-colors duration-300"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-sm bg-gradient-to-br from-accent/60 to-primary/60 group-hover:from-accent group-hover:to-primary flex items-center justify-center transition-all duration-300 shadow-sm">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </span>
              Powered by{' '}
              <span className="font-semibold text-white/50 group-hover:text-accent transition-colors duration-300 underline-offset-2 group-hover:underline">
                soft-m.com
              </span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
