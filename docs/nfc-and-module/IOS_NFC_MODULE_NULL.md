# iOS: ExpoMifareScanner native module is null

When `requireNativeModule('ExpoMifareScanner')` returns `null` on **iOS** but works on **Android**, the native module is not registered in the iOS binary. Diagnostics show:

- `global.expo.modules` does **not** contain `ExpoMifareScanner`
- `NativeUnimoduleProxy` `exportedMethods` does **not** contain `ExpoMifareScanner`

So the **iOS build you installed was built without the ExpoMifareScanner native module** (it's not in `ExpoModulesProvider` for that binary).

## Config plugin fallback: copy Swift files into the app target

The **expo-mifare-scanner** config plugin (`app.plugin.js`) now does two extra steps on iOS when the app prebuilds:

1. **Copy** `ExpoMifareScannerModule.swift` and `CardEmulationHandler.swift` from the package (`node_modules/@utapza/expo-mifare-scanner/ios/ExpoMifareScanner/`) into the app’s iOS target folder (e.g. `ios/uTap/`).
2. **Add** those files to the Xcode project (Compile Sources) via `addBuildSourceFileToGroup`.

So even when expo-modules-autolinking doesn’t add the module as a pod (e.g. EAS installs an npm version that doesn’t ship the pod or `ios/` is missing), the Swift code is still compiled and linked into the app. For this to work, the **installed** package (from npm or git) must still contain the `ios/ExpoMifareScanner/*.swift` files; the plugin only copies them into the app target and registers them in the project. Runtime registration in `ExpoModulesProvider` still comes from autolinking; if the module is in the resolved list (package has `expo-module.config.json` and is in dependencies), the provider will include it. So: **publish the package with the full `ios/` folder** (or use a git dependency that includes it), then run a clean EAS build. The plugin ensures the Swift files are part of the app target when the pod isn’t used.

## Most likely cause: EAS is using a different package version than local

Locally, autolinking **does** see the module (run `npx expo-modules-autolinking resolve --platform apple --json` and you'll see `@utapza/expo-mifare-scanner` with `ExpoMifareScannerModule`). So the codebase is correct.

On **EAS Build**, dependencies are installed from the **npm registry** using `package-lock.json`. If the **published** npm package for the version that gets installed (e.g. `2.0.5`) does **not** include the iOS native code or has a different `expo-module.config.json`, then:

- During EAS build, `expo-modules-autolinking resolve` will **not** list `@utapza/expo-mifare-scanner` (or will list it without `ExpoMifareScannerModule`).
- The generated `ExpoModulesProvider.swift` will **not** include `ExpoMifareScannerModule.self`.
- The resulting iOS binary will have no ExpoMifareScanner module → `requireNativeModule('ExpoMifareScanner')` is null.

### Fix 1: Publish the current package and lock to it (recommended)

1. In the **expo-mifare-scanner** repo, ensure `package.json` has the correct `version` (e.g. `2.0.6`) and that the **ios** folder and **expo-module.config.json** (with `"apple": { "modules": ["ExpoMifareScannerModule"] }`) are included in the `files` array.
2. Publish to npm: `npm publish`
3. In the **app** repo, set the dependency to that version (e.g. `"@utapza/expo-mifare-scanner": "2.0.6"`), run `npm install`, commit **package.json** and **package-lock.json**.
4. Run the app's verify script: `node scripts/verify-mifare-module.js` — it must pass and show "Autolinking sees @utapza/expo-mifare-scanner (2.0.6) with ExpoMifareScannerModule".
5. Trigger a new EAS iOS dev build (with cache cleared if you want): `eas build --platform ios --profile development --clear-cache`
6. Install the new build and confirm in the app logs that `ExpoMifareScanner` appears in `global.expo.modules` and NFC works.

### Fix 2: Use a git dependency so EAS uses your repo

If you don't want to publish to npm yet:

1. In the app's **package.json**, set e.g. `"@utapza/expo-mifare-scanner": "github:utapza/expo-mifare-scanner#main"` (replace `main` with the branch that has the iOS module).
2. Run `npm install`, commit **package.json** and **package-lock.json**.
3. Run `node scripts/verify-mifare-module.js` and ensure it passes.
4. Build with EAS again and install the new iOS build.

## Verify before building

Run:

```bash
node scripts/verify-mifare-module.js
```

This checks that the installed package has the iOS files and that **expo-modules-autolinking resolve** lists `@utapza/expo-mifare-scanner` with `ExpoMifareScannerModule`. If this passes locally but the EAS-built app still has no module, the version installed on EAS is different; use Fix 1 or 2 above.

### Using a sibling `expo-mifare-scanner` repo (local dev)

If the app and `expo-mifare-scanner` are siblings (e.g. `dev/uni-card-wallet-setup` and `dev/expo-mifare-scanner`), you can add in the **app’s** `package.json`:

```json
"expo": {
  "autolinking": {
    "nativeModulesDir": ".."
  }
}
```

That makes autolinking search the parent directory so it can pick up the local module. For **EAS Build**, the cloud worker only has your app repo, so there is no sibling folder; the module must come from **dependencies** (published npm version or git dependency). So `nativeModulesDir` helps local dev only, not the “module not in EAS binary” issue.

### expo-module.config.json: `"apple"` vs `"ios"`

Using `"apple": { "modules": ["ExpoMifareScannerModule"] }` is correct. Expo’s autolinking reads both `apple` and `ios` (`getAppleConfig()` uses `config.apple ?? config.ios`). The key name is not why the module was missing on EAS; the missing module was due to which package version was installed on EAS.

## Other checks (if it's still null)

- **Expo Go** — Custom native modules don't run in Expo Go. Use a **development build**.
- **Correct app** — Make sure the launched app is your dev build (bundle id `com.utap.utapwallet`), not Expo Go.
- **Remote JS debugging** — If you use "Debug with Chrome", JS runs in Chrome and `global.expo.modules` may be missing. Disable remote debugging and use the in-app console or React Native Dev Tools.
