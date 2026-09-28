import { defaultSettings, isPlan, parseSettings, planMarkdown } from "../lib/plans";
import { examplePlan } from "../lib/example-plan";
import { generatePlan } from "../lib/ai";
const settings = { ...defaultSettings, niche: "Agency onboarding" };
describe("Plan contracts", () => {
  test("validates the complete plan and rejects incomplete nested output", () => {
    expect(isPlan(examplePlan)).toBe(true);
    expect(isPlan({ ...examplePlan, technical: { stack: [] } })).toBe(false);
    expect(isPlan({ ...examplePlan, seo: { ...examplePlan.seo, keywords: [{ keyword: 10 }] } })).toBe(false);
  });
  test("rejects unknown models, empty categories and invalid constraints", () => {
    expect(parseSettings(settings)).toEqual(settings);
    expect(parseSettings({ ...settings, model: "__proto__" })).toBeNull();
    expect(parseSettings({ ...settings, categories: [] })).toBeNull();
    expect(parseSettings({ ...settings, budget: "unlimited" })).toBeNull();
    expect(parseSettings({ ...settings, niche: "a" })).toBeNull();
    expect(parseSettings({ ...settings, categories: ["Analytics", "Analytics"] }).categories).toEqual(["Analytics"]);
  });
  test("exports all sections, settings and SEO limitations", () => {
    const output = planMarkdown(examplePlan);
    for (const text of [examplePlan.title, examplePlan.problem, examplePlan.businessModel, ...examplePlan.features, ...examplePlan.technical.security, examplePlan.seo.title, examplePlan.roadmap[3].tasks[0], examplePlan.settings.market, "No live search volume"]) expect(output).toContain(text);
  });
});
describe("Local model generation", () => {
  const originalFetch = global.fetch;
  beforeEach(() => { global.fetch = jest.fn(); });
  afterEach(() => { global.fetch = originalFetch; });
  test("forwards settings and uses server-owned metadata", async () => {
    global.fetch.mockResolvedValue({ ok: true, json: async () => ({ message: { content: JSON.stringify(examplePlan) } }) });
    const plan = await generatePlan(settings);
    const request = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(request.model).toBe("qwen3.5:9b");
    expect(JSON.parse(request.messages[1].content)).toEqual(settings);
    expect(plan.id).not.toBe(examplePlan.id);
    expect(plan.settings).toEqual(settings);
    expect(isPlan(plan)).toBe(true);
  });
  test("does not fabricate output when the provider is unavailable", async () => {
    global.fetch.mockResolvedValue({ ok: false });
    await expect(generatePlan(settings)).rejects.toThrow("MODEL_UNAVAILABLE");
  });
  test("rejects malformed and incomplete model JSON", async () => {
    global.fetch.mockResolvedValue({ ok: true, json: async () => ({ message: { content: "not json" } }) });
    await expect(generatePlan(settings)).rejects.toThrow("INVALID_PLAN");
    global.fetch.mockResolvedValue({ ok: true, json: async () => ({ message: { content: "{}" } }) });
    await expect(generatePlan(settings)).rejects.toThrow("INVALID_PLAN");
  });
});
