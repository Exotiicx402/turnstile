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
  revenue24h?: number;
  logo?: string;
}

export interface Category {
  name: string;
  count: number;
}
