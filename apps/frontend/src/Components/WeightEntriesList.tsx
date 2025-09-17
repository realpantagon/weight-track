import { useState } from "react";
import type { WeightEntry } from "../types";

interface WeightEntriesListProps {
  weights: WeightEntry[];
  formatDate: (dateStr: string) => string;
}

const ENTRIES_PER_PAGE = 10;

export default function WeightEntriesList({ weights, formatDate }: WeightEntriesListProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Reverse the weights array to show most recent first
  const reversedWeights = weights.slice().reverse();
  
  // Calculate pagination
  const totalPages = Math.ceil(reversedWeights.length / ENTRIES_PER_PAGE);
  const startIndex = (currentPage - 1) * ENTRIES_PER_PAGE;
  const endIndex = startIndex + ENTRIES_PER_PAGE;
  const currentEntries = reversedWeights.slice(startIndex, endIndex);
  
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show truncated pagination
      if (currentPage <= 3) {
        // Show first 3, then ... then last
        pages.push(1, 2, 3, 4);
        if (totalPages > 4) pages.push(-1); // -1 represents "..."
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show first, then ... then last 3
        pages.push(1);
        if (totalPages > 4) pages.push(-1);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show first, ... current-1, current, current+1, ... last
        pages.push(1);
        pages.push(-1);
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push(-1);
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (weights.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No weight entries yet. Add your first entry!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-emerald-400">Recent Entries</h3>
        {totalPages > 1 && (
          <div className="text-sm text-gray-400">
            Page {currentPage} of {totalPages} • {weights.length} total entries
          </div>
        )}
      </div>
      
      {/* Weight Entries */}
      <div className="space-y-3">
        {currentEntries.map((w, index) => {
          const globalIndex = startIndex + index; // Index in the reversed array
          const isLatest = globalIndex === 0; // First item in reversed array is latest
          const previousWeight =
            globalIndex < reversedWeights.length - 1
              ? reversedWeights[globalIndex + 1].Weight
              : null;

          const weightDiff = previousWeight !== null ? w.Weight - previousWeight : 0;
          const weightColor =
            isLatest && previousWeight !== null
              ? w.Weight > previousWeight
                ? "text-red-400"
                : "text-green-400"
              : "text-white";

          return (
            <div
              key={w.id}
              className={`relative p-4 rounded-xl border transition-all duration-200 ${
                isLatest 
                  ? "bg-gradient-to-br from-gray-800/80 to-gray-700/80 border-emerald-500/30 shadow-lg" 
                  : "bg-gray-800/40 border-gray-700/50 hover:bg-gray-800/60"
              } backdrop-blur-sm`}
            >
              {isLatest && (
                <div className="absolute -top-2 -right-2 bg-emerald-500 text-xs px-2 py-1 rounded-full font-medium">
                  Latest
                </div>
              )}
              
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-xl font-bold flex items-center gap-2 ${isLatest ? weightColor : "text-white"}`}>
                    {w.Weight} kg
                    {w.Exercise === true && (
                      <span title="Exercised" className="inline-block align-middle text-emerald-400 text-lg ml-1">🏃‍♂️</span>
                    )}
                  </p>
                  {isLatest && previousWeight !== null && (
                    <p className={`text-sm font-medium ${weightColor}`}>
                      {weightDiff > 0 ? '+' : ''}{weightDiff.toFixed(1)}kg from previous
                    </p>
                  )}
                  <p className="text-sm text-gray-400 mt-1">{formatDate(w.Date)}</p>
                  {w.Details && (
                    <p className="text-sm mt-2 text-gray-300 bg-gray-700/50 px-2 py-1 rounded">
                      {w.Details}
                    </p>
                  )}
                </div>
                
                {isLatest && previousWeight !== null && (
                  <div className={`text-2xl ${weightColor}`}>
                    {w.Weight > previousWeight ? '↗️' : '↘️'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-700/50">
          {/* Previous Button */}
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              currentPage === 1
                ? "text-gray-500 cursor-not-allowed"
                : "text-gray-300 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            ← Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1 mx-4">
            {getPageNumbers().map((pageNum, index) => (
              <div key={index}>
                {pageNum === -1 ? (
                  <span className="px-2 py-1 text-gray-500">...</span>
                ) : (
                  <button
                    onClick={() => goToPage(pageNum)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentPage === pageNum
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                        : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                    }`}
                  >
                    {pageNum}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              currentPage === totalPages
                ? "text-gray-500 cursor-not-allowed"
                : "text-gray-300 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
