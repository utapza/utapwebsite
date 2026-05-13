# MIFARE Scanner Setup Guide

This guide explains how to set up and use the custom ExpoMifareScanner module for scanning MIFARE Classic cards.

## Overview

The ExpoMifareScanner module replaces `react-native-nfc-manager` with a custom native implementation that can handle MIFARE Classic cards that the standard library cannot process.

## Architecture

- **Native Module (Java)**: `MifareScanner.java` - Core MIFARE scanning logic
- **Expo Module Bridge (Kotlin)**: `MifareScannerModule.kt` - Bridges Java to Expo
- **JavaScript Interface**: `expo-modules/expo-mifare-scanner/src/index.js`
- **Service Layer**: `src/services/nfcService.js` - Updated to use new module
- **UI Integration**: `src/screens/ScanNFCScreen.js` - Event listener and Supabase integration

## Prerequisites

1. **Install Dependencies**

   ```bash
   npm install
   ```

   The following packages are required:
   - `expo-build-properties` (for Android build configuration)
   - `expo-modules-core` (for Expo modules)

2. **Create Supabase Table**

   Create the `scanned_cards` table in your Supabase database:

   ```sql
   CREATE TABLE scanned_cards (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
     uid TEXT NOT NULL,
     card_data TEXT,
     raw_data TEXT,
     scanned_at TIMESTAMPTZ,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Create indexes
   CREATE INDEX idx_scanned_cards_user_id ON scanned_cards(user_id);
   CREATE INDEX idx_scanned_cards_uid ON scanned_cards(uid);

   -- Enable RLS
   ALTER TABLE scanned_cards ENABLE ROW LEVEL SECURITY;

   -- Create policies
   CREATE POLICY "Users can view their own scans"
     ON scanned_cards FOR SELECT
     USING (auth.uid() = user_id);

   CREATE POLICY "Users can insert their own scans"
     ON scanned_cards FOR INSERT
     WITH CHECK (auth.uid() = user_id);
   ```

## Setup Steps

### Step 1: Install Expo Dev Client

Since this uses custom native code, you **cannot use Expo Go**. You must use a development build:

```bash
npx expo install expo-dev-client
```

### Step 2: Run Prebuild

Generate the native Android project with the custom module:

```bash
npx expo prebuild --platform android --clean
```

The `--clean` flag ensures a fresh build with the new module.

### Step 3: Build Development APK

Build and install the development build on your device:

```bash
npx expo run:android
```

This will:
1. Compile the Java MIFARE scanner module
2. Link the Expo module
3. Build and install the APK on your connected device/emulator

## How It Works

### Native Flow (Java)

1. **Discovery**: `enableReaderMode` detects NFC tags
   - Logged: `"Tag discovered - Discovery"`

2. **Authentication**: Authenticates sector 0 with `MifareClassic.KEY_DEFAULT`
   - Logged: `"Attempting authentication on sector 0 - Authentication"`
   - Logged: `"Successfully authenticated sector 0 - Authentication"` or `"Failed to authenticate - Authentication failed"`

3. **Reading**: Reads Block 0 (UID) and Block 1 (Data)
   - Logged: `"Reading Block 0 (UID) - Reading"`
   - Logged: `"Block 0 (UID) read: [hex] - Reading"`
   - Logged: `"Reading Block 1 (Data) - Reading"`
   - Logged: `"Block 1 (Data) read: [hex] - Reading"`

4. **Success/Failure**: Final status
   - Logged: `"Sending onCardScanned event - Success"` or `"Tag handling failed - Failure"`

### JavaScript Flow

1. **Event Listener**: `ScanNFCScreen.js` listens for `onCardScanned` events
2. **Supabase Save**: Automatically saves to `scanned_cards` table
3. **UI Alert**: Shows "Scanned Successfully!" alert with card details

## Viewing Logs

To see the detailed native logs:

```bash
adb logcat -s MifareScanner:MifareScannerModule:D
```

Or filter by tag:

```bash
adb logcat | grep -E "(MifareScanner|MifareScannerModule)"
```

## Testing

1. **Start the app** on a device with NFC support
2. **Navigate** to the Scan NFC screen
3. **Tap "Start NFC Scan"**
4. **Hold** a MIFARE Classic card near the device
5. **Wait** for the "Scanned Successfully!" alert
6. **Check** Supabase `scanned_cards` table for the saved record

## Troubleshooting

### Module Not Found

**Error**: `ExpoMifareScanner native module not found`

**Solution**:
1. Ensure you're using a development build (not Expo Go)
2. Run `npx expo prebuild --clean`
3. Rebuild: `npx expo run:android`

### NFC Not Working

**Error**: NFC is not enabled or not supported

**Solution**:
1. Check NFC is enabled in device settings
2. Verify device supports NFC
3. Check AndroidManifest.xml has NFC permission (should be auto-added)

### Authentication Failures

**Error**: `Failed to authenticate sector 0`

**Solution**:
- Some MIFARE cards use custom keys instead of the default key
- Check Logcat for detailed error messages
- The card may not be MIFARE Classic format

### Supabase Errors

**Error**: Failed to save scan

**Solution**:
1. Verify `scanned_cards` table exists
2. Check RLS policies allow user to insert
3. Ensure user is authenticated
4. Check Supabase connection in `.env.local`

## File Structure

```
expo-modules/expo-mifare-scanner/
├── android/src/main/java/expo/modules/mifarescanner/
│   ├── MifareScanner.java          # Java MIFARE implementation
│   └── MifareScannerModule.kt     # Expo module bridge
├── src/
│   └── index.js                    # JavaScript interface
├── package.json
└── expo-module.config.json

src/
├── services/
│   └── nfcService.js               # Updated to use new module
└── screens/
    └── ScanNFCScreen.js            # Event listener + Supabase
```

## Key Features

✅ **Java Implementation**: Core logic in Java as requested  
✅ **Heavy Logging**: Log.d at every step (Discovery, Authentication, Reading, Success/Failure)  
✅ **Event-Based**: `onCardScanned` event emitter  
✅ **Supabase Integration**: Automatic save to `scanned_cards` table  
✅ **UI Feedback**: "Scanned Successfully!" alert  
✅ **Backward Compatible**: Same function signatures in `nfcService.js`

## Next Steps

1. Test with your MIFARE university cards
2. Monitor Logcat for debugging
3. Verify data in Supabase `scanned_cards` table
4. Customize UI as needed
