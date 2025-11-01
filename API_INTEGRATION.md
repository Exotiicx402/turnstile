# API Integration Guide

## Overview

The application has been refactored to remove all mock data and set up infrastructure for real API integration. All service data is now fetched from a configurable API endpoint.

## Changes Made

### 1. New Files Created

#### `src/types/service.ts`
- Centralized `Service` and `Category` type definitions
- All components now import types from here

#### `src/services/api.ts`
- API service layer with three main functions:
  - `fetchServices()` - Get all services
  - `fetchServiceById(id)` - Get a single service by ID
  - `fetchServicesByCategory(category)` - Get services filtered by category

#### `.env.example`
- Template for environment variables
- Copy to `.env` and configure your API endpoint

### 2. Files Removed

- `src/data/mockServices.ts` - All mock data has been deleted

### 3. Files Updated

All pages now use the API service instead of mock data:

- `src/pages/ServiceDetail.tsx`
- `src/pages/Marketplace.tsx`
- `src/pages/platform/Browse.tsx`
- `src/pages/platform/Overview.tsx`

## Setup Instructions

### 1. Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and set your API base URL
# Example: VITE_API_BASE_URL=https://api.turnstile.io/v1
```

### 2. API Requirements

Your API should provide the following endpoints:

#### GET `/services`
Returns an array of all services.

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "provider": "string",
    "providerAddress": "string",
    "description": "string",
    "category": "AI/ML" | "Data" | "Tools",
    "pricePerCall": number,
    "currency": "USDC" | "TSTL",
    "callsLast24h": number,
    "uptime": number,
    "rating": number,
    "latency": number,
    "tags": string[],
    "endpoint": "string",
    "revenue24h": number (optional),
    "logo": "string" (optional)
  }
]
```

#### GET `/services/:id`
Returns a single service by ID.

**Response:**
```json
{
  "id": "string",
  "name": "string",
  ...
}
```

### 3. Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Loading States

All pages now include loading states that display while data is being fetched. The app gracefully handles:
- Empty data arrays
- Failed requests (returns empty array with console error)
- Missing environment variables (falls back to localhost:3000)

## Next Steps

1. **Set up your backend API** with the required endpoints
2. **Configure `.env`** with your API base URL
3. **Test the integration** - the app will automatically fetch from your API
4. **Add error boundaries** (optional) for better error handling
5. **Implement caching** (optional) using React Query or SWR for better performance
6. **Add pagination** (optional) for large datasets

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:3000/api` | Base URL for the API |
| `VITE_SOLANA_RPC_URL` | `https://api.mainnet-beta.solana.com` | Solana RPC endpoint |
| `VITE_SOLANA_NETWORK` | `mainnet-beta` | Solana network |

## Troubleshooting

### No services showing
- Check browser console for API errors
- Verify API endpoint is accessible
- Check `.env` configuration
- Ensure API returns data in the correct format

### TypeScript errors
- Ensure your API response matches the `Service` interface in `src/types/service.ts`
- Add optional fields with `?` if they're not always returned

### CORS issues
- Configure CORS headers on your backend
- Add your frontend URL to allowed origins
