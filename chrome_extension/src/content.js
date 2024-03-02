chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action !== "fudgeXTimeline")
        return;

    // find the timeline
    const element = document.querySelector('[aria-label="Timeline: Your Home Timeline"]');
    if (!element) {
        console.log('Element not found');
        return;
    }

    // Perform your actions with the element
    console.log('Element found:', element);

    // Optionally, send data back to your popup or background script
    sendResponse({data: "some data"});

    // Get the height of the element
    const elementHeight = Math.max(600, element.offsetHeight);

    // Create an iframe
    const iframe = document.createElement('iframe');
    iframe.src = 'https://spc-openai-hackathon.vercel.app/';
    iframe.style.width = '100%'; // Adjust width as needed
    iframe.style.height = `${elementHeight}px`; // Set height to match the replaced element
    iframe.frameBorder = '0'; // remove border

    // Insert the iframe before the hidden element
    element.parentNode.insertBefore(iframe, element);

    // Hide the element
    // element.style.display = 'none';

});

