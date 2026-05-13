# Quick Start: MIFARE Scanner Integration

## Installation Steps

### 1. Install Required Packages

```bash
npm install expo-build-properties
```

Note: `expo-modules-core` should already be included with your Expo SDK.

### 2. Create Supabase Table

Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE scanned_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  uid TEXT NOT NULL,
  card_data TEXT,
  raw_data TEXT,
  scanned_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_scanned_cards_user_id ON scanned_cards(user_id);
ALTER TABLE scanned_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own scans"
  ON scanned_cards FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### 3. Build Development Client

**Important**: You cannot use Expo Go with custom native modules!

```bash
# Install dev client
npx expo install expo-dev-client

# Generate native code
npx expo prebuild --platform android --clean

# Build and run
npx expo run:android
```

## Testing

1. Open the app on an Android device with NFC
2. Navigate to Scan NFC screen
3. Tap "Start NFC Scan"
4. Hold a MIFARE Classic card near the device
5. You should see "Scanned Successfully!" alert
6. Check Supabase `scanned_cards` table

## View Logs

```bash
adb logcat -s MifareScanner:MifareScannerModule:D
```

## What Changed

- ✅ Created Java-based MIFARE scanner module
- ✅ Updated `nfcService.js` to use new module
- ✅ Updated `ScanNFCScreen.js` with event listener
- ✅ Added Supabase integration for `scanned_cards` table
- ✅ Configured `app.json` with `expo-build-properties`

## Files Created/Modified

**Created:**
- `expo-modules/expo-mifare-scanner/android/src/main/java/expo/modules/mifarescanner/MifareScanner.java`
- `expo-modules/expo-mifare-scanner/android/src/main/java/expo/modules/mifarescanner/MifareScannerModule.kt`
- `expo-modules/expo-mifare-scanner/src/index.js`
- `expo-modules/expo-mifare-scanner/package.json`
- `expo-modules/expo-mifare-scanner/expo-module.config.json`

**Modified:**
- `src/services/nfcService.js` - Now uses ExpoMifareScanner
- `src/screens/ScanNFCScreen.js` - Added event listener and Supabase save
- `app.json` - Added expo-build-properties plugin
