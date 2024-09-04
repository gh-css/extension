function handleCssInjection(tabId: number): void {
    chrome.tabs.sendMessage(tabId, { action: "injectCss" }).catch((error: any) => {
        console.error("Failed to send message:", error);
    });
}

// Listen for history state changes (SPA navigation)
chrome.webNavigation.onHistoryStateUpdated.addListener((details: chrome.webNavigation.WebNavigationTransitionCallbackDetails) => {
    console.log("History state updated");
    handleCssInjection(details.tabId);
}, { url: [{ urlMatches: 'github.com' }] });

// Listen for tab updates (page load or refresh)
chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo) => {
    if (changeInfo.status === 'complete') {
        chrome.tabs.get(tabId, (tab) => {
            if (tab.url && tab.url.includes("github.com")) {
                console.log("Tab updated");
                handleCssInjection(tabId);
            }
        });
    }
});
