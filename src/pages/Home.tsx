import { HeroSection } from '../components/ui/hero-section'
import { ContainerScroll } from '../components/ui/container-scroll-animation'
import HowItWorks from '../components/ui/how-it-works'
import RoadmapSection from '../components/ui/roadmap'
import ProviderSignup from '../components/ui/provider-signup'
import EmailSignup from '../components/ui/email-signup'

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="bg-gradient-to-br from-[#1a1d18] via-black to-[#2a2e26]">
        <ContainerScroll
          titleComponent={
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-extralight text-[#f8f7f5] mb-4">
                See Turnstile in Action
              </h2>
              <p className="text-lg md:text-xl text-[#c8b4a0] font-light">
                Demonstrating real-time x402 settlements across AI agents and on-chain services.
              </p>
            </div>
          }
        >
          <img
            src="https://res.cloudinary.com/dbdzl9lt6/image/upload/v1761634895/Screenshot_2025-10-28_at_00.01.13_leidcg.png"
            alt="Turnstile Dashboard"
            className="w-full h-full object-contain rounded-lg"
          />
        </ContainerScroll>
      </div>
      <HowItWorks />
      <RoadmapSection />
      <EmailSignup />
      <ProviderSignup />
      
      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#1a1d18] via-black to-[#2a2e26] py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-[#c8b4a0]/70">
            &copy; 2025 Turnstile. Built on Solana. Powered by x402.
          </p>
        </div>
      </footer>
    </>
  )
}
