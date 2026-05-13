# My Expo native module works on Android but is null on iOS — what am I missing?

**TL;DR:** I have a custom Expo module (`@utapza/expo-mifare-scanner`) currently on npm, that loads correctly on Android. On iOS, `requireNativeModule('ExpoMifareScanner')` returns `null` and the module never appears in `global.expo.modules`. I’ve tried prebuilding, a config plugin that copies Swift files into the Xcode project, and EAS Build with `--clear-cache`. The config plugin _does_ run (entitlements and Info.plist are applied), but the native module is still absent from the iOS binary. I’d love help figuring out what’s needed to make the module visible on iOS.

---

## The setup

- **Module:** [@utapza/expo-mifare-scanner](https://github.com/utapza/expo-mifare-scanner) — Expo module for MIFARE/NFC (reading and emulation).
- **App:** Expo (SDK 52) with a development build, not Expo Go.
- **What works:** On **Android**, the module loads: `requireNativeModule('ExpoMifareScanner')` (via the Android class name) works, and the native code runs.
- **What doesn’t:** On **iOS**, `requireNativeModule('ExpoMifareScanner')` returns `null`. At runtime, `global.expo.modules` does **not** contain `ExpoMifareScanner`, and the proxy’s `exportedMethods` don’t list it either. So the installed iOS app was built without the module in the binary.

The module is in the app’s `package.json` and in `app.json` plugins. Locally, `npx expo-modules-autolinking resolve --platform apple --json` does list `@utapza/expo-mifare-scanner` with `ExpoMifareScannerModule`. So the codebase and config look correct on my machine.

```
{"extraDependencies":[],"coreFeatures":[],"modules":[{"packageName":"@utapza/expo-mifare-scanner","pods":[{"podName":"ExpoMifareScanner","podspecDir":"/Users/nonwork/dev/uni-card-wallet-setup/node_modules/@utapza/expo-mifare-scanner/ios"}],"swiftModuleNames":["ExpoMifareScanner"],"modules":["ExpoMifareScannerModule"],"appDelegateSubscribers":[],"reactDelegateHandlers":[],"debugOnly":false,"packageVersion":"2.0.8"}, ...}
```

---

## What I’ve already tried

### 1. Standard prebuild and EAS Build

- Ran `npx expo prebuild --platform ios` (and full prebuild).
- Built with **EAS Build**: `eas build --platform ios --profile development`.
- Result: iOS build succeeds, but the module is still null at runtime.

**Latest build log**

- The Xcode build reports **122 targets** in the dependency graph. The app target `uTap` links Pods such as `react-native-nfc-manager`, `expo-dev-menu`, `Sentry`, `Stripe`, `ExpoModulesCore`, etc. *(Stripe here reflects the **iOS** pod graph at the time of writing—**student checkout** uses **Yoco**; confirm current **`Podfile.lock`**.)*
- A **search of the entire log** for `ExpoMifareScanner`, `CardEmulationHandler`, or `ExpoMifareScannerModule.swift` returns **zero matches**. So the native module is **completely absent**: no target, no Swift file references, no compilation of the module.
- The config plugin **does** run for this build (entitlements and Info.plist are applied — NFC usage description and capabilities appear in the project). So the “config plugin” part works; the **actual native module** (Swift code) was never added to the Xcode project or Podfile in this build.
- Conclusion: the Swift files were never copied into the project, never compiled, and never linked. That’s why at runtime `global.expo.modules` doesn’t contain `ExpoMifareScanner` and `requireNativeModule('ExpoMifareScanner')` returns null.

### 2. Config plugin: entitlements + Info.plist (already in place)

The module’s `app.plugin.js` already:

- Sets **NFCReaderUsageDescription** in Info.plist.
- Adds **NFC entitlements** (`com.apple.developer.nfc.readersession.formats` = `['TAG']`).

So the “config plugin” part runs: provisioning and plist show the NFC usage and capabilities. But that doesn’t add the actual Swift code to the app.

### 3. Config plugin: copy Swift files into the app target

To force the Swift code into the build when the pod might not be linked, I extended the plugin to:

- **Copy** `ExpoMifareScannerModule.swift` and `CardEmulationHandler.swift` from  
  `node_modules/@utapza/expo-mifare-scanner/ios/ExpoMifareScanner/`  
  into the app’s iOS target folder (e.g. `ios/<AppName>/`).
- **Add** those files to the Xcode project with `addBuildSourceFileToGroup` from `@expo/config-plugins` (so they’re in “Compile Sources” for the app target).

So the plugin now does more than plist/entitlements — it copies and links the Swift files. I’m relying on the installed package (from npm or git) still containing the `ios/` folder so the plugin can copy from it.

### 4. Clean EAS Build

- Ran `eas build --platform ios --profile development --clear-cache` so EAS doesn’t reuse an old native project.
- Same result: build succeeds, but the module is still null on device. The build log  does **not** contain any “[expo-mifare-scanner] Copied … to Xcode project” messages,  the copy step didn’t run on EAS (e.g. package path or `projectName` differing).

### 5. Verifying the package locally

- The module’s `package.json` has `"files": [ "src", "android/...", "ios", "expo-module.config.json", "app.plugin.js", ... ]` so `ios` is published.
- Locally, a small script checks that the installed package has `ios/ExpoMifareScanner/ExpoMifareScannerModule.swift` and that `expo-modules-autolinking resolve --platform apple` lists the module. That passes when I install from the repo or from a tarball.

So on my machine the module is present and autolinking sees it. On EAS, the installed version might differ (e.g. npm tarball omitting or differing from what I expect), but even with the plugin copying the Swift files, the module doesn’t show up at runtime on iOS.

---

## What I’m unsure about

1. **ExpoModulesProvider on iOS**  
   I know the app loads the native module list from something like `ExpoModulesProvider` in the main bundle. If the module isn’t in that provider, it won’t be in `global.expo.modules`. Is the provider generated only from expo-modules-autolinking’s resolve at build time? If EAS installs a package that doesn’t get resolved (e.g. missing or different `expo-module.config.json` or `ios/` in the tarball), would the provider simply omit the module even if I’ve copied the Swift files into the app target?

2. **Pod vs “files in app target”**  
   When the module is linked as a **pod** (via autolinking), the Podfile gets a pod and the provider gets the module. When I **only** copy the Swift files into the app target (no pod), the code compiles and links, but does the Expo runtime still need the module to be listed in `ExpoModulesProvider`? If yes, then copying files alone isn’t enough — I’d need the module to be in the autolinking result so the provider is generated with it.

3. **EAS dependency resolution**  
   Is there a known case where the **published** npm package (or the commit used by a git dependency) doesn’t include the `ios/` folder or has a different structure, so EAS’s install doesn’t match what I have locally? Any recommended way to verify exactly what EAS installs (e.g. a build step that dumps `ls node_modules/@utapza/expo-mifare-scanner/ios` or the result of `expo-modules-autolinking resolve`)?

4. **Anything iOS-specific for “making the module visible”**  
   Beyond the usual (Expo module API, `expo-module.config.json` with `ios.modules`, podspec, and the config plugin for plist/entitlements), is there an extra step or convention on iOS to make the module show up in `global.expo.modules` (e.g. registering in a specific way, or something in the Podfile / build phases)?

---

## What I’d love from you

- Confirmation or correction of how **ExpoModulesProvider** is populated on iOS and whether “copy Swift into app target” is enough or the module must be in the autolinking result.
- Any **checklist or debugging steps** you use when a module works on Android but is null on iOS (e.g. “always check X”, “run Y on EAS and inspect Z”).
- If you’ve seen **EAS installing a different package shape** than local (e.g. `.npmignore` / `files` causing `ios/` to be missing), how you verified and fixed it.
- Any **iOS-specific** registration or build step that’s easy to miss when coming from Android.

I’m happy to share the relevant parts of the module (e.g. `expo-module.config.json`, podspec, plugin snippet) or build logs if that helps. Thanks in advance.


