import type { Metadata } from "next";
import { JetBrains_Mono, Righteous, Space_Grotesk } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

// Retro "paper & ink" type system (mirrors prototype/PymeBoost.html):
// Space Grotesk (body/headings), JetBrains Mono (labels/metadata), Righteous (brand/display).
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
const righteous = Righteous({ subsets: ["latin"], weight: "400", variable: "--font-righteous" });

export const metadata: Metadata = {
  title: "PymeBoost — Connect SMEs with High-Performance Advisors",
  description: "AI-powered platform connecting SMEs with verified advisors for measurable business growth.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrains.variable} ${righteous.variable}`}
    >
      <body className="bg-stone-100 text-zinc-900 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
