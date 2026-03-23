"use client";

import type { EventContract } from "@/lib/types";
import { formatCompactNumber, getSportEmoji } from "@/lib/utils";

export function ContractCard({ contract }: { contract: EventContract }) {
  const yesPercent = Math.round(contract.yesPrice * 100);
  const noPercent = Math.round(contract.noPrice * 100);

  return (
    <div className="rounded-xl border border-border bg-card hover:bg-card-hover transition-colors p-4 animate-slide-up">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm">{getSportEmoji(contract.sport)}</span>
            <span className="text-xs text-muted uppercase">{contract.category}</span>
          </div>
          <h3 className="text-sm font-medium text-foreground leading-snug">{contract.title}</h3>
        </div>
      </div>

      {/* Price bar */}
      <div className="mb-3">
        <div className="flex h-2 rounded-full overflow-hidden bg-border">
          <div
            className="bg-accent transition-all duration-500"
            style={{ width: `${yesPercent}%` }}
          />
          <div
            className="bg-danger transition-all duration-500"
            style={{ width: `${noPercent}%` }}
          />
        </div>
      </div>

      {/* Buy buttons */}
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-accent/30 bg-accent/10 py-2 text-sm font-semibold text-accent hover:bg-accent/20 transition-colors">
          <span>Yes</span>
          <span className="text-xs opacity-70">{yesPercent}¢</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-danger/30 bg-danger/10 py-2 text-sm font-semibold text-danger hover:bg-danger/20 transition-colors">
          <span>No</span>
          <span className="text-xs opacity-70">{noPercent}¢</span>
        </button>
      </div>

      {/* Volume */}
      <div className="mt-2 text-xs text-muted text-center">
        Vol: {formatCompactNumber(contract.volume)} contracts
      </div>
    </div>
  );
}
