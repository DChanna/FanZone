"use client";

import { useState } from "react";
import { BetCard } from "@/components/bets/bet-card";
import { mockBets } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";
import { Plus, Filter, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { BetStatus, Sportsbook } from "@/lib/types";

const statusFilters: { key: "all" | BetStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "won", label: "Won" },
  { key: "lost", label: "Lost" },
  { key: "push", label: "Push" },
];

export default function BetsPage() {
  const [statusFilter, setStatusFilter] = useState<"all" | BetStatus>("all");
  const [showAddBet, setShowAddBet] = useState(false);

  const filtered =
    statusFilter === "all"
      ? mockBets
      : mockBets.filter((b) => b.status === statusFilter);

  const totalStaked = mockBets.reduce((s, b) => s + b.stake, 0);
  const totalWon = mockBets
    .filter((b) => b.status === "won")
    .reduce((s, b) => s + b.potentialPayout, 0);
  const totalLost = mockBets
    .filter((b) => b.status === "lost")
    .reduce((s, b) => s + b.stake, 0);
  const netPnl = totalWon - totalLost;
  const pendingExposure = mockBets
    .filter((b) => b.status === "pending")
    .reduce((s, b) => s + b.stake, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bet Tracker</h1>
          <p className="text-sm text-muted mt-1">
            Track all your bets across sportsbooks
          </p>
        </div>
        <button
          onClick={() => setShowAddBet(!showAddBet)}
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent-hover transition-colors"
        >
          <Plus size={16} />
          Add Bet
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted mb-1">Total Staked</p>
          <p className="text-lg font-bold">{formatCurrency(totalStaked)}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted mb-1 flex items-center gap-1">
            <TrendingUp size={12} className="text-accent" /> Total Won
          </p>
          <p className="text-lg font-bold text-accent">{formatCurrency(totalWon)}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted mb-1 flex items-center gap-1">
            Net P&L
          </p>
          <p className={cn("text-lg font-bold", netPnl >= 0 ? "text-accent" : "text-danger")}>
            {netPnl >= 0 ? "+" : ""}{formatCurrency(netPnl)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted mb-1">Pending Exposure</p>
          <p className="text-lg font-bold text-warning">{formatCurrency(pendingExposure)}</p>
        </div>
      </div>

      {/* Add Bet Form */}
      {showAddBet && <AddBetForm onClose={() => setShowAddBet(false)} />}

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Filter size={14} className="text-muted" />
        {statusFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setStatusFilter(f.key)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              statusFilter === f.key
                ? "bg-accent text-black"
                : "border border-border text-muted hover:text-foreground"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Bet List */}
      <div className="space-y-3">
        {filtered.map((bet) => (
          <BetCard key={bet.id} bet={bet} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted">
            <p>No bets match this filter</p>
          </div>
        )}
      </div>

      {/* Connected Sportsbooks */}
      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-sm font-semibold text-foreground mb-4">
          Connected Sportsbooks
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(["draftkings", "fanduel", "betmgm", "caesars"] as Sportsbook[]).map((sb) => (
            <div
              key={sb}
              className="rounded-lg border border-border p-3 text-center hover:border-accent/50 transition-colors cursor-pointer"
            >
              <p className="text-sm font-medium text-foreground capitalize">{sb === "betmgm" ? "BetMGM" : sb.charAt(0).toUpperCase() + sb.slice(1)}</p>
              <p className="text-xs text-accent mt-1">Connected</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function AddBetForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="rounded-xl border border-accent/30 bg-card p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-foreground">Add New Bet</h2>
        <button onClick={onClose} className="text-xs text-muted hover:text-foreground">
          Cancel
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="text-xs text-muted mb-1 block">Sportsbook</label>
          <select className="w-full rounded-lg border border-border bg-card-hover px-3 py-2 text-sm text-foreground outline-none">
            <option>DraftKings</option>
            <option>FanDuel</option>
            <option>BetMGM</option>
            <option>Caesars</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-muted mb-1 block">Bet Type</label>
          <select className="w-full rounded-lg border border-border bg-card-hover px-3 py-2 text-sm text-foreground outline-none">
            <option>Spread</option>
            <option>Moneyline</option>
            <option>Over/Under</option>
            <option>Prop</option>
            <option>Parlay</option>
            <option>Futures</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-muted mb-1 block">Stake ($)</label>
          <input
            type="number"
            placeholder="0.00"
            className="w-full rounded-lg border border-border bg-card-hover px-3 py-2 text-sm text-foreground outline-none focus:border-accent/50"
          />
        </div>
        <div>
          <label className="text-xs text-muted mb-1 block">Odds</label>
          <input
            type="text"
            placeholder="-110"
            className="w-full rounded-lg border border-border bg-card-hover px-3 py-2 text-sm text-foreground outline-none focus:border-accent/50"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="text-xs text-muted mb-1 block">Selection / Description</label>
        <input
          type="text"
          placeholder="e.g. Lakers -3.5, LeBron over 27.5 pts"
          className="w-full rounded-lg border border-border bg-card-hover px-3 py-2 text-sm text-foreground outline-none focus:border-accent/50"
        />
      </div>
      <div className="mt-4 flex justify-end">
        <button className="rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-black hover:bg-accent-hover transition-colors">
          Save Bet
        </button>
      </div>
    </div>
  );
}
