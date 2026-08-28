import { Link } from '@inertiajs/react'
import { NAV_ITEMS, CONTACT } from '@/lib/constants'
import { companies } from '@/data/companies'

const socialLinks = [
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const quickLinks = NAV_ITEMS.filter((n) => !n.children).slice(0, 5)

  return (
    <footer className="bg-navy-950 text-white">
      {/* Gold top line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-gold-500 rounded-lg flex items-center justify-center">
                  <span className="font-mono font-black text-navy-950 text-sm leading-none">EQ</span>
                </div>
                <div>
                  <p className="font-playfair font-bold text-white text-[15px] leading-tight">East Queen</p>
                  <p className="text-gold-500/70 text-[10px] tracking-widest uppercase leading-none">Group</p>
                </div>
              </div>
            </Link>
            <p className="text-white/45 text-sm leading-relaxed mb-6">
              A diversified conglomerate with 40+ years of industrial heritage across shipping, trading, energy, and agriculture.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center
                             text-white/40 hover:text-gold-400 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.3em] mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {NAV_ITEMS.slice(0, 7).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/45 hover:text-gold-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-3 h-px bg-gold-500/0 group-hover:bg-gold-500/60 transition-all duration-200" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Companies */}
          <div>
            <h4 className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.3em] mb-5">Our Companies</h4>
            <ul className="space-y-2.5">
              {companies.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/con-${c.id}`}
                    className="text-white/45 hover:text-gold-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-3 h-px bg-gold-500/0 group-hover:bg-gold-500/60 transition-all duration-200" />
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.3em] mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <p className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Address</p>
                <p className="text-white/55 text-sm leading-relaxed">{CONTACT.address}</p>
              </li>
              <li>
                <p className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Phone</p>
                {CONTACT.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block text-white/55 hover:text-gold-400 text-sm transition-colors duration-200">
                    {p}
                  </a>
                ))}
              </li>
              <li>
                <p className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Email</p>
                {CONTACT.emails.map((e) => (
                  <a key={e} href={`mailto:${e}`} className="block text-white/55 hover:text-gold-400 text-sm transition-colors duration-200 truncate">
                    {e}
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} East Queen Group. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-white/25 hover:text-white/50 text-xs transition-colors">Privacy Policy</Link>
            <span className="w-px h-3 bg-white/10" />
            <Link href="/terms-and-conditions" className="text-white/25 hover:text-white/50 text-xs transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
