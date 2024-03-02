function scrapeTweetsFromTimeline(eTimeline) {

    // @Tweets - note that the nth-child is 2, because the first sibling is "Name.. reposted.." (if present)
    const eItems = Array.from(eTimeline.querySelectorAll('div > article > div > div'));
    if (!eItems.length)
        return console.log('Tweets not found');
    console.log('Tweets:', eItems);

    return eItems.map(eItem => {
        const [_eReposted, eTweetC] = eItem.children;

        // image is first child of eTweet, deep down to the img tag
        const [eImageC, eBodyC] = eTweetC.children;
        const avatar = eImageC.querySelector('img');
        const userAvatarURL = avatar ? avatar.src ?? null : null;

        // body of the tweet
        const [eUserAndHandle, eTweetText, ...eRest] = eBodyC.children;
        const eStats = eRest.pop(); // last child is the stats
        const eEmbed = eRest.length ? eRest.pop() : null; // if there's a 3rd child, it's the embed

        // Body > 0:User, Handle, Time
        const [eUserParts, eHandleParts] = eUserAndHandle.querySelectorAll('[data-testid="User-Name"]')[0].children;
        const [eUserName, _eUserSymbols] = eUserParts.querySelectorAll('div > a > div > div');
        const [eHandle, _spacer, eTimeC] = eHandleParts.children[0].children;
        const userName = eUserName.innerText;
        const userHandle = eHandle.querySelectorAll('a > div')[0].innerText;
        const tweetISOTime = eTimeC.querySelectorAll('a > time')[0].getAttribute('datetime');

        // Body > 1:Tweet Text
        // NOTE: only use the first part, because the rest are 'show more...'
        const eTextParts = eTweetText.children[0] || null;
        const tweetText = eTextParts ? eTextParts.innerText : null;

        // Body > (next?):Embeds
        if (eEmbed) {
            const eEmbedImageURLs = Array.from(eEmbed.querySelectorAll('img')).filter(e => e.src).map(e => e.src);
            console.log('Image:', eEmbedImageURLs);
        }

        // Body > (last):Stats
        const [eStatsReply, eStatsRepost, eStatsLike, eStatsView] = eStats.querySelectorAll('& > div > div > div');
        const tweetStats = {
            replies: eStatsReply.innerText?.trim() || '',
            reposts: eStatsRepost.innerText?.trim() || '',
            likes: eStatsLike.innerText?.trim() || '',
            views: eStatsView.innerText?.trim() || '',
        };


    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action !== "fudgeXTimeline")
        return;


    // @Timeline
    const eTimeline = document.querySelector('[aria-label="Timeline: Your Home Timeline"]');
    if (!eTimeline)
        return console.log('Timeline not found');
    console.log('Timeline found:', eTimeline);


    // Scrape Tweets from the timeline
    const tweets = scrapeTweetsFromTimeline(eTimeline);


    // IFrame to our Frontend
    // const timelineHeight = Math.max(600, eTimeline.offsetHeight);
    // const iFrontend = document.createElement('iframe');
    // iFrontend.src = 'https://spc-openai-hackathon.vercel.app/';
    // iFrontend.style.width = '100%'; // Adjust width as needed
    // iFrontend.style.height = `${timelineHeight}px`; // Set height to match the replaced eTimeline
    // iFrontend.frameBorder = '0'; // remove border
    // eTimeline.parentNode.insertBefore(iFrontend, eTimeline);

    // Hide the timeline
    // NOTE: not doing it because otherwise the "end of page refresher" will run continuously, fetching more and more tweets
    // eTimeline.style.display = 'none';


    // @Home
    const eHome = document.querySelector('[aria-label="Home timeline"]');
    if (eHome) {
        // Check if eHome has exactly 5 div children
        const divChildren = Array.from(eHome.children).filter(child => child.tagName === 'DIV');
        if (divChildren.length === 5) {
            divChildren[0].style.display = 'none'; // Hides the 1st child
            divChildren[2].style.display = 'none'; // Hides the 3rd child
        } else
            console.log(`eHome does not have exactly 5 div children, it has ${divChildren.length}.`);
    } else
        console.log('Home not found');

    // Optionally, send data back to your popup or background script
    sendResponse({data: "some data"});

});

