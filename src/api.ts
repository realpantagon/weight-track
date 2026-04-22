import type { WeightEntry, NewWeightEntry } from "./types";

const BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? "/api";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export const fetchWeights = () => get<WeightEntry[]>("/weight");
export const fetchMinWeight = () => get<{ min: number }>("/weight/min").then((d) => d.min);
export const fetchMaxWeight = () => get<{ max: number }>("/weight/max").then((d) => d.max);
export const fetchAvgWeight = () => get<{ average: number }>("/weight/avg").then((d) => d.average);

export async function addWeightEntry(entry: NewWeightEntry): Promise<WeightEntry> {
  const res = await fetch(`${BASE}/weight`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });
  if (!res.ok) throw new Error(`POST /weight failed: ${res.status}`);
  return res.json() as Promise<WeightEntry>;
}
