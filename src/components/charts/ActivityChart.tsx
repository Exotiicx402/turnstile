import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import type { Service } from '../../types/service';

type MetricType = 'transactions' | 'volume' | 'buyers';

interface ActivityChartProps {
  metric: MetricType;
  service: Service;
}

// Generate realistic 7-day historical data based on current service metrics
const generateChartData = (service: Service) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const baseTransactions = service.callsLast24h;
  const baseVolume = service.revenue24h || baseTransactions * service.pricePerCall;
  const baseBuyers = Math.floor(baseTransactions / 80); // Assume avg 80 calls per buyer
  
  return days.map((label, index) => {
    // Create variation: slightly lower earlier in week, trending up
    const trend = 0.7 + (index / days.length) * 0.6; // 0.7 to 1.3 range
    const randomVariation = 0.85 + Math.random() * 0.3; // 0.85 to 1.15 range
    const factor = trend * randomVariation;
    
    return {
      label,
      transactions: Math.floor(baseTransactions * factor),
      volume: Math.floor(baseVolume * factor),
      buyers: Math.floor(baseBuyers * factor),
    };
  });
};

const metricConfig = {
  transactions: {
    label: 'Transactions',
    format: (value: number) => `${value.toLocaleString()} txns`,
    yAxisFormat: (value: number) => `${(value / 1000).toFixed(0)}K`,
  },
  volume: {
    label: 'Volume',
    format: (value: number) => `$${value.toLocaleString()}`,
    yAxisFormat: (value: number) => `$${value}`,
  },
  buyers: {
    label: 'Buyers',
    format: (value: number) => `${value.toLocaleString()} buyers`,
    yAxisFormat: (value: number) => value.toString(),
  },
};

export default function ActivityChart({ metric, service }: ActivityChartProps) {
  const config = metricConfig[metric];
  const chartData = generateChartData(service);

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#3c4237" opacity={0.2} />
          <XAxis 
            dataKey="label" 
            stroke="#c8b4a0" 
            opacity={0.6}
            style={{ fontSize: '12px', fontWeight: '300' }}
          />
          <YAxis 
            stroke="#c8b4a0" 
            opacity={0.6}
            style={{ fontSize: '12px', fontWeight: '300' }}
            tickFormatter={config.yAxisFormat}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1a1d18',
              border: '1px solid #3c4237',
              borderRadius: '0.75rem',
              color: '#f8f7f5',
              fontWeight: '300',
            }}
            labelStyle={{ color: '#c8b4a0', fontWeight: '300' }}
            itemStyle={{ color: '#10b981' }}
            formatter={(value: number) => [config.format(value), '']}
          />
          <Area 
            type="monotone" 
            dataKey={metric}
            stroke="#10b981" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorCalls)" 
            dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, fill: '#10b981' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
