import { NextResponse } from "next/server";
import { mockBets } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ bets: mockBets });
}

export async function POST(request: Request) {
  const body = await request.json();

  // In V0, we just echo back the bet as "created"
  // In production, this would validate + save to DB
  const newBet = {
    id: `b${Date.now()}`,
    ...body,
    status: "pending",
    placedAt: new Date().toISOString(),
  };

  return NextResponse.json({ bet: newBet }, { status: 201 });
}
