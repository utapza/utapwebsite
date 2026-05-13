# NFC module playbook

**Purpose:** Single **entry point** for NFC/MIFARE work. Deep dives stay in `docs/nfc-and-module/` so this file stays short.

---

## What you are working with

- **npm package:** `@utapza/expo-mifare-scanner` (see sibling repo **expo-mifare-scanner**).
- **App integration:** `utap-apps` — `nfcService.js`, `ScanNFCScreen.js`, `app.json` plugin list, native projects under `ios/` and `android/`.
- **Concepts:** Scanning reads tag data; **emulation** uses stored raw payload on **Android** HCE-style flows as documented in-repo.

---

## Before you change anything

1. Confirm **Expo SDK** and **React Native** versions in `utap-apps/package.json` match what the module maintainers test against.
2. Run **`npm run verify:module`** (utap-apps) after installs or prebuild.
3. Use a **development build** / dev client — **Expo Go cannot load** this native module.

---

## Deep-dive documents (in **utap-docs**)

| Topic | Doc |
|-------|-----|
| Card scan vs emulation data flow | [`../../nfc-and-module/CARD_SCANNING_AND_EMULATION.md`](../../nfc-and-module/CARD_SCANNING_AND_EMULATION.md) |
| Module compile / autolinking | [`../../nfc-and-module/MODULE_ARCHITECTURE.md`](../../nfc-and-module/MODULE_ARCHITECTURE.md) |
| Module setup | [`../../nfc-and-module/MIFARE_MODULE_SETUP.md`](../../nfc-and-module/MIFARE_MODULE_SETUP.md), [`../../nfc-and-module/MIFARE_SCANNER_SETUP.md`](../../nfc-and-module/MIFARE_SCANNER_SETUP.md) |
| Developing the module | [`../../nfc-and-module/MODULE_DEVELOPMENT.md`](../../nfc-and-module/MODULE_DEVELOPMENT.md) |
| Publishing npm package | [`../../nfc-and-module/MODULE_PUBLISHING.md`](../../nfc-and-module/MODULE_PUBLISHING.md) |
| iOS null module / CoreNFC issues | [`../../nfc-and-module/IOS_NFC_MODULE_NULL.md`](../../nfc-and-module/IOS_NFC_MODULE_NULL.md) |

### iOS-only

| Topic | Doc |
|-------|-----|
| Pods & autolinking | [`../../ios/IOS_PODS_AND_AUTOLINKING.md`](../../ios/IOS_PODS_AND_AUTOLINKING.md) |

### Debugging

| Topic | Doc |
|-------|-----|
| Android logging | [`../../debugging-and-logs/ANDROID_LOGGING_GUIDE.md`](../../debugging-and-logs/ANDROID_LOGGING_GUIDE.md) |
| Native logs | [`../../debugging-and-logs/VIEWING_NATIVE_LOGS.md`](../../debugging-and-logs/VIEWING_NATIVE_LOGS.md) |

---

## npm scripts (utap-apps) worth remembering

```bash
npm run verify:module
npm run android:logs:mifare
npm run adb:service-logs
```

See root **`package.json`** for the full list.

---

## Platform expectations

- **Android:** Stronger story for MIFARE read + emulation paths documented in CARD_SCANNING_AND_EMULATION.
- **iOS:** Reading via CoreNFC; **do not assume** identical emulation behaviour—validate on hardware.

See [`../risk-and-compliance/pitfalls-and-risks.md`](../risk-and-compliance/pitfalls-and-risks.md).

---

## Sibling repo onboarding

For contributors working **inside the module repository**, see [`../onboarding/expo-mifare-scanner.md`](../onboarding/expo-mifare-scanner.md).
