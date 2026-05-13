# Release and versioning

**Purpose:** Align expectations for shipping **mobile** (EAS / stores) vs **web** (SPAs) vs the **NFC npm package**.

---

## Mobile — utap-apps

### Version sources

- **`app.json`**: `expo.version`, iOS `buildNumber`, Android versioning via Expo/EAS.
- **`package.json`**: Node package version (may differ from store marketing version—treat `app.json` as user-facing for stores).

### Build tooling

- **EAS Build** — profiles in `eas.json` (e.g. development, preview, production, preview-testflight).
- **Dev client** — `expo start --dev-client` for native modules; Expo Go is not enough for `@utapza/expo-mifare-scanner`.
- **Local APK** — scripts such as `npm run android:apk:debug` / `android:apk:release`; see [`../../build-and-release/ANDROID_APK_BUILD.md`](../../build-and-release/ANDROID_APK_BUILD.md).

### Conventions

1. Bump **build number** for each store submission that requires a new binary (especially iOS).
2. Tag releases in Git when you cut a store build (optional but helps support).
3. **Sentry release** strings should stay traceable to a Git tag or build number (`src/config/sentry.js`).

### iOS TestFlight

Repo scripts include patterns like `build:ios:testflight` / `submit:ios:testflight` — verify Apple IDs and certificates in EAS before handoff.

---

## Web — utap-admin, utap-vendors, utapwebsiite

Standard **Vite** flows: `npm run build` → static **`dist`** output. **`utap-admin`** and **`utap-vendors`** use **Netlify** in production (GitHub Actions deploy workflows in each repo); other static hosts are possible but not the team default today.

1. **Environment:** Set `VITE_*` vars in the host’s dashboard per environment (staging/prod); set **Netlify** function secrets separately for **`utap-vendors`**.
2. **Schema coupling:** A web deploy that expects new columns must ship **after** or **with** a compatible Supabase migration.
3. **Cache:** Invalidate CDN cache after deploy if users see stale bundles.

---

## NPM — @utapza/expo-mifare-scanner

1. **Semantic versioning** — bump `package.json` version when native behaviour or JS API changes.
2. **Breaking changes** — major bump; coordinate **utap-apps** dependency upgrade and a full native rebuild (not just JS OTA if native code changed).
3. **Publishing** — see [`../../nfc-and-module/MODULE_PUBLISHING.md`](../../nfc-and-module/MODULE_PUBLISHING.md).

---

## Database migrations (Supabase)

There is no separate release doc in-app; **practice**:

1. Apply migrations to **staging** Supabase first when possible.
2. Ship **backwards-compatible** API (new nullable columns) before clients rely on them.
3. Coordinate **utap-apps** + **utap-admin** + **utap-vendors** releases when RLS or schema affects all three.

---

## Checklist before “production” mobile release

- [ ] `.env.production` / EAS secrets contain valid Supabase (not placeholders).
- [ ] **Yoco** test vs live keys and **Netlify** env for **`utap-vendors`** match the build you are shipping.
- [ ] NFC smoke test on **physical** Android (and iOS read paths if applicable).
- [ ] Sentry DSN points at the right project/environment.
