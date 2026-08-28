import HeroSection from '../components/sections/home/HeroSection'
import StatsSection from '../components/sections/home/StatsSection'
import ServicesSection from '../components/sections/home/ServicesSection'
import WhyChooseUsSection from '../components/sections/home/WhyChooseUsSection'
import PortfolioSection from '../components/sections/home/PortfolioSection'
import TestimonialsSection from '../components/sections/home/TestimonialsSection'
import ContactCTASection from '../components/sections/home/ContactCTASection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ContactCTASection />
    </>
  )
}
