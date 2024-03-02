import { CardContent, Card } from "@/components/ui/card";

const WeatherIcon = ({ description }: { description: String }) => {
	switch (description.toLowerCase()) {
		case "rainy":
			return <CloudRainIcon />;
		case "sunny":
			return <SunIcon />;
		case "cloudy":
			return <WindIcon />; // Assuming you want to use the WindIcon for cloudy
		// Add more cases as needed
		default:
			return <SunIcon />; // Default icon if no match
	}
};

export const Weather = ({
	temperature,
	unit,
	description,
}: {
	temperature: String;
	unit: String;
	description: String;
}) => {
	return (
		<div className="flex items-center justify-start w-full p-4">
			<Card className="w-full max-w-sm">
				<CardContent className="p-6">
					<div className="flex items-center gap-4">
						<WeatherIcon description={description} />
						<div className="flex flex-col text-3xl font-semibold leading-none">
							<span className="text-2xl font-medium leading-none">Current</span>
							<span className="text-4xl font-extrabold">
								{temperature}°{unit}
							</span>
						</div>
					</div>
					<p className="mt-4 text-gray-500 dark:text-gray-400">{description}</p>
				</CardContent>
			</Card>
		</div>
	);
};

function CloudRainIcon(props: any) {
	return (
		<svg
			className="text-5xl w-10 h-10"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
			<path d="M16 14v6" />
			<path d="M8 14v6" />
			<path d="M12 16v6" />
		</svg>
	);
}

function SunIcon(props: any) {
	return (
		<svg
			className="text-5xl w-10 h-10"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2" />
			<path d="M12 20v2" />
			<path d="m4.93 4.93 1.41 1.41" />
			<path d="m17.66 17.66 1.41 1.41" />
			<path d="M2 12h2" />
			<path d="M20 12h2" />
			<path d="m6.34 17.66-1.41 1.41" />
			<path d="m19.07 4.93-1.41 1.41" />
		</svg>
	);
}

function WindIcon(props: any) {
	return (
		<svg
			className="text-5xl w-10 h-10"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
			<path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
			<path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
		</svg>
	);
}