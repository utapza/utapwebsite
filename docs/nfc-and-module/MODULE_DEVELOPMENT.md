# ExpoMifareScanner Module Development Guide

This guide explains how changes to the module are included in the Android build and how to develop the module effectively.

## How Module Changes Are Included

### The Module is Built as Part of the Android App

The `expo-mifare-scanner` module **does not have a separate build command**. Instead:

1. **Expo autolinking** detects the module during `npx expo prebuild`
2. **Gradle** includes it as a subproject (`:expo-mifare-scanner`)
3. **Source files are referenced directly** (not copied) from `expo-modules/expo-mifare-scanner/`
4. **When you build the app**, Gradle automatically compiles the module's source files

### Source File Location

The module's source files are in:
```
expo-modules/expo-mifare-scanner/
├── android/src/main/java/expo/modules/mifarescanner/
│   ├── MifareScanner.java          ← Native Java code
│   └── MifareScannerModule.kt      ← Expo module bridge
├── src/index.js                    ← JavaScript interface
└── android/build.gradle            ← Build configuration
```

These files are **symlinked** to `node_modules/expo-mifare-scanner/`, so Gradle references them directly.

## Development Workflow

### Making Changes to JavaScript (src/index.js)

**Changes are picked up automatically via Fast Refresh:**

1. Edit `expo-modules/expo-mifare-scanner/src/index.js`
2. Save the file
3. The app reloads automatically (Fast Refresh)
4. **No rebuild needed!** ✅

### Making Changes to Native Code (Java/Kotlin)

**Changes require a rebuild:**

1. Edit files in `expo-modules/expo-mifare-scanner/android/src/main/java/`
2. Rebuild the app:
   ```bash
   npx expo run:android
   # or
   npm run android:apk:debug
   ```
3. The module's native code is recompiled as part of the build

**Note**: Gradle will automatically detect changes and recompile only what's needed.

### Making Changes to Build Configuration

**Changes require prebuild:**

If you modify:
- `android/build.gradle`
- `expo-module.config.json`
- `app.plugin.js`
- Module structure (new files, renamed packages, etc.)

Then run:
```bash
npm run prebuild:clean:android
# or
npx expo prebuild --platform android --clean
```

Then rebuild:
```bash
npx expo run:android
```

## Quick Reference

### JavaScript Changes
```bash
# 1. Edit expo-modules/expo-mifare-scanner/src/index.js
# 2. Save - Fast Refresh handles it automatically!
# No commands needed ✅
```

### Native Code Changes
```bash
# 1. Edit Java/Kotlin files in expo-modules/expo-mifare-scanner/android/
# 2. Rebuild the app
npx expo run:android
# or
npm run android:apk:debug
```

### Build Configuration Changes
```bash
# 1. Edit build.gradle, expo-module.config.json, or app.plugin.js
# 2. Regenerate native code
npm run prebuild:clean:android
# 3. Rebuild the app
npx expo run:android
```

## Verifying Changes Are Included

### Check Module is in Build

```bash
# List all Gradle projects (should include :expo-mifare-scanner)
cd android && ./gradlew projects | grep mifare
```

### Check Module Source Files

```bash
# Verify source files are accessible
ls -la node_modules/expo-mifare-scanner/android/src/main/java/expo/modules/mifarescanner/
```

### Build Just the Module (for testing)

```bash
# Build only the module (useful for quick syntax checks)
cd android && ./gradlew :expo-mifare-scanner:assembleDebug
```

### Check Module Compilation

```bash
# Compile the module's Kotlin/Java code
cd android && ./gradlew :expo-mifare-scanner:compileDebugKotlin
cd android && ./gradlew :expo-mifare-scanner:compileDebugJavaWithJavac
```

## Common Scenarios

### Scenario 1: Adding a New Method to MifareScannerModule.kt

1. Edit `expo-modules/expo-mifare-scanner/android/src/main/java/expo/modules/mifarescanner/MifareScannerModule.kt`
2. Add your method in the `ModuleDefinition` block
3. Rebuild:
   ```bash
   npx expo run:android
   ```
4. Changes are included! ✅

### Scenario 2: Modifying MifareScanner.java

1. Edit `expo-modules/expo-mifare-scanner/android/src/main/java/expo/modules/mifarescanner/MifareScanner.java`
2. Rebuild:
   ```bash
   npx expo run:android
   ```
3. Changes are included! ✅

### Scenario 3: Updating JavaScript Interface

1. Edit `expo-modules/expo-mifare-scanner/src/index.js`
2. Save - Fast Refresh handles it! ✅
3. No rebuild needed

### Scenario 4: Changing Module Configuration

1. Edit `expo-modules/expo-mifare-scanner/expo-module.config.json`
2. Regenerate:
   ```bash
   npm run prebuild:clean:android
   ```
3. Rebuild:
   ```bash
   npx expo run:android
   ```

## Important Notes

### ⚠️ Source Files Are NOT Copied

The module's source files are **referenced directly** from `expo-modules/expo-mifare-scanner/`. They are:
- ✅ Symlinked to `node_modules/expo-mifare-scanner/`
- ✅ Referenced by Gradle from the symlinked location
- ❌ **NOT copied** to the `android/` folder

This means:
- Changes to source files are **immediately available** to Gradle
- You don't need to copy files manually
- The source of truth is always `expo-modules/expo-mifare-scanner/`

### 🔄 When to Run Prebuild

Run `npx expo prebuild` when:
- ✅ First time setup
- ✅ Changed `build.gradle` configuration
- ✅ Changed `expo-module.config.json`
- ✅ Changed `app.plugin.js`
- ✅ Added/removed native files
- ✅ Changed package structure

**Don't** run prebuild for:
- ❌ JavaScript changes (Fast Refresh handles it)
- ❌ Native code changes (just rebuild the app)

### 🚀 Build Performance

Gradle's incremental compilation means:
- Only changed files are recompiled
- Module builds are cached
- Subsequent builds are faster

To force a clean build:
```bash
cd android && ./gradlew clean
npx expo run:android
```

## Troubleshooting

### Changes Not Appearing

1. **Check the file was saved**:
   ```bash
   ls -la expo-modules/expo-mifare-scanner/android/src/main/java/expo/modules/mifarescanner/
   ```

2. **Verify symlink exists**:
   ```bash
   ls -la node_modules/expo-mifare-scanner
   ```

3. **Rebuild the app**:
   ```bash
   npx expo run:android
   ```

4. **Force clean build**:
   ```bash
   cd android && ./gradlew clean
   npx expo run:android
   ```

### Module Not Found After Changes

1. **Verify module setup**:
   ```bash
   npm run verify:module
   ```

2. **Regenerate native code**:
   ```bash
   npm run prebuild:clean:android
   ```

3. **Rebuild**:
   ```bash
   npx expo run:android
   ```

## Summary

- ✅ **JavaScript changes**: Save → Fast Refresh (no rebuild)
- ✅ **Native code changes**: Edit → Rebuild app
- ✅ **Config changes**: Edit → Prebuild → Rebuild app
- ✅ **Source files are referenced directly** (not copied)
- ✅ **Module builds automatically** as part of the app build

The module doesn't need a separate build command - it's built automatically when you build the app! 🎉
