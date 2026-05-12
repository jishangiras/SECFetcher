# SECFetcher Firefox Add-ons Submission

## Package

Upload:

```text
dist/secfetcher-firefox-v1.0.zip
```

Firefox needs a Firefox-specific package because Firefox does not support `background.service_worker` in the same way Chrome and Edge do. The Firefox package uses:

```json
"background": {
  "scripts": ["background.js"]
}
```

## Developer Hub

Submit through Mozilla Add-ons Developer Hub:

https://addons.mozilla.org/developers/

Firefox release builds require extensions to be signed by Mozilla. Add-ons submitted through AMO are signed through the review/signing process.

## Listing Fields

Name:

```text
SECFetcher
```

Summary:

```text
Fast SEC EDGAR filing lookup for 10-K, 10-Q, 8-K, and proxy statements by ticker.
```

Description:

```text
SECFetcher is a lightweight browser extension for quickly finding, opening, and downloading public SEC filings by stock ticker.

Search a ticker symbol and fetch recent 10-K, 10-Q, 8-K, and DEF 14A proxy statement filings from official SEC data sources.

Each filing can be opened directly on sec.gov or downloaded as the original SEC filing document.

SECFetcher does not collect, sell, or share personal data.
```

Categories:

```text
Other
```

Tags:

```text
sec, edgar, filings, finance, investing, 10-k, 10-q, 8-k, proxy
```

Homepage:

```text
https://github.com/jishangiras/SECFetcher
```

Support site:

```text
https://github.com/jishangiras/SECFetcher/issues
```

Privacy policy:

Use the contents of:

```text
PRIVACY_POLICY.md
```

## Reviewer Notes

```text
SECFetcher fetches public SEC company ticker and filing metadata from sec.gov and data.sec.gov only after the user enters a ticker and clicks a filing type button.

The storage permission stores the latest rendered popup results locally in the browser.

The downloads permission is used only when the user clicks Download on a filing result.

No analytics, tracking, accounts, ads, or remote telemetry are used.
```

## Manual Test

```text
1. Install the submitted add-on.
2. Open the SECFetcher popup.
3. Enter NVDA.
4. Click 10-K & 10-Q Filings.
5. Confirm results appear.
6. Click Open and confirm the SEC filing opens.
7. Click Download and confirm the filing document downloads.
8. Click the X inside the input and confirm the ticker and results clear.
```
