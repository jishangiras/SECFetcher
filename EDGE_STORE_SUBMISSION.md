# SECFetcher Microsoft Edge Add-ons Submission

## Package

Upload:

```text
dist/secfetcher-edge-v1.1.zip
```

Microsoft Edge Add-ons accepts a `.zip` extension package that contains the extension manifest and required files.

## Developer Account

Register in Microsoft Partner Center for the Microsoft Edge program:

https://partner.microsoft.com/dashboard/microsoftedge/overview

Microsoft states there is no registration fee for submitting extensions to the Microsoft Edge program.

## Listing Fields

Display name:

```text
SECFetcher
```

Short description:

```text
Fast SEC EDGAR filing lookup for reports, events, proxies, and insider filings by ticker.
```

Description:

```text
SECFetcher is a lightweight browser extension for quickly finding, opening, and downloading public SEC filings by stock ticker.

Use the popup to search a ticker symbol and fetch recent:
- 10-K annual reports
- 10-Q quarterly reports
- 8-K material event filings
- DEF 14A proxy statements
- Forms 3, 4, and 5 insider ownership filings

Each result links directly to the filing on sec.gov and includes a Download button for saving the original SEC filing document.

SECFetcher is intentionally narrow: it only looks up public SEC filing data and does not collect, sell, or share personal data.
```

Search terms:

```text
SEC, EDGAR, SEC filings, 10-K, 10-Q, 8-K, proxy statement, DEF 14A, insider filings, Form 4, beneficial ownership, finance, investing, investor research, stock ticker
```

Category:

```text
Productivity
```

Website URL:

```text
https://github.com/jishangiras/SECFetcher
```

Privacy policy URL:

```text
https://github.com/jishangiras/SECFetcher/blob/main/PRIVACY_POLICY.md
```

Support contact:

Use your public support email or GitHub issues URL:

```text
https://github.com/jishangiras/SECFetcher/issues
```

Mature content:

```text
No
```

## Assets

Screenshot:

```text
store-assets/secfetcher-screenshot-1280x800.png
```

Logo:

```text
icons/icon128.png
```

## Testing Notes

```text
1. Install the extension in Microsoft Edge.
2. Open the SECFetcher popup.
3. Enter NVDA.
4. Click 10-K & 10-Q Filings.
5. Confirm results appear grouped by year.
6. Click Open and confirm the SEC filing opens.
7. Click Download and confirm the filing document downloads.
8. Click the X inside the input and confirm the ticker and results clear.
```
