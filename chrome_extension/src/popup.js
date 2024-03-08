document.getElementById("xTimelineButton").addEventListener("click", () => {
  const openInNewWindow = document.getElementById("newWindowCheckbox").checked;
  const demoData = document.getElementById("demoDataCheckbox").checked;
  // Get the state of the custom URL checkbox and input
  const useCustomUrl = document.getElementById("customUrlCheckbox").checked;
  const customUrlInput = document.getElementById("customUrlInput").value;
  // Determine the URL to use
  const targetUrl = useCustomUrl && customUrlInput ? customUrlInput : "http://localhost:3000";
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "parseXTimeline",
      openInNewWindow,
      demoData,
      url: targetUrl, // Add the URL to the message
    });
  });
});

// Code to toggle the visibility of the custom URL input field based on the checkbox state
document.getElementById("customUrlCheckbox").addEventListener("change", function() {
  if(this.checked) {
    document.getElementById("customUrlInput").style.display = "block";
  } else {
    document.getElementById("customUrlInput").style.display = "none";
  }
});

// const listenerTwitter = () => {
//     chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
//         chrome.scripting.executeScript({target: {tabId: tabs[0].id}, function: filterTwitterTimeline});
//     });
// };
const listenerNotImplemented = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: () => alert("Not implemented yet"),
    });
  });
};
document
  .getElementById("fbFilterButton")
  .addEventListener("click", listenerNotImplemented);
document
  .getElementById("moreFilterButton")
  .addEventListener("click", listenerNotImplemented);
