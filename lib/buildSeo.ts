import type { Metadata } from "next";
import { getseo } from "./seo";
import axiosServer from "@/lib/axiosServer";

export async function buildSeo(slug: string): Promise<Metadata> {
  const { data } = await axiosServer.get("/fb-pixel");

  // console.log("Facebook Pixel and Domain Verification Data:", data);

  const domainVerification = data?.document_verification;

  const seo = await getseo(slug);

  const title =
    seo?.title || "Passport Assistance Services in India | PassportSuvidha";

  const description =
    seo?.descriptions ||
    "Get expert assistance for passport services across India.";

  const keywords =
    seo?.keywords || "passport assistance, passport renewal, tatkal passport";

  // STATIC VALUES
  const siteUrl = "https://passportsuvidha.com/";
  const imageUrl = "https://passportsuvidha.com/logo/passport-suvidha.png";

  return {
    title,
    description,
    keywords,

    verification: {
      other: {
        "facebook-domain-verification": domainVerification || "",
      },
    },

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: siteUrl,
    },

    openGraph: {
      title: "Passport Assistance Services in India",
      description:
        "Apply for new passport, Tatkal passport, renewal & document assistance services across India.",
      url: siteUrl,
      siteName: "PassportSuvidha",

      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],

      locale: "en_IN",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: "Passport Assistance Services in India",
      description:
        "Fast passport application and renewal assistance services across India.",
      images: [imageUrl],
    },
  };
}
