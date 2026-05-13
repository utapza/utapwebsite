# Netlify deploy via GitHub Actions (utap-vendors)

**Repository:** [`utap-vendors`](https://github.com/) (Vite vendor dashboard).  
**Workflow:** `utap-vendors/.github/workflows/deploy-netlify.yml`  
**Netlify config:** `utap-vendors/netlify.toml`

The workflow deploys **production** to Netlify on every **push to `main`**, and can be run manually (**Actions** → **Deploy to Netlify** → **Run workflow**).

## Required GitHub secrets

| Secret | Purpose |
|--------|---------|
| `NETLIFY_AUTH_TOKEN` | Netlify CLI auth in CI |
| `NETLIFY_SITE_ID` | Which site to deploy |

### Where to get values

- **Token:** [Netlify → User settings → Applications → Personal access tokens](https://app.netlify.com/user/applications#personal-access-tokens) → create a token with deploy scope as needed.
- **Site ID:** Netlify → your site → **Site configuration** → **General** → **Site details** → **Site ID**.

### How to set them

**GitHub (web):** Repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**. For org-owned private repos, org admins can use **organization secrets** and grant this repo access instead.

**GitHub CLI** (from your machine, clone `utap-vendors` first):

```bash
gh auth login   # once, if needed
cd /path/to/utap-vendors
gh secret set NETLIFY_AUTH_TOKEN
gh secret set NETLIFY_SITE_ID
```

Each command prompts for the value (nothing is echoed). Do not paste tokens into committed files or chat logs.

## Build-time environment (Vite)

`npm run build` runs on GitHub’s runners; it does **not** read your local `.env.local`. If the build needs `VITE_*` (or other) variables, add them as **Actions** secrets or **Variables**, then extend the workflow’s **Build site** step with an `env:` block mapping them to the names Vite expects.

## Quick checks

- After pushing to `main`, open **Actions** and confirm the workflow is green.
- Netlify dashboard should show a new production deploy for the commit.

## Expo push (Phase 2)

Apply the Supabase migration `20260520130000_push_tokens.sql` (table + RLS) to your project.

**Netlify (server):**

- `EXPO_ACCESS_TOKEN` (optional) — from [Expo](https://expo.dev/accounts/) for Expo Push API rate limits.
- `UTAP_PUSH_INGRESS_SECRET` (optional) — Bearer secret for `/.netlify/functions/send-push-notification` (server-to-server only).
- `notify-order-ready` uses the vendor Supabase access token; keep `SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY` configured.

**Vendor SPA (Vite):**

- `VITE_UTAP_EMAIL_API_BASE` — used as the default functions base for `notify-order-ready`.
- Optional `VITE_UTAP_VENDOR_FUNCTIONS_BASE` — overrides that base if needed.
