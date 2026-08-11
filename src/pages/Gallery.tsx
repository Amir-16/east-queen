import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import { pageTransition, stagger, scaleIn } from '@/lib/motion'
import PageHero from '@/components/ui/PageHero'
import SectionHeader from '@/components/ui/SectionHeader'
import { galleryItems } from '@/data'
import type { GalleryItem } from '@/types'

type Category = 'all' | GalleryItem['category']

const categories: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Operations', value: 'operations' },
  { label: 'Facilities', value: 'facilities' },
  { label: 'Team', value: 'team' },
  { label: 'Products', value: 'products' },
]

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const filtered = activeCategory === 'all' ? galleryItems : galleryItems.filter((g) => g.category === activeCategory)

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <PageHero
        title="Our Gallery"
        subtitle="A visual journey through our operations, facilities, team, and products."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
        image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
      />

      <section className="section-padding bg-white">
        <div className="section-container">
          <SectionHeader
            eyebrow="Gallery"
            title="Behind the Scenes"
            subtitle="Explore our industrial operations, state-of-the-art facilities, and the people who make it all possible."
            align="center"
            className="mb-10"
          />

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`relative px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.value
                    ? 'bg-navy-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-navy-900'
                }`}
              >
                {activeCategory === cat.value && (
                  <motion.span
                    layoutId="gallery-filter"
                    className="absolute inset-0 bg-navy-900 rounded-xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <motion.div
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            variants={stagger}
            initial="hidden"
            animate="visible"
            key={activeCategory}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  variants={scaleIn}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid mb-4 shadow-card"
                  onClick={() => setLightboxIndex(i)}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <span className="inline-block px-2 py-0.5 bg-gold-500 text-navy-900 text-[10px] font-semibold uppercase tracking-wider rounded mb-2">
                        {item.category}
                      </span>
                      {item.caption && (
                        <p className="text-white text-sm font-medium leading-tight">{item.caption}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={filtered.map((item) => ({ src: item.src, alt: item.alt, description: item.caption }))}
        plugins={[Zoom, Captions]}
        styles={{
          container: { backgroundColor: 'rgba(6, 14, 30, 0.97)' },
        }}
      />
    </motion.div>
  )
}
