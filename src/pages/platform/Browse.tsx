import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Brain, Database, Code, Star } from 'lucide-react';
import PlatformLayout from '../../components/platform/PlatformLayout';
import { fetchServices } from '../../services/api';
import type { Service } from '../../types/service';

export default function Browse() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
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

  const categories = [
    { name: 'All', icon: Search, count: services.length },
    { name: 'AI/ML', icon: Brain, count: services.filter(s => s.category === 'AI/ML').length },
    { name: 'Data', icon: Database, count: services.filter(s => s.category === 'Data').length },
    { name: 'Tools', icon: Code, count: services.filter(s => s.category === 'Tools').length },
  ];

  const filteredServices = services
    .filter(service => selectedCategory === 'All' || service.category === selectedCategory)
    .filter(
      service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  if (loading) {
    return (
      <PlatformLayout>
        <div className="flex items-center justify-center py-16">
          <p className="text-[#c8b4a0] text-xl font-light">Loading services...</p>
        </div>
      </PlatformLayout>
    );
  }

  return (
    <PlatformLayout>
      {/* Header */}
      <div className="mb-8 opacity-0 fade-in transition-opacity duration-700">
        <h1 className="text-4xl font-extralight text-[#f8f7f5] mb-3">Browse Services</h1>
        <p className="text-lg font-light text-[#c8b4a0]/80">
          Explore all x402-enabled services on Solana
        </p>
      </div>

      {/* Search */}
      <div className="mb-8 opacity-0 fade-in transition-opacity duration-700">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c8b4a0]/50" />
          <input
            type="text"
            placeholder="Search services, providers, or tags..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-[#1a1d18] border-2 border-[#3c4237] rounded-xl text-[#f8f7f5] placeholder-[#c8b4a0]/50 focus:outline-none focus:border-[#c8b4a0] transition-all font-light"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-8 opacity-0 fade-in transition-opacity duration-700">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl whitespace-nowrap transition-all font-light ${
                  selectedCategory === category.name
                    ? 'bg-[#c8b4a0] text-[#1a1d18]'
                    : 'bg-[#1a1d18] text-[#c8b4a0] border border-[#3c4237] hover:border-[#c8b4a0]/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {category.name}
                <span className="text-xs opacity-70">({category.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service, index) => (
          <div
            key={service.id}
            className="opacity-0 fade-in transition-opacity duration-700"
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <div
              onClick={() => navigate(`/v1/service/${service.id}`)}
              className="bg-[#1a1d18] border border-[#3c4237] rounded-2xl p-6 hover:border-[#c8b4a0]/50 cursor-pointer transition-all group h-full flex flex-col"
            >
              {/* Service Icon & Title */}
              <div className="flex items-start gap-4 mb-4">
                {service.logo ? (
                  <img 
                    src={service.logo} 
                    alt={`${service.name} logo`}
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#c8b4a0]/20 to-[#c8b4a0]/5 flex items-center justify-center group-hover:from-[#c8b4a0]/30 group-hover:to-[#c8b4a0]/10 transition-all flex-shrink-0">
                    <span className="text-[#c8b4a0] font-bold text-2xl">{service.name.charAt(0)}</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-light text-[#f8f7f5] group-hover:text-[#c8b4a0] transition-colors mb-1">
                    {service.name}
                  </h3>
                  <p className="text-sm text-[#c8b4a0]/60 font-light">{service.provider}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-[#c8b4a0]/80 text-sm font-light mb-4 line-clamp-2 flex-grow">
                {service.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {service.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-[#2a2e26] border border-[#3c4237] rounded-lg text-[#c8b4a0] text-xs font-light"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#3c4237]">
                <div>
                  <p className="text-[#c8b4a0]/60 text-xs font-light mb-1">24h Calls</p>
                  <p className="text-[#f8f7f5] font-light">
                    {service.callsLast24h > 1000
                      ? `${(service.callsLast24h / 1000).toFixed(1)}K`
                      : service.callsLast24h.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[#c8b4a0]/60 text-xs font-light mb-1">Price</p>
                  <p className="text-[#f8f7f5] font-light">
                    ${service.pricePerCall < 0.001
                      ? service.pricePerCall.toFixed(6)
                      : service.pricePerCall.toFixed(4)}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#3c4237]">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-[#f8f7f5] font-light">{service.rating}</span>
                </div>
                <span className={`px-2 py-1 rounded-lg text-xs font-light ${
                  service.uptime >= 99.5
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {service.uptime}% uptime
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <div className="text-center py-16 opacity-0 fade-in transition-opacity duration-700">
          <Search className="w-16 h-16 text-[#c8b4a0]/30 mx-auto mb-4" />
          <p className="text-[#c8b4a0] text-xl font-light mb-2">No services found</p>
          <p className="text-[#c8b4a0]/70 font-light">Try adjusting your search or filters</p>
        </div>
      )}
    </PlatformLayout>
  );
}
