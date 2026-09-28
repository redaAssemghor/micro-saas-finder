import { createHash } from "crypto";
import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";
import { isPlan, Plan } from "./plans";
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const cloud = !!url && !!key;
const queues = new Map<string, Promise<unknown>>();
async function db(query: string, init?: RequestInit) {
  const response = await fetch(url!.replace(/\/$/, "") + "/rest/v1/startup_plans?" + query, {
    ...init, cache: "no-store", signal: AbortSignal.timeout(15000),
    headers: { apikey: key!, Authorization: "Bearer " + key, "Content-Type": "application/json", ...init?.headers }
  });
  if (!response.ok) throw new Error("STORAGE_UNAVAILABLE");
  return response;
}
function localFile(userId: string) {
  if (process.env.NODE_ENV === "production" && process.env.ALLOW_LOCAL_PLAN_STORAGE !== "true") throw new Error("STORAGE_UNAVAILABLE");
  return path.join(process.env.PLAN_STORAGE_DIR || path.join(process.cwd(), ".data", "plans"), createHash("sha256").update(userId).digest("hex") + ".json");
}
export async function getPlans(userId: string): Promise<Plan[]> {
  if (cloud) {
    const response = await db("user_id=eq." + encodeURIComponent(userId) + "&select=plan&order=created_at.desc&limit=100");
    const rows = await response.json();
    return rows.map((r: { plan: unknown }) => r.plan).filter(isPlan);
  }
  try { const data = JSON.parse(await readFile(localFile(userId), "utf8")); return Array.isArray(data) ? data.filter(isPlan) : []; }
  catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return []; throw error; }
}
export async function mutatePlan(userId: string, planOrId: Plan | string): Promise<void> {
  if (cloud) {
    if (typeof planOrId === "string") {
      await db("user_id=eq." + encodeURIComponent(userId) + "&id=eq." + encodeURIComponent(planOrId), { method: "DELETE" });
    } else {
      await db("on_conflict=user_id,id", { method: "POST", headers: { Prefer: "resolution=merge-duplicates" }, body: JSON.stringify({ user_id: userId, id: planOrId.id, plan: planOrId, created_at: planOrId.createdAt }) });
    }
    return;
  }
  const previous = queues.get(userId) || Promise.resolve();
  const next = previous.catch(() => {}).then(async () => {
    const file = localFile(userId);
    const existing = await getPlans(userId);
    const id = typeof planOrId === "string" ? planOrId : planOrId.id;
    const plans = existing.filter(p => p.id !== id);
    if (typeof planOrId !== "string") plans.unshift(planOrId);
    if (plans.length > 100) throw new Error("PLAN_LIMIT");
    await mkdir(path.dirname(file), { recursive: true });
    const temporary = file + "." + crypto.randomUUID() + ".tmp";
    await writeFile(temporary, JSON.stringify(plans), { mode: 0o600 });
    await rename(temporary, file);
  });
  queues.set(userId, next);
  try { await next; } finally { if (queues.get(userId) === next) queues.delete(userId); }
}
