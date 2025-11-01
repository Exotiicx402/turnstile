import { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, Zap, Database, Brain, Code } from 'lucide-react';
import ServiceCard from '../components/marketplace/ServiceCard';
import ServiceModal from '../components/marketplace/ServiceModal';

export interface Service {
  id: string;
  name: string;
  provider: string;
  providerAddress: string;
  description: string;
  category: string;
  pricePerCall: number;
  currency: 'USDC' | 'TSTL';
  callsLast24h: number;
  uptime: number;
  rating: number;
  latency: number;
  tags: string[];
  endpoint: string;
}

const mockServices: Service[] = [
  {
    id: 'gpt-4-inference',
    name: 'GPT-4 Inference',
    provider: 'OpenAI Labs',
    providerAddress: 'Exo7...3k2m',
    description: 'State-of-the-art language model for text generation, analysis, and reasoning',
    category: 'AI/ML',
    pricePerCall: 0.015,
    currency: 'USDC',
    callsLast24h: 12453,
    uptime: 99.9,
    rating: 4.8,
    latency: 850,
    tags: ['LLM', 'GPT-4', 'Text Generation'],
    endpoint: 'https://api.openailabs.io/v1/gpt4'
  },
  {
    id: 'solana-rpc',
    name: 'Solana RPC Ultra',
    provider: 'Helius',
    providerAddress: '8Bdv...pump',
    description: 'High-performance Solana RPC with enhanced APIs and webhooks',
    category: 'Data',
    pricePerCall: 0.0001,
    currency: 'USDC',
    callsLast24h: 89234,
    uptime: 99.99,
    rating: 4.9,
    latency: 45,
    tags: ['Blockchain', 'Solana', 'RPC'],
    endpoint: 'https://rpc.helius.xyz'
  },
  {
    id: 'image-gen',
    name: 'Stable Diffusion XL',
    provider: 'Replicate',
    providerAddress: 'CiF5...sjtR',
    description: 'High-quality image generation from text prompts',
    category: 'AI/ML',
    pricePerCall: 0.025,
    currency: 'USDC',
    callsLast24h: 5621,
    uptime: 99.7,
    rating: 4.7,
    latency: 3200,
    tags: ['Image Generation', 'Stable Diffusion', 'AI Art'],
    endpoint: 'https://api.replicate.com/v1/sdxl'
  },
  {
    id: 'market-data',
    name: 'Real-Time Market Data',
    provider: 'CoinGecko Pro',
    providerAddress: 'Ab3t...9kLm',
    description: 'Live cryptocurrency prices, volume, and market cap data',
    category: 'Data',
    pricePerCall: 0.0005,
    currency: 'USDC',
    callsLast24h: 34567,
    uptime: 99.95,
    rating: 4.8,
    latency: 120,
    tags: ['Crypto', 'Market Data', 'Prices'],
    endpoint: 'https://pro-api.coingecko.com/v3'
  },
  {
    id: 'code-execution',
    name: 'Sandboxed Code Runner',
    provider: 'Piston Engine',
    providerAddress: 'Qw8r...4nPo',
    description: 'Execute code in 40+ languages securely in isolated containers',
    category: 'Tools',
    pricePerCall: 0.002,
    currency: 'USDC',
    callsLast24h: 8923,
    uptime: 99.8,
    rating: 4.6,
    latency: 450,
    tags: ['Code Execution', 'Sandbox', 'Multi-Language'],
    endpoint: 'https://api.piston.io/v2/execute'
  },
  {
    id: 'whisper-transcription',
    name: 'Whisper Audio Transcription',
    provider: 'AssemblyAI',
    providerAddress: 'Ty5u...7vBn',
    description: 'Highly accurate speech-to-text transcription in 50+ languages',
    category: 'AI/ML',
    pricePerCall: 0.01,
    currency: 'USDC',
    callsLast24h: 3456,
    uptime: 99.6,
    rating: 4.7,
    latency: 2100,
    tags: ['Audio', 'Transcription', 'Speech-to-Text'],
    endpoint: 'https://api.assemblyai.com/v2/transcript'
  },
  {
    id: 'embeddings',
    name: 'Text Embeddings API',
    provider: 'Cohere',
    providerAddress: 'Gh9i...2mNb',
    description: 'Generate semantic embeddings for text similarity and search',
    category: 'AI/ML',
    pricePerCall: 0.0002,
    currency: 'USDC',
    callsLast24h: 15678,
    uptime: 99.9,
    rating: 4.8,
    latency: 180,
    tags: ['Embeddings', 'NLP', 'Vector Search'],
    endpoint: 'https://api.cohere.ai/v1/embed'
  },
  {
    id: 'nft-metadata',
    name: 'NFT Metadata Indexer',
    provider: 'SimpleHash',
    providerAddress: 'Jk4l...6cVx',
    description: 'Comprehensive NFT metadata across multiple blockchains',
    category: 'Data',
    pricePerCall: 0.0003,
    currency: 'USDC',
    callsLast24h: 23456,
    uptime: 99.85,
    rating: 4.7,
    latency: 250,
    tags: ['NFT', 'Metadata', 'Multi-Chain'],
    endpoint: 'https://api.simplehash.com/v1'
  }
];

const categories = [
  { name: 'All', icon: Filter, count: mockServices.length },
  { name: 'AI/ML', icon: Brain, count: mockServices.filter(s => s.category === 'AI/ML').length },
  { name: 'Data', icon: Database, count: mockServices.filter(s => s.category === 'Data').length },
  { name: 'Tools', icon: Code, count: mockServices.filter(s => s.category === 'Tools').length },
];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'popular' | 'price' | 'rating'>('popular');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    // Fade in animation on mount
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('opacity-100');
        el.classList.remove('opacity-0');
      }, index * 100);
    });
  }, []);

  const filteredServices = mockServices
    .filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return b.callsLast24h - a.callsLast24h;
      if (sortBy === 'price') return a.pricePerCall - b.pricePerCall;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1d18] via-black to-[#2a2e26]">
      {/* Header */}
      <header className="border-b border-[#3c4237] bg-[#1a1d18]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-10 h-10 text-[#c8b4a0]" />
            <div>
              <h1 className="text-3xl font-extralight text-[#f8f7f5]">Turnstile Explorer</h1>
              <p className="text-[#c8b4a0]/70 text-sm font-light">x402 Marketplace • Solana Micropayments</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 opacity-0 fade-in transition-opacity duration-700">
        {/* Search Bar - Prominent */}
        <div className="mb-8 opacity-0 fade-in transition-opacity duration-700">
          <div className="relative max-w-3xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c8b4a0]/50" />
            <input
              type="text"
              placeholder="Search x402 services, providers, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-[#2a2e26] border-2 border-[#3c4237] rounded-xl text-[#f8f7f5] placeholder-[#c8b4a0]/50 focus:outline-none focus:border-[#c8b4a0] transition-all text-lg"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                      selectedCategory === category.name
                        ? 'bg-[#c8b4a0] text-[#1a1d18] font-semibold'
                        : 'bg-[#2a2e26] text-[#c8b4a0] hover:bg-[#3c4237]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                    <span className="text-xs opacity-70">({category.count})</span>
                  </button>
                );
              })}
            </div>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 bg-[#2a2e26] border border-[#3c4237] rounded-lg text-[#f8f7f5] focus:outline-none focus:border-[#c8b4a0] cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="price">Lowest Price</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>


        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#2a2e26]/50 border border-[#3c4237] rounded-lg p-4">
            <p className="text-[#c8b4a0]/70 text-sm mb-1">Total Services</p>
            <p className="text-[#f8f7f5] text-2xl font-bold">{mockServices.length}</p>
          </div>
          <div className="bg-[#2a2e26]/50 border border-[#3c4237] rounded-lg p-4">
            <p className="text-[#c8b4a0]/70 text-sm mb-1">24h Calls</p>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <p className="text-[#f8f7f5] text-2xl font-bold">
                {mockServices.reduce((sum, s) => sum + s.callsLast24h, 0).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="bg-[#2a2e26]/50 border border-[#3c4237] rounded-lg p-4">
            <p className="text-[#c8b4a0]/70 text-sm mb-1">Avg Uptime</p>
            <p className="text-[#f8f7f5] text-2xl font-bold">
              {(mockServices.reduce((sum, s) => sum + s.uptime, 0) / mockServices.length).toFixed(1)}%
            </p>
          </div>
          <div className="bg-[#2a2e26]/50 border border-[#3c4237] rounded-lg p-4">
            <p className="text-[#c8b4a0]/70 text-sm mb-1">Active Providers</p>
            <p className="text-[#f8f7f5] text-2xl font-bold">
              {new Set(mockServices.map(s => s.provider)).size}
            </p>
          </div>
        </div>

        {/* Services Table */}
        <div className="bg-[#1a1d18] border border-[#3c4237] rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#3c4237]">
                  <th className="px-8 py-5 text-left text-[#c8b4a0]/70 text-xs font-semibold uppercase tracking-wider">Service</th>
                  <th className="px-6 py-5 text-center text-[#c8b4a0]/70 text-xs font-semibold uppercase tracking-wider">Activity</th>
                  <th className="px-6 py-5 text-right text-[#c8b4a0]/70 text-xs font-semibold uppercase tracking-wider">24h Calls</th>
                  <th className="px-6 py-5 text-right text-[#c8b4a0]/70 text-xs font-semibold uppercase tracking-wider">Price</th>
                  <th className="px-6 py-5 text-center text-[#c8b4a0]/70 text-xs font-semibold uppercase tracking-wider">Uptime</th>
                  <th className="px-6 py-5 text-center text-[#c8b4a0]/70 text-xs font-semibold uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-5 text-right text-[#c8b4a0]/70 text-xs font-semibold uppercase tracking-wider">Latest</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service, index) => (
                  <tr 
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className="border-b border-[#3c4237]/50 hover:bg-[#2a2e26]/50 cursor-pointer transition-all duration-200 group"
                  >
                    {/* Service Name & Provider */}
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c8b4a0]/20 to-[#c8b4a0]/5 flex items-center justify-center group-hover:from-[#c8b4a0]/30 group-hover:to-[#c8b4a0]/10 transition-all">
                          <span className="text-[#c8b4a0] font-bold text-xl">{service.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="text-[#f8f7f5] font-semibold text-base mb-1 group-hover:text-[#c8b4a0] transition-colors">{service.name}</div>
                          <div className="text-[#c8b4a0]/60 text-xs font-mono">{service.providerAddress}</div>
                        </div>
                      </div>
                    </td>
                    
                    {/* Activity Sparkline (mock) */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center">
                        <svg width="60" height="24" className="opacity-60">
                          <polyline
                            points="0,20 15,12 30,8 45,15 60,5"
                            fill="none"
                            stroke="#c8b4a0"
                            strokeWidth="2"
                            className="group-hover:stroke-[#f8f7f5] transition-colors"
                          />
                        </svg>
                      </div>
                    </td>
                    
                    {/* 24h Calls */}
                    <td className="px-6 py-5 text-right">
                      <span className="text-[#f8f7f5] font-bold text-base">
                        {service.callsLast24h > 1000 
                          ? `${(service.callsLast24h / 1000).toFixed(1)}K` 
                          : service.callsLast24h.toLocaleString()}
                      </span>
                    </td>
                    
                    {/* Price */}
                    <td className="px-6 py-5 text-right">
                      <div className="text-[#f8f7f5] font-bold text-base">
                        ${service.pricePerCall < 0.001 
                          ? service.pricePerCall.toFixed(6) 
                          : service.pricePerCall.toFixed(4)}
                      </div>
                      <div className="text-[#c8b4a0]/50 text-xs mt-0.5">{service.currency}</div>
                    </td>
                    
                    {/* Uptime */}
                    <td className="px-6 py-5 text-center">
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        service.uptime >= 99.5 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : service.uptime >= 98
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {service.uptime}%
                      </span>
                    </td>
                    
                    {/* Rating */}
                    <td className="px-6 py-5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-[#f8f7f5] font-bold text-base">{service.rating}</span>
                      </div>
                    </td>
                    
                    {/* Latest Activity */}
                    <td className="px-6 py-5 text-right">
                      <span className="text-[#c8b4a0]/60 text-sm font-medium">2m ago</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-8 py-5 border-t border-[#3c4237]">
            <p className="text-[#c8b4a0]/60 text-sm font-light">
              Showing <span className="font-semibold text-[#f8f7f5]">{filteredServices.length}</span> of <span className="font-semibold text-[#f8f7f5]">{mockServices.length}</span> services
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-[#2a2e26] border border-[#3c4237] rounded-lg text-[#c8b4a0] text-sm font-medium hover:border-[#c8b4a0] hover:bg-[#3c4237] transition-all">
                Previous
              </button>
              <button className="px-4 py-2 bg-[#2a2e26] border border-[#3c4237] rounded-lg text-[#c8b4a0] text-sm font-medium hover:border-[#c8b4a0] hover:bg-[#3c4237] transition-all">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-[#c8b4a0]/30 mx-auto mb-4" />
            <p className="text-[#c8b4a0] text-xl mb-2">No services found</p>
            <p className="text-[#c8b4a0]/70">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}
