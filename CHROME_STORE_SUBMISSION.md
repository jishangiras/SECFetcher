# SECFetcher Chrome Web Store Submission

## Package

Upload:

```text
dist/secfetcher-edge-v1.3.zip
```

The Chrome Web Store accepts the Chromium/Edge package because it uses the standard Manifest V3 service worker format.

## Store Listing

Name:
SECFetcher

Short description:
Fast SEC EDGAR lookup for reports, events, proxies, insider, offering, ownership, and foreign issuer filings.

Detailed description:
SECFetcher gives investors, analysts, and builders a fast way to jump from a stock ticker to recent SEC filings.

Use the popup to search a ticker symbol and fetch:
- 10-K and 10-Q annual and quarterly reports
- 8-K material event filings
- DEF 14A proxy statements
- Forms 3, 4, and 5 insider ownership filings
- S-1 and S-3 registration statements
- 424B prospectus filings and FWP free writing prospectuses
- SC 13D and SC 13G beneficial ownership filings
- 13F-HR institutional holdings reports
- 20-F annual reports and 6-K current reports for foreign issuers

Each result links directly to the filing on sec.gov and includes a Download button for saving the original SEC filing document to your browser's downloads folder.

SECFetcher is intentionally narrow: it only looks up public SEC filing data and does not collect, sell, or share personal data.

Category:
Productivity

Language:
English

Support contact:
Use the developer email on your Chrome Web Store developer account.

Homepage URL:
https://github.com/jishangiras/SECFetcher

Privacy policy URL:
https://github.com/jishangiras/SECFetcher/blob/main/PRIVACY_POLICY.md

Screenshot:
`store-assets/secfetcher-screenshot-1280x800.png`

Icon:
`icons/icon128.png`

## Privacy Tab

Single purpose:
SECFetcher lets users search a public company ticker and quickly open or download recent SEC filings from sec.gov, including reports, events, proxies, insider filings, offering documents, beneficial ownership filings, institutional holdings, and foreign issuer filings.

Permission justifications:
- storage: Saves the latest rendered filing results locally so the popup can restore them when reopened.
- downloads: Lets the user save selected SEC filing documents from sec.gov.
- https://www.sec.gov/*: Reads public SEC ticker data and filing documents needed for user-requested searches and downloads.
- https://data.sec.gov/*: Reads public SEC company submission data needed for user-requested filing searches.

Data collection disclosure:
Do not select any personal or sensitive data collection categories unless you later add analytics, tracking, accounts, ads, or external logging. The current extension stores only the latest visible results locally in the user's browser.

Privacy policy URL:
Publish `PRIVACY_POLICY.md` somewhere public, then use that URL in the Chrome Web Store dashboard.

## Test Instructions

1. Install the extension.
2. Open the SECFetcher popup.
3. Enter `NVDA`.
4. Click `10-K / 10-Q`.
5. Confirm recent filings appear grouped by year.
6. Click `Open` on a result and confirm it opens the SEC filing.
7. Click `Download` on a result and confirm the original SEC filing document downloads.
8. Click the `X` in the ticker input and confirm both the ticker and results clear.

## Reviewer Notes

```text
Version 1.3 expands the filing type buttons available in the popup and groups them by purpose. The extension only fetches public SEC company ticker and filing metadata from sec.gov and data.sec.gov after the user enters a ticker and clicks a filing type button.

The storage permission stores the latest rendered popup results locally in the browser.

The downloads permission is used only when the user clicks Download on a filing result.

No analytics, tracking, accounts, ads, required payments, or remote telemetry are used. The optional donation link opens Stripe outside the extension; the extension does not process payment information.
```

## Version Notes

```text
Added grouped filing controls and new SEC lookup categories for registration statements, prospectus/free writing prospectus filings, beneficial ownership filings, institutional holdings, and foreign issuer reports.
```

## Required Before Submit

- Upload package: `dist/secfetcher-edge-v1.3.zip`
- Upload screenshot: `store-assets/secfetcher-screenshot-1280x800.png`.
- Upload icon: `icons/icon128.png`.
- Provide the public privacy policy URL above.
- Confirm developer account/trader status, distribution countries, and pricing.
- Submit for review from the Chrome Developer Dashboard.
