import { getseo } from "./seo"
import type { Metadata } from "next"

export async function buildSeo(slug: string): Promise<Metadata> {
  const seo = await getseo(slug)

  return {
    title: seo?.title || "Default Title",
    description: seo?.descriptions || "Default description",
    keywords: seo?.keywords || "",
  }
}