"use client";
import React from "react";
import { useState, useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

import TweetComponent from "@/components/tweet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "./ui/switch";
import {
  Tweet as TweetType,
  TwitterUser,
  TweetMedia,
  TweetEngagement,
} from "@/types/tweets";
import { tweetData as hardcodedTweets } from "@/lib/test-data";
import { FilterId, FiltersList } from "@/lib/filters";

const queryClient = new QueryClient();

function getQueryTweets(
  queryParams: ReadonlyURLSearchParams,
): TweetType[] | null {
  const queryTweetsString = queryParams.get("tweets") || null;
  if (queryTweetsString) {
    try {
      return JSON.parse(queryTweetsString) as TweetType[];
    } catch (error) {
      console.error("Error parsing query tweets", error, queryTweetsString);
    }
  }
  return null;
}

export default function TwitterList() {
  // take tweets passed as Query Params or use the initialTweets as fallback
  const initialTweets = getQueryTweets(useSearchParams()) || hardcodedTweets;

  // state
  const [displayedTweets, setDisplayedTweets] = useState(initialTweets);
  const endOfListRef = useRef<HTMLDivElement>(null);

  const [filterId, setFilterId] = useState<FilterId | null>(null);
  const [isDynamic, setDynamic] = useState<boolean>(false);

  // useEffect(() => {
  // 		// Scroll to the bottom of the list whenever displayedTweets changes
  // 		// NOTE: disabled because if does on the first scroll when embedding the page on Twitter
  // 		// endOfListRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [displayedTweets, filterId]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full max-w-4xl rounded sm:rounded-lg">
        {/* Options Switcher */}
        <div className="sticky top-0 z-50 mx-2 mt-2 flex justify-between pb-2 backdrop-blur-sm">
          <Tabs defaultValue="null" className="">
            <TabsList>
              {FiltersList.map((filter, index) => (
                <TabsTrigger
                  key={index}
                  value={filter.id || "null"}
                  onClick={() => setFilterId(filter.id)}
                >
                  {filter.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="mt-2 flex justify-end">
            <div className="mr-2">Dynamic UI</div>
            <Switch onClick={() => setDynamic(!isDynamic)} />
          </div>
        </div>

        {displayedTweets.length > 0 ? (
          displayedTweets.map((tweet, index) => (
            <TweetComponent
              key={tweet.id}
              tweet={tweet}
              filterId={filterId}
              isDynamic={isDynamic}
            />
          ))
        ) : (
          <p className="p-4 text-center text-gray-500 dark:text-gray-400">
            No tweets to display
          </p>
        )}
        {/* <div className="fixed inset-x-0 bottom-0 p-4 bg-white dark:bg-gray-800 border-t">
								<Button className="w-full rounded-none" variant="ghost" size="lg" onClick={addTweet}>Load More Tweets</Button>
						</div> */}
        <div ref={endOfListRef} />
        {/* <div className="fixed inset-x-0 bottom-0 flex justify-center mb-2">
							<Button className="rounded" size="lg" onClick={addTweet}>Load More Tweets</Button>
						</div> */}
      </div>
    </QueryClientProvider>
  );
}
