import { useState } from "react";
import type { WeightEntry } from "../types";

interface WeightEntriesListProps {
  weights: WeightEntry[];
  formatDate: (dateStr: string) => string;
}

const PER_PAGE = 5;

export default function WeightEntriesList({ weights, formatDate }: WeightEntriesListProps) {
  const [page, setPage] = useState(1);

  const reversed = [...weights].reverse();
  const totalPages = Math.ceil(reversed.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const entries = reversed.slice(start, start + PER_PAGE);

  function getPageNums(): number[] {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 3) return [1, 2, 3, 4, -1, totalPages];
    if (page >= totalPages - 2)
      return [1, -1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, -1, page - 1, page, page + 1, -2, totalPages];
  }

  if (weights.length === 0) {
    return (
      <div className="text-center py-8 font-mono">
        <div className="text-dark-muted text-xs">
          <span className="text-neon-green/30">&gt;</span> LOG.ENTRIES — EMPTY
        </div>
        <div className="text-dark-muted/50 text-xs mt-1">NO RECORDS FOUND. BEGIN LOGGING.</div>
      </div>
    );
  }

  return (
    <div className="font-mono">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs text-dark-muted tracking-widest">
          <span className="text-neon-green/50">&gt;</span> LOG.ENTRIES
        </div>
        {totalPages > 1 && (
          <div className="text-xs text-dark-muted">
            [{page}/{totalPages}] • {weights.length} TOTAL
          </div>
        )}
      </div>

      <div className="space-y-2">
        {entries.map((w, idx) => {
          const globalIdx = start + idx;
          const isLatest = globalIdx === 0;
          const prevWeight = globalIdx < reversed.length - 1 ? reversed[globalIdx + 1].weight_kg : null;
          const delta = prevWeight !== null ? w.weight_kg - prevWeight : null;
          const isUp = delta !== null && delta > 0;
          const isDown = delta !== null && delta < 0;

          return (
            <div
              key={w.id}
              className={`rounded p-3 text-xs transition-all ${
                isLatest
                  ? "panel-green bg-dark-card"
                  : "border border-dark-border/50 bg-dark-card/60 hover:border-dark-border"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  {/* Weight + delta */}
                  <div className="flex items-baseline gap-2 mb-1">
                    {isLatest && (
                      <span className="text-neon-green/40 text-xs">▶</span>
                    )}
                    <span
                      className={`font-bold text-base ${
                        isLatest
                          ? isUp
                            ? "text-neon-red"
                            : isDown
                            ? "text-neon-green glow-green"
                            : "text-neon-green"
                          : "text-neon-green/70"
                      }`}
                    >
                      {w.weight_kg}
                    </span>
                    <span className="text-dark-muted">KG</span>
                    {delta !== null && (
                      <span
                        className={`text-xs ${
                          isUp ? "text-neon-red" : "text-neon-green"
                        }`}
                      >
                        {isUp ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}
                      </span>
                    )}
                    {w.exercised && (
                      <span className="text-neon-cyan/70 text-xs ml-1" title="Exercised">
                        [RUN]
                      </span>
                    )}
                    {isLatest && (
                      <span className="ml-auto text-neon-green/50 text-xs border border-neon-green/20 px-1 py-0 rounded">
                        LATEST
                      </span>
                    )}
                  </div>

                  {/* Timestamp */}
                  <div className="text-dark-muted text-xs">
                    <span className="text-neon-green/30">$</span>{" "}
                    {formatDate(w.recorded_at)}
                  </div>

                  {/* Notes */}
                  {w.details && (
                    <div className="mt-1.5 text-xs text-neon-cyan/50 border-l-2 border-dark-border pl-2 truncate">
                      // {w.details}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 mt-4 pt-3 border-t border-dark-border/40">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-2 py-1 text-xs text-dark-muted disabled:opacity-30 hover:text-neon-green transition-colors"
          >
            ◀
          </button>

          {getPageNums().map((n, i) =>
            n < 0 ? (
              <span key={`sep${i}`} className="px-1 text-dark-muted/40 text-xs">
                ···
              </span>
            ) : (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`px-2 py-1 text-xs rounded transition-all ${
                  page === n
                    ? "bg-neon-green text-dark-base font-bold"
                    : "text-dark-muted hover:text-neon-green"
                }`}
              >
                {n}
              </button>
            )
          )}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-2 py-1 text-xs text-dark-muted disabled:opacity-30 hover:text-neon-green transition-colors"
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
}
