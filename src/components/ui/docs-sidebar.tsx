import { useState } from 'react';
import { Menu, X, FileText, Rocket, Code, Coins, MapPin, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { name: 'Introduction', href: '#introduction', icon: FileText },
      { name: 'How It Works', href: '#how-it-works', icon: Rocket },
      { name: 'Getting Started', href: '#getting-started', icon: Code },
    ],
  },
  {
    title: 'Developer',
    items: [
      { name: 'SDK / API', href: '#sdk-api', icon: Code },
      { name: 'Token ($TSTL)', href: '#token-tstl', icon: Coins },
    ],
  },
  {
    title: 'Resources',
    items: [
      { name: 'Roadmap', href: '#roadmap', icon: MapPin },
      { name: 'FAQ', href: '#faq', icon: HelpCircle },
    ],
  },
];

interface DocsSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function DocsSidebar({ activeSection, onSectionChange }: DocsSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = (href: string) => {
    onSectionChange(href);
    setMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-[#3c4237]">
        <a href="/" className="flex items-center gap-2">
          <img
            src="/turnstile-favicon.png"
            alt="Turnstile"
            className="h-8 w-8"
          />
          <span className="text-xl font-semibold text-[#f8f7f5]">Turnstile</span>
        </a>
      </div>

      <nav className="flex-1 overflow-y-auto p-6 space-y-6">
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
                    <button
                      onClick={() => handleClick(item.href)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group ${
                        isActive
                          ? 'bg-[#c8b4a0]/10 text-[#f8f7f5] border-l-2 border-[#c8b4a0]'
                          : 'text-[#c8b4a0] hover:bg-[#c8b4a0]/5 hover:text-[#f8f7f5]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? '' : 'group-hover:scale-110 transition-transform'}`} />
                      <span className="text-sm">{item.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="p-6 border-t border-[#3c4237]">
        <a
          href="https://github.com/turnstile-xyz/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-[#c8b4a0] hover:text-[#f8f7f5] transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          Edit on GitHub
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#1a1d18]/80 backdrop-blur-sm border border-[#3c4237] rounded-lg text-[#f8f7f5]"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 h-screen w-64 bg-[#1a1d18]/80 backdrop-blur-sm border-r border-[#3c4237] overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 left-0 h-screen w-64 bg-[#1a1d18] border-r border-[#3c4237] overflow-hidden z-50"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
