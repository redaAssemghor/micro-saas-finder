import { defaultSettings, Plan } from "./plans";
export const examplePlan: Plan = {
  id: "00000000-0000-4000-8000-000000000001", createdAt: "2026-09-28T00:00:00.000Z",
  title: "Briefly", tagline: "Client onboarding, without the back-and-forth.",
  summary: "A focused client intake workspace for small design agencies. Turn scattered emails, missing files, and vague briefs into a single project-ready checklist.",
  problem: "Agency owners lose billable time chasing client assets and clarifying requirements before a project can begin.",
  audience: "Design agencies with 2–10 people that onboard at least three new clients each month. The buyer is the owner or project lead.",
  differentiator: "A lightweight, branded intake flow with an explicit readiness checklist, instead of a full project-management suite.",
  businessModel: "Test $19/month for a solo workspace and $49/month for a team. These are pricing hypotheses. Start with manual pilots; track support time and hosting costs before offering unlimited use.",
  features: ["Reusable intake templates with required questions and files.", "A private client link and branded project checklist.", "A dashboard showing missing assets and next actions.", "Scheduled reminders with opt-out and delivery history."],
  validation: ["Interview 10 agency owners about their last onboarding delay.", "Run three concierge pilots using a manual checklist.", "Ask two pilot customers to pay $19 before building automation."],
  risks: ["Agencies may prefer their existing project tools.", "Reminder fatigue can reduce client trust.", "Client uploads require clear retention and access policies."],
  technical: {
    stack: ["Next.js and TypeScript for the web app.", "PostgreSQL for projects, answers, and membership.", "S3-compatible object storage for client files."],
    dataModel: ["Workspace: id, name, owner_id.", "Project: id, workspace_id, client_email, status.", "IntakeItem: id, project_id, type, required, completion_date."],
    integrations: ["Transactional email provider for invitations and reminders.", "Stripe Checkout after pricing validation.", "No external AI service is needed for the first MVP."],
    security: ["Scope every query to workspace membership.", "Use expiring signed upload URLs and file size limits.", "Provide data export and deletion with a documented retention period."],
    requirements: ["A client can submit a brief without creating an account.", "Only project members can read uploaded files.", "Failed reminder jobs retry without duplicate emails.", "Core intake flows support keyboard navigation."]
  },
  seo: {
    keywords: [{ keyword: "client onboarding for design agencies", intent: "Commercial" }, { keyword: "design client intake template", intent: "Informational" }, { keyword: "agency client onboarding checklist", intent: "Informational" }],
    contentIdeas: ["A downloadable design client intake template.", "A guide to collecting brand assets before kickoff.", "An onboarding checklist for small creative agencies."],
    title: "Briefly — Client onboarding for design agencies",
    description: "Collect briefs, files, and approvals in one simple workspace. Spend less time chasing clients and more time doing your best work."
  },
  roadmap: [{ phase: "Week 1 · Validate", tasks: ["Interview agency owners.", "Test a clickable intake prototype."] }, { phase: "Week 2 · Build", tasks: ["Create workspace access and the intake form.", "Add private file uploads."] }, { phase: "Week 3 · Pilot", tasks: ["Onboard three agencies.", "Measure time saved and completion rates."] }, { phase: "Week 4 · Launch", tasks: ["Fix pilot friction and add billing.", "Publish the template and onboarding guide."] }],
  settings: { ...defaultSettings, niche: "Client onboarding for design agencies", audience: "Agencies" }, model: "Illustrative example — not generated research"
};
