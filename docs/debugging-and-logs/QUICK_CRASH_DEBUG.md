# Quick Guide: Debug Release APK Crashes

## Immediate Steps to See Crash Logs

### 1. Clear Logs and Capture Crash

```bash
# Clear old logs
adb logcat -c

# Open your release APK and let it crash

# Immediately after crash, run:
npm run android:logs:crash
```

### 2. View Full Stack Trace

```bash
npm run android:logs:release
```

This shows the complete error with stack trace.

### 3. Real-time Monitoring

```bash
# Watch for crashes in real-time
adb logcat *:E AndroidRuntime:E | grep -E "(FATAL|uTap|utapwallet)"
```

## Common Crash Causes & Fixes

### 1. Missing Environment Variables

**Symptom**: App crashes on startup, no Supabase connection

**Fix**: Environment variables from `.env.local` aren't bundled in release. Check if `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set.

**Solution**: The babel plugin should handle this, but verify the values are in the built bundle.

### 2. ProGuard/R8 Obfuscation

**Symptom**: `ClassNotFoundException` or `MethodNotFoundException`

**Fix**: We've added ProGuard rules. If still crashing, temporarily disable:

Edit `android/app/build.gradle`:
```gradle
release {
    minifyEnabled false  // Temporarily disable
    shrinkResources false
}
```

Rebuild:
```bash
npm run android:apk:release
```

### 3. Native Module Not Found

**Symptom**: `ExpoMifareScanner module not found`

**Fix**: Ensure module is properly linked. Run:
```bash
npx expo prebuild --clean
npm run android:apk:release
```

### 4. Missing Permissions

**Symptom**: Crashes when accessing NFC

**Fix**: Check `AndroidManifest.xml` has NFC permission (should be auto-added).

## Debugging Workflow

1. **Clear logs**: `adb logcat -c`
2. **Start monitoring**: `npm run android:logs:crash`
3. **Open release APK** on device
4. **Let it crash**
5. **Check terminal** for error messages

## View Specific Error Types

```bash
# Only React Native errors
adb logcat ReactNativeJS:E

# Only native crashes
adb logcat AndroidRuntime:E

# Only your app
adb logcat | grep -i "utap"
```

## Save Logs to File

```bash
# Save crash logs to file
adb logcat -d *:E > crash-logs.txt

# Then search the file
grep -A 20 "FATAL" crash-logs.txt
```

## Next Steps After Finding Error

1. **Note the error message** from logs
2. **Check the stack trace** - it shows which file/line crashed
3. **Fix the issue** in your code
4. **Rebuild**: `npm run android:apk:release`
5. **Test again**

## If Still Can't Find the Issue

1. **Temporarily disable minification** (see above)
2. **Add more console.log statements** in suspected areas
3. **Test with debug APK** first to see if issue exists there too
4. **Check if it's environment-specific** (only on certain devices/Android versions)
