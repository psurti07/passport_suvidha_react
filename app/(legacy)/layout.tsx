import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "sonner";

import ScrollProgress from "@/components/ui/top-scroll";
import Script from "next/script";

import { buildSeo } from "@/lib/buildSeo";

/**
 * Layout for the original application's pages (portal, sign-in, payment response,
 * offers, legal pages, fee calculator, application status). Same content as the
 * original app/layout.tsx; <html>/<body> and tracking now live in app/layout.tsx.
 * Navbar/footer are added by ./template.tsx exactly as before.
 */
export async function generateMetadata() {
  return buildSeo("home");
}

const inter = Inter({ subsets: ["latin"] });

export default function LegacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      {/* The original root layout set Inter on <body>; keep it there for dialogs, selects and
          toasts that render directly into <body>. Removed when leaving the original pages. */}
      <style>{`body { font-family: ${inter.style.fontFamily}; }`}</style>
      <ScrollProgress />
      {children}
      <SonnerToaster richColors position="top-right" />
      {process.env.NEXT_PUBLIC_ENABLE_PAYMENT_SCRIPTS === "true" && (
        <Script
          src="https://sdk.cashfree.com/js/v3/cashfree.js"
          strategy="afterInteractive"
        />
      )}
      <Script
        id="ps-organization-jsonld"
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
              telephone: "+91-6358292349",
              contactType: "customer service",
              areaServed: "IN",
              availableLanguage: ["English", "Hindi"],
            },
          }),
        }}
      />
    </div>
  );
}
