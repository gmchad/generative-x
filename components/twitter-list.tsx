import Tweet from "@/components/tweet";

export default function TwitterList() {
	const tweets = [
		{ username: "jina", timeAgo: "3m ago", message: "The best part of a sandwich is the bread. It's the foundation that holds everything together. Without good bread, you don't have a good sandwich. 🥪" },
		{ username: "sarah", timeAgo: "5m ago", message: "Just finished reading an amazing book! Highly recommend it if you're into mystery novels. 📚 #BookRecommendation" },
		{ username: "alexa", timeAgo: "10m ago", message: "Just saw the most beautiful sunset. Nature never ceases to amaze me. 🌅 #grateful" },
		{ username: "mike", timeAgo: "15m ago", message: "Just landed in Paris! Can't wait to explore the city of lights. ✈️🇫🇷" },
		{ username: "lily", timeAgo: "20m ago", message: "Just had the most delicious cup of coffee at a cute little cafe. Sometimes it's the simple things that bring the most joy. ☕️✨" },
	];

	return (
		<div className="w-full max-w-lg rounded border sm:rounded-lg">
			{tweets.map((tweet, index) => (
				<Tweet key={index} username={tweet.username} timeAgo={tweet.timeAgo} message={tweet.message} />
			))}
		</div>
	);
}
