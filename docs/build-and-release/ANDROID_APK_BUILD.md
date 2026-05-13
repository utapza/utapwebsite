# Android APK Build Scripts

This document explains how to build debug and release APKs using the npm scripts.

## Available Scripts

### Debug APK

Build a debug APK (unsigned, for testing):

```bash
npm run android:apk:debug
```

Or just assemble without the message:

```bash
npm run android:assemble:debug
```

**Output Location:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### Release APK

Build a release APK (requires signing configuration):

```bash
npm run android:apk:release
```

Or just assemble without the message:

```bash
npm run android:assemble:release
```

**Output Location:**
```
android/app/build/outputs/apk/release/app-release.apk
```

## Prerequisites

1. **Android Project Generated**: You must run `npx expo prebuild --platform android` first
2. **Java Development Kit**: JDK must be installed
3. **Android SDK**: Android SDK and build tools must be configured

## Build Process

### Debug Build

The debug APK is automatically signed with a debug keystore and can be installed directly on devices for testing.

```bash
# Build debug APK
npm run android:apk:debug

# Install on connected device
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Release Build

The release APK requires proper signing configuration. By default, it uses the debug keystore (not recommended for production).

**For Production Release:**

1. Generate a release keystore:
   ```bash
   keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Configure signing in `android/app/build.gradle`:
   ```gradle
   signingConfigs {
       release {
           storeFile file('my-release-key.keystore')
           storePassword 'your-store-password'
           keyAlias 'my-key-alias'
           keyPassword 'your-key-password'
       }
   }
   buildTypes {
       release {
           signingConfig signingConfigs.release
       }
   }
   ```

3. Build release APK:
   ```bash
   npm run android:apk:release
   ```

## Troubleshooting

### Build Fails with "expo-build-properties not found"

Install the required package:
```bash
npm install expo-build-properties
```

### Build Fails with "Gradle not found"

Ensure you're in the project root and the `android` directory exists. Run:
```bash
npx expo prebuild --platform android
```

### APK Not Found After Build

Check the build output for errors. The APK should be in:
- Debug: `android/app/build/outputs/apk/debug/app-debug.apk`
- Release: `android/app/build/outputs/apk/release/app-release.apk`

### Windows Users

On Windows, the scripts use `./gradlew` which should work. If you encounter issues, you can manually run:
```bash
cd android
gradlew.bat assembleDebug
```

## Script Details

The scripts are defined in `package.json`:

- `android:assemble:debug` - Runs Gradle assembleDebug task
- `android:assemble:release` - Runs Gradle assembleRelease task
- `android:apk:debug` - Assembles debug APK and shows location
- `android:apk:release` - Assembles release APK and shows location

## Quick Reference

```bash
# Build and install debug APK
npm run android:apk:debug
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Build release APK (requires signing)
npm run android:apk:release

# Clean build (if needed)
cd android && ./gradlew clean && cd ..
npm run android:apk:debug
```
