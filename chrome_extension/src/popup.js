document.getElementById('xTimelineButton').addEventListener('click', () => {
    const openInNewWindow = document.getElementById('newWindowCheckbox').checked;
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "parseXTimeline", openInNewWindow: openInNewWindow});
    });
});

// const listenerTwitter = () => {
//     chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
//         chrome.scripting.executeScript({target: {tabId: tabs[0].id}, function: filterTwitterTimeline});
//     });
// };
const listenerNotImplemented = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.scripting.executeScript({target: {tabId: tabs[0].id}, function: () => alert('Not implemented yet')});
    });
};
document.getElementById('fbFilterButton').addEventListener('click', listenerNotImplemented);
document.getElementById('moreFilterButton').addEventListener('click', listenerNotImplemented);