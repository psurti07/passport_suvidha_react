import { NextRequest, NextResponse } from "next/server";
import axiosServer from "@/lib/axiosServer"; // Use server-safe Axios config
import axios, { AxiosError } from "axios";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mobile_number } = body;

    console.log("LOGIN API HIT");
    console.log("Mobile:", mobile_number);

    // ✅ Validate input
    if (!mobile_number) {
      return NextResponse.json(
        { message: "Mobile number is required." },
        { status: 400 },
      );
    }

    // ✅ Get CSRF cookie (Laravel Sanctum)
    try {
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/sanctum/csrf-cookie`,
        { withCredentials: true },
      );
    } catch (csrfError) {
      console.error("CSRF ERROR:", csrfError);
    }

    // ✅ Call Laravel API
    const response = await axiosServer.post("/customers/login", {
      mobile_number,
    });

    console.log("Laravel Response:", response.data);

    // ✅ Forward response
    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error: any) {
    console.error(
      "Customer Login API Error:",
      error?.response?.data || error.message,
    );

    // ✅ Axios error handling
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>;

      return NextResponse.json(
        {
          message:
            axiosError.response?.data?.message ||
            axiosError.response?.data?.errors?.mobile_number?.[0] ||
            "Login failed",
        },
        { status: axiosError.response?.status || 500 },
      );
    }

    // ✅ Generic error
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

// export async function POST() {
//   console.log("LOGIN ROUTE HIT");

//   return new Response(
//     JSON.stringify({ message: "Working" }),
//     { status: 200 }
//   );
// }
