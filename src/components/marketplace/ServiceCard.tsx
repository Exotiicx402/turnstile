import { Star, Activity, Clock, TrendingUp } from 'lucide-react';
import { Service } from '../../pages/Marketplace';

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
}

export default function ServiceCard({ service, onClick }: ServiceCardProps) {
  return (
    <div
      onClick={onClick}
      className="relative bg-[#2a2e26]/50 border border-[#3c4237] rounded-xl p-6 hover:border-[#c8b4a0] transition-all cursor-pointer group hover:shadow-lg hover:shadow-[#c8b4a0]/10"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-[#f8f7f5] text-lg font-semibold mb-1 group-hover:text-[#c8b4a0] transition-colors">
            {service.name}
          </h3>
          <p className="text-[#c8b4a0]/70 text-sm">{service.provider}</p>
        </div>
        <div className="flex items-center gap-1 bg-[#1a1d18] px-2 py-1 rounded-lg">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-[#f8f7f5] text-sm font-semibold">{service.rating}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-[#c8b4a0]/90 text-sm mb-4 line-clamp-2">
        {service.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {service.tags.slice(0, 3).map(tag => (
          <span
            key={tag}
            className="px-2 py-1 bg-[#1a1d18] text-[#c8b4a0] text-xs rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4 pt-4 border-t border-[#3c4237]">
        <div>
          <div className="flex items-center gap-1 mb-1">
            <Activity className="w-3 h-3 text-emerald-400" />
            <p className="text-[#c8b4a0]/70 text-xs">Uptime</p>
          </div>
          <p className="text-[#f8f7f5] text-sm font-semibold">{service.uptime}%</p>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            <Clock className="w-3 h-3 text-blue-400" />
            <p className="text-[#c8b4a0]/70 text-xs">Latency</p>
          </div>
          <p className="text-[#f8f7f5] text-sm font-semibold">{service.latency}ms</p>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            <TrendingUp className="w-3 h-3 text-purple-400" />
            <p className="text-[#c8b4a0]/70 text-xs">24h Calls</p>
          </div>
          <p className="text-[#f8f7f5] text-sm font-semibold">
            {service.callsLast24h > 1000 
              ? `${(service.callsLast24h / 1000).toFixed(1)}k` 
              : service.callsLast24h}
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center justify-between pt-4 border-t border-[#3c4237]">
        <span className="text-[#c8b4a0]/70 text-sm">Price per call</span>
        <div className="text-right">
          <p className="text-[#f8f7f5] text-xl font-bold">
            ${service.pricePerCall < 0.001 
              ? service.pricePerCall.toFixed(6) 
              : service.pricePerCall.toFixed(4)}
          </p>
          <p className="text-[#c8b4a0]/70 text-xs">{service.currency}</p>
        </div>
      </div>

      {/* Category Badge */}
      <div className="absolute top-4 right-4">
        <span className="px-3 py-1 bg-[#c8b4a0]/10 text-[#c8b4a0] text-xs font-semibold rounded-full">
          {service.category}
        </span>
      </div>
    </div>
  );
}
