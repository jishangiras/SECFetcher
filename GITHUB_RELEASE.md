# SECFetcher v1.1.0

SECFetcher is a lightweight browser extension for fast SEC EDGAR filing lookup by ticker.

This release adds insider ownership filings while keeping the extension simple, local-first, and focused on public SEC data.

## What's New

- Added insider filings lookup for SEC Forms 3, 4, and 5.
- Updated the popup with a dedicated `Insider Filings (Forms 3, 4, 5)` button.
- Updated the store screenshot to show insider filings results.
- Updated package metadata and listing copy for Edge and Firefox.

## Core Features

- Search ticker symbols against official SEC company data.
- Fetch recent 10-K, 10-Q, 8-K, DEF 14A, Form 3, Form 4, and Form 5 filings.
- Open filings directly on sec.gov.
- Download original SEC filing documents.
- Stores only the latest visible popup results locally in the browser.
- No analytics, no tracking, no account, and no remote telemetry.

## Release Assets

Upload these files to this GitHub release:

- `dist/secfetcher-edge-v1.1.zip`
- `dist/secfetcher-firefox-v1.1.zip`
- `store-assets/secfetcher-screenshot-1280x800.png`

SHA-256:

```text
fdf304316b33bfb1be8c45a043b5e10ab73a84f64988ea48d2130578e3927d0b  secfetcher-edge-v1.1.zip
bf918e1f1231d3008be7f35076376e1f6eeabd844dd76a5c8429b83bc2f556b9  secfetcher-firefox-v1.1.zip
cbbd9f93f009aca667fa8e82400895810e6dffd51d3ae7966cb26caa08e9941b  secfetcher-screenshot-1280x800.png
```

## Install From Release

Chromium browsers:

1. Download `secfetcher-edge-v1.1.zip`.
2. Unzip it.
3. Open your browser extensions page.
4. Enable developer mode.
5. Choose `Load unpacked`.
6. Select the unzipped folder.

Firefox:

1. Use the signed Firefox Add-ons listing when it is available.
2. For temporary testing, upload or load the Firefox package through Firefox's add-on tooling.

## Store Status

- Firefox Add-ons: v1.1 submitted.
- Microsoft Edge Add-ons: v1.0 is in review; v1.1 package is ready for submission after current review finishes.

## Keywords

SEC EDGAR, SEC filings, 10-K, 10-Q, 8-K, DEF 14A, proxy statement, Form 3, Form 4, Form 5, insider filings, beneficial ownership, annual report, quarterly report, public company filings, investor research, browser extension.
