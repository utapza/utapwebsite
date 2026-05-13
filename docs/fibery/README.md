# Fibery — uTap handbook

This directory collects **architecture**, **onboarding**, **operations**, and **reference** documents so product and engineering can share one structured index. Technical NFC/build guides remain in sibling folders under `docs/` (see [`../README.md`](../README.md)).

## How to read this folder

1. New contributors: start with **[`onboarding/README.md`](onboarding/README.md)** and your app’s guide.
2. Big-picture system shape: **[`architecture/domain-level-knowledge.md`](architecture/domain-level-knowledge.md)**.
3. Risks and guardrails: **[`risk-and-compliance/pitfalls-and-risks.md`](risk-and-compliance/pitfalls-and-risks.md)** and **[`risk-and-compliance/security-and-secrets.md`](risk-and-compliance/security-and-secrets.md)**.

## Contents

### Architecture

| Document | Purpose |
|----------|---------|
| [`architecture/domain-level-knowledge.md`](architecture/domain-level-knowledge.md) | End-to-end architecture: apps, Supabase, **Yoco** + **Netlify Functions**, NFC, Ushop/uGig, feature policy, cross-repo initiatives |

### Risk & compliance

| Document | Purpose |
|----------|---------|
| [`risk-and-compliance/pitfalls-and-risks.md`](risk-and-compliance/pitfalls-and-risks.md) | Technical vulnerabilities, scale risks, NFC/payment caveats |
| [`risk-and-compliance/security-and-secrets.md`](risk-and-compliance/security-and-secrets.md) | Secrets handling, RLS expectations, safe defaults |

### Platform

| Document | Purpose |
|----------|---------|
| [`platform/platform-map.md`](platform/platform-map.md) | Repositories, roles, and how they connect |

### Operations

| Document | Purpose |
|----------|---------|
| [`operations/environment-variables.md`](operations/environment-variables.md) | Env vars across apps (names only—no secret values) |
| [`operations/release-and-versioning.md`](operations/release-and-versioning.md) | EAS, mobile vs web release expectations |

### Backend

| Document | Purpose |
|----------|---------|
| [`backend/supabase-and-data-overview.md`](backend/supabase-and-data-overview.md) | Tables, clients, RLS mindset |

### NFC

| Document | Purpose |
|----------|---------|
| [`nfc/nfc-module-playbook.md`](nfc/nfc-module-playbook.md) | Entry point + links to deep docs in `docs/nfc-and-module/` |

### Reference

| Document | Purpose |
|----------|---------|
| [`reference/glossary.md`](reference/glossary.md) | Terms used across business and engineering |

### Design & UX

| Document | Purpose |
|----------|---------|
| [`../system/design/unified-ui-ux-engineering-rules.md`](../system/design/unified-ui-ux-engineering-rules.md) | **Canonical** cross-app UI quality bar, tables/forms/modals, landings, a11y, performance, target vs installed stacks |
| [`design/design-and-ui-ux.md`](design/design-and-ui-ux.md) | Mobile/web UI stack, colours, typography, patterns, accessibility baseline |
| [`design/design-and-ui-ux-fibery.md`](design/design-and-ui-ux-fibery.md) | Same content **without markdown links** — for paste into Fibery |

### Onboarding

| Document | Purpose |
|----------|---------|
| [`onboarding/README.md`](onboarding/README.md) | Contributor conventions |
| [`onboarding/utap-mobile.md`](onboarding/utap-mobile.md) | `utap-apps` (sibling mobile repo) |
| [`onboarding/utap-admin.md`](onboarding/utap-admin.md) | Admin SPA (sibling repo) |
| [`onboarding/utap-vendors.md`](onboarding/utap-vendors.md) | Vendor portal (sibling repo) |
| [`onboarding/marketing-site-onboarding.md`](onboarding/marketing-site-onboarding.md) | Marketing site (sibling repo `utapwebsiite`) |
| [`onboarding/expo-mifare-scanner.md`](onboarding/expo-mifare-scanner.md) | NFC native module package (sibling repo) |
