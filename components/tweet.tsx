import * as React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserIcon, CheckBadgeIcon, SpeakerWaveIcon } from '@heroicons/react/20/solid';
import { Tweet } from "@/types/tweets";
import { formatDate } from "@/lib/utils";
import {useClassifiedTweet} from "@/components/classifier";
import TweetComponentSkeleton from "@/components/tweetskeleton";
import {FilteredImage} from "@/components/filteredimage";
import {FilterId, getFilterVoiceId} from "@/components/filters";
import DynamicSkeleton from "./dynamicskeleton";
import {Replies} from "@/components/replies";
import {EXPERIMENTAL_speakTextStream} from "@/components/elevenlabs.client";


// set to false to always show the original picture
const FILTER_ON_AVATARS = true;


export default function TweetComponent({ tweet, filterId, isDynamic }: { tweet: Tweet, filterId: FilterId | null, isDynamic: boolean }) {

		const reallyDynamic = isDynamic && tweet.content?.length > 5;

		const {isClassified, isReply, tweetComponent, replacedTweetText} = useClassifiedTweet(tweet, reallyDynamic);

		const DynamicComponent = isClassified ? tweetComponent : reallyDynamic ? <DynamicSkeleton/> : null;

		const voiceId = getFilterVoiceId(filterId) || undefined;

		return (
				<div className="flex border-b border-gray-700 p-4 bg-black">
						<div className="mr-4">
								<Avatar className="h-10 w-10">
										{FILTER_ON_AVATARS && <FilteredImage imageUrl={tweet.user.avatarUrl || "https://github.com/shadcn.png"} filterId={filterId} altText={tweet.user.username} className="aspect-square h-full w-full"/>}

										{!FILTER_ON_AVATARS && <AvatarImage src={tweet.user.avatarUrl || "https://github.com/shadcn.png"} alt={tweet.user.username} />}
										{/* Fallback icon in case Avatar component doesn't handle missing images */}
										{!FILTER_ON_AVATARS && <UserIcon className="text-gray-300" height="40" width="40" />}
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
										<SpeakerWaveIcon className="w-5 m-1" onClick={() => EXPERIMENTAL_speakTextStream(replacedTweetText,voiceId)}/>
								</div>
								<div className="mt-2 text-sm leading-snug text-gray-200">
										<p>{replacedTweetText}</p>
								</div>
								{/* Optionally render media if exists */}
								{tweet.media?.map((media, index) => (
									<div key={index} className="mt-2 w-full h-96 overflow-hidden rounded-lg relative" style={{ height: '28rem' }}>
										{media.type === 'image' ? (
											<FilteredImage
												imageUrl={media.url}
												imageText={replacedTweetText || ''}
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
								{/* Render DynamicComponent if it exists */}
								{DynamicComponent && (
									<div className="flex justify-start mt-2 overflow-hidden rounded-lg relative">
										{DynamicComponent}
									</div>
								)}
								{/* Replies */}
								{isReply && (
									<Replies tweetId={tweet.id} tweetContent={tweet.content} filterId={filterId} voiceId={voiceId} className=""/>
								)}
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
