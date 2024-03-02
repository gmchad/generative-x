// components/Tweet.js
import { Avatar } from "@/components/ui/avatar";
import { UserIcon, CheckBadgeIcon } from '@heroicons/react/20/solid';
import { Tweet } from "@/types/tweets";
import { formatDate } from "@/lib/utils";

export default function TweetComponent({ tweet }: { tweet: Tweet }) {
	return (
		<div className="flex border-b p-4">
			<div className="mr-4">
				<Avatar className="h-10 w-10">
					{/* Fallback icon in case Avatar component doesn't handle missing images */}
					<UserIcon height="40" width="40" />
				</Avatar>
			</div>
			<div className="flex flex-col">
				<div className="flex items-center">
					<h1 className="text-base font-bold leading-none">{tweet.user.displayName}</h1>
					{tweet.user.verified && (
						<CheckBadgeIcon className="ml-1 text-blue-500 w-5 h-5" aria-label="Verified" />
					)}
					<span className="ml-2 text-sm text-gray-500 leading-none dark:text-gray-400">
						@{tweet.user.username} · {formatDate(tweet.timestamp)}
					</span>
				</div>
				<div className="mt-2 text-sm leading-snug">
					<p>{tweet.content}</p>
				</div>
				{/* Optionally render media if exists */}
				{tweet.media?.map((media, index) => (
					<div key={index} className="mt-2">
						{media.type === 'image' ? (
							<img src={media.url} alt={media.altText || 'Tweet image'} className="max-w-full rounded-lg" />
						) : (
							<video controls src={media.url} className="max-w-full rounded-lg">
								{media.altText ? <track kind="descriptions" label="descriptions" srcLang="en" /> : null}
							</video>
						)}
					</div>
				))}
				{/* Displaying some engagement metrics */}
				<div className="mt-2 text-sm text-gray-500">
					<span>Likes: {tweet.engagement.likes}</span> ·
					<span> Replies: {tweet.engagement.replies}</span> ·
					<span> Reposts: {tweet.engagement.reposts}</span>
				</div>
			</div>
		</div>
	);
}
