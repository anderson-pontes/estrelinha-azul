// src/app/layout.tsx

import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
// 1. Importe os novos componentes
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
      {/* 2. Estruture o body para o layout completo */}
      <body className="flex flex-col min-h-screen bg-[#FFFDF5]">
        <Header />
        {/* 3. O main agora cresce para preencher o espaço, empurrando o footer para baixo */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}