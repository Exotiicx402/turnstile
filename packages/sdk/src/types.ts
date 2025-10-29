import { Connection, Keypair, PublicKey } from '@solana/web3.js';

export interface TurnstileClientConfig {
  connection: Connection;
  wallet: Keypair;
  environment: 'mainnet' | 'devnet' | 'testnet';
  apiUrl?: string;
}

export interface Service {
  id: string;
  name: string;
  endpoint: string;
  pricePerCall: number;
  currency: 'USDC' | 'TSTL';
  description: string;
  category: string;
  provider: string;
  rateLimit?: number;
  rating?: number;
  callCount?: number;
  tags?: string[];
}

export interface ServiceResponse<T = any> {
  data: T;
  price: number;
  currency: string;
  txHash: string;
  provider: string;
  timestamp: number;
  latency: number;
}

export interface ListServicesOptions {
  category?: string;
  maxPrice?: number;
  sortBy?: 'price' | 'popularity' | 'rating';
  tags?: string[];
  limit?: number;
  offset?: number;
}

export interface CallServiceOptions {
  serviceId: string;
  params: Record<string, any>;
  maxPrice: number;
  timeout?: number;
}

export interface RegisterServiceConfig {
  name: string;
  endpoint: string;
  pricePerCall: number;
  currency: 'USDC' | 'TSTL';
  description: string;
  category: string;
  rateLimit?: number;
  tags?: string[];
}

export interface AgentConfig {
  maxPricePerCall: number;
  dailyBudget: number;
  services: string[];
  autoRetry?: boolean;
  retryAttempts?: number;
}

export class TurnstileError extends Error {
  code: string;
  details?: any;

  constructor(code: string, message: string, details?: any) {
    super(message);
    this.name = 'TurnstileError';
    this.code = code;
    this.details = details;
  }
}

export enum ErrorCode {
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
  PRICE_TOO_HIGH = 'PRICE_TOO_HIGH',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  INVALID_RESPONSE = 'INVALID_RESPONSE',
  TIMEOUT = 'TIMEOUT',
  NETWORK_ERROR = 'NETWORK_ERROR',
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
}
