function filterTwitterTimeline() {
    console.log('SCRAPE....');
}

document.getElementById('xTimelineButton').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        console.log('Sending message to content.js');
        chrome.tabs.sendMessage(tabs[0].id, {action: "fudgeXTimeline"});
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