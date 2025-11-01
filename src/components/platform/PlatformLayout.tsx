import type { ReactNode } from 'react';
import PlatformNav from './PlatformNav';

interface PlatformLayoutProps {
  children: ReactNode;
}

export default function PlatformLayout({ children }: PlatformLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1d18] via-black to-[#2a2e26]">
      <PlatformNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}
