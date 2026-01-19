import { HashScrollHandler } from "@/components/hash-scroll-handler";
import { Navigation } from "@/components/navigation";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Duckie - AI Support Agents",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Duckie - AI Support Agents",
    description:
      "AI support agents that resolve tickets end to end. Autonomous customer support that learns from your knowledge base.",
    creator: "@duckieai",
    images: ["/og-image.png"],
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
      <head>
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3Z5N0SJWWY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3Z5N0SJWWY');
          `}
        </Script>

        {/* Hotjar Tracking Code */}
        <Script id="hotjar" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:5081920,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>

        {/* Warmly Tracking Code */}
        <Script
          id="warmly-script-loader"
          src="https://opps-widget.getwarmly.com/warmly.js?clientId=72152a822ef7873448ea3e74c5ef5728"
          strategy="lazyOnload"
        />

        {/* Apollo Tracking */}
        <Script id="apollo-tracking" strategy="afterInteractive">
          {`
            function initApollo(){
              var n=Math.random().toString(36).substring(7),o=document.createElement("script");
              o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
              o.onload=function(){window.trackingFunctions.onLoad({appId:"6635558ab53bbe01c7cad0cf"})},
              document.head.appendChild(o)
            }
            initApollo();
          `}
        </Script>

        {/* reb2b Tracking */}
        <Script id="reb2b-tracking" strategy="afterInteractive">
          {`
            !function(key) {
              if (window.reb2b) return;
              window.reb2b = {loaded: true};
              var s = document.createElement("script");
              s.async = true;
              s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + key + "/" + key + ".js.gz";
              document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);
            }("EN4M0H10D8OM");
          `}
        </Script>
      </head>
      <body className={`${satoshi.variable} ${geist.variable} ${playfair.variable} font-sans antialiased`}>
        <HashScrollHandler />
        <Navigation />
        {children}
        <Analytics />

        {/* Beehiiv Email Subscription */}
        <Script id="beehiiv-subscription" strategy="afterInteractive">
          {`
            document.addEventListener("DOMContentLoaded", function () {
              const emailField = document.querySelector("input[type='email']");
              let lastSent = "";

              function isValidEmail(email) {
                return /\\S+@\\S+\\.\\S+/.test(email);
              }

              function debounce(fn, delay) {
                let timeout;
                return (...args) => {
                  clearTimeout(timeout);
                  timeout = setTimeout(() => fn.apply(this, args), delay);
                };
              }

              const sendToBeehiiv = debounce((email) => {
                if (!isValidEmail(email) || email === lastSent) return;

                lastSent = email;

                fetch("https://applogic.app.duckie.ai/webapp/beehiiv/subscribe", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({email})
                }).then(async res => {
                  try {
                    const text = await res.text();
                  } catch (error) {
                    console.error("❌ Error:", error);
                  }
                }).catch(error => {
                  console.error("❌ Fetch error:", error);
                });
              }, 1500);

              if (emailField) {
                emailField.addEventListener("input", function () {
                  const email = emailField.value.trim();
                  
                  if (isValidEmail(email)) {
                    sendToBeehiiv(email);
                  }
                });
              }
            });
          `}
        </Script>

        {/* LinkedIn Insight Tag */}
        <Script id="linkedin-partner" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "7568066";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `}
        </Script>
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=7568066&fmt=gif"
          />
        </noscript>
      </body>
    </html>
  );
}
