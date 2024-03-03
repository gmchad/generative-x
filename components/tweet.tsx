import * as React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserIcon, CheckBadgeIcon } from '@heroicons/react/20/solid';
import { Tweet } from "@/types/tweets";
import { formatDate } from "@/lib/utils";
import {useClassifiedTweet} from "@/components/classifier";
import TweetComponentSkeleton from "@/components/tweetskeleton";
import {FilteredImage} from "@/components/filteredimage";
import {FilterId} from "@/components/filters";
import DynamicSkeleton from "./dynamicskeleton";


export default function TweetComponent({ tweet, filterId, isDynamic }: { tweet: Tweet, filterId: FilterId | null, isDynamic: boolean }) {

		const reallyDynamic = isDynamic && tweet.content?.length > 5;

		const {isClassified, tweetComponent, replacedTweetText} = useClassifiedTweet(tweet, reallyDynamic);

		const DynamicComponent = isClassified ? tweetComponent : reallyDynamic ? <DynamicSkeleton/> : null;

		return (
				<div className="flex border-b border-gray-700 p-4 bg-black">
						<div className="mr-4">
								<Avatar className="h-10 w-10">
										<AvatarImage src={tweet.user.avatarUrl || "https://github.com/shadcn.png"} alt={tweet.user.username} />
										{/* Fallback icon in case Avatar component doesn't handle missing images */}
										<UserIcon className="text-gray-300" height="40" width="40" />
								</Avatar>
						</div>
						<div className="flex flex-col">
								<div className="flex items-center">
										<h1 className="text-base font-bold leading-none text-gray-100">{tweet.user.displayName}</h1>
										{tweet.user.verified && (
												<CheckBadgeIcon className="ml-1 text-blue-500 w-5 h-5" aria-label="Verified" />
										)}
										<span className="ml-2 text-sm text-gray-400">
												{tweet.user.username /* has @ */} · {formatDate(tweet.timestamp)}
										</span>
								</div>
								<div className="mt-2 text-sm leading-snug text-gray-200">
										<p>{replacedTweetText}</p>
								</div>
								{/* Render DynamicComponent if it exists */}
								{DynamicComponent && (
									<div className="flex justify-start mt-2 overflow-hidden rounded-lg relative">
										{DynamicComponent}
									</div>
								)}
								{/* Optionally render media if exists */}
								{tweet.media?.map((media, index) => (
									<div key={index} className="mt-2 w-full h-96 overflow-hidden rounded-lg relative">
										{media.type === 'image' ? (
											<FilteredImage
												imageUrl={media.url}
												filterId={filterId}
												altText={media.altText || 'Tweet image'}
												className='h-full object-cover absolute'
											/>
										) : (
											<video controls src={media.url} className="w-full h-full object-cover absolute">
												{media.altText ? <track kind="descriptions" label="descriptions" srcLang="en" /> : null}
											</video>
										)}
									</div>
								))}
								{/* Displaying some engagement metrics */}
								<div className="mt-2 text-sm text-gray-400">
										<span>Likes: {tweet.engagement.likes}</span> ·
										<span> Replies: {tweet.engagement.replies}</span> ·
										<span> Reposts: {tweet.engagement.reposts}</span>
								</div>
						</div>
				</div>
		);
}
