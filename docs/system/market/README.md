# uTap Market — System Voice, UX Writing & Marketing Plan

This folder is the **single source of truth** for everything the user reads inside or about uTap — onboarding, dashboards, buttons, errors, push notifications, transactional emails, landing pages, app store copy, and campaigns.

It is governed by the **APD-Market** skill at `/Users/nonwork/.cursor/skills/apd-market/SKILL.md`. The rule is simple:

> The system communicates **outcomes**, not systems.

Engineers, designers, and marketers all pull their words from these files. If a string lives in product, it should also live here.

---

## What lives in this folder

### Global (read these first)

| Doc | What it answers |
|-----|------------------|
| [`voice-guidelines.md`](voice-guidelines.md) | How uTap sounds. Tone by context, sentence patterns, banned words, do/don't tables. |
| [`positioning.md`](positioning.md) | Who uTap is for, what it replaces, why students and vendors choose it. |
| [`messaging-architecture.md`](messaging-architecture.md) | Pillars, taglines, headline framework, value props per audience. |
| [`brand-glossary.md`](brand-glossary.md) | How we capitalise, hyphenate, and refer to the products and parts. |
| [`../design/unified-ui-ux-engineering-rules.md`](../design/unified-ui-ux-engineering-rules.md) | **UI engineering** — interaction states, skeletons, tables, landings, a11y, dark mode; use with voice + glossary for every interface change. |

### Per surface (audience + copy)

| Surface | Audience | Copy spec |
|---------|----------|-----------|
| Student mobile app | [`utap-mobile-audience.md`](utap-mobile-audience.md) | [`utap-mobile-copy.md`](utap-mobile-copy.md) |
| uShop module (inside mobile) | — see mobile | [`ushop-copy.md`](ushop-copy.md) |
| uGig module (inside mobile) | — see mobile | [`ugig-copy.md`](ugig-copy.md) |
| Vendor portal | [`utap-vendors-audience.md`](utap-vendors-audience.md) | [`utap-vendors-copy.md`](utap-vendors-copy.md) |
| Admin console | [`utap-admin-audience.md`](utap-admin-audience.md) | [`utap-admin-copy.md`](utap-admin-copy.md) |
| Marketing website | [`utap-website-audience.md`](utap-website-audience.md) | [`utap-website-copy.md`](utap-website-copy.md) |

### Cross-cutting

| Doc | Use |
|-----|-----|
| [`notifications-and-emails.md`](notifications-and-emails.md) | Push, SMS, and email copy — what we send, when, in whose voice. |
| [`go-to-market-plan.md`](go-to-market-plan.md) | Launch and growth campaigns for students and vendors across channels. |

---

## How to use these docs

**Building a feature?**

1. Read the relevant **audience** doc to understand the user moment.
2. Pull strings from the matching **copy** doc. Do not invent new wording — if you need a new pattern, add it here in the same PR.
3. Run any new string past the **voice-guidelines** checklist before shipping.

**Writing a campaign?**

1. Start with **positioning** and **messaging-architecture**.
2. Pull your hooks from the audience-specific pillars.
3. Use the **go-to-market plan** for channel and sequencing.

**Editing existing copy?**

1. Update the copy doc first.
2. Update the implementation second.
3. The doc is the source of truth — code follows it, not the other way around.

---

## Region and currency

uTap is built for the **South African campus market**. All money strings are **ZAR** with the prefix `R` and no decimals on whole rand (e.g. `R 45`, `R 1 250`). Tax is included unless stated.

Times are local to the campus (SAST). Days of the week are spelled in full (Monday, not Mon) in body copy, abbreviated only in dense UI like calendars.

Language is **South African English**: *colour*, *organise*, *centre*, *cheque*, *uni*. We don't use US spellings.

---

## Owners

| Area | Owner |
|------|-------|
| Voice and positioning | Marketing lead |
| Per-app copy specs | Product owner for that surface + Marketing |
| Notifications and emails | Lifecycle / CRM lead |
| Campaigns | Marketing lead |

When in doubt, **default to the student's experience** — uTap exists because campus life should be easier, not because the platform is clever.
