import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClerkProvider from "@/providers/ClerkProvider";
import StyledComponentsRegistry from "./lib/StyledComponentsRegistry";
export const metadata: Metadata = { title: "MicroSaaS — Find your next thing", description: "Turn a niche into a practical startup plan. Explore ideas, plan your MVP, map your SEO strategy, and save your next move." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><ClerkProvider><a className="skip-link" href="#main-content">Skip to content</a><Header /><StyledComponentsRegistry>{children}</StyledComponentsRegistry><Footer /></ClerkProvider></body></html>;
}
