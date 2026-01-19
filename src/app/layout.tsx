import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { HashScrollHandler } from "@/components/hash-scroll-handler";
import { Analytics } from "@vercel/analytics/next";

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
  // Base URL for resolving relative URLs
  metadataBase: new URL("https://duckie.ai"),

  // Basic metadata
  title: {
    default: "Duckie - AI Support Agents",
    template: "%s | Duckie",
  },
  description:
    "AI support agents that resolve tickets end to end. Duckie handles your customer support autonomously, learning from your knowledge base to deliver instant, accurate responses 24/7.",

  // Keywords for SEO
  keywords: [
    "AI support",
    "customer service automation",
    "AI agents",
    "support tickets",
    "customer support",
    "helpdesk automation",
    "AI customer service",
    "automated support",
  ],

  // Author & Publisher
  authors: [{ name: "Duckie" }],
  creator: "Duckie",
  publisher: "Duckie",

  // Favicon & Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://duckie.ai",
    siteName: "Duckie",
    title: "Duckie - AI Support Agents",
    description:
      "AI support agents that resolve tickets end to end. Autonomous customer support that learns from your knowledge base.",
  },

  // Twitter Card
  twitter: {
    card: "summary",
    title: "Duckie - AI Support Agents",
    description:
      "AI support agents that resolve tickets end to end. Autonomous customer support that learns from your knowledge base.",
    creator: "@duckieai",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (add your IDs when you have them)
  // verification: {
  //   google: "your-google-verification-code",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${satoshi.variable} ${geist.variable} ${playfair.variable} font-sans antialiased`}>
        <HashScrollHandler />
        <Navigation />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
