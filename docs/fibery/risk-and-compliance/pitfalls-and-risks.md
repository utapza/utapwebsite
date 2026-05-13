# Pitfalls and Risks: uTap Technical and Architectural Concerns

**Audience:** Engineering leads, security-aware product owners, and delivery stakeholders.

**Intent:** Flag areas that can block reliability, security posture, scale, or organisational objectives if left unmanaged. This is not alarmist; most teams hit similar issues when shipping NFC + commerce + multi-app Supabase stacks.

**Basis:** Observations from the current workspace code and docs. Items marked **verify in Supabase** need confirmation in the live project, not only in Git.

---

## 1. Security and Privacy

### 1.1 Stored card material is highly sensitive

The architecture stores **logical card fields** and **raw NFC/MIFARE-oriented payloads** for emulation-related behaviour. That combination is attractive to misuse if accounts are compromised.

**Mitigations to keep on the roadmap:** strong RLS, encryption-at-rest expectations on Supabase, device-level protections, session hygiene, and clear **retention/deletion** policies aligned with university and POPIA-style obligations.

### 1.2 Supabase anon key and RLS are the real boundary

Mobile apps ship a **publishable** anon key by design. **All real protection** sits in **RLS policies**, server-side constraints, and avoiding accidental broad grants.

**Action:** Periodic **RLS audits** and tests that prove one user cannot read another’s `cards` or order rows.

### 1.3 Local storage fallback paths

`storageService` prefers **SecureStore** but falls back to **AsyncStorage** when SecureStore is unavailable (web builds). Card blobs on a weaker store increase exposure if the web target is ever exposed to real users with production data.

### 1.4 Secrets and configuration drift

Pattern seen elsewhere: placeholder Supabase clients when env vars are missing—useful for bootstrapping, risky if a misconfigured **production** build silently ships without a working backend or with unsafe defaults. Release pipelines should **fail closed** when credentials are absent.

---

## 2. NFC, Platforms, and Real-World Readers

### 2.1 Android vs iOS capability gap

**Host card emulation** and deep MIFARE workflows are **Android-weighted** in practice. iOS NFC stacks have different constraints (reading vs emulation patterns). Marketing or product copy should not promise identical behaviour on both platforms unless QA proves parity.

### 2.2 Reader and issuer dependency

Even perfect emulation does not guarantee campus gates accept phone-presented credentials. Many institutions use **issuer-specific keys**, rotating schemes, or anti-cloning checks. **Technical success inside the app ≠ institutional acceptance.**

### 2.3 Default-key assumptions in documentation

Internal NFC docs describe flows involving **default MIFARE keys** for reads. Production cards often use **non-default keys**; scanning may partially fail or yield incomplete dumps, affecting emulation quality.

---

## 3. Payments and Money Movement

### 3.1 Yoco + Netlify as the live path

**Student checkout** and **paid university change** use **Yoco** hosted checkout URLs returned by **`utap-vendors`** **Netlify Functions** (`create-yoco-checkout`, `create-university-change-checkout`). **`yoco-webhook`** must remain the **source of truth** for payment success: it updates Postgres with the **Supabase service role** so **RLS**-scoped clients cannot “fake” paid orders.

**Risk:** If webhook verification, idempotency, or env secrets are wrong, orders can show **pending** forever—or worse, diverge from **Yoco**’s ledger.

**Direction:** Treat **webhook-applied DB state** (plus guarded **RPC** where used) as financial truth before scaling **GMV (Gross Merchandise Value)**. Monitor **Yoco** dashboard vs Supabase order rows during pilots.

### 3.2 Legacy Stripe artifacts

**`stripePaymentService.js`** and **`@stripe/stripe-react-native`** may still exist in **`utap-apps`** for historical or native **iOS** pod reasons. **Do not** extend them for new commerce flows unless you intentionally revive **Stripe**.

**Risk:** Confusion during code review if someone assumes **Stripe** is still the primary processor.

### 3.3 Secrets and client trust

**Yoco** **secret** keys and **Supabase service role** keys belong only in **Netlify** (or another trusted server)—**never** in mobile or Vite bundles. **Supabase anon** keys are public by design; **RLS** must protect rows. Confirm no long-lived **Resend** ingress secrets ship in clients (see [`../../security/TRANSACTIONAL_EMAIL_INGRESS_TODO.md`](../../security/TRANSACTIONAL_EMAIL_INGRESS_TODO.md)).

---

## 4. Scalability and Maintainability

### 4.1 Monolithic mobile surface area

Cards, commerce, gigs, orders, and NFC native code share one binary. That speeds early delivery but increases **regression blast radius** and complicates **team parallelisation**.

### 4.2 Context-only global state

As features grow, **`AuthContext`**, **`FeaturePolicyProvider`**, and **`CardContext`** without a structured store can make cross-cutting concerns (retry queues, offline sync conflicts, observability) harder to reason about than a thin global store or domain modules.

### 4.3 Shared Supabase schema pressure

Admin, vendor, and mobile clients all lean on the **same database**. Schema migrations require coordinated releases across apps—or backwards-compatible SQL changes—to avoid outages.

---

## 5. Operational and Delivery Risks

### 5.1 Native module coupling

The app depends on **`@utapza/expo-mifare-scanner`**. Version skew between Expo SDK, React Native, and the module can break builds; the repo already carries **verification scripts** and extensive NFC troubleshooting docs—signalling real past friction.

### 5.2 Build artefacts and repo hygiene

Large binary artefacts (e.g. archived APKs) in repositories hurt clone times and sometimes leak signing assumptions. Prefer **CI artefacts** or object storage.

### 5.3 Telemetry gaps

Sentry helps with crashes; **business metrics** (failed NFC reads, sync failures, checkout drop-offs) may still need **structured logging or analytics** beyond exceptions.

---

## 6. Compliance and Trust (Non-Technical but Binding)

University partnerships often require **formal agreements** on:

- What card data is collected.
- Whether emulation is permitted.
- Incident response when credentials leak.

Engineering choices must align with those agreements; otherwise deployment can stall regardless of code quality.

---

## 7. Summary Table

| Area | Risk | Typical mitigation |
|------|------|-------------------|
| Card data | Account takeover → credential cloning concerns | RLS, MFA considerations, monitoring, education |
| NFC | Platform mismatch vs expectations | Clear UX per OS; QA on real hardware |
| Payments | Client-trusted payment state | **Yoco** webhooks + idempotent order updates; no client-only “paid” |
| Supabase | Misconfigured RLS | Automated policy tests, least privilege |
| Delivery | Native build fragility | Pin versions; CI checks; module smoke tests |

---

## 8. How to Use This Document

Use it in **planning and risk reviews**, not as a substitute for threat modelling. Pair items here with **Supabase dashboard verification**, **Yoco** / payout reconciliation, and **campus pilot findings**.

When mitigations land, **trim or update** corresponding sections so this file stays a living picture—not a permanent worry list.
