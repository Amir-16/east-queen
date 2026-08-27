import { motion } from 'framer-motion'
import { pageTransition } from '@/lib/motion'
import SEO from '@/components/ui/SEO'
import ShipHeroSection from '@/components/sections/ShipHeroSection'
import HeroSection from '@/components/sections/HeroSection'
import MarqueeStrip from '@/components/sections/MarqueeStrip'
import AboutSnippet from '@/components/sections/AboutSnippet'
import ChairmanMessage from '@/components/sections/ChairmanMessage'
import CompaniesPreview from '@/components/sections/CompaniesPreview'
import ShipBreakingFeature from '@/components/sections/ShipBreakingFeature'
import ProductsHighlight from '@/components/sections/ProductsHighlight'
import ProcessStrip from '@/components/sections/ProcessStrip'
import GalleryMosaic from '@/components/sections/GalleryMosaic'
import StatsSection from '@/components/sections/StatsSection'
import MapVisual from '@/components/sections/MapVisual'
import AssociatesTeaser from '@/components/sections/AssociatesTeaser'
import ContactCTA from '@/components/sections/ContactCTA'

export default function Home() {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <SEO url="/" />
      <ShipHeroSection />
      <HeroSection />
      <MarqueeStrip />
      <AboutSnippet />
      <ChairmanMessage />
      <CompaniesPreview />
      <ShipBreakingFeature />
      <ProductsHighlight />
      <ProcessStrip />
      <GalleryMosaic />
      <StatsSection />
      <MapVisual />
      <AssociatesTeaser />
      <ContactCTA />
    </motion.div>
  )
}
