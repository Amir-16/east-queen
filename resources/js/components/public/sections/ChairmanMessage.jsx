import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Quote } from 'lucide-react'
import { ease } from '@/lib/motion'

const CHAIRMAN = {
  name:  'Our Founder & Chairman',
  title: 'East Queen Group · Est. 1982',
  quote:
    "What began as a single ship-breaking yard on the shores of Chittagong has grown into a family of companies built on trust, discipline, and a deep belief in Bangladesh's industrial future. We don't just trade commodities — we build relationships that last generations.",
  photo: '/images/team/chairman.jpeg',
}

function ClipRevealText({ text, inView }) {
  return (
    <motion.span
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.018, delayChildren: 0.3 } },
      }}
      className="inline"
    >
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden:  { opacity: 0, y: 20, filter: 'blur(6px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: ease.smooth } },
          }}
          className="inline-block mr-[0.28em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function ChairmanMessage({ chairman }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const name  = chairman?.name  ?? CHAIRMAN.name
  const title = chairman?.title ?? CHAIRMAN.title
  const quote = chairman?.quote ?? CHAIRMAN.quote
  const photo = chairman?.photo ?? CHAIRMAN.photo

  return (
    <section ref={ref} className="section-padding bg-white relative overflow-hidden">
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 70% at 85% 40%, rgba(226,31,47,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — photo */}
          <motion.div
            initial={{ opacity: 0, x: -56 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: ease.smooth }}
            className="relative"
          >
            {/* Corner accent top-left */}
            <div className="absolute -top-5 -left-5 w-20 h-20 border-t-2 border-l-2 border-gold-500/40 rounded-tl-xl pointer-events-none" />

            <div className="relative overflow-hidden rounded-2xl aspect-[3/4] max-w-[380px] mx-auto lg:mx-0 shadow-deep">
              <img
                src={photo}
                alt={`${name}, Chairman of East Queen Group`}
                className="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent" />
            </div>

            {/* Corner accent bottom-right */}
            <div className="absolute -bottom-5 -right-5 w-20 h-20 border-b-2 border-r-2 border-gold-500/40 rounded-br-xl pointer-events-none" />

            {/* Years badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: 16 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.5, ease: ease.snappy }}
              className="absolute -right-4 top-1/3 hidden lg:flex flex-col items-center
                         bg-navy-900 text-white rounded-2xl px-4 py-5 shadow-hover"
            >
              <span className="font-mono font-black text-gold-500 text-3xl leading-none">42</span>
              <span className="text-white/40 text-[10px] uppercase tracking-widest mt-1.5">Years</span>
            </motion.div>
          </motion.div>

          {/* Right — message */}
          <motion.div
            initial={{ opacity: 0, x: 56 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: ease.smooth }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-10 bg-gold-500 rounded-full" />
              <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-[0.28em]">
                Chairman's Message
              </span>
            </div>

            {/* Decorative quote mark */}
            <Quote size={52} strokeWidth={1} className="text-gold-500/15 mb-3 -ml-1" />

            {/* Quote — word-by-word reveal */}
            <blockquote className="font-playfair text-2xl lg:text-[1.65rem] text-navy-900 leading-[1.45] mb-8 italic">
              <ClipRevealText text={quote} inView={inView} />
            </blockquote>

            {/* Attribution */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.75, duration: 0.5, ease: ease.smooth }}
            >
              <p className="font-inter font-bold text-navy-900 text-base">{name}</p>
              <p className="text-slate-500 text-sm mt-0.5">{title}</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
