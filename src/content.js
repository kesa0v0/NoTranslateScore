const observer = new MutationObserver(() => {
    document.querySelectorAll('font').forEach((fontElement) => {
        const parent = fontElement.parentNode;
        while (fontElement.firstChild) {
            parent.insertBefore(fontElement.firstChild, fontElement);
        }
        parent.removeChild(fontElement);
        parent.setAttribute('translate', 'no');
    });
});

observer.observe(document.body, { childList: true, subtree: true });