# Release Process

This project is a plain WebExtension. There is no bundled/minified build step; release packages are assembled from source files.

## Current Release

Version:

```text
1.3
```

GitHub release tag:

```text
v1.3.0
```

Release assets:

```text
dist/secfetcher-edge-v1.3.zip
dist/secfetcher-firefox-v1.3.zip
store-assets/secfetcher-screenshot-1280x800.png
```

## Build Packages

Run:

```sh
node scripts/build-store-packages.js
```

This creates:

- `dist/secfetcher-edge-v1.3.zip`
- `dist/secfetcher-firefox-v1.3.zip`

The Edge package is also the Chrome Web Store package because both use the Chromium Manifest V3 service worker format.

The Firefox package uses a Firefox-compatible background script manifest and Mozilla data collection metadata.

## Generate Screenshot

Run:

```sh
node scripts/generate-store-screenshot.js
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

Confirm packages include expanded filing categories:

```sh
unzip -p dist/secfetcher-edge-v1.3.zip popup.js | rg "fetch-registration|fetch-prospectus|fetch-beneficial|fetch-13f|fetch-20f|fetch-6k"
unzip -p dist/secfetcher-firefox-v1.3.zip popup.js | rg "fetch-registration|fetch-prospectus|fetch-beneficial|fetch-13f|fetch-20f|fetch-6k"
```

Confirm unsafe HTML sinks are not used:

```sh
rg "innerHTML|insertAdjacentHTML|outerHTML|eval\\(|new Function" popup.js background.js popup.html
```

The command should return no matches.

## GitHub Release

1. Push `main`.
2. Create tag `v1.3.0`.
3. Create a GitHub release from `v1.3.0`.
4. Paste the contents of `GITHUB_RELEASE.md`.
5. Upload release assets from `dist/` and `store-assets/`.

## Store Update Notes

Chrome:

- Upload `dist/secfetcher-edge-v1.3.zip`.
- Upload `store-assets/secfetcher-screenshot-1280x800.png`.
- Version notes: `Added grouped filing controls and new SEC lookup categories for registration statements, prospectus/free writing prospectus filings, beneficial ownership filings, institutional holdings, and foreign issuer reports.`
- Reviewer note: `Version 1.3 expands user-requested SEC filing lookup categories and reorganizes the popup into grouped filing controls. SECFetcher fetches public SEC data only after a user-entered ticker search, stores only the latest visible result locally, and does not collect personal data.`

Firefox:

- Upload `dist/secfetcher-firefox-v1.3.zip`.
- Version notes: `Added grouped filing controls and new SEC lookup categories for registration statements, prospectus/free writing prospectus filings, beneficial ownership filings, institutional holdings, and foreign issuer reports.`
- Source code question: choose `No`.
- Contributions URL: leave blank if using the Stripe donation link because AMO supports only specific contribution URL domains.

Edge:

- Upload `dist/secfetcher-edge-v1.3.zip`.
- Certification note: `Version 1.3 expands user-requested SEC filing lookup categories and reorganizes the popup into grouped filing controls. The extension still fetches public SEC data only after a user-entered ticker search and does not collect personal data.`
