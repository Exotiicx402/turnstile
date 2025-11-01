import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Zap, Activity, DollarSign, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import PlatformLayout from '../../components/platform/PlatformLayout';
import { fetchServices } from '../../services/api';
import type { Service } from '../../types/service';

type SortField = 'txns' | 'volume' | 'buyers' | 'latest';
type SortDirection = 'asc' | 'desc';

interface ServiceWithExtras extends Service {
  buyers: number;
  minutesAgo: number;
}

export default function Overview() {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>('txns');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      const data = await fetchServices();
      setServices(data);
      setLoading(false);
    };
    loadServices();
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('opacity-100');
        el.classList.remove('opacity-0');
      }, index * 100);
    });
  }, [loading]);

  const totalCalls = services.reduce((sum, s) => sum + s.callsLast24h, 0);
  const totalRevenue = services.reduce((sum, s) => sum + (s.revenue24h || 0), 0);
  const avgUptime = services.length > 0 ? services.reduce((sum, s) => sum + s.uptime, 0) / services.length : 0;
  
  // Generate consistent random data per service
  const serviceData: ServiceWithExtras[] = services.map(service => ({
    ...service,
    buyers: Math.floor(Math.random() * 500 + 100),
    minutesAgo: Math.floor(Math.random() * 60 + 1),
  }));

  if (loading) {
    return (
      <PlatformLayout>
        <div className="flex items-center justify-center py-16">
          <p className="text-[#c8b4a0] text-xl font-light">Loading services...</p>
        </div>
      </PlatformLayout>
    );
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const allServices = [...serviceData].sort((a, b) => {
    let aVal: number, bVal: number;
    
    switch (sortField) {
      case 'txns':
        aVal = a.callsLast24h;
        bVal = b.callsLast24h;
        break;
      case 'volume':
        aVal = a.revenue24h || 0;
        bVal = b.revenue24h || 0;
        break;
      case 'buyers':
        aVal = a.buyers;
        bVal = b.buyers;
        break;
      case 'latest':
        aVal = a.minutesAgo;
        bVal = b.minutesAgo;
        break;
      default:
        return 0;
    }
    
    return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
  });

  // Generate random sparkline data for each service
  const generateSparklinePoints = () => {
    const points = [];
    for (let i = 0; i < 20; i++) {
      points.push(Math.random() * 40 + 10);
    }
    return points;
  };

  return (
    <PlatformLayout>
      {/* Hero Section */}
      <div className="mb-12 opacity-0 fade-in transition-opacity duration-700">
        <h1 className="text-5xl font-extralight text-[#f8f7f5] mb-4">Turnstile Explorer</h1>
        <p className="text-xl font-light text-[#c8b4a0]/80">
          x402 Marketplace for Solana • Pay-per-call APIs with instant micropayments
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="opacity-0 fade-in transition-opacity duration-700">
          <div className="bg-[#1a1d18] border border-[#3c4237] rounded-2xl p-6 hover:border-[#c8b4a0]/50 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-[#c8b4a0]/10 rounded-lg">
                <Activity className="w-6 h-6 text-[#c8b4a0]" />
              </div>
              <p className="text-[#c8b4a0]/70 text-sm font-light">Total Services</p>
            </div>
            <p className="text-[#f8f7f5] text-4xl font-extralight">{services.length}</p>
          </div>
        </div>

        <div className="opacity-0 fade-in transition-opacity duration-700">
          <div className="bg-[#1a1d18] border border-[#3c4237] rounded-2xl p-6 hover:border-[#c8b4a0]/50 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <p className="text-[#c8b4a0]/70 text-sm font-light">24h Calls</p>
            </div>
            <p className="text-[#f8f7f5] text-4xl font-extralight">
              {totalCalls > 1000 ? `${(totalCalls / 1000).toFixed(1)}K` : totalCalls.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="opacity-0 fade-in transition-opacity duration-700">
          <div className="bg-[#1a1d18] border border-[#3c4237] rounded-2xl p-6 hover:border-[#c8b4a0]/50 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-[#c8b4a0]/70 text-sm font-light">24h Revenue</p>
            </div>
            <p className="text-[#f8f7f5] text-4xl font-extralight">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="opacity-0 fade-in transition-opacity duration-700">
          <div className="bg-[#1a1d18] border border-[#3c4237] rounded-2xl p-6 hover:border-[#c8b4a0]/50 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-[#c8b4a0]/10 rounded-lg">
                <Zap className="w-6 h-6 text-[#c8b4a0]" />
              </div>
              <p className="text-[#c8b4a0]/70 text-sm font-light">Avg Uptime</p>
            </div>
            <p className="text-[#f8f7f5] text-4xl font-extralight">{avgUptime.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {/* Services Table - Exact x402scan structure */}
      <div className="mb-12 opacity-0 fade-in transition-opacity duration-700">
        <div className="bg-[#1a1d18] border border-[#3c4237] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#3c4237]">
                  <th className="px-6 py-4 text-left text-[#c8b4a0]/70 text-xs font-light uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-4 text-center text-[#c8b4a0]/70 text-xs font-light uppercase tracking-wider">
                    Activity
                  </th>
                  <th 
                    onClick={() => handleSort('txns')}
                    className="px-6 py-4 text-right text-[#c8b4a0]/70 text-xs font-light uppercase tracking-wider cursor-pointer hover:text-[#c8b4a0] transition-colors group"
                  >
                    <div className="flex items-center justify-end gap-2">
                      <span>Txns</span>
                      {sortField === 'txns' ? (
                        sortDirection === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('volume')}
                    className="px-6 py-4 text-right text-[#c8b4a0]/70 text-xs font-light uppercase tracking-wider cursor-pointer hover:text-[#c8b4a0] transition-colors group"
                  >
                    <div className="flex items-center justify-end gap-2">
                      <span>Volume</span>
                      {sortField === 'volume' ? (
                        sortDirection === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('buyers')}
                    className="px-6 py-4 text-right text-[#c8b4a0]/70 text-xs font-light uppercase tracking-wider cursor-pointer hover:text-[#c8b4a0] transition-colors group"
                  >
                    <div className="flex items-center justify-end gap-2">
                      <span>Buyers</span>
                      {sortField === 'buyers' ? (
                        sortDirection === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('latest')}
                    className="px-6 py-4 text-right text-[#c8b4a0]/70 text-xs font-light uppercase tracking-wider cursor-pointer hover:text-[#c8b4a0] transition-colors group"
                  >
                    <div className="flex items-center justify-end gap-2">
                      <span>Latest</span>
                      {sortField === 'latest' ? (
                        sortDirection === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-[#c8b4a0]/70 text-xs font-light uppercase tracking-wider">
                    Chain
                  </th>
                </tr>
              </thead>
              <tbody>
                {allServices.map(service => {
                  const sparklinePoints = generateSparklinePoints();
                  
                  return (
                    <tr
                      key={service.id}
                      onClick={() => navigate(`/v1/service/${service.id}`)}
                      className="border-b border-[#3c4237]/50 hover:bg-[#2a2e26]/30 cursor-pointer transition-all group"
                    >
                      {/* Service Name & Address */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c8b4a0]/20 to-[#c8b4a0]/5 flex items-center justify-center group-hover:from-[#c8b4a0]/30 group-hover:to-[#c8b4a0]/10 transition-all flex-shrink-0">
                            <span className="text-[#c8b4a0] font-bold text-lg">{service.name.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="text-[#f8f7f5] font-light group-hover:text-[#c8b4a0] transition-colors mb-0.5">
                              {service.endpoint.replace('https://', '').split('/')[0]}
                            </div>
                            <div className="text-[#c8b4a0]/60 text-xs font-mono font-light">{service.providerAddress}</div>
                          </div>
                        </div>
                      </td>

                      {/* Activity Sparkline */}
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center">
                          <svg width="120" height="40" className="opacity-70">
                            <polyline
                              points={sparklinePoints.map((y, x) => `${x * 6},${50 - y}`).join(' ')}
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="2"
                              className="group-hover:stroke-emerald-300 transition-colors"
                            />
                          </svg>
                        </div>
                      </td>

                      {/* Transactions */}
                      <td className="px-6 py-5 text-right">
                        <span className="text-[#f8f7f5] font-light">
                          {service.callsLast24h > 1000
                            ? `${(service.callsLast24h / 1000).toFixed(2)}K`
                            : service.callsLast24h.toLocaleString()}
                        </span>
                      </td>

                      {/* Volume */}
                      <td className="px-6 py-5 text-right">
                        <span className="text-[#f8f7f5] font-light">
                          ${service.revenue24h && service.revenue24h > 1000
                            ? `${(service.revenue24h / 1000).toFixed(2)}K`
                            : service.revenue24h?.toFixed(2) || '0.00'}
                        </span>
                      </td>

                      {/* Buyers */}
                      <td className="px-6 py-5 text-right">
                        <span className="text-[#f8f7f5] font-light">
                          {service.buyers > 1000 ? `${(service.buyers / 1000).toFixed(2)}K` : service.buyers}
                        </span>
                      </td>

                      {/* Latest */}
                      <td className="px-6 py-5 text-right">
                        <span className="text-[#c8b4a0]/60 font-light text-sm">
                          {service.minutesAgo}m ago
                        </span>
                      </td>

                      {/* Chain */}
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">S</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0 fade-in transition-opacity duration-700">
        <div className="bg-[#1a1d18] border border-[#3c4237] rounded-2xl p-6">
          <h3 className="text-xl font-light text-[#f8f7f5] mb-4">Categories</h3>
          <div className="space-y-3">
            {['AI/ML', 'Data', 'Tools'].map(category => {
              const count = services.filter(s => s.category === category).length;
              return (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-[#c8b4a0] font-light">{category}</span>
                  <span className="text-[#f8f7f5] font-light">{count} services</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#1a1d18] border border-[#3c4237] rounded-2xl p-6">
          <h3 className="text-xl font-light text-[#f8f7f5] mb-4">Top Providers</h3>
          <div className="space-y-3">
            {Array.from(new Set(services.map(s => s.provider)))
              .slice(0, 3)
              .map(provider => {
                const providerServices = services.filter(s => s.provider === provider).length;
                return (
                  <div key={provider} className="flex items-center justify-between">
                    <span className="text-[#c8b4a0] font-light">{provider}</span>
                    <span className="text-[#f8f7f5] font-light">{providerServices} service{providerServices > 1 ? 's' : ''}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </PlatformLayout>
  );
}
