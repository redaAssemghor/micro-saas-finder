import { NextResponse } from "next/server";
const niches = ["Client onboarding for design agencies", "Inventory for independent retailers", "Content planning for solo creators", "Scheduling for local service businesses", "Customer support for small online stores", "Reporting for freelance consultants"];
export async function POST() { return NextResponse.json({ content: niches[Math.floor(Math.random() * niches.length)] }); }
