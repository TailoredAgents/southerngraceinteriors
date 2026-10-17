import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./components/CartProvider";
import { JsonLd } from "./components/JsonLd";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { siteDescription, siteIndexable, siteName, siteUrl } from "./lib/seo";

const manrope = Manrope({ variable: "--font-sans", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ variable: "--font-serif", subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${siteName} | Furnishings & Interior Design`, template: `%s | ${siteName}` },
  description: siteDescription,
  alternates: { canonical: siteUrl },
  robots: { index: siteIndexable, follow: siteIndexable },
  openGraph: {
    title: siteName,
    description: "Beautiful spaces. A life well lived.",
    url: siteUrl,
    siteName,
    type: "website",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${siteName} — Beautiful spaces. A life well lived.` }],
  },
  twitter: { card: "summary_large_image", title: siteName, description: "Beautiful spaces. A life well lived.", images: ["/og.png"] },
};

export const viewport: Viewport = { themeColor: "#20251f" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${cormorant.variable}`}>
        <JsonLd data={[
          { "@context": "https://schema.org", "@type": "Organization", name: siteName, url: siteUrl },
          { "@context": "https://schema.org", "@type": "WebSite", name: siteName, url: siteUrl, description: siteDescription },
        ]} />
        <CartProvider><SiteHeader /><main>{children}</main><SiteFooter /></CartProvider>
      </body>
    </html>
  );
}
