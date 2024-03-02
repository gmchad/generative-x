// components/Tweet.js
import { Avatar } from "@/components/ui/avatar";
import { UserIcon } from '@heroicons/react/20/solid';

export default function Tweet({ username, timeAgo, message }: { username: string; timeAgo: string; message: string }) {
	return (
		<div className="flex border-b p-4">
			<div className="mr-4">
				<Avatar className="h-10 w-10">
					<UserIcon 
						height="40"
						style={{
							aspectRatio: "40/40",
							objectFit: "cover",
						}}
						width="40"
					/>
				</Avatar>
			</div>
			<div className="flex flex-col">
				<div className="flex items-center">
					<h1 className="text-base font-bold leading-none">@{username}</h1>
					<span className="ml-2 text-sm text-gray-500 leading-none dark:text-gray-400">{timeAgo}</span>
				</div>
				<div className="mt-2 text-sm leading-snug">
					<p>{message}</p>
				</div>
			</div>
		</div>
	);
}
