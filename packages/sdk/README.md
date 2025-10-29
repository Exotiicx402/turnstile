# Turnstile SDK

Official TypeScript SDK for Turnstile - The Solana-native x402 marketplace for AI agents and on-chain services.

## Overview

Turnstile enables instant micropayments between AI agents and API providers using the x402 protocol on Solana. This SDK provides a simple interface to interact with the Turnstile marketplace, making it easy to consume or provide services with pay-per-call billing and instant settlement.

## Features

- **x402 Protocol Support** - Automatic payment negotiation and execution
- **Solana Integration** - Fast, low-cost micropayments on Solana blockchain
- **Type-Safe API** - Full TypeScript support with comprehensive type definitions
- **Error Handling** - Robust error handling with detailed error codes
- **Agent Management** - Built-in budget controls and spending limits
- **Service Discovery** - Browse and filter marketplace services

## Installation

```bash
npm install @exotiicx402/turnstile-sdk @solana/web3.js
```

## Quick Start

### Initialize Client

```typescript
import { TurnstileClient } from '@exotiicx402/turnstile-sdk';
import { Connection, Keypair } from '@solana/web3.js';

const connection = new Connection('https://api.mainnet-beta.solana.com');
const wallet = Keypair.fromSecretKey(/* your secret key */);

const client = new TurnstileClient({
  connection,
  wallet,
  environment: 'mainnet'
});
```

### Browse Services

```typescript
const services = await client.listServices({
  category: 'ai-inference',
  maxPrice: 0.01,
  sortBy: 'popularity'
});

console.log(`Found ${services.length} services`);
```

### Call a Service

```typescript
const response = await client.call({
  serviceId: 'ai-inference-gpt4',
  params: {
    prompt: 'Generate a haiku about Solana',
    temperature: 0.7
  },
  maxPrice: 0.01
});

console.log(response.data);
// Payment automatically handled via x402
```

## API Reference

### TurnstileClient

#### Constructor

```typescript
new TurnstileClient(config: TurnstileClientConfig)
```

**Parameters:**
- `connection` (Connection) - Solana RPC connection
- `wallet` (Keypair) - Solana wallet keypair
- `environment` ('mainnet' | 'devnet' | 'testnet') - Network environment
- `apiUrl` (string, optional) - Custom API endpoint

#### Methods

##### listServices(options?)

Browse available services in the marketplace.

```typescript
async listServices(options?: ListServicesOptions): Promise<Service[]>
```

**Options:**
- `category` (string, optional) - Filter by category
- `maxPrice` (number, optional) - Maximum price per call
- `sortBy` ('price' | 'popularity' | 'rating', optional) - Sort order
- `tags` (string[], optional) - Filter by tags
- `limit` (number, optional) - Maximum results
- `offset` (number, optional) - Pagination offset

**Returns:** Array of Service objects

##### call(options)

Execute a paid service call with automatic x402 handling.

```typescript
async call<T>(options: CallServiceOptions): Promise<ServiceResponse<T>>
```

**Options:**
- `serviceId` (string) - Service identifier
- `params` (object) - Service-specific parameters
- `maxPrice` (number) - Maximum acceptable price
- `timeout` (number, optional) - Request timeout in ms (default: 30000)

**Returns:** ServiceResponse with data, payment details, and metadata

##### registerService(config)

List your API service on Turnstile (providers only).

```typescript
async registerService(config: RegisterServiceConfig): Promise<Service>
```

**Configuration:**
- `name` (string) - Service display name
- `endpoint` (string) - API endpoint URL
- `pricePerCall` (number) - Price in USDC or TSTL
- `currency` ('USDC' | 'TSTL') - Payment currency
- `description` (string) - Service description
- `category` (string) - Service category
- `rateLimit` (number, optional) - Max calls per second
- `tags` (string[], optional) - Service tags

**Returns:** Registered Service object

##### createAgent(config)

Create an agent with budget controls.

```typescript
createAgent(config: AgentConfig)
```

**Configuration:**
- `maxPricePerCall` (number) - Maximum price per call
- `dailyBudget` (number) - Maximum daily spending
- `services` (string[]) - Allowed service IDs
- `autoRetry` (boolean, optional) - Enable automatic retries
- `retryAttempts` (number, optional) - Number of retry attempts

**Returns:** Agent instance with constrained `call` method

## Type Definitions

### Service

```typescript
interface Service {
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
```

### ServiceResponse

```typescript
interface ServiceResponse<T = any> {
  data: T;              // Service-specific response
  price: number;        // Actual price paid
  currency: string;     // Payment currency
  txHash: string;       // Solana transaction hash
  provider: string;     // Provider wallet address
  timestamp: number;    // Unix timestamp
  latency: number;      // Response time in ms
}
```

## Error Handling

All errors thrown by the SDK are instances of `TurnstileError` with a specific error code.

```typescript
import { TurnstileError, ErrorCode } from '@exotiicx402/turnstile-sdk';

try {
  const response = await client.call({...});
} catch (error) {
  if (error instanceof TurnstileError) {
    switch (error.code) {
      case ErrorCode.INSUFFICIENT_BALANCE:
        console.error('Need more USDC in wallet');
        break;
      case ErrorCode.PRICE_TOO_HIGH:
        console.error('Service price exceeds maxPrice');
        break;
      case ErrorCode.SERVICE_UNAVAILABLE:
        console.error('Provider offline or rate limited');
        break;
      case ErrorCode.TIMEOUT:
        console.error('Request timed out');
        break;
      default:
        console.error(`Error: ${error.message}`);
    }
  }
}
```

### Error Codes

- `INSUFFICIENT_BALANCE` - Wallet has insufficient funds
- `PRICE_TOO_HIGH` - Service price exceeds maxPrice
- `SERVICE_UNAVAILABLE` - Service is offline or unavailable
- `INVALID_RESPONSE` - Service returned invalid response
- `TIMEOUT` - Request exceeded timeout duration
- `NETWORK_ERROR` - Network or API error
- `AUTHENTICATION_FAILED` - Authentication error
- `RATE_LIMIT_EXCEEDED` - Rate limit exceeded

## Examples

### Budget-Controlled Agent

```typescript
const agent = client.createAgent({
  maxPricePerCall: 0.01,
  dailyBudget: 10.0,
  services: ['ai-inference']
});

const result = await agent.call('ai-inference-gpt4', {
  prompt: 'What is Solana?'
});
```

### Service Provider Registration

```typescript
const service = await client.registerService({
  name: 'My AI Model',
  endpoint: 'https://api.example.com/inference',
  pricePerCall: 0.005,
  currency: 'USDC',
  description: 'Fast GPT-4 inference API',
  category: 'ai-inference',
  rateLimit: 100,
  tags: ['gpt4', 'fast', 'reliable']
});

console.log(`Service registered: ${service.id}`);
```

### Advanced Filtering

```typescript
const services = await client.listServices({
  category: 'ai-inference',
  maxPrice: 0.02,
  sortBy: 'rating',
  tags: ['gpt4', 'multilingual'],
  limit: 10
});

for (const service of services) {
  console.log(`${service.name} - ${service.pricePerCall} ${service.currency}`);
}
```

## Requirements

- Node.js 18.0.0 or higher
- Solana wallet with SOL for gas fees
- USDC or TSTL for service payments

## Network Endpoints

The SDK automatically connects to the appropriate API endpoint based on environment:

- **Mainnet**: `https://api.turnstile.xyz`
- **Devnet**: `https://api.devnet.turnstile.xyz`
- **Testnet**: `https://api.testnet.turnstile.xyz`

Custom endpoints can be specified via the `apiUrl` configuration option.

## Support

- **Documentation**: [https://docs.turnstile.xyz](https://docs.turnstile.xyz)
- **Discord**: [https://discord.gg/turnstile](https://discord.gg/turnstile)
- **Twitter**: [@turnstilefndn](https://twitter.com/turnstilefndn)
- **GitHub**: [https://github.com/Exotiicx402/turnstile](https://github.com/Exotiicx402/turnstile)
- **Email**: support@turnstile.xyz

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

MIT License - see LICENSE file for details.

## About Turnstile

Turnstile is the first Solana-native x402 marketplace, enabling instant micropayments for AI agents and on-chain services. Built on Solana's high-performance blockchain, Turnstile offers sub-second settlement times and sub-cent transaction fees, making true pay-per-call economics viable for the agent economy.

**Built on Solana. Powered by x402.**
