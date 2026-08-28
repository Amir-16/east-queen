import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { ChevronRight, X, ChevronLeft, ArrowRight, ShieldCheck, Award } from 'lucide-react'
import { pageTransition, stagger, fadeUp, fadeLeft, fadeRight } from '@/lib/motion'

const STATS = [
  { value: '42+',     label: 'Years Operating'   },
  { value: '200+',    label: 'Vessels Recycled'   },
  { value: '1,200+',  label: 'Workers Employed'   },
  { value: '95%',     label: 'Material Recovered' },
]

const CAPABILITIES = [
  {
    title: 'Full Hull Dismantling',
    desc:  'Complete ship recycling from the keel up — tankers, bulk carriers, container ships, and offshore vessels.',
    img:   '/images/ship-breaking/cutting-1.jpeg',
  },
  {
    title: 'Steel & Plate Recovery',
    desc:  'Systematic recovery of re-rollable steel plates, profiles, and beams for the domestic market.',
    img:   '/images/ship-breaking/steel-plates.jpeg',
  },
  {
    title: 'Machinery & Equipment',
    desc:  'Salvage of engines, compressors, pumps, electrical systems, and deck equipment.',
    img:   '/images/ship-breaking/machinery.jpeg',
  },
  {
    title: 'Hazardous Material Management',
    desc:  'HKC-compliant removal and disposal of asbestos, oil residues, PCBs, and other regulated substances.',
    img:   '/images/ship-breaking/hazmat.jpeg',
  },
]

const PROCESS_STEPS = [
  { step: '01', title: 'Ship Acquisition',      desc: 'Vessel survey, valuation, and purchase negotiations globally.' },
  { step: '02', title: 'Environmental Survey',  desc: 'Pre-arrival inventory of hazardous materials by certified surveyors.' },
  { step: '03', title: 'Beaching & Decontamination', desc: 'Safe beaching at Sitakunda with full PPE and safety protocols.' },
  { step: '04', title: 'Systematic Dismantling', desc: 'Structured top-down cutting with constant safety monitoring.' },
  { step: '05', title: 'Material Sorting',      desc: 'Categorisation of ferrous, non-ferrous, and hazardous streams.' },
  { step: '06', title: 'Market Distribution',   desc: 'Sale to rolling mills, component traders, and certified disposal.' },
]

const GALLERY_IMAGES = [
  { src: '/images/ship-breaking/yard-wide-1.jpeg', alt: 'Yard overview' },
  { src: '/images/ship-breaking/cutting-1.jpeg',   alt: 'Gas cutting operations' },
  { src: '/images/ship-breaking/workers-2.jpeg',   alt: 'Workers on deck' },
  { src: '/images/ship-breaking/coastal-view.jpeg',alt: 'Coastal view' },
  { src: '/images/ship-breaking/steel-plates.jpeg',alt: 'Steel plates' },
  { src: '/images/ship-breaking/machinery.jpeg',   alt: 'Recovered machinery' },
]

const CERTIFICATIONS = [
  { name: 'HKC Compliant',          body: 'Hong Kong Convention',          year: '2017' },
  { name: 'ISO 9001:2015',           body: 'Quality Management',            year: '2019' },
  { name: 'MLC 2006',               body: 'Maritime Labour Convention',    year: '2020' },
  { name: 'DoE Licensed',           body: 'Dept. of Environment, BD',      year: '2018' },
]

function Lightbox({ images, idx, onClose, onPrev, onNext }) {
  if (idx === null) return null
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white p-2"><X size={22} /></button>
      <button onClick={(e) => { e.stopPropagation(); onPrev() }} className="absolute left-4 text-white/60 hover:text-white p-3"><ChevronLeft size={26} /></button>
      <button onClick={(e) => { e.stopPropagation(); onNext() }} className="absolute right-4 text-white/60 hover:text-white p-3"><ChevronRight size={26} /></button>
      <motion.img key={idx} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        src={images[idx].src} alt={images[idx].alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl" />
      <p className="absolute bottom-4 right-6 text-white/30 text-xs">{idx + 1} / {images.length}</p>
    </motion.div>
  )
}

export default function ShipBreaking() {
  const [lightboxIdx, setLightbox] = useState(null)

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      {/* Cinematic parallax hero */}
      <section className="relative h-[90vh] min-h-[600px] flex flex-col justify-end overflow-hidden bg-navy-950">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: "url('/images/ship-breaking/yard-wide-1.jpeg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-navy-950/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 to-transparent" />

        <div className="relative z-10 section-container pb-16 lg:pb-24">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-gold-500" />
              <span className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase">East Queen Shipping Ltd.</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-playfair font-bold text-display text-white leading-tight mb-6 max-w-3xl">
              Ship Breaking<br /><span className="text-gradient-gold">&amp; Recycling</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/55 text-xl max-w-xl leading-relaxed mb-10">
              Bangladesh's premier HKC-compliant ship recycling facility in Sitakunda, Chittagong — operating since 1982 with the highest standards of safety and environmental care.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link href="/contact-us" className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gold-500 hover:bg-gold-400 text-white font-bold rounded-xl text-sm transition-all hover:shadow-gold-glow">
                Get a Quote <ArrowRight size={14} />
              </Link>
              <a href="#capabilities" className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold rounded-xl text-sm transition-all">
                Our Capabilities
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom gold line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
      </section>

      {/* Stats bar */}
      <div className="bg-gold-500 py-8">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-mono font-black text-3xl text-navy-900 mb-1">{s.value}</p>
                <p className="text-navy-900/60 text-[11px] uppercase tracking-widest font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Intro 2-col */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              <p className="text-gold-500 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">About the Facility</p>
              <div className="h-[2px] w-10 bg-gold-500 rounded-full mb-6" />
              <h2 className="font-playfair font-bold text-h2 text-navy-900 mb-6">
                A Legacy Built on Steel and Safety
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                Our Sitakunda yard has been operational since 1982, making it one of the most experienced ship recycling facilities in Bangladesh. Over four decades we have refined every aspect of our process — from pre-arrival hazardous material surveys to final material distribution — to meet and exceed international standards.
              </p>
              <p className="text-slate-500 leading-relaxed">
                East Queen Shipping became one of the early adopters of the Hong Kong International Convention (HKC) framework in Bangladesh, investing in worker safety, environmental controls, and certified waste disposal long before regulatory mandates.
              </p>
            </motion.div>
            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-deep">
                <img src="/images/ship-breaking/yard-wide-1.jpeg" alt="Yard overview" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities 2×2 grid */}
      <section id="capabilities" className="section-padding bg-slate-50">
        <div className="section-container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <motion.p variants={fadeUp} className="text-gold-500 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">What We Do</motion.p>
            <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-5" />
            <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h2 text-navy-900">Our Capabilities</motion.h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6">
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-card transition-all duration-300"
              >
                {cap.img && (
                  <div className="h-44 overflow-hidden">
                    <img src={cap.img} alt={cap.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-playfair font-bold text-xl text-navy-900 mb-2 group-hover:text-navy-700 transition-colors">{cap.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{cap.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process zigzag timeline */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12 text-center">
            <motion.p variants={fadeUp} className="text-gold-500 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">Methodology</motion.p>
            <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-5 mx-auto" />
            <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h2 text-navy-900">Our Recycling Process</motion.h2>
          </motion.div>

          <div className="space-y-6">
            {PROCESS_STEPS.map((ps, i) => {
              const isRight = i % 2 !== 0
              return (
                <motion.div
                  key={ps.step}
                  initial={{ opacity: 0, x: isRight ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`flex items-start gap-5 ${isRight ? 'flex-row-reverse text-right' : ''}`}
                >
                  <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center shrink-0">
                    <span className="font-mono font-black text-white text-xs">{ps.step}</span>
                  </div>
                  <div className={`flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-lg ${isRight ? 'ml-auto' : ''}`}>
                    <h3 className="font-semibold text-navy-900 mb-1.5">{ps.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{ps.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
            <motion.p variants={fadeUp} className="text-gold-500 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">Photo Gallery</motion.p>
            <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-5" />
            <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h2 text-navy-900">Inside the Yard</motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="relative overflow-hidden rounded-xl cursor-pointer group aspect-square"
                onClick={() => setLightbox(i)}
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/30 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-navy-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="relative section-container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10 text-center">
            <motion.p variants={fadeUp} className="text-gold-400 text-[11px] font-bold uppercase tracking-[0.35em] mb-3">Compliance</motion.p>
            <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-5 mx-auto" />
            <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h2 text-white">Certifications &amp; Compliance</motion.h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-500/15 border border-gold-500/20 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck size={16} className="text-gold-400" />
                </div>
                <p className="font-semibold text-white text-sm mb-1">{cert.name}</p>
                <p className="text-white/40 text-xs mb-1">{cert.body}</p>
                <p className="text-gold-500 text-[10px] font-mono">Since {cert.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gold-500">
        <div className="section-container text-center">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h2 text-navy-950 mb-4">Ready to Discuss Your Vessel?</motion.h2>
            <motion.p variants={fadeUp} className="text-navy-900/60 text-lg max-w-lg mx-auto mb-8">
              Contact our maritime team for a no-obligation valuation and detailed process overview.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/contact-us" className="inline-flex items-center gap-2.5 px-8 py-4 bg-navy-950 hover:bg-navy-900 text-white rounded-xl font-bold text-sm transition-colors">
                Get In Touch <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            images={GALLERY_IMAGES}
            idx={lightboxIdx}
            onClose={() => setLightbox(null)}
            onPrev={() => setLightbox((i) => (i > 0 ? i - 1 : GALLERY_IMAGES.length - 1))}
            onNext={() => setLightbox((i) => (i < GALLERY_IMAGES.length - 1 ? i + 1 : 0))}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
