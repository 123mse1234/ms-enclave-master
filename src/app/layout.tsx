import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  DM_Sans,
  Playfair_Display,
  Montserrat,
} from "next/font/google";
import "./globals.css";
import Providers from "@/providers";
// import Script from "next/script";

// Custom font
import { audreyFont } from "./fonts";
import LayoutWrapper from "@/components/common/LayoutWrapper";
import FirstVisitLoader from "@/components/common/FirstVisitLoader";

/* -------------------- Fonts -------------------- */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

/* -------------------- Viewport (SEO + Mobile) -------------------- */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

/* -------------------- Metadata (SEO) -------------------- */

export const metadata: Metadata = {
  applicationName: "M.S. Enclave Heritage Resort",

  title: {
    default: "MS Enclave Heritage Resort | Best Luxury Resort in Palakkad Kerala",
    template: "%s | M.S. Enclave Heritage Resort",
  },

  description:
    "M.S. Enclave Heritage Resort in Palakkad offers traditional Kerala-style rooms, peaceful surroundings, premium hospitality, and modern amenities. Book your perfect heritage stay today.",

  keywords: [
    "MS Enclave Heritage Resort",
    "heritage resort in Palakkad",
    "best resort in Palakkad",
    "Kerala heritage stay",
    "luxury rooms in Palakkad",
    "family resort Palakkad",
    "budget resort Palakkad",
    "heritage hotels in Kerala",
  ],

  authors: [{ name: "M.S. Enclave Heritage Resort" }],
  creator: "M.S. Enclave Heritage Resort",
  publisher: "M.S. Enclave Heritage Resort",

  category: "Hospitality & Travel",

  metadataBase: new URL("https://www.msheritageresort.com"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "M.S. Enclave Heritage Resort | Heritage Stay in Palakkad",
    description:
      "Experience comfort, tradition, and tranquility at M.S. Enclave Heritage Resort, Palakkad. Ideal for family stays, leisure trips, and peaceful retreats.",
    url: "https://www.msheritageresort.com",
    siteName: "M.S. Enclave Heritage Resort",
    images: [
      {
        url: "/images/seo/home.webp",
        width: 1200,
        height: 630,
        alt: "M.S. Enclave Heritage Resort Palakkad",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "M.S. Enclave Heritage Resort | Palakkad",
    description:
      "Heritage-style resort in Palakkad offering peaceful stays, modern comforts, and authentic Kerala hospitality.",
    images: ["/images/seo/home.webp"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  verification: {
    // google: "GOOGLE_SEARCH_CONSOLE_CODE", // replace when available
  },
};

/* -------------------- Root Layout -------------------- */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`
          ${audreyFont.variable}
          ${dmSans.variable}
          ${geistSans.variable}
          ${geistMono.variable}
          ${playfair.variable}
          ${montserrat.variable}
          antialiased
        `}
      >
        <Providers>
          <FirstVisitLoader>
              <LayoutWrapper>{children}</LayoutWrapper>
          </FirstVisitLoader>
        </Providers>

        {/* Razorpay Checkout Script */}
        {/* <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        /> */}
      </body>
    </html>
  );
}
