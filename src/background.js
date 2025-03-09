chrome.action.onClicked.addListener((tab) => {
    chrome.storage.sync.get('sites', function(data) {
        const sites = data.sites || [];
        const url = new URL(tab.url);
        if (sites.some(site => url.hostname.endsWith(site.replace('*', '')))) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['src/content.js']
            });
        } else {
            alert('이 사이트는 설정된 URL 패턴에 포함되지 않습니다.');
        }
    });
});