import { NextRequest, NextResponse } from "next/server";
import axiosServer from "@/lib/axiosServer";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    // console.log("Auth header received:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const response = await axiosServer.get("/application/details", {
        headers: { Authorization: authHeader },
      });

      // console.log("Laravel response:", response.data);
      return NextResponse.json(response.data, { status: response.status });
    } catch (apiError: any) {
      console.error(
        "Laravel API error:",
        apiError.response?.data || apiError.message,
      );
      return NextResponse.json(
        apiError.response?.data || { error: "Backend not reachable" },
        { status: apiError.response?.status || 503 },
      );
    }
  } catch (error) {
    console.error("Next.js API ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
