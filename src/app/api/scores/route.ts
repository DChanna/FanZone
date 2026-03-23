import { NextResponse } from "next/server";
import { mockGames } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sport = searchParams.get("sport");
  const status = searchParams.get("status");

  let games = mockGames;

  if (sport && sport !== "all") {
    games = games.filter((g) => g.sport === sport);
  }
  if (status && status !== "all") {
    games = games.filter((g) => g.status === status);
  }

  return NextResponse.json({ games });
}
