import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import PageHead from '@/components/public/ui/PageHead'
import { ArrowLeft, ArrowRight, ChevronRight, Tag } from 'lucide-react'
import { pageTransition, stagger, fadeUp, fadeLeft, fadeRight } from '@/lib/motion'

const NAV_SECTIONS = ['Overview', 'Specifications', 'Use Cases', 'Markets', 'Enquire']

export default function ProductDetail({ product }) {
  const [activeSection, setActiveSection] = useState('Overview')
  const [galleryIdx, setGalleryIdx] = useState(0)
  const sectionRefs = useRef({})

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.dataset.section) })
      },
      { threshold: 0.4 }
    )
    Object.values(sectionRefs.current).forEach((el) => { if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [product])

  const type       = product?.type ?? 'export'
  const accentColor = type === 'import' ? 'teal' : 'gold'
  const listHref   = type === 'import' ? '/import' : '/export'
  const listLabel  = type === 'import' ? 'Import Products' : 'Export Products'

  const gallery  = product?.gallery_images?.length ? product.gallery_images : [product?.image].filter(Boolean)
  const specs    = product?.specs    ?? {}
  const useCases = product?.use_cases ?? []
  const markets  = product?.markets   ?? []
  const tags     = product?.tags      ?? []

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <PageHead title={product.name} description={product.description} image={product.image} />
      {/* Hero */}
      <div className="relative bg-navy-950 overflow-hidden">
        {gallery[0] && (
          <>
            <img
              src={gallery[galleryIdx] || gallery[0]}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/40" />
          </>
        )}
        <div className="relative z-10 section-container py-20">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            {/* Breadcrumb */}
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-xs text-white/40 mb-6">
              <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
              <ChevronRight size={10} />
              <Link href={listHref} className="hover:text-white/70 transition-colors">{listLabel}</Link>
              <ChevronRight size={10} />
              <span className="text-white/70">{product.name}</span>
            </motion.div>

            <motion.p variants={fadeUp} className={`text-${accentColor}-400 text-[11px] font-bold uppercase tracking-widest mb-2`}>
              {type === 'import' ? 'Import Product' : 'Export Product'}
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-playfair font-bold text-h1 text-white mb-4 max-w-2xl">{product.name}</motion.h1>
            <motion.p variants={fadeUp} className="text-white/55 text-lg max-w-xl leading-relaxed">{product.tagline || product.description?.slice(0, 120)}</motion.p>

            {tags.length > 0 && (
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mt-6">
                {tags.map((t) => (
                  <span key={t} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.06] border border-white/10 text-white/60 text-xs rounded-full">
                    <Tag size={10} /> {t}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Sticky sidebar layout */}
      <section className="bg-slate-50 section-padding">
        <div className="section-container">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.aside
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-1 space-y-4"
            >
              {/* Sticky nav */}
              <div className="sticky top-24">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1 mb-4">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-3 px-2">Quick Nav</p>
                  {NAV_SECTIONS.filter((s) => s !== 'Enquire' || true).map((sec) => (
                    <button
                      key={sec}
                      onClick={() => sectionRefs.current[sec]?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                        activeSection === sec ? `bg-navy-900 text-white font-semibold` : 'text-slate-600 hover:bg-slate-50 hover:text-navy-900'
                      }`}
                    >
                      {sec}
                    </button>
                  ))}
                </div>

                {/* Enquiry card */}
                <div className="bg-navy-900 rounded-2xl p-5 text-center">
                  <p className="text-white/60 text-xs mb-3 leading-relaxed">Interested in this product?</p>
                  <Link
                    href="/contact-us"
                    className={`block w-full py-3 bg-${accentColor === 'gold' ? 'gold' : 'teal'}-500 hover:bg-${accentColor === 'gold' ? 'gold' : 'teal'}-600 text-white rounded-xl text-sm font-bold transition-colors mb-2`}
                  >
                    Get a Quote
                  </Link>
                  <a
                    href="https://wa.me/+8801713042261"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-sm font-semibold transition-all duration-200 mb-3"
                  >
                    WhatsApp Us
                  </a>
                  <Link href={listHref} className="text-white/40 text-xs hover:text-white/70 transition-colors">
                    ← Back to {listLabel}
                  </Link>
                </div>
              </div>
            </motion.aside>

            {/* Main content */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3 space-y-8"
            >
              {/* Hero image + gallery strip */}
              {gallery.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="h-64 overflow-hidden">
                    <img src={gallery[galleryIdx]} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  {gallery.length > 1 && (
                    <div className="flex gap-2 p-4 overflow-x-auto scrollbar-hide">
                      {gallery.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setGalleryIdx(i)}
                          className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-colors ${i === galleryIdx ? 'border-gold-500' : 'border-transparent opacity-60'}`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Overview */}
              <section
                data-section="Overview"
                ref={(el) => (sectionRefs.current['Overview'] = el)}
                className="bg-white border border-slate-200 rounded-2xl p-7"
              >
                <h2 className="font-playfair font-bold text-xl text-navy-900 mb-4">Overview</h2>
                <p className="text-slate-500 text-sm leading-relaxed">{product.description}</p>
                {product.long_description?.map((para, i) => (
                  <p key={i} className="text-slate-500 text-sm leading-relaxed mt-4">{para}</p>
                ))}
              </section>

              {/* Specifications */}
              {Object.keys(specs).length > 0 && (
                <section
                  data-section="Specifications"
                  ref={(el) => (sectionRefs.current['Specifications'] = el)}
                  className="bg-white border border-slate-200 rounded-2xl p-7"
                >
                  <h2 className="font-playfair font-bold text-xl text-navy-900 mb-5">Specifications</h2>
                  <div className="divide-y divide-slate-100">
                    {Object.entries(specs).map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between py-3">
                        <span className="text-slate-500 text-sm">{k}</span>
                        <span className="text-navy-900 text-sm font-semibold">{v}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Use cases */}
              {useCases.length > 0 && (
                <section
                  data-section="Use Cases"
                  ref={(el) => (sectionRefs.current['Use Cases'] = el)}
                  className="bg-white border border-slate-200 rounded-2xl p-7"
                >
                  <h2 className="font-playfair font-bold text-xl text-navy-900 mb-5">Use Cases</h2>
                  <ul className="space-y-2.5">
                    {useCases.map((uc) => (
                      <li key={uc} className="flex items-start gap-3 text-sm text-slate-600">
                        <div className={`w-1.5 h-1.5 rounded-full bg-${accentColor}-500 mt-2 shrink-0`} />
                        {uc}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Markets / Origins */}
              {markets.length > 0 && (
                <section
                  data-section="Markets"
                  ref={(el) => (sectionRefs.current['Markets'] = el)}
                  className="bg-white border border-slate-200 rounded-2xl p-7"
                >
                  <h2 className="font-playfair font-bold text-xl text-navy-900 mb-5">
                    {type === 'import' ? 'Origin Countries' : 'Target Markets'}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {markets.map((m) => (
                      <span key={m} className={`px-3 py-1.5 bg-${accentColor}-50 border border-${accentColor}-100 text-${accentColor}-800 text-xs rounded-lg font-medium`}>{m}</span>
                    ))}
                  </div>
                </section>
              )}

              {/* Enquire */}
              <section
                data-section="Enquire"
                ref={(el) => (sectionRefs.current['Enquire'] = el)}
                className="bg-navy-950 rounded-2xl p-8 text-center"
              >
                <h2 className="font-playfair font-bold text-2xl text-white mb-3">Interested in {product.name}?</h2>
                <p className="text-white/50 text-sm mb-6 max-w-sm mx-auto">Contact our trade team for pricing, minimum order quantities, and documentation requirements.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-white rounded-xl font-bold transition-colors"
                  >
                    Enquire Now <ArrowRight size={14} />
                  </Link>
                  <a
                    href="https://wa.me/+8801713042261"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold transition-all duration-200"
                  >
                    WhatsApp Us
                  </a>
                </div>
              </section>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
