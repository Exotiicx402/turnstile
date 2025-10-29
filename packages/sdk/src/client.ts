import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import {
  TurnstileClientConfig,
  Service,
  ServiceResponse,
  ListServicesOptions,
  CallServiceOptions,
  RegisterServiceConfig,
  AgentConfig,
  TurnstileError,
  ErrorCode,
} from './types';

const DEFAULT_API_URLS = {
  mainnet: 'https://api.turnstile.xyz',
  devnet: 'https://api.devnet.turnstile.xyz',
  testnet: 'https://api.testnet.turnstile.xyz',
};

const DEFAULT_TIMEOUT = 30000; // 30 seconds
const DEFAULT_RETRY_ATTEMPTS = 3;

export class TurnstileClient {
  private connection: Connection;
  private wallet: Keypair;
  private environment: 'mainnet' | 'devnet' | 'testnet';
  private apiUrl: string;

  constructor(config: TurnstileClientConfig) {
    this.connection = config.connection;
    this.wallet = config.wallet;
    this.environment = config.environment;
    this.apiUrl = config.apiUrl || DEFAULT_API_URLS[config.environment];
  }

  /**
   * List available services in the marketplace
   */
  async listServices(options: ListServicesOptions = {}): Promise<Service[]> {
    try {
      const queryParams = new URLSearchParams();
      if (options.category) queryParams.set('category', options.category);
      if (options.maxPrice) queryParams.set('maxPrice', options.maxPrice.toString());
      if (options.sortBy) queryParams.set('sortBy', options.sortBy);
      if (options.tags) queryParams.set('tags', options.tags.join(','));
      if (options.limit) queryParams.set('limit', options.limit.toString());
      if (options.offset) queryParams.set('offset', options.offset.toString());

      const response = await fetch(`${this.apiUrl}/services?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new TurnstileError(
          ErrorCode.NETWORK_ERROR,
          `Failed to fetch services: ${response.statusText}`
        );
      }

      const data = await response.json() as { services?: Service[] };
      return data.services || [];
    } catch (error: any) {
      if (error instanceof TurnstileError) throw error;
      throw new TurnstileError(
        ErrorCode.NETWORK_ERROR,
        'Failed to list services',
        error
      );
    }
  }

  /**
   * Call a service with automatic x402 payment handling
   */
  async call<T = any>(options: CallServiceOptions): Promise<ServiceResponse<T>> {
    const startTime = Date.now();
    const timeout = options.timeout || DEFAULT_TIMEOUT;

    try {
      // Step 1: Attempt service call without payment
      const service = await this.getService(options.serviceId);
      
      if (service.pricePerCall > options.maxPrice) {
        throw new TurnstileError(
          ErrorCode.PRICE_TOO_HIGH,
          `Service price (${service.pricePerCall}) exceeds maxPrice (${options.maxPrice})`
        );
      }

      // Step 2: Execute payment on Solana
      const txHash = await this.executePayment(
        service.provider,
        service.pricePerCall,
        service.currency
      );

      // Step 3: Call service with payment proof
      const response = await this.callServiceWithProof(
        service.endpoint,
        options.params,
        txHash,
        timeout
      );

      const latency = Date.now() - startTime;

      return {
        data: response,
        price: service.pricePerCall,
        currency: service.currency,
        txHash,
        provider: service.provider,
        timestamp: Date.now(),
        latency,
      };
    } catch (error: any) {
      if (error instanceof TurnstileError) throw error;
      throw new TurnstileError(
        ErrorCode.SERVICE_UNAVAILABLE,
        'Failed to call service',
        error
      );
    }
  }

  /**
   * Register a new service on the marketplace
   */
  async registerService(config: RegisterServiceConfig): Promise<Service> {
    try {
      const response = await fetch(`${this.apiUrl}/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Wallet-Address': this.wallet.publicKey.toBase58(),
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new TurnstileError(
          ErrorCode.NETWORK_ERROR,
          `Failed to register service: ${response.statusText}`
        );
      }

      const data = await response.json() as { service: Service };
      return data.service;
    } catch (error: any) {
      if (error instanceof TurnstileError) throw error;
      throw new TurnstileError(
        ErrorCode.NETWORK_ERROR,
        'Failed to register service',
        error
      );
    }
  }

  /**
   * Create an agent with budget controls
   */
  createAgent(config: AgentConfig) {
    return {
      config,
      call: async <T = any>(
        serviceId: string,
        params: Record<string, any>
      ): Promise<ServiceResponse<T>> => {
        return this.call<T>({
          serviceId,
          params,
          maxPrice: config.maxPricePerCall,
        });
      },
    };
  }

  /**
   * Get service details by ID
   */
  private async getService(serviceId: string): Promise<Service> {
    try {
      const response = await fetch(`${this.apiUrl}/services/${serviceId}`);
      
      if (!response.ok) {
        throw new TurnstileError(
          ErrorCode.SERVICE_UNAVAILABLE,
          `Service not found: ${serviceId}`
        );
      }

      const data = await response.json() as { service: Service };
      return data.service;
    } catch (error: any) {
      if (error instanceof TurnstileError) throw error;
      throw new TurnstileError(
        ErrorCode.SERVICE_UNAVAILABLE,
        `Failed to get service: ${serviceId}`,
        error
      );
    }
  }

  /**
   * Execute payment on Solana blockchain
   */
  private async executePayment(
    provider: string,
    amount: number,
    currency: 'USDC' | 'TSTL'
  ): Promise<string> {
    try {
      // Check wallet balance
      const balance = await this.connection.getBalance(this.wallet.publicKey);
      const requiredLamports = amount * LAMPORTS_PER_SOL;

      if (balance < requiredLamports) {
        throw new TurnstileError(
          ErrorCode.INSUFFICIENT_BALANCE,
          'Insufficient balance in wallet'
        );
      }

      // Create and send transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: this.wallet.publicKey,
          toPubkey: new PublicKey(provider),
          lamports: requiredLamports,
        })
      );

      const signature = await this.connection.sendTransaction(transaction, [this.wallet]);
      await this.connection.confirmTransaction(signature);

      return signature;
    } catch (error: any) {
      if (error instanceof TurnstileError) throw error;
      throw new TurnstileError(
        ErrorCode.NETWORK_ERROR,
        'Failed to execute payment',
        error
      );
    }
  }

  /**
   * Call service endpoint with payment proof
   */
  private async callServiceWithProof<T = any>(
    endpoint: string,
    params: Record<string, any>,
    txHash: string,
    timeout: number
  ): Promise<T> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Payment-Proof': txHash,
        },
        body: JSON.stringify(params),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new TurnstileError(
          ErrorCode.SERVICE_UNAVAILABLE,
          `Service returned ${response.status}: ${response.statusText}`
        );
      }

      return await response.json() as T;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new TurnstileError(ErrorCode.TIMEOUT, 'Service request timed out');
      }
      if (error instanceof TurnstileError) throw error;
      throw new TurnstileError(
        ErrorCode.SERVICE_UNAVAILABLE,
        'Failed to call service',
        error
      );
    }
  }

  /**
   * Get the wallet's public key
   */
  getPublicKey(): PublicKey {
    return this.wallet.publicKey;
  }

  /**
   * Get the current environment
   */
  getEnvironment(): string {
    return this.environment;
  }
}
