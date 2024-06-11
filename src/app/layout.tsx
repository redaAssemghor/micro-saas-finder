import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConvexClerkProvider from "@/providers/ConvexClerkProvider";
import AnnouncementBar from "@/components/AnnouncementBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Free Ideas generator | find yor big saas",
  description: "Generate saas ideas ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConvexClerkProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ConvexClerkProvider>
      </body>
    </html>
  );
}
