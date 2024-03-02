import { Skeleton } from "@/components/ui/skeleton";

export default function TweetComponentSkeleton() {
	return (
		<div className="flex border-b border-gray-700 p-4 bg-black">
			<div className="mr-4">
				<Skeleton className="h-10 w-10 rounded-full" />
			</div>
			<div className="flex flex-col">
				<div className="flex items-center">
					<Skeleton className="h-5 w-36 rounded-md" />
					<Skeleton className="h-5 w-5 ml-1 rounded-full" />
					<Skeleton className="h-4 w-24 ml-2 rounded-md" />
				</div>
				<div className="mt-2">
					<Skeleton className="h-4 w-full rounded-md" />
					<Skeleton className="h-4 w-11/12 mt-1 rounded-md" />
					<Skeleton className="h-4 w-10/12 mt-1 rounded-md" />
				</div>
				{/* Placeholder for media */}
				<div className="mt-2">
					<Skeleton className="h-48 w-full rounded-lg" />
				</div>
				{/* Placeholder for engagement metrics */}
				<div className="mt-2">
					<Skeleton className="h-4 w-1/2 rounded-md" />
				</div>
			</div>
		</div>
	);
}