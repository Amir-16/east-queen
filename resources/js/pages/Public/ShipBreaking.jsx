import { useRef, useState, useEffect, useCallback, memo } from 'react'
import { Link } from '@inertiajs/react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import CountUp from 'react-countup'
import {
  Anchor,
  Shield,
  Recycle,
  Award,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  MapPin,
  Waves,
  X,
  ZoomIn,
} from 'lucide-react'
import { stagger, fadeUp, fadeLeft, fadeRight, ease } from '@/lib/motion'
import PageHead from '@/components/public/ui/PageHead'

/* ── data ── */
const stats = [
  { value: 40,   suffix: '+',   label: 'Years Experience', decimals: 0 },
  { value: 150,  suffix: '+',   label: 'Vessels Recycled', decimals: 0 },
  { value: 100,  suffix: '%',   label: 'HKC Compliance',   decimals: 0 },
  { value: 1000, suffix: '+ MT',label: 'Scrap / Year',     decimals: 0 },
]

const capabilities = [
  {
    icon: Anchor,
    title: 'Ocean-Going Vessel Recycling',
    description:
      'Safe, systematic dismantling of bulk carriers, tankers, container ships, and offshore vessels — 500 DWT to 50,000+ DWT.',
    tag: 'Core Service',
  },
  {
    icon: Shield,
    title: 'Safety & Compliance',
    description:
      'Full compliance with the Hong Kong Convention, Bangladesh Ship Recycling Rules 2011, and ILO standards. Trained safety officers on-site.',
    tag: 'Certified',
  },
  {
    icon: Recycle,
    title: 'Green Recycling',
    description:
      'Asbestos removal, oil sludge management, and hazardous material handling — all following Basel Convention guidelines.',
    tag: 'Eco Standard',
  },
  {
    icon: Award,
    title: 'Quality Steel Output',
    description:
      'HMS 1&2 scrap sorted, graded, and supplied to re-rolling mills and steel manufacturers across Bangladesh.',
    tag: 'Grade A Output',
  },
]

const processSteps = [
  {
    step: '01',
    title: 'Vessel Acquisition',
    description:
      'Purchase of end-of-life vessels from international owners through transparent tender processes.',
  },
  {
    step: '02',
    title: 'Pre-Demolition Survey',
    description:
      'Comprehensive hazardous material inventory and pre-demolition inspection per HKC standards.',
  },
  {
    step: '03',
    title: 'Beaching & Positioning',
    description:
      'High-tide beaching at our designated yard with certified crew and heavy equipment on standby.',
  },
  {
    step: '04',
    title: 'Systematic Dismantling',
    description:
      'Gas-cut steel plates, pipes, and equipment recovered working top-to-bottom from the superstructure.',
  },
  {
    step: '05',
    title: 'Scrap Sorting & Dispatch',
    description:
      'Steel graded, weighed, and dispatched to Bangladesh re-rolling mills — zero waste, maximum value.',
  },
]

const certifications = [
  'Hong Kong International Convention (HKC)',
  'Bangladesh Ship Recycling Rules 2011',
  'ILO Safety & Health Standards',
  'Basel Convention — Hazardous Waste',
  'DNVGL Ship Recycling Compliance',
]

const galleryImages = [
  { src: '/images/ship-breaking/yard-wide-1.jpeg',   label: 'Yard Overview'      },
  { src: '/images/ship-breaking/coastal-view.jpeg',  label: 'Coastal View'       },
  { src: '/images/ship-breaking/scrap-yard-1.jpeg',  label: 'Scrap Yard'         },
  { src: '/images/ship-breaking/scrap-yard-2.jpeg',  label: 'Scrap Yard'         },
  { src: '/images/ship-breaking/scrap-urban-1.jpeg', label: 'Urban Scrap'        },
  { src: '/images/ship-breaking/scrap-urban-2.jpeg', label: 'Urban Scrap'        },
  { src: '/images/ship-breaking/yard-wide-2.jpeg',   label: 'Yard Operations'    },
  { src: '/images/ship-breaking/scrap-yard-3.jpeg',  label: 'Dismantling'        },
  { src: '/images/ship-breaking/scrap-yard-4.jpeg',  label: 'Steel Recovery'     },
  { src: '/images/ship-breaking/yard-wide-3.jpeg',   label: 'Yard Panorama'      },
  { src: '/images/ship-breaking/scrap-yard-5.jpeg',  label: 'Cutting Operations' },
  { src: '/images/ship-breaking/scrap-yard-6.jpeg',  label: 'Scrap Processing'   },
  { src: '/images/ship-breaking/yard-wide-4.jpeg',   label: 'Wide View'          },
]

/* ── sub-components ── */

function WordDrop({ text, className, delay = 0 }) {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.055, delayChildren: delay } },
      }}
      className={className}
      aria-label={text}
    >
      {text.split(' ').map((w, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 60, rotateX: -40 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: { type: 'spring', stiffness: 420, damping: 28, mass: 0.8 },
            },
          }}
          className="inline-block mr-[0.22em] last:mr-0"
          style={{ transformOrigin: 'top center' }}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  )
}

function StatItem({ value, suffix, label, decimals, inView }) {
  return (
    <div className="text-center group">
      <p className="font-mono text-stat font-bold text-gold-500 mb-1 leading-none tabular-nums">
        {inView ? (
          <CountUp end={value} suffix={suffix} decimals={decimals} duration={2.2} useEasing />
        ) : (
          <span>0{suffix}</span>
        )}
      </p>
      <p className="text-slate-500 text-xs tracking-widest uppercase">{label}</p>
    </div>
  )
}

/* ── GalleryCard ── */
const GalleryCard = memo(function GalleryCard({ img, index, isTall, initX, initY, delay, onClick }) {
  const [loaded, setLoaded] = useState(false)
  const reduced  = useReducedMotion()
  const isEager  = index < 2

  return (
    <motion.div
      initial={{ opacity: 0, x: initX, y: initY, scale: 0.93 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, duration: 0.55, ease: ease.smooth }}
      whileHover="hover"
      onClick={onClick}
      className={[
        'group relative overflow-hidden rounded-2xl shadow-card cursor-pointer select-none',
        isTall ? 'row-span-2' : '',
      ].join(' ')}
    >
      <div className={`absolute inset-0 bg-slate-300 animate-pulse z-[1] transition-opacity duration-500
                       ${loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} />

      <motion.img
        src={img.src}
        alt={img.label}
        loading={isEager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={isEager ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        draggable={false}
        variants={reduced ? undefined : {
          hover: { scale: 1.08, transition: { duration: 0.65, ease: ease.smooth } },
        }}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500
                    ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent"
        initial={{ opacity: 0.3 }}
        variants={{ hover: { opacity: 1, transition: { duration: 0.35 } } }}
      />

      <motion.div
        className="absolute top-0 right-0 w-10 h-10 overflow-hidden"
        initial={{ opacity: 0 }}
        variants={{ hover: { opacity: 1, transition: { duration: 0.25 } } }}
      >
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-gold-500/60" />
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between">
        <motion.p
          className="text-white text-xs font-semibold tracking-widest uppercase"
          initial={{ opacity: 0, y: 10 }}
          variants={{ hover: { opacity: 1, y: 0, transition: { duration: 0.28 } } }}
        >
          {img.label}
        </motion.p>
        <motion.div
          className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20
                     flex items-center justify-center text-white"
          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
          variants={{
            hover: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 400, damping: 22 } },
          }}
        >
          <ZoomIn size={14} strokeWidth={2} />
        </motion.div>
      </div>

      <motion.div
        className="absolute top-3 left-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm
                   border border-white/15 flex items-center justify-center"
        initial={{ opacity: 0, x: -10 }}
        variants={{ hover: { opacity: 1, x: 0, transition: { duration: 0.25 } } }}
      >
        <span className="text-white/80 text-[10px] font-mono font-bold">
          {String(index + 1).padStart(2, '0')}
        </span>
      </motion.div>
    </motion.div>
  )
})

/* ── Lightbox ── */
const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? '55%' : '-55%',
    opacity: 0,
    scale: 0.88,
    filter: 'blur(6px)',
  }),
  center: { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit:   (dir) => ({
    x: dir > 0 ? '-35%' : '35%',
    opacity: 0,
    scale: 0.92,
    filter: 'blur(6px)',
  }),
}

function Lightbox({ images, index, dir, onNav, onJump, onClose }) {
  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft')  onNav(-1)
      if (e.key === 'Escape')     onClose()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onNav, onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const img = images[index]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex flex-col bg-black/96 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        className="absolute top-5 left-5 z-20 flex items-center gap-2.5 pointer-events-none select-none"
      >
        <span className="text-white/30 text-[10px] tracking-[0.25em] uppercase font-semibold">
          Sitakunda Yard
        </span>
        <span className="w-px h-3 bg-white/20" />
        <span className="font-mono text-sm">
          <span className="text-gold-400 font-bold">{index + 1}</span>
          <span className="text-white/30"> / {images.length}</span>
        </span>
      </motion.div>

      <motion.div
        className="absolute top-4 right-4 z-20 flex items-center gap-3"
        onClick={e => e.stopPropagation()}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="hidden sm:block text-white/30 text-[10px] font-mono tracking-[0.25em] uppercase select-none"
        >
          esc
        </motion.span>
        <motion.button
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 360, damping: 22, delay: 0.18 }}
          whileHover={{ scale: 1.12, rotate: 90, transition: { type: 'spring', stiffness: 500, damping: 18 } }}
          whileTap={{ scale: 0.85 }}
          onClick={onClose}
          aria-label="Close (Escape)"
          className="w-[52px] h-[52px] rounded-full
                     bg-black/60 border-2 border-white/20 backdrop-blur-md
                     flex items-center justify-center text-white
                     hover:bg-gold-500 hover:border-gold-500/60
                     transition-colors duration-200 shadow-2xl shadow-black/50"
        >
          <X size={22} strokeWidth={2.5} />
        </motion.button>
      </motion.div>

      <div
        className="relative flex-1 flex items-center justify-center overflow-hidden px-16 md:px-24"
        onClick={e => e.stopPropagation()}
      >
        <motion.button
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12, type: 'spring', stiffness: 320, damping: 26 }}
          whileHover={{ scale: 1.1, x: -3, transition: { type: 'spring', stiffness: 500 } }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onNav(-1)}
          className="absolute left-3 md:left-6 z-20 w-12 h-12 rounded-full
                     border border-white/20 bg-white/5 backdrop-blur-sm
                     flex items-center justify-center text-white/70 hover:text-white
                     hover:border-white/40 hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={22} strokeWidth={2} />
        </motion.button>

        <div className="relative w-full max-w-5xl max-h-[75vh] flex items-center justify-center">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.img
              key={index}
              src={img.src}
              alt={img.label}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: [0.32, 0, 0.24, 1] }}
              className="w-full max-h-[72vh] object-contain rounded-xl shadow-2xl select-none"
              draggable={false}
            />
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm
                         text-white/70 text-[11px] tracking-widest uppercase px-4 py-1.5 rounded-full
                         border border-white/10 pointer-events-none"
            >
              {img.label}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.button
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12, type: 'spring', stiffness: 320, damping: 26 }}
          whileHover={{ scale: 1.1, x: 3, transition: { type: 'spring', stiffness: 500 } }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onNav(1)}
          className="absolute right-3 md:right-6 z-20 w-12 h-12 rounded-full
                     border border-white/20 bg-white/5 backdrop-blur-sm
                     flex items-center justify-center text-white/70 hover:text-white
                     hover:border-white/40 hover:bg-white/10 transition-colors"
        >
          <ChevronRight size={22} strokeWidth={2} />
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.35 }}
        className="shrink-0 px-6 py-4 flex gap-2 justify-center overflow-x-auto no-scrollbar"
        onClick={e => e.stopPropagation()}
      >
        {images.map((im, i) => (
          <motion.button
            key={im.src}
            onClick={() => i !== index && onJump(i)}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`View ${im.label}`}
            className={[
              'shrink-0 w-12 h-9 md:w-16 md:h-11 rounded-md overflow-hidden border-2 transition-all duration-200',
              i === index
                ? 'border-gold-400 opacity-100 scale-110'
                : 'border-transparent opacity-40 hover:opacity-70',
            ].join(' ')}
          >
            <img
              src={im.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  )
}

/* ── main page ── */
export default function ShipBreaking() {
  const heroRef    = useRef(null)
  const statsRef   = useRef(null)
  const processRef = useRef(null)

  const [lb, setLb] = useState({ open: false, index: 0, dir: 0 })
  const openLb  = useCallback((i) => setLb({ open: true, index: i, dir: 0 }), [])
  const closeLb = useCallback(() => setLb(s => ({ ...s, open: false })), [])
  const navLb   = useCallback((d) => {
    setLb(s => ({
      open: true,
      dir: d,
      index: (s.index + d + galleryImages.length) % galleryImages.length,
    }))
  }, [])
  const jumpLb  = useCallback((i) => {
    setLb(s => ({ open: true, index: i, dir: i > s.index ? 1 : -1 }))
  }, [])

  const statsInView   = useInView(statsRef,   { once: true, margin: '-80px' })
  const processInView = useInView(processRef, { once: false, margin: '-100px' })

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroImgY    = useTransform(heroScroll, [0, 1], ['0%', '28%'])
  const heroTextY   = useTransform(heroScroll, [0, 1], ['0%', '18%'])
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white overflow-x-hidden"
    >
      <PageHead title="Ship Breaking" />

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[680px] flex flex-col justify-end overflow-hidden"
      >
        <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
          <img
            src="/images/ship-breaking/coastal-view.jpeg"
            alt="Ship breaking yard at Sitakunda, Chittagong"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover scale-110"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-transparent to-transparent" />

        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundSize: '200px 200px',
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/80 to-transparent" />

        <motion.div
          className="relative section-container pb-14 sm:pb-20 lg:pb-28"
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: ease.smooth }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-gold-500" />
            <span className="text-gold-500 text-xs font-semibold tracking-[0.3em] uppercase">
              East Queen Shipping Ltd.
            </span>
          </motion.div>

          <h1 className="font-playfair font-bold text-display text-white leading-[1.04] mb-8">
            <span className="block overflow-hidden">
              <WordDrop text="Ship Breaking" className="block" delay={0.2} />
            </span>
            <span className="block overflow-hidden">
              <WordDrop
                text="& Recycling"
                delay={0.42}
                className="block text-gradient-gold"
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7, ease: ease.smooth }}
            className="max-w-xl text-white/55 text-lg leading-relaxed mb-10"
          >
            Bangladesh's premier ship recycling facility — combining industrial scale
            with rigorous international safety standards. Operating in{' '}
            <span className="text-white/80">Sitakunda, Chittagong</span> since 1982.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6, ease: ease.smooth }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2.5 bg-gold-500 hover:bg-gold-400
                         text-white font-bold text-sm px-7 py-3.5 rounded-lg tracking-wide
                         transition-all duration-200 hover:shadow-gold-glow group"
            >
              Get a Quote
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="inline-flex items-center gap-2 text-white/40 text-sm">
              <MapPin size={14} className="text-gold-500/70" />
              Sitakunda, Chittagong, Bangladesh
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="text-white/25 text-[10px] tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} className="text-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section ref={statsRef} className="relative bg-slate-50 border-y border-slate-200">
        <div className="section-container py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x md:divide-slate-200">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 32 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.1, duration: 0.55, ease: ease.smooth }}
                className="md:px-8 first:pl-0 last:pr-0"
              >
                <StatItem {...s} inView={statsInView} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <p className="text-gold-500 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
                About the Division
              </p>
              <div className="h-[2px] w-10 bg-gold-500 rounded-full mb-6" />
              <h2 className="font-playfair font-bold text-h1 text-slate-900 leading-tight mb-6">
                Where Steel Meets the Sea — and Returns to Industry
              </h2>
              <p className="text-slate-500 leading-relaxed mb-5">
                East Queen Shipping's ship-breaking division has been transforming end-of-life vessels
                into high-grade steel since 1982. Our yard at Sitakunda operates under the strictest
                international environmental and safety protocols.
              </p>
              <p className="text-slate-500 leading-relaxed">
                Every vessel dismantled generates recoverable steel that feeds Bangladesh's thriving
                re-rolling industry — creating a circular economy from ocean to furnace.
              </p>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-card">
                <img
                  src="/images/ship-breaking/scrap-urban-1.jpeg"
                  alt="Ship dismantling operations"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5, ease: ease.snappy }}
                className="absolute -bottom-6 -left-6 bg-white border border-slate-200 rounded-xl px-5 py-4 shadow-hover"
              >
                <p className="font-mono text-3xl font-bold text-gold-500 leading-none">40+</p>
                <p className="text-slate-500 text-xs mt-1 tracking-wide">Years in operation</p>
              </motion.div>

              <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-gold-500/40 rounded-tr-lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern pointer-events-none" />
        <div className="relative section-container">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mb-14"
          >
            <motion.p variants={fadeUp} className="text-gold-500 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              What We Do
            </motion.p>
            <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-6" />
            <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h1 text-slate-900 max-w-xl">
              Full-Cycle Ship Recycling Capabilities
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                variants={i % 2 === 0 ? fadeLeft : fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4, transition: { duration: 0.25, ease: ease.smooth } }}
                className="group bg-white hover:bg-white border border-slate-200 hover:border-gold-200
                           rounded-2xl p-7 hover:shadow-card transition-all duration-300 cursor-default"
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-xl bg-gold-50 border border-gold-100
                                group-hover:bg-gold-500 group-hover:border-gold-500
                                flex items-center justify-center transition-all duration-300"
                  >
                    <cap.icon
                      size={20}
                      className="text-gold-500 group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-gold-500 border border-gold-200 rounded-full px-2.5 py-1 bg-gold-50">
                    {cap.tag}
                  </span>
                </div>
                <h3 className="font-playfair font-bold text-xl text-slate-900 mb-3">{cap.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section ref={processRef} className="section-padding bg-white relative overflow-hidden">
        <div className="relative section-container">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-60px' }}
            className="mb-20 text-center"
          >
            <motion.p variants={fadeUp} className="text-gold-500 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              The Process
            </motion.p>
            <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-6 mx-auto" />
            <motion.h2 variants={fadeUp} className="font-playfair font-bold text-h1 text-slate-900 max-w-xl mx-auto">
              From Ocean Arrival to Steel Output
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 mt-5 max-w-md mx-auto leading-relaxed">
              Five precision-engineered stages transforming end-of-life vessels into high-grade steel.
            </motion.p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-slate-200 hidden lg:block" />
            <motion.div
              className="absolute left-1/2 -translate-x-px top-0 w-px bg-gradient-to-b from-gold-500 via-gold-400/50 to-transparent origin-top hidden lg:block"
              style={{ height: '100%' }}
              initial={{ scaleY: 0 }}
              animate={processInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 2.2, ease: ease.slow, delay: 0.1 }}
            />

            <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200 lg:hidden" />
            <motion.div
              className="absolute left-6 top-0 w-px bg-gradient-to-b from-gold-500 via-gold-400/50 to-transparent origin-top lg:hidden"
              style={{ height: '100%' }}
              initial={{ scaleY: 0 }}
              animate={processInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 2.2, ease: ease.slow, delay: 0.1 }}
            />

            <div className="flex flex-col gap-8 lg:gap-4">
              {processSteps.map((p, i) => {
                const isLeft = i % 2 === 0
                const delay  = i * 0.08

                return (
                  <div
                    key={p.step}
                    className="relative flex items-start gap-5 lg:grid lg:grid-cols-[1fr_6rem_1fr] lg:items-center lg:gap-0"
                  >
                    <div className="hidden lg:block">
                      {isLeft ? (
                        <motion.div
                          initial={{ opacity: 0, x: -65, y: 20 }}
                          whileInView={{ opacity: 1, x: 0, y: 0 }}
                          viewport={{ once: false, margin: '-60px' }}
                          transition={{ delay, duration: 0.6, ease: ease.smooth }}
                          whileHover={{ x: -6, y: -5, transition: { duration: 0.22 } }}
                          className="group mr-6 bg-white border border-slate-200 rounded-2xl p-6
                                     hover:border-gold-300 hover:shadow-card transition-all duration-300 cursor-default"
                        >
                          <motion.h3
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: '-60px' }}
                            transition={{ delay: delay + 0.14, duration: 0.4, ease: ease.smooth }}
                            className="font-bold text-slate-900 text-base mb-2 text-right group-hover:text-gold-600 transition-colors"
                          >
                            {p.title}
                          </motion.h3>
                          <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: '-60px' }}
                            transition={{ delay: delay + 0.22, duration: 0.4, ease: ease.smooth }}
                            className="text-slate-500 text-sm leading-relaxed text-right"
                          >
                            {p.description}
                          </motion.p>
                        </motion.div>
                      ) : (
                        <div className="mr-6" />
                      )}
                    </div>

                    <div className="relative z-10 flex justify-center items-center shrink-0 lg:shrink">
                      <motion.div
                        initial={{ opacity: 0, y: -36, scale: 0.5 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: false, margin: '-60px' }}
                        transition={{ delay, type: 'spring', stiffness: 400, damping: 22 }}
                        className="relative w-14 h-14 rounded-full bg-white border-2 border-gold-300
                                   flex items-center justify-center shadow-sm-card"
                      >
                        <span className="font-mono text-xs font-bold text-gold-500">{p.step}</span>
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-gold-400/35"
                          initial={{ scale: 1, opacity: 0.7 }}
                          whileInView={{ scale: 1.9, opacity: 0 }}
                          viewport={{ once: false, margin: '-60px' }}
                          transition={{ delay: delay + 0.18, duration: 1.1, ease: 'easeOut' }}
                        />
                      </motion.div>
                    </div>

                    <div className="hidden lg:block">
                      {!isLeft ? (
                        <motion.div
                          initial={{ opacity: 0, x: 65, y: 20 }}
                          whileInView={{ opacity: 1, x: 0, y: 0 }}
                          viewport={{ once: false, margin: '-60px' }}
                          transition={{ delay, duration: 0.6, ease: ease.smooth }}
                          whileHover={{ x: 6, y: -5, transition: { duration: 0.22 } }}
                          className="group ml-6 bg-white border border-slate-200 rounded-2xl p-6
                                     hover:border-gold-300 hover:shadow-card transition-all duration-300 cursor-default"
                        >
                          <motion.h3
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: '-60px' }}
                            transition={{ delay: delay + 0.14, duration: 0.4, ease: ease.smooth }}
                            className="font-bold text-slate-900 text-base mb-2 group-hover:text-gold-600 transition-colors"
                          >
                            {p.title}
                          </motion.h3>
                          <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: '-60px' }}
                            transition={{ delay: delay + 0.22, duration: 0.4, ease: ease.smooth }}
                            className="text-slate-500 text-sm leading-relaxed"
                          >
                            {p.description}
                          </motion.p>
                        </motion.div>
                      ) : (
                        <div className="ml-6" />
                      )}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, x: 44, y: 16 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: false, margin: '-60px' }}
                      transition={{ delay, duration: 0.55, ease: ease.smooth }}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      className="lg:hidden flex-1 bg-slate-50 border border-slate-200 rounded-xl p-5
                                 hover:border-gold-200 hover:bg-white hover:shadow-sm-card
                                 transition-all duration-300 cursor-default"
                    >
                      <h3 className="font-bold text-slate-900 text-base mb-2">{p.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{p.description}</p>
                    </motion.div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section-padding bg-slate-50 relative">
        <div className="absolute inset-0 bg-dots-pattern pointer-events-none" />
        <div className="relative section-container">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mb-12"
          >
            <motion.p variants={fadeUp} className="text-gold-500 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Yard Gallery
            </motion.p>
            <motion.div variants={fadeUp} className="h-[2px] w-10 bg-gold-500 rounded-full mb-6" />
            <motion.div variants={fadeUp} className="flex items-end justify-between flex-wrap gap-4">
              <h2 className="font-playfair font-bold text-h1 text-slate-900">
                Inside the Sitakunda Yard
              </h2>
              <p className="text-slate-400 text-sm">{galleryImages.length} photos · click to explore</p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[180px] md:auto-rows-[200px]">
            {galleryImages.map((img, i) => (
              <GalleryCard
                key={img.src}
                img={img}
                index={i}
                isTall={i === 0 || i === 6 || i === 12}
                initX={i % 3 === 0 ? -48 : i % 3 === 2 ? 48 : 0}
                initY={i % 3 === 1 ? 40 : 0}
                delay={(i % 6) * 0.07}
                onClick={() => openLb(i)}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lb.open && (
          <Lightbox
            images={galleryImages}
            index={lb.index}
            dir={lb.dir}
            onNav={navLb}
            onJump={jumpLb}
            onClose={closeLb}
          />
        )}
      </AnimatePresence>

      {/* CERTIFICATIONS */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <p className="text-gold-500 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
                Compliance & Standards
              </p>
              <div className="h-[2px] w-10 bg-gold-500 rounded-full mb-6" />
              <h2 className="font-playfair font-bold text-h1 text-slate-900 mb-6">
                Operating to the World's Highest Standards
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Every phase of our recycling process adheres to the international regulatory
                framework governing ship dismantling — protecting workers, communities, and the
                marine environment.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="space-y-3"
            >
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert}
                  variants={fadeRight}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl px-5 py-4
                             hover:border-gold-200 hover:bg-gold-50 transition-all duration-300"
                >
                  <CheckCircle2 size={18} className="text-gold-500 shrink-0" />
                  <span className="text-slate-700 text-sm">{cert}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-navy-900 section-padding">
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none select-none" aria-hidden>
          <Anchor size={260} className="text-white/[0.025]" strokeWidth={0.8} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/70 to-transparent" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative section-container"
        >
          <div className="max-w-2xl">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <Waves size={16} className="text-gold-500/60" />
              <span className="text-gold-500/60 text-xs tracking-widest uppercase font-semibold">
                Ready to Proceed?
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-playfair font-bold text-h1 text-white mb-6 leading-tight"
            >
              Have a vessel to recycle?
            </motion.h2>

            <motion.p variants={fadeUp} className="text-white/45 text-lg leading-relaxed mb-10">
              Contact our maritime team for competitive quotes, compliance documentation
              support, and full logistics coordination from any port of origin.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2.5 bg-gold-500 hover:bg-gold-400
                           text-white font-bold px-8 py-4 rounded-lg text-sm tracking-wide
                           transition-all duration-200 hover:shadow-gold-glow group"
              >
                Get a Quote
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/companies/east-queen-shipping"
                className="inline-flex items-center gap-2.5 glass-dark hover:bg-white/[0.1]
                           text-white/70 hover:text-white font-semibold px-8 py-4 rounded-lg text-sm
                           transition-all duration-200"
              >
                About East Queen Shipping
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

    </motion.div>
  )
}
