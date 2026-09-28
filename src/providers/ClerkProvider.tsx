"use client";
import { ClerkProvider } from "@clerk/nextjs";
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return key ? <ClerkProvider publishableKey={key}>{children}</ClerkProvider> : <>{children}</>;
}
