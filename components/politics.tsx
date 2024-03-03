import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";

type Article = {
	link: string;
	title: string;
};

type PoliticalProps = {
	articles: Article[];
	party: string;
};

export const Politics = ({props}: {props : PoliticalProps}) => {

	const colorClass = {
			right: 'text-red-600',
			left: 'text-blue-600',
			center: 'text-gray-600',
	}[props.party];

	return (
			<Card className="w-full max-w-sm">
					<CardHeader className="flex-col items-start">
							<CardTitle className="text-2xl">Political Leaning</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-1.5">
							<div className={`flex items-center justify-start`}>
								<span className="text-sm">Political Party: </span>
								<span className={`text-xl font-semibold ${colorClass} ml-1`}>{props.party}</span>
							</div>
							<div className="flex flex-col text-sm">
									<span>References:</span>
									{props.articles.map((article, index) => (
											<a key={index} href={article.link} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
													{article.title}
											</a>
									))}
							</div>
					</CardContent>
			</Card>
	);
};