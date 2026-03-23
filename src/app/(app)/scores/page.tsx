"use client";

import { useState } from "react";
import { GameCard } from "@/components/scores/game-card";
import { mockGames } from "@/lib/mock-data";
import type { Sport } from "@/lib/types";
import { cn, getSportEmoji } from "@/lib/utils";

const sports: { key: "all" | Sport; label: string }[] = [
  { key: "all", label: "All Sports" },
  { key: "nba", label: "NBA" },
  { key: "nfl", label: "NFL" },
  { key: "nhl", label: "NHL" },
  { key: "mlb", label: "MLB" },
  { key: "soccer", label: "Soccer" },
];

export default function ScoresPage() {
  const [filter, setFilter] = useState<"all" | Sport>("all");

  const filtered = filter === "all" ? mockGames : mockGames.filter((g) => g.sport === filter);
  const live = filtered.filter((g) => g.status === "live");
  const upcoming = filtered.filter((g) => g.status === "scheduled");
  const final = filtered.filter((g) => g.status === "final");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Scores</h1>
        <p className="text-sm text-muted mt-1">Real-time scores across all sports</p>
      </div>

      {/* Sport filters */}
      <div className="flex flex-wrap gap-2">
        {sports.map((s) => (
          <button
            key={s.key}
            onClick={() => setFilter(s.key)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              filter === s.key
                ? "bg-accent text-black"
                : "border border-border text-muted hover:text-foreground hover:border-foreground/30"
            )}
          >
            {s.key !== "all" && <span className="mr-1">{getSportEmoji(s.key)}</span>}
            {s.label}
          </button>
        ))}
      </div>

      {/* Live */}
      {live.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-danger animate-pulse-live" />
            Live Now
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {live.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">Upcoming</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {upcoming.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      )}

      {/* Final */}
      {final.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">Final</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {final.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
