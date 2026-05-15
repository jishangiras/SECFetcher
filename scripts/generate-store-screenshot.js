const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const screenshotPath = path.join(root, 'store-assets', 'secfetcher-screenshot-1280x800.png');
const iconPath = path.join(root, 'icons', 'icon48.png');

function iconDataUrl() {
  const icon = fs.readFileSync(iconPath);
  return `data:image/png;base64,${icon.toString('base64')}`;
}

function buildHtml() {
  const sampleResults = `
    <h3>Insider Filings for NVDA</h3>
    <div class="year-header">2026</div>
    <div class="filing">
      <strong>4</strong> - Filed 2026-03-18<br><br>
      <div class="filing-actions">
        <button>Open</button>
        <button class="download-btn">Download</button>
      </div>
    </div>
    <div class="filing">
      <strong>4</strong> - Filed 2026-02-26<br><br>
      <div class="filing-actions">
        <button>Open</button>
        <button class="download-btn">Download</button>
      </div>
    </div>
    <div class="year-header">2025</div>
    <div class="filing">
      <strong>3</strong> - Filed 2025-11-19<br><br>
      <div class="filing-actions">
        <button>Open</button>
        <button class="download-btn">Download</button>
      </div>
    </div>`;

  return fs.readFileSync(path.join(root, 'popup.html'), 'utf8')
    .replace(/<script src="popup\.js"><\/script>/, '')
    .replace('src="icons/icon48.png"', `src="${iconDataUrl()}"`)
    .replace('<div id="results"></div>', `<div id="results">${sampleResults}</div>`)
    .replace(
      '</style>',
      `html {
        background: #eef2f7;
      }
      body {
        margin: 40px auto !important;
        min-height: 720px;
        box-shadow: 0 24px 80px rgba(15,23,42,.18);
        border-radius: 14px;
        overflow: auto;
      }
      </style>`
    );
}

(async () => {
  fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });

  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1
  });

  await page.setContent(buildHtml(), { waitUntil: 'load' });
  await page.screenshot({ path: screenshotPath });
  await browser.close();

  console.log(`Wrote ${screenshotPath}`);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
