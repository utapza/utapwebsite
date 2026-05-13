# Development Build Guide

This guide explains how to create and use a development build for your app with custom native modules (ExpoMifareScanner).

## What is a Development Build?

A development build is a custom version of your app that includes your native code. Unlike Expo Go, it can run custom native modules like the MIFARE scanner.

## Prerequisites

1. **Install Expo Dev Client** (already in your dependencies):
   ```bash
   npx expo install expo-dev-client
   ```

2. **Android Studio** (for Android builds)
   - Download from: https://developer.android.com/studio
   - Install Android SDK and build tools

3. **Java Development Kit (JDK)**
   - JDK 17 or later recommended

## Step-by-Step Setup

### Option 1: Build Locally (Recommended for Development)

#### For Android:

1. **Generate Native Code**:
   ```bash
   npx expo prebuild --platform android
   ```
   This creates the `android/` directory with native code.

2. **Build and Install Development Build**:
   ```bash
   npx expo run:android
   ```
   This will:
   - Build the native Android app
   - Install it on your connected device/emulator
   - Start Metro bundler automatically

3. **Start Development Server** (if not auto-started):
   ```bash
   npm start
   ```
   Or:
   ```bash
   npx expo start --dev-client
   ```

#### For iOS (macOS only):

1. **Generate Native Code**:
   ```bash
   npx expo prebuild --platform ios
   ```

2. **Install CocoaPods Dependencies**:
   ```bash
   cd ios
   pod install
   cd ..
   ```

3. **Build and Install**:
   ```bash
   npx expo run:ios
   ```

### Option 2: Build with EAS (Expo Application Services)

1. **Install EAS CLI**:
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**:
   ```bash
   eas login
   ```

3. **Configure EAS** (if not already done):
   ```bash
   eas build:configure
   ```

4. **Build Development Build**:
   ```bash
   eas build --profile development --platform android
   ```
   Or for iOS:
   ```bash
   eas build --profile development --platform ios
   ```

5. **Install on Device**:
   - Android: Download APK from the build page and install
   - iOS: Install via TestFlight or direct download

## Using the Development Build

### First Time Setup

1. **Build the app** using one of the methods above
2. **Install on your device** (automatically done with `expo run:android/ios`)
3. **Open the app** - it will show the Expo dev menu

### Daily Development Workflow

1. **Start Metro Bundler**:
   ```bash
   npm start
   ```
   Or:
   ```bash
   npx expo start --dev-client
   ```

2. **Open the Development Build app** on your device

3. **Connect to Metro**:
   - The app will automatically connect if on the same network
   - Or scan the QR code shown in the terminal
   - Or press `a` (Android) or `i` (iOS) in the terminal

4. **Make code changes** - The app will reload automatically (Fast Refresh)

### Development Menu

When the development build is running, you can:

- **Shake device** (or press `Cmd+D` on iOS simulator / `Cmd+M` on Android emulator)
- **Press `r`** in terminal to reload
- **Press `m`** to open dev menu

## Key Differences from Expo Go

| Feature | Expo Go | Development Build |
|---------|---------|-------------------|
| Custom Native Modules | ❌ No | ✅ Yes |
| Expo SDK Updates | Automatic | Manual (rebuild needed) |
| Native Code Changes | ❌ No | ✅ Yes |
| App Size | Small | Larger |
| Build Time | Instant | 5-15 minutes |

## Troubleshooting

### "Development build not found"

**Solution**: Make sure you've built and installed the development build:
```bash
npx expo run:android
```

### "Unable to connect to Metro"

**Solutions**:
1. Ensure device and computer are on the same network
2. Use tunnel mode: `npx expo start --tunnel`
3. Check firewall settings
4. Try restarting Metro: `npm start -- --reset-cache`

### "Module not found" errors

**Solution**: Rebuild the native app after adding new native modules:
```bash
npx expo prebuild --clean
npx expo run:android
```

### Changes to native code not appearing

**Solution**: Rebuild the app (native changes require a rebuild):
```bash
npx expo run:android
```

## Quick Reference Commands

```bash
# Build and run Android development build
npx expo run:android

# Build and run iOS development build
npx expo run:ios

# Start Metro bundler
npm start
# or
npx expo start --dev-client

# Clean and rebuild
npx expo prebuild --clean
npx expo run:android

# Build debug APK
npm run android:apk:debug
```

## Workflow Summary

1. **Initial Setup** (one time):
   ```bash
   npx expo install expo-dev-client
   npx expo prebuild --platform android
   npx expo run:android
   ```

2. **Daily Development**:
   ```bash
   # Terminal 1: Start Metro
   npm start
   
   # Terminal 2: Build if native code changed
   npx expo run:android
   ```

3. **Making Changes**:
   - **JavaScript changes**: Save file, app reloads automatically
   - **Native code changes**: Rebuild with `npx expo run:android`
   - **New native modules**: Run `npx expo prebuild --clean` then rebuild

## Tips

- **Keep the development build installed** on your device - you only need to rebuild when native code changes
- **Use Fast Refresh** for JavaScript changes - no rebuild needed
- **For testing on multiple devices**, build once and share the APK/IPA
- **Use EAS Build** if you need to test on devices you don't have physical access to
