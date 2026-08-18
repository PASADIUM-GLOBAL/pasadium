# Identity Boundary: auth.pasadium.tech

## Purpose
The sole source of truth for identity, authentication, and authorization across the PASADIUM ecosystem.

## Architecture
- **Base URL**: `https://auth.pasadium.tech`
- **Standard**: OpenID Connect (OIDC) / OAuth 2.1
- **Flow**: Authorization Code Flow with PKCE (Proof Key for Code Exchange)

## Authentication Flow (High Level)
1. **Request**: User clicks "Sign In" in an app (e.g., `trade.pasadium.tech`).
2. **Redirect**: App redirects user to `auth.pasadium.tech/authorize` with `client_id`, `redirect_uri`, `state`, and `code_challenge`.
3. **Auth**: User provides credentials + MFA.
4. **Code**: `auth.pasadium.tech` redirects back to App with an `authorization_code`.
5. **Exchange**: App sends `authorization_code` + `code_verifier` to `auth.pasadium.tech/token`.
6. **Tokens**: App receives:
   - `id_token` (Identity)
   - `access_token` (JWT for `api.pasadium.tech`)
   - `refresh_token` (For session persistence)

## Identity Contracts
- **User Profile**: Standard OIDC claims (`sub`, `email`, `name`).
- **Scopes**:
  - `openid`, `profile`, `email`
  - `pasadium:trade`
  - `pasadium:media`
  - `pasadium:market`
  - `pasadium:admin`

## Trust Boundary
The `auth` service is the only service that interacts with raw user credentials. All other services trust the JWT signed by `auth.pasadium.tech`.
