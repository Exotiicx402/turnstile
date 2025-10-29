# Turnstile SDK for Python

Official Python SDK for Turnstile - The Solana-native x402 marketplace for AI agents and on-chain services.

## Overview

Turnstile enables instant micropayments between AI agents and API providers using the x402 protocol on Solana. This SDK provides a simple Python interface to interact with the Turnstile marketplace, making it easy to consume or provide services with pay-per-call billing and instant settlement.

## Features

- **x402 Protocol Support** - Automatic payment negotiation and execution
- **Solana Integration** - Fast, low-cost micropayments on Solana blockchain
- **Type Hints** - Full type annotation support for better IDE integration
- **Error Handling** - Robust error handling with detailed error codes
- **Agent Management** - Built-in budget controls and spending limits
- **Service Discovery** - Browse and filter marketplace services
- **Context Manager Support** - Automatic resource cleanup

## Installation

```bash
pip install turnstile-sdk solana-py
```

## Quick Start

### Initialize Client

```python
from turnstile_sdk import TurnstileClient
from solana.rpc.api import Client
from solana.keypair import Keypair

# Initialize Solana connection
solana_client = Client("https://api.mainnet-beta.solana.com")
wallet = Keypair()  # Load your wallet

# Create Turnstile client
client = TurnstileClient(
    solana_client=solana_client,
    wallet=wallet,
    environment="mainnet"
)
```

### Browse Services

```python
from turnstile_sdk import ListServicesOptions

options = ListServicesOptions(
    category="ai-inference",
    max_price=0.01,
    sort_by="popularity"
)

services = client.list_services(options)
print(f"Found {len(services)} services")
```

### Call a Service

```python
from turnstile_sdk import CallServiceOptions

options = CallServiceOptions(
    service_id="ai-inference-gpt4",
    params={
        "prompt": "Generate a haiku about Solana",
        "temperature": 0.7
    },
    max_price=0.01
)

response = client.call(options)
print(response.data)
# Payment automatically handled via x402
```

### Using Context Manager

```python
with TurnstileClient(solana_client, wallet, "mainnet") as client:
    services = client.list_services()
    # Client will automatically close when exiting context
```

## API Reference

### TurnstileClient

#### Constructor

```python
TurnstileClient(
    solana_client: Client,
    wallet: Keypair,
    environment: str = "mainnet",
    api_url: Optional[str] = None
)
```

**Parameters:**
- `solana_client` (Client) - Solana RPC client instance
- `wallet` (Keypair) - Solana wallet keypair
- `environment` (str) - Network environment: 'mainnet', 'devnet', or 'testnet'
- `api_url` (str, optional) - Custom API endpoint

#### Methods

##### list_services(options=None)

Browse available services in the marketplace.

```python
def list_services(
    options: Optional[ListServicesOptions] = None
) -> List[Service]
```

**Options:**
- `category` (str, optional) - Filter by category
- `max_price` (float, optional) - Maximum price per call
- `sort_by` (str, optional) - Sort order: 'price', 'popularity', or 'rating'
- `tags` (List[str], optional) - Filter by tags
- `limit` (int, optional) - Maximum results
- `offset` (int, optional) - Pagination offset

**Returns:** List of Service objects

##### call(options)

Execute a paid service call with automatic x402 handling.

```python
def call(options: CallServiceOptions) -> ServiceResponse
```

**Options:**
- `service_id` (str) - Service identifier
- `params` (dict) - Service-specific parameters
- `max_price` (float) - Maximum acceptable price
- `timeout` (int, optional) - Request timeout in seconds (default: 30)

**Returns:** ServiceResponse with data, payment details, and metadata

##### register_service(config)

List your API service on Turnstile (providers only).

```python
def register_service(config: RegisterServiceConfig) -> Service
```

**Configuration:**
- `name` (str) - Service display name
- `endpoint` (str) - API endpoint URL
- `price_per_call` (float) - Price in USDC or TSTL
- `currency` (str) - Payment currency: 'USDC' or 'TSTL'
- `description` (str) - Service description
- `category` (str) - Service category
- `rate_limit` (int, optional) - Max calls per second
- `tags` (List[str], optional) - Service tags

**Returns:** Registered Service object

##### create_agent(config)

Create an agent with budget controls.

```python
def create_agent(config: AgentConfig) -> Agent
```

**Configuration:**
- `max_price_per_call` (float) - Maximum price per call
- `daily_budget` (float) - Maximum daily spending
- `services` (List[str]) - Allowed service IDs
- `auto_retry` (bool) - Enable automatic retries (default: False)
- `retry_attempts` (int) - Number of retry attempts (default: 3)

**Returns:** Agent instance with constrained call method

## Type Definitions

### Service

```python
@dataclass
class Service:
    id: str
    name: str
    endpoint: str
    price_per_call: float
    currency: str
    description: str
    category: str
    provider: str
    rate_limit: Optional[int] = None
    rating: Optional[float] = None
    call_count: Optional[int] = None
    tags: Optional[List[str]] = None
```

### ServiceResponse

```python
@dataclass
class ServiceResponse:
    data: Any              # Service-specific response
    price: float           # Actual price paid
    currency: str          # Payment currency
    tx_hash: str           # Solana transaction hash
    provider: str          # Provider wallet address
    timestamp: int         # Unix timestamp
    latency: float         # Response time in seconds
```

## Error Handling

All errors thrown by the SDK are instances of `TurnstileError` with a specific error code.

```python
from turnstile_sdk import TurnstileError, ErrorCode

try:
    response = client.call(options)
except TurnstileError as e:
    if e.code == ErrorCode.INSUFFICIENT_BALANCE:
        print("Need more USDC in wallet")
    elif e.code == ErrorCode.PRICE_TOO_HIGH:
        print("Service price exceeds maxPrice")
    elif e.code == ErrorCode.SERVICE_UNAVAILABLE:
        print("Provider offline or rate limited")
    elif e.code == ErrorCode.TIMEOUT:
        print("Request timed out")
    else:
        print(f"Error: {e.message}")
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

```python
from turnstile_sdk import AgentConfig

agent = client.create_agent(AgentConfig(
    max_price_per_call=0.01,
    daily_budget=10.0,
    services=["ai-inference"]
))

result = agent.call("ai-inference-gpt4", {
    "prompt": "What is Solana?"
})
```

### Service Provider Registration

```python
from turnstile_sdk import RegisterServiceConfig

service = client.register_service(RegisterServiceConfig(
    name="My AI Model",
    endpoint="https://api.example.com/inference",
    price_per_call=0.005,
    currency="USDC",
    description="Fast GPT-4 inference API",
    category="ai-inference",
    rate_limit=100,
    tags=["gpt4", "fast", "reliable"]
))

print(f"Service registered: {service.id}")
```

### Advanced Filtering

```python
from turnstile_sdk import ListServicesOptions

services = client.list_services(ListServicesOptions(
    category="ai-inference",
    max_price=0.02,
    sort_by="rating",
    tags=["gpt4", "multilingual"],
    limit=10
))

for service in services:
    print(f"{service.name} - {service.price_per_call} {service.currency}")
```

## Requirements

- Python 3.10 or higher
- Solana wallet with SOL for gas fees
- USDC or TSTL for service payments

## Network Endpoints

The SDK automatically connects to the appropriate API endpoint based on environment:

- **Mainnet**: `https://api.turnstile.xyz`
- **Devnet**: `https://api.devnet.turnstile.xyz`
- **Testnet**: `https://api.testnet.turnstile.xyz`

Custom endpoints can be specified via the `api_url` parameter.

## Development

### Install Development Dependencies

```bash
pip install -e ".[dev]"
```

### Run Tests

```bash
pytest
```

### Format Code

```bash
black turnstile_sdk/
```

### Type Checking

```bash
mypy turnstile_sdk/
```

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
