# Android crash: `DevelopmentClientController was initialized`

Short write-up of what went wrong, what Expo Dev Launcher is, and how to avoid the issue.

## What happened

The app crashed immediately on cold start on Android. Logcat showed:

```text
java.lang.IllegalStateException: DevelopmentClientController was initialized.
```

The stack pointed at `expo.modules.devlauncher.DevLauncherController`, then `ApplicationLifecycleDispatcher.onApplicationCreate`, then `MainApplication.onCreate` — **not** at `react-native-svg` or other native libs. Lines loading `libreact_codegen_rnsvg.so` in the same log window were normal startup noise; the fatal exception was Dev Launcher only.

Other pitfalls in the same episode:

- Shell commands (`rm …/expo-dev-launcher/android/bin`, `./gradlew clean`) must be run from **this repo** (`utap-apps`), where `node_modules/expo-dev-launcher` and `android/` exist. Running them from another workspace does nothing useful for this app.
- iOS Xcode build logs with many `RNSVG` strings are not proof of an SVG root cause; a real failure in one log was a **Swift** error in `ExpoMifareScannerModule`, unrelated to this Android crash.

## What is Expo Dev Launcher?

**Expo Go** is the generic “Expo shell” from the store: it loads many projects over the air, but only with the native modules Expo ships inside that binary.

**Development builds** (this app with `expo-dev-client`) are **your** app ID, your native code (NFC, **Yoco** **WebView** / optional **Stripe** pods, etc.), plus a **development** layer so you can:

- Point at a Metro bundler on your machine or network  
- Open the dev menu, reload, toggle performance tools  
- Use EAS Update / dev URLs as configured  

**Expo Dev Launcher** is that **native** development layer inside a dev client. It owns startup wiring (Koin DI, error handlers, connection to Metro). It is supposed to initialize **once** when the `Application` starts. If something causes the same initialization path to run twice in one process, the library throws `DevelopmentClientController was initialized` by design (guard against a broken double setup).

## How can it run “twice” without you doing anything obvious?

You are not double-tapping the app icon. **Both** runs are automatic during `Application.onCreate`:

1. Something completes the first Dev Launcher setup (e.g. first lifecycle listener or early RN/Expo bootstrap).  
2. A **second** code path registers the same listener or compiles duplicate sources, so `initialize()` is invoked again.  
3. The second call hits `check(!wasInitialized())` and crashes.

Common real-world causes:

| Cause | Why it’s invisible |
|--------|---------------------|
| **Duplicate Kotlin trees** under `node_modules/expo-dev-launcher/android/` — especially a stray **`android/bin`** folder mirroring `android/src` | Often created after **Android Studio “Make module”** (or similar) on a dependency, not from normal `npm install`. Gradle can end up with two copies of the same lifecycle listener. |
| **Corrupted / duplicated autolinking** (e.g. `DevLauncherPackage` listed twice in generated Expo package lists) | Comes from install/link state; you never “run” it manually. |
| **Wrong project directory** when cleaning | You think you fixed the install, but `node_modules` for **this** app was never cleaned. |

## What we did that fixed it

1. Removed the stray mirror (if present):  
   `rm -rf node_modules/expo-dev-launcher/android/bin`
2. Native clean from the app root:  
   `cd android && ./gradlew clean && cd ..`
3. Closed Android Studio (reduces odds of accidentally rebuilding library modules into `node_modules`).
4. Booted the emulator (Expo Orbit or `emulator -avd …` is fine — Studio not required).
5. Rebuilt and installed from **`utap-apps`**:  
   `npx expo run:android`

After a clean tree and a single source path for `expo-dev-launcher`, only one lifecycle listener runs and initialization happens once.

## How to avoid it in the future

1. **Always run Android fixes from `utap-apps`** (path to this repo), not from other monorepo folders.
2. **Do not open `expo-dev-launcher` (or other `node_modules` packages) as a standalone Gradle module** in Android Studio and use **Make Module** on them.
3. If the crash returns after a messy native session:  
   `rm -rf node_modules/expo-dev-launcher/android/bin` → `cd android && ./gradlew clean` → `npx expo run:android`.
4. After odd installs: `rm -rf node_modules && npm ci` (or fresh `npm install`), then `npx expo prebuild --clean` if you rely on prebuild.
5. Optional sanity check:  
   `npx expo-doctor@latest`

## Quick reference commands (from `utap-apps`)

```bash
cd /path/to/utap-apps
rm -rf node_modules/expo-dev-launcher/android/bin
cd android && ./gradlew clean && cd ..
adb devices
npx expo run:android
```

---

*Last updated from internal troubleshooting session (Expo dev client, Android emulator).*
