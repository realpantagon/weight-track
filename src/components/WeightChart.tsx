import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import type { WeightEntry } from "../types";

interface WeightChartProps {
  weights: WeightEntry[];
}

type FilterPeriod = "all" | "3m" | "1m" | "1w";

const FILTER_LABELS: { period: FilterPeriod; label: string }[] = [
  { period: "all", label: "ALL" },
  { period: "3m", label: "3M" },
  { period: "1m", label: "1M" },
  { period: "1w", label: "1W" },
];

export default function WeightChart({ weights }: WeightChartProps) {
  const [period, setPeriod] = useState<FilterPeriod>("all");

  const sorted = [...weights].sort(
    (a, b) => new Date(a.recorded_at).getTime() - new Date(b.recorded_at).getTime()
  );

  function getFiltered() {
    if (period === "all") return sorted;
    const now = new Date();
    const cutoff = new Date();
    if (period === "3m") cutoff.setMonth(now.getMonth() - 3);
    else if (period === "1m") cutoff.setMonth(now.getMonth() - 1);
    else cutoff.setDate(now.getDate() - 7);
    return sorted.filter((w) => new Date(w.recorded_at) >= cutoff);
  }

  const filtered = getFiltered();

  const chartData = filtered.map((w) => ({
    date: new Date(w.recorded_at).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    fullDate: new Date(w.recorded_at).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    weight: w.weight_kg,
  }));

  const latest = filtered[filtered.length - 1]?.weight_kg;
  const prev = filtered[filtered.length - 2]?.weight_kg;
  const first = filtered[0]?.weight_kg;
  const diff = latest !== undefined && prev !== undefined ? latest - prev : null;
  const total = latest !== undefined && first !== undefined ? latest - first : null;
  const avgVal =
    filtered.length > 0
      ? filtered.reduce((s, w) => s + w.weight_kg, 0) / filtered.length
      : null;

  const lineColor =
    diff === null ? "#00ff41" : diff > 0 ? "#ff3333" : "#00ff41";

  const density = chartData.length;
  const dotR = density > 100 ? 0 : density > 50 ? 1 : density > 20 ? 2 : 3;
  const tickInterval = Math.max(0, Math.floor(density / 6));

  if (sorted.length === 0) {
    return (
      <div className="mb-5 panel-green rounded bg-dark-card p-6 font-mono">
        <div className="text-center text-dark-muted text-xs">
          <div className="text-neon-green/30 text-2xl mb-2">◈</div>
          NO_DATA — LOG YOUR FIRST ENTRY
        </div>
      </div>
    );
  }

  return (
    <div className="mb-5 panel-green rounded bg-dark-card font-mono">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-dark-muted tracking-widest">
            <span className="text-neon-green/50">&gt;</span> WEIGHT_TREND
          </div>
          <div className="flex gap-1">
            {FILTER_LABELS.map(({ period: p, label }) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-2 py-0.5 text-xs rounded transition-all ${
                  period === p
                    ? "bg-neon-green text-dark-base font-bold"
                    : "text-dark-muted border border-dark-border hover:border-neon-green/40 hover:text-neon-green"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Mini stats row */}
        {latest !== undefined && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs mb-2">
            <div>
              <span className="text-dark-muted">LATEST</span>
              <span className="text-dark-border2 mx-1">:</span>
              <span className="text-neon-green font-bold">{latest} KG</span>
            </div>
            {prev !== undefined && (
              <div>
                <span className="text-dark-muted">PREV</span>
                <span className="text-dark-border2 mx-1">:</span>
                <span className="text-neon-green/70">{prev} KG</span>
              </div>
            )}
            {diff !== null && (
              <div>
                <span className="text-dark-muted">ΔLAST</span>
                <span className="text-dark-border2 mx-1">:</span>
                <span style={{ color: lineColor }}>
                  {diff >= 0 ? "▲" : "▼"} {Math.abs(diff).toFixed(1)} KG
                </span>
              </div>
            )}
            {total !== null && (
              <div>
                <span className="text-dark-muted">ΔTOTAL</span>
                <span className="text-dark-border2 mx-1">:</span>
                <span style={{ color: total >= 0 ? "#ff3333" : "#00ff41" }}>
                  {total >= 0 ? "▲" : "▼"} {Math.abs(total).toFixed(1)} KG
                </span>
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-dark-muted/60">
          RECORDS: {filtered.length}/{sorted.length}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={chartData} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          <CartesianGrid
            strokeDasharray="2 4"
            stroke="#1a2535"
            horizontal={true}
            vertical={false}
          />
          {avgVal !== null && (
            <ReferenceLine
              y={avgVal}
              stroke="rgba(0,212,255,0.2)"
              strokeDasharray="4 4"
            />
          )}
          <XAxis
            dataKey="date"
            stroke="#3a4860"
            fontSize={9}
            interval={tickInterval}
            tick={{ fill: "#3a4860", fontSize: 9 }}
            tickLine={false}
            axisLine={false}
            angle={-35}
            textAnchor="end"
            height={48}
          />
          <YAxis
            fontSize={9}
            stroke="#3a4860"
            tickFormatter={(v: number) => `${v}`}
            tick={{ fill: "#3a4860", fontSize: 9 }}
            tickLine={false}
            axisLine={false}
            domain={["dataMin - 0.5", "dataMax + 0.5"]}
            width={32}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0c0e14",
              border: "1px solid rgba(0,255,65,0.25)",
              borderRadius: "4px",
              fontSize: "11px",
              fontFamily: "JetBrains Mono, monospace",
              boxShadow: "0 0 20px rgba(0,255,65,0.1)",
            }}
            labelStyle={{ color: "#3a4860", marginBottom: "4px" }}
            formatter={(v: number) => [
              <span key="w" style={{ color: lineColor, fontWeight: "700" }}>
                {v} KG
              </span>,
              "WEIGHT",
            ]}
            labelFormatter={(label: string) => {
              const dp = chartData.find((d) => d.date === label);
              return dp ? dp.fullDate : label;
            }}
          />
          <Line
            type="monotone"
            dataKey="weight"
            stroke={lineColor}
            strokeWidth={1.5}
            dot={dotR > 0 ? { r: dotR, fill: lineColor, strokeWidth: 0 } : false}
            activeDot={{ r: 5, stroke: lineColor, strokeWidth: 1, fill: "#0c0e14" }}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
