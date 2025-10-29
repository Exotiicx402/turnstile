"""Turnstile SDK client implementation."""
import time
from typing import List, Optional, Any
import httpx
from solana.rpc.api import Client as SolanaClient
from solana.keypair import Keypair
from solana.transaction import Transaction
from solana.system_program import TransferParams, transfer
from solders.pubkey import Pubkey

from .types import (
    Service,
    ServiceResponse,
    ListServicesOptions,
    CallServiceOptions,
    RegisterServiceConfig,
    AgentConfig,
    TurnstileError,
    ErrorCode,
)


DEFAULT_API_URLS = {
    "mainnet": "https://api.turnstile.xyz",
    "devnet": "https://api.devnet.turnstile.xyz",
    "testnet": "https://api.testnet.turnstile.xyz",
}

DEFAULT_TIMEOUT = 30.0  # 30 seconds


class TurnstileClient:
    """Main client for interacting with Turnstile marketplace."""

    def __init__(
        self,
        solana_client: SolanaClient,
        wallet: Keypair,
        environment: str = "mainnet",
        api_url: Optional[str] = None,
    ):
        """
        Initialize Turnstile client.

        Args:
            solana_client: Solana RPC client
            wallet: Solana wallet keypair
            environment: Network environment ('mainnet', 'devnet', or 'testnet')
            api_url: Custom API endpoint (optional)
        """
        self.solana_client = solana_client
        self.wallet = wallet
        self.environment = environment
        self.api_url = api_url or DEFAULT_API_URLS[environment]
        self.http_client = httpx.Client(timeout=DEFAULT_TIMEOUT)

    def list_services(
        self, options: Optional[ListServicesOptions] = None
    ) -> List[Service]:
        """
        List available services in the marketplace.

        Args:
            options: Filtering and sorting options

        Returns:
            List of Service objects

        Raises:
            TurnstileError: If the request fails
        """
        try:
            params = {}
            if options:
                if options.category:
                    params["category"] = options.category
                if options.max_price:
                    params["maxPrice"] = options.max_price
                if options.sort_by:
                    params["sortBy"] = options.sort_by
                if options.tags:
                    params["tags"] = ",".join(options.tags)
                if options.limit:
                    params["limit"] = options.limit
                if options.offset:
                    params["offset"] = options.offset

            response = self.http_client.get(f"{self.api_url}/services", params=params)
            response.raise_for_status()

            data = response.json()
            services = data.get("services", [])

            return [
                Service(
                    id=s["id"],
                    name=s["name"],
                    endpoint=s["endpoint"],
                    price_per_call=s["pricePerCall"],
                    currency=s["currency"],
                    description=s["description"],
                    category=s["category"],
                    provider=s["provider"],
                    rate_limit=s.get("rateLimit"),
                    rating=s.get("rating"),
                    call_count=s.get("callCount"),
                    tags=s.get("tags"),
                )
                for s in services
            ]
        except httpx.HTTPError as e:
            raise TurnstileError(
                ErrorCode.NETWORK_ERROR, "Failed to list services", str(e)
            )

    def call(self, options: CallServiceOptions) -> ServiceResponse:
        """
        Call a service with automatic x402 payment handling.

        Args:
            options: Service call configuration

        Returns:
            ServiceResponse with data and payment details

        Raises:
            TurnstileError: If the call fails
        """
        start_time = time.time()
        timeout = options.timeout or DEFAULT_TIMEOUT

        try:
            # Step 1: Get service details
            service = self._get_service(options.service_id)

            if service.price_per_call > options.max_price:
                raise TurnstileError(
                    ErrorCode.PRICE_TOO_HIGH,
                    f"Service price ({service.price_per_call}) exceeds maxPrice ({options.max_price})",
                )

            # Step 2: Execute payment on Solana
            tx_hash = self._execute_payment(
                service.provider, service.price_per_call, service.currency
            )

            # Step 3: Call service with payment proof
            response_data = self._call_service_with_proof(
                service.endpoint, options.params, tx_hash, timeout
            )

            latency = time.time() - start_time

            return ServiceResponse(
                data=response_data,
                price=service.price_per_call,
                currency=service.currency,
                tx_hash=tx_hash,
                provider=service.provider,
                timestamp=int(time.time()),
                latency=latency,
            )
        except TurnstileError:
            raise
        except Exception as e:
            raise TurnstileError(
                ErrorCode.SERVICE_UNAVAILABLE, "Failed to call service", str(e)
            )

    def register_service(self, config: RegisterServiceConfig) -> Service:
        """
        Register a new service on the marketplace.

        Args:
            config: Service registration configuration

        Returns:
            Registered Service object

        Raises:
            TurnstileError: If registration fails
        """
        try:
            payload = {
                "name": config.name,
                "endpoint": config.endpoint,
                "pricePerCall": config.price_per_call,
                "currency": config.currency,
                "description": config.description,
                "category": config.category,
                "rateLimit": config.rate_limit,
                "tags": config.tags,
            }

            headers = {
                "Content-Type": "application/json",
                "X-Wallet-Address": str(self.wallet.pubkey()),
            }

            response = self.http_client.post(
                f"{self.api_url}/services", json=payload, headers=headers
            )
            response.raise_for_status()

            data = response.json()
            s = data["service"]

            return Service(
                id=s["id"],
                name=s["name"],
                endpoint=s["endpoint"],
                price_per_call=s["pricePerCall"],
                currency=s["currency"],
                description=s["description"],
                category=s["category"],
                provider=s["provider"],
                rate_limit=s.get("rateLimit"),
                rating=s.get("rating"),
                call_count=s.get("callCount"),
                tags=s.get("tags"),
            )
        except httpx.HTTPError as e:
            raise TurnstileError(
                ErrorCode.NETWORK_ERROR, "Failed to register service", str(e)
            )

    def create_agent(self, config: AgentConfig):
        """
        Create an agent with budget controls.

        Args:
            config: Agent configuration

        Returns:
            Agent instance with constrained call method
        """

        class Agent:
            def __init__(self, client: "TurnstileClient", cfg: AgentConfig):
                self.client = client
                self.config = cfg

            def call(self, service_id: str, params: dict) -> ServiceResponse:
                return self.client.call(
                    CallServiceOptions(
                        service_id=service_id,
                        params=params,
                        max_price=self.config.max_price_per_call,
                    )
                )

        return Agent(self, config)

    def _get_service(self, service_id: str) -> Service:
        """Get service details by ID."""
        try:
            response = self.http_client.get(f"{self.api_url}/services/{service_id}")
            response.raise_for_status()

            data = response.json()
            s = data["service"]

            return Service(
                id=s["id"],
                name=s["name"],
                endpoint=s["endpoint"],
                price_per_call=s["pricePerCall"],
                currency=s["currency"],
                description=s["description"],
                category=s["category"],
                provider=s["provider"],
                rate_limit=s.get("rateLimit"),
                rating=s.get("rating"),
                call_count=s.get("callCount"),
                tags=s.get("tags"),
            )
        except httpx.HTTPError:
            raise TurnstileError(
                ErrorCode.SERVICE_UNAVAILABLE, f"Service not found: {service_id}"
            )

    def _execute_payment(
        self, provider: str, amount: float, currency: str
    ) -> str:
        """Execute payment on Solana blockchain."""
        try:
            # Check wallet balance
            balance_resp = self.solana_client.get_balance(self.wallet.pubkey())
            balance = balance_resp.value

            required_lamports = int(amount * 1e9)  # Convert to lamports

            if balance < required_lamports:
                raise TurnstileError(
                    ErrorCode.INSUFFICIENT_BALANCE, "Insufficient balance in wallet"
                )

            # Create transfer transaction
            provider_pubkey = Pubkey.from_string(provider)
            transfer_ix = transfer(
                TransferParams(
                    from_pubkey=self.wallet.pubkey(),
                    to_pubkey=provider_pubkey,
                    lamports=required_lamports,
                )
            )

            transaction = Transaction().add(transfer_ix)

            # Send and confirm transaction
            result = self.solana_client.send_transaction(
                transaction, self.wallet
            )
            tx_hash = str(result.value)

            # Wait for confirmation
            self.solana_client.confirm_transaction(tx_hash)

            return tx_hash
        except TurnstileError:
            raise
        except Exception as e:
            raise TurnstileError(
                ErrorCode.NETWORK_ERROR, "Failed to execute payment", str(e)
            )

    def _call_service_with_proof(
        self, endpoint: str, params: dict, tx_hash: str, timeout: float
    ) -> Any:
        """Call service endpoint with payment proof."""
        try:
            headers = {
                "Content-Type": "application/json",
                "X-Payment-Proof": tx_hash,
            }

            response = self.http_client.post(
                endpoint, json=params, headers=headers, timeout=timeout
            )
            response.raise_for_status()

            return response.json()
        except httpx.TimeoutException:
            raise TurnstileError(ErrorCode.TIMEOUT, "Service request timed out")
        except httpx.HTTPError as e:
            raise TurnstileError(
                ErrorCode.SERVICE_UNAVAILABLE, f"Service call failed: {str(e)}"
            )

    def get_public_key(self) -> str:
        """Get the wallet's public key."""
        return str(self.wallet.pubkey())

    def get_environment(self) -> str:
        """Get the current environment."""
        return self.environment

    def close(self):
        """Close the HTTP client."""
        self.http_client.close()

    def __enter__(self):
        """Context manager entry."""
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        """Context manager exit."""
        self.close()
