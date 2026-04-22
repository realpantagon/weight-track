interface HeaderProps {
  totalEntries: number;
  latestEntryDate?: string;
  formatDate: (dateStr: string) => string;
}

export default function Header({ totalEntries, latestEntryDate, formatDate }: HeaderProps) {
  const now = new Date().toISOString().slice(0, 10);

  return (
    <div className="mb-6 pt-4 font-mono">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-1 text-xs text-dark-muted">
        <span>WEIGHT.TRACKER v2.0</span>
        <span className="text-neon-green/50">{now}</span>
      </div>

      {/* Main title */}
      <div className="panel-green rounded p-4 bg-dark-card mb-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-neon-green text-xs">●</span>
          <span className="text-neon-green glow-green font-bold text-base tracking-widest uppercase">
            PANTAGON SCALE
          </span>
          <span className="ml-auto text-xs text-neon-green/40 border border-neon-green/20 px-1.5 py-0.5 rounded">
            ONLINE
          </span>
        </div>
        <div className="text-xs text-dark-muted space-y-0.5">
          <div>
            <span className="text-neon-green/50">&gt;</span>{" "}
            <span className="text-neon-cyan/70">ENTRIES</span>
            <span className="text-dark-border2 mx-1">:</span>
            <span className="text-neon-green">{totalEntries}</span>
          </div>
          {totalEntries > 0 && latestEntryDate && (
            <div>
              <span className="text-neon-green/50">&gt;</span>{" "}
              <span className="text-neon-cyan/70">LAST_SYNC</span>
              <span className="text-dark-border2 mx-1">:</span>
              <span className="text-neon-green/70">{formatDate(latestEntryDate)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2 text-xs text-dark-muted/40">
        <span>──</span>
        <span className="tracking-widest">SYS.WEIGHT_MONITOR</span>
        <span className="flex-1 border-t border-dark-border/40" />
      </div>
    </div>
  );
}
