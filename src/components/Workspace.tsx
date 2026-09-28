"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { FiArrowRight, FiArrowUpRight, FiBookmark, FiCheck, FiCode, FiCompass, FiCpu, FiLayers, FiPlus, FiSearch, FiSliders, FiTarget, FiTrash2, FiX, FiZap } from "react-icons/fi";
import { categories, defaultSettings, isPlan, Plan, Settings } from "@/lib/plans";
import { examplePlan } from "@/lib/example-plan";
import PlanDetail from "./PlanDetail";
const localKey = "micro-saas-plans-v1";
const niches = ["Design agencies", "Independent creators", "Local businesses", "E-commerce"];
function AccountWorkspace({ profile }: { profile: boolean }) { const { user, isLoaded } = useUser(); return <Finder profile={profile} userId={user?.id || null} ready={isLoaded} name={user?.firstName || "Your"} />; }
export default function Workspace({ profile = false }: { profile?: boolean }) { return process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? <AccountWorkspace profile={profile} /> : <Finder profile={profile} userId={null} ready name="Your" />; }
function Finder({ profile, userId, ready, name }: { profile: boolean; userId: string | null; ready: boolean; name: string }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [example, setExample] = useState(false);
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const abort = useRef<AbortController | null>(null);
  const ownerRef = useRef(userId); ownerRef.current = userId;
  useEffect(() => {
    if (!ready) return;
    let active = true;
    setPlans([]); setPlan(null); setError(""); setNotice(""); setLoadingPlans(true);
    abort.current?.abort();
    (async () => {
      try {
        if (userId) {
          const response = await fetch("/api/plans"); const data = await response.json();
          if (!response.ok) throw new Error(data.error);
          if (active) setPlans(data.plans.filter(isPlan));
        } else {
          const data = JSON.parse(localStorage.getItem(localKey) || "[]");
          if (!Array.isArray(data)) throw new Error("Local plans could not be read.");
          if (active) setPlans(data.filter(isPlan));
        }
      } catch (e) { if (active) setError(e instanceof Error ? e.message : "Could not load saved plans."); }
      finally { if (active) setLoadingPlans(false); }
    })();
    return () => { active = false; abort.current?.abort(); };
  }, [userId, ready]);
  function update<K extends keyof Settings>(key: K, value: Settings[K]) { setSettings(s => ({ ...s, [key]: value })); }
  async function save(next: Plan) {
    const owner = userId; setSaving(true);
    try {
      if (owner) {
        const response = await fetch("/api/plans", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(next) });
        const data = await response.json(); if (!response.ok) throw new Error(data.error);
      } else {
        const raw = JSON.parse(localStorage.getItem(localKey) || "[]");
        if (!Array.isArray(raw)) throw new Error("Local storage is unreadable. Export your plan to keep it.");
        const saved = [next, ...raw.filter(isPlan).filter((p: Plan) => p.id !== next.id)];
        if (saved.length > 100) throw new Error("Your workspace holds 100 plans. Remove a plan or export this one.");
        localStorage.setItem(localKey, JSON.stringify(saved));
      }
      if (ownerRef.current !== owner) return;
      setPlans(existing => [next, ...existing.filter(p => p.id !== next.id)]);
      setNotice(owner ? "Saved to your profile." : "Saved in this browser. Export a copy to keep it."); setError("");
    } catch (e) { if (ownerRef.current === owner) setError(e instanceof Error ? e.message : "Save failed. Export your plan to keep it."); }
    finally { setSaving(false); }
  }
  async function generate(event: FormEvent) {
    event.preventDefault(); if (!ready || busy || saving) return;
    setBusy(true); setError(""); setNotice("");
    const controller = new AbortController(); abort.current = controller;
    const timer = setTimeout(() => controller.abort(), 190000);
    try {
      const response = await fetch("/api/generate-plan", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings), signal: controller.signal });
      const data = await response.json(); if (!response.ok) throw new Error(data.error);
      if (!isPlan(data.plan)) throw new Error("The generated plan was incomplete. Please try again.");
      if (controller.signal.aborted) return;
      setExample(false); setPlan(data.plan); await save(data.plan);
    } catch (e) { if (!controller.signal.aborted) setError(e instanceof Error ? e.message : "Generation failed. Please try again."); else setNotice("Generation stopped. Your brief is still here."); }
    finally { clearTimeout(timer); setBusy(false); }
  }
  async function remove(id: string) {
    const owner = userId; setSaving(true);
    try {
      if (owner) { const response = await fetch("/api/plans?id=" + encodeURIComponent(id), { method: "DELETE" }); if (!response.ok) throw new Error((await response.json()).error); }
      else { const raw = JSON.parse(localStorage.getItem(localKey) || "[]"); if (!Array.isArray(raw)) throw new Error("Local plans could not be read."); localStorage.setItem(localKey, JSON.stringify(raw.filter(isPlan).filter((p: Plan) => p.id !== id))); }
      if (ownerRef.current === owner) { setPlans(p => p.filter(p => p.id !== id)); setDeleting(null); setNotice("Plan removed."); setError(""); }
    } catch (e) { setError(e instanceof Error ? e.message : "Could not remove the plan."); } finally { setSaving(false); }
  }
  const select = (key: keyof Settings, label: string, options: string[]) => <label className="field" key={key}><span>{label}</span><select value={String(settings[key])} onChange={e => update(key, e.target.value as never)}>{options.map(o => <option key={o}>{o}</option>)}</select></label>;
  return <main id="main-content" className="workspace">
    {(error || notice) && <div className={error ? "message error" : "message success"} role={error ? "alert" : "status"}>{error || notice}<button aria-label="Dismiss message" onClick={() => { setError(""); setNotice(""); }}><FiX /></button></div>}
    {plan ? <PlanDetail key={plan.id} plan={plan} example={example} saved={plans.some(p => p.id === plan.id)} busy={saving} onSave={() => save(plan)} onClose={() => setPlan(null)} /> : profile ? <>
      <div className="profile-heading"><div><span className="eyebrow">YOUR PERSONAL WORKSPACE</span><h1>{name === "Your" ? "Your next moves." : name + "’s next moves."}</h1><p>Good ideas deserve a place to grow.</p></div><Link className="button" href="/"><FiPlus /> Create a plan</Link></div>
      <div className="storage-note"><FiBookmark /><p>{userId ? "Your saved plans are private to your account." : "Guest workspace: plans are saved only in this browser. Export them for a backup."}</p>{!userId && process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && <SignInButton mode="modal"><button className="text-button">Sign in for profile storage <FiArrowRight /></button></SignInButton>}</div>
      <div className="section-heading"><h2>Saved plans <span className="count">{plans.length}</span></h2><label className="search-field"><FiSearch /><input aria-label="Search saved plans" placeholder="Search your plans…" value={query} onChange={e => setQuery(e.target.value)} /></label></div>
      {loadingPlans ? <div className="empty-state" role="status">Loading your workspace…</div> : plans.length === 0 ? <div className="empty-state"><span className="empty-icon"><FiLayers /></span><h2>A little space for your next big idea.</h2><p>Create your first plan. We will keep it here for you.</p><Link className="button" href="/">Find an idea <FiArrowRight /></Link></div> : <div className="saved-grid">{plans.filter(p => (p.title + p.settings.niche).toLowerCase().includes(query.toLowerCase())).map(p => <article className="saved-card" key={p.id}><div className="section-heading"><span className="category-label">{p.settings.categories[0]}</span><span className="small muted">{new Date(p.createdAt).toLocaleDateString()}</span></div><h2>{p.title}</h2><p>{p.tagline}</p><div className="plan-meta"><span>{p.settings.timeline}</span><span>{p.settings.budget}</span></div><div className="saved-actions"><button className="text-button" onClick={() => { setPlan(p); setExample(false); }}>Open plan <FiArrowUpRight /></button>{deleting === p.id ? <div className="delete-confirm"><span>Remove?</span><button onClick={() => remove(p.id)} disabled={saving}>Yes</button><button onClick={() => setDeleting(null)}>Keep</button></div> : <button className="icon-button" aria-label={"Remove " + p.title} onClick={() => setDeleting(p.id)}><FiTrash2 /></button>}</div></article>)}</div>}
      {!loadingPlans && plans.length > 0 && !plans.some(p => (p.title + p.settings.niche).toLowerCase().includes(query.toLowerCase())) && <p className="empty-state">No plans match “{query}”.</p>}
    </> : <>
      <section className="hero"><div className="hero-copy"><span className="eyebrow"><span className="live-dot" /> A SMALL START. A REAL POSSIBILITY.</span><h1>Find your<br />next <span className="accent-word">thing<svg viewBox="0 0 220 14" aria-hidden="true"><path d="M3 10 Q 100 -3 217 7" /></svg></span><span className="accent">.</span></h1><p>Turn what you know into something worth building.<br className="desktop-break" /> Discover a focused SaaS idea and a clear plan to bring it to life.</p><div className="hero-benefits"><span><FiCheck /> Built around your niche</span><span><FiCheck /> A plan you can keep</span></div></div>
      <div className="hero-aside"><span className="orbit orbit-one" /><span className="orbit orbit-two" /><div className="floating-label"><FiZap /> From spark to starting point</div><div className="blueprint-preview"><div className="preview-top"><span className="mini-brand"><FiCommandIcon /></span><span>YOUR NEXT VENTURE</span><span className="preview-dots">•••</span></div><h3>A little more clarity.<br />A lot more possibility.</h3><div className="preview-row"><span className="preview-icon"><FiTarget /></span><div><strong>A problem worth solving</strong><span>Find your audience and your edge</span></div><FiCheck /></div><div className="preview-row"><span className="preview-icon"><FiCode /></span><div><strong>A practical path to launch</strong><span>MVP, tech stack, and next steps</span></div><FiCheck /></div><div className="preview-bottom"><span className="status-dot" /> YOUR IDEA, WITH A PLAN <FiArrowUpRight /></div></div><span className="aside-caption">Less blank page. More first step.</span></div></section>
      <div className="workspace-title"><div><span className="section-number">01 / DISCOVER</span><h2>What would you like to build?</h2></div><span className="small muted">Your expertise is a good place to start.</span></div>
      <div className="builder-grid"><form className="builder panel" onSubmit={generate}><fieldset disabled={busy || !ready}>
        <div className="form-section"><div className="form-label"><span className="number-circle">1</span><h3>Choose your corner of the world</h3></div><label className="field"><span>Your niche or a problem you care about</span><div className="input-icon"><FiSearch /><input required minLength={3} maxLength={160} placeholder="e.g. Client onboarding for design agencies" value={settings.niche} onChange={e => update("niche", e.target.value)} /></div></label><div className="suggestions"><span>Try a niche</span>{niches.map(n => <button type="button" key={n} onClick={() => update("niche", n)}>{n}<FiArrowUpRight /></button>)}</div></div>
        <div className="form-section"><div className="form-label"><span className="number-circle">2</span><h3>Pick your direction</h3><span className="small muted">Choose one or more</span></div><div className="category-grid">{categories.map((c, i) => { const Icon = [FiCpu, FiZap, FiLayers, FiCode, FiTarget, FiCompass][i]; return <button type="button" key={c} aria-pressed={settings.categories.includes(c)} className={"category " + (settings.categories.includes(c) ? "chosen" : "")} onClick={() => update("categories", settings.categories.includes(c) ? settings.categories.filter(v => v !== c) : [...settings.categories, c])}><Icon /><span>{c}</span>{settings.categories.includes(c) && <FiCheck className="category-check" />}</button>; })}</div></div>
        <div className="form-section"><div className="form-label"><span className="number-circle">3</span><h3>Make it work for you</h3><FiSliders className="muted" /></div><div className="settings-grid">{select("audience", "Who are you building for?", ["Small businesses", "Solo founders", "Agencies", "Consumers", "Enterprise teams"])}{select("budget", "Starting budget", ["Under $500", "$500–$2,000", "$2,000–$10,000"])}{select("timeline", "Time to first version", ["2 weeks", "4 weeks", "8 weeks", "12 weeks"])}{select("experience", "Your building experience", ["No-code", "Intermediate", "Experienced developer"])}</div><details className="advanced"><summary>More preferences <span>Market & AI model</span></summary><div className="settings-grid">{select("market", "Target market", ["United States", "United Kingdom", "Europe", "Global", "Morocco"])}<label className="field"><span>Open-source AI model</span><select value={settings.model} onChange={e => update("model", e.target.value as Settings["model"])}><option value="balanced">Qwen 3.5 · 9B — Balanced</option><option value="quality">Qwen 3.5 · 27B — Higher capacity</option><option value="lightweight">Qwen 3.5 · 4B — Lightweight</option></select></label></div><p className="note">Runs on your server through Ollama. Larger models need more memory. No per-request model fee.</p></details></div>
        <div className="form-submit"><button className="button generate-button" disabled={!settings.categories.length || !ready || saving} type="submit">{busy ? <><span className="spinner" /> Building your plan…</> : <><FiZap /> Find my next idea <FiArrowRight /></>}</button><span className="small muted">One focused idea. A complete starting plan.</span></div></fieldset>
        {busy && <div className="generation-status" role="status"><p>Thinking through your niche, MVP, SEO, and launch plan. This can take a few minutes.</p><button type="button" className="text-button" onClick={() => abort.current?.abort()}>Cancel</button></div>}
      </form><aside className="builder-aside"><div className="included-card"><span className="eyebrow">MORE THAN AN IDEA</span><h2>Your next step,<br />thought through.</h2><p>Something useful to start with, not another list to forget.</p><ul>{[[FiCompass, "A focused opportunity", "The problem, audience, and your edge."], [FiLayers, "An MVP you can scope", "Core features and a business model."], [FiSearch, "An SEO starting point", "Keyword ideas and a content direction."], [FiCode, "A technical blueprint", "Stack, data, integrations, and security."], [FiTarget, "A path to your first users", "Validation experiments and milestones."]].map(([Icon, title, description]) => { const I = Icon as typeof FiCode; return <li key={String(title)}><span className="included-icon"><I /></span><div><strong>{String(title)}</strong><p>{String(description)}</p></div></li>; })}</ul><div className="included-footer"><FiBookmark /> Saved for later. Ready to export.</div></div><button className="example-link" onClick={() => { setPlan(examplePlan); setExample(true); setError(""); setNotice(""); }}><span>Curious what you will get?<strong>Explore an example plan</strong></span><FiArrowUpRight /></button><p className="aside-note"><span className="status-dot" /> Open-source intelligence. Your direction.</p></aside></div>
      <section className="how-it-works" aria-label="How it works"><div><span className="section-number">A LITTLE STRUCTURE GOES A LONG WAY</span><h2>From “what if” to “what next”.</h2></div>{[["01", "Start with what you know", "A niche, an audience, or a problem you keep noticing."], ["02", "Find a useful direction", "Get a focused opportunity shaped around your constraints."], ["03", "Make your first move", "Save your plan, test the assumptions, and build the essentials."]].map(([n, title, copy]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</section>
    </>}
  </main>;
}
function FiCommandIcon() { return <FiZap />; }
