import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Inova São Bento | Laboratório Vivo e Economia Criativa",
  description: "Website oficial do Inova São Bento - Laboratório vivo de inovação, patrimônio, turismo sustentável e economia criativa do Litoral Norte de Pernambuco (Abreu e Lima / Paulista - PE). Inscreva-se nas atividades!",
  keywords: [
    "Inova São Bento",
    "Laboratório Vivo",
    "Patrimônio Histórico",
    "Turismo Sustentável",
    "Economia Criativa",
    "Litoral Norte Pernambuco",
    "Abreu e Lima",
    "Paulista PE",
    "Ruínas de São Bento",
    "IdeaThon"
  ],
  authors: [{ name: "Inova São Bento Team" }],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.png" type="image/png" />
        {/* Leaflet CSS for maps */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
