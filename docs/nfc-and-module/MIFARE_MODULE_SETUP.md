# ExpoMifareScanner Module Setup Guide

This guide explains how to ensure the `expo-mifare-scanner` custom native module is always included in your Android build, even after running `npx expo prebuild`.

## How It Works

The module is automatically detected by Expo's autolinking system when:
1. ✅ The module is listed in `package.json` dependencies
2. ✅ The module is symlinked in `node_modules/`
3. ✅ The module has `expo-module.config.json`
4. ✅ The module plugin is registered in `app.json`
5. ✅ The module has a proper `android/build.gradle` file

## Automatic Verification

We've set up automatic verification that runs:
- **After `npm install`** - Ensures the module is properly linked
- **Before `npx expo prebuild`** - Verifies the module exists before generating native code

## Manual Verification

You can manually verify the module setup at any time:

```bash
npm run verify:module
```

This will check:
- Module directory exists
- Module is symlinked in node_modules
- All required files are present
- Module is in package.json
- Plugin is in app.json

## Recommended Workflow

### Initial Setup (First Time)

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd uni-card-wallet-setup
   ```

2. **Install dependencies** (this will automatically verify the module):
   ```bash
   npm install
   ```

3. **Generate native code**:
   ```bash
   npm run prebuild:android
   # or
   npx expo prebuild --platform android
   ```

### After Running Prebuild

After running `npx expo prebuild`, the module should automatically be included because:

1. **Expo autolinking** scans `node_modules/` for modules with `expo-module.config.json`
2. **The module is symlinked** from `expo-modules/expo-mifare-scanner` to `node_modules/expo-mifare-scanner`
3. **The config plugin** in `app.json` ensures Android permissions are set

### If Module Is Missing

If you get "Native module not found" errors:

1. **Verify the module**:
   ```bash
   npm run verify:module
   ```

2. **Reinstall dependencies** (if module is not linked):
   ```bash
   npm install
   ```

3. **Regenerate native code**:
   ```bash
   npm run prebuild:clean:android
   # or
   npx expo prebuild --platform android --clean
   ```

4. **Rebuild the app**:
   ```bash
   npx expo run:android
   # or
   npm run android:apk:debug
   ```

## Important Files

The following files ensure the module is always included:

- ✅ `package.json` - Contains `"expo-mifare-scanner": "file:./expo-modules/expo-mifare-scanner"`
- ✅ `app.json` - Contains plugin reference: `"./expo-modules/expo-mifare-scanner/app.plugin.js"`
- ✅ `expo-modules/expo-mifare-scanner/expo-module.config.json` - Module configuration
- ✅ `expo-modules/expo-mifare-scanner/android/build.gradle` - Android build configuration
- ✅ `scripts/verify-mifare-module.js` - Verification script

## Troubleshooting

### Module not found after prebuild

**Solution**: The module should be automatically detected. If not:

1. Check that `node_modules/expo-mifare-scanner` exists and is a symlink:
   ```bash
   ls -la node_modules/expo-mifare-scanner
   ```

2. If it's missing, reinstall:
   ```bash
   npm install
   ```

3. Verify the module:
   ```bash
   npm run verify:module
   ```

### Build errors related to the module

**Solution**: Ensure the module's `build.gradle` is correct:

1. Check that `expo-modules/expo-mifare-scanner/android/build.gradle` exists
2. Verify it references `:expo-modules-core` correctly
3. Run prebuild again:
   ```bash
   npm run prebuild:clean:android
   ```

### Module not in autolinking

**Solution**: Expo autolinking should detect it automatically. To verify:

1. Check that `expo-module.config.json` exists in the module directory
2. Verify the module structure matches Expo's requirements
3. Run verification:
   ```bash
   npm run verify:module
   ```

## NPM Scripts

We've added several helpful scripts:

- `npm run verify:module` - Verify module setup
- `npm run prebuild` - Prebuild with verification (all platforms)
- `npm run prebuild:android` - Prebuild Android with verification
- `npm run prebuild:ios` - Prebuild iOS with verification
- `npm run prebuild:clean` - Clean prebuild with verification
- `npm run prebuild:clean:android` - Clean prebuild Android with verification

## Git Workflow

The `expo-modules/` directory is **included in git** (see `.gitignore`), so the module source code is always available. When you clone the repo:

1. The module source is in `expo-modules/expo-mifare-scanner/`
2. Running `npm install` creates the symlink in `node_modules/`
3. Expo autolinking automatically detects it during prebuild

## Summary

The module will **always be included** in the Android build because:

1. ✅ It's committed to git in `expo-modules/`
2. ✅ It's listed in `package.json` as a file dependency
3. ✅ It's registered in `app.json` plugins
4. ✅ Verification runs automatically on `npm install`
5. ✅ Expo autolinking detects it during prebuild

You don't need to do anything special - just use the npm scripts and everything will work automatically!
