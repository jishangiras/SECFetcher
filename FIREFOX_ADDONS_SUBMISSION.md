# SECFetcher Firefox Add-ons Submission

## Package

Upload:

```text
dist/secfetcher-firefox-v1.2.zip
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
Fast SEC EDGAR filing lookup for reports, events, proxies, and insider filings by ticker.
```

Description:

```text
SECFetcher is a lightweight browser extension for quickly finding, opening, and downloading public SEC filings by stock ticker.

Search a ticker symbol and fetch recent 10-K, 10-Q, 8-K, DEF 14A proxy statement, and Forms 3, 4, and 5 insider ownership filings from official SEC data sources.

Each filing can be opened directly on sec.gov or downloaded as the original SEC filing document.

SECFetcher does not collect, sell, or share personal data. The popup includes an optional external donation link; donations are not required and do not unlock features.
```

Categories:

```text
Other
```

Tags:

```text
sec, edgar, filings, finance, investing, 10-k, 10-q, 8-k, proxy, insider
```

Homepage:

```text
https://github.com/jishangiras/SECFetcher
```

Support site:

```text
https://github.com/jishangiras/SECFetcher/issues
```

Contributions URL:

```text
Leave blank if using the Stripe donation link. AMO only accepts specific supported contribution domains in this field.
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

No analytics, tracking, accounts, ads, required payments, or remote telemetry are used. The optional donation link opens Stripe outside the extension; the extension does not process payment information.
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
