# Contributor onboarding

Welcome. uTap spans **several repositories**; pick the guide for the codebase you are changing.

These onboarding files live in **`utap-docs`** (`docs/fibery/onboarding/`) so the handbook stays in one place even though each app ships from its own Git repo.

## Guides by repository

| Repo | Guide |
|------|--------|
| **utap-apps** (sibling — mobile) | [`utap-mobile.md`](utap-mobile.md) |
| **utap-admin** | [`utap-admin.md`](utap-admin.md) |
| **utap-vendors** | [`utap-vendors.md`](utap-vendors.md) |
| **utapwebsiite** | [`marketing-site-onboarding.md`](marketing-site-onboarding.md) |
| **expo-mifare-scanner** | [`expo-mifare-scanner.md`](expo-mifare-scanner.md) |

## Shared reading

1. [`../architecture/domain-level-knowledge.md`](../architecture/domain-level-knowledge.md) — how everything fits together  
2. [`../platform/platform-map.md`](../platform/platform-map.md) — repo roles  
3. [`../operations/environment-variables.md`](../operations/environment-variables.md) — env var names  
4. [`../design/design-and-ui-ux.md`](../design/design-and-ui-ux.md) — UI stack, colours, and UX patterns (mobile + web overview)

## Conventions (team norms — adjust to match your Git hosting)

1. **Branch from** `main` (or your default branch) using a short prefix: `feat/`, `fix/`, `chore/`.
2. **Pull requests:** describe intent, link issue/ticket if you use one, note Supabase migrations or native rebuild requirements.
3. **Secrets:** never commit `.env` files with real keys—see [`../risk-and-compliance/security-and-secrets.md`](../risk-and-compliance/security-and-secrets.md).
4. **Supabase changes:** coordinate schema/RLS updates with anyone shipping mobile or web that week.

## Questions?

NFC problems → [`../nfc/nfc-module-playbook.md`](../nfc/nfc-module-playbook.md) and `docs/nfc-and-module/`.  
Build problems → `docs/build-and-release/` and [`../operations/release-and-versioning.md`](../operations/release-and-versioning.md).
