"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

const appearance = {
  variables: {
    colorPrimary: "#4f46e5", // Indigo
    colorText: "#374151", // Gray-700
    colorBackground: "#f3f4f6", // Gray-100
    colorDanger: "#e11d48", // Red-600
  },
  elements: {
    card: "shadow-lg rounded-lg",
    formFieldInput: "border border-gray-300 rounded-md focus:border-indigo-500",
    formFieldLabel: "font-semibold text-gray-700",
    buttonPrimary:
      "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md",
    buttonSecondary:
      "bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md",
  },
};

const ConvexClerkProvider = ({ children }: { children: ReactNode }) => (
  <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
    {children}
  </ConvexProviderWithClerk>
);

export default ConvexClerkProvider;
