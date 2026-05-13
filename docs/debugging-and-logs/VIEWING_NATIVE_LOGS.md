# Viewing Native Android Logs

This guide explains how to view native logs from the MIFARE scanner module.

## Quick Commands

### View MIFARE Module Logs Only
```bash
npm run android:logs:mifare
```

This shows logs from:
- `MifareScanner` (Java native code)
- `MifareScannerModule` (Kotlin bridge)
- `ReactNativeJS` (JavaScript console logs)

### View All Native Logs (Filtered)
```bash
npm run android:logs:native
```

This shows all logs containing "MifareScanner" or "MifareScannerModule".

### View All App Logs
```bash
npm run android:logs:app
```

This shows logs from the entire app including MIFARE scanner.

### View All Logs (Unfiltered)
```bash
npm run android:logs
```

This shows ALL Android logs (can be very verbose).

## Using ADB Directly

If you prefer to use `adb` directly:

### View MIFARE logs with specific tags
```bash
adb logcat -s MifareScanner:D MifareScannerModule:D
```

### View logs with grep filter
```bash
adb logcat | grep -E "(MifareScanner|MifareScannerModule)"
```

### Clear logs and start fresh
```bash
adb logcat -c && adb logcat -s MifareScanner:D MifareScannerModule:D
```

### View logs in real-time with timestamps
```bash
adb logcat -v time -s MifareScanner:D MifareScannerModule:D
```

## Log Levels

The module uses these log levels:
- `D` (Debug) - Detailed information about operations
- `E` (Error) - Error messages and exceptions
- `W` (Warning) - Warning messages

## What to Look For

When scanning a card, you should see logs like:

```
MifareScanner: Processing tag with UID: 5082cf3d20080400 - Discovery
MifareScanner: MIFARE Classic detected, type: TYPE_CLASSIC - Discovery
MifareScanner: Connected to MIFARE card - Discovery
MifareScanner: Card has 16 sectors - Reading
MifareScanner: Attempting authentication on sector 0 - Authentication
MifareScanner: Successfully authenticated sector 0 - Authentication
MifareScanner: Sector 0: blocks 0 to 3 (trailer at 3) - Reading
MifareScanner: Block 0 hex: 5082cf3d200804006263646566676869... - Reading
MifareScanner: Block 0 readable text: ... - Reading
MifareScanner: MIFARE data extracted, length: 234, rawData length: 1024 - Success
```

## Troubleshooting

### No logs appearing

1. **Check device is connected**:
   ```bash
   adb devices
   ```

2. **Check app is running**:
   Make sure the app is installed and running on the device.

3. **Check log buffer**:
   ```bash
   adb logcat -G 4M  # Increase buffer to 4MB
   ```

### Logs are too verbose

Use the filtered commands:
```bash
npm run android:logs:mifare
```

### Need to see errors only

```bash
adb logcat *:E MifareScanner:E MifareScannerModule:E
```

## Log Tags Used

- `MifareScanner` - Java native implementation
- `MifareScannerModule` - Kotlin Expo module bridge
- `ReactNativeJS` - JavaScript console logs

## Example Output

When scanning successfully, you'll see:

```
D/MifareScanner: Processing tag with UID: 5082cf3d20080400 - Discovery
D/MifareScanner: MIFARE Classic detected, type: TYPE_CLASSIC - Discovery
D/MifareScanner: Connected to MIFARE card - Discovery
D/MifareScanner: Card has 16 sectors - Reading
D/MifareScanner: Attempting authentication on sector 0 - Authentication
D/MifareScanner: Successfully authenticated sector 0 - Authentication
D/MifareScanner: Sector 0: blocks 0 to 3 (trailer at 3) - Reading
D/MifareScanner: Block 0 hex: 5082cf3d200804006263646566676869... - Reading
D/MifareScanner: Block 0 readable text: {"name":"Ayabonga Qwabi"... - Reading
D/MifareScanner: Found JSON in data: {"name":"Ayabonga Qwabi","studentId":"UTAP-WSU-20250123"... - Success
D/MifareScanner: MIFARE data extracted, length: 234, rawData length: 1024 - Success
D/MifareScanner: Sending onCardScanned event - Success
```
