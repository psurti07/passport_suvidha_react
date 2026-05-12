import { buildSeo } from "@/lib/buildSeo";

export default async function Head() {
  const seo = await buildSeo("contact");

  return (
    <>
      <title>{seo.title as string}</title>

      <meta
        name="description"
        content={seo.description as string}
      />

      <meta
        name="keywords"
        content={seo.keywords as string}
      />
    </>
  );
}