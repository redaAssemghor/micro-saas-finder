import { generatePlan } from "@/lib/ai";
import { defaultSettings } from "@/lib/plans";
// Compatibility for the original ideas endpoint. The workspace uses /api/generate-plan.
export async function getSaasIdeas(keyword: string) {
  const plan = await generatePlan({ ...defaultSettings, niche: keyword });
  return [{ title: plan.title, description: plan.summary }];
}
