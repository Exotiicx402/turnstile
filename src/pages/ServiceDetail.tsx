import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Copy, Check, TrendingUp, Zap, Clock, Activity } from 'lucide-react';
import { fetchServiceById } from '../services/api';
import type { Service } from '../types/service';

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadService = async () => {
      if (id) {
        const foundService = await fetchServiceById(id);
        setService(foundService);
      }
    };
    loadService();
  }, [id]);

  useEffect(() => {
    // Fade in animation
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('opacity-100');
        el.classList.remove('opacity-0');
      }, index * 100);
    });
  }, [service]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1d18] via-black to-[#2a2e26] flex items-center justify-center">
        <p className="text-[#c8b4a0] text-xl font-light">Service not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1d18] via-black to-[#2a2e26]">
      {/* Header */}
      <header className="border-b border-[#3c4237] bg-[#1a1d18]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/v1')}
            className="flex items-center gap-2 text-[#c8b4a0] hover:text-[#f8f7f5] transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-light">Back to Marketplace</span>
          </button>
          <div className="flex items-start gap-4">
            <img 
              src="https://res.cloudinary.com/dbdzl9lt6/image/upload/v1761631594/solana-sol-logo_xyph2m.png" 
              alt="Solana Logo" 
              style={{ width: '40px', height: '40px', objectFit: 'contain', flexShrink: 0 }}
            />
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-extralight text-[#f8f7f5] leading-tight">Turnstile Explorer</h1>
              <p className="text-[#c8b4a0]/70 text-sm font-light">x402 Marketplace • Solana Micropayments</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Service Header Card */}
        <div className="relative mb-8 opacity-0 fade-in transition-opacity duration-700">
          <div className="bg-[#1a1d18] border border-[#3c4237] rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
              {/* Main Info */}
              <div className="col-span-2 space-y-4">
                <div>
                  {service.logo ? (
                    <img 
                      src={service.logo} 
                      alt={`${service.provider} Logo`} 
                      className="w-16 h-16 object-contain mb-4"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#c8b4a0]/30 to-[#c8b4a0]/10 flex items-center justify-center border border-[#3c4237] mb-4">
                      <span className="text-[#c8b4a0] font-bold text-2xl">{service.name.charAt(0)}</span>
                    </div>
                  )}
                  <h1 className="text-4xl font-extralight text-[#f8f7f5] mb-2">{service.name}</h1>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#c8b4a0]/60 font-mono text-sm">{service.providerAddress}</span>
                    <a
                      href={service.endpoint}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c8b4a0] hover:text-[#f8f7f5] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-[#c8b4a0]/80 text-lg font-light">{service.description}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-[#2a2e26] border border-[#3c4237] rounded-lg text-[#c8b4a0] text-sm font-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Provider */}
                <div className="pt-4 border-t border-[#3c4237]">
                  <p className="text-[#c8b4a0]/60 text-sm font-light mb-1">Provider</p>
                  <p className="text-[#f8f7f5] text-xl font-light">{service.provider}</p>
                </div>
              </div>

              {/* Stats Column */}
              <div className="space-y-4">
                <div className="bg-[#2a2e26]/50 border border-[#3c4237] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-[#c8b4a0]" />
                    <p className="text-[#c8b4a0]/70 text-sm font-light">24h Calls</p>
                  </div>
                  <p className="text-[#f8f7f5] text-3xl font-extralight">
                    {service.callsLast24h > 1000 
                      ? `${(service.callsLast24h / 1000).toFixed(1)}K` 
                      : service.callsLast24h.toLocaleString()}
                  </p>
                </div>

                <div className="bg-[#2a2e26]/50 border border-[#3c4237] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-[#c8b4a0]" />
                    <p className="text-[#c8b4a0]/70 text-sm font-light">Price per Call</p>
                  </div>
                  <p className="text-[#f8f7f5] text-3xl font-extralight">
                    ${service.pricePerCall < 0.001 
                      ? service.pricePerCall.toFixed(6) 
                      : service.pricePerCall.toFixed(4)}
                  </p>
                  <p className="text-[#c8b4a0]/50 text-xs font-light mt-1">{service.currency}</p>
                </div>

                <div className="bg-[#2a2e26]/50 border border-[#3c4237] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-[#c8b4a0]" />
                    <p className="text-[#c8b4a0]/70 text-sm font-light">Uptime</p>
                  </div>
                  <p className="text-[#f8f7f5] text-3xl font-extralight">{service.uptime}%</p>
                </div>

                <div className="bg-[#2a2e26]/50 border border-[#3c4237] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-[#c8b4a0]" />
                    <p className="text-[#c8b4a0]/70 text-sm font-light">Avg Latency</p>
                  </div>
                  <p className="text-[#f8f7f5] text-3xl font-extralight">{service.latency}ms</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Chart - Hidden until real-time data available */}
        {/* Removed: Waiting for real blockchain transaction data */}

        {/* API Documentation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Endpoint */}
          <div className="opacity-0 fade-in transition-opacity duration-700">
            <div className="bg-[#1a1d18] border border-[#3c4237] rounded-2xl p-8">
              <h2 className="text-2xl font-extralight text-[#f8f7f5] mb-6">Endpoint</h2>
              <div className="bg-[#2a2e26] border border-[#3c4237] rounded-lg p-4 flex items-center justify-between">
                <code className="text-[#c8b4a0] font-mono text-sm break-all">{service.endpoint}</code>
                <button
                  onClick={() => copyToClipboard(service.endpoint)}
                  className="ml-4 p-2 hover:bg-[#3c4237] rounded-lg transition-colors"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-[#c8b4a0]" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Usage Example */}
          <div className="opacity-0 fade-in transition-opacity duration-700">
            <div className="bg-[#1a1d18] border border-[#3c4237] rounded-2xl p-8">
              <h2 className="text-2xl font-extralight text-[#f8f7f5] mb-6">Quick Start</h2>
              <div className="bg-[#2a2e26] border border-[#3c4237] rounded-lg p-4">
                <pre className="text-[#c8b4a0] font-mono text-sm overflow-x-auto">
{`curl -X POST ${service.endpoint}
  -H "x402-key: YOUR_API_KEY"
  -H "Content-Type: application/json"
  -d '{"prompt": "Hello"}'`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Guide */}
        <div className="opacity-0 fade-in transition-opacity duration-700">
          <div className="bg-[#1a1d18] border border-[#3c4237] rounded-2xl p-8">
            <h2 className="text-2xl font-extralight text-[#f8f7f5] mb-6">Integration Guide</h2>
            <div className="space-y-4 text-[#c8b4a0]/80 font-light">
              <div>
                <h3 className="text-lg font-light text-[#f8f7f5] mb-2">1. Authentication</h3>
                <p>Include your x402 API key in the request header: <code className="text-[#c8b4a0] bg-[#2a2e26] px-2 py-1 rounded">x402-key: YOUR_API_KEY</code></p>
              </div>
              <div>
                <h3 className="text-lg font-light text-[#f8f7f5] mb-2">2. Payment</h3>
                <p>Payments are automatically processed on Solana using USDC. Each call costs ${service.pricePerCall.toFixed(4)} {service.currency}.</p>
              </div>
              <div>
                <h3 className="text-lg font-light text-[#f8f7f5] mb-2">3. Response</h3>
                <p>All responses are returned in JSON format with standard HTTP status codes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
