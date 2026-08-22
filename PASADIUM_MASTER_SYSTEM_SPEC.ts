/**
 * PASADIUM GLOBAL — MASTER SYSTEM SPECIFICATION
 * ============================================================
 *
 * Purpose:
 *   Single source-of-truth for the PASADIUM Global product surface,
 *   frontend topology, backend contracts, identity, branding, runtime
 *   conventions, validation gates, and deployment expectations.
 *
 * Design intent:
 *   - PASADIUM is the public product/system identity.
 *   - Internal engine names remain implementation details.
 *   - All frontends consume stable BrandOS/API contracts rather than
 *     coupling directly to internal engines.
 *   - Trade and Media are first-class operational surfaces.
 *   - The system should be deployable after GitHub push + database
 *     connection, subject to the validation gates below.
 *
 * IMPORTANT:
 *   This file is a specification/contract, not a claim that every
 *   implementation described here already exists.
 *   `implementationStatus` distinguishes current architectural intent
 *   from integration work that still needs to be completed.
 */

export const PASADIUM = {
  identity: {
    legalBrand: "PASADIUM GLOBAL",
    productName: "PASADIUM",
    publicDomain: "pasadium.tech",
    organization: "PASADIUM-GLOBAL",

    positioning:
      "A sovereign digital platform that unifies creation, markets, " +
      "commerce, intelligence, security, identity, and operational tooling " +
      "behind one coherent public product experience.",

    frontendRule:
      "Users interact with PASADIUM product surfaces, not internal engine names.",

    internalNamingRule: {
      public: [
        "Platform",
        "Security",
        "Media",
        "Trade",
        "Market",
        "Administration",
        "Identity",
        "Documentation",
      ],
      internalOnly: [
        "BrandOS",
        "MemoryOS",
        "SECVERSE",
        "FREEVERSE",
        "BRIDGE.OS",
        "VCAAS",
        "AURORA",
        "OBSERVATORY.OS",
        "EVENT.OS",
        "KNOWLEDGE.OS",
        "TOOLVERSE.OS",
        "RUNTIME.OS",
      ],
    },
  },

  logo: {
    sourceConcept:
      "The supplied PASADIUM Global abstract-flow mark: smooth flowing " +
      "ribbons forming a compact dynamic loop/crest.",

    canonicalUse: {
      preserveGeometry: true,
      preserveFlow: true,
      preserveSmoothness: true,
      preserveNegativeSpace: true,
      noOrganicOriginConcept: true,
      noEdgyPrismGeometry: true,
      noUnnecessaryTextInsideMark: true,
    },

    palette: {
      primaryBackground: "#000000",
      cyan: "#00D9FF",
      electricBlue: "#1677FF",
      violet: "#6B35FF",
      magenta: "#C52CFF",
    },

    rendering:
      "Use the supplied abstract-flow logo as the canonical PASADIUM Global mark. " +
      "The mark may be rendered monochrome black/white for documents and neutral " +
      "surfaces, or in the approved cyan→blue→violet gradient for the primary brand.",

    frontendRule:
      "The logo is a brand asset, not a decorative component. Do not distort, " +
      "rotate, sharpen into polygons, or replace it with unrelated symbols.",
  },

  productSurfaces: {
    web: {
      name: "PASADIUM",
      role: "Public gateway and unified product entry point",
      host: "pasadium.tech",
      port: 3000,
      routes: [
        "/",
        "/about",
        "/platform",
        "/documentation",
        "/security",
        "/login",
        "/login/callback",
        "/contact",
      ],
      visualLanguage:
        "Premium technical, minimal, dark-first, high-trust, fluid motion, " +
        "strong typography, restrained gradients, precise spacing.",
    },

    auth: {
      name: "Identity",
      role: "Authentication, authorization, sessions, account lifecycle",
      host: "auth.pasadium.tech",
      localPort: 3001,
      publicConcept:
        "Identity is presented as PASADIUM Identity rather than exposing internal " +
        "authentication service implementation names.",
      requiredRoutes: [
        "/authorize",
        "/login",
        "/callback",
        "/logout",
        "/session",
        "/consent",
      ],
    },

    api: {
      name: "PASADIUM API",
      role: "Stable application contract between product surfaces and backend",
      host: "api.pasadium.tech",
      localPort: 4000,
      rule:
        "Frontends must call stable public API contracts. Internal engines are " +
        "behind the API boundary.",
      requiredCapabilities: [
        "health",
        "readiness",
        "authentication",
        "authorization",
        "user/session",
        "audit",
        "security",
        "media",
        "trade",
        "market",
        "admin",
      ],
    },

    admin: {
      name: "Administration",
      role:
        "Security administration, access control, monitoring, operational controls",
      host: "admin.pasadium.tech",
      routes: [
        "/",
        "/access",
        "/monitoring",
        "/security",
      ],
      localPort: 3002,
      rule:
        "Administrative functions must be authenticated and explicitly authorized.",
    },

    trade: {
      name: "Trade",
      role:
        "Trading/productivity surface for portfolio, assets, execution, and financial workflows",
      host: "trade.pasadium.tech",
      localPort: 3003,
      currentPriority: "HIGH",
      publicFeatures: [
        "portfolio",
        "assets",
        "positions",
        "orders",
        "execution status",
        "transaction history",
        "risk visibility",
        "account state",
      ],
      safety:
        "Never imply a transaction is live unless the backend confirms live execution.",
    },

    media: {
      name: "Media",
      role:
        "Content creation, production, publishing, analytics, and media workflows",
      host: "media.pasadium.tech",
      localPort: 3004,
      currentPriority: "HIGH",
      publicFeatures: [
        "content workspace",
        "content generation",
        "media assets",
        "production pipeline",
        "publishing",
        "campaigns",
        "analytics",
        "content history",
      ],
      safety:
        "Generated content must carry explicit lifecycle state: draft, review, approved, scheduled, published, failed.",
    },

    market: {
      name: "Market",
      role:
        "Marketplace/discovery surface for products, services, offers, and economic activity",
      host: "market.pasadium.tech",
      localPort: 3005,
      publicFeatures: [
        "discovery",
        "listings",
        "offers",
        "seller/buyer workflows",
        "search",
        "categories",
      ],
    },

    security: {
      name: "Security",
      role:
        "Public security posture, trust information, status, and security-facing controls",
      publicFeatures: [
        "security posture",
        "service status",
        "trust information",
        "incident/status communication",
        "documentation",
      ],
    },

    documentation: {
      name: "Documentation",
      role: "Public technical/product documentation",
      routes: [
        "/documentation",
      ],
    },
  },

  architecture: {
    principle:
      "One product identity, multiple bounded product surfaces, one stable API boundary, " +
      "shared platform contracts, and isolated internal implementation engines.",

    layers: [
      {
        name: "Experience",
        responsibility:
          "Next.js frontends, navigation, interaction, presentation, client state.",
      },
      {
        name: "Brand/API Boundary",
        responsibility:
          "Public API contracts, authentication, authorization, DTOs, validation, rate limits.",
      },
      {
        name: "Application Services",
        responsibility:
          "Business workflows for media, trade, market, identity, administration, security.",
      },
      {
        name: "Domain",
        responsibility:
          "Entities, invariants, value objects, domain rules, lifecycle states.",
      },
      {
        name: "Infrastructure",
        responsibility:
          "PostgreSQL/Prisma, Redis, object storage, event infrastructure, external integrations.",
      },
      {
        name: "Internal Intelligence/Engines",
        responsibility:
          "Internal orchestration, memory, intelligence, security, automation, and specialized engines.",
        exposure: "internal",
      },
    ],

    dependencyRule:
      "UI -> public API -> application service -> domain/infrastructure. " +
      "UI must not import internal engine implementation directly.",

    monorepo: {
      packageManager: "npm",
      orchestrator: "Turborepo",
      turboVersion: "2.10.10",
      typescript:
        "TypeScript is strict. Avoid suppressing errors with `any` when a real type can be expressed.",
      packageScopes: "@pasadium/*",
    },
  },

  sharedContracts: {
    authentication: {
      mechanism:
        "Centralized identity/session contract. Frontends consume session information through the API boundary.",
      requiredClaims: [
        "subject",
        "sessionId",
        "roles",
        "permissions",
        "issuedAt",
        "expiresAt",
      ],
    },

    authorization: {
      model:
        "Role/permission based authorization with server-side enforcement.",
      rule:
        "Frontend visibility is not authorization. Every protected operation must be checked server-side.",
    },

    request: {
      requiredHeaders: [
        "Content-Type",
        "X-Request-ID",
      ],
      optionalHeaders: [
        "Authorization",
        "Idempotency-Key",
      ],
    },

    response: {
      successShape: {
        data: "T",
        requestId: "string",
      },
      errorShape: {
        error: {
          code: "string",
          message: "string",
          details: "unknown | undefined",
        },
        requestId: "string",
      },
      rule:
        "Do not leak stack traces, database errors, secrets, tokens, or internal engine names.",
    },

    lifecycle: {
      standardStates: [
        "created",
        "pending",
        "processing",
        "completed",
        "failed",
        "cancelled",
      ],
      rule:
        "Long-running operations must expose state rather than pretending they are synchronous.",
    },

    audit: {
      requiredFor: [
        "authentication",
        "authorization failures",
        "admin actions",
        "trade execution",
        "financial state changes",
        "security events",
        "configuration changes",
      ],
      minimumFields: [
        "eventId",
        "timestamp",
        "requestId",
        "actor",
        "action",
        "resource",
        "outcome",
        "metadata",
      ],
    },
  },

  frontendDesignSystem: {
    theme: {
      defaultMode: "dark",
      optionalMode: "light",
      background: "#000000",
      surface:
        "near-black layered surfaces with subtle borders and elevation",
      accent:
        "cyan → electric blue → violet → magenta brand gradient",
    },

    principles: [
      "Do not overload the interface with cyberpunk decoration.",
      "Use the logo and gradient as identity anchors, not constant visual noise.",
      "Prioritize hierarchy, whitespace, typography, and state clarity.",
      "Every async operation has visible loading, success, and failure states.",
      "Every destructive operation requires explicit confirmation.",
      "Do not expose internal service/engine names to normal users.",
      "Do not create fake metrics or fake live state.",
      "Do not display a success state until the backend confirms success.",
      "Responsive behavior is required from mobile through desktop.",
      "Accessibility is part of correctness.",
    ],

    navigation: {
      global:
        "PASADIUM logo → Platform → Trade → Media → Market → Security → Documentation → Account",
      authenticated:
        "Dashboard → relevant product workspace → activity/history → account",
      admin:
        "Overview → Access → Monitoring → Security → Audit",
    },

    sharedComponents: [
      "BrandMark",
      "GlobalHeader",
      "GlobalNavigation",
      "CommandPalette",
      "PageShell",
      "SectionHeader",
      "StatusBadge",
      "MetricCard",
      "DataTable",
      "EmptyState",
      "LoadingState",
      "ErrorState",
      "ConfirmDialog",
      "Toast",
      "Modal",
      "FormField",
      "DateRange",
      "Search",
      "Pagination",
      "ActivityFeed",
      "AuditTimeline",
    ],
  },

  mediaProduct: {
    mission:
      "Turn PASADIUM into a reliable content operating surface from idea to publication.",

    pipeline: [
      "idea",
      "brief",
      "draft",
      "generation",
      "review",
      "approval",
      "schedule",
      "publish",
      "analytics",
      "archive",
    ],

    entities: [
      "Project",
      "Campaign",
      "ContentItem",
      "Asset",
      "Channel",
      "Publication",
      "Metric",
      "WorkflowRun",
    ],

    reliabilityRules: [
      "Every generated item has an owner.",
      "Every published item has an auditable publication record.",
      "Failed jobs are retryable and observable.",
      "Publishing is idempotent.",
      "External provider failure cannot corrupt local state.",
      "Analytics ingestion is separated from publication state.",
    ],
  },

  tradeProduct: {
    mission:
      "Provide a controlled financial/trading workspace with explicit distinction between simulation and live execution.",

    executionModes: [
      "SIMULATED",
      "PAPER",
      "LIVE",
    ],

    hardSafetyBoundary:
      "LIVE execution must never be enabled merely because a UI toggle says LIVE. " +
      "The backend must independently enforce credentials, permissions, environment, " +
      "risk controls, circuit breakers, and execution mode.",

    entities: [
      "Account",
      "Asset",
      "Portfolio",
      "Position",
      "Order",
      "Transaction",
      "Execution",
      "RiskCheck",
      "LedgerEntry",
    ],

    requiredStates: [
      "draft",
      "validated",
      "submitted",
      "accepted",
      "partially_filled",
      "filled",
      "rejected",
      "cancelled",
      "failed",
    ],

    invariants: [
      "No order bypasses authorization.",
      "No transaction bypasses validation.",
      "Financial amounts use decimal-safe representations.",
      "Every state transition is auditable.",
      "Retries use idempotency keys.",
      "External execution is reconciled against internal records.",
      "A failed external request must not be treated as a successful trade.",
    ],
  },

  backend: {
    apiService: {
      currentLocalPort: 4000,
      health: [
        "GET /health",
        "GET /ready",
      ],
      coreAreas: [
        "/api/auth",
        "/api/admin",
        "/api/security",
        "/api/media",
        "/api/trade",
        "/api/market",
      ],
    },

    database: {
      technology:
        "PostgreSQL through Prisma, according to the current repository architecture.",
      schemaLocation:
        "packages/db/prisma/schema.prisma",
      validationCommand:
        "npx prisma validate --schema packages/db/prisma/schema.prisma",
      migrationRule:
        "Schema changes are versioned and reviewed. Never manually edit production data to make tests pass.",
    },

    cache: {
      technology: "Redis",
      useCases: [
        "short-lived cache",
        "rate limiting",
        "distributed coordination",
        "ephemeral session support where appropriate",
      ],
    },

    objectStorage: {
      useCases: [
        "media assets",
        "exports",
        "documents",
        "large artifacts",
      ],
    },

    events: {
      principle:
        "Use asynchronous events for cross-domain workflows where synchronous coupling would reduce reliability.",
      requirements: [
        "event identity",
        "timestamp",
        "source",
        "type",
        "version",
        "correlation/request ID",
        "payload",
      ],
    },
  },

  runtime: {
    local: {
      web: "http://pasadium.tech",
      auth: "http://auth.pasadium.tech",
      api: "http://api.pasadium.tech",
      admin: "http://admin.pasadium.tech",
      trade: "http://trade.pasadium.tech",
      media: "http://media.pasadium.tech",
      market: "http://market.pasadium.tech",
    },

    recommendedStartup:
      "Use `npx turbo dev` from the monorepo root when the dev scripts are correctly defined. " +
      "Otherwise start the required workspaces independently.",

    debugging: [
      "Check port ownership with `ss -ltnp` or `lsof -i :PORT`.",
      "Check the terminal running the affected service before changing code.",
      "Confirm environment variables exist without printing secret values.",
      "Confirm database connectivity before diagnosing application logic.",
      "Check API health/readiness before debugging frontend data loading.",
      "Never assume localhost:3000 represents the entire monorepo.",
    ],
  },

  configuration: {
    environment: {
      rule:
        "Secrets belong in environment configuration, never source control.",
      requiredCategories: [
        "DATABASE_URL",
        "AUTH configuration",
        "API configuration",
        "external provider credentials",
        "storage configuration",
        "event/cache configuration",
      ],
      safety:
        "Commit `.env.example`, never `.env` or real credentials.",
    },

    nextjs: {
      turbopackRootRule:
        "When a Next.js workspace is executed inside a nested Git repository or unusual filesystem boundary, " +
        "set the correct Turbopack root rather than relying on accidental repository discovery.",
    },

    typescript: {
      strict: true,
      baseUrlRule:
        "Avoid deprecated `baseUrl` configuration under TypeScript 6/7 migration. Prefer modern package/workspace " +
        "imports or explicit path configuration that is compatible with the target TypeScript version.",
      antiPattern:
        "Do not use `(x: any)` simply to silence an inference error. Define the actual database/domain type.",
    },
  },

  gitAndRelease: {
    repository:
      "https://github.com/PASADIUM-GLOBAL/pasadium.git",

    branch: "main",

    currentConsolidationObjective:
      "The intended canonical repository is the nested `pasadium/` repository. " +
      "Do not accidentally commit the outer workspace as if it were the canonical repository.",

    beforePush: [
      "git status --short",
      "git diff --check",
      "npm install",
      "npx prisma validate --schema packages/db/prisma/schema.prisma",
      "npx tsc --noEmit -p services/api/tsconfig.json",
      "npx turbo build",
      "git diff --stat",
      "git diff",
    ],

    pushPrerequisites: [
      "Resolve GitHub authentication.",
      "Use SSH or a GitHub-supported token/credential mechanism.",
      "If GitHub email privacy rejects the push, use the GitHub noreply commit email or adjust the account email privacy setting.",
      "Never put a GitHub token into repository files.",
    ],

    releaseGate:
      "A release is ready only when validation passes and the working tree contains only intentional changes.",
  },

  observability: {
    principle:
      "A production system is not complete if it can execute but cannot explain what happened.",

    requiredSignals: [
      "request ID",
      "structured logs",
      "audit events",
      "service health",
      "readiness",
      "latency",
      "error rate",
      "dependency failures",
      "workflow status",
    ],

    adminViews: [
      "system health",
      "service health",
      "authentication events",
      "security events",
      "trade workflow state",
      "media workflow state",
      "audit trail",
    ],
  },

  resilience: {
    rules: [
      "Timeout external requests.",
      "Retry only safe/idempotent operations automatically.",
      "Use exponential backoff where appropriate.",
      "Use circuit breakers for unstable external dependencies.",
      "Persist workflow state before irreversible external operations.",
      "Make recovery explicit and observable.",
      "Do not hide failures behind generic successful UI states.",
    ],
  },

  security: {
    baseline: [
      "Server-side authorization",
      "Input validation",
      "Output sanitization where required",
      "Secure cookies/tokens",
      "CSRF protection where applicable",
      "Rate limiting",
      "Audit logging",
      "Secret isolation",
      "Dependency auditing",
      "Least privilege",
      "Security headers",
      "Request correlation",
    ],

    prohibited: [
      "Secrets in Git",
      "Tokens in browser localStorage when a safer mechanism is available",
      "Trusting client-supplied roles",
      "Exposing stack traces in production",
      "Treating frontend route guards as authorization",
      "Calling internal engines directly from public frontend code",
    ],
  },

  qualityGates: {
    level1: {
      name: "Static correctness",
      commands: [
        "git diff --check",
        "npx tsc --noEmit -p services/api/tsconfig.json",
      ],
    },

    level2: {
      name: "Database correctness",
      commands: [
        "npx prisma validate --schema packages/db/prisma/schema.prisma",
      ],
    },

    level3: {
      name: "Workspace correctness",
      commands: [
        "npx turbo build",
      ],
    },

    level4: {
      name: "Runtime correctness",
      checks: [
        "API health",
        "API readiness",
        "auth login",
        "web login redirect",
        "media workflow smoke test",
        "trade workflow smoke test in SIMULATED mode",
        "database read/write",
      ],
    },

    level5: {
      name: "Release correctness",
      checks: [
        "No secrets tracked",
        "No accidental generated artifacts tracked",
        "No unintended deletions",
        "No duplicate canonical application",
        "No stale local repository nested inside another repository",
        "GitHub push succeeds",
      ],
    },
  },

  implementationStatus: {
    verifiedFromCurrentWork: [
      "Canonical nested repository `pasadium/` exists and points to PASADIUM-GLOBAL/pasadium.",
      "The repository has a main branch tracking origin/main.",
      "Prisma schema validation passed.",
      "Turborepo 2.10.10 is installed in the canonical repository.",
      "The monorepo build completed successfully in the latest run.",
      "Web, Admin, Trade, Market, Media, API Server, API Service, and Auth Service build targets were observed successfully.",
      "The repository contains both API Server and API Service packages.",
      "The current API TypeScript configuration still needs cleanup around deprecated baseUrl usage.",
    ],

    knownIssuesToResolveBeforeCallingItProductionReady: [
      "TypeScript 6 reports baseUrl as deprecated in services/api/tsconfig.json.",
      "The API file contains explicit `any` annotations introduced to silence inference errors; replace them with real types.",
      "The transaction callback typing `tx: typeof db` should be verified against the generated Prisma transaction client rather than using the root client type.",
      "The canonical repository currently needs a clean distinction between the outer workspace and nested `pasadium/` Git repository.",
      "The local dev topology must be standardized so frontend/API/auth ports cannot collide.",
      "Database connection and migration readiness must be tested against the actual runtime environment.",
      "GitHub push authentication/email privacy must be resolved.",
      "Do not treat a successful build as proof that authentication, database access, media publishing, or trade execution works end-to-end.",
    ],
  },

  currentPriority: {
    today:
      "Make PASADIUM operationally reliable for immediate Media and Trade use without destabilizing the monorepo.",

    order: [
      "1. Keep `pasadium/` as the canonical Git repository.",
      "2. Clean TypeScript configuration and remove unnecessary `any`.",
      "3. Confirm database connection and migrations.",
      "4. Standardize API/Auth/Web local development ports.",
      "5. Verify auth end-to-end.",
      "6. Verify Media end-to-end.",
      "7. Verify Trade end-to-end in SIMULATED/PAPER mode before any LIVE integration.",
      "8. Verify audit and observability.",
      "9. Commit only intentional changes.",
      "10. Push to GitHub.",
    ],
  },

  definitionOfDone: {
    platform:
      "All public product surfaces resolve through the PASADIUM identity and stable API boundary.",

    frontend:
      "Web, Admin, Trade, Media, and Market have consistent navigation, branding, loading/error states, authentication, and responsive behavior.",

    backend:
      "API services expose versioned, validated, authenticated contracts with structured errors and auditability.",

    database:
      "Prisma schema validates, migrations are known, the runtime database is reachable, and required reads/writes succeed.",

    media:
      "A real content item can move through the intended workflow with observable state and failure handling.",

    trade:
      "A real simulated/paper workflow can move from validation through execution state and ledger/history without corrupting state.",

    security:
      "Protected operations enforce authorization server-side and security-sensitive actions are auditable.",

    operations:
      "Health, readiness, logs, audit records, and failure states are visible to administrators.",

    release:
      "Git working tree is intentional, validation passes, and GitHub push succeeds.",
  },

  nonNegotiables: [
    "PASADIUM Global owns the public identity.",
    "The supplied abstract-flow logo is the canonical logo.",
    "Internal engine names remain behind the product/API boundary.",
    "Trade and Media are first-class products, not demos.",
    "No fake live state.",
    "No fake transaction success.",
    "No secrets in Git.",
    "No frontend-only authorization.",
    "No silent failure.",
    "No destructive migration without a verified backup/recovery path.",
    "No LIVE trading without an explicit backend-enforced safety boundary.",
    "No architectural consolidation that destroys working product capabilities.",
  ],
} as const;

export type PasadiumProduct =
  keyof typeof PASADIUM.productSurfaces;

export type ExecutionMode =
  (typeof PASADIUM.tradeProduct.executionModes)[number];

export type LifecycleState =
  (typeof PASADIUM.sharedContracts.lifecycle.standardStates)[number];

/**
 * Runtime-facing constants.
 *
 * These should be imported by tooling/configuration where appropriate.
 * Do not use this object to leak secrets or environment-specific
 * credentials.
 */
export const PASADIUM_RUNTIME = {
  ports: PASADIUM.runtime.local,

  api: {
    health: `${PASADIUM.runtime.local.api}/health`,
    readiness: `${PASADIUM.runtime.local.api}/ready`,
  },

  buildChecks: [
    "git diff --check",
    "npm install",
    "npx prisma validate --schema packages/db/prisma/schema.prisma",
    "npx tsc --noEmit -p services/api/tsconfig.json",
    "npx turbo build",
  ],
} as const;

/**
 * Architectural assertion helper.
 *
 * Intended for tests/tooling, not for production request handling.
 */
export function assertPublicSurface(
  product: string,
): asserts product is PasadiumProduct {
  if (!(product in PASADIUM.productSurfaces)) {
    throw new Error(`Unknown PASADIUM public product surface: ${product}`);
  }
}

/**
 * Production-readiness checklist.
 *
 * Keep this intentionally explicit so future work does not confuse
 * "build succeeds" with "system is operational".
 */
export const PRODUCTION_READINESS_CHECKLIST = {
  sourceControl: false,
  githubPush: false,
  databaseReachable: false,
  databaseMigrated: false,
  authEndToEnd: false,
  webEndToEnd: false,
  mediaEndToEnd: false,
  tradeSimulatedEndToEnd: false,
  auditVerified: false,
  observabilityVerified: false,
  secretsExcluded: false,
  securityReviewPassed: false,
} as const;

/**
 * Final architectural statement:
 *
 * PASADIUM should feel like ONE system to a user even though it is
 * implemented as multiple bounded applications and services.
 *
 * The complexity belongs behind the boundary.
 * The public experience should be coherent.
 */
export const PASADIUM_PRINCIPLE =
  "One identity. One platform. Multiple capabilities. One trusted boundary.";
