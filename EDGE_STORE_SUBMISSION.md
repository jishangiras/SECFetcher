# SECFetcher Microsoft Edge Add-ons Submission

## Package

Upload:

```text
dist/secfetcher-edge-v1.3.zip
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
Fast SEC EDGAR lookup for reports, events, proxies, insider, offering, ownership, and foreign issuer filings.
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
- S-1 and S-3 registration statements
- 424B prospectus filings and FWP free writing prospectuses
- SC 13D and SC 13G beneficial ownership filings
- 13F-HR institutional holdings reports
- 20-F annual reports and 6-K current reports for foreign issuers

Each result links directly to the filing on sec.gov and includes a Download button for saving the original SEC filing document.

SECFetcher is intentionally narrow: it only looks up public SEC filing data and does not collect, sell, or share personal data.

An optional donation link is available in the popup footer. Donations are not required and do not unlock features.
```

Search terms:

```text
SEC, EDGAR, SEC filings, 10-K, 10-Q, 8-K, proxy statement, DEF 14A, insider filings, Form 4, beneficial ownership, S-1, S-3, 424B, FWP, 13F, 20-F, 6-K, finance, investing, investor research, stock ticker
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
4. Click 10-K / 10-Q.
5. Confirm results appear grouped by year.
6. Click Open and confirm the SEC filing opens.
7. Click Download and confirm the filing document downloads.
8. Click the X inside the input and confirm the ticker and results clear.
```

Certification note:

```text
Version 1.3 expands user-requested SEC filing lookup categories and reorganizes the popup into grouped filing controls. SECFetcher fetches public SEC data only after a user-entered ticker search, stores only the latest visible result locally, and does not collect personal data. The optional external Stripe donation link remains optional and does not unlock features.
```
