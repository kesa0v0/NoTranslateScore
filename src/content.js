function setTranslateNo(element) {
    element.setAttribute('translate', 'no');
    element.querySelectorAll('div').forEach(function(child) {
        setTranslateNo(child);
    });
}

function waitForElement(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
        console.log('Element found:', element);
        callback(element);
    } else {
        setTimeout(function() {
            console.log('Waiting for element:', selector);
            waitForElement(selector, callback);
        }, 100);
    }
}

waitForElement('div.v-bottom-navigation', function(element) {
    setTranslateNo(element);
});