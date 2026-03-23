"use client";

import { mockGames } from "@/lib/mock-data";
import { getSportEmoji } from "@/lib/utils";
import { Tv, Radio, ExternalLink } from "lucide-react";

const liveGames = mockGames.filter((g) => g.status === "live");

export default function LivePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Live Sports</h1>
        <p className="text-sm text-muted mt-1">
          Watch live games and streams in one place
        </p>
      </div>

      {liveGames.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {liveGames.map((game) => (
            <div
              key={game.id}
              className="rounded-xl border border-border bg-card overflow-hidden animate-slide-up"
            >
              {/* Video placeholder */}
              <div className="aspect-video bg-black/80 flex items-center justify-center relative">
                <div className="text-center">
                  <Tv size={48} className="text-muted mx-auto mb-3" />
                  <p className="text-sm text-muted">
                    Live stream available via {game.broadcast}
                  </p>
                  <button className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent-hover transition-colors">
                    <ExternalLink size={14} />
                    Watch on {game.broadcast}
                  </button>
                </div>
                {/* Live badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-danger/90 rounded-md px-2 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse-live" />
                  <span className="text-xs font-bold text-white">LIVE</span>
                </div>
                {/* Score overlay */}
                <div className="absolute bottom-3 right-3 bg-black/70 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-xs text-muted">{game.awayTeam.abbreviation}</p>
                      <p className="text-lg font-bold text-white">{game.awayScore}</p>
                    </div>
                    <div className="text-xs text-muted">
                      <p>{game.period}</p>
                      <p>{game.clock}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted">{game.homeTeam.abbreviation}</p>
                      <p className="text-lg font-bold text-white">{game.homeScore}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Game info */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{getSportEmoji(game.sport)}</span>
                    <span className="text-sm font-medium text-foreground">
                      {game.awayTeam.name} @ {game.homeTeam.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio size={14} className="text-accent" />
                    <span className="text-xs text-muted">{game.venue}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Tv size={64} className="text-muted mb-4" />
          <h2 className="text-lg font-semibold text-foreground">No Live Games Right Now</h2>
          <p className="text-sm text-muted mt-1">Check back later or browse the schedule</p>
        </div>
      )}
    </div>
  );
}
