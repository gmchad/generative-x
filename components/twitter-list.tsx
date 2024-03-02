'use client'
import { useState, useRef, useEffect } from "react";
import Tweet from "@/components/tweet";
import { Button } from "./ui/button";
import { Tweet as TweetType, TwitterUser, TweetMedia, TweetEngagement } from "@/types/tweets";

let initialTweets: TweetType[] = [
		{
			"id": "e6ded9be-065b-48a1-af5b-661bcf450d8b",
			"user": {
				"username": "sarah",
				"displayName": "Sarah",
				"verified": false,
				"avatarUrl": "https://example.com/avatar.jpg"
			},
			"content": "Just finished reading an amazing book! Highly recommend it if you're into mystery novels. 📚 #BookRecommendation",
			"engagement": {
				"replies": 0,
				"reposts": 0,
				"likes": 0,
				"bookmarks": 0,
				"views": 0
			},
			"timestamp": "2024-03-02T07:10:44.852231",
		},
		{
			"id": "05bd5271-f1d0-40b2-92f6-1004069be7ea",
			"user": {
				"username": "alexa",
				"displayName": "Alexa",
				"verified": false,
				"avatarUrl": "https://example.com/avatar.jpg"
			},
			"content": "Just saw the most beautiful sunset. Nature never ceases to amaze me. 🌅 #grateful",
			"engagement": {
				"replies": 0,
				"reposts": 0,
				"likes": 0,
				"bookmarks": 0,
				"views": 0
			},
			"timestamp": "2024-03-02T07:05:44.852308",
		},
		{
			"id": "224ee2da-27ef-46fa-bbbe-e2ab0be6396a",
			"user": {
				"username": "mike",
				"displayName": "Mike",
				"verified": false,
				"avatarUrl": "https://example.com/avatar.jpg"
			},
			"content": "Just landed in Paris! Can't wait to explore the city of lights. ✈️🇫🇷",
			"engagement": {
				"replies": 0,
				"reposts": 0,
				"likes": 0,
				"bookmarks": 0,
				"views": 0
			},
			"timestamp": "2024-03-02T07:00:44.852340",
		},
		{
			"id": "dbd56129-0b53-4dda-bf95-6156a5088047",
			"user": {
				"username": "lily",
				"displayName": "Lily",
				"verified": false,
				"avatarUrl": "https://example.com/avatar.jpg"
			},
			"content": "Just had the most delicious cup of coffee at a cute little cafe. Sometimes it's the simple things that bring the most joy. ☕️✨",
			"engagement": {
				"replies": 0,
				"reposts": 0,
				"likes": 0,
				"bookmarks": 0,
				"views": 0
			},
			"timestamp": "2024-03-02T06:55:44.852363",
		}
	]

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
								<Tweet key={index} tweet={tweet} />
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
