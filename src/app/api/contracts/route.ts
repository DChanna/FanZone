import { NextResponse } from "next/server";
import { mockContracts, mockPositions } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let contracts = mockContracts;
  if (category && category !== "All") {
    contracts = contracts.filter((c) => c.category === category);
  }

  return NextResponse.json({ contracts, positions: mockPositions });
}
