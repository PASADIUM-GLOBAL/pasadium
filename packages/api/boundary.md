# API Boundary: api.pasadium.tech

## Purpose
The central gateway for all PASADIUM application requests. This separates the public presentation layer from the private business logic.

## Architecture
- **Base URL**: `https://api.pasadium.tech`
- **Protocol**: REST / JSON (future GraphQL for complex queries)
- **Transport**: HTTPS / TLS 1.3
- **Authentication**: Bearer Tokens (JWT) issued by `auth.pasadium.tech`

## Core Contracts

### 1. Public Gateway (pasadium.tech)
- `GET /v1/platform` -> Returns platform capabilities and status.
- `POST /v1/contact` -> Public inquiry submission.

### 2. Application Specific (trade, media, market, admin)
- `/v1/trade/*` -> Trade-specific endpoints (Requires `scope: trade`).
- `/v1/media/*` -> Media-specific endpoints (Requires `scope: media`).
- `/v1/market/*` -> Market-specific endpoints (Requires `scope: market`).
- `/v1/admin/*` -> Administrative endpoints (Requires `scope: admin` + High Trust).

## Security Rules
- **No Internal Topology**: API responses must not leak internal engine names (e.g., no "SecVerse" in JSON).
- **Rate Limiting**: Enforced at the gateway level.
- **Input Validation**: Strict schema validation for all incoming requests.
