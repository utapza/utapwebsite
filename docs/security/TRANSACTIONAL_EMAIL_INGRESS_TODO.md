# Transactional email ingress — security follow-up (TODO)

**Why this doc exists:** We plan a Netlify function on the vendor dashboard that sends mail via **Resend** (email API). Callers may authenticate with a shared **`UTAP_EMAIL_INGRESS_SECRET`**. Anything compiled into **utap-vendors**, **utap-admin** (`VITE_*`), or **utap-apps** (`EXPO_PUBLIC_*`) can be extracted from the bundle, so that secret is **not** a substitute for real authorization.

**Related repos:** `utap-vendors` (Netlify functions), `utap-apps`, `utap-admin`.

---

## Risk (short)

- A leaked ingress secret + a naive function (arbitrary `to` / body) → **quota burn**, spam, or **phishing** using your domain.
- **TLS** (Transport Layer Security) encrypts the wire; it does **not** hide values inside client apps.

---

## TODO — harden before or soon after launch

- [ ] **Server-side rules:** Function accepts only an allowlisted set of **templates**; resolve `to` from your **database** (e.g. order owner) where possible, not unchecked client input.
- [ ] **Rate limiting:** Per **IP** (Internet Protocol), per key, or via an edge layer (e.g. **Cloudflare**) in front of `/.netlify/functions/...`.
- [ ] **Resend API key:** Stay **only** in Netlify (or other server) env — never `VITE_*` / `EXPO_PUBLIC_*`.
- [ ] **Stronger pattern (optional upgrade):** Move “send mail” behind **Supabase Edge Functions** with **JWT** (JSON Web Token) verification, or another backend that checks the user session; client never holds a long-lived mail ingress secret for sensitive flows.
- [ ] **Public forms** (e.g. contact): **CAPTCHA** (Completely Automated Public Turing test to tell Computers and Humans Apart) + strict validation; or no client-held secret for that path.
- [ ] **Monitoring:** Alerts on Resend volume / bounces; rotate **`UTAP_EMAIL_INGRESS_SECRET`** if abuse is suspected.
- [ ] **CORS** (Cross-Origin Resource Sharing): Tight **allowlist** of origins, not `*` for production.

---

## Done means

We are comfortable that a stolen client-visible secret cannot send arbitrary mail to arbitrary recipients, and that **`RESEND_API_KEY`** remains server-only with observable abuse signals.
