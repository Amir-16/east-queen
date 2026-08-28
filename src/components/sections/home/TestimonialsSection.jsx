import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { StarIcon } from '@heroicons/react/24/solid'
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import SectionTitle from '../../ui/SectionTitle'
import { testimonialsData } from '../../../data/testimonials.data'
import { fadeInUp } from '../../../utils/animations'

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-gradient-dark overflow-hidden relative">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="Client Reviews"
          title="What Our"
          highlight="Clients Say"
          description="Don't take our word for it. Here's what our clients across the UAE say about working with us."
          light
        />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {testimonialsData.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-7 h-full flex flex-col gap-4">
                  <ChatBubbleLeftIcon className="w-8 h-8 text-accent opacity-60" />
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 text-accent" />
                    ))}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed flex-1 italic">"{t.message}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div>
                      <div className="font-display font-bold text-white text-sm">{t.name}</div>
                      <div className="text-white/50 text-xs">{t.role}, {t.company}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}
