"""Type definitions for Turnstile SDK."""
from dataclasses import dataclass
from typing import Optional, List, Dict, Any
from enum import Enum


@dataclass
class Service:
    """Represents a service in the Turnstile marketplace."""
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


@dataclass
class ServiceResponse:
    """Response from a service call."""
    data: Any
    price: float
    currency: str
    tx_hash: str
    provider: str
    timestamp: int
    latency: float


@dataclass
class ListServicesOptions:
    """Options for listing services."""
    category: Optional[str] = None
    max_price: Optional[float] = None
    sort_by: Optional[str] = None
    tags: Optional[List[str]] = None
    limit: Optional[int] = None
    offset: Optional[int] = None


@dataclass
class CallServiceOptions:
    """Options for calling a service."""
    service_id: str
    params: Dict[str, Any]
    max_price: float
    timeout: Optional[int] = None


@dataclass
class RegisterServiceConfig:
    """Configuration for registering a service."""
    name: str
    endpoint: str
    price_per_call: float
    currency: str
    description: str
    category: str
    rate_limit: Optional[int] = None
    tags: Optional[List[str]] = None


@dataclass
class AgentConfig:
    """Configuration for creating an agent."""
    max_price_per_call: float
    daily_budget: float
    services: List[str]
    auto_retry: bool = False
    retry_attempts: int = 3


class ErrorCode(Enum):
    """Error codes for Turnstile SDK."""
    INSUFFICIENT_BALANCE = "INSUFFICIENT_BALANCE"
    PRICE_TOO_HIGH = "PRICE_TOO_HIGH"
    SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE"
    INVALID_RESPONSE = "INVALID_RESPONSE"
    TIMEOUT = "TIMEOUT"
    NETWORK_ERROR = "NETWORK_ERROR"
    AUTHENTICATION_FAILED = "AUTHENTICATION_FAILED"
    RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED"


class TurnstileError(Exception):
    """Custom exception for Turnstile SDK errors."""
    
    def __init__(self, code: ErrorCode, message: str, details: Any = None):
        self.code = code
        self.message = message
        self.details = details
        super().__init__(message)
