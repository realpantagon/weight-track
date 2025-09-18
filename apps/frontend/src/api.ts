import type { WeightEntry, NewWeightEntry } from "./types";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function fetchWeights(): Promise<WeightEntry[]> {
  const res = await fetch(`${API_BASE}/weight`);
  console.log("fetchWeights response:", res.status, res.statusText);

  if (!res.ok) throw new Error("Failed to fetch weights");
  const data = await res.json();
  console.log("fetchWeights data:", data);
  return data;
}


export async function fetchMinWeight(): Promise<number> {
  const res = await fetch(`${API_BASE}/weight/min`);
  console.log("response" + res);

  if (!res.ok) throw new Error("Failed to fetch min weight");
  const data = await res.json();
  return data.min;
}


export async function fetchMaxWeight(): Promise<number> {
  const res = await fetch(`${API_BASE}/weight/max`);
  console.log("response" + res);

  if (!res.ok) throw new Error("Failed to fetch max weight");
  const data = await res.json();
  return data.max;
}

export async function fetchAvgWeight(): Promise<number> {
  const res = await fetch(`${API_BASE}/weight/avg`);
  console.log("response" + res);

  if (!res.ok) throw new Error("Failed to fetch avg weight");
  const data = await res.json();
  return data.average;
}

export async function addWeightEntry(entry: NewWeightEntry): Promise<WeightEntry> {
  const res = await fetch(`${API_BASE}/weight`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entry),
  });

  if (!res.ok) throw new Error("Failed to add weight entry");
  return res.json();
}


