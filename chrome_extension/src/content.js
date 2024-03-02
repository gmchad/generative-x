/**
 * Reconstruct Tweets (the the TypeScript definition) from the timeline HTML element
 */
function parseTweetsFromTimeline(eTimeline) {

    // @Tweets - note that the nth-child is 2, because the first sibling is "Name.. reposted.." (if present)
    const eItems = Array.from(eTimeline.querySelectorAll('div > article > div > div'));
    if (!eItems.length) {
        console.log('Tweets not found');
        return null;
    }

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
        const eTweetTime = eTimeC.querySelectorAll('a > time')[0];
        const tweetISOTime = eTweetTime.getAttribute('datetime')

        // to find the ID of the tweet, we parse it from the time link
        const eTweetTimeLink = eTweetTime.parentElement;
        const tweetLink = eTweetTimeLink.getAttribute('href');
        const tweetID = tweetLink.split('/').pop();

        // Body > 1:Tweet Text
        // NOTE: only use the first part, because the rest are 'show more...'
        const eTextParts = eTweetText.children[0] || null;
        const tweetText = eTextParts ? eTextParts.innerText : null;

        // Body > (next?):Embeds
        let tweetImageURLs = [];
        if (eEmbed) {
            tweetImageURLs = Array.from(eEmbed.querySelectorAll('img')).filter(e => e.src).map(e => e.src);
        }

        // Body > (last):Stats
        const [eStatsReply, eStatsRepost, eStatsLike, eStatsView] = eStats.querySelectorAll('& > div > div > div');
        const tweetEngagement = {
            replies: eStatsReply.innerText?.trim() || '',
            reposts: eStatsRepost.innerText?.trim() || '',
            likes: eStatsLike.innerText?.trim() || '',
            views: eStatsView.innerText?.trim() || '',
        };

        // make sure this stays in sync with the 'Tweet' type in the frontend
        return {
            id: tweetID,
            link: tweetLink,
            user: {
                username: userHandle || '@elonmusk',
                displayName: userName || 'Elon Musk',
                avatarUrl: userAvatarURL || 'https://pbs.twimg.com/profile_images/1683325380441128960/yRsRRjGO_400x400.jpg',
                verified: false, // TODO
            },
            content: tweetText || '',
            media: tweetImageURLs.length >= 1 ? tweetImageURLs.map(url => ({
                type: 'image',
                url: url,
                altText: undefined,
            })) : undefined,
            engagement: tweetEngagement,
            timestamp: tweetISOTime,
        }
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action !== "parseXTimeline")
        return;


    // @Timeline: parse and then replace
    const eTimeline = document.querySelector('[aria-label="Timeline: Your Home Timeline"]');
    if (!eTimeline)
        return console.log('Timeline not found');
    console.log('Timeline found:', eTimeline);

    // Scrape Tweets from the timeline
    const tweets = parseTweetsFromTimeline(eTimeline);
    console.log('Tweets:', tweets);
    const queryString = encodeURIComponent(JSON.stringify(tweets));

    // IFrame to our Frontend, passing Tweets as Query
    const iFrameHeight = Math.max(600, eTimeline.offsetHeight);
    const iFrontend = document.createElement('iframe');
    iFrontend.src = `https://spc-openai-hackathon.vercel.app/?tweets=${queryString}`;
    iFrontend.frameBorder = '0';
    // iFrontend.scrolling = 'no';
    iFrontend.style.width = '100%';
    iFrontend.style.height = `${iFrameHeight}px`;
    iFrontend.style.zIndex = '1';
    eTimeline.parentNode.insertBefore(iFrontend, eTimeline);

    // Hide the timeline
    // NOTE: not doing it because otherwise the "end of page refresher" will run continuously, fetching more and more tweets
    // eTimeline.style.display = 'none';

    // update the timeline to be below and invisible
    eTimeline.parentNode.style.position = 'relative';
    eTimeline.style.position = 'absolute';
    eTimeline.style.left = '0';
    eTimeline.style.right = '0';
    eTimeline.style.top = '0';
    // eTimeline.style.zIndex = '-1';
    // eTimeline.style.visibility = 'hidden';

    // @Home: hide the 'new tweet' blocks
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
