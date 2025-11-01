import { useState } from 'react';
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
              <h1 className="text-3xl font-bold text-[#f8f7f5]">Turnstile Explorer</h1>
              <p className="text-[#c8b4a0]/70 text-sm">x402 Marketplace • Solana Micropayments</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar - Prominent */}
        <div className="mb-8">
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

        {/* Results Count */}
        <p className="text-[#c8b4a0]/70 text-sm mb-4">
          {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => setSelectedService(service)}
            />
          ))}
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
