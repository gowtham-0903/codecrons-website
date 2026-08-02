import type { Metadata } from "next";
import { Public_Sans, PT_Serif } from "next/font/google";
import { site } from "@/lib/site";
import StructuredData from "@/components/layout/StructuredData";
import DevWarningFilter from "@/components/layout/DevWarningFilter";
import "./globals.css";

// Body / UI typeface
const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

// Display typeface — headlines only
const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "software development",
    "SaaS development",
    "AI integration",
    "workflow automation",
    "product studio",
    "Next.js agency",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${publicSans.variable} ${ptSerif.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-bg text-fg">
        <DevWarningFilter />
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
