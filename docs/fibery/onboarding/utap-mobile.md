# Onboarding: utap-apps (uTap mobile)

You are onboarding to the **sibling mobile repository** **`utap-apps`**: React Native, Expo, NFC, Ushop, uGig, Supabase, **Yoco** (hosted checkout via **Netlify Functions** + in-app **WebView**), **feature policy**, Sentry.

---

## What that repo owns

- Student **auth**, **profile**, **card wallet** (scan, sync, local cache).
- **Ushop** and **uGig** screens driven by `ushopService.js` (catalogue scoped to the student’s **profile university** where policy requires).
- **Orders** and **Yoco** checkout (`yocoPaymentService.js`, `YocoCheckoutWebView.js`); **paid university change** checkout (`universityChangePaymentService.js`).
- Native **`@utapza/expo-mifare-scanner`** integration.

It does **not** host the admin or vendor web consoles (those are sibling repos). **Serverless** payment and mail entry points live on **`utap-vendors`** Netlify (`/.netlify/functions/...`).

---

## Prerequisites

- **Node.js** (match team standard; LTS recommended).
- **npm** (repo uses `package-lock.json`).
- For Android: **Android Studio**, SDK, device or emulator with NFC for real tests.
- For iOS (macOS): **Xcode**, CocoaPods (`cd ios && pod install`).
- **Expo dev client** mindset—you cannot rely on Expo Go for NFC.

---

## First-time setup

```bash
git clone <your-remote> utap-apps
cd utap-apps
npm install
```

Create **`.env.local`** in the repo root:

```bash
SUPABASE_URL=<from team>
SUPABASE_ANON_KEY=<from team>
# Optional: override Netlify functions base (defaults to vendors.utaptech.co.za)
# EXPO_PUBLIC_VENDOR_FUNCTIONS_BASE_URL=https://vendors.utaptech.co.za/.netlify/functions
```

Never commit this file. Values are inlined at build time via `babel.config.js` (`inline-dotenv`).

---

## Run the app

```bash
npm run dev
# or with dev client + tunnel for a physical device:
npm run dev:tunnel
```

Native rebuild after native/config changes:

```bash
npx expo prebuild
npm run android   # or npm run ios
```

See also [`../../development/QUICK_START.md`](../../development/QUICK_START.md).

---

## Where to edit code

| Area | Location |
|------|----------|
| Navigation | `src/navigation/AppNavigator.js` |
| Auth state | `src/context/AuthContext.js` |
| Feature policy | `src/context/FeaturePolicyContext.js`, `src/config/featurePolicy.js` |
| Cards / sync | `src/context/CardContext.js`, `src/services/supabaseService.js` |
| NFC bridge | `src/services/nfcService.js`, `src/screens/ScanNFCScreen.js` |
| Commerce | `src/services/ushopService.js`, `src/screens/UshopScreen.js`, `UGigScreen.js` |
| Orders / Yoco | `src/services/orderService.js`, `yocoPaymentService.js`, `YocoCheckoutWebView.js` |
| Legacy (unused in primary checkout) | `stripePaymentService.js` (do not extend unless reviving Stripe) |

---

## Useful commands (from `package.json`)

| Script | Use |
|--------|-----|
| `npm run verify:module` | Confirms MIFARE module is linked |
| `npm run lint` | Lint |
| `npm run android:logs:mifare` | Filtered Android logs for NFC |
| `npm run android:apk:debug` | Local debug APK |

---

## Documentation map

- Handbook: [`../README.md`](../README.md) (Fibery index)  
- NFC: [`../nfc/nfc-module-playbook.md`](../nfc/nfc-module-playbook.md)  
- Full docs index: [`../../README.md`](../../README.md)  

Root **`CLAUDE.md`** has an architecture summary for AI-assisted work.

---

## Contributing checklist

1. Run **`npm run verify:module`** after dependency changes affecting native code.
2. Test NFC on a **real Android device** when touching scan/emulation paths.
3. Do not log full **raw card hex** in production builds.
4. Call out **Supabase schema / RLS** impacts in your PR if queries or inserts change.
