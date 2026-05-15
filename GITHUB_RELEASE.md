# SECFetcher v1.2.0

SECFetcher is a lightweight browser extension for fast SEC EDGAR filing lookup by ticker.

This release adds optional donation-link support while keeping the extension simple, local-first, and focused on public SEC data.

## What's New

- Added an optional Stripe donation link in the popup footer.
- Clarified in docs and store notes that donations are optional and do not unlock features.
- Removed stale placeholder Firefox metadata from the base manifest; Firefox-specific metadata is generated in the Firefox package.

## Core Features

- Search ticker symbols against official SEC company data.
- Fetch recent 10-K, 10-Q, 8-K, DEF 14A, Form 3, Form 4, and Form 5 filings.
- Open filings directly on sec.gov.
- Download original SEC filing documents.
- Stores only the latest visible popup results locally in the browser.
- No analytics, no tracking, no account, no required payment, and no remote telemetry.

## Release Assets

Upload these files to this GitHub release:

- `dist/secfetcher-edge-v1.2.zip`
- `dist/secfetcher-firefox-v1.2.zip`
- `store-assets/secfetcher-screenshot-1280x800.png`

SHA-256:

```text
a544787d30ed973f6804645956752af8269998326c2b959eaa0e10ee69c824c0  secfetcher-edge-v1.2.zip
98eb2eead0dab0ee2bd2f5e5a60c21589d89d31f02805b061950eb1fe282cf93  secfetcher-firefox-v1.2.zip
16bc6476458416c3036f8ad0e3a31be301a688bc12d2e36fad927509b643fb69  secfetcher-screenshot-1280x800.png
```

## Install From Release

Chromium browsers:

1. Download `secfetcher-edge-v1.2.zip`.
2. Unzip it.
3. Open your browser extensions page.
4. Enable developer mode.
5. Choose `Load unpacked`.
6. Select the unzipped folder.

Firefox:

1. Use the signed Firefox Add-ons listing when it is available.
2. For temporary testing, upload or load the Firefox package through Firefox's add-on tooling.

## Store Status

- Firefox Add-ons: v1.1 submitted; v1.2 package is ready for a follow-up donation-link update.
- Microsoft Edge Add-ons: v1.0 is in review; v1.2 package is ready for submission after current review finishes.

## Keywords

SEC EDGAR, SEC filings, 10-K, 10-Q, 8-K, DEF 14A, proxy statement, Form 3, Form 4, Form 5, insider filings, beneficial ownership, annual report, quarterly report, public company filings, investor research, browser extension.
