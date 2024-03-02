'use client'
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Tweet from "@/components/tweet";
import { Button } from "./ui/button";
import { Tweet as TweetType, TwitterUser, TweetMedia, TweetEngagement } from "@/types/tweets";
import { tweetData as initialTweets} from "@/lib/test-data";

export default function TwitterList() {
		// take tweets passed as Query Params or use the initialTweets as fallback
		const queryParams = useSearchParams();
		const queryTweetsEncoded = queryParams.get('tweets') || null;
		const queryTweets = queryTweetsEncoded ? JSON.parse(decodeURIComponent(queryTweetsEncoded)) as TweetType[] : null;

		const [displayedTweets, setDisplayedTweets] = useState(queryTweets || initialTweets);
		const [currentIndex, setCurrentIndex] = useState(0);
		const endOfListRef = useRef<HTMLDivElement>(null);

		useEffect(() => {
				// Scroll to the bottom of the list whenever displayedTweets changes
				// NOTE: disabled because if does on the first scroll when embedding the page on Twitter
				// endOfListRef.current?.scrollIntoView({ behavior: "smooth" });
		}, [displayedTweets]);

		const addTweet = () => {
				// Add the next tweet from the initialTweets list or start over if at the end
				setDisplayedTweets((prevTweets) => [...prevTweets, initialTweets[currentIndex]]);
				setCurrentIndex((prevIndex) => (prevIndex + 1) % initialTweets.length);
		};


		return (
				<div className="w-full rounded sm:rounded-lg">
						{displayedTweets.length > 0 ? displayedTweets.map((tweet, index) => (
								<Tweet key={tweet.id} tweet={tweet} />
						)) : (
								<p className="p-4 text-center text-gray-500 dark:text-gray-400">No tweets to display</p>
						)}
						{/* <div className="fixed inset-x-0 bottom-0 p-4 bg-white dark:bg-gray-800 border-t">
								<Button className="w-full rounded-none" variant="ghost" size="lg" onClick={addTweet}>Load More Tweets</Button>
						</div> */}
						<div ref={endOfListRef} />
						<div className="fixed inset-x-0 bottom-0 flex justify-center mb-2">
							<Button className="rounded" size="lg" onClick={addTweet}>Load More Tweets</Button>
						</div>
				</div>
		);
}
