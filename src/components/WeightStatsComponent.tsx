interface WeightStatsProps {
  stats: {
    totalChange: number;
    minWeight: number;
    maxWeight: number;
    avgWeight: number;
  } | null;
}

function StatCell({
  label,
  value,
  unit,
  color,
  prefix,
}: {
  label: string;
  value: string;
  unit: string;
  color: string;
  prefix?: string;
}) {
  return (
    <div className="bg-dark-card rounded p-3 border border-dark-border/60">
      <div className="text-dark-muted text-xs mb-1 tracking-wider">{label}</div>
      <div className={`text-base font-bold ${color} flex items-baseline gap-1`}>
        {prefix && <span className="text-xs">{prefix}</span>}
        <span>{value}</span>
        <span className="text-xs text-dark-muted">{unit}</span>
      </div>
    </div>
  );
}

export default function WeightStatsComponent({ stats }: WeightStatsProps) {
  if (!stats) return null;

  const changeColor =
    stats.totalChange >= 0 ? "text-neon-red" : "text-neon-green glow-green";

  return (
    <div className="mb-5 font-mono">
      <div className="text-xs text-dark-muted mb-2 tracking-widest">
        <span className="text-neon-green/50">&gt;</span> PROC.STATISTICS
      </div>
      <div className="grid grid-cols-2 gap-2">
        <StatCell
          label="Δ TOTAL_CHANGE"
          value={Math.abs(stats.totalChange).toFixed(1)}
          unit="KG"
          color={changeColor}
          prefix={stats.totalChange >= 0 ? "▲" : "▼"}
        />
        <StatCell
          label="AVG_WEIGHT"
          value={stats.avgWeight.toFixed(1)}
          unit="KG"
          color="text-neon-cyan"
        />
        <StatCell
          label="MIN_RECORDED"
          value={stats.minWeight.toFixed(1)}
          unit="KG"
          color="text-neon-green"
        />
        <StatCell
          label="MAX_RECORDED"
          value={stats.maxWeight.toFixed(1)}
          unit="KG"
          color="text-neon-red"
        />
      </div>
    </div>
  );
}
