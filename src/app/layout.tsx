// src/app/layout.tsx

import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // 1. Importe a Fredoka
import "./globals.css";

// 2. Configure a fonte Fredoka
// - Adicionamos vários pesos (weights) para ter mais flexibilidade (normal, negrito, etc.)
// - 'variable' cria uma variável CSS (--font-sans) que o Tailwind vai usar.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans", // Vamos chamar nossa variável de --font-sans
});

export const metadata: Metadata = {
  // Você pode atualizar os metadados aqui
  title: "Historinhas Infantis",
  description: "Um mundo mágico de histórias para crianças",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 3. Aplique a variável da fonte na tag <html>
    // A classe 'antialiased' melhora a renderização da fonte.
    <html lang="pt-BR" className={`${poppins.variable} antialiased`}>
      <body>
        {children}
      </body>
    </html>
  );
}