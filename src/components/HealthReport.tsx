import { useState } from "react";
import {
  HEALTH_SUMMARY,
  abnormalAlerts,
  bloodAnalysis,
  healthCheckSections,
  additionalNormals,
} from "../data/healthData";
import type { HealthStatus, BloodStatus } from "../data/healthData";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StatusDot({ status }: { status: HealthStatus | BloodStatus }) {
  const color =
    status === "Abnormal" || status === "abnormal"
      ? "bg-neon-red"
      : status === "Watch" || status === "watch"
      ? "bg-neon-amber"
      : "bg-neon-green";
  return <span className={`inline-block w-1.5 h-1.5 rounded-full ${color} flex-shrink-0 mt-1`} />;
}

function StatusBadge({ status }: { status: HealthStatus | BloodStatus }) {
  if (status === "Abnormal" || status === "abnormal")
    return <span className="text-neon-red text-xs font-bold">[!!]</span>;
  if (status === "Watch" || status === "watch")
    return <span className="text-neon-amber text-xs font-bold">[~~]</span>;
  return <span className="text-neon-green/50 text-xs">[OK]</span>;
}

function parseReference(ref: string): { min: number | null; max: number | null } {
  const ltMatch = ref.match(/^[<≤]\s*([\d.]+)/);
  if (ltMatch) return { min: 0, max: parseFloat(ltMatch[1]) };
  const gtMatch = ref.match(/^[>≥]\s*([\d.]+)/);
  if (gtMatch) return { min: parseFloat(gtMatch[1]), max: null };
  const rangeMatch = ref.match(/([\d.]+)\s*[–-]\s*([\d.]+)/);
  if (rangeMatch) return { min: parseFloat(rangeMatch[1]), max: parseFloat(rangeMatch[2]) };
  return { min: null, max: null };
}

function ValueBar({ value, reference, status }: { value: string; reference: string; status: BloodStatus }) {
  const num = parseFloat(value);
  if (isNaN(num)) return null;
  const { min, max } = parseReference(reference);
  if (min === null && max === null) return null;

  let pct = 0;
  if (max !== null && min !== null) {
    const span = Math.max(max * 1.4, num * 1.1) - min;
    pct = Math.min(100, Math.max(2, ((num - min) / span) * 100));
  } else if (max !== null) {
    pct = Math.min(100, Math.max(2, (num / (max * 1.4)) * 100));
  } else if (min !== null) {
    pct = Math.min(100, Math.max(2, (num / (min * 2)) * 100));
  }

  const fillColor =
    status === "abnormal" ? "#ff3333" : status === "watch" ? "#ffa500" : "#00ff41";

  return (
    <div className="mt-1 w-full h-1 bg-dark-border rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${pct}%`, backgroundColor: fillColor, opacity: 0.7 }}
      />
    </div>
  );
}

// ─── Section 1: Header ────────────────────────────────────────────────────────

function HealthReportHeader() {
  const s = HEALTH_SUMMARY;
  const totalBar = (n: number) =>
    Math.round((n / s.totalItems) * 20);

  return (
    <div className="mb-5 font-mono">
      <div className="flex items-center justify-between mb-1 text-xs text-dark-muted">
        <span>HEALTH.REPORT v1.0</span>
        <span className="text-neon-cyan/40">{s.examDate}</span>
      </div>

      <div
        className="rounded p-4 bg-dark-card mb-3"
        style={{ border: "1px solid rgba(0,212,255,0.25)", boxShadow: "0 0 20px rgba(0,212,255,0.04)" }}
      >
        {/* Title row */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-neon-cyan text-xs">●</span>
          <span className="text-neon-cyan font-bold text-base tracking-widest uppercase"
            style={{ textShadow: "0 0 8px rgba(0,212,255,0.8)" }}>
            HEALTH.SCAN.COMPLETE
          </span>
          <span className="ml-auto text-xs text-neon-cyan/40 border border-neon-cyan/20 px-1.5 py-0.5 rounded">
            REVIEWED
          </span>
        </div>

        {/* Subject info */}
        <div className="text-xs text-dark-muted mb-3">
          <span className="text-neon-green/50">&gt;</span>{" "}
          <span className="text-neon-cyan/60">SUBJECT</span>
          <span className="text-dark-border2 mx-1">:</span>
          <span className="text-neon-green/80 font-sans">
            MALE / AGE:{s.subject.age} / {s.subject.height}CM / {s.subject.weight}KG
          </span>
          <span className="text-dark-muted mx-1">|</span>
          <span className="text-neon-green/50">{s.examDate}</span>
        </div>

        {/* Counters */}
        <div className="space-y-1.5 text-xs">
          {[
            { label: "TOTAL",    count: s.totalItems,    color: "text-neon-green/70", barColor: "#00ff41", fill: totalBar(s.totalItems) },
            { label: "NORMAL",   count: s.normalCount,   color: "text-neon-green",    barColor: "#00ff41", fill: totalBar(s.normalCount) },
            { label: "WATCH",    count: s.watchCount,    color: "text-neon-amber",    barColor: "#ffa500", fill: totalBar(s.watchCount) },
            { label: "ABNORMAL", count: s.abnormalCount, color: "text-neon-red",      barColor: "#ff3333", fill: totalBar(s.abnormalCount) },
          ].map(({ label, count, color, barColor, fill }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-dark-muted w-16">{label}</span>
              <span className={`${color} font-bold w-4 text-right`}>{count}</span>
              <div className="flex-1 h-1 bg-dark-border rounded-full">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(fill / 20) * 100}%`, backgroundColor: barColor, opacity: 0.6 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-dark-muted/40">
        <span>──</span>
        <span className="tracking-widest">SYS.HEALTH_MONITOR</span>
        <span className="flex-1 border-t border-dark-border/40" />
      </div>
    </div>
  );
}

// ─── Section 2: Critical Alerts ───────────────────────────────────────────────

function CriticalAlertsPanel() {
  return (
    <div className="mb-5 font-mono">
      <div className="text-xs text-dark-muted mb-3 tracking-widest">
        <span className="text-neon-red/70">&gt;</span>{" "}
        <span className="text-neon-red/80">CRITICAL.ALERTS</span>
        <span className="text-dark-muted/50 ml-2">[{abnormalAlerts.length} ITEMS REQUIRE ATTENTION]</span>
      </div>

      <div className="space-y-3">
        {abnormalAlerts.map((alert) => {
          const isHigh = alert.urgency === "สูง";
          const borderColor = isHigh ? "rgba(255,51,51,0.35)" : "rgba(255,165,0,0.35)";
          const glowColor = isHigh ? "rgba(255,51,51,0.06)" : "rgba(255,165,0,0.06)";
          const accentColor = isHigh ? "text-neon-red" : "text-neon-amber";

          return (
            <div
              key={alert.rank}
              className="rounded p-4 bg-dark-card"
              style={{ border: `1px solid ${borderColor}`, boxShadow: `0 0 15px ${glowColor}` }}
            >
              {/* Alert header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className={`${accentColor} text-xs font-bold`}>[!]</span>
                  <span className={`${accentColor} font-bold text-sm tracking-wide`}>
                    #{alert.rank} {alert.code.toUpperCase()}
                  </span>
                </div>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded border ${
                    isHigh
                      ? "border-neon-red/40 text-neon-red"
                      : "border-neon-amber/40 text-neon-amber"
                  }`}
                >
                  <span className="font-sans">{alert.urgency}</span>
                </span>
              </div>

              {/* Value / reference row */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                <div>
                  <span className="text-dark-muted">VALUE</span>
                  <span className="text-dark-border2 mx-1">:</span>
                  <span className={`${accentColor} font-bold`}>{alert.value} {alert.unit}</span>
                </div>
                <div>
                  <span className="text-dark-muted">REF</span>
                  <span className="text-dark-border2 mx-1">:</span>
                  <span className="text-neon-green/60">{alert.reference}</span>
                </div>
              </div>

              {/* Thai severity + risk */}
              <div className={`text-xs ${accentColor} mb-2 font-sans`}>
                {alert.thaiSeverity} — {alert.thaiRisk}
              </div>

              {/* Divider */}
              <div className="border-t border-dark-border/40 pt-2 mt-2">
                <div className="text-xs text-dark-muted/60 mb-1 tracking-widest">RECOMMENDATIONS:</div>
                <div className="space-y-0.5">
                  {alert.actions.map((action, i) => (
                    <div key={i} className="text-xs flex gap-2">
                      <span className="text-dark-muted/50 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}.
                      </span>
                      <span className="text-neon-green/70 font-sans">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Section 3: Blood Analysis ────────────────────────────────────────────────

function BloodAnalysisPanel() {
  const [open, setOpen] = useState<Set<string>>(
    () => new Set(bloodAnalysis.map((c) => c.id))
  );

  function toggle(id: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const totalCount = bloodAnalysis.reduce((s, c) => s + c.items.length, 0);

  return (
    <div className="mb-5 font-mono">
      <div className="text-xs text-dark-muted mb-3 tracking-widest">
        <span className="text-neon-cyan/50">&gt;</span> BLOOD.ANALYSIS
        <span className="text-dark-muted/50 ml-2">[{totalCount} MARKERS]</span>
      </div>

      <div className="space-y-2">
        {bloodAnalysis.map((cat) => {
          const isOpen = open.has(cat.id);
          const abnCount = cat.items.filter((i) => i.status === "abnormal").length;
          const watchCount = cat.items.filter((i) => i.status === "watch").length;

          return (
            <div key={cat.id} className="border border-dark-border/60 rounded bg-dark-card overflow-hidden">
              {/* Category header (clickable) */}
              <button
                onClick={() => toggle(cat.id)}
                className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-dark-elevated/50 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-neon-cyan/50 font-bold">[</span>
                  <span className="text-neon-green/80 tracking-wider">{cat.englishName}</span>
                  <span className="text-dark-muted font-sans">/</span>
                  <span className="text-dark-muted font-sans">{cat.thaiName}</span>
                  <span className="text-neon-cyan/50 font-bold">]</span>
                </div>
                <div className="flex items-center gap-2">
                  {abnCount > 0 && (
                    <span className="text-xs text-neon-red border border-neon-red/30 px-1 py-0 rounded">
                      {abnCount}!!
                    </span>
                  )}
                  {watchCount > 0 && (
                    <span className="text-xs text-neon-amber border border-neon-amber/30 px-1 py-0 rounded">
                      {watchCount}~~
                    </span>
                  )}
                  <span className="text-dark-muted text-xs">{isOpen ? "▲" : "▼"}</span>
                </div>
              </button>

              {/* Items */}
              {isOpen && (
                <div className="border-t border-dark-border/40 divide-y divide-dark-border/20">
                  {cat.items.map((item) => (
                    <div key={item.code} className="px-3 py-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 flex-1 min-w-0">
                          <StatusDot status={item.status} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs text-neon-green/80 font-bold">{item.code}</span>
                              <span className="text-xs text-dark-muted font-sans truncate">{item.thaiLabel}</span>
                            </div>
                            <div className="flex items-baseline gap-2 mt-0.5 flex-wrap">
                              <span
                                className={`text-sm font-bold ${
                                  item.status === "abnormal"
                                    ? "text-neon-red"
                                    : item.status === "watch"
                                    ? "text-neon-amber"
                                    : "text-neon-green"
                                }`}
                              >
                                {item.value}
                              </span>
                              <span className="text-xs text-dark-muted">{item.unit}</span>
                              <span className="text-xs text-dark-muted/50">ref: {item.reference}</span>
                            </div>
                            <ValueBar value={item.value} reference={item.reference} status={item.status} />
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <StatusBadge status={item.status} />
                          {item.urgency && (
                            <span
                              className={`text-xs px-1 py-0 rounded border font-sans ${
                                item.urgency === "สูง"
                                  ? "border-neon-red/40 text-neon-red"
                                  : "border-neon-amber/40 text-neon-amber"
                              }`}
                            >
                              {item.urgency}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Section 4: Standard Check ────────────────────────────────────────────────

function StandardCheckPanel() {
  const [activeTab, setActiveTab] = useState("general");

  const section = healthCheckSections.find((s) => s.id === activeTab)!;

  // Sort: abnormal first, then watch, then normal
  const sorted = [...section.rows].sort((a, b) => {
    const rank = (s: string) => (s === "Abnormal" ? 0 : s === "Watch" ? 1 : 2);
    return rank(a.status) - rank(b.status);
  });

  // Count abnormals per section for badge
  const getAbnCount = (id: string) =>
    healthCheckSections.find((s) => s.id === id)?.rows.filter((r) => r.status === "Abnormal").length ?? 0;

  return (
    <div className="mb-5 font-mono">
      <div className="text-xs text-dark-muted mb-3 tracking-widest">
        <span className="text-neon-green/50">&gt;</span> STANDARD.CHECK
        <span className="text-dark-muted/50 ml-2">[60 ROWS]</span>
      </div>

      {/* Tab row — horizontal scroll */}
      <div className="flex gap-1 overflow-x-auto pb-1 mb-3 scrollbar-none">
        {healthCheckSections.map((s) => {
          const abn = getAbnCount(s.id);
          const isActive = s.id === activeTab;
          return (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              className={`flex-shrink-0 px-2 py-1 text-xs rounded transition-all flex items-center gap-1 ${
                isActive
                  ? "bg-neon-green text-dark-base font-bold"
                  : "text-dark-muted border border-dark-border hover:border-neon-green/40 hover:text-neon-green"
              }`}
            >
              {s.label.split(" ")[0]}
              {abn > 0 && (
                <span className={`text-xs ${isActive ? "text-dark-base" : "text-neon-red"}`}>
                  ·{abn}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Rows */}
      <div className="border border-dark-border/60 rounded bg-dark-card overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 px-3 py-1.5 border-b border-dark-border/40 text-xs text-dark-muted/60 tracking-widest">
          <span>ITEM</span>
          <span className="text-right">RESULT</span>
          <span className="text-right">REF</span>
          <span className="text-right">STATUS</span>
        </div>

        <div className="divide-y divide-dark-border/20">
          {sorted.map((row, i) => {
            const isAbn = row.status === "Abnormal";
            const isWatch = row.status === "Watch";
            return (
              <div
                key={i}
                className={`grid grid-cols-[1fr_auto_auto_auto] gap-2 px-3 py-2 items-center border-l-2 ${
                  isAbn
                    ? "border-l-neon-red bg-neon-red/5"
                    : isWatch
                    ? "border-l-neon-amber bg-neon-amber/5"
                    : "border-l-dark-border/30"
                }`}
              >
                <span
                  className={`text-xs truncate ${
                    isAbn ? "text-neon-red/90" : isWatch ? "text-neon-amber/90" : "text-neon-cyan/60"
                  }`}
                >
                  {row.item}
                </span>
                <span
                  className={`text-xs font-bold text-right ${
                    isAbn ? "text-neon-red" : isWatch ? "text-neon-amber" : "text-neon-green/80"
                  }`}
                >
                  {row.result}
                  {row.unit && <span className="text-dark-muted ml-0.5 font-normal text-xs">{row.unit}</span>}
                </span>
                <span className="text-xs text-dark-muted/50 text-right">{row.reference}</span>
                <StatusBadge status={row.status} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Section 5: Additional Normals ───────────────────────────────────────────

function AdditionalNormalsPanel() {
  return (
    <div className="mb-5 font-mono">
      <div className="text-xs text-dark-muted mb-3 tracking-widest">
        <span className="text-neon-green/50">&gt;</span> ADDITIONAL.NORMALS
        <span className="text-dark-muted/50 ml-2">[{additionalNormals.length} MARKERS]</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {additionalNormals.map((item) => (
          <div
            key={item.code}
            className="border border-dark-border/60 rounded bg-dark-card p-3"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green/60 flex-shrink-0" />
              <span className="text-xs text-neon-green/80 font-bold truncate">{item.code}</span>
            </div>
            <div className="text-xs text-dark-muted font-sans leading-tight mb-1.5 truncate">
              {item.thaiLabel}
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-sm font-bold text-neon-green">{item.value}</span>
              {item.unit && <span className="text-xs text-dark-muted">{item.unit}</span>}
            </div>
            <div className="text-xs text-dark-muted/50">ref: {item.reference}</div>
            <div className="text-xs text-neon-green/50 mt-1 font-sans leading-tight">{item.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function HealthReport() {
  return (
    <>
      <HealthReportHeader />
      <CriticalAlertsPanel />
      <BloodAnalysisPanel />
      <StandardCheckPanel />
      <AdditionalNormalsPanel />
    </>
  );
}
