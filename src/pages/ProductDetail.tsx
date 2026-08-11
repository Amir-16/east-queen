import { motion } from 'framer-motion'
import { fadeUp, stagger, fadeLeft, fadeRight } from '@/lib/motion'
import { exportProducts } from '@/data/exports'
import { importProducts } from '@/data/imports'
import type { Product } from '@/types'
import { ChevronRight, CheckCircle, ArrowRight, MessageSquare, Package } from 'lucide-react'
import { Link } from 'react-router-dom'
import NotFound from './NotFound'

interface Props {
  slug: string
  type: 'export' | 'import'
}

const EXPORT_NAV = [
  { label: 'Mill Scale',                href: '/export-mill-scale'                  },
  { label: 'Zinc Oxide',               href: '/export-zinc-oxide'                  },
  { label: 'PET Flakes',               href: '/export-pet-flakes'                  },
  { label: 'Fresh Vegetables & Fruits', href: '/export-fresh-vegetables-and-fruits' },
  { label: 'Leather Goods',            href: '/export-leather-goods'               },
  { label: 'Jute Made Products',       href: '/export-jute-made-products'          },
]

const IMPORT_NAV = [
  { label: 'Aggregate / Gabbro',        href: '/import-aggregate'              },
  { label: 'Coal',                       href: '/import-coal'                   },
  { label: 'Steel Scraps',              href: '/import-steel-scraps'           },
  { label: 'Automobile Spare Parts',     href: '/import-automobile-spare-parts' },
  { label: 'Lime Stone / Clinker',       href: '/import-lime-stone'             },
]

function findProduct(slug: string, type: 'export' | 'import'): Product | undefined {
  const list = type === 'export' ? exportProducts : importProducts
  return list.find((p) => p.urlSlug === slug)
}

export default function ProductDetail({ slug, type }: Props) {
  const product = findProduct(slug, type)
  if (!product) return <NotFound />

  const navItems  = type === 'export' ? EXPORT_NAV : IMPORT_NAV
  const currentHref = `/${type}-${slug}`
  const title     = product.detailTitle ?? product.name
  const gallery   = (product.galleryImages ?? []).filter(Boolean)
  const paragraphs = product.longDescription?.length
    ? product.longDescription
    : [product.description]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white"
    >
      {/* ── Page Hero ───────────────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {product.image
          ? (
            <div className="absolute inset-0">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950/92 via-navy-950/75 to-navy-950/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" />
            </div>
          )
          : <div className="absolute inset-0 bg-navy-900" />
        }

        <div className="relative section-container">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            {/* Breadcrumb */}
            <motion.nav variants={fadeUp} className="flex items-center gap-2 text-white/50 text-sm mb-5">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link to={`/${type}`} className="hover:text-white transition-colors capitalize">{type}</Link>
              <ChevronRight size={12} />
              <span className="text-gold-400">{product.name}</span>
            </motion.nav>

            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                         bg-gold-500/15 border border-gold-500/25 w-fit mb-4"
            >
              <Package size={11} className="text-gold-400" />
              <span className="text-gold-400 text-[11px] font-semibold tracking-[0.2em] uppercase">
                {product.category}
              </span>
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-playfair font-bold text-hero text-white leading-tight"
            >
              {product.name}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* ── Sidebar + Content ────────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid md:grid-cols-4 gap-10">

            {/* Sidebar nav */}
            <motion.aside
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:col-span-1"
            >
              <div className="sticky top-24 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm-card">
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
                  <p className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.25em]">
                    {type === 'export' ? 'Our Exports' : 'Our Imports'}
                  </p>
                </div>
                {navItems.map((item) => {
                  const isActive = item.href === currentHref
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`flex items-center gap-2.5 px-4 py-3 text-sm
                                  border-b border-slate-100 last:border-0
                                  transition-all duration-200 ${
                        isActive
                          ? 'text-gold-500 border-l-[3px] border-l-gold-500 bg-gold-50/50 pl-3 font-semibold'
                          : 'text-slate-600 hover:text-gold-500 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>

              {/* Quick enquiry card */}
              <div className="mt-4 bg-navy-900 rounded-2xl p-5 text-white">
                <p className="font-playfair font-bold text-base mb-2">Ready to order?</p>
                <p className="text-white/55 text-xs leading-relaxed mb-4">
                  Contact our trade team for pricing, availability, and shipment timelines.
                </p>
                <Link
                  to="/contact-us"
                  className="block text-center py-2.5 bg-gold-500 hover:bg-gold-400
                             text-white font-bold text-xs rounded-lg tracking-wide
                             transition-colors duration-200"
                >
                  Get a Quote
                </Link>
              </div>
            </motion.aside>

            {/* Main content */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:col-span-3 space-y-8"
            >
              {/* Hero image */}
              {product.image && (
                <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-card">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Gallery strip */}
              {gallery.length > 0 && (
                <div className={`grid gap-3 ${gallery.length >= 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3'}`}>
                  {gallery.map((src, i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden shadow-sm-card">
                      <img
                        src={src}
                        alt={`${product.name} ${i + 2}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Detail title */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-[3px] w-8 bg-gold-500 rounded-full" />
                </div>
                <h2 className="font-playfair font-bold text-h2 text-slate-900 mb-1">{title}</h2>
              </div>

              {/* Long description */}
              <div className="text-slate-600 leading-relaxed text-[15px] space-y-4">
                {paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Use Cases */}
              {product.useCases && product.useCases.length > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <h3 className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.25em] mb-4">
                    Key Applications & Use Cases
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-2.5">
                    {product.useCases.map((uc) => (
                      <li key={uc} className="flex items-start gap-2.5 text-slate-600 text-sm">
                        <CheckCircle size={14} className="text-gold-500 mt-0.5 shrink-0" />
                        {uc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specs table */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm-card">
                  <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                    <h3 className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.25em]">
                      Technical Specifications
                    </h3>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {Object.entries(product.specs).map(([key, val], i) => (
                      <div key={key} className={`flex px-6 py-3 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                        <span className="w-1/3 text-slate-500 text-sm font-medium">{key}</span>
                        <span className="w-2/3 text-slate-900 text-sm font-mono">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gold-50 text-gold-600 border border-gold-100
                                 rounded-full text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div className="flex flex-wrap gap-3 pt-5 border-t border-slate-200">
                <Link
                  to="/contact-us"
                  className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600
                             text-white px-6 py-3 rounded-lg font-semibold text-sm
                             transition-all duration-200 hover:shadow-gold-glow"
                >
                  Enquire Now <ArrowRight size={15} />
                </Link>
                <a
                  href="https://wa.me/+8801713042261"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-slate-200
                             text-slate-700 hover:border-gold-300 hover:text-gold-500
                             px-6 py-3 rounded-lg font-semibold text-sm
                             transition-all duration-200"
                >
                  <MessageSquare size={15} /> WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
