import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Play, Image as ImageIcon, Video } from 'lucide-react'
import { pageTransition, stagger, fadeUp } from '@/lib/motion'
import PageHero from '@/components/public/ui/PageHero'
import { galleryItems } from '@/data/gallery'

const galleryImages = galleryItems.filter((i) => i.type !== 'video')
const galleryVideos = galleryItems.filter((i) => i.type === 'video')

const MEDIA_TABS = [
  { id: 'all',    label: 'All',    icon: null  },
  { id: 'photos', label: 'Photos', icon: ImageIcon },
  { id: 'videos', label: 'Videos', icon: Video },
]

const IMG_CATEGORIES    = ['All', 'Operations', 'Products', 'Facilities']
const VIDEO_CATEGORIES  = ['All', 'Ship Breaking', 'Operations', 'Exports', 'Shipping', 'Fisheries']

function ImageLightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  if (currentIndex === null) return null
  const image = images[currentIndex]
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white z-10 p-2">
        <X size={24} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onPrev() }} className="absolute left-4 text-white/60 hover:text-white z-10 p-2">
        <ChevronLeft size={28} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onNext() }} className="absolute right-14 text-white/60 hover:text-white z-10 p-2">
        <ChevronRight size={28} />
      </button>
      <motion.img
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        src={image.src}
        alt={image.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
      />
      {image.caption && (
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm text-center">{image.caption}</p>
      )}
      <p className="absolute bottom-6 right-6 text-white/30 text-xs">{currentIndex + 1} / {images.length}</p>
    </motion.div>
  )
}

function VideoModal({ video, onClose }) {
  if (!video) return null
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white p-2">
        <X size={24} />
      </button>
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden bg-black"
      >
        {video.src && (
          <video src={video.src} controls autoPlay className="w-full h-full object-contain" />
        )}
        {video.youtubeId && (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            allow="autoplay; encrypted-media"
            className="w-full h-full"
          />
        )}
      </motion.div>
    </motion.div>
  )
}

function VideoThumbnail({ video, onClick }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl cursor-pointer group"
      onClick={onClick}
    >
      {video.thumbnail ? (
        <img src={video.thumbnail} alt={video.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
      ) : (
        <div className="w-full h-44 bg-navy-900 flex items-center justify-center">
          <Video size={32} className="text-white/20" />
        </div>
      )}
      <div className="absolute inset-0 bg-navy-950/50 group-hover:bg-navy-950/30 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
          <Play size={18} className="text-white ml-0.5" fill="white" />
        </div>
      </div>
      {video.title && (
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-navy-950">
          <p className="text-white text-xs font-medium truncate">{video.title}</p>
          {video.category && <p className="text-white/40 text-[10px] uppercase tracking-wider mt-0.5">{video.category}</p>}
        </div>
      )}
    </div>
  )
}

export default function Gallery({ images = galleryImages, videos = galleryVideos } = {}) {
  const [mediaTab, setMediaTab]    = useState('all')
  const [imgCategory, setImgCat]   = useState('All')
  const [vidCategory, setVidCat]   = useState('All')
  const [lightboxIdx, setLightbox] = useState(null)
  const [activeVideo, setVideo]    = useState(null)

  const showImages = mediaTab === 'all' || mediaTab === 'photos'
  const showVideos = mediaTab === 'all' || mediaTab === 'videos'

  const filteredImages = imgCategory === 'All' ? images : images.filter((img) => img.category?.toLowerCase() === imgCategory.toLowerCase())
  const filteredVideos = vidCategory === 'All' ? videos : videos.filter((v) => v.category?.toLowerCase() === vidCategory.toLowerCase())

  const prevImg = useCallback(() => setLightbox((i) => (i > 0 ? i - 1 : filteredImages.length - 1)), [filteredImages.length])
  const nextImg = useCallback(() => setLightbox((i) => (i < filteredImages.length - 1 ? i + 1 : 0)), [filteredImages.length])

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <PageHero
        title="Gallery"
        subtitle="Visual stories from our ship-breaking yards, trading operations, and export facilities across Bangladesh."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
        image="/images/ship-breaking/coastal-view.jpeg"
      />

      <section className="section-padding bg-slate-50">
        <div className="section-container">
          {/* Media type tabs */}
          <div className="flex items-center gap-2 mb-8">
            {MEDIA_TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setMediaTab(id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  mediaTab === id ? 'bg-navy-900 border-navy-900 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-navy-300'
                }`}
              >
                {Icon && <Icon size={13} />} {label}
              </button>
            ))}
          </div>

          {/* Images section */}
          <AnimatePresence>
            {showImages && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-12"
              >
                {/* Category pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {IMG_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setImgCat(cat)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                        imgCategory === cat ? 'bg-gold-500 border-gold-500 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-gold-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Masonry grid */}
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="visible"
                  className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3"
                >
                  {filteredImages.map((img, i) => (
                    <motion.div
                      key={img.id}
                      variants={fadeUp}
                      className="break-inside-avoid rounded-xl overflow-hidden cursor-pointer group relative"
                      onClick={() => setLightbox(i)}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                        style={{ animationDelay: `${i * 0.3}s` }}
                      />
                      <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/30 transition-colors duration-300" />
                      {img.caption && (
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-navy-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-xs">{img.caption}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Videos section */}
          <AnimatePresence>
            {showVideos && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {mediaTab === 'all' && (
                  <div className="mb-6">
                    <p className="text-gold-500 text-[11px] font-bold uppercase tracking-[0.35em] mb-2">Videos</p>
                    <div className="h-[2px] w-8 bg-gold-500 rounded-full" />
                  </div>
                )}

                {/* Video category pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {VIDEO_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setVidCat(cat)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                        vidCategory === cat ? 'bg-navy-900 border-navy-900 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-navy-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredVideos.map((v) => (
                    <VideoThumbnail key={v.id} video={v} onClick={() => setVideo(v)} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <ImageLightbox
            images={filteredImages}
            currentIndex={lightboxIdx}
            onClose={() => setLightbox(null)}
            onPrev={prevImg}
            onNext={nextImg}
          />
        )}
      </AnimatePresence>

      {/* Video modal */}
      <AnimatePresence>
        {activeVideo && <VideoModal video={activeVideo} onClose={() => setVideo(null)} />}
      </AnimatePresence>
    </motion.div>
  )
}
