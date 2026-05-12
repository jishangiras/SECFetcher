async function fetchSEC(url) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: "fetchSEC", url: url }, (response) => {
      resolve(response);
    });
  });
}

let activeRequestId = 0;
let latestResults = null;

function resultsElement() {
  return document.getElementById('results');
}

function tickerElement() {
  return document.getElementById('ticker');
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function appendMessage(className, message) {
  const messageElement = document.createElement('p');
  messageElement.className = className;
  messageElement.textContent = message;

  const resultsDiv = resultsElement();
  clearElement(resultsDiv);
  resultsDiv.appendChild(messageElement);
}

function sanitizeFilename(value) {
  return String(value)
    .trim()
    .replace(/[\\/:*?"<>|]+/g, '-')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^-+|-+$/g, '');
}

function normalizeTicker(ticker) {
  return ticker.toUpperCase()
               .trim()
               .replace(/\./g, '-')
               .replace(/\s+/g, '');
}

function createButton(label, className, dataset) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.textContent = label;

  for (const [key, value] of Object.entries(dataset)) {
    button.dataset[key] = value;
  }

  return button;
}

function renderResults(resultState) {
  const resultsDiv = resultsElement();
  clearElement(resultsDiv);

  if (!resultState) return;

  if (resultState.message) {
    appendMessage(resultState.message.className, resultState.message.text);
    return;
  }

  const title = document.createElement('h3');
  title.textContent = `${resultState.title} for ${resultState.ticker}`;
  resultsDiv.appendChild(title);

  let currentYear = "";

  for (const filing of resultState.filings) {
    if (filing.year !== currentYear) {
      currentYear = filing.year;

      const yearHeader = document.createElement('div');
      yearHeader.className = 'year-header';
      yearHeader.textContent = filing.year;
      resultsDiv.appendChild(yearHeader);
    }

    const filingCard = document.createElement('div');
    filingCard.className = 'filing';

    const formType = document.createElement('strong');
    formType.textContent = filing.formType;
    filingCard.appendChild(formType);
    filingCard.append(` - Filed ${filing.date}`);
    filingCard.appendChild(document.createElement('br'));
    filingCard.appendChild(document.createElement('br'));

    const actions = document.createElement('div');
    actions.className = 'filing-actions';
    actions.appendChild(createButton('Open', 'open-btn', { url: filing.url }));
    actions.appendChild(createButton('Download', 'download-btn', {
      url: filing.url,
      filename: filing.filename
    }));

    filingCard.appendChild(actions);
    resultsDiv.appendChild(filingCard);
  }
}

function saveResults() {
  chrome.storage.local.set({ secResults: latestResults });
}

function setResults(resultState) {
  latestResults = resultState;
  renderResults(resultState);
  saveResults();
}

function clearAppState() {
  activeRequestId++;
  latestResults = null;
  tickerElement().value = '';
  clearElement(resultsElement());
  chrome.storage.local.remove('secResults');
  tickerElement().focus();
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

document.addEventListener('DOMContentLoaded', async () => {
  const saved = await chrome.storage.local.get('secResults');
  if (saved.secResults) {
    latestResults = saved.secResults;
    renderResults(saved.secResults);
  }
});

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

async function fetchFilings(tickerInput, formTypes, title) {
  const requestId = ++activeRequestId;
  const normalized = normalizeTicker(tickerInput);
  appendMessage('loading', `Loading ${title} for ${tickerInput}...`);

  const tickerRes = await fetchSEC("https://www.sec.gov/files/company_tickers.json");
  if (requestId !== activeRequestId) return;

  if (!tickerRes.success) {
    setResults({ message: { className: 'error', text: 'Error loading ticker database.' } });
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
    setResults({ message: { className: 'error', text: `Ticker ${tickerInput} not found.` } });
    return;
  }

  const subRes = await fetchSEC(`https://data.sec.gov/submissions/CIK${cik}.json`);
  if (requestId !== activeRequestId) return;

  if (!subRes.success) {
    setResults({ message: { className: 'error', text: 'Error fetching filings. Please try again.' } });
    return;
  }

  const recent = subRes.data.filings.recent;
  const filings = [];

  for (let i = 0; i < recent.form.length && filings.length < 100; i++) {
    const formType = recent.form[i];
    if (!formTypes.includes(formType)) continue;

    const date = recent.filingDate[i];
    const acc = recent.accessionNumber[i].replace(/-/g, '');
    const primaryDoc = recent.primaryDocument[i];
    const url = `https://www.sec.gov/Archives/edgar/data/${cik}/${acc}/${primaryDoc}`;

    filings.push({
      formType,
      date,
      year: date.substring(0, 4),
      url,
      filename: `SECFetcher/${sanitizeFilename(normalized)}_${sanitizeFilename(formType)}_${sanitizeFilename(date)}_${sanitizeFilename(primaryDoc)}`
    });
  }

  if (filings.length === 0) {
    setResults({ message: { className: 'empty', text: `No ${title} found.` } });
    return;
  }

  setResults({
    ticker: tickerInput,
    title,
    filings
  });
}

document.getElementById('clear-results').addEventListener('click', clearAppState);

document.getElementById('fetch-10kq').addEventListener('click', () => {
  const ticker = tickerElement().value.trim();
  if (!ticker) return alert("Please enter a ticker symbol");
  fetchFilings(ticker, ['10-K', '10-Q'], "10-K & 10-Q");
});

document.getElementById('fetch-8k').addEventListener('click', () => {
  const ticker = tickerElement().value.trim();
  if (!ticker) return alert("Please enter a ticker symbol");
  fetchFilings(ticker, ['8-K'], "8-K");
});

document.getElementById('fetch-proxy').addEventListener('click', () => {
  const ticker = tickerElement().value.trim();
  if (!ticker) return alert("Please enter a ticker symbol");
  fetchFilings(ticker, ['DEF 14A'], "Proxy Statement");
});
