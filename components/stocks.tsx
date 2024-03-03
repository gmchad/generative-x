import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StocksProps {
    ticker: string;
    amount_today: number;
    percent_today: number;
    current_price: number;
    high: number;
    low: number;
    volume: number;
    close_prices: string;
}

export const Stocks = ({
    ticker,
    amount_today,
    percent_today,
    current_price,
    high,
    low,
    volume,
    close_prices,
}: StocksProps) => {
    // Format volume with commas and prevent overflow
    const formattedVolume = volume.toLocaleString();

    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="flex-col items-start">
                <CardTitle className="text-2xl">{ticker}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-1.5">
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-semibold">${current_price.toFixed(2)}</span>
                    <span className="text-sm font-medium text-green-600">
                        +${amount_today.toFixed(2)} ({percent_today.toFixed(2)}%)
                    </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span>High</span>
                    <span>${high.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span>Low</span>
                    <span>${low.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span>Volume</span>
                    <span className="whitespace-nowrap">{formattedVolume}</span>
                </div>
            </CardContent>
        </Card>
    );
};
