chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchSEC") {
    fetch(request.url, {
      headers: {
        "User-Agent": "SECFetcher Extension (Personal Use)"
      }
    })
    .then(response => response.json())
    .then(data => sendResponse({ success: true, data: data }))
    .catch(error => sendResponse({ success: false, error: error.message }));

    return true;
  }
});