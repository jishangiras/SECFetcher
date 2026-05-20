# SECFetcher — Project Context

## What Is SECFetcher?
SECFetcher is a lightweight browser extension that lets investors, analysts, and students quickly look up and download public SEC EDGAR filings by stock ticker — without navigating EDGAR's slow interface. It is published on the Chrome Web Store, Microsoft Edge Add-ons, and Firefox Add-ons.

**Key value**: Type a ticker → get the last 5-10 filings of each type in one click → open on sec.gov or download the original document. No account, no analytics, no tracking.

---

## Tech Stack
- **Language**: Vanilla JavaScript (ES6+), no framework, no build step
- **Manifest**: V3 (Chrome/Edge), MV3-compatible Firefox build
- **Permissions**: `storage` (last results), `activeTab`, no host permissions
- **Background**: `background.js` — service worker, handles `fetchSEC` messages (all network requests go through the background to avoid CORS issues)
- **Popup**: `popup.html` + `popup.js` — all UI logic, no shadow DOM

## File Map
| File | Purpose |
|---|---|
| `manifest.json` | Extension manifest (Chrome/Edge MV3) |
| `popup.html` | Extension popup UI (480px wide) |
| `popup.js` | All popup logic: ticker input, SEC API calls, result rendering, download |
| `background.js` | Service worker: proxies `fetchSEC` fetch requests from popup |
| `icons/` | Extension icons (16, 48, 128px) |
| `scripts/` | Build helpers for store packages and screenshots |
| `store-assets/` | Screenshots, promo tiles for store listings |

## How It Works
1. User types ticker in popup → clicks a filing type button
2. `popup.js` sends `{ action: "fetchSEC", url }` to `background.js` via `chrome.runtime.sendMessage`
3. `background.js` fetches `https://data.sec.gov/submissions/CIK{cik}.json` and EDGAR full-text API
4. Results rendered in popup with "Open" and "Download" buttons per filing
5. Results cached in `chrome.storage.local` as `latestResults` for session persistence

## SEC APIs Used
- `https://efts.sec.gov/LATEST/search-index?q=%22{ticker}%22&dateRange=custom&...` — ticker → CIK lookup
- `https://data.sec.gov/submissions/CIK{cik}.json` — filing list by CIK
- `https://www.sec.gov/Archives/edgar/data/{cik}/{accession}/` — filing index
- `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&...` — fallback

## Filing Types Supported
- 10-K & 10-Q (annual + quarterly reports)
- 8-K (material events)
- DEF 14A (proxy statements)
- Forms 3, 4, 5 (insider filings)

## Local Development
No build step required.
1. Open `chrome://extensions`
2. Enable Developer mode
3. "Load unpacked" → select this folder
4. Reload after any JS/HTML changes

## Publishing / Store Builds
```bash
node scripts/build-store-packages.js   # creates zip files for each store
```
Builds: Chrome/Edge zip, Firefox zip (adjusts manifest for MV3 Firefox differences).

Store listings:
- Chrome: https://chrome.google.com/webstore/detail/secfetcher
- Edge: https://microsoftedge.microsoft.com/addons/detail/secfetcher
- Firefox: https://addons.mozilla.org/en-US/firefox/addon/secfetcher

## Donations
No backend — uses Stripe Payment Link embedded in `popup.html` footer.
- **Link**: https://donate.stripe.com/6oU4gzcYecNU6ha1Vs2sM01
- Custom amount, min $1, default $5
- Stripe account: 1Labs (`acct_18hXnKE3FNscJyVT`)
- To update: replace `href` in `.footer a` in `popup.html`, update `../STRIPE.md`

## Coding Conventions
- No framework, no bundler — keep it simple
- All UI state is in `latestResults` — `renderResults()` is the single source of truth for the DOM
- `createButton()` helper for all buttons — don't construct button HTML manually
- `sanitizeFilename()` must be applied to all downloaded filenames
- `normalizeTicker()` uppercases and strips spaces/dots before any API call
- Avoid adding dependencies — the whole extension must remain zero-install for users

## Known Issues / Gotchas
- EDGAR rate limits: if the user searches very fast repeatedly, responses may be throttled (no retry logic currently)
- Some tickers have multiple CIK matches — the extension picks the first result
- Download relies on `chrome.downloads` API — Firefox handles this differently (check manifest permissions)
