import { useState } from 'react';
import { ChevronRight, Home, BookOpen, Rocket, Code, Wallet, Zap, Shield } from 'lucide-react';

const navigation = [
  {
    title: 'Getting Started',
    items: [
      { name: 'Introduction', icon: Home, href: '#introduction' },
      { name: 'How It Works', icon: BookOpen, href: '#how-it-works' },
      { name: 'Quick Start', icon: Rocket, href: '#quick-start' },
    ],
  },
  {
    title: 'For Providers',
    items: [
      { name: 'List a Service', icon: Code, href: '#list-service' },
      { name: 'Pricing & Payments', icon: Wallet, href: '#pricing' },
      { name: 'API Reference', icon: Zap, href: '#api-reference' },
    ],
  },
  {
    title: 'For Builders',
    items: [
      { name: 'Deploy an Agent', icon: Rocket, href: '#deploy-agent' },
      { name: 'Integration Guide', icon: Code, href: '#integration' },
      { name: 'Best Practices', icon: Shield, href: '#best-practices' },
    ],
  },
];

export default function Docs() {
  const [activeSection, setActiveSection] = useState('#introduction');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1d18] via-black to-[#2a2e26]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed top-0 left-0 h-screen w-64 bg-[#1a1d18]/80 backdrop-blur-sm border-r border-[#3c4237] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <img
                src="/src/assets/logos/turnstile.png"
                alt="Turnstile"
                className="h-8 w-8"
              />
              <span className="text-xl font-semibold text-[#f8f7f5]">Turnstile</span>
            </div>

            <nav className="space-y-6">
              {navigation.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xs font-semibold text-[#c8b4a0] uppercase tracking-wider mb-3">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeSection === item.href;
                      return (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            onClick={() => setActiveSection(item.href)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                              isActive
                                ? 'bg-[#c8b4a0]/10 text-[#f8f7f5] border-l-2 border-[#c8b4a0]'
                                : 'text-[#c8b4a0] hover:bg-[#c8b4a0]/5 hover:text-[#f8f7f5]'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm">{item.name}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <section id="introduction" className="mb-16">
              <h1 className="text-5xl font-extralight text-[#f8f7f5] mb-4">
                Turnstile Documentation
              </h1>
              <p className="text-xl text-[#c8b4a0] mb-6">
                Welcome to Turnstile, the first Solana-native x402 marketplace for AI agents and on-chain services.
              </p>
              <div className="bg-[#1a1d18]/50 border border-[#3c4237] rounded-lg p-6">
                <p className="text-[#c8b4a0] leading-relaxed">
                  Turnstile enables instant micropayments between AI agents and API providers using the x402 protocol on Solana. 
                  No subscriptions, no complex billing—just pay-per-call with instant settlement.
                </p>
              </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="mb-16">
              <h2 className="text-3xl font-extralight text-[#f8f7f5] mb-6 flex items-center gap-2">
                <ChevronRight className="w-6 h-6 text-[#c8b4a0]" />
                How It Works
              </h2>
              <div className="space-y-6">
                <div className="bg-[#1a1d18]/50 border border-[#3c4237] rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-[#f8f7f5] mb-3">01. List a Service</h3>
                  <p className="text-[#c8b4a0]">
                    Providers set per-call pricing in USDC or $TSTL and enable x402 on their endpoint.
                  </p>
                </div>

                <div className="bg-[#1a1d18]/50 border border-[#3c4237] rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-[#f8f7f5] mb-3">02. Deploy an Agent</h3>
                  <p className="text-[#c8b4a0]">
                    Builders select services from the marketplace and wire them into their AI agents.
                  </p>
                </div>

                <div className="bg-[#1a1d18]/50 border border-[#3c4237] rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-[#f8f7f5] mb-3">03. Pay-per-Call</h3>
                  <p className="text-[#c8b4a0]">
                    Each request triggers a 402 payment, executes instantly, and requires no subscription overhead.
                  </p>
                </div>

                <div className="bg-[#1a1d18]/50 border border-[#3c4237] rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-[#f8f7f5] mb-3">04. Settle & Track</h3>
                  <p className="text-[#c8b4a0]">
                    Solana handles instant settlement while dashboards monitor usage, revenue, and $TSTL rewards.
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Start */}
            <section id="quick-start" className="mb-16">
              <h2 className="text-3xl font-extralight text-[#f8f7f5] mb-6 flex items-center gap-2">
                <ChevronRight className="w-6 h-6 text-[#c8b4a0]" />
                Quick Start
              </h2>
              <div className="bg-[#1a1d18]/50 border border-[#3c4237] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#f8f7f5] mb-4">Install the SDK</h3>
                <pre className="bg-black/50 border border-[#3c4237] rounded-lg p-4 overflow-x-auto">
                  <code className="text-[#c8b4a0] text-sm">
                    npm install @turnstile/sdk @solana/web3.js
                  </code>
                </pre>

                <h3 className="text-xl font-semibold text-[#f8f7f5] mb-4 mt-8">Initialize Client</h3>
                <pre className="bg-black/50 border border-[#3c4237] rounded-lg p-4 overflow-x-auto">
                  <code className="text-[#c8b4a0] text-sm">
{`import { TurnstileClient } from '@turnstile/sdk';
import { Connection, Keypair } from '@solana/web3.js';

const connection = new Connection('https://api.mainnet-beta.solana.com');
const wallet = Keypair.fromSecretKey(/* your secret key */);

const client = new TurnstileClient({
  connection,
  wallet,
  environment: 'mainnet'
});`}
                  </code>
                </pre>
              </div>
            </section>

            {/* List a Service */}
            <section id="list-service" className="mb-16">
              <h2 className="text-3xl font-extralight text-[#f8f7f5] mb-6 flex items-center gap-2">
                <ChevronRight className="w-6 h-6 text-[#c8b4a0]" />
                List a Service
              </h2>
              <div className="space-y-4">
                <p className="text-[#c8b4a0]">
                  To list your API service on Turnstile, you'll need to configure x402 payment headers and set your pricing.
                </p>
                
                <div className="bg-[#1a1d18]/50 border border-[#3c4237] rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-[#f8f7f5] mb-4">Register Your Service</h3>
                  <pre className="bg-black/50 border border-[#3c4237] rounded-lg p-4 overflow-x-auto">
                    <code className="text-[#c8b4a0] text-sm">
{`const service = await client.registerService({
  name: "My AI Model API",
  endpoint: "https://api.myservice.com/v1/generate",
  pricePerCall: 0.001, // USDC
  currency: "USDC",
  description: "GPT-4 level text generation",
  category: "ai-inference"
});`}
                    </code>
                  </pre>
                </div>
              </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="mb-16">
              <h2 className="text-3xl font-extralight text-[#f8f7f5] mb-6 flex items-center gap-2">
                <ChevronRight className="w-6 h-6 text-[#c8b4a0]" />
                Pricing & Payments
              </h2>
              <div className="bg-[#1a1d18]/50 border border-[#3c4237] rounded-lg p-6">
                <p className="text-[#c8b4a0] mb-4">
                  Turnstile supports two payment currencies:
                </p>
                <ul className="space-y-3 text-[#c8b4a0]">
                  <li className="flex items-start gap-3">
                    <span className="text-[#c8b4a0] font-bold">•</span>
                    <div>
                      <strong className="text-[#f8f7f5]">USDC</strong> - Stablecoin payments for predictable pricing
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#c8b4a0] font-bold">•</span>
                    <div>
                      <strong className="text-[#f8f7f5]">$TSTL</strong> - Native Turnstile token with fee discounts and governance rights
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* API Reference */}
            <section id="api-reference" className="mb-16">
              <h2 className="text-3xl font-extralight text-[#f8f7f5] mb-6 flex items-center gap-2">
                <ChevronRight className="w-6 h-6 text-[#c8b4a0]" />
                API Reference
              </h2>
              <div className="space-y-4">
                <div className="bg-[#1a1d18]/50 border border-[#3c4237] rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-[#f8f7f5] mb-2">x402 Headers</h3>
                  <p className="text-[#c8b4a0] mb-4">
                    All x402-enabled endpoints must return the following headers on unauthenticated requests:
                  </p>
                  <pre className="bg-black/50 border border-[#3c4237] rounded-lg p-4 overflow-x-auto">
                    <code className="text-[#c8b4a0] text-sm">
{`HTTP/1.1 402 Payment Required
X-Turnstile-Price: 0.001
X-Turnstile-Currency: USDC
X-Turnstile-Wallet: <provider_solana_address>`}
                    </code>
                  </pre>
                </div>
              </div>
            </section>

            {/* Deploy an Agent */}
            <section id="deploy-agent" className="mb-16">
              <h2 className="text-3xl font-extralight text-[#f8f7f5] mb-6 flex items-center gap-2">
                <ChevronRight className="w-6 h-6 text-[#c8b4a0]" />
                Deploy an Agent
              </h2>
              <div className="bg-[#1a1d18]/50 border border-[#3c4237] rounded-lg p-6">
                <p className="text-[#c8b4a0] mb-4">
                  Use the Turnstile SDK to automatically handle x402 payments in your AI agent:
                </p>
                <pre className="bg-black/50 border border-[#3c4237] rounded-lg p-4 overflow-x-auto">
                  <code className="text-[#c8b4a0] text-sm">
{`const agent = client.createAgent({
  services: ["ai-inference", "vector-search"],
  maxPricePerCall: 0.01, // Auto-pay up to 0.01 USDC
  budget: 10.0 // Total budget in USDC
});

const response = await agent.call({
  service: "ai-inference",
  prompt: "Generate a haiku about Solana"
});`}
                  </code>
                </pre>
              </div>
            </section>

            {/* Integration Guide */}
            <section id="integration" className="mb-16">
              <h2 className="text-3xl font-extralight text-[#f8f7f5] mb-6 flex items-center gap-2">
                <ChevronRight className="w-6 h-6 text-[#c8b4a0]" />
                Integration Guide
              </h2>
              <div className="space-y-4 text-[#c8b4a0]">
                <p>
                  Integrate Turnstile into your existing agent framework in three steps:
                </p>
                <ol className="space-y-3 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-[#c8b4a0]">1.</span>
                    <span>Install the Turnstile middleware for your framework (LangChain, AutoGPT, etc.)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-[#c8b4a0]">2.</span>
                    <span>Configure your Solana wallet and budget limits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-[#c8b4a0]">3.</span>
                    <span>Browse the marketplace and add services to your agent</span>
                  </li>
                </ol>
              </div>
            </section>

            {/* Best Practices */}
            <section id="best-practices" className="mb-16">
              <h2 className="text-3xl font-extralight text-[#f8f7f5] mb-6 flex items-center gap-2">
                <ChevronRight className="w-6 h-6 text-[#c8b4a0]" />
                Best Practices
              </h2>
              <div className="space-y-4">
                <div className="bg-[#1a1d18]/50 border border-[#3c4237] rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#f8f7f5] mb-3">Set Budget Limits</h3>
                  <p className="text-[#c8b4a0]">
                    Always configure maximum per-call and total budget limits to prevent unexpected costs.
                  </p>
                </div>

                <div className="bg-[#1a1d18]/50 border border-[#3c4237] rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#f8f7f5] mb-3">Monitor Usage</h3>
                  <p className="text-[#c8b4a0]">
                    Use the Turnstile dashboard to track real-time spending and service performance.
                  </p>
                </div>

                <div className="bg-[#1a1d18]/50 border border-[#3c4237] rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#f8f7f5] mb-3">Use $TSTL for Discounts</h3>
                  <p className="text-[#c8b4a0]">
                    Pay with $TSTL tokens to receive fee discounts and participate in governance.
                  </p>
                </div>
              </div>
            </section>

            {/* Footer CTA */}
            <div className="bg-gradient-to-r from-[#c8b4a0]/10 to-transparent border border-[#c8b4a0]/20 rounded-lg p-8 mt-16">
              <h3 className="text-2xl font-extralight text-[#f8f7f5] mb-2">Ready to get started?</h3>
              <p className="text-[#c8b4a0] mb-6">Join the Turnstile marketplace and start building.</p>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-[#c8b4a0] text-[#1a1d18] font-semibold rounded-lg hover:bg-[#f8f7f5] transition-all">
                  Sign Up
                </button>
                <button className="px-6 py-3 border border-[#c8b4a0] text-[#c8b4a0] font-semibold rounded-lg hover:bg-[#c8b4a0]/10 transition-all">
                  View Examples
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
