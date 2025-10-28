import { HeroSection } from '../components/ui/hero-section'
import { ContainerScroll } from '../components/ui/container-scroll-animation'
import HowItWorks from '../components/ui/how-it-works'
import RoadmapSection from '../components/ui/roadmap'
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
      
      {/* Footer with X link */}
      <footer className="bg-gradient-to-br from-[#1a1d18] via-black to-[#2a2e26] py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <a
            href="https://x.com/turnstilefndn?s=11"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white hover:bg-gray-100 transition-all hover:scale-110 shadow-lg"
          >
            <img 
              src="https://res.cloudinary.com/dbdzl9lt6/image/upload/v1761684555/twitter_mp2o4n.png" 
              alt="X (Twitter)" 
              className="w-5 h-5"
            />
          </a>
          <p className="mt-6 text-sm text-[#c8b4a0]/70">
            &copy; 2025 Turnstile. Built on Solana. Powered by x402.
          </p>
        </div>
      </footer>
    </>
  )
}
