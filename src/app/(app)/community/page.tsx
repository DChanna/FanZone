"use client";

import { PostCard } from "@/components/community/post-card";
import { mockPosts, mockCommunities } from "@/lib/mock-data";
import { formatCompactNumber, getSportEmoji } from "@/lib/utils";
import { Users, TrendingUp, PenSquare } from "lucide-react";
import { useState } from "react";

export default function CommunityPage() {
  const [postContent, setPostContent] = useState("");

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main feed */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Community</h1>
            <p className="text-sm text-muted mt-1">
              Join the conversation with sports fans worldwide
            </p>
          </div>

          {/* Compose */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent text-sm font-bold">
                MJ
              </div>
              <div className="flex-1">
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="What's on your mind? Share a take, post a pick, talk trash..."
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted outline-none resize-none min-h-[60px]"
                  rows={3}
                />
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                  <div className="flex gap-2 text-xs text-muted">
                    <span className="hover:text-foreground cursor-pointer">Game tag</span>
                    <span className="hover:text-foreground cursor-pointer">Media</span>
                    <span className="hover:text-foreground cursor-pointer">Poll</span>
                  </div>
                  <button
                    className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-1.5 text-sm font-semibold text-black hover:bg-accent-hover transition-colors disabled:opacity-50"
                    disabled={!postContent.trim()}
                  >
                    <PenSquare size={14} />
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Feed */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            {mockPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Topics */}
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
              <TrendingUp size={14} className="text-accent" />
              Trending
            </h3>
            <div className="space-y-3">
              {["#LakersVsCeltics", "#EaglesNation", "#NHLPlayoffs", "#ParlayOfTheDay", "#KalshiPicks"].map(
                (topic, i) => (
                  <div key={topic} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-accent font-medium">{topic}</p>
                      <p className="text-xs text-muted">{(5 - i) * 1.2}K posts</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Communities */}
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
              <Users size={14} />
              Communities
            </h3>
            <div className="space-y-3">
              {mockCommunities.map((community) => (
                <div
                  key={community.id}
                  className="flex items-center justify-between hover:bg-card-hover rounded-lg p-2 -mx-2 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20 text-sm">
                      {community.sport ? getSportEmoji(community.sport) : "🏅"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{community.name}</p>
                      <p className="text-xs text-muted">
                        {formatCompactNumber(community.memberCount)} members
                      </p>
                    </div>
                  </div>
                  <button className="rounded-md border border-accent/30 px-2 py-1 text-xs text-accent hover:bg-accent/10 transition-colors">
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
