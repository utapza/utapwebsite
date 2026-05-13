# Debugging Release APK Crashes

Release APKs crash silently and don't show logs by default. Here's how to debug them.

## Quick Solution: View Crash Logs

### View All App Logs (Including Crashes)

```bash
npm run android:logs:crash
```

This shows:
- All errors and crashes
- Your app's logs
- Stack traces

### View Only Errors and Crashes

```bash
adb logcat *:E | grep -E "(uTap|utapwallet|AndroidRuntime|FATAL)"
```

## Step-by-Step Debugging

### 1. View Crash Logs Immediately After Crash

```bash
# Clear old logs
adb logcat -c

# Open your release APK and let it crash

# Then immediately run:
adb logcat -d | grep -E "(FATAL|AndroidRuntime|Exception|Error|uTap)"
```

### 2. View Full Stack Trace

```bash
adb logcat -d *:E AndroidRuntime:E | grep -A 20 "FATAL EXCEPTION"
```

### 3. View Your App's Specific Logs

```bash
adb logcat -s ReactNativeJS:E ReactNativeJS:W | grep -E "(Error|Exception|Warning)"
```

## Enable Logging in Release Build

We can modify the release build to include logging. See the build.gradle changes below.

## Common Crash Causes in Release Builds

1. **Missing Environment Variables** - `.env.local` not bundled
2. **ProGuard/R8 Minification** - Code obfuscation breaking things
3. **Missing Native Modules** - Modules not included in release
4. **Supabase Connection Issues** - Network/API errors
5. **Missing Permissions** - NFC or other permissions

## Solutions

### Solution 1: Disable Code Minification (Temporary)

Edit `android/app/build.gradle` and set:
```gradle
buildTypes {
    release {
        minifyEnabled false  // Disable for debugging
        shrinkResources false
    }
}
```

Then rebuild:
```bash
npm run android:apk:release
```

### Solution 2: Add Crash Reporting

We can add Sentry or similar for production crash reporting.

### Solution 3: Enable Logging in Release

See the build.gradle modification below to enable logging in release builds.
