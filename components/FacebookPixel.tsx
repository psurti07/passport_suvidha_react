import Script from "next/script";
import axiosServer from "@/lib/axiosServer";
import { unstable_cache } from "next/cache";
import { getFacebookSettings } from "@/lib/fetchFacebookSettings";

// const getFacebookPixel = unstable_cache(
//   async () => {
//     console.log(" Calling /fb-pixel API");
//     const { data } = await axiosServer.get("/fb-pixel");
//     return data;
//   },
//   ["facebook-pixel"],
//   {
//     revalidate: 3600, // Cache for 1 hour
//   },
// );

export default async function FacebookPixel() {
  try {
    // const { data } = await axiosServer.get("/fb-pixel");

    // console.log("Facebook Pixel and Domain Verification Data:", data);
    const data = await getFacebookSettings();
    const pixelId = data?.fb_pixel_key;

    if (!pixelId) {
      return null;
    }
    // const domainVerification = data?.document_verification;

    return (
      <>
        {/* Facebook Domain Verification */}
        {/* {domainVerification && (
          <meta
            name="facebook-domain-verification"
            content={domainVerification}
          />
        )} */}

        {/* Facebook Pixel */}
        {pixelId && (
          <>
            <Script id="facebook-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;
                n.push=n;
                n.loaded=!0;
                n.version='2.0';
                n.queue=[];
                t=b.createElement(e);
                t.async=!0;
                t.src=v;
                s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s);
                }(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');

                fbq('init', '${pixelId}');
                fbq('track', 'PageView');
              `}
            </Script>

            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
      </>
    );
  } catch (error) {
    console.error("Error fetching Facebook settings:", error);
    return null;
  }
}
