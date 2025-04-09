import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { TopBar } from "./components/TopBar";
import { Footer } from "./components/Footer";
import SessionWrapper from "./components/SessionWrapper"; // Yeni bileşeni import et

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neemmee",
  description: "Neemmee food chain",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <TopBar />
        <Toaster position="bottom-right" />
        <main className="max-w-app mx-auto px-2 lg:px-10">
          <SessionWrapper session={session}>{children}</SessionWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}