# Onboarding: expo-mifare-scanner

**Location:** sibling repository **`expo-mifare-scanner`**, published to npm as **`@utapza/expo-mifare-scanner`**.

---

## What this repo is

An **Expo native module** providing MIFARE / NFC scanning (and related native behaviour) for **utap-apps**. Java/Kotlin on Android, Swift on iOS; JS entry in `src/index.js`.

---

## Prerequisites

- Same major **Expo** / **React Native** stack as the consuming app (check **utap-apps** `package.json` before upgrading peer deps).  
- Android Studio & Xcode for native debugging.  
- npm account with publish rights only if you **release** a new version.

---

## First-time setup

```bash
cd expo-mifare-scanner
npm install
```

Link into **utap-apps** is normally via the **npm registry** version (`package.json` dependency). Local development sometimes uses `file:` or `npm pack`—follow team practice.

---

## Develop and test

1. Make native or JS changes in this repo.  
2. Bump version in **`package.json`** when publishing.  
3. In **utap-apps**, bump the dependency version and run:

   ```bash
   npm install
   npm run verify:module
   npx expo prebuild   # when native code changed
   npm run android     # or ios
   ```

---

## Key files

| Area | Path |
|------|------|
| Expo module config | `expo-module.config.json`, `app.plugin.js` |
| Android native | `android/src/main/java/...` |
| iOS native | `ios/` |
| JS API | `src/index.js` |

Publishing steps: [`../../nfc-and-module/MODULE_PUBLISHING.md`](../../nfc-and-module/MODULE_PUBLISHING.md).

---

## Contributing

1. **Semver:** breaking JS or native API → major version bump.  
2. **Document** behaviour changes in **utap-apps** `docs/nfc-and-module/` if operators need new troubleshooting notes.  
3. Never commit **npm tokens**; use `npm login` or CI secrets.

---

## Related docs

- [`../nfc/nfc-module-playbook.md`](../nfc/nfc-module-playbook.md)  
- [`../../nfc-and-module/MODULE_ARCHITECTURE.md`](../../nfc-and-module/MODULE_ARCHITECTURE.md)  
