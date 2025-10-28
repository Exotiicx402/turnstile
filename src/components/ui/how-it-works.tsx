const steps = [
  {
    number: "01",
    title: "List a Service",
    description: "Set per-call pricing in USDC or $TSTL and enable x402 on your endpoint.",
  },
  {
    number: "02",
    title: "Deploy an Agent",
    description: "Select services from the marketplace and wire them into your AI agent.",
  },
  {
    number: "03",
    title: "Pay-per-Call",
    description: "Each request triggers 402 payment, executes instantly, and requires no subscription overhead.",
  },
  {
    number: "04",
    title: "Settle & Track",
    description: "Solana handles instant settlement while dashboards monitor usage, revenue, and $TSTL rewards.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-br from-[#1a1d18] via-black to-[#2a2e26] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extralight text-[#f8f7f5] mb-4">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-[#c8b4a0] font-light max-w-2xl mx-auto">
            From listing to settlement — the complete x402 workflow for providers and builders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group"
              style={{
                animation: "word-appear 0.8s ease-out forwards",
                animationDelay: `${index * 0.15}s`,
                opacity: 0,
              }}
            >
              <div className="bg-[#1a1d18]/50 backdrop-blur-sm border border-[#3c4237] rounded-2xl p-8 h-full transition-all duration-300 hover:border-[#c8b4a0] hover:shadow-xl hover:shadow-[#c8b4a0]/10">
                <div className="mb-6">
                  <span className="text-5xl font-extralight text-[#c8b4a0] opacity-40 group-hover:opacity-60 transition-opacity">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#f8f7f5] mb-4">
                  {step.title}
                </h3>
                <p className="text-[#c8b4a0] leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {/* Connector line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-[#c8b4a0] to-transparent opacity-30" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="#waitlist">
            <button className="px-8 py-4 bg-[#c8b4a0] text-[#1a1d18] font-semibold rounded-lg hover:bg-[#f8f7f5] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#c8b4a0]/20">
              Get Listed
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
