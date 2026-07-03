<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Deployment

**Platform:** Cloudflare Workers (NOT Cloudflare Pages — two different products)
**Project name in Cloudflare dashboard:** `blocksmiths-booking` (exists as a Worker)
**Custom domain:** `blocksmiths.mytrenches.com` (wired in wrangler.toml as a custom domain route)
**Build + deploy:** `npm run deploy` — Claude Code can run this directly
**Cloudflare API token:** stored in `.claude/settings.local.json` (gitignored — never commit this file)

**wrangler.toml** uses the `[assets]` block format — correct for Workers with static assets. Do NOT change it to `pages_build_output_dir` (Cloudflare Pages format) or add wildcards to the custom domain route — both will fail.

# Site Pages

| Page | URL | Purpose |
|------|-----|---------|
| Homepage | `/` | Booking landing page |
| Thank You | `/thank-you` | Post-purchase/booking confirmation page |
| Waiver | `/waiver` | Liability waiver, media release, refund policy |
| Privacy Policy | `/privacy` | Data collection, SMS consent, third parties |
| Terms & Conditions | `/terms` | Services, payment, cancellation, SMS consent |

Footer links to /privacy, /terms, /waiver on every page. SMS opt-in disclosure in footer.

# Security Headers

Configured in `public/_headers` — applies to all routes on deploy. Do not remove this file.

**CRITICAL — script-src must keep `'unsafe-inline'`:**
Next.js App Router injects inline `<script>` tags for React hydration. If `'unsafe-inline'` is removed from `script-src`, React never hydrates on production, `useEffect` never fires, and all client-side functionality breaks silently — including the Calendly embed. This is not visible in local dev (the dev server does not apply `_headers`).

Current CSP allows: Calendly scripts/iframes, Cloudflare Insights beacon, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy.

**Deployment verification:** After `npm run deploy`, confirm the correct code is live by curling a JS chunk:
`curl -s https://blocksmiths.mytrenches.com/_next/static/chunks/<chunk>.js | grep <keyword>`
Check `CF-Cache-Status` in response headers — a `HIT` means Cloudflare is serving a cached `index.html`. The chunk files use content hashes, so new code is always fetched even on a cache HIT for the HTML.

# Calendly Embed Component

**Component:** `components/CalendlyEmbed.tsx`
**Method:** Uses `Calendly.initInlineWidget({ url, parentElement })` — do NOT revert to the old `calendly-inline-widget` CSS class + `data-url` attribute approach. That method relies on Calendly auto-scanning the DOM on script load, which fails with React's client-side rendering.

**Height:** The container div must have explicit `height: 700px` (not `minHeight`). Calendly injects an iframe with `height="100%"` — CSS percentage heights inherit from the parent's explicit `height` property, NOT `minHeight`. Using only `minHeight` causes the iframe to render at ~150px.

# Calendly Event Types

| Type | URL | Notes |
|------|-----|-------|
| Group Session | `blocksmiths-weekday-training` | Public |
| Sunday Session | `blocksmiths-strength-skill` | Public |
| 1:1 Training | `1-1-training` | Public |
| Semi-Private | `small-group-training` | Public |
| Team Training | `team-training` | Public |
| 1:1 Package Session | `1-1-package-session` | Secret — package holders only |
| Team Training Package | `team-training-package-session` | Secret — package holders only |

All event types are under `calendly.com/coachcooper-mytrenches/`. Package event types share the same calendar as regular events — bookings automatically block conflicting availability.

# Stripe

**Payment links:** Live links are hardcoded in `app/page.tsx` in the `trainingPackages` array. Amounts in cents map to packages in the n8n workflow — do not change prices without updating the `packageMap` in the workflow code node.

**Webhooks:** `checkout.session.completed` fires to the n8n production webhook URL. Test mode and live mode require separate webhook registrations in Stripe — both point to the same n8n URL. Test mode webhooks are under Stripe Workbench (Stripe moved Developers → Webhooks into Workbench).

**Terms of Service URL** set in Stripe checkout settings: `https://blocksmiths.mytrenches.com/terms`

**Success redirects:** All 4 payment links redirect to `/thank-you` with a `?type=` param after purchase:
- 1:1 packages → `/thank-you?type=package-1on1`
- Team packages → `/thank-you?type=package-team`

The thank-you page (`components/ThankYouContent.tsx`) reads the `type` param and shows session-specific content. `GROUP_LOCATION` constant on line 6 is a placeholder — update with the specific Tue/Fri field address when confirmed.

# n8n Automation Workflow

**Instance:** `mytrenches.app.n8n.cloud`
**Workflow:** `Blocksmiths — Package Purchase Welcome`
**Source file:** `workflows/package-purchase-welcome.json`

Triggered by Stripe `checkout.session.completed`. Flow:
1. Stripe Webhook → receives payload at `$input.first().json.body` (n8n wraps Stripe body under `.body`)
2. Parse & Prepare → maps `amount_total` (cents) to package type + Calendly URL, builds Claude prompt
3. Claude (Haiku) → generates personalized welcome email in Coach Cooper voice
4. Gmail → sends from coachcooper@mytrenches.com to customer
5. Twilio SMS → **disabled** pending Twilio campaign approval

**Credentials needed in n8n:** Anthropic API key (HTTP header auth, header name `x-api-key`), Google account for Gmail node.

**Stripe → n8n payload note:** Stripe payload arrives under `$input.first().json.body` — not `$input.first().json` directly. Any future code nodes reading Stripe data must account for this.

# Twilio / SMS

**Status:** Campaign submitted, pending approval (as of 2026-04-25). Twilio support ticket open re: JSON error on campaign registration form.
**Registration:** Use Sole Proprietor track (75 SMS/day limit — sufficient for Blocksmiths). Campaign use case: Notifications (NOT Marketing).
**Brand:** Register under Blocksmiths separately from Trench Tough. Trench Tough campaign was rejected — do not resubmit until Trench Tough has a live website with opt-in form.
**When approved:** Add Twilio credentials to n8n, replace `REPLACE_WITH_TWILIO_PHONE_NUMBER` in the Twilio node with the actual number (format: `+1XXXXXXXXXX`), enable the disabled node.
