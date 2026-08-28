import ShipHeroSection   from '@/components/public/sections/ShipHeroSection'
import HeroSection       from '@/components/public/sections/HeroSection'
import MarqueeStrip      from '@/components/public/sections/MarqueeStrip'
import AboutSnippet      from '@/components/public/sections/AboutSnippet'
import ChairmanMessage   from '@/components/public/sections/ChairmanMessage'
import CompaniesPreview  from '@/components/public/sections/CompaniesPreview'
import ShipBreakingFeature from '@/components/public/sections/ShipBreakingFeature'
import ProductsHighlight from '@/components/public/sections/ProductsHighlight'
import ProcessStrip      from '@/components/public/sections/ProcessStrip'
import GalleryMosaic     from '@/components/public/sections/GalleryMosaic'
import StatsSection      from '@/components/public/sections/StatsSection'
import MapVisual         from '@/components/public/sections/MapVisual'
import AssociatesTeaser  from '@/components/public/sections/AssociatesTeaser'
import ContactCTA        from '@/components/public/sections/ContactCTA'

export default function Home({ stats, chairman, companies, associates }) {
  return (
    <>
      <ShipHeroSection />
      <HeroSection />
      <MarqueeStrip />
      <AboutSnippet />
      <ChairmanMessage chairman={chairman} />
      <CompaniesPreview companiesData={companies} />
      <ShipBreakingFeature />
      <ProductsHighlight />
      <ProcessStrip />
      <GalleryMosaic />
      <StatsSection stats={stats} />
      <MapVisual />
      <AssociatesTeaser companiesData={companies} associatesData={associates} />
      <ContactCTA />
    </>
  )
}
