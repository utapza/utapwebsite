# Sentry Crash Reporting Setup

Sentry has been integrated into your app for crash reporting and error tracking.

## Configuration

- **DSN**: Configured in `src/config/sentry.js`
- **Initialization**: Done in `App.js` on app startup
- **Error Handling**: Integrated with `src/utils/errorHandler.js`

## What Gets Tracked

1. **Uncaught JavaScript Errors** - Automatically captured
2. **Unhandled Promise Rejections** - Automatically captured
3. **Native Crashes** - Android/iOS native crashes
4. **Manual Error Logging** - Using `logError()` function

## Viewing Crashes

1. Go to your Sentry dashboard: https://sentry.io
2. Navigate to your project
3. View Issues tab for all crashes and errors
4. Click on an issue to see:
   - Stack trace
   - Device information
   - User context
   - Breadcrumbs (user actions before crash)

## Manual Error Reporting

You can manually report errors:

```javascript
import * as Sentry from '@sentry/react-native';

// Report an error
Sentry.captureException(new Error('Something went wrong'));

// Report a message
Sentry.captureMessage('Something important happened', 'info');

// Add context
Sentry.setUser({ id: '123', email: 'user@example.com' });
Sentry.setTag('screen', 'ScanNFCScreen');
Sentry.setContext('card_scan', { uid: 'abc123' });
```

## Testing Sentry

To test if Sentry is working:

1. **Test Error Capture**:
   ```javascript
   // Add this temporarily to test
   throw new Error('Test Sentry error');
   ```

2. **Check Sentry Dashboard**:
   - The error should appear within a few seconds
   - You'll see the stack trace and device info

## Environment

- **Development**: Debug mode enabled, 100% trace sampling
- **Production**: Normal mode, 20% trace sampling

## Next Steps

1. **Rebuild your app** to include Sentry:
   ```bash
   npx expo prebuild --clean
   npx expo run:android
   ```

2. **Test the integration** by triggering an error

3. **Check Sentry dashboard** to see if errors are being captured

## Troubleshooting

### Errors not appearing in Sentry

1. Check internet connection on device
2. Verify DSN is correct in `src/config/sentry.js`
3. Check Sentry dashboard for any configuration issues
4. Look for Sentry errors in console: `adb logcat | grep Sentry`

### Native crashes not showing

- Ensure `enableNative: true` in Sentry config
- Rebuild native app after adding Sentry
- Check that native Sentry SDK is properly linked

## Removing Sentry (if needed)

1. Remove `initSentry()` call from `App.js`
2. Remove Sentry imports from error handler
3. Uninstall: `npm uninstall @sentry/react-native`
4. Rebuild app
