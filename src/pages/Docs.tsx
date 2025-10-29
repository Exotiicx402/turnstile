import { useState, useEffect } from 'react';
import { DocsSidebar } from '../components/ui/docs-sidebar';
import { MarkdownContent } from '../components/ui/markdown-content';
import { useMarkdownLoader } from '../hooks/useMarkdownLoader';
import { motion } from 'framer-motion';

export default function Docs() {
  const [activeSection, setActiveSection] = useState('#introduction');
  const { content, loading, error } = useMarkdownLoader('/content/docs.md');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        '#introduction',
        '#how-it-works',
        '#getting-started',
        '#sdk-api',
        '#token-tstl',
        '#roadmap',
        '#faq',
      ];

      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1d18] via-black to-[#2a2e26]">
      <DocsSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="lg:ml-64 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12 lg:px-12 lg:py-16">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-sm text-[#c8b4a0] flex items-center gap-2"
          >
            <a href="/" className="hover:text-[#f8f7f5] transition-colors">
              Home
            </a>
            <span>/</span>
            <span className="text-[#f8f7f5]">Documentation</span>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c8b4a0]"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-red-200"
            >
              <h3 className="text-xl font-semibold mb-2">Error Loading Documentation</h3>
              <p>{error.message}</p>
            </motion.div>
          )}

          {/* Content */}
          {!loading && !error && content && <MarkdownContent content={content} />}

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 pt-8 border-t border-[#3c4237] text-center text-sm text-[#c8b4a0]"
          >
            <p>Built on Solana. Powered by x402.</p>
            <p className="mt-2">
              Questions?{' '}
              <a
                href="https://discord.gg/turnstile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f8f7f5] hover:underline"
              >
                Join our Discord
              </a>
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
