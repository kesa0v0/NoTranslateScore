document.addEventListener('DOMContentLoaded', function() {
    const siteList = document.getElementById('siteList');
    const siteForm = document.getElementById('siteForm');
    const siteInput = document.getElementById('site');

    // 기본 사이트 URL 패턴 추가
    const defaultSite = '*.neocities.org';
    addSiteToList(defaultSite);

    siteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const site = siteInput.value.trim();
        if (site) {
            addSiteToList(site);
            siteInput.value = '';
        }
    });

    function addSiteToList(site) {
        const li = document.createElement('li');
        li.textContent = site;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'x';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function() {
            siteList.removeChild(li);
        });
        li.appendChild(deleteBtn);
        siteList.appendChild(li);
    }
});