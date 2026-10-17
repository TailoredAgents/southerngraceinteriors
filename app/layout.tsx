import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { CartProvider } from "./components/CartProvider";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";

const manrope = Manrope({ variable: "--font-sans", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ variable: "--font-serif", subsets: ["latin"], weight: ["400", "500", "600"] });

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  return {
    metadataBase,
    title: { default: "Southern Grace Interiors | Furnishings & Interior Design", template: "%s | Southern Grace Interiors" },
    description: "Timeless furnishings and thoughtful interior design for a home that feels entirely yours.",
    robots: { index: false, follow: false },
    openGraph: { title: "Southern Grace Interiors", description: "Beautiful spaces. A life well lived.", type: "website", locale: "en_US", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Southern Grace Interiors — Beautiful spaces. A life well lived." }] },
    twitter: { card: "summary_large_image", title: "Southern Grace Interiors", description: "Beautiful spaces. A life well lived.", images: ["/og.png"] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${cormorant.variable}`}>
        <CartProvider><SiteHeader /><main>{children}</main><SiteFooter /></CartProvider>
      </body>
    </html>
  );
}
