import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useHeroSlides } from '@/hooks/useOdoo'
import { Button } from '@/components/ui'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

export default function HeroCarousel() {
  const { data: slides, isLoading } = useHeroSlides()
  const navigate = useNavigate()

  if (isLoading || !slides) {
    return (
      <div className="h-[500px] lg:h-[600px] bg-ink-900 animate-pulse rounded-2xl" />
    )
  }

  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        loop
        className="h-[500px] lg:h-[600px] rounded-2xl overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-full w-full flex items-center"
              style={{
                background: `radial-gradient(ellipse at 70% 50%, ${slide.accent}15 0%, transparent 60%), linear-gradient(to right, #07070e 0%, #030308 100%)`,
              }}
            >
              {/* Background Grid */}
              <div className="absolute inset-0 bg-grid-ink bg-[size:40px_40px] opacity-30" />

              {/* Content */}
              <div className="relative z-10 container mx-auto px-6 lg:px-12">
                <div className="max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <span
                      className="inline-block px-3 py-1 text-sm font-medium rounded-full mb-4"
                      style={{
                        backgroundColor: `${slide.accent}20`,
                        color: slide.accent,
                      }}
                    >
                      Nouveauté
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="font-display text-4xl lg:text-6xl font-bold text-ink-50 mb-2"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="font-display text-2xl lg:text-3xl font-medium mb-4"
                    style={{ color: slide.accent }}
                  >
                    {slide.subtitle}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-lg text-ink-300 mb-8"
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Button
                      onClick={() => navigate(`/produits/${slide.productId}`)}
                      className="group"
                      size="lg"
                    >
                      Découvrir
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Emoji decoration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute right-12 lg:right-24 top-1/2 -translate-y-1/2 hidden lg:block"
              >
                <span
                  className="text-[180px] opacity-80 drop-shadow-2xl"
                  style={{ filter: `drop-shadow(0 0 60px ${slide.accent}40)` }}
                >
                  {slide.emoji}
                </span>
              </motion.div>

              {/* Slide indicator */}
              <div className="absolute bottom-8 left-6 lg:left-12 flex items-center gap-2 text-ink-400 text-sm">
                <span className="font-mono" style={{ color: slide.accent }}>
                  0{index + 1}
                </span>
                <span>/</span>
                <span>0{slides.length}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
