import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LineChart from "./linechart";

type ClosePrices = {
  [key: string]: number;
};

type StockProps = {
  amount_today: number;
  close_prices: ClosePrices;
  current_price: number;
  high: number;
  low: number;
  percent_today: number;
  ticker: string;
  volume: number;
};

export const Stocks = ({props}: {props: StockProps}) => {
    // Format volume with commas and prevent overflow
    const formattedVolume = props.volume.toLocaleString();
    const data = props.close_prices;
    let color;
    if(props.current_price < props.close_prices[Object.keys(props.close_prices)[0]]) {
        color = "text-red-500"; // Using Tailwind CSS for red color
    } else {
        color = "text-green-500"; // Using Tailwind CSS for green color
    }
    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="flex-col items-start">
                <CardTitle className="text-2xl">{props.ticker}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-1.5">
                <div className="flex items-center justify-between">
                    <LineChart data={data} width={300} height={200} />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-semibold">${props.current_price.toFixed(2)}</span>
                    <span className={`text-sm font-medium ${color}`}>
                        +${props.amount_today.toFixed(2)} ({props.percent_today.toFixed(2)}%)
                    </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span>High</span>
                    <span>${props.high.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span>Low</span>
                    <span>${props.low.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span>Volume</span>
                    <span className="whitespace-nowrap">{formattedVolume}</span>
                </div>
            </CardContent>
        </Card>
    );
};
