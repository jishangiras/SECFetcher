# SECFetcher Chrome Web Store Submission

## Store Listing

Name:
SECFetcher

Short description:
Quickly find, open, and download SEC reports, events, proxies, and insider filings by ticker.

Detailed description:
SECFetcher gives investors, analysts, and builders a fast way to jump from a stock ticker to recent SEC filings.

Use the popup to search a ticker symbol and fetch:
- 10-K and 10-Q annual and quarterly reports
- 8-K material event filings
- DEF 14A proxy statements
- Forms 3, 4, and 5 insider ownership filings

Each result links directly to the filing on sec.gov and includes a Download button for saving the original SEC filing document to your browser's downloads folder.

SECFetcher is intentionally narrow: it only looks up public SEC filing data and does not collect, sell, or share personal data.

Category:
Productivity

Language:
English

Support contact:
Use the developer email on your Chrome Web Store developer account.

## Privacy Tab

Single purpose:
SECFetcher lets users search a public company ticker and quickly open or download recent SEC filings from sec.gov, including Forms 3, 4, and 5 insider ownership filings.

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
4. Click `10-K & 10-Q Filings`.
5. Confirm recent filings appear grouped by year.
6. Click `Open` on a result and confirm it opens the SEC filing.
7. Click `Download` on a result and confirm the original SEC filing document downloads.
8. Click the `X` in the ticker input and confirm both the ticker and results clear.

## Required Before Submit

- Upload package: `dist/secfetcher-edge-v1.1.zip`
- Upload at least one screenshot: 1280x800 or 640x400.
- Provide a public privacy policy URL.
- Confirm developer account/trader status, distribution countries, and pricing.
- Submit for review from the Chrome Developer Dashboard.
