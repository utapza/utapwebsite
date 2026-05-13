# ExpoMifareScanner Module Architecture & Publishing Guide

This document explains how the module works, how it's integrated, and how to publish it as a separate npm package.

## How the Module Works

### 1. Module Structure

The module is a **local Expo module** located at:

```
expo-modules/expo-mifare-scanner/
├── package.json              ← Module metadata
├── expo-module.config.json   ← Expo module configuration
├── app.plugin.js             ← Expo config plugin
├── android/
│   ├── build.gradle          ← Android build configuration
│   └── src/main/java/expo/modules/mifarescanner/
│       ├── MifareScanner.java      ← Native Java code
│       └── MifareScannerModule.kt  ← Expo module bridge (Kotlin)
└── src/
    └── index.js              ← JavaScript interface
```

### 2. Integration Process

#### Step 1: Local Dependency

The module is linked as a **file dependency** in `package.json`:

```json
{
  "dependencies": {
    "expo-mifare-scanner": "file:./expo-modules/expo-mifare-scanner"
  }
}
```

When you run `npm install`:

- npm creates a **symlink** from `node_modules/expo-mifare-scanner` → `expo-modules/expo-mifare-scanner`
- The module source files are **not copied**, just referenced

#### Step 2: Expo Autolinking

When you run `npx expo prebuild`:

1. Expo scans `node_modules/` for packages with `expo-module.config.json`
2. Finds `expo-mifare-scanner` (via symlink)
3. Reads `expo-module.config.json` to discover the native module class
4. **Does NOT copy files** - just registers the module

#### Step 3: Android Build

When you build the Android app (`npx expo run:android` or `./gradlew assembleDebug`):

1. Gradle's autolinking plugin detects the module
2. Adds `:expo-mifare-scanner` as a **subproject** to `settings.gradle`
3. Gradle compiles the module's Java/Kotlin code **on-the-fly** during app build
4. The compiled `.class` files are packaged into the APK

### 3. Key Points

✅ **No separate build step** - The module is compiled as part of the app build
✅ **Source files are referenced directly** - Not copied to `android/` folder
✅ **Symlinked dependency** - `node_modules/expo-mifare-scanner` → `expo-modules/expo-mifare-scanner`
✅ **Compiled at build time** - Gradle compiles Java/Kotlin when building the app

## What We Did to Make It Work

### 1. Created Module Structure

- Created `expo-modules/expo-mifare-scanner/` directory
- Added `package.json` with module metadata
- Added `expo-module.config.json` to register the native module

### 2. Added Native Code

- `MifareScanner.java` - Core MIFARE scanning logic
- `MifareScannerModule.kt` - Expo module bridge
- `android/build.gradle` - Build configuration

### 3. Added JavaScript Interface

- `src/index.js` - JavaScript API for the module

### 4. Created Config Plugin

- `app.plugin.js` - Adds NFC permissions to AndroidManifest.xml

### 5. Registered in App

- Added to `package.json` as file dependency
- Added plugin to `app.json`
- Registered in `expo-module.config.json`

### 6. Added Build Configuration

- Created `android/build.gradle` for the module
- Ensured proper dependencies on `expo-modules-core`

## Compilation Process

### When Does Compilation Happen?

**The module is NOT pre-compiled.** It's compiled **during the app build**:

1. **JavaScript** (`src/index.js`):
   - Bundled by Metro at runtime
   - No compilation needed
   - Fast Refresh works automatically

2. **Native Code** (Java/Kotlin):
   - Compiled by Gradle when building the app
   - Happens automatically during `npx expo run:android`
   - Output: `.class` files → packaged into APK

### Build Flow

```
npm install
  ↓
Creates symlink: node_modules/expo-mifare-scanner → expo-modules/expo-mifare-scanner
  ↓
npx expo prebuild
  ↓
Expo autolinking detects module via expo-module.config.json
  ↓
Registers module in Android project (doesn't copy files)
  ↓
npx expo run:android (or ./gradlew assembleDebug)
  ↓
Gradle compiles module's Java/Kotlin code
  ↓
Packages compiled code into APK
```

## Publishing to npm

Yes! You can absolutely move this to a separate project and publish it to npm. Here's how:

### Step 1: Create Separate Repository

```bash
# Create new directory
mkdir expo-mifare-scanner
cd expo-mifare-scanner

# Initialize git
git init

# Copy module files
cp -r ../uni-card-wallet-setup/expo-modules/expo-mifare-scanner/* .
```

### Step 2: Update package.json

```json
{
  "name": "@your-org/expo-mifare-scanner",
  "version": "1.0.0",
  "description": "Expo module for scanning MIFARE Classic cards",
  "main": "src/index.js",
  "keywords": ["react-native", "expo", "mifare", "nfc", "expo-module"],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-org/expo-mifare-scanner.git"
  },
  "peerDependencies": {
    "expo": "*",
    "expo-modules-core": "*"
  },
  "files": ["src", "android", "expo-module.config.json", "app.plugin.js"]
}
```

### Step 3: Add README

Create a comprehensive README.md with:

- Installation instructions
- Usage examples
- API documentation
- Requirements (Expo SDK version, etc.)

### Step 4: Publish to npm

```bash
# Login to npm
npm login

# Publish
npm publish --access public
```

### Step 5: Use in Your App

After publishing, update your `package.json`:

```json
{
  "dependencies": {
    "@your-org/expo-mifare-scanner": "^1.0.0"
  }
}
```

Then:

```bash
npm install
npx expo prebuild --clean
npx expo run:android
```

## Important Files for Publishing

When publishing to npm, make sure these files are included:

1. ✅ `src/index.js` - JavaScript interface
2. ✅ `android/` - Native Android code
3. ✅ `expo-module.config.json` - Module registration
4. ✅ `app.plugin.js` - Config plugin
5. ✅ `package.json` - Module metadata
6. ✅ `README.md` - Documentation
7. ✅ `LICENSE` - License file

**Don't include:**

- ❌ `node_modules/`
- ❌ `.git/`
- ❌ Build artifacts
- ❌ Test files (unless you want them)

Use `.npmignore` or the `files` field in `package.json` to control what gets published.

## Differences: Local vs Published

### Local Module (Current Setup)

- ✅ Fast iteration (edit source directly)
- ✅ No version management needed
- ✅ Easy to debug
- ❌ Not reusable across projects
- ❌ Can't share with others easily

### Published npm Package

- ✅ Reusable across projects
- ✅ Version management
- ✅ Easy to share
- ✅ Can be used by others
- ❌ Requires publishing/updating process
- ❌ Need to handle versioning

## Summary

**What we did:**

1. Created local Expo module structure
2. Added native Java/Kotlin code
3. Created JavaScript interface
4. Registered module via `expo-module.config.json`
5. Linked as file dependency in `package.json`
6. Added config plugin for permissions

**How it works:**

- Module is **symlinked** (not copied) to `node_modules/`
- Expo autolinking **detects** it during prebuild
- Gradle **compiles** it during app build
- Source files are **referenced directly** (not copied to `android/`)

**Can it be published?**

- ✅ Yes! Move to separate repo
- ✅ Publish to npm
- ✅ Use in any Expo project
- ✅ Same integration process (autolinking handles it)

The module doesn't need to be pre-compiled - Expo and Gradle handle everything automatically! 🎉
