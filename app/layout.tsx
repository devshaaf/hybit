import type { Metadata } from "next";
import { Inter, Sora, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "600"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "hybit – Neuronale Aktivität Steigern. Inbound Performance Skalieren.",
  description:
    "hybit NeuraFlow – Ein patentiertes System für Contact Center, das die mentale Leistungsfähigkeit steigert und Ihre First Call Resolution maximiert.",
  openGraph: {
    type: "website",
    title: "hybit – Neuronale Aktivität Steigern",
    description:
      "hybit NeuraFlow – Ein patentiertes System für Contact Center, das die mentale Leistungsfähigkeit steigert.",
    url: "https://hybit.framer.website/",
  },
  twitter: {
    card: "summary_large_image",
    title: "hybit – Neuronale Aktivität Steigern",
    description: "hybit NeuraFlow – Ein patentiertes System für Contact Center.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${inter.variable} ${sora.variable} ${montserrat.variable}`}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {children}
      </body>
    </html>
  );
}
