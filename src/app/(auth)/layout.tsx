import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 flex justify-center items-center">
        {children}
      </main>
    </div>
  );
}
