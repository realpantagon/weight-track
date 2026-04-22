import { useState } from "react";
import type { NewWeightEntry } from "../types";

interface AddWeightModalProps {
  onSave: (entry: NewWeightEntry) => Promise<void>;
  onClose: () => void;
  defaultWeight: number;
}

export default function AddWeightModal({ onSave, onClose, defaultWeight }: AddWeightModalProps) {
  const intPart = Math.floor(defaultWeight || 83);
  const decPart = Math.round(((defaultWeight || 83) % 1) * 10);

  const [kg, setKg] = useState(intPart);
  const [dec, setDec] = useState(decPart);
  const [note, setNote] = useState("");
  const [exercise, setExercise] = useState(false);
  const [saving, setSaving] = useState(false);

  const now = new Date();
  const localISO = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
  const [date, setDate] = useState(localISO);

  async function handleSave() {
    if (saving) return;
    setSaving(true);
    await onSave({
      recorded_at: date,
      weight_kg: parseFloat(`${kg}.${dec}`),
      details: note.trim() || undefined,
      exercised: exercise,
    });
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-mono">
      <div
        className="w-full max-w-sm rounded bg-dark-card"
        style={{
          border: "1px solid rgba(0,255,65,0.3)",
          boxShadow: "0 0 40px rgba(0,255,65,0.1), inset 0 0 40px rgba(0,0,0,0.5)",
        }}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-dark-border">
          <div className="flex items-center gap-2">
            <span className="text-neon-green text-xs">●</span>
            <span className="text-neon-green text-xs font-bold tracking-widest">
              INPUT.WEIGHT_ENTRY
            </span>
          </div>
          <button
            onClick={onClose}
            disabled={saving}
            className="text-dark-muted hover:text-neon-red text-xs transition-colors"
          >
            [✕]
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Weight display */}
          <div className="text-center py-3 border border-dark-border rounded bg-dark-elevated">
            <div className="text-dark-muted text-xs mb-1 tracking-widest">WEIGHT_KG</div>
            <div className="text-4xl font-bold text-neon-green glow-green tabular-nums">
              {kg}.{dec}
              <span className="text-base text-dark-muted ml-1 font-normal">KG</span>
            </div>
          </div>

          {/* KG controls */}
          <div className="space-y-2">
            <CtrlRow
              label="KG (INTEGER)"
              value={`${kg}`}
              onDec={() => setKg((v) => Math.max(30, v - 1))}
              onInc={() => setKg((v) => Math.min(200, v + 1))}
            />
            <CtrlRow
              label="DECIMAL"
              value={`.${dec}`}
              onDec={() => setDec((v) => (v === 0 ? 9 : v - 1))}
              onInc={() => setDec((v) => (v === 9 ? 0 : v + 1))}
            />
          </div>

          {/* Datetime */}
          <div>
            <div className="text-xs text-dark-muted tracking-widest mb-1">TIMESTAMP</div>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded border border-dark-border bg-dark-elevated text-neon-green/80 focus:outline-none focus:border-neon-green/50 transition-colors"
            />
          </div>

          {/* Exercise toggle */}
          <div className="flex items-center justify-between px-3 py-2 rounded border border-dark-border bg-dark-elevated">
            <div>
              <div className="text-xs text-neon-cyan/70 tracking-widest">EXERCISE_FLAG</div>
              <div className="text-xs text-dark-muted mt-0.5">
                {exercise ? "TRUE — SESSION LOGGED" : "FALSE — REST DAY"}
              </div>
            </div>
            <button
              onClick={() => setExercise((v) => !v)}
              className={`px-3 py-1 text-xs rounded border transition-all ${
                exercise
                  ? "border-neon-cyan/50 text-neon-cyan bg-neon-cyan/10"
                  : "border-dark-border text-dark-muted hover:border-dark-border2"
              }`}
            >
              {exercise ? "[ON]" : "[OFF]"}
            </button>
          </div>

          {/* Notes */}
          <div>
            <div className="text-xs text-dark-muted tracking-widest mb-1">
              NOTES <span className="text-dark-muted/40">(OPTIONAL)</span>
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="// add notes..."
              rows={2}
              className="w-full px-3 py-2 text-xs rounded border border-dark-border bg-dark-elevated text-neon-green/60 placeholder:text-dark-muted/40 focus:outline-none focus:border-neon-green/40 resize-none transition-colors"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pb-4 flex gap-2">
          <button
            onClick={onClose}
            disabled={saving}
            className="flex-1 py-2.5 text-xs text-dark-muted border border-dark-border rounded hover:border-dark-border2 hover:text-neon-green/50 transition-all disabled:opacity-40"
          >
            [ CANCEL ]
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-2.5 text-xs font-bold rounded border border-neon-green/40 text-neon-green hover:bg-neon-green hover:text-dark-base transition-all hover:shadow-[0_0_15px_rgba(0,255,65,0.3)] disabled:opacity-40 active:scale-[0.98]"
          >
            {saving ? (
              <span className="cursor">WRITING</span>
            ) : (
              "[ EXECUTE ]"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function CtrlRow({
  label,
  value,
  onDec,
  onInc,
}: {
  label: string;
  value: string;
  onDec: () => void;
  onInc: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-dark-muted tracking-wider">{label}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={onDec}
          className="w-7 h-7 rounded border border-dark-border text-neon-green/60 text-sm hover:border-neon-green/40 hover:text-neon-green transition-colors"
        >
          −
        </button>
        <span className="text-sm font-bold text-neon-green w-10 text-center tabular-nums">
          {value}
        </span>
        <button
          onClick={onInc}
          className="w-7 h-7 rounded border border-dark-border text-neon-green/60 text-sm hover:border-neon-green/40 hover:text-neon-green transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
