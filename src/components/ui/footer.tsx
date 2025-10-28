import {
  Github,
  Twitter,
  Mail,
  FileText,
  BookOpen,
  Zap,
} from 'lucide-react';

const data = {
  twitterLink: 'https://twitter.com/turnstile',
  githubLink: 'https://github.com/turnstile',
  resources: {
    docs: '/docs',
    api: '/api-reference',
    examples: '/examples',
    blog: '/blog',
  },
  product: {
    marketplace: '/marketplace',
    dashboard: '/dashboard',
    pricing: '/pricing',
    roadmap: '/roadmap',
  },
  support: {
    discord: 'https://discord.gg/turnstile',
    docs: '/docs',
    status: '/status',
  },
  contact: {
    email: 'hello@turnstile.dev',
  },
  company: {
    name: 'Turnstile',
    description:
      'The first Solana-native x402 marketplace. Enabling instant micropayments for AI agents and on-chain services.',
  },
};

const socialLinks = [
  { icon: Twitter, label: 'Twitter', href: data.twitterLink },
  { icon: Github, label: 'GitHub', href: data.githubLink },
];

const productLinks = [
  { text: 'Marketplace', href: data.product.marketplace },
  { text: 'Dashboard', href: data.product.dashboard },
  { text: 'Pricing', href: data.product.pricing },
  { text: 'Roadmap', href: data.product.roadmap },
];

const resourceLinks = [
  { text: 'Documentation', href: data.resources.docs },
  { text: 'API Reference', href: data.resources.api },
  { text: 'Examples', href: data.resources.examples },
  { text: 'Blog', href: data.resources.blog },
];

const supportLinks = [
  { text: 'Discord', href: data.support.discord },
  { text: 'Docs', href: data.support.docs },
  { text: 'Status', href: data.support.status, hasIndicator: true },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#1a1d18] via-black to-[#2a2e26] text-[#e6e1d7] mt-16 w-full">
      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex justify-center gap-2 sm:justify-start items-center">
              <img
                src="/src/assets/logos/turnstile.png"
                alt="Turnstile logo"
                className="h-10 w-10"
              />
              <span className="text-2xl font-semibold text-[#f8f7f5]">
                {data.company.name}
              </span>
            </div>

            <p className="mt-6 max-w-md text-center leading-relaxed sm:max-w-xs sm:text-left text-[#c8b4a0]">
              {data.company.description}
            </p>

            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[#c8b4a0] hover:text-[#f8f7f5] transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{label}</span>
                    <Icon className="size-6" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-[#f8f7f5]">Product</p>
              <ul className="mt-8 space-y-4 text-sm">
                {productLinks.map(({ text, href }) => (
                  <li key={text}>
                    <a
                      className="text-[#c8b4a0] hover:text-[#f8f7f5] transition"
                      href={href}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-[#f8f7f5]">Resources</p>
              <ul className="mt-8 space-y-4 text-sm">
                {resourceLinks.map(({ text, href }) => (
                  <li key={text}>
                    <a
                      className="text-[#c8b4a0] hover:text-[#f8f7f5] transition"
                      href={href}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-[#f8f7f5]">Support</p>
              <ul className="mt-8 space-y-4 text-sm">
                {supportLinks.map(({ text, href, hasIndicator }) => (
                  <li key={text}>
                    <a
                      href={href}
                      className={`${
                        hasIndicator
                          ? 'group flex justify-center gap-1.5 sm:justify-start'
                          : 'text-[#c8b4a0] hover:text-[#f8f7f5] transition'
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-[#c8b4a0] hover:text-[#f8f7f5] transition">
                        {text}
                      </span>
                      {hasIndicator && (
                        <span className="relative flex size-2">
                          <span className="bg-green-400 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                          <span className="bg-green-500 relative inline-flex size-2 rounded-full" />
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#3c4237] pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-[#c8b4a0]">
              <span className="block sm:inline">Built on Solana. Powered by x402.</span>
            </p>

            <p className="mt-4 text-sm text-[#c8b4a0] sm:order-first sm:mt-0">
              &copy; 2025 {data.company.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
