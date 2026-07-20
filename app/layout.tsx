import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ISTEC · Conteúdos LEI",
  description: "Explorador interativo de trabalhos, estudos e projetos da Licenciatura em Engenharia Informática do ISTEC.",
};

export const viewport = {
  themeColor: "#060a12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background font-sans">{children}</body>
    </html>
  );
}
