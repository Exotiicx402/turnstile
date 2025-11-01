import { useState } from 'react';
import { X, Star, Activity, Clock, TrendingUp, Zap, ExternalLink, Copy, CheckCircle } from 'lucide-react';
import { Service } from '../../pages/Marketplace';

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  const [testPayload, setTestPayload] = useState('{\n  "prompt": "Hello, world!"\n}');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const simulateX402Call = async () => {
    setIsSimulating(true);
    setSimulationStep(1);
    
    // Step 1: Initial request
    await new Promise(resolve => setTimeout(resolve, 500));
    setSimulationStep(2);
    
    // Step 2: 402 response
    await new Promise(resolve => setTimeout(resolve, 800));
    setSimulationStep(3);
    
    // Step 3: Payment
    await new Promise(resolve => setTimeout(resolve, 600));
    setSimulationStep(4);
    
    // Step 4: Retry with proof
    await new Promise(resolve => setTimeout(resolve, 500));
    setSimulationStep(5);
    
    // Step 5: Success
    await new Promise(resolve => setTimeout(resolve, 700));
    setIsSimulating(false);
    setSimulationStep(0);
  };

  const copyEndpoint = () => {
    navigator.clipboard.writeText(service.endpoint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    { text: 'Sending request...', color: 'text-blue-400' },
    { text: '402 Payment Required received', color: 'text-yellow-400' },
    { text: 'Executing payment on Solana...', color: 'text-purple-400' },
    { text: 'Retrying with payment proof...', color: 'text-blue-400' },
    { text: 'Success! Response received', color: 'text-emerald-400' },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1d18] border border-[#3c4237] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#1a1d18] border-b border-[#3c4237] p-6 flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-[#f8f7f5] text-2xl font-bold mb-2">{service.name}</h2>
            <div className="flex items-center gap-4">
              <span className="text-[#c8b4a0]">{service.provider}</span>
              <span className="text-[#c8b4a0]/50">•</span>
              <span className="text-[#c8b4a0]/70 font-mono text-sm">{service.providerAddress}</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-[#f8f7f5] text-sm font-semibold">{service.rating}/5</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#2a2e26] rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-[#c8b4a0]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#2a2e26]/50 border border-[#3c4237] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <p className="text-[#c8b4a0]/70 text-sm">Uptime</p>
              </div>
              <p className="text-[#f8f7f5] text-2xl font-bold">{service.uptime}%</p>
            </div>
            <div className="bg-[#2a2e26]/50 border border-[#3c4237] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <p className="text-[#c8b4a0]/70 text-sm">Latency</p>
              </div>
              <p className="text-[#f8f7f5] text-2xl font-bold">{service.latency}ms</p>
            </div>
            <div className="bg-[#2a2e26]/50 border border-[#3c4237] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <p className="text-[#c8b4a0]/70 text-sm">24h Calls</p>
              </div>
              <p className="text-[#f8f7f5] text-2xl font-bold">{service.callsLast24h.toLocaleString()}</p>
            </div>
            <div className="bg-[#2a2e26]/50 border border-[#3c4237] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-[#c8b4a0]" />
                <p className="text-[#c8b4a0]/70 text-sm">Price</p>
              </div>
              <p className="text-[#f8f7f5] text-xl font-bold">${service.pricePerCall < 0.001 ? service.pricePerCall.toFixed(6) : service.pricePerCall.toFixed(4)}</p>
              <p className="text-[#c8b4a0]/70 text-xs">{service.currency}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-[#f8f7f5] text-lg font-semibold mb-2">Description</h3>
            <p className="text-[#c8b4a0]/90">{service.description}</p>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-[#f8f7f5] text-lg font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {service.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#2a2e26] text-[#c8b4a0] text-sm rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Endpoint */}
          <div className="mb-6">
            <h3 className="text-[#f8f7f5] text-lg font-semibold mb-2">Endpoint</h3>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-[#2a2e26] border border-[#3c4237] rounded-lg px-4 py-3 text-[#c8b4a0] font-mono text-sm">
                {service.endpoint}
              </code>
              <button
                onClick={copyEndpoint}
                className="p-3 bg-[#2a2e26] border border-[#3c4237] rounded-lg hover:border-[#c8b4a0] transition-colors"
                title="Copy endpoint"
              >
                {copied ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Copy className="w-5 h-5 text-[#c8b4a0]" />
                )}
              </button>
              <a
                href={service.endpoint}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#2a2e26] border border-[#3c4237] rounded-lg hover:border-[#c8b4a0] transition-colors"
                title="Open endpoint"
              >
                <ExternalLink className="w-5 h-5 text-[#c8b4a0]" />
              </a>
            </div>
          </div>

          {/* Test x402 Call */}
          <div className="bg-[#2a2e26]/50 border border-[#3c4237] rounded-xl p-6">
            <h3 className="text-[#f8f7f5] text-lg font-semibold mb-4">Test x402 Call (Demo)</h3>
            
            {/* Test Payload */}
            <div className="mb-4">
              <label className="text-[#c8b4a0] text-sm mb-2 block">Request Payload</label>
              <textarea
                value={testPayload}
                onChange={(e) => setTestPayload(e.target.value)}
                className="w-full h-24 bg-[#1a1d18] border border-[#3c4237] rounded-lg px-4 py-3 text-[#f8f7f5] font-mono text-sm focus:outline-none focus:border-[#c8b4a0] resize-none"
                disabled={isSimulating}
              />
            </div>

            {/* Simulation Steps */}
            {simulationStep > 0 && (
              <div className="mb-4 p-4 bg-[#1a1d18] border border-[#3c4237] rounded-lg">
                {steps.slice(0, simulationStep).map((step, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2 last:mb-0">
                    {index === simulationStep - 1 ? (
                      <div className="w-2 h-2 bg-[#c8b4a0] rounded-full animate-pulse" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    )}
                    <p className={`${step.color} text-sm`}>{step.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Call Button */}
            <button
              onClick={simulateX402Call}
              disabled={isSimulating}
              className="w-full px-6 py-3 bg-[#c8b4a0] text-[#1a1d18] font-semibold rounded-lg hover:bg-[#f8f7f5] transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSimulating ? 'Executing...' : 'Test Call (Demo)'}
            </button>
            
            <p className="text-[#c8b4a0]/70 text-xs mt-3 text-center">
              This is a demo simulation. No real payment will be made.
            </p>
          </div>

          {/* SDK Example */}
          <div className="mt-6">
            <h3 className="text-[#f8f7f5] text-lg font-semibold mb-2">SDK Example</h3>
            <div className="bg-[#2a2e26] border border-[#3c4237] rounded-lg p-4 overflow-x-auto">
              <pre className="text-[#c8b4a0] text-sm font-mono">
{`import { TurnstileClient } from '@exotiicx402/turnstile-sdk';

const response = await client.call({
  serviceId: '${service.id}',
  params: ${testPayload},
  maxPrice: ${service.pricePerCall}
});

console.log(response.data);`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
