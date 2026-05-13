# Netlify deploy via GitHub Actions (utap-admin)

**Repository:** [`utap-admin`](https://github.com/) (Vite + React admin console).  
**Workflow:** `utap-admin/.github/workflows/deploy-netlify.yml`  
**Netlify config:** `utap-admin/netlify.toml`

The workflow deploys **production** to Netlify on every **push to `main`**, and can be run manually (**Actions** → **Deploy to Netlify** → **Run workflow**).

This app is **Vite + React**; the published folder is **`dist`**.

## Required GitHub secrets

| Secret | Purpose |
|--------|---------|
| `NETLIFY_AUTH_TOKEN` | Netlify CLI auth in CI |
| `NETLIFY_SITE_ID` | Which Netlify site is **utap-admin** (not the vendors site) |
| `VITE_SUPABASE_URL` | Supabase project URL (same as local `.env`) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key (same as local `.env`) |

Create a **separate Netlify site** for the admin UI if you have not already, then copy its **Site ID**. The PAT can be the same user token you use for other repos.

### How to set them

**GitHub (web):** Repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.

**GitHub CLI:**

```bash
gh auth login   # once, if needed
cd /path/to/utap-admin
gh secret set NETLIFY_AUTH_TOKEN
gh secret set NETLIFY_SITE_ID
gh secret set VITE_SUPABASE_URL
gh secret set VITE_SUPABASE_ANON_KEY
```

The workflow **Build site** step passes `VITE_SUPABASE_*` from Actions secrets into Vite (see `utap-admin/src/lib/supabase.ts`). If those secrets are missing, the bundle may get empty strings and the deployed app will not talk to Supabase until you add them.

The anon key is often treated as a public client key; you can use a **Variable** for the URL and a **Secret** for the key instead—then adjust the workflow to use `vars.*` / `secrets.*` accordingly.

## Transactional email from admin (payout completed)

Admin calls **`utap-vendors`** `/.netlify/functions/send-transactional-email` using `VITE_UTAP_EMAIL_API_BASE` and `VITE_UTAP_EMAIL_INGRESS_SECRET` (see `utap-admin/src/lib/emailApi.ts`). The function checks **CORS (Cross-Origin Resource Sharing)** against an allowlist in **`utap-vendors`** `netlify/functions/lib/emailCors.ts`. If production admin runs on a host not in the default list, set **`UTAP_EMAIL_CORS_ORIGINS`** on the **vendors** Netlify site to a comma-separated list of admin origins (for example `https://your-admin.netlify.app`).

## Quick checks

- After pushing to `main`, open **Actions** and confirm the workflow is green.
- Netlify should show a new production deploy for the commit.
