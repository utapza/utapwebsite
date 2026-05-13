# Copy drift report (market)

Append-only log of **implemented UI** changes made to align with `voice-guidelines.md`, `positioning.md`, and `brand-glossary.md`.

---

## 2026-05-11 — Systemwide framework pass (utap-vendors, utap-admin, utap-apps)

| App | Area | Before → After (summary) | Rule |
|-----|------|---------------------------|------|
| utap-vendors | Brand casing | `UTAP` in chrome, marketing, HTML title | `brand-glossary.md` — correct **uTap** |
| utap-vendors | Vendor dashboard | Generic "Submit payout request" / "Loading earnings..." | CTAs + specific loading (`voice-guidelines.md` §5, §11) |
| utap-vendors | Fees copy | "UTAP fees" | Product name **uTap**; student module named **uShop** where relevant |
| utap-vendors | Marketing / landing | NFC-led feature titles, "platform" tone | Positioning: outcomes over mechanism (`positioning.md` §6, §10) |
| utap-vendors | Empty states | Bare "No X found" | Empty-state pattern: headline + next step (`voice-guidelines.md` §10) |
| utap-vendors | Payment result | Technical "secure payment confirmation" | Plain confirmation copy |
| utap-admin | Brand + HTML title | `UTAP` | **uTap**; admin product name per glossary |
| utap-admin | Promotions | "UTAP-funded", "New UTAP promotion" | uTap + **uTap deals** language where appropriate |
| utap-admin | Loading | "Loading..." | Specific "Loading your workspace…" |
| utap-admin | Marketing landing | Long "comprehensive platform" copy | Outcome-led campus commerce copy |
| utap-apps | Student scan flow | "MIFARE card", "NFC Scanner", generic Errors | No hardware jargon in student UI; calm errors (`voice-guidelines.md` §6, §9) |
| utap-apps | NFC modal / card details | "Continue", "NFC tag" leads | Specific CTAs (`Done`, `Start`); "tag" not "NFC tag" in headlines |

**Canonical tables:** continue to maintain `utap-vendors-copy.md`, `utap-admin-copy.md`, `utap-mobile-copy.md` when adding new surfaces; this pass updated **code** as source of truth for the touched strings.
