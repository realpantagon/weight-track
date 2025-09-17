export interface WeightEntry {
  id: string;
  Date: string; // ISO date string
  Weight: number; // in kg
  Details?: string; // optional note
  Exercise?: boolean; // whether user exercised
}

export interface NewWeightEntry {
  date: string;
  weight: number;
  note?: string;
  exercise?: boolean;
}

export interface WeightStats {
  totalChange: number;
  minWeight: number;
  maxWeight: number;
  avgWeight: number;
}

export interface ChartDataPoint {
  date: string;
  fullDate: string;
  weight: number;
}
