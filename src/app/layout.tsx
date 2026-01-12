import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";

const satoshi = localFont({
  src: "../fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Duckie - AI Support Agents",
  description: "AI support agents that resolve tickets end to end",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${satoshi.variable} ${geist.variable} ${playfair.variable} font-sans antialiased`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
