const listenerTwitter = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.scripting.executeScript({target: {tabId: tabs[0].id}, function: filterTwitterTimeline});
    });
};
const listenerNotImplemented = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.scripting.executeScript({target: {tabId: tabs[0].id}, function: notImplemented});
    });
};
document.getElementById('xFilterButton').addEventListener('click', listenerTwitter);
document.getElementById('fbFilterButton').addEventListener('click', listenerNotImplemented);
document.getElementById('moreFilterButton').addEventListener('click', listenerNotImplemented);

function notImplemented() {
    alert('Not implemented yet');
}

function filterTwitterTimeline() {
    console.log('SCRAPE....');
}