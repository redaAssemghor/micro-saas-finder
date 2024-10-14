"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

const ConvexClerkProvider = ({ children }: { children: ReactNode }) => (
  <ClerkProvider
    publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
  >
    {children}
  </ClerkProvider>
);

export default ConvexClerkProvider;
