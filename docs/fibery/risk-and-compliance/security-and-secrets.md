# Security and secrets

**Purpose:** Practical rules for anyone touching keys, builds, or sensitive student/card data. This complements [`pitfalls-and-risks.md`](pitfalls-and-risks.md) with **day-to-day** guidance.

---

## Secret types

| Kind | Where it may appear | Safe in Git? |
|------|---------------------|--------------|
| Supabase **anon** key | Mobile / Vite env | Yes (public in bundles)—**RLS must protect data** |
| Supabase **service role** key | **Netlify Functions**, other trusted servers only | **Never** in client apps |
| **Yoco** **secret** key | **Netlify** env for **`utap-vendors`** functions | **Never** in repos or mobile |
| **Resend** API key | **Netlify** env (`send-transactional-email`, mail from webhooks) | **Never** in client bundles |
| Stripe **publishable** / **secret** keys (if Stripe revived) | Legacy only today—same rules as any PSP | Secrets **never** in clients |
| Apple / Google signing certs | Developer machines / CI secrets | Store in CI or OS keychain—not in repo |
| npm tokens | `~/.npmrc` or CI | **Never** commit |

---

## Client apps and trust boundaries

1. **Assume the anon key is public.** All student/card/order isolation must come from **correct RLS** and auth session scope.
2. **Never ship** a production build with placeholder Supabase URLs—users could hit wrong projects or fail open in unsafe ways depending on code paths.
3. **Rotate keys** if they leak; update EAS secrets / hosting env vars in the same change window.

---

## Card and NFC data

- Treat **raw NFC / MIFARE-related payloads** as **credential material**. Minimise logging in production (avoid `console.log` of full hex dumps).
- Prefer **least-privilege** DB policies: users read/write **only their rows**.

---

## Yoco and Netlify

- **Yoco** **secret** and **Supabase service role** live in **Netlify** environment config for **`utap-vendors`** (functions create checkouts and handle **`yoco-webhook`**).
- Do not rely on **client-only** “checkout opened” as paid—wait for **webhook**-written state in Postgres (see pitfalls doc).

## Stripe (legacy only)

If **Stripe** is reintroduced, use **signed webhooks** on a server you control before marking orders paid—same discipline as **Yoco** today.

---

## Repository hygiene

- Do not commit **`.env`**, **keystores**, or **large APK/IPA** artefacts unless your team explicitly wants them versioned (generally avoid).
- Use **`.env.example`** with empty values or placeholders for onboarding.

---

## Incidents (lightweight)

If credentials leak: revoke in dashboard (**Supabase**, **Yoco**, **Resend**, **Stripe** if used), rotate keys, audit Git history, notify stakeholders per your university agreements.

---

## Related

- [`environment-variables.md`](../operations/environment-variables.md)  
- [`pitfalls-and-risks.md`](pitfalls-and-risks.md)  
