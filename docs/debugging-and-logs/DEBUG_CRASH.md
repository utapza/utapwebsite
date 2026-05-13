# Debug App Crash on Startup

## Quick Debug Steps

### 1. View Crash Logs Immediately

```bash
# Clear logs and watch for crashes
adb logcat -c
npm run android:logs:crash

# Then open your release APK
# Watch the terminal for error messages
```

### 2. Check Startup Diagnostics

The app now logs diagnostic information on startup. Look for:

```
🔍 APP STARTUP DIAGNOSTICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Diagnostics] Environment: Production
[Diagnostics] Environment Variables:
  SUPABASE_URL: ✓ Set or ✗ MISSING
  SUPABASE_ANON_KEY: ✓ Set or ✗ MISSING
[Diagnostics] Sentry: ✓ Available
[Diagnostics] Supabase Client: ✓ Initialized
```

### 3. Common Crash Causes & Fixes

#### Issue 1: Missing Environment Variables

**Symptom**: Logs show `✗ MISSING` for SUPABASE_URL or SUPABASE_ANON_KEY

**Fix**: 
1. Verify `.env.local` exists in project root
2. Check babel.config.js has `inline-dotenv` plugin
3. Rebuild: `npx expo prebuild --clean && npm run android:apk:release`

#### Issue 2: Supabase Client Error

**Symptom**: `Supabase Client: ✗ Not initialized` or `Supabase client error`

**Fix**: 
- The app now uses a placeholder client to prevent crashes
- Check that `.env.local` has valid Supabase credentials
- Verify Supabase project is active

#### Issue 3: Sentry Initialization Failure

**Symptom**: `Sentry: ✗ Not available` or Sentry errors

**Fix**:
- Sentry initialization is now wrapped in try-catch
- App should continue even if Sentry fails
- Check Sentry DSN is correct

#### Issue 4: Native Module Not Found

**Symptom**: `ExpoMifareScanner module not found`

**Fix**:
```bash
npx expo prebuild --clean
npm run android:apk:release
```

#### Issue 5: ProGuard/R8 Obfuscation

**Symptom**: `ClassNotFoundException` or `MethodNotFoundException`

**Fix**: 
- ProGuard rules have been updated
- If still crashing, temporarily disable minification:
  ```gradle
  // In android/app/build.gradle
  release {
      minifyEnabled false
      shrinkResources false
  }
  ```

## What Was Fixed

1. ✅ **Supabase Validation**: Added checks and placeholder client
2. ✅ **Error Boundaries**: Added React ErrorBoundary component
3. ✅ **Safe Initialization**: Wrapped Sentry and error handler in try-catch
4. ✅ **AuthContext Error Handling**: Added error handling for Supabase calls
5. ✅ **Startup Diagnostics**: Added logging to identify issues

## Testing the Fixes

1. **Rebuild the app**:
   ```bash
   npx expo prebuild --clean
   npm run android:apk:release
   ```

2. **Install and run**:
   ```bash
   adb install android/app/build/outputs/apk/release/app-release.apk
   ```

3. **Watch logs**:
   ```bash
   npm run android:logs:crash
   ```

4. **Check diagnostics**: Look for the startup diagnostics in logs

## If App Still Crashes

1. **Check Sentry Dashboard**: 
   - Go to https://sentry.io
   - View your project's Issues
   - Look for the crash with full stack trace

2. **Save Full Logs**:
   ```bash
   adb logcat -d > crash-full-logs.txt
   grep -A 50 "FATAL" crash-full-logs.txt
   ```

3. **Test with Debug APK**:
   - Build debug APK: `npm run android:apk:debug`
   - Run with Metro: `npm start`
   - See if it crashes there too (helps isolate if it's release-specific)

4. **Disable Features Temporarily**:
   - Comment out Sentry initialization
   - Comment out AuthContext Supabase calls
   - See if app starts (helps identify the exact cause)

## Expected Behavior After Fixes

- App should show error screen instead of crashing (ErrorBoundary)
- Logs should show diagnostic information
- Supabase errors should be caught and logged
- Sentry should capture crashes if they still occur
