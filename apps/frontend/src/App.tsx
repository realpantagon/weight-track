import { useState, useEffect } from "react";
import { 
  AddButton,
  AddWeightModal, 
  Header,
  WeightChart, 
  WeightEntriesList, 
  WeightStatsComponent 
} from "./Components";
import { fetchWeights, addWeightEntry, fetchMinWeight, fetchMaxWeight, fetchAvgWeight } from "./api.ts";
import type { WeightEntry, NewWeightEntry } from "./types.ts";

function App() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [weights, setWeights] = useState<WeightEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    totalChange: number;
    minWeight: number;
    maxWeight: number;
    avgWeight: number;
  } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Loading weights data...");
        const weightsData = await fetchWeights();
        console.log("Weights data received:", weightsData);
        setWeights(weightsData);
        
        if (weightsData.length > 1) {
          console.log("Loading statistics...");
          const [minWeight, maxWeight, avgWeight] = await Promise.all([
            fetchMinWeight(),
            fetchMaxWeight(),
            fetchAvgWeight()
          ]);
          
          console.log("Stats received:", { minWeight, maxWeight, avgWeight });
          setStats({
            totalChange: weightsData[weightsData.length - 1].weight_kg - weightsData[0].weight_kg,
            minWeight,
            maxWeight,
            avgWeight
          });
        }
      } catch (error) {
        console.error("Error loading data:", error);
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleSave = async (entry: NewWeightEntry): Promise<void> => {
    const newEntry = await addWeightEntry(entry);
    const updatedWeights = [...weights, newEntry];
    setWeights(updatedWeights);
    
    // Update stats if we have enough data
    if (updatedWeights.length > 1) {
      const [minWeight, maxWeight, avgWeight] = await Promise.all([
        fetchMinWeight(),
        fetchMaxWeight(),
        fetchAvgWeight()
      ]);
      
      setStats({
        totalChange: updatedWeights[updatedWeights.length - 1].weight_kg - updatedWeights[0].weight_kg,
        minWeight,
        maxWeight,
        avgWeight
      });
    }
    
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
        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-400">Loading weight data...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-8">
            <p className="text-red-400">Error: {error}</p>
          </div>
        )}
        
        {!loading && !error && (
          <>
            {/* Header */}
            <Header 
              totalEntries={weights.length}
              latestEntryDate={weights.length > 0 ? weights[weights.length - 1].recorded_at : undefined}
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