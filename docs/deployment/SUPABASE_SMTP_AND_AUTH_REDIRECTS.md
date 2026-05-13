# Supabase auth email (SMTP) and redirect URLs

This doc supports the **Resend** (email API) + **Supabase Auth** (authentication) setup across uTap apps.

## What Supabase sends vs what Netlify sends

- **Supabase Auth** sends its own messages for **password reset**, **email confirmation**, and **email change**, when SMTP is enabled on the project.
- The **Netlify** `send-transactional-email` function in **utap-vendors** sends **app-owned** mail (contact form, payment receipt from the Yoco webhook, scheduled payout notices). It uses the **Resend** API key only on the server.

## Dashboard steps (production)

1. **Resend**: Verify your sending domain; create an **API key** and (for auth) note **SMTP** host, port, user, and password from Resend’s SMTP docs.
2. **Supabase Dashboard** → **Authentication** → **SMTP**: Enter Resend SMTP settings so auth emails use your domain and deliverability.
3. **Supabase Dashboard** → **Authentication** → **URL configuration**: Add every redirect you use:
   - Vendor web: `https://vendors.utaptech.co.za/reset-password` (and local dev URLs if needed).
   - Admin web: your admin origin + `/reset-password` (optional `VITE_PUBLIC_ADMIN_URL` for forgot-password redirects).
   - Mobile: URLs produced by **Expo** `Linking.createURL('reset-password')` (e.g. `utap://reset-password`, `exp://…`), plus any **universal link** HTTPS URLs you configure later.
4. **Netlify** (vendor site): Set `RESEND_API_KEY`, `RESEND_FROM`, `UTAP_EMAIL_INGRESS_SECRET`, optional `CONTACT_FORM_TO_EMAIL`, optional `UTAP_EMAIL_CORS_ORIGINS` (comma-separated).

## Supabase CLI limits

- The **Supabase CLI** is great for **local** `config.toml`, **migrations**, and **typegen**.
- **Production SMTP** and **Auth redirect allowlists** are normally edited in the **Supabase Dashboard** (or **Management API** if you automate infra). The CLI does not replace those dashboard steps by itself.

## Client env (reference)

| App | Purpose | Variables |
|-----|---------|-----------|
| **utap-vendors** | Contact form → Netlify function | `VITE_UTAP_EMAIL_API_BASE`, `VITE_UTAP_EMAIL_INGRESS_SECRET`, `VITE_PUBLIC_SITE_URL` (password reset origin) |
| **utap-admin** | Optional future mail from browser | Same `VITE_*` pattern |
| **utap-apps** | Optional future mail | Set `EXPO_PUBLIC_UTAP_EMAIL_API_BASE` and `EXPO_PUBLIC_UTAP_EMAIL_INGRESS_SECRET` via **`eas secret:create`** (or EAS Dashboard) for each build profile — **do not** commit secrets in `eas.json`. Optional `EXPO_PUBLIC_SUPABASE_RESET_REDIRECT_URL` overrides the default `Linking.createURL('reset-password')` for password reset emails. |

Keep **`RESEND_API_KEY`** off client bundles; use ingress secret + strict server templates (see `utap-docs/docs/security/TRANSACTIONAL_EMAIL_INGRESS_TODO.md`).
