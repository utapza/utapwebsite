# Android Logging Guide

This guide shows you how to view logs from your Android device in the terminal, especially for testing NFC/MIFARE scanning.

## Quick Start

### View MIFARE Scanner Logs Only

```bash
npm run android:logs:mifare
```

This shows only logs from:
- `MifareScanner` (Java module)
- `MifareScannerModule` (Kotlin bridge)
- `ReactNativeJS` (JavaScript console logs)
- Debug level logs

### View All App Logs

```bash
npm run android:logs:app
```

This filters for logs containing:
- MifareScanner
- MifareScannerModule
- ReactNativeJS
- uTap (your app name)

### View All Android Logs

```bash
npm run android:logs
```

Shows all logs from your device (can be very verbose).

## Prerequisites

1. **Enable USB Debugging** on your Android device:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times to enable Developer Options
   - Go to Settings → Developer Options
   - Enable "USB Debugging"

2. **Connect Device**:
   - Connect via USB cable
   - Or use wireless debugging (Android 11+)

3. **Verify Connection**:
   ```bash
   adb devices
   ```
   Should show your device listed.

## Using Logcat

### Basic Commands

**Clear logs and start fresh**:
```bash
adb logcat -c
```

**View all logs**:
```bash
adb logcat
```

**Filter by tag** (most useful):
```bash
adb logcat -s MifareScanner:MifareScannerModule
```

**Filter by log level**:
```bash
# Show only Debug and above
adb logcat *:D

# Show only Error and above
adb logcat *:E
```

**Combine filters**:
```bash
adb logcat -s MifareScanner:D MifareScannerModule:D ReactNativeJS:D
```

### Log Levels

- `V` - Verbose (most detailed)
- `D` - Debug
- `I` - Info
- `W` - Warning
- `E` - Error
- `F` - Fatal

## Testing NFC Scanning with Logs

### Step-by-Step Process

1. **Start log monitoring** (in Terminal 1):
   ```bash
   npm run android:logs:mifare
   ```

2. **Start your app** (in Terminal 2):
   ```bash
   npm start
   ```
   Then open your development build app on the device.

3. **Navigate to Scan NFC screen** in your app

4. **Start scanning** in the app

5. **Hold MIFARE card** near the device

6. **Watch the logs** in Terminal 1 - you'll see:
   ```
   MifareScanner: Starting MIFARE scanning - Discovery
   MifareScanner: Tag discovered - Discovery
   MifareScanner: MIFARE Classic detected, type: ...
   MifareScanner: Connected to MIFARE card - Discovery
   MifareScanner: Attempting authentication on sector 0 - Authentication
   MifareScanner: Successfully authenticated sector 0 - Authentication
   MifareScanner: Reading Block 0 (UID) - Reading
   MifareScanner: Block 0 (UID) read: [hex] - Reading
   MifareScanner: Reading Block 1 (Data) - Reading
   MifareScanner: Block 1 (Data) read: [hex] - Reading
   MifareScanner: Sending onCardScanned event - Success
   ReactNativeJS: [ScanNFCScreen] Card scanned event received: ...
   ```

## Advanced Filtering

### Filter by Multiple Tags

```bash
adb logcat -s MifareScanner:D MifareScannerModule:D ReactNativeJS:D ExpoMifareScanner:D
```

### Filter by Package Name

```bash
adb logcat | grep com.utap.utapwallet
```

### Save Logs to File

```bash
adb logcat -s MifareScanner:MifareScannerModule > mifare-logs.txt
```

### View Logs with Timestamps

```bash
adb logcat -v time -s MifareScanner:MifareScannerModule
```

### View Recent Logs Only

```bash
# Show last 50 lines
adb logcat -t 50 -s MifareScanner:MifareScannerModule
```

## Troubleshooting

### "adb: command not found"

**Solution**: Install Android SDK Platform Tools:
- macOS: `brew install android-platform-tools`
- Or download from: https://developer.android.com/studio/releases/platform-tools

### "no devices/emulators found"

**Solutions**:
1. Check USB connection: `adb devices`
2. Enable USB debugging on device
3. Accept the "Allow USB debugging" prompt on device
4. Try: `adb kill-server && adb start-server`

### Too Many Logs

**Solution**: Use more specific filters:
```bash
# Only show your app's logs
adb logcat -s MifareScanner:D MifareScannerModule:D

# Exclude verbose system logs
adb logcat *:S MifareScanner:D MifareScannerModule:D ReactNativeJS:D
```

### Logs Not Showing

**Solutions**:
1. Clear logs first: `adb logcat -c`
2. Make sure app is running
3. Check log level (use `:D` for debug)
4. Verify device is connected: `adb devices`

## Useful Log Patterns

### Watch for Errors Only

```bash
adb logcat *:E
```

### Watch for Your App + Errors

```bash
adb logcat | grep -E "(MifareScanner|MifareScannerModule|ERROR|Exception)"
```

### Color-Coded Logs (if using a terminal that supports it)

```bash
adb logcat -v color -s MifareScanner:MifareScannerModule
```

## Example Workflow

```bash
# Terminal 1: Start Metro
npm start

# Terminal 2: Watch MIFARE logs
npm run android:logs:mifare

# Terminal 3: (Optional) Watch JavaScript logs
adb logcat -s ReactNativeJS:D

# Now test NFC scanning in your app
# Watch Terminal 2 for native logs
# Watch Terminal 3 for JavaScript logs
```

## Tips

- **Clear logs before testing**: `adb logcat -c` gives you a clean slate
- **Use multiple terminals**: One for Metro, one for logs
- **Filter early**: Don't view all logs, filter to what you need
- **Save important logs**: Use `> file.txt` to save logs for later analysis
- **Watch for patterns**: Look for "Discovery", "Authentication", "Reading", "Success/Failure" tags in logs
