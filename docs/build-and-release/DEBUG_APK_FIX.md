# Fix: "Application is waiting for debugger to attach"

## What's Happening?

When you build a debug APK, it's configured to connect to Metro bundler (the JavaScript bundler). The app waits for Metro to be running before it can start.

## Solutions

### Option 1: Start Metro Bundler (Recommended for Development)

The debug APK needs Metro to run. Start Metro and connect:

1. **Start Metro bundler**:
   ```bash
   npm start
   ```
   Or:
   ```bash
   npx expo start --dev-client
   ```

2. **Open your debug APK** on the device

3. **Connect to Metro**:
   - The app should automatically connect if on the same network
   - Or scan the QR code shown in Metro terminal
   - Or press `a` in the Metro terminal for Android

### Option 2: Build a Standalone APK (No Metro Required)

If you want an APK that runs without Metro, you need to build a release APK or configure the debug build differently.

#### Build Release APK:

```bash
npm run android:apk:release
```

**Note**: Release APK requires signing configuration. By default, it uses debug keystore.

### Option 3: Disable Debugger Wait (Advanced)

You can modify the Android build configuration to not wait for debugger, but this is not recommended as it breaks the development workflow.

## Quick Fix

**The easiest solution**: Just start Metro before opening the APK:

```bash
# Terminal 1: Start Metro
npm start

# Then open your debug APK on device
# It will connect automatically
```

## Why This Happens

- **Debug APK**: Designed for development, requires Metro bundler
- **Release APK**: Standalone, doesn't need Metro (but needs proper signing)

## For Testing Without Metro

If you need to test the app without Metro running:

1. **Build release APK** (requires signing):
   ```bash
   npm run android:apk:release
   ```

2. **Or use EAS Build** to create a standalone build:
   ```bash
   eas build --profile preview --platform android
   ```

## Recommended Workflow

For daily development:
1. Keep Metro running: `npm start`
2. Use the debug APK - it will connect automatically
3. Make code changes - app reloads automatically

For distribution/testing:
1. Build release APK with proper signing
2. Install on devices without Metro
