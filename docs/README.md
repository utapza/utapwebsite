# uTap — Documentation index (`utap-docs`)

This repository holds the **canonical** product and engineering handbook under **`docs/`**: **Fibery** (platform, onboarding, operations, architecture), **System** (voice, marketing, UX writing, and UI engineering rules — see below), and **topic folders** (NFC, build, debugging, deployment, security).

Application code lives in sibling repos (**`utap-apps`**, **`utap-admin`**, **`utap-vendors`**, etc.); keep architecture truth aligned with [`fibery/architecture/domain-level-knowledge.md`](fibery/architecture/domain-level-knowledge.md).

## System — voice, marketing & UX writing

Single source of truth for **everything users read**: in-app copy, push notifications, emails, marketing site, app store listings, and campaigns.

| Location | Contents |
|----------|----------|
| [`system/market/README.md`](system/market/README.md) | Index for all market and copy docs |
| [`system/market/voice-guidelines.md`](system/market/voice-guidelines.md) | How uTap sounds |
| [`system/market/positioning.md`](system/market/positioning.md) | Who uTap is for and what we replace |
| [`system/market/messaging-architecture.md`](system/market/messaging-architecture.md) | Pillars, taglines, headline framework |
| [`system/market/utap-mobile-copy.md`](system/market/utap-mobile-copy.md) | Mobile app strings |
| [`system/market/utap-vendors-copy.md`](system/market/utap-vendors-copy.md) | Vendor portal strings |
| [`system/market/utap-admin-copy.md`](system/market/utap-admin-copy.md) | Internal admin strings |
| [`system/market/utap-website-copy.md`](system/market/utap-website-copy.md) | Marketing site strings |
| [`system/market/notifications-and-emails.md`](system/market/notifications-and-emails.md) | Push, email, SMS, in-app inbox |
| [`system/market/go-to-market-plan.md`](system/market/go-to-market-plan.md) | Channel and campaign plan |

### System — design and UI engineering

| Location | Contents |
|----------|----------|
| [`system/design/README.md`](system/design/README.md) | Index for UI/UX engineering rules |
| [`system/design/unified-ui-ux-engineering-rules.md`](system/design/unified-ui-ux-engineering-rules.md) | Cross-app UI quality bar, components, landings, a11y, stack reality vs target |

---

## Fibery — product & engineering handbook

Strategic docs, onboarding, and runbooks live under **`fibery/`**. Start here:

| Location | Contents |
|----------|----------|
| [`fibery/README.md`](fibery/README.md) | Full Fibery index |
| [`fibery/architecture/`](fibery/architecture/) | Domain architecture |
| [`fibery/risk-and-compliance/`](fibery/risk-and-compliance/) | Risks, security |
| [`fibery/platform/`](fibery/platform/) | Repo map |
| [`fibery/operations/`](fibery/operations/) | Env vars, releases |
| [`fibery/backend/`](fibery/backend/) | Supabase overview |
| [`fibery/nfc/`](fibery/nfc/) | NFC playbook + links |
| [`fibery/reference/`](fibery/reference/) | Glossary |
| [`fibery/design/`](fibery/design/) | Design & UI/UX handbook |
| [`fibery/onboarding/`](fibery/onboarding/) | Per-app contributor guides |

---

## Topic folders — technical deep dives

### Build & release

| Doc | Notes |
|-----|--------|
| [`build-and-release/ANDROID_APK_BUILD.md`](build-and-release/ANDROID_APK_BUILD.md) | Local APK builds |
| [`build-and-release/RELEASE_APK_DEBUGGING.md`](build-and-release/RELEASE_APK_DEBUGGING.md) | Release troubleshooting |
| [`build-and-release/DEVELOPMENT_BUILD_GUIDE.md`](build-and-release/DEVELOPMENT_BUILD_GUIDE.md) | Dev builds |
| [`build-and-release/DEBUG_APK_FIX.md`](build-and-release/DEBUG_APK_FIX.md) | Debug APK fixes |

### NFC & native module

| Doc | Notes |
|-----|--------|
| [`nfc-and-module/CARD_SCANNING_AND_EMULATION.md`](nfc-and-module/CARD_SCANNING_AND_EMULATION.md) | Scan vs emulation data flow |
| [`nfc-and-module/MIFARE_MODULE_SETUP.md`](nfc-and-module/MIFARE_MODULE_SETUP.md) | Module setup |
| [`nfc-and-module/MIFARE_SCANNER_SETUP.md`](nfc-and-module/MIFARE_SCANNER_SETUP.md) | Scanner setup |
| [`nfc-and-module/MODULE_ARCHITECTURE.md`](nfc-and-module/MODULE_ARCHITECTURE.md) | How the Expo module compiles in |
| [`nfc-and-module/MODULE_DEVELOPMENT.md`](nfc-and-module/MODULE_DEVELOPMENT.md) | Developing the module |
| [`nfc-and-module/MODULE_PUBLISHING.md`](nfc-and-module/MODULE_PUBLISHING.md) | Publishing `@utapza/expo-mifare-scanner` |
| [`nfc-and-module/IOS_NFC_MODULE_NULL.md`](nfc-and-module/IOS_NFC_MODULE_NULL.md) | iOS null module issues |
| [`nfc-and-module/DEVTO_POST_EXPO_MODULE_IOS_NULL.md`](nfc-and-module/DEVTO_POST_EXPO_MODULE_IOS_NULL.md) | Related write-up |

### iOS

| Doc | Notes |
|-----|--------|
| [`ios/IOS_PODS_AND_AUTOLINKING.md`](ios/IOS_PODS_AND_AUTOLINKING.md) | Pods & autolinking |

### Debugging & logs

| Doc | Notes |
|-----|--------|
| [`debugging-and-logs/CRASH_INVESTIGATION.md`](debugging-and-logs/CRASH_INVESTIGATION.md) | Crash investigation |
| [`debugging-and-logs/DEBUG_CRASH.md`](debugging-and-logs/DEBUG_CRASH.md) | Debug crashes |
| [`debugging-and-logs/QUICK_CRASH_DEBUG.md`](debugging-and-logs/QUICK_CRASH_DEBUG.md) | Quick crash debug |
| [`debugging-and-logs/VIEWING_NATIVE_LOGS.md`](debugging-and-logs/VIEWING_NATIVE_LOGS.md) | Native logs |
| [`debugging-and-logs/ANDROID_LOGGING_GUIDE.md`](debugging-and-logs/ANDROID_LOGGING_GUIDE.md) | Android logging |

### Development tooling

| Doc | Notes |
|-----|--------|
| [`development/QUICK_START.md`](development/QUICK_START.md) | Quick start |
| [`development/REMOTE_DEV_CLIENT.md`](development/REMOTE_DEV_CLIENT.md) | Remote dev client |
| [`development/SENTRY_SETUP.md`](development/SENTRY_SETUP.md) | Sentry |
| [`development/feature-policy.md`](development/feature-policy.md) | Mobile feature flags (build env + Supabase); canonical copy (**`utap-apps`** has a pointer file at the same path) |

### Architecture decision records (ADR)

| Doc | Notes |
|-----|--------|
| [`adr/README.md`](adr/README.md) | Index: platform + **`utap-vendors`** ADRs |

### Strategy & business

| Doc | Notes |
|-----|--------|
| [`strategy/monetization-and-marketplace-scope.md`](strategy/monetization-and-marketplace-scope.md) | Monetisation narrative and marketplace scope |

### AI prompts & agent rules

| Doc | Notes |
|-----|--------|
| [`prompts/README.md`](prompts/README.md) | Index of prompts, rules, and session logs |

### Security backlog

| Doc | Notes |
|-----|--------|
| [`security/TRANSACTIONAL_EMAIL_INGRESS_TODO.md`](security/TRANSACTIONAL_EMAIL_INGRESS_TODO.md) | Harden Netlify → Resend ingress (secrets, rate limits, JWT path) |

### Deployment (email & auth)

| Doc | Notes |
|-----|--------|
| [`deployment/SUPABASE_SMTP_AND_AUTH_REDIRECTS.md`](deployment/SUPABASE_SMTP_AND_AUTH_REDIRECTS.md) | Resend + Supabase SMTP, redirect URLs, CLI vs Dashboard |
| [`deployment/netlify-github-actions-utap-vendors.md`](deployment/netlify-github-actions-utap-vendors.md) | CI deploy to Netlify (**utap-vendors**) |
| [`deployment/netlify-github-actions-utap-admin.md`](deployment/netlify-github-actions-utap-admin.md) | CI deploy to Netlify (**utap-admin**) |

---

## Sibling application repos

Each app repo has its own **`README.md`** / **`CLAUDE.md`** at **that** repository root (for example **`utap-apps`**). This **`utap-docs`** tree is the shared handbook only.
