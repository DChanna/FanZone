"use client";

import type { Bet } from "@/lib/types";
import { formatCurrency, formatOdds, getBetStatusColor, getSportsbookName, cn } from "@/lib/utils";
import { CircleDot, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function BetCard({ bet }: { bet: Bet }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card hover:bg-card-hover transition-colors animate-slide-up">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("flex items-center gap-1.5", getBetStatusColor(bet.status))}>
              <CircleDot size={14} />
              <span className="text-xs font-semibold uppercase">{bet.status}</span>
            </div>
            <span className="text-xs text-muted rounded-md bg-card-hover px-2 py-0.5">
              {getSportsbookName(bet.sportsbook)}
            </span>
            <span className="text-xs text-muted rounded-md bg-card-hover px-2 py-0.5 capitalize">
              {bet.type.replace("_", "/")}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-muted">Stake</p>
              <p className="text-sm font-semibold">{formatCurrency(bet.stake)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted">To Win</p>
              <p className="text-sm font-semibold text-accent">{formatCurrency(bet.potentialPayout)}</p>
            </div>
            {expanded ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
          </div>
        </div>

        {/* Preview first leg */}
        {!expanded && (
          <div className="mt-2 text-sm text-foreground">
            {bet.legs[0].selection}
            {bet.legs.length > 1 && (
              <span className="text-muted ml-2">+{bet.legs.length - 1} more</span>
            )}
          </div>
        )}
      </button>

      {expanded && (
        <div className="border-t border-border px-4 pb-4 pt-3 space-y-2">
          {bet.legs.map((leg) => (
            <div key={leg.id} className="flex items-center justify-between text-sm">
              <div>
                <p className="text-foreground">{leg.selection}</p>
                <p className="text-xs text-muted">{leg.game}</p>
              </div>
              <span className="text-muted font-mono text-xs">{formatOdds(leg.odds)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
