import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert prose-slate max-w-none"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children, ...props }) => (
            <h1
              className="text-5xl font-extralight text-[#f8f7f5] mb-6 mt-12 pb-4 border-b border-[#3c4237] scroll-mt-20"
              id={String(children).toLowerCase().replace(/\s+/g, '-')}
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2
              className="text-3xl font-light text-[#f8f7f5] mb-4 mt-10 scroll-mt-20"
              id={String(children).toLowerCase().replace(/\s+/g, '-')}
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3
              className="text-2xl font-normal text-[#f8f7f5] mb-3 mt-8 scroll-mt-20"
              id={String(children).toLowerCase().replace(/\s+/g, '-')}
              {...props}
            >
              {children}
            </h3>
          ),
          p: ({ children, ...props }) => (
            <p className="text-[#c8b4a0] leading-relaxed mb-4" {...props}>
              {children}
            </p>
          ),
          a: ({ children, href, ...props }) => (
            <a
              href={href}
              className="text-[#f8f7f5] underline hover:text-[#c8b4a0] transition-colors"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props}
            >
              {children}
            </a>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-4 border-[#c8b4a0] pl-4 italic text-[#c8b4a0]/80 my-6 bg-[#1a1d18]/30 py-2"
              {...props}
            >
              {children}
            </blockquote>
          ),
          ul: ({ children, ...props }) => (
            <ul className="list-disc list-inside text-[#c8b4a0] space-y-2 mb-4" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal list-inside text-[#c8b4a0] space-y-2 mb-4" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="ml-4" {...props}>
              {children}
            </li>
          ),
          code: ({ inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';

            if (!inline && language) {
              return (
                <div className="my-6 rounded-lg overflow-hidden border border-[#3c4237] shadow-lg">
                  <div className="bg-[#1a1d18] px-4 py-2 border-b border-[#3c4237] flex items-center justify-between">
                    <span className="text-xs text-[#c8b4a0] uppercase tracking-wider font-semibold">
                      {language}
                    </span>
                  </div>
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={language}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      borderRadius: 0,
                      background: '#0d0f0c',
                      padding: '1.5rem',
                      fontSize: '0.875rem',
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              );
            }

            return (
              <code
                className="bg-[#1a1d18] border border-[#3c4237] text-[#f8f7f5] px-1.5 py-0.5 rounded text-sm"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => <>{children}</>,
          table: ({ children, ...props }) => (
            <div className="my-6 overflow-x-auto rounded-lg border border-[#3c4237]">
              <table className="w-full text-left" {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-[#1a1d18] border-b border-[#3c4237]" {...props}>
              {children}
            </thead>
          ),
          th: ({ children, ...props }) => (
            <th className="px-4 py-3 text-[#f8f7f5] font-semibold text-sm" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="px-4 py-3 text-[#c8b4a0] border-t border-[#3c4237]" {...props}>
              {children}
            </td>
          ),
          hr: ({ ...props }) => (
            <hr className="my-8 border-[#3c4237]" {...props} />
          ),
          strong: ({ children, ...props }) => (
            <strong className="text-[#f8f7f5] font-semibold" {...props}>
              {children}
            </strong>
          ),
          em: ({ children, ...props }) => (
            <em className="text-[#f8f7f5] italic" {...props}>
              {children}
            </em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </motion.div>
  );
}
