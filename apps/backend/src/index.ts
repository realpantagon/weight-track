import { Hono } from "hono";
import { cors } from "hono/cors"
import { createClient } from "@supabase/supabase-js";
import type { NewWeightEntry, WeightEntry } from "./types";

type Bindings = {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("/*", cors())

function getSupabase(c: any) {
  return createClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_ROLE_KEY);
}

//get ALL weight entries
app.get("/api/weight", async (c) => {
  const supabase = getSupabase(c);
  const { data, error } = await supabase
    .from("Pantagon_Weight")
    .select("*")
    .order("recorded_at", { ascending: true });

  if (error) {
    return c.json({ error: error.message }, 500);
  }
  return c.json<WeightEntry[]>(data);
});

//get MIN weight entry
app.get("/api/weight/min", async (c) => {
  const supabase = getSupabase(c);
  const { data, error } = await supabase
    .from("Pantagon_Weight")
    .select("weight_kg")
    .order("weight_kg", { ascending: true }) //ascending
    .limit(1); // first one
  if (error) {
    return c.json({ error: error.message }, 500);
  }
  return c.json({ min: data?.[0]?.weight_kg ?? null });
});

//get MAX weight entry
app.get("/api/weight/max", async (c) => {
  const supabase = getSupabase(c);
  const { data, error } = await supabase
    .from("Pantagon_Weight")
    .select("weight_kg")
    .order("weight_kg", { ascending: false }) // descending
    .limit(1); // first one
  if (error) {
    return c.json({ error: error.message }, 500);
  }
  return c.json({ max: data?.[0]?.weight_kg ?? null });
});

//get AVERAGE weight entry
app.get("/api/weight/avg", async (c) => {
  const supabase = getSupabase(c);
  const { data, error } = await supabase
    .from("Pantagon_Weight")
    .select("weight_kg");

  if (error) {
    return c.json({ error: error.message }, 500);
  }

  if (!data || data.length === 0) {
    return c.json({ average: null });
  }

  const avg =
    data.reduce((sum, row) => sum + Number(row.weight_kg), 0) / data.length;

  return c.json({ average: Number(avg.toFixed(2)) });
});

//add a new weight entry
app.post("/api/weight", async (c) => {
  const supabase = getSupabase(c);
  const newEntry = await c.req.json<NewWeightEntry>();
  const { data, error } = await supabase
    .from("Pantagon_Weight")
    .insert({
      weight_kg: newEntry.weight_kg,
      details: newEntry.details,
      recorded_at: newEntry.recorded_at,
      exercised: newEntry.exercised,
    })
    .select()
    .single();
  if (error) {
    return c.json({ error: error.message }, 500);
  }
  return c.json<WeightEntry>(data, 201);
});

export default app;
