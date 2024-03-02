'use client'
import { useState, useRef, useEffect } from "react";
import Tweet from "@/components/tweet";
import { Button } from "./ui/button";

let initialTweets = [
	{ username: "jina", timeAgo: "3m ago", message: "The best part of a sandwich is the bread. It's the foundation that holds everything together. Without good bread, you don't have a good sandwich. 🥪" },
	{ username: "sarah", timeAgo: "5m ago", message: "Just finished reading an amazing book! Highly recommend it if you're into mystery novels. 📚 #BookRecommendation" },
	{ username: "alexa", timeAgo: "10m ago", message: "Just saw the most beautiful sunset. Nature never ceases to amaze me. 🌅 #grateful" },
	{ username: "mike", timeAgo: "15m ago", message: "Just landed in Paris! Can't wait to explore the city of lights. ✈️🇫🇷" },
	{ username: "lily", timeAgo: "20m ago", message: "Just had the most delicious cup of coffee at a cute little cafe. Sometimes it's the simple things that bring the most joy. ☕️✨" },
];

export default function TwitterList() {
		const [displayedTweets, setDisplayedTweets] = useState(initialTweets);
		const [currentIndex, setCurrentIndex] = useState(0);
		const endOfListRef = useRef<HTMLDivElement>(null);

		useEffect(() => {
				// Scroll to the bottom of the list whenever displayedTweets changes
				endOfListRef.current?.scrollIntoView({ behavior: "smooth" });
		}, [displayedTweets]);

		const addTweet = () => {
				// Add the next tweet from the initialTweets list or start over if at the end
				setDisplayedTweets((prevTweets) => [...prevTweets, initialTweets[currentIndex]]);
				setCurrentIndex((prevIndex) => (prevIndex + 1) % initialTweets.length);
		};

		return (
				<div className="w-full max-w-lg rounded border sm:rounded-lg">
						{displayedTweets.length > 0 ? displayedTweets.map((tweet, index) => (
								<Tweet key={index} username={tweet.username} timeAgo={tweet.timeAgo} message={tweet.message} />
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
