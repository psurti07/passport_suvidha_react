import axiosServer from "@/lib/axiosServer";
import { NextRequest, NextResponse } from "next/server";

const FRONTEND_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL ||
  "https://passportsuvidha.com/";

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.redirect(FRONTEND_URL);
    }

    const response = await axiosServer.get(
      `/application-progress/file/${encodeURIComponent(id)}`,
      {
        headers: {
          Accept: "*/*",
        },
        responseType: "arraybuffer",

        // Important: don't let Axios follow Laravel's redirect.
        maxRedirects: 0,

        validateStatus: (status) => status >= 200 && status < 400,
      },
    );

    /**
     * Laravel returned 3xx.
     * This means the document is no longer available.
     * Force the browser to Passport Suvidha homepage.
     */
    if (response.status >= 300 && response.status < 400) {
      return NextResponse.redirect(FRONTEND_URL, 302);
    }

    /**
     * Document exists.
     */
    if (response.status >= 200 && response.status < 300) {
      const contentType =
        response.headers["content-type"] || "application/octet-stream";

      const contentDisposition =
        response.headers["content-disposition"] || "inline";

      return new NextResponse(response.data, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": contentDisposition,
          "Cache-Control": "private, no-store, no-cache, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }

    /**
     * Anything unexpected → homepage.
     */
    return NextResponse.redirect(FRONTEND_URL, 302);
  } catch (error: any) {
    console.error(
      "Application file proxy error:",
      error?.response?.status || error?.message || error,
    );

    /**
     * Invalid/deleted document or API error.
     * Force browser to homepage.
     */
    return NextResponse.redirect(FRONTEND_URL, 302);
  }
}
