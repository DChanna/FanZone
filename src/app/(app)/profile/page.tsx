"use client";

import { currentUser, mockBets, mockPositions, mockPosts } from "@/lib/mock-data";
import { PostCard } from "@/components/community/post-card";
import { formatCurrency, formatCompactNumber, cn } from "@/lib/utils";
import { Settings, Calendar, Trophy, TrendingUp, Receipt } from "lucide-react";
import { useState } from "react";

const tabs = ["Posts", "Bets", "Positions", "Stats"];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Posts");

  const user = currentUser;
  const winRate =
    user.stats.betRecord.wins /
    (user.stats.betRecord.wins + user.stats.betRecord.losses + user.stats.betRecord.pushes);

  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-accent/30 via-accent/10 to-transparent" />

        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-10">
            <div className="flex items-end gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-card bg-accent/20 text-accent text-2xl font-bold">
                {user.displayName.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="pb-1">
                <h1 className="text-xl font-bold text-foreground">{user.displayName}</h1>
                <p className="text-sm text-muted">@{user.username}</p>
              </div>
            </div>
            <button className="rounded-lg border border-border px-4 py-2 text-sm text-muted hover:text-foreground hover:border-foreground/30 transition-colors flex items-center gap-2">
              <Settings size={14} />
              Edit Profile
            </button>
          </div>

          {user.bio && <p className="mt-4 text-sm text-foreground">{user.bio}</p>}

          <div className="mt-4 flex items-center gap-6 text-sm">
            <span className="text-foreground font-semibold">
              {formatCompactNumber(user.stats.following)}{" "}
              <span className="text-muted font-normal">Following</span>
            </span>
            <span className="text-foreground font-semibold">
              {formatCompactNumber(user.stats.followers)}{" "}
              <span className="text-muted font-normal">Followers</span>
            </span>
            <span className="text-muted flex items-center gap-1">
              <Calendar size={12} />
              Joined {new Date(user.joinedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            </span>
          </div>

          {/* Favorite teams */}
          <div className="mt-4 flex gap-2">
            {user.favoriteTeams.map((team) => (
              <span key={team} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                {team}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <Trophy size={18} className="text-accent mx-auto mb-1" />
          <p className="text-lg font-bold">{(winRate * 100).toFixed(1)}%</p>
          <p className="text-xs text-muted">Win Rate</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <Receipt size={18} className="text-info mx-auto mb-1" />
          <p className="text-lg font-bold">{user.stats.betRecord.wins + user.stats.betRecord.losses + user.stats.betRecord.pushes}</p>
          <p className="text-xs text-muted">Total Bets</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <TrendingUp size={18} className="text-accent mx-auto mb-1" />
          <p className="text-lg font-bold">{mockPositions.length}</p>
          <p className="text-xs text-muted">Open Positions</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <p className="text-lg font-bold">{user.stats.posts}</p>
          <p className="text-xs text-muted">Posts</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-3 text-sm font-medium transition-colors border-b-2",
                activeTab === tab
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "Posts" && (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {mockPosts
            .filter((p) => p.author.id === "u1")
            .map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
        </div>
      )}

      {activeTab === "Stats" && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Betting Record</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-accent">{user.stats.betRecord.wins}</p>
              <p className="text-xs text-muted">Wins</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-danger">{user.stats.betRecord.losses}</p>
              <p className="text-xs text-muted">Losses</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-muted">{user.stats.betRecord.pushes}</p>
              <p className="text-xs text-muted">Pushes</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex h-3 rounded-full overflow-hidden bg-border">
              <div className="bg-accent" style={{ width: `${(user.stats.betRecord.wins / 292) * 100}%` }} />
              <div className="bg-danger" style={{ width: `${(user.stats.betRecord.losses / 292) * 100}%` }} />
              <div className="bg-muted" style={{ width: `${(user.stats.betRecord.pushes / 292) * 100}%` }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
