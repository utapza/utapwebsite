# Card Scanning and Emulation Architecture

This document explains how the system handles dual data reading for both card scanning (logical data) and card emulation (raw MIFARE data).

## Overview

The system uses a **dual data reading approach** to support both:
1. **Logical Card Data** - JSON information for display and app logic (name, studentId, university, etc.)
2. **Raw MIFARE Data** - Hex string of actual MIFARE Classic blocks for accurate card emulation

## Architecture

### Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Physical NFC Card                        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│         MifareScanner.handleTag() (Java)                    │
│                                                              │
│  STEP 1: Read Raw MIFARE Classic Blocks                    │
│  ├── Authenticate sectors with default keys                 │
│  ├── Read all blocks (including sector trailers)            │
│  └── Convert to hex string → rawMifareData                 │
│                                                              │
│  STEP 2: Read NDEF Records (if available)                   │
│  ├── Extract JSON/text from NDEF records                    │
│  └── Store NDEF message bytes → rawData                    │
│                                                              │
│  STEP 3: Data Prioritization                                │
│  ├── Prefer rawMifareData for emulation                    │
│  ├── Use NDEF data for logical information                  │
│  └── Extract JSON from raw data if NDEF unavailable        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│         onCardScanned Event (JavaScript)                    │
│                                                              │
│  {                                                           │
│    uid: "5082cf3d",                                         │
│    data: "{'name': 'John Doe', ...}",  // JSON string       │
│    rawData: "5082cf3d20080400...",     // Hex string        │
│    timestamp: 1771143686607                                 │
│  }                                                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│         cardScanService.parseNfcCardData()                   │
│                                                              │
│  ├── Extract rawData → rawNfcData (for emulation)          │
│  ├── Parse data → card fields (for display)                 │
│  └── Return structured cardData object                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│         Supabase Database Storage                           │
│                                                              │
│  cards table:                                                │
│  ├── raw_nfc_data: "5082cf3d20080400..." (hex)             │
│  ├── card_data: "{'name': 'John Doe', ...}" (JSON)         │
│  └── Other fields: name, studentId, university, etc.        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│         Card Emulation (HCE)                                │
│                                                              │
│  ├── Fetch raw_nfc_data from database                       │
│  ├── Pass to emulateCard(uid, raw_nfc_data)                │
│  ├── HCE service detects hex string                         │
│  ├── Converts hex → bytes                                   │
│  └── Emulates card using raw MIFARE block structure         │
└─────────────────────────────────────────────────────────────┘
```

## Data Types

### 1. Raw MIFARE Data (Hex String)

**Purpose**: Accurate card emulation

**Format**: Hexadecimal string representing all MIFARE Classic blocks
- Example: `"5082cf3d200804006263646566676869000003ff0143c1010000013c5402656e7b..."`
- Length: Typically 512+ hex characters (256+ bytes)
- Contains: All sector blocks including sector trailers

**Storage**: `raw_nfc_data` field in database

**Usage**: 
- Passed directly to `emulateCard()` for HCE
- HCE service automatically detects hex format and converts to bytes

### 2. Logical Card Data (JSON String)

**Purpose**: Display and app logic

**Format**: JSON string with card information
```json
{
  "name": "John Doe",
  "studentId": "UTAP-WSU-20250123",
  "university": "Walter Sisulu University",
  "faculty": "Engineering and Technology",
  "cardNumber": "WSU-99887766",
  "issuer": "Walter Sisulu University",
  "issueDate": "2024-01-15",
  "expiryDate": "2026-12-31",
  "cardType": "student_id"
}
```

**Storage**: `card_data` field in database (also parsed into individual columns)

**Usage**:
- Displayed in UI (CardItem component)
- Used for search, filtering, and app logic
- Can be used as fallback for emulation if raw data unavailable

## Implementation Details

### Java Layer (MifareScanner.java)

#### Step 1: Read Raw MIFARE Blocks

```java
// Always read raw MIFARE Classic blocks first
MifareClassic mifare = MifareClassic.get(tag);
mifare.connect();

List<Byte> allRawBytes = new ArrayList<>();

// Read all accessible sectors
for (int sectorIndex = 0; sectorIndex < sectorCount; sectorIndex++) {
    // Authenticate sector
    boolean authenticated = mifare.authenticateSectorWithKeyA(
        sectorIndex, MifareClassic.KEY_DEFAULT
    );
    
    if (authenticated) {
        // Read ALL blocks in sector (including trailer)
        for (int blockOffset = 0; blockOffset < blockCount; blockOffset++) {
            byte[] blockData = mifare.readBlock(blockNumber);
            // Collect all bytes
            for (byte b : blockData) {
                allRawBytes.add(b);
            }
        }
    }
}

// Convert to hex string
rawMifareData = bytesToHex(allRawBytes.toArray());
```

#### Step 2: Read NDEF Records

```java
// Read NDEF records for logical data
Ndef ndef = Ndef.get(tag);
if (ndef != null) {
    ndef.connect();
    NdefMessage ndefMessage = ndef.getNdefMessage();
    
    // Extract text/JSON from records
    for (NdefRecord record : records) {
        String text = parseTextRecord(record);
        allData.append(text);
    }
    
    data = allData.toString(); // JSON string
    rawData = bytesToHex(ndefMessage.toByteArray()); // NDEF bytes
}
```

#### Step 3: Prioritize Data

```java
// Use raw MIFARE data for emulation (most accurate)
if (!rawMifareData.isEmpty()) {
    rawData = rawMifareData;
}
```

### JavaScript Layer

#### cardScanService.js

```javascript
const parseNfcCardData = (scanResult) => {
  // Extract raw hex data (for emulation)
  const rawDataHex = scanResult.rawData || scanResult.raw_data;
  
  // Extract JSON data (for display)
  const dataString = scanResult.data;
  const parsedData = JSON.parse(dataString);
  
  return {
    // Logical fields
    name: parsedData.name,
    studentId: parsedData.studentId,
    // ...
    
    // Raw data for emulation
    rawNfcData: rawDataHex, // Hex string
  };
};
```

#### nfcService.js

```javascript
const readNfcTag = async () => {
  const cardData = await scanNfcTag({timeout: 10000});
  
  return {
    success: true,
    data: {
      uid: cardData.uid,
      data: cardData.data,      // JSON string
      rawData: cardData.rawData, // Hex string
    }
  };
};

const emulateCard = async (options, uid, data) => {
  // data should be raw_nfc_data (hex string) for best results
  // HCE service will auto-detect hex vs JSON
  await emulateCardFromModule(options, uid, data);
};
```

### HCE Service (MifareCardEmulationService.java)

```java
public static void setCardData(String uid, String data) {
    // Auto-detect if data is hex string or text/JSON
    if (isHexString(data)) {
        // Convert hex string to bytes (raw MIFARE data)
        cardData = hexStringToBytes(data);
    } else {
        // Convert text/JSON to bytes
        cardData = data.getBytes("UTF-8");
    }
}
```

## Database Schema

### cards table

```sql
CREATE TABLE cards (
  id VARCHAR(255) PRIMARY KEY,
  user_id UUID NOT NULL,
  name VARCHAR(255),
  student_id VARCHAR(255),
  university VARCHAR(255),
  -- ... other logical fields ...
  
  -- CRITICAL: Raw MIFARE data for emulation
  raw_nfc_data TEXT,  -- Hex string of MIFARE blocks
  
  -- Logical card data (JSON)
  card_data TEXT,     -- JSON string (optional, for reference)
  
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);
```

### scanned_cards table

```sql
CREATE TABLE scanned_cards (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  uid TEXT NOT NULL,
  
  -- Raw data from scan
  raw_data TEXT,      -- Hex string of MIFARE blocks
  
  -- Logical data from scan
  card_data TEXT,     -- JSON string
  
  scanned_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ
);
```

## Usage Examples

### Scanning a Card

```javascript
import { cardScanService } from './services/cardScanService';

const result = await cardScanService.scanAndSaveCard(userId);

// Result contains:
// - card.raw_nfc_data: Hex string for emulation
// - card.name, card.studentId, etc.: Logical fields for display
```

### Emulating a Card

```javascript
import { nfcService } from './services/nfcService';

// Fetch card from database
const card = await getCardFromDatabase(cardId);

// Use raw_nfc_data for accurate emulation
await nfcService.emulateCard(
  { enabled: true },
  card.id,              // UID
  card.raw_nfc_data    // Raw hex string (preferred)
);

// Or fallback to JSON if raw data unavailable
if (!card.raw_nfc_data) {
  await nfcService.emulateCard(
    { enabled: true },
    card.id,
    JSON.stringify(card) // Less accurate but works
  );
}
```

## Best Practices

### 1. Always Prefer Raw Data for Emulation

✅ **Good**:
```javascript
await emulateCard({ enabled: true }, card.id, card.raw_nfc_data);
```

❌ **Avoid** (unless raw data unavailable):
```javascript
await emulateCard({ enabled: true }, card.id, JSON.stringify(card));
```

### 2. Validate Raw Data Availability

```javascript
if (!card.raw_nfc_data) {
  console.warn('No raw NFC data - emulation may not work accurately');
  // Consider prompting user to re-scan card
}
```

### 3. Store Both Data Types

- Always store `raw_nfc_data` for emulation
- Store parsed logical fields for display/search
- Store `card_data` (JSON) as backup/reference

### 4. Handle Missing Data Gracefully

```javascript
// In CardItem.js
let cardDataString;
if (card.rawNfcData || card.raw_nfc_data) {
  // Use raw hex data (best)
  cardDataString = card.rawNfcData || card.raw_nfc_data;
} else {
  // Fallback to JSON (less accurate)
  cardDataString = JSON.stringify(card);
  console.warn('Using JSON fallback - emulation may be less accurate');
}
```

## Troubleshooting

### Issue: Emulation Not Working

**Symptoms**: Card emulation starts but reader doesn't recognize card

**Possible Causes**:
1. Missing `raw_nfc_data` - Card was scanned before dual-read implementation
2. Invalid hex string - Data corruption during storage
3. Incomplete block read - Some sectors couldn't be authenticated

**Solutions**:
1. Re-scan the card to get raw MIFARE data
2. Verify `raw_nfc_data` is a valid hex string (even length, hex chars only)
3. Check logs for authentication errors during scan

### Issue: No Raw Data After Scan

**Symptoms**: `rawData` is empty or null after scanning

**Possible Causes**:
1. Card doesn't support MIFARE Classic
2. All sectors require custom keys (not default keys)
3. Card is NDEF-only (no MIFARE Classic)

**Solutions**:
1. Check if card is MIFARE Classic compatible
2. Try scanning with different keys (if known)
3. Use NDEF data as fallback (less accurate emulation)

### Issue: JSON Data Missing

**Symptoms**: Card scanned but no logical fields populated

**Possible Causes**:
1. Card doesn't have NDEF records
2. JSON parsing failed
3. Card uses non-standard format

**Solutions**:
1. Check if card supports NDEF
2. Review scan logs for parsing errors
3. Manually enter card information if needed

## Technical Notes

### Hex String Format

- **Length**: Must be even (each byte = 2 hex chars)
- **Characters**: Only `0-9`, `a-f`, `A-F`
- **Example**: `"5082cf3d"` = 4 bytes = `[0x50, 0x82, 0xcf, 0x3d]`

### MIFARE Classic Structure

- **Sectors**: Typically 16 sectors (MIFARE 1K) or 40 sectors (MIFARE 4K)
- **Blocks per Sector**: 4 blocks (16 bytes each)
- **Sector Trailer**: Last block in each sector (contains keys)
- **Total Size**: 1K = 1024 bytes = 2048 hex characters

### HCE Service Detection

The HCE service uses heuristics to detect hex strings:
- Length > 64 characters
- Even length
- Only hex characters
- Doesn't start with `{` (JSON)
- Doesn't contain spaces (text)

## Component Integration

### CardItem Component

The `CardItem` component automatically handles data selection for emulation:

```javascript
// In CardItem.js - handleTapCard()
let cardDataString;
if (card.rawNfcData || card.raw_nfc_data) {
  // Prefer raw hex data for accurate emulation
  cardDataString = card.rawNfcData || card.raw_nfc_data;
} else {
  // Fallback to JSON if raw data unavailable
  const cardData = {
    id: card.id,
    name: card.name,
    studentId: card.studentId,
    // ... other fields
  };
  cardDataString = JSON.stringify(cardData);
}

await nfcService.emulateCard(
  { enabled: true },
  card.id,        // UID
  cardDataString  // Raw hex (preferred) or JSON (fallback)
);
```

This ensures the component always uses the best available data for emulation.

## Related Documentation

- [MIFARE_SCANNER_SETUP.md](./MIFARE_SCANNER_SETUP.md) - Scanner setup guide
- [MODULE_ARCHITECTURE.md](./MODULE_ARCHITECTURE.md) - Module architecture
- [HCE_USAGE.md](../expo-mifare-scanner/HCE_USAGE.md) - HCE usage guide (if exists)

## Summary

The dual data reading system ensures:
1. **Accurate Emulation**: Raw MIFARE block data provides exact card structure
2. **Rich Display**: JSON data provides readable card information
3. **Backward Compatibility**: Falls back to JSON if raw data unavailable
4. **Flexibility**: Supports both NDEF and MIFARE Classic cards

Always prefer `raw_nfc_data` (hex string) for emulation, and use logical fields (JSON) for display and app logic.
