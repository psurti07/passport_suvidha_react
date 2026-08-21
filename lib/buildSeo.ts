import type { Metadata } from "next";
import { getseo } from "./seo";
import axiosServer from "@/lib/axiosServer";
import { getFacebookSettings } from "@/lib/fetchFacebookSettings";

export async function buildSeo(slug: string): Promise<Metadata> {
  // let domainVerification = "";

  // try {
  //   // const { data } = await axiosServer.get("/fb-pixel");
  //   const data = await getFacebookSettings();

  //   domainVerification = data?.domain_verification || "";

  //   // console.log(
  //   //   "Facebook Pixel and Domain Verification Data:",
  //   //   domainVerification,
  //   // );
  // } catch (error) {
  //   console.error("Error fetching Facebook Pixel data:", error);
  // }

  const [facebookSettings, seo] = await Promise.all([
    getFacebookSettings(),
    getseo(slug),
  ]);

  const domainVerification = facebookSettings?.domain_verification || "";

  // const seo = await getseo(slug);

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
        "facebook-domain-verification": domainVerification,
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
