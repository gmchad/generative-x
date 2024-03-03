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
			center: 'text-purple-600',
	}[props.party];

	return (
			<Card className="w-full max-w-sm">
					<CardHeader className="flex-col items-start">
							<CardTitle className="text-2xl text-center">Political Leaning</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-1.5">
							<div className={`flex items-center justify-start`}>
								{/* <span className="text-sm justify-center">Political Leaning: </span> */}
								{/* <span className={`text-xl font-semibold ${colorClass} ml-1`}>{props.party}</span> */}
							</div>
							<div className="container flex justify-between">
								{
									props.party === 'Left' ? (
											<div className="container flex justify-between">
												<div className="item w-1/3 text-xl text-left text-blue-600 font-bold">Left</div>
												<div className="item w-1/3 text-xl text-center">Center</div>
												<div className="item w-1/3 text-xl text-right">Right</div>
											</div>
									) : props.party === 'Right' ? (
											<div className="container flex justify-between">
												<div className="item w-1/3 text-xl text-left">Left</div>
												<div className="item w-1/3 text-xl text-center">Center</div>
												<div className="item w-1/3 text-xl text-right text-red-600 font-bold">Right</div>
											</div>
									) : (
											<div className="container flex justify-between">
												<div className="item w-1/3 text-xl text-left">Left</div>
												<div className="item w-1/3 text-xl text-center text-purple-600 font-bold">Center</div>
												<div className="item w-1/3 text-xl text-right">Right</div>
											</div>
									)
									

								}
							</div>
							<div className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 h-10 w-64 ml-10 ...">
					
							</div>

							<div className="flex flex-col text-sm">
									<span className="text-xl mt-4">Related Sources:</span>
									{props.articles.map((article, index) => (
										<div className=" border border-white rounded-lg p-4 mb-2" key={index}>
											<a key={index} href={article.link} className="text-white hover:underline" target="_blank" rel="noopener noreferrer">
													{article.title}
											</a>
										</div>
									))}
							</div>
					</CardContent>
			</Card>
	);
};