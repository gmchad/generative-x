type TwitterUser = {
    username: string;
    displayName: string;
    verified: boolean;
    avatarUrl: string;
};

type TweetMedia = {
    type: 'image' | 'video';
    url: string;
    altText?: string;
};

type TweetEngagement = {
    replies: number;
    reposts: number;
    likes: number;
    bookmarks: number;
    views: number;
};

type Tweet = {
    id: string;
    user: TwitterUser;
    content: string;
    media?: TweetMedia[];
    engagement: TweetEngagement;
    timestamp: string; // ISO 8601 format
    quotedTweet?: Tweet; // For quoted tweets
};

type Tweets = Tweet[];

// query: ?tweets={...}