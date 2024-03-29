/**
 * v0 by Vercel.
 * @see https://v0.dev/t/X8iksundfgI
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardContent, Card } from "@/components/ui/card";

interface WeatherProps {
  location?: string;
  temperature: number;
  description: string;
  feels_like?: number;
  humidity?: number;
  wind_speed?: number;
  wind_direction?: string;
  icon?: string;
}

export const Weather = ({ props }: { props: WeatherProps }) => {
  return (
    <Card className="relative w-full max-w-sm overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute left-0 top-0 z-0 h-full object-cover opacity-50"
        src="/suncloud.mp4"
      >
        Your browser does not support the video tag.
      </video>
      <CardContent className="grid gap-4 p-6">
        <div className="flex flex-row items-start gap-4">
          <div className="flex flex-col justify-center">
            <h3 className="text-sm font-medium leading-none tracking-tighter">
              {props.location}
            </h3>
            <p className="text-xs leading-none tracking-tighter">
              {props.description}
            </p>
          </div>
          <img
            src={props.icon}
            alt="alt text"
            title="Title"
            className="ml-auto h-20 w-20"
          />
        </div>
        <div className="grid gap-0.5">
          <p className="text-4xl font-semibold tracking-tighter dark:text-gray-300">
            {props.temperature}°F
          </p>
          <p className="text-xs tracking-tighter dark:text-gray-400">
            Feels like {props.feels_like}°F
          </p>
        </div>
        <div className="grid grid-cols-2 items-center gap-0.5 text-sm">
          <p className="flex items-center gap-1">
            <DropletIcon className="dark:brightness-0.5 mr-1.5 h-4 w-4 flex-shrink-0 dark:filter" />
            <span>{props.humidity}%</span>
          </p>
          <p className="flex items-center gap-1">
            <WindIcon className="dark:brightness-0.5 mr-1.5 h-4 w-4 flex-shrink-0 dark:filter" />
            <span>{props.wind_speed} mph</span>
            <ArrowUpIcon
              style={{ transform: `rotate(${props.wind_direction}deg)` }}
              className="dark:brightness-0.5 mr-1.5 h-4 w-4 flex-shrink-0 dark:filter"
            />
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

function DropletIcon(props: any) {
  return (
    <svg
      {...props}
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
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  );
}

function SunIcon(props: any) {
  return (
    <svg
      {...props}
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

function ArrowUpIcon(props: any) {
  return (
    <svg
      {...props}
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
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

function WindIcon(props: any) {
  return (
    <svg
      {...props}
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
