import axiosServer from "./axiosServer";
import { unstable_cache } from "next/cache";

async function fetchFacebookSettings() {
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
