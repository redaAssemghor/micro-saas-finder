import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConvexClerkProvider from "@/providers/ConvexClerkProvider";
import AnnouncementBar from "@/components/AnnouncementBar";
import { ClerkProvider } from "@clerk/nextjs";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Free Ideas generator | find your big saas",
  description: "Generate saas ideas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <ClerkProvider>
          <ConvexClerkProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </ConvexClerkProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
