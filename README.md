# MicroSaaS

A focused startup idea workspace built with Next.js, TypeScript, Clerk, and local open-source Qwen models.

## Run locally

1. Use Node.js 20 or newer and run `npm install`.
2. Copy `.env.example` to `.env.local` and configure only the services you need.
3. Install [Ollama](https://ollama.com), then run `ollama pull qwen3.5:9b`.
4. Start Ollama and run `npm run dev`. Open http://localhost:3000.

No paid model API key is needed. Model inference still uses your hardware and electricity. Ollama must be reachable **from the Next.js server**, not only from the visitor's computer. For WSL or a remote deployment, set OLLAMA_BASE_URL to an accessible private endpoint. Do not expose an unprotected Ollama service to the internet.

## Models

The default is [Qwen 3.5 9B](https://huggingface.co/Qwen/Qwen3.5-9B), an Apache-2.0 model with a practical size/capability balance. Choose 4B for lower memory or 27B for more capacity. These are deployment options, not a claim of a universal best model. The [Ollama library](https://ollama.com/library/qwen3.5) lists approximate downloads of 3.4 GB, 6.6 GB, and 17 GB respectively; runtime memory exceeds weight size and depends on context and hardware. Pull each model before selecting it. Generation has a 180-second server timeout; slower hardware can time out.

The app sends one bounded structured prompt per plan, limits output tokens, disables thinking for these models, and validates the JSON before showing or storing it. Errors never silently become sample plans.

## Features

- Niche, categories, audience, budget, timeline, experience, market, and model preferences.
- Complete opportunity, business model, MVP, validation, SEO suggestions, architecture, acceptance criteria, and launch roadmap.
- Automatic saving after generation, retryable saves, searchable saved plans, and deletion.
- Markdown and JSON downloads; browser print supports saving every plan section to PDF.
- An explicitly labeled example, available without running a model.
- Responsive UI, keyboard controls, visible focus states, reduced-motion support, and print styles.

SEO content is an **unverified strategy**, not live search results. Volume, difficulty, rankings, and demand are not invented. The legacy optional RapidAPI endpoint is not called by the new workspace.

## Accounts and storage

Without Clerk configuration, the app works in guest mode. Guest plans are browser-local and are not account backups. Signing in opens the account workspace; it does not silently upload guest plans.

With both Clerk keys configured, sign-in enables private account plans. API routes derive the owner from the verified session; clients cannot submit another user's ID.

Local development saves account plans in ignored `.data/plans` files. This store uses atomic replacement and in-process serialized writes; use it only in a single server process. It is not a distributed database.

For production, create a Supabase project, run `supabase/schema.sql`, then set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY on the server. RLS denies browser access. The server scopes every request by the authenticated account. Never prefix the service-role key with NEXT_PUBLIC. Missing production storage returns a visible error, while the generated plan stays available for export. A persistent, single-process server may explicitly opt into file storage with ALLOW_LOCAL_PLAN_STORAGE=true and PLAN_STORAGE_DIR.

## Deployment

Use a long-running Node server with network access to Ollama, or a host supporting the generation timeout. Serverless hosts require durable Supabase storage and a private remote model endpoint. Configure authentication, provider quotas, and infrastructure request limits for public traffic. Do not deploy a public endpoint that allows unlimited inference on shared hardware.

## Verification

```sh
npm run lint
npx tsc --noEmit
npm test -- --runInBand
npm run build
```

Tests cover brief validation, malformed model output, plan exports, account isolation, and route authorization. No model or account credentials are required for unit tests.
