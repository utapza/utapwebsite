# Environment Variables Documentation

This document centralizes all environment variables required or optional for the uTap system applications.

## Global / Shared Variables

These variables are used across multiple applications to integrate with shared services.

### Supabase
Used for authentication and database interactions.

| Variable | Description | Apps Using |
| :--- | :--- | :--- |
| `SUPABASE_URL` | The URL of your Supabase project (e.g., `https://xyz.supabase.co`) | All |
| `SUPABASE_ANON_KEY` | The public anonymous key for Supabase. | All |
| `SUPABASE_SERVICE_ROLE_KEY` | **SECRET:** High-privilege key for server-side operations. | `utap-vendors` (Functions) |

### Yoco
Used for processing payments in South Africa.

| Variable | Description | Apps Using |
| :--- | :--- | :--- |
| `YOCO_PUBLIC_KEY` | Public key for Yoco SDK/Checkout. | `utap-apps`, `utap-vendors` |
| `YOCO_SECRET_KEY` | **SECRET:** Secret key for server-side payment verification. | `utap-apps`, `utap-vendors` |
| `YOCO_WEBHOOK_SECRET` | **SECRET:** Secret for verifying Yoco webhook signatures. | `utap-vendors` |

### Resend / Email
Used for sending transactional and notification emails.

| Variable | Description | Apps Using |
| :--- | :--- | :--- |
| `RESEND_API_KEY` | **SECRET:** API key for Resend service. | `utap-notifications`, `utap-vendors` |
| `UTAP_EMAIL_INGRESS_SECRET`| **SECRET:** Shared secret to authorize internal email requests. | `utap-admin`, `utap-apps`, `utap-vendors` |
| `UTAP_EMAIL_API_BASE` | Base URL for the uTap email service. | `utap-admin`, `utap-apps`, `utap-vendors` |

---

## App-Specific Variables

### 1. utap-admin (Vite)
Admin dashboard for managing the platform.

| Variable | Required | Description |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Yes | Supabase URL. |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase Anon Key. |
| `VITE_UTAP_EMAIL_API_BASE` | Yes | Email API Base URL. |
| `VITE_UTAP_EMAIL_INGRESS_SECRET`| Yes | Email Ingress Secret. |
| `NETLIFY_SITE_ID` | Yes | Site ID for Netlify deployments. |
| `NETLIFY_AUTH_TOKEN` | Yes | Auth token for Netlify CLI. |

### 2. utap-apps (Expo / React Native)
Mobile application for students and users.

| Variable | Required | Description |
| :--- | :--- | :--- |
| `SUPABASE_URL` | Yes | Supabase URL. |
| `SUPABASE_ANON_KEY` | Yes | Supabase Anon Key. |
| `SENTRY_AUTH_TOKEN` | No | Auth token for Sentry error tracking. |
| `NGROK_AUTH_TOKEN` | No | For local development tunneling. |
| `YOCO_PUBLIC_KEY` | Yes | Yoco Public Key. |
| `YOCO_SECRET_KEY` | Yes | Yoco Secret Key. |
| `EXPO_PUBLIC_UTAP_EMAIL_API_BASE`| Yes | Email API Base (Public). |
| `EXPO_PUBLIC_UTAP_EMAIL_INGRESS_SECRET`| Yes | Email Ingress Secret (Public). |
| `EXPO_PUBLIC_UTAP_FEATURE_BUILD_OVERRIDES`| No | Set to `1` to enable build-time feature overrides. |
| `EXPO_PUBLIC_UTAP_FEATURE_DISABLED`| No | Comma-separated list of disabled feature keys (e.g., `nfcScan,nfcWrite`). |

### 3. utap-notifications (Node.js / Cron)
Background services for alerts and automation.

| Variable | Required | Description |
| :--- | :--- | :--- |
| `FIBERY_WORKSPACE_URL` | Yes | URL for Fibery workspace integration. |
| `FIBERY_API_TOKEN` | Yes | API token for Fibery. |
| `RESEND_API_KEY` | Yes | Resend API key. |
| `FROM_EMAIL` | Yes | Default sender email address. |
| `FROM_NAME` | Yes | Default sender name. |
| `IDLE_THRESHOLD_DAYS` | No | Days before an idle alert fires (Default: 2). |

### 4. utap-vendors (Vite + Netlify Functions)
Platform for vendors to manage orders and payouts.

| Variable | Required | Description |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Yes | Supabase URL (Frontend). |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase Anon Key (Frontend). |
| `SUPABASE_URL` | Yes | Supabase URL (Functions). |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Service Role Key (Functions). |
| `YOCO_SECRET_KEY` | Yes | Yoco Secret Key. |
| `YOCO_PUBLIC_KEY` | Yes | Yoco Public Key. |
| `YOCO_WEBHOOK_SECRET` | Yes | Yoco Webhook Secret. |
| `PUBLIC_SITE_URL` | Yes | The public URL of the vendor dashboard. |
| `RESEND_API_KEY` | Yes | Resend API key. |
| `RESEND_FROM` | Yes | Sender email for Resend notifications. |
| `UTAP_EMAIL_INGRESS_SECRET`| Yes | Ingress secret for internal email API. |
| `UTAP_TRANSACTIONAL_EMAIL_API_BASE`| Yes | Base URL for transactional emails. |
| `NETLIFY_AUTH_TOKEN` | Yes | Netlify CLI auth token. |

### 5. utapwebsiite (Vite)
Marketing website.

| Variable | Required | Description |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | No | Reserved for future integration. |
| `VITE_SUPABASE_ANON_KEY` | No | Reserved for future integration. |

---

## Security Best Practices

1. **Never commit `.env` files**: Ensure `.env`, `.env.local`, and `.env.production` are in your `.gitignore`.
2. **Use `.env.example`**: Always maintain a `.env.example` file in each repo with dummy values to help new developers set up the environment.
3. **CI/CD Secrets**: Store production secrets in your CI/CD provider (e.g., Netlify Environment Variables, GitHub Secrets, Expo Secrets).
4. **Least Privilege**: Use the `SUPABASE_ANON_KEY` for client-side code and `SUPABASE_SERVICE_ROLE_KEY` only in secure server-side environments (like Netlify Functions).
