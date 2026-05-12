async function fetchSEC(url) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: "fetchSEC", url: url }, (response) => {
      resolve(response);
    });
  });
}

let activeRequestId = 0;

// Load saved results when popup opens
document.addEventListener('DOMContentLoaded', async () => {
  const saved = await chrome.storage.local.get('secResults');
  if (saved.secResults) {
    document.getElementById('results').innerHTML = saved.secResults;
  }
});

// Save results automatically
function saveResults() {
  const resultsDiv = document.getElementById('results');
  chrome.storage.local.set({ secResults: resultsDiv.innerHTML });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function sanitizeFilename(value) {
  return String(value)
    .trim()
    .replace(/[\\/:*?"<>|]+/g, '-')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^-+|-+$/g, '');
}

function clearAppState() {
  activeRequestId++;
  document.getElementById('ticker').value = '';
  document.getElementById('results').innerHTML = '';
  chrome.storage.local.remove('secResults');
  document.getElementById('ticker').focus();
}

async function downloadFile(url, filename) {
  const downloadsApi = chrome.downloads;

  if (!downloadsApi || typeof downloadsApi.download !== 'function') {
    alert('Downloads are not supported by this browser extension runtime.');
    return;
  }

  const options = {
    url,
    filename,
    saveAs: true,
    conflictAction: 'uniquify'
  };

  await new Promise((resolve, reject) => {
    const result = downloadsApi.download(options, () => {
      const error = chrome.runtime.lastError;
      if (error) {
        reject(new Error(error.message));
        return;
      }
      resolve();
    });

    if (result && typeof result.then === 'function') {
      result.then(resolve, reject);
    }
  });
}

// Open filing
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('open-btn')) {
    const url = e.target.dataset.url;
    if (url) window.open(url, '_blank');
  }

  if (e.target.classList.contains('download-btn')) {
    const url = e.target.dataset.url;
    const filename = e.target.dataset.filename;
    if (!url || !filename) return;

    downloadFile(url, filename).catch((error) => {
      alert(`Could not download filing: ${error.message}`);
    });
  }
});

function normalizeTicker(ticker) {
  return ticker.toUpperCase()
               .trim()
               .replace(/\./g, '-')
               .replace(/\s+/g, '');
}

async function fetchFilings(tickerInput, formTypes, title) {
  const requestId = ++activeRequestId;
  const resultsDiv = document.getElementById('results');
  const safeTicker = escapeHtml(tickerInput);
  const safeTitle = escapeHtml(title);
  resultsDiv.innerHTML = `<p class="loading">Loading ${safeTitle} for ${safeTicker}...</p>`;

  const normalized = normalizeTicker(tickerInput);

  const tickerRes = await fetchSEC("https://www.sec.gov/files/company_tickers.json");
  if (requestId !== activeRequestId) return;

  if (!tickerRes.success) {
    resultsDiv.innerHTML = '<p class="error">Error loading ticker database.</p>';
    saveResults();
    return;
  }

  const data = tickerRes.data;
  let cik = null;

  for (let key in data) {
    const entry = data[key];
    if (entry.ticker === normalized || entry.ticker === tickerInput.toUpperCase()) {
      cik = entry.cik_str.toString().padStart(10, '0');
      break;
    }
  }

  if (!cik) {
    resultsDiv.innerHTML = `<p class="error">Ticker ${safeTicker} not found.</p>`;
    saveResults();
    return;
  }

  const subRes = await fetchSEC(`https://data.sec.gov/submissions/CIK${cik}.json`);
  if (requestId !== activeRequestId) return;

  if (!subRes.success) {
    resultsDiv.innerHTML = '<p class="error">Error fetching filings. Please try again.</p>';
    saveResults();
    return;
  }

  const recent = subRes.data.filings.recent;
  let html = `<h3>${safeTitle} for ${safeTicker}</h3>`;
  let currentYear = "";
  let count = 0;

  for (let i = 0; i < recent.form.length && count < 100; i++) {
    const formType = recent.form[i];
    if (!formTypes.includes(formType)) continue;

    count++;
    const date = recent.filingDate[i];
    const year = date.substring(0, 4);
    const acc = recent.accessionNumber[i].replace(/-/g, '');
    const primaryDoc = recent.primaryDocument[i];
    const filingUrl = `https://www.sec.gov/Archives/edgar/data/${cik}/${acc}/${primaryDoc}`;
    const filingFilename = `SECFetcher/${sanitizeFilename(normalized)}_${sanitizeFilename(formType)}_${sanitizeFilename(date)}_${sanitizeFilename(primaryDoc)}`;

    if (year !== currentYear) {
      currentYear = year;
      html += `<div class="year-header">${year}</div>`;
    }

    html += `
      <div class="filing">
        <strong>${escapeHtml(formType)}</strong> - Filed ${escapeHtml(date)}<br><br>
        <div class="filing-actions">
          <button class="open-btn" data-url="${escapeHtml(filingUrl)}">
            Open
          </button>
          <button class="download-btn" data-url="${escapeHtml(filingUrl)}" data-filename="${escapeHtml(filingFilename)}" title="Download the SEC filing document">
            Download
          </button>
        </div>
      </div>`;
  }

  resultsDiv.innerHTML = count > 0 ? html : `<p>No ${title} found.</p>`;
  saveResults();
}

// Button Listeners
document.getElementById('clear-results').addEventListener('click', clearAppState);

document.getElementById('fetch-10kq').addEventListener('click', () => {
  const ticker = document.getElementById('ticker').value.trim();
  if (!ticker) return alert("Please enter a ticker symbol");
  fetchFilings(ticker, ['10-K', '10-Q'], "10-K & 10-Q");
});

document.getElementById('fetch-8k').addEventListener('click', () => {
  const ticker = document.getElementById('ticker').value.trim();
  if (!ticker) return alert("Please enter a ticker symbol");
  fetchFilings(ticker, ['8-K'], "8-K");
});

document.getElementById('fetch-proxy').addEventListener('click', () => {
  const ticker = document.getElementById('ticker').value.trim();
  if (!ticker) return alert("Please enter a ticker symbol");
  fetchFilings(ticker, ['DEF 14A'], "Proxy Statement");
});
