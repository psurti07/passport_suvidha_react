import axiosServer from "./axiosServer";
import { unstable_cache } from "next/cache";

async function fetchFacebookSettings() {
  // No backend configured (local preview): nothing to load
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) return null;
  //   console.log("Calling /fb-pixel API");

  try {
    const { data } = await axiosServer.get("/fb-pixel");
    return data ?? null;
  } catch (error) {
    console.error("Facebook settings API error:", error);
    return null;
  }
}

export const getFacebookSettings = unstable_cache(
  fetchFacebookSettings,
  ["facebook-settings"],
  {
    revalidate: 3600,
  },
);
