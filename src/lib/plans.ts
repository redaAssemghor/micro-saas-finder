export const categories = ["AI assistants", "Workflow automation", "Analytics", "Developer tools", "Marketing", "Customer support"] as const;
export const models = { balanced: "qwen3.5:9b", quality: "qwen3.5:27b", lightweight: "qwen3.5:4b" } as const;
export type Settings = { niche: string; categories: string[]; audience: string; budget: string; timeline: string; experience: string; market: string; model: keyof typeof models };
export const defaultSettings: Settings = { niche: "", categories: ["Workflow automation"], audience: "Small businesses", budget: "Under $500", timeline: "4 weeks", experience: "Intermediate", market: "United States", model: "balanced" };
export type Plan = {
  id: string; createdAt: string; title: string; tagline: string; summary: string;
  problem: string; audience: string; differentiator: string; businessModel: string;
  features: string[]; validation: string[]; risks: string[];
  technical: { stack: string[]; dataModel: string[]; integrations: string[]; security: string[]; requirements: string[] };
  seo: { keywords: { keyword: string; intent: string }[]; contentIdeas: string[]; title: string; description: string };
  roadmap: { phase: string; tasks: string[] }[]; settings: Settings; model: string;
};
const record = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);
const str = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0 && v.length <= 3000;
const list = (v: unknown): v is string[] => Array.isArray(v) && v.length > 0 && v.length <= 15 && v.every(str);
export function isPlanContent(v: unknown): boolean {
  if (!record(v)) return false;
  if (!["title", "tagline", "summary", "problem", "audience", "differentiator", "businessModel"].every(k => str(v[k]))) return false;
  if (!["features", "validation", "risks"].every(k => list(v[k]))) return false;
  if (!record(v.technical) || !["stack", "dataModel", "integrations", "security", "requirements"].every(k => list((v.technical as Record<string, unknown>)[k]))) return false;
  if (!record(v.seo) || !str(v.seo.title) || !str(v.seo.description) || !list(v.seo.contentIdeas)) return false;
  if (!Array.isArray(v.seo.keywords) || !v.seo.keywords.length || v.seo.keywords.length > 15 || !v.seo.keywords.every(k => record(k) && str(k.keyword) && str(k.intent))) return false;
  return Array.isArray(v.roadmap) && v.roadmap.length > 0 && v.roadmap.length <= 8 && v.roadmap.every(p => record(p) && str(p.phase) && list(p.tasks));
}
export function parseSettings(v: unknown): Settings | null {
  if (!record(v) || typeof v.niche !== "string" || v.niche.trim().length < 3 || v.niche.length > 160) return null;
  if (!Array.isArray(v.categories) || !v.categories.length || v.categories.length > 6 || !v.categories.every(c => categories.includes(c as typeof categories[number]))) return null;
  const allowed: Record<string, string[]> = {
    audience: ["Small businesses", "Solo founders", "Agencies", "Consumers", "Enterprise teams"],
    budget: ["Under $500", "$500–$2,000", "$2,000–$10,000"],
    timeline: ["2 weeks", "4 weeks", "8 weeks", "12 weeks"],
    experience: ["No-code", "Intermediate", "Experienced developer"],
    market: ["United States", "United Kingdom", "Europe", "Global", "Morocco"],
    model: Object.keys(models)
  };
  if (!Object.entries(allowed).every(([k, options]) => typeof v[k] === "string" && options.includes(v[k] as string))) return null;
  return { ...v, niche: v.niche.trim(), categories: Array.from(new Set(v.categories)) } as Settings;
}
export function isPlan(v: unknown): v is Plan {
  return record(v) && isPlanContent(v) && typeof v.id === "string" && /^[a-f0-9-]{36}$/.test(v.id) && str(v.createdAt) && !Number.isNaN(Date.parse(v.createdAt)) && str(v.model) && !!parseSettings(v.settings);
}
export function planMarkdown(p: Plan): string {
  const bullets = (items: string[]) => items.map(i => "- " + i).join("\n");
  return [
    "# " + p.title, p.tagline, "Created: " + p.createdAt + " | Model: " + p.model,
    "## Your brief", Object.entries(p.settings).map(([k,v]) => "- " + k + ": " + (Array.isArray(v) ? v.join(", ") : v)).join("\n"),
    "## Overview", p.summary, "## Problem", p.problem, "## Audience", p.audience, "## Differentiation", p.differentiator,
    "## Business model", p.businessModel, "## MVP features", bullets(p.features), "## Validation", bullets(p.validation),
    "## Technical requirements", ...Object.entries(p.technical).flatMap(([k,v]) => ["### " + k, bullets(v)]),
    "## SEO strategy — unverified suggestions", "No live search volume, difficulty, rankings, or competitor metrics have been measured.",
    "Page title: " + p.seo.title, "Meta description: " + p.seo.description,
    bullets(p.seo.keywords.map(k => k.keyword + " — " + k.intent)), "### Content ideas", bullets(p.seo.contentIdeas),
    "## Launch roadmap", ...p.roadmap.flatMap(p => ["### " + p.phase, bullets(p.tasks)]),
    "## Risks and assumptions", bullets(p.risks)
  ].join("\n\n");
}
