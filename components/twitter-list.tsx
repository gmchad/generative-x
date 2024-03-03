'use client'
import React from "react";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { TweetAI } from "@/components/tweet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "./ui/button";
import { Switch } from "./ui/switch"
import { Tweet as TweetType, TwitterUser, TweetMedia, TweetEngagement } from "@/types/tweets";
import { FilterType } from "@/types/strings";
import { trimmedTweetData as initialTweets} from "@/lib/test-data";

// AI
// import { useUIState, useActions } from "ai/rsc";

const filters: FilterType[] = [
	"fun mode",
	"serious mode",
]

export default function TwitterList() {
		// take tweets passed as Query Params or use the initialTweets as fallback
		const queryParams = useSearchParams();
		const queryTweetsEncoded = queryParams.get('tweets') || null;
		let queryTweets: TweetType[] | null = null;
		if (queryTweetsEncoded) {
				let decoded: string | null = null;
				try {
						decoded = decodeURIComponent(queryTweetsEncoded);
				} catch (error) {
						console.error("Error decoding query tweets", error, queryTweetsEncoded.length, queryTweetsEncoded);
				}
				if (decoded) {
						try {
								queryTweets = JSON.parse(decoded) as TweetType[];
						} catch (error) {
								console.error("Error parsing query tweets", error, decoded);
						}
				}
		}
		const [displayedTweets, setDisplayedTweets] = useState(queryTweets || initialTweets);
		const endOfListRef = useRef<HTMLDivElement>(null);

		const [filterType, setFilterType] = useState<String>("")
		const [isDynamic, setDynamic] = useState<Boolean>(false)

		useEffect(() => {
				// Scroll to the bottom of the list whenever displayedTweets changes
				// NOTE: disabled because if does on the first scroll when embedding the page on Twitter
				// endOfListRef.current?.scrollIntoView({ behavior: "smooth" });
				console.log(isDynamic)
		}, [displayedTweets, filterType, isDynamic]);



		return (
				<div className="w-full rounded sm:rounded-lg">
					<div className="flex justify-between mt-2 ml-2">
						<Tabs defaultValue="" className="">
						<TabsList>
							{filters.map((filter, index) => (
								<TabsTrigger key={index} value={filter} onClick={() => setFilterType(filter)}>{filter}</TabsTrigger>
							))}
						</TabsList>
						</Tabs>
						<div className="flex justify-end mt-2 mr-2">
							<div className="mr-1">Set Dynamic</div>
							<Switch onClick={()=> setDynamic(!isDynamic)}/>
						</div>
					</div>

						{displayedTweets.length > 0 ? displayedTweets.map((tweet, index) => (
								<TweetAI key={tweet.id} tweet={tweet} filterType={filterType} />
						)) : (
								<p className="p-4 text-center text-gray-500 dark:text-gray-400">No tweets to display</p>
						)}
						{/* <div className="fixed inset-x-0 bottom-0 p-4 bg-white dark:bg-gray-800 border-t">
								<Button className="w-full rounded-none" variant="ghost" size="lg" onClick={addTweet}>Load More Tweets</Button>
						</div> */}
						<div ref={endOfListRef} />
						{/* <div className="fixed inset-x-0 bottom-0 flex justify-center mb-2">
							<Button className="rounded" size="lg" onClick={addTweet}>Load More Tweets</Button>
						</div> */}
				</div>
		);
}
