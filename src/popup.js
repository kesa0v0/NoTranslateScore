document.addEventListener('DOMContentLoaded', function() {
    const siteForm = document.getElementById('siteForm');
    const siteInput = document.getElementById('site');
    const siteList = document.getElementById('siteList');

    function renderSites(sites) {
        siteList.innerHTML = '';
        sites.forEach((site, index) => {
            const li = document.createElement('li');
            li.textContent = site;
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '&times;';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', function() {
                sites.splice(index, 1);
                chrome.storage.sync.set({ sites: sites }, function() {
                    renderSites(sites);
                });
            });
            li.appendChild(deleteBtn);
            siteList.appendChild(li);
        });
    }

    chrome.storage.sync.get('sites', function(data) {
        const sites = data.sites || [];
        renderSites(sites);
    });

    siteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newSite = siteInput.value.trim();
        if (newSite) {
            chrome.storage.sync.get('sites', function(data) {
                const sites = data.sites || [];
                sites.push(newSite);
                chrome.storage.sync.set({ sites: sites }, function() {
                    siteInput.value = '';
                    renderSites(sites);
                });
            });
        }
    });
});