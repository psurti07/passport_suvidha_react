import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "sonner";

import ScrollProgress from "@/components/ui/top-scroll";
import Script from "next/script";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { buildSeo } from "@/lib/buildSeo";

export async function generateMetadata() {
  return buildSeo("home");
}

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Passport Assistance Services in India | New, Renewal & Tatkal Passport | PassportSuvidha",
//   description: "Streamline your passport application process with PassportSuvidha. Fast, reliable, and professional passport services.",
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScrollProgress />
        {children}
        <SonnerToaster richColors position="top-right" />
        <Script
          src="https://sdk.cashfree.com/js/v3/cashfree.js"
          strategy="afterInteractive"
        />
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PassportSuvidha",
              url: "https://passportsuvidha.com",
              logo: "https://passportsuvidha.com/logo/ps-logo-1.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-7486046591",
                contactType: "customer service",
                areaServed: "IN",
                availableLanguage: ["English", "Hindi"],
              },
            }),
          }}
        />
      </body>
    </html>
  );
}

import "./globals.css";
