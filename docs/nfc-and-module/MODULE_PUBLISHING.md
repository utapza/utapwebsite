# Publishing Guide for expo-mifare-scanner

## What to Include/Exclude

### ✅ Include (Published to npm)

These files are **required** and will be published:

- ✅ `src/index.js` - JavaScript interface
- ✅ `android/src/` - Native source code (Java/Kotlin)
- ✅ `android/build.gradle` - Build configuration
- ✅ `expo-module.config.json` - Module registration
- ✅ `app.plugin.js` - Config plugin
- ✅ `package.json` - Module metadata
- ✅ `README.md` - Documentation

### ❌ Exclude (NOT Published)

These are build artifacts and should **NOT** be published:

- ❌ `android/build/` - Compiled classes, generated files
- ❌ `android/.gradle/` - Gradle cache
- ❌ `android/local.properties` - Local SDK paths
- ❌ `node_modules/` - Dependencies
- ❌ `.git/` - Git repository
- ❌ IDE files (`.idea/`, `.vscode/`)

## Why Exclude Build Artifacts?

1. **Size**: Build artifacts can be large (MBs)
2. **Platform-specific**: Build artifacts are machine-specific
3. **Regenerated**: Gradle will regenerate them during app build
4. **Unnecessary**: Source code is what matters, not compiled output

## How npm Handles This

The `package.json` has a `files` field that explicitly lists what to include:

```json
{
  "files": [
    "src",
    "android/src",
    "android/build.gradle",
    "expo-module.config.json",
    "app.plugin.js",
    "README.md"
  ]
}
```

Additionally, `.npmignore` excludes build artifacts even if they exist.

## Before Publishing

1. **Clean build artifacts**:
   ```bash
   rm -rf android/build android/.gradle
   ```

2. **Verify what will be published**:
   ```bash
   npm pack --dry-run
   ```
   This shows what files would be included in the tarball.

3. **Test locally**:
   ```bash
   npm pack
   # Creates a .tgz file
   # Test installing it in another project
   ```

## Publishing Steps

```bash
# 1. Clean build artifacts
rm -rf android/build android/.gradle

# 2. Verify package contents
npm pack --dry-run

# 3. Login to npm (if not already)
npm login

# 4. Publish
npm publish --access public

# 5. Verify it's published
npm view @utapza/expo-mifare-scanner
```

## After Publishing

When someone installs your package:

1. They get the **source files** (not build artifacts)
2. Expo autolinking detects the module
3. Gradle **compiles** the native code during their app build
4. Everything works! ✅

The build artifacts are generated on the **user's machine** during their app build, not from your published package.
