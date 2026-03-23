import { NextResponse } from "next/server";
import { mockPosts, mockCommunities } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ posts: mockPosts, communities: mockCommunities });
}
