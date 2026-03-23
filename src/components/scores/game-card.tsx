"use client";

import type { Game } from "@/lib/types";
import { cn, getSportEmoji } from "@/lib/utils";

export function GameCard({ game }: { game: Game }) {
  const isLive = game.status === "live";
  const isFinal = game.status === "final";

  return (
    <div className="rounded-xl border border-border bg-card hover:bg-card-hover transition-colors p-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm">{getSportEmoji(game.sport)}</span>
          <span className="text-xs font-medium text-muted uppercase">{game.sport}</span>
        </div>
        {isLive && (
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-danger animate-pulse-live" />
            <span className="text-xs font-semibold text-danger">
              {game.period} {game.clock}
            </span>
          </div>
        )}
        {isFinal && (
          <span className="text-xs font-medium text-muted">Final</span>
        )}
        {game.status === "scheduled" && (
          <span className="text-xs text-muted">
            {new Date(game.startTime).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
        )}
      </div>

      {/* Teams */}
      <div className="space-y-2">
        <TeamRow
          name={game.awayTeam.abbreviation}
          fullName={game.awayTeam.name}
          score={game.awayScore}
          color={game.awayTeam.primaryColor}
          isWinning={game.awayScore > game.homeScore}
          showScore={isLive || isFinal}
        />
        <TeamRow
          name={game.homeTeam.abbreviation}
          fullName={game.homeTeam.name}
          score={game.homeScore}
          color={game.homeTeam.primaryColor}
          isWinning={game.homeScore > game.awayScore}
          showScore={isLive || isFinal}
        />
      </div>

      {/* Footer */}
      {game.broadcast && (
        <div className="mt-3 flex items-center justify-between text-xs text-muted">
          <span>{game.venue}</span>
          <span className="rounded bg-card-hover px-1.5 py-0.5">{game.broadcast}</span>
        </div>
      )}
    </div>
  );
}

function TeamRow({
  name,
  fullName,
  score,
  color,
  isWinning,
  showScore,
}: {
  name: string;
  fullName: string;
  score: number;
  color: string;
  isWinning: boolean;
  showScore: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div
          className="h-6 w-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white"
          style={{ backgroundColor: color }}
        >
          {name.slice(0, 2)}
        </div>
        <span className={cn("text-sm font-medium", isWinning && showScore ? "text-foreground" : "text-muted")}>
          {fullName}
        </span>
      </div>
      {showScore && (
        <span className={cn("text-lg font-bold tabular-nums", isWinning ? "text-foreground" : "text-muted")}>
          {score}
        </span>
      )}
    </div>
  );
}
