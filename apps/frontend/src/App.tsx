import { useState, useEffect } from "react";
import { 
  AddButton,
  AddWeightModal, 
  Header,
  WeightChart, 
  WeightEntriesList, 
  WeightStatsComponent 
} from "./Components";
import { fetchWeights, addWeightEntry } from "./api.ts";
import type { WeightEntry, NewWeightEntry, WeightStats } from "./types.ts";

function App() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [weights, setWeights] = useState<WeightEntry[]>([]);

  useEffect(() => {
    fetchWeights().then(setWeights);
  }, []);

  // Calculate statistics
  const stats: WeightStats | null = weights.length > 1 ? {
    totalChange: weights[weights.length - 1].Weight - weights[0].Weight,
    minWeight: Math.min(...weights.map(w => w.Weight)),
    maxWeight: Math.max(...weights.map(w => w.Weight)),
    avgWeight: weights.reduce((sum, w) => sum + w.Weight, 0) / weights.length,
  } : null;

  const handleSave = async (entry: NewWeightEntry): Promise<void> => {
    const newEntry = await addWeightEntry(entry);
    setWeights((prev) => [...prev, newEntry]);
    setShowModal(false);
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-sans">
      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <Header 
          totalEntries={weights.length}
          latestEntryDate={weights.length > 0 ? weights[weights.length - 1].Date : undefined}
          formatDate={formatDate}
        />

        {/* Chart Section */}
        <WeightChart weights={weights} />

        {/* Statistics Section */}
        <WeightStatsComponent stats={stats} />

        {/* Add Button */}
        <AddButton onClick={() => setShowModal(true)} />

        {/* Weight History */}
        <WeightEntriesList weights={weights} formatDate={formatDate} />
      </div>

      {showModal && (
        <AddWeightModal
          onSave={handleSave}
          onClose={() => setShowModal(false)}
          defaultWeight={
            weights.length > 0 ? weights[weights.length - 1].Weight : 83.0
          }
        />
      )}
    </div>
  );
}

export default App;