"use client";
import { useState } from "react";
import { FiArrowLeft, FiBookmark, FiCheck, FiDownload, FiPrinter } from "react-icons/fi";
import { Plan, planMarkdown } from "@/lib/plans";
const sections = ["Overview", "MVP & validation", "SEO strategy", "Technical", "Roadmap"] as const;
function Bullets({ items }: { items: string[] }) { return <ul className="plan-list">{items.map((item, i) => <li key={i}>{item}</li>)}</ul>; }
export default function PlanDetail({ plan, saved, busy, onSave, onClose, example = false }: { plan: Plan; saved: boolean; busy: boolean; onSave: () => void; onClose: () => void; example?: boolean }) {
  const [section, setSection] = useState<typeof sections[number]>("Overview");
  function download(format: "md" | "json") {
    const content = format === "md" ? planMarkdown(plan) : JSON.stringify(plan, null, 2);
    const url = URL.createObjectURL(new Blob([content], { type: format === "md" ? "text/markdown;charset=utf-8" : "application/json" }));
    const link = document.createElement("a"); link.href = url;
    link.download = (plan.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 60) || "startup-plan") + "." + format;
    link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <section className="plan-detail" aria-label="Startup plan">
    <button className="text-button back-button" onClick={onClose}><FiArrowLeft /> Back to workspace</button>
    <div className="plan-heading"><div><span className="eyebrow">{example ? "ILLUSTRATIVE EXAMPLE" : "YOUR STARTUP BLUEPRINT"}</span><h1>{plan.title}</h1><p>{plan.tagline}</p></div><div className="plan-actions">
      {!example && <button className="button" onClick={onSave} disabled={saved || busy}>{saved ? <FiCheck /> : <FiBookmark />}{saved ? "Saved" : busy ? "Saving…" : "Save plan"}</button>}
      <button className="button button-secondary" onClick={() => download("md")}><FiDownload /> Markdown</button>
      <button className="button button-secondary" onClick={() => download("json")}>JSON</button>
      <button className="button button-secondary" onClick={() => window.print()}><FiPrinter /> PDF / print</button>
    </div></div>
    <div className="plan-meta"><span>{plan.settings.niche}</span><span>{plan.settings.budget}</span><span>{plan.settings.timeline} MVP</span><span>{plan.settings.market}</span></div>
    <div className="plan-tabs" role="tablist" aria-label="Plan sections">{sections.map(s => <button key={s} id={"tab-" + sections.indexOf(s)} aria-controls={"panel-" + sections.indexOf(s)} role="tab" aria-selected={section === s} tabIndex={section === s ? 0 : -1} className={section === s ? "selected" : ""} onClick={() => setSection(s)} onKeyDown={e => { const index = sections.indexOf(s); const next = e.key === "ArrowRight" ? (index + 1) % sections.length : e.key === "ArrowLeft" ? (index + sections.length - 1) % sections.length : e.key === "Home" ? 0 : e.key === "End" ? sections.length - 1 : -1; if (next >= 0) { e.preventDefault(); setSection(sections[next]); document.getElementById("tab-" + next)?.focus(); } }}>{s}</button>)}</div>
    {sections.map((s, i) => <div key={s} id={"panel-" + i} role="tabpanel" aria-labelledby={"tab-" + i} className={"plan-panel " + (section !== s ? "inactive" : "")}>
      {s === "Overview" && <div className="detail-grid"><article className="panel"><h2>The opportunity</h2><p>{plan.summary}</p><h3>The problem</h3><p>{plan.problem}</p><h3>Who it is for</h3><p>{plan.audience}</p></article><article className="panel tinted"><h2>Why this could work</h2><p>{plan.differentiator}</p><h3>Business model</h3><p>{plan.businessModel}</p><span className="note">Pricing and demand are hypotheses to validate.</span></article></div>}
      {s === "MVP & validation" && <div className="detail-grid"><article className="panel"><h2>Build the smallest useful product</h2><Bullets items={plan.features} /></article><article className="panel"><h2>Validate before you build</h2><Bullets items={plan.validation} /><h3>Risks & assumptions</h3><Bullets items={plan.risks} /></article></div>}
      {s === "SEO strategy" && <div className="panel"><div className="section-heading"><h2>Get discovered</h2><span className="status-pill">Unverified suggestions</span></div><p className="note">These are AI keyword ideas, not live SEO results. Search volume, difficulty, and rankings have not been measured. Validate in a keyword research tool before investing.</p><div className="table-scroll"><table><thead><tr><th>Suggested keyword</th><th>Intent</th><th>Search volume</th></tr></thead><tbody>{plan.seo.keywords.map((k, i) => <tr key={i}><td>{k.keyword}</td><td>{k.intent}</td><td className="muted">Not measured</td></tr>)}</tbody></table></div><div className="detail-grid"><div><h3>Content opportunities</h3><Bullets items={plan.seo.contentIdeas} /></div><div><h3>Search preview</h3><div className="search-preview"><strong>{plan.seo.title}</strong><p>{plan.seo.description}</p></div></div></div></div>}
      {s === "Technical" && <div className="technical-grid">{Object.entries(plan.technical).map(([k, v]) => <article className="panel" key={k}><h2>{{ stack: "Recommended stack", dataModel: "Data model", integrations: "Integrations", security: "Security & privacy", requirements: "Acceptance criteria" }[k]}</h2><Bullets items={v} /></article>)}</div>}
      {s === "Roadmap" && <div className="roadmap">{plan.roadmap.map((phase, i) => <article className="panel" key={i}><span className="step-number">{String(i + 1).padStart(2, "0")}</span><h2>{phase.phase}</h2><Bullets items={phase.tasks} /></article>)}</div>}
    </div>)}
    <p className="plan-provenance">Model: {plan.model} · {new Date(plan.createdAt).toLocaleDateString()} · Review assumptions before committing resources.</p>
  </section>;
}
