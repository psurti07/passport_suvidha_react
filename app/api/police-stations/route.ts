import { NextResponse } from "next/server";

const policeStations = [
  "Athwalines Police Station",
  "Umra Police Station",
  "Adajan Police Station",
  "Katargam Police Station",
  "Amroli Police Station",
  "Varachha Police Station",
  "Kapodra Police Station",
  "Sachin Police Station",
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const pincode = searchParams.get("pincode") || "";

  // Return empty array for invalid pincode
  if (!/^\d{6}$/.test(pincode)) {
    return NextResponse.json([]);
  }

  // Return the same stations with the requested pincode
  const data = policeStations.map((station) => ({
    name: station,
    pincode,
    city: "Surat",
    state: "Gujarat",
  }));

  return NextResponse.json(data);
}
