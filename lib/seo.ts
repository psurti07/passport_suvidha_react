// import axiosServer from "./axiosServer";

// export async function getseo(slug:string) {
//     try {

//         const {data} = await axiosServer.get(`/seo/${slug}`);

//         if(!data.success){
//             return null;
//         }

//         return data.data;

//     } catch (error) {
//         console.log("SEO API error:",error);
//         return null;
//     }
// }

import axiosServer from "./axiosServer";
import { unstable_cache } from "next/cache";

async function fetchSeo(slug: string) {
  //   console.log("Calling /seo API:", slug);

  try {
    const { data } = await axiosServer.get(`/seo/${slug}`);

    if (!data?.success) {
      return null;
    }

    return data.data;
  } catch (error) {
    console.error(`SEO API error for ${slug}:`, error);
    return null;
  }
}

const getCachedSeo = unstable_cache(fetchSeo, ["seo-data"], {
  revalidate: 3600,
});

export async function getseo(slug: string) {
  return getCachedSeo(slug);
}
