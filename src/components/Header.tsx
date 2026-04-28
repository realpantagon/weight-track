import type { AppPage } from "../data/healthData";

interface HeaderProps {
  totalEntries: number;
  latestEntryDate?: string;
  formatDate: (dateStr: string) => string;
  currentPage: AppPage;
  onPageChange: (page: AppPage) => void;
}

export default function Header({
  totalEntries,
  latestEntryDate,
  formatDate,
  currentPage,
  onPageChange,
}: HeaderProps) {
  const now = new Date().toISOString().slice(0, 10);

  return (
    <div className="mb-6 pt-4 font-mono">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-1 text-xs text-dark-muted">
        <span>PANTAGON.SYS v2.0</span>
        <span className="text-neon-green/50">{now}</span>
      </div>

      {/* Main panel */}
      <div className="panel-green rounded p-4 bg-dark-card mb-3">
        {/* Title row */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-neon-green text-xs">●</span>
          <span className="text-neon-green glow-green font-bold text-base tracking-widest uppercase">
            PANTAGON SCALE
          </span>
          <span className="ml-auto text-xs text-neon-green/40 border border-neon-green/20 px-1.5 py-0.5 rounded">
            ONLINE
          </span>
        </div>

        {/* Nav tabs */}
        <div className="flex gap-1 mb-3">
          {(["weight", "health"] as AppPage[]).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 text-xs rounded transition-all tracking-widest ${
                currentPage === page
                  ? "bg-neon-green text-dark-base font-bold"
                  : "text-dark-muted border border-dark-border hover:border-neon-green/40 hover:text-neon-green"
              }`}
            >
              {page === "weight" ? "[ WEIGHT ]" : "[ HEALTH ]"}
            </button>
          ))}
        </div>

        {/* Contextual info */}
        {currentPage === "weight" && (
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
        )}

        {currentPage === "health" && (
          <div className="text-xs text-dark-muted space-y-0.5">
            <div>
              <span className="text-neon-green/50">&gt;</span>{" "}
              <span className="text-neon-cyan/70">MODULE</span>
              <span className="text-dark-border2 mx-1">:</span>
              <span className="text-neon-cyan/70">HEALTH.REPORT</span>
            </div>
            <div>
              <span className="text-neon-green/50">&gt;</span>{" "}
              <span className="text-neon-cyan/70">EXAM_DATE</span>
              <span className="text-dark-border2 mx-1">:</span>
              <span className="text-neon-green/60">28/04/2026</span>
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2 text-xs text-dark-muted/40">
        <span>──</span>
        <span className="tracking-widest">
          {currentPage === "weight" ? "SYS.WEIGHT_MONITOR" : "SYS.HEALTH_MONITOR"}
        </span>
        <span className="flex-1 border-t border-dark-border/40" />
      </div>
    </div>
  );
}
