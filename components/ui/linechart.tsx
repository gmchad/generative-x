import React from "react";

interface LineChartData {
  [key: string]: number;
}

interface LineChartProps {
  data: LineChartData;
  width?: number;
  height?: number;
}

// Helper function to map data points to SVG coordinates
function scale(data: LineChartData, width: number, height: number) {
  const values = Object.values(data);
  const dates = Object.keys(data).map((date) => new Date(date).getTime());
  const minX = Math.min(...dates);
  const maxX = Math.max(...dates);
  const minY = Math.min(...values);
  const maxY = Math.max(...values);

  // Scale the dates and values to fit the SVG dimensions
  const xScale = (date: string) =>
    ((new Date(date).getTime() - minX) / (maxX - minX)) * width;
  const yScale = (value: number) =>
    height - ((value - minY) / (maxY - minY)) * height;

  return { xScale, yScale };
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  width = 600,
  height = 300,
}) => {
  const { xScale, yScale } = scale(data, width, height);
  const dates = Object.keys(data);
  const firstValue = data[dates[0]];
  const lastValue = data[dates[dates.length - 1]];

  // Determine line color based on comparison of first and last data points
  const lineColor = lastValue > firstValue ? "green" : "red";

  // Create the 'd' attribute for the <path> element
  let pathD = `M ${xScale(dates[0])} ${yScale(data[dates[0]])}`;
  for (let i = 1; i < dates.length; i++) {
    pathD += ` L ${xScale(dates[i])} ${yScale(data[dates[i]])}`;
  }

  return (
    <svg width={width} height={height}>
      <path d={pathD} stroke={lineColor} strokeWidth="2" fill="none" />
    </svg>
  );
};

export default LineChart;
