import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    console.log("AUTH HEADER ", authHeader);

    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "No token provided" },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: authHeader,
        },
      }
    );

    const data = await response.json();

    //  Create response FIRST
    const res = NextResponse.json({
      success: true,
      message: data.message || "Logged out",
    });

    //  DELETE COOKIE (VERY IMPORTANT)
    res.cookies.set("authToken", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("LOGOUT ERROR:", error);

    const res = NextResponse.json(
      { success: false, message: "Logout failed" },
      { status: 500 }
    );

    //  FAILSAFE: still delete cookie
    res.cookies.set("authToken", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return res;
  }
}