import { motion } from 'framer-motion'
import { stagger, fadeLeft, fadeRight } from '@/lib/motion'

const CHAIRMAN = {
  name: 'Mr. Shahrear Hussain',
  title: 'Chairman & Founder, East Queen Group',
  quote: `"From our first vessel on the shores of Chittagong, I knew that East Queen's journey would be defined not just by commerce, but by character. Four decades on, the values we began with — integrity, resilience, and a commitment to our people — remain the foundation of everything we do. We are proud of what this Group has become, and even more excited about the horizon ahead."`,
  photo: '/images/chairman/chairman-1.jpeg',
}

function WordReveal({ text, className, delay = 0 }) {
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.04, delayChildren: delay } },
      }}
      className={className}
      aria-label={text}
    >
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden:  { opacity: 0, filter: 'blur(6px)', y: 10 },
            visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.45 } },
          }}
          className="inline-block mr-[0.22em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function ChairmanMessage({ chairman }) {
  const name  = chairman?.name  ?? CHAIRMAN.name
  const title = chairman?.title ?? CHAIRMAN.title
  const quote = chairman?.quote ?? CHAIRMAN.quote
  const photo = chairman?.photo ?? CHAIRMAN.photo

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Photo */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl aspect-[3/4] max-w-sm mx-auto shadow-deep">
              <img src={photo} alt={name} className="w-full h-full object-cover kenburns" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gold-500 text-navy-950 rounded-2xl px-5 py-3 shadow-gold-glow">
              <p className="font-mono font-black text-2xl leading-none">42+</p>
              <p className="text-[10px] font-bold tracking-wide">Years of Legacy</p>
            </div>
          </motion.div>

          {/* Right — Quote */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <div className="h-[2px] w-10 bg-gold-500 rounded-full mb-6" />
            <p className="text-gold-500 text-[11px] font-bold uppercase tracking-[0.35em] mb-4">
              Chairman's Message
            </p>
            <blockquote className="font-playfair text-xl md:text-2xl text-navy-900 leading-relaxed italic mb-8">
              <WordReveal text={quote} />
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold-300">
                <img src={photo} alt={name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-semibold text-navy-900 text-sm">{name}</p>
                <p className="text-slate-400 text-xs">{title}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
