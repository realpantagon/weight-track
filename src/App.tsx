import { useState, useEffect } from "react";
import {
  AddButton,
  AddWeightModal,
  Header,
  WeightChart,
  WeightEntriesList,
  WeightStatsComponent,
  HealthReport,
} from "./components";
import {
  fetchWeights,
  addWeightEntry,
  fetchMinWeight,
  fetchMaxWeight,
  fetchAvgWeight,
} from "./api";
import type { WeightEntry, NewWeightEntry } from "./types";
import type { AppPage } from "./data/healthData";

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>("weight");
  const [showModal, setShowModal] = useState(false);
  const [weights, setWeights] = useState<WeightEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    totalChange: number;
    minWeight: number;
    maxWeight: number;
    avgWeight: number;
  } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeights();
      setWeights(data);
      if (data.length > 1) {
        const [min, max, avg] = await Promise.all([
          fetchMinWeight(),
          fetchMaxWeight(),
          fetchAvgWeight(),
        ]);
        setStats({
          totalChange: data[data.length - 1].weight_kg - data[0].weight_kg,
          minWeight: min,
          maxWeight: max,
          avgWeight: avg,
        });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "UNKNOWN_ERROR");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(entry: NewWeightEntry) {
    const newEntry = await addWeightEntry(entry);
    const updated = [...weights, newEntry];
    setWeights(updated);
    if (updated.length > 1) {
      const [min, max, avg] = await Promise.all([
        fetchMinWeight(),
        fetchMaxWeight(),
        fetchAvgWeight(),
      ]);
      setStats({
        totalChange: updated[updated.length - 1].weight_kg - updated[0].weight_kg,
        minWeight: min,
        maxWeight: max,
        avgWeight: avg,
      });
    }
    setShowModal(false);
  }

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  return (
    <div
      className="min-h-screen scanlines grid-bg text-neon-green font-mono"
      style={{ backgroundColor: "#050507" }}
    >
      <div className="max-w-md mx-auto px-4 pb-8 pt-2">
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-screen gap-3">
            <div className="text-neon-green text-sm glow-green cursor">
              INITIALIZING WEIGHT.TRACKER
            </div>
            <div className="text-dark-muted text-xs">FETCHING DATA FROM SUPABASE...</div>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center min-h-screen gap-3">
            <div className="text-neon-red text-sm">⚠ SYSTEM.ERROR</div>
            <div className="text-xs text-dark-muted font-mono px-4 py-2 border border-neon-red/30 rounded">
              {error}
            </div>
            <button
              onClick={loadData}
              className="text-xs text-neon-green border border-neon-green/30 px-4 py-2 rounded hover:bg-neon-green/10 transition-colors"
            >
              [ RETRY ]
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <Header
              totalEntries={weights.length}
              latestEntryDate={
                weights.length > 0 ? weights[weights.length - 1].recorded_at : undefined
              }
              formatDate={formatDate}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />

            {currentPage === "weight" && (
              <>
                <WeightChart weights={weights} />
                <WeightStatsComponent stats={stats} />
                <AddButton onClick={() => setShowModal(true)} />
                <WeightEntriesList weights={weights} formatDate={formatDate} />
              </>
            )}

            {currentPage === "health" && <HealthReport />}
          </>
        )}
      </div>

      {showModal && (
        <AddWeightModal
          onSave={handleSave}
          onClose={() => setShowModal(false)}
          defaultWeight={
            weights.length > 0 ? weights[weights.length - 1].weight_kg : 83.0
          }
        />
      )}
    </div>
  );
}

export default App;
