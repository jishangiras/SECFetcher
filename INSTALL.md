# Install SECFetcher

## Chromium Browsers

Works with Chrome, Edge, Brave, Arc, Opera, and most Chromium-based browsers.

1. Download this repository or a release ZIP.
2. If you downloaded the source ZIP, unzip it.
3. Open your extensions page:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
   - Brave: `brave://extensions`
   - Arc: `arc://extensions`
   - Opera: `opera://extensions`
4. Enable developer mode.
5. Click `Load unpacked`.
6. Select the SECFetcher folder containing `manifest.json`.

## Firefox

1. Open `about:debugging#/runtime/this-firefox`.
2. Click `Load Temporary Add-on`.
3. Select `manifest.json`.

Temporary Firefox installs are for testing. A signed Add-ons build is planned.

## Permissions

SECFetcher asks for:

- Local storage, to remember the last visible results.
- Downloads, to save filing documents when requested.
- SEC hosts, to access public SEC filing data.
