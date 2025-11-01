import { useState } from 'react';
import { Rocket, CheckCircle } from 'lucide-react';

export default function ProviderSignup() {
  const [email, setEmail] = useState('');
  const [apiName, setApiName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/meoprzvn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email,
          apiName,
          type: 'provider' // Flag to distinguish from waitlist
        })
      });
      
      if (response.ok) {
        setIsLoading(false);
        setShowSuccess(true);
        setEmail('');
        setApiName('');
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting provider info:', error);
      setIsLoading(false);
      // Still show success to user even if submission fails
      setShowSuccess(true);
      setEmail('');
      setApiName('');
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#2a2e26] via-[#1a1d18] to-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Provider signup */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-4">
              <Rocket className="w-10 h-10 text-[#c8b4a0]" />
              <h2 className="text-4xl md:text-5xl font-extralight text-[#f8f7f5]">
                Become a Provider
              </h2>
            </div>
            <p className="text-lg md:text-xl text-[#c8b4a0] font-light mb-2">
              List your API on Turnstile and earn from every call.
            </p>
            <p className="text-sm text-[#c8b4a0]/80 font-light mb-8">
              Instant settlements • No subscriptions • Pay-per-call revenue
            </p>
            
            {/* Success Message */}
            {showSuccess && (
              <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <p className="text-emerald-400 text-sm">
                  Thanks! We'll reach out with onboarding details soon.
                </p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={apiName}
                  onChange={(e) => setApiName(e.target.value)}
                  placeholder="Your API/Service name"
                  required
                  className="w-full px-4 py-4 bg-[#1a1d18]/50 border border-[#3c4237] rounded-lg text-[#f8f7f5] placeholder-[#c8b4a0]/50 focus:outline-none focus:border-[#c8b4a0] transition-all"
                />
              </div>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="w-full px-4 py-4 bg-[#1a1d18]/50 border border-[#3c4237] rounded-lg text-[#f8f7f5] placeholder-[#c8b4a0]/50 focus:outline-none focus:border-[#c8b4a0] transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={showSuccess || isLoading}
                className="w-full px-8 py-4 bg-[#c8b4a0] text-[#1a1d18] font-semibold rounded-lg hover:bg-[#f8f7f5] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#c8b4a0]/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? 'Submitting...' : 'Apply to List Your API'}
              </button>
            </form>
          </div>

          {/* Right side - Benefits */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="bg-[#2a2e26]/30 border border-[#3c4237] rounded-xl p-6">
              <h3 className="text-[#f8f7f5] text-xl font-semibold mb-3">Why List on Turnstile?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-[#c8b4a0]">Instant settlements on every API call via Solana</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-[#c8b4a0]">No payment processing hassles or NET-30 delays</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-[#c8b4a0]">Set your own per-call pricing in USDC or TSTL</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-[#c8b4a0]">Access to AI agents and on-chain builders</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-[#c8b4a0]">Real-time analytics and revenue tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
