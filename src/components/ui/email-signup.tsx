import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export default function EmailSignup() {
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log('Email submitted:', email);
    setShowSuccess(true);
    setEmail('');
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <section id="waitlist" className="bg-gradient-to-br from-[#1a1d18] via-black to-[#2a2e26] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Email signup */}
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-extralight text-[#f8f7f5] mb-4">
              Get Listed Early
            </h2>
            <p className="text-lg md:text-xl text-[#c8b4a0] font-light mb-2">
              Join the waitlist for early access to the x402 marketplace.
            </p>
            <p className="text-sm text-[#c8b4a0]/80 font-light mb-2">
              Token Launching October 30th, 2025 • Q4 2025
            </p>
            <p className="text-sm text-[#c8b4a0]/80 font-light mb-8">
              Platform Launching November 11th, 2025
            </p>
            
            {/* Success Message */}
            {showSuccess && (
              <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <p className="text-emerald-400 text-sm">
                  Thank you, we start pre-announcement 7 days before the platform goes live.
                </p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c8b4a0] w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-[#1a1d18]/50 border border-[#3c4237] rounded-lg text-[#f8f7f5] placeholder-[#c8b4a0]/50 focus:outline-none focus:border-[#c8b4a0] transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={showSuccess}
                className="px-8 py-4 bg-[#c8b4a0] text-[#1a1d18] font-semibold rounded-lg hover:bg-[#f8f7f5] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#c8b4a0]/20 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Get Listed
              </button>
            </form>
            
            <p className="text-sm text-[#c8b4a0]/70 mt-4">
              No spam. Unsubscribe at any time.
            </p>
          </div>

          {/* Right side - Image */}
          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden border border-[#3c4237] hover:border-[#c8b4a0] transition-all duration-300">
              <img
                src="https://res.cloudinary.com/dbdzl9lt6/image/upload/v1761794666/ChatGPT_Image_Oct_29_2025_08_22_02_PM_ztsfqs.png"
                alt="Turnstile Platform"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1d18] via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
