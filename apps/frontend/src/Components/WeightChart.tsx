import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { ChartDataPoint } from "../types";

interface WeightChartProps {
  weights: Array<{
    Date: string;
    Weight: number;
  }>;
}

// Sample data intelligently for large datasets
const sampleDataForChart = (data: ChartDataPoint[], maxPoints: number = 30): ChartDataPoint[] => {
  if (data.length <= maxPoints) return data;
  
  const sampledData: ChartDataPoint[] = [];
  const step = Math.floor(data.length / (maxPoints - 2)); // -2 to ensure we include first and last
  
  // Always include first point
  sampledData.push(data[0]);
  
  // Sample middle points
  for (let i = step; i < data.length - 1; i += step) {
    sampledData.push(data[i]);
  }
  
  // Always include last point
  if (data.length > 1) {
    sampledData.push(data[data.length - 1]);
  }
  
  return sampledData;
};

export default function WeightChart({ weights }: WeightChartProps) {
  const chartData: ChartDataPoint[] = weights.map((w) => ({
    date: new Date(w.Date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    fullDate: new Date(w.Date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    weight: w.Weight,
  }));

  // Use sampled data for the chart to avoid overcrowding
  const displayChartData = sampleDataForChart(chartData);
  
  // Calculate intelligent spacing for chart elements
  const shouldShowLabels = displayChartData.length <= 10; // Only show labels if 10 or fewer points
  const tickInterval = Math.max(0, Math.floor(displayChartData.length / 6)); // Show max 6 x-axis labels

  if (weights.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No data to display</p>
      </div>
    );
  }

  return (
    <div className="mb-8 bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50 backdrop-blur-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-emerald-400 mb-1">Weight Progress</h2>
        <div className="text-sm text-gray-400">
          {weights.length > 1 && (
            <>
              {(() => {
                const latest = weights[weights.length - 1].Weight;
                const previous = weights[weights.length - 2].Weight;
                const diff = latest - previous;
                const isIncrease = diff > 0;
                return (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Latest: <span className="text-white font-medium">{latest}kg</span></span>
                      <span>Previous: <span className="text-white font-medium">{previous}kg</span></span>
                    </div>
                    <span className={`inline-flex items-center gap-1 ${isIncrease ? 'text-red-400' : 'text-green-400'}`}>
                      {isIncrease ? '↗' : '↘'} {Math.abs(diff).toFixed(1)}kg from last entry
                    </span>
                    {displayChartData.length < chartData.length && (
                      <div className="text-xs text-gray-500 mt-1">
                        Chart showing {displayChartData.length} of {chartData.length} data points
                      </div>
                    )}
                  </div>
                );
              })()}
            </>
          )}
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={displayChartData}
          margin={{ top: 20, right: 15, bottom: 40, left: -10 }}
        >
          <CartesianGrid strokeDasharray="2 2" stroke="#374151" strokeOpacity={0.3} />
          <XAxis
            dataKey="date"
            stroke="#9CA3AF"
            interval={tickInterval}
            padding={{ left: 15, right: 15 }}
            tick={({ x, y, payload }: { x: number; y: number; payload: any }) => (
              <text
                x={x}
                y={y + 35}
                transform={`rotate(45, ${x}, ${y + 30})`}
                textAnchor="start"
                fontSize={9}
                fill="#9CA3AF"
              >
                {payload.value}
              </text>
            )}
          />
          <YAxis
            fontSize={11}
            domain={["dataMin - 0.5", "dataMax + 0.5"]}
            stroke="#9CA3AF"
            tickFormatter={(value: number) => `${value}kg`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              fontSize: '12px'
            }}
            labelStyle={{ color: '#D1D5DB' }}
            formatter={(value: number) => [`${value}kg`, 'Weight']}
            labelFormatter={(label: string) => {
              const dataPoint = displayChartData.find(d => d.date === label);
              return dataPoint ? dataPoint.fullDate : label;
            }}
          />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#10b981"
            strokeWidth={2.5}
            dot={{ 
              r: displayChartData.length > 20 ? 2 : 4,
              fill: "#10b981", 
              strokeWidth: 2, 
              stroke: "#064E3B" 
            }}
            activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2, fill: "#ffffff" }}
            label={shouldShowLabels ? ({ x, y, value }: any) => (
              <text
                x={x}
                y={y - 12}
                fill="#D1D5DB"
                fontSize={10}
                textAnchor="middle"
                fontWeight="500"
              >
                {value}
              </text>
            ) : false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
