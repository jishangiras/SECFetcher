# Release Process

This project is a plain WebExtension. There is no bundled/minified build step; release packages are assembled from source files.

## Current Release

Version:

```text
1.1
```

GitHub release tag:

```text
v1.1.0
```

Release assets:

```text
dist/secfetcher-edge-v1.1.zip
dist/secfetcher-firefox-v1.1.zip
store-assets/secfetcher-screenshot-1280x800.png
```

## Build Packages

Run:

```sh
node scripts/build-store-packages.js
```

This creates:

- `dist/secfetcher-edge-v1.1.zip`
- `dist/secfetcher-firefox-v1.1.zip`

The Edge package uses Chromium Manifest V3 service workers.

The Firefox package uses a Firefox-compatible background script manifest and Mozilla data collection metadata.

## Generate Screenshot

Run:

```sh
NODE_PATH=/Users/jishangiras/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules \
/Users/jishangiras/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/generate-store-screenshot.js
```

Output:

```text
store-assets/secfetcher-screenshot-1280x800.png
```

## Verify Release

Run syntax checks:

```sh
node --check popup.js
node --check background.js
node --check scripts/build-store-packages.js
node --check scripts/generate-store-screenshot.js
```

Confirm packages include insider filings:

```sh
unzip -p dist/secfetcher-edge-v1.1.zip popup.js | rg "fetch-insider|\\['3', '4', '5'\\]"
unzip -p dist/secfetcher-firefox-v1.1.zip popup.js | rg "fetch-insider|\\['3', '4', '5'\\]"
```

Confirm unsafe HTML sinks are not used:

```sh
rg "innerHTML|insertAdjacentHTML|outerHTML|eval\\(|new Function" popup.js background.js popup.html
```

The command should return no matches.

## GitHub Release

1. Push `main`.
2. Create tag `v1.1.0`.
3. Create a GitHub release from `v1.1.0`.
4. Paste the contents of `GITHUB_RELEASE.md`.
5. Upload release assets from `dist/` and `store-assets/`.

## Store Update Notes

Firefox:

- Upload `dist/secfetcher-firefox-v1.1.zip`.
- Version notes: `Added insider filings lookup for SEC Forms 3, 4, and 5.`
- Source code question: choose `No`.

Edge:

- Upload `dist/secfetcher-edge-v1.1.zip`.
- If v1.0 is in review, wait for that review to complete before publishing v1.1.
- Certification note: `Version 1.1 adds insider filings lookup for SEC Forms 3, 4, and 5.`
