// src/app/layout.tsx

import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "Histórias para Sonhar",
  description: "Um mundo mágico de histórias para crianças",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${fredoka.variable}`}>
      {/* A única mudança é na cor de fundo do body */}
      <body className="flex flex-col min-h-screen bg-[#F7F7F2]">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}