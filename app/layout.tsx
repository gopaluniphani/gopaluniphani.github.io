import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const heroSans = localFont({ src: "../public/fonts/Inter-Variable.ttf", variable: "--font-hero-sans", weight: "100 900", display: "swap" });
const heroSerif = localFont({ src: "../public/fonts/InstrumentSerif-Italic.ttf", variable: "--font-hero-serif", weight: "400", style: "italic", display: "swap" });

export const metadata: Metadata = {
  title: "Phani Gopaluni — Software Engineer",
  description: "Software engineer across enterprise platforms, full-stack products, data systems, and AI-enabled delivery.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${heroSans.variable} ${heroSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
