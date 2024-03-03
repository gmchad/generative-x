import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";

type PoliticalStance = 'right' | 'left' | 'center';

interface PoliticalProps {
		stance: PoliticalStance;
		references: string[];
}

export const Politics = ({props}: {props : PoliticalProps}) => {

	const colorClass = {
			right: 'text-red-600',
			left: 'text-blue-600',
			center: 'text-gray-600',
	}[props.stance];

	return (
			<Card className="w-full max-w-sm">
					<CardHeader className="flex-col items-start">
							<CardTitle className="text-2xl">Political Leaning</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-1.5">
							<div className={`flex items-center justify-start`}>
								<span className="text-sm">Stance: </span>
								<span className={`text-xl font-semibold ${colorClass} ml-1`}>{props.stance}</span>
							</div>
							<div className="flex flex-col text-sm">
									<span>References:</span>
									{props.references.map((link, index) => (
											<a key={index} href={link} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
													{link}
											</a>
									))}
							</div>
					</CardContent>
			</Card>
	);
};