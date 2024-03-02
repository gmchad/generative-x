export type TwitterUser = {
    username: string;
    displayName: string;
    verified: boolean;
    avatarUrl: string;
};

export type TweetMedia = {
    type: 'image' | 'video';
    url: string;
    altText?: string;
};

// NOTE: updated strings, to just render as-is (with ...K, or ...M)
export type TweetEngagement = {
    replies: string;
    reposts: string;
    likes: string;
    views: string;
    // bookmarks: string;
};

export type Tweet = {
    id: string;
    link: string,
    user: TwitterUser;
    content: string;
    media?: TweetMedia[];
    engagement: TweetEngagement;
    timestamp: string; // ISO 8601 format
    // quotedTweet?: Tweet; // For quoted tweets - NOTE: removed for simplicity
};

// query: ?tweets=