"use client";

import { useState } from "react";
import { ContractCard } from "@/components/trader/contract-card";
import { mockContracts, mockPositions } from "@/lib/mock-data";
import { formatCurrency, cn, getSportEmoji } from "@/lib/utils";
import { TrendingUp, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { Sport } from "@/lib/types";

const categories = ["All", "Game Outcomes", "Player Props", "Totals", "Special"];

export default function TraderPage() {
  const [category, setCategory] = useState("All");

  const filtered =
    category === "All"
      ? mockContracts
      : mockContracts.filter((c) => c.category === category);

  const portfolioValue = mockPositions.reduce((s, p) => s + p.currentValue, 0);
  const portfolioCost = mockPositions.reduce(
    (s, p) => s + p.avgPrice * p.quantity,
    0
  );
  const pnl = portfolioValue - portfolioCost;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <TrendingUp size={24} className="text-accent" />
          Kalshi Sports Trader
        </h1>
        <p className="text-sm text-muted mt-1">
          Trade event contracts on sports outcomes. Buy Yes or No on any market.
        </p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted mb-1">
            <Wallet size={14} />
            <span className="text-xs">Portfolio Value</span>
          </div>
          <p className="text-xl font-bold text-foreground">{formatCurrency(portfolioValue)}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted mb-1">
            {pnl >= 0 ? <ArrowUpRight size={14} className="text-accent" /> : <ArrowDownRight size={14} className="text-danger" />}
            <span className="text-xs">Unrealized P&L</span>
          </div>
          <p className={cn("text-xl font-bold", pnl >= 0 ? "text-accent" : "text-danger")}>
            {pnl >= 0 ? "+" : ""}{formatCurrency(pnl)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted mb-1">
            <TrendingUp size={14} />
            <span className="text-xs">Open Positions</span>
          </div>
          <p className="text-xl font-bold text-foreground">{mockPositions.length}</p>
        </div>
      </div>

      {/* Your Positions */}
      {mockPositions.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">Your Positions</h2>
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted">
                  <th className="px-4 py-3 font-medium">Contract</th>
                  <th className="px-4 py-3 font-medium">Side</th>
                  <th className="px-4 py-3 font-medium">Qty</th>
                  <th className="px-4 py-3 font-medium">Avg Price</th>
                  <th className="px-4 py-3 font-medium">Current</th>
                  <th className="px-4 py-3 font-medium">P&L</th>
                </tr>
              </thead>
              <tbody>
                {mockPositions.map((pos) => {
                  const currentPrice = pos.side === "yes" ? pos.contract.yesPrice : pos.contract.noPrice;
                  const positionPnl = (currentPrice - pos.avgPrice) * pos.quantity;
                  return (
                    <tr key={pos.id} className="border-b border-border last:border-0 hover:bg-card-hover">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span>{getSportEmoji(pos.contract.sport)}</span>
                          <span className="text-foreground">{pos.contract.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "rounded-md px-2 py-0.5 text-xs font-semibold",
                          pos.side === "yes" ? "bg-accent/20 text-accent" : "bg-danger/20 text-danger"
                        )}>
                          {pos.side.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-foreground">{pos.quantity}</td>
                      <td className="px-4 py-3 text-muted">{(pos.avgPrice * 100).toFixed(0)}¢</td>
                      <td className="px-4 py-3 text-foreground">{(currentPrice * 100).toFixed(0)}¢</td>
                      <td className={cn("px-4 py-3 font-semibold", positionPnl >= 0 ? "text-accent" : "text-danger")}>
                        {positionPnl >= 0 ? "+" : ""}{formatCurrency(positionPnl)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Browse Markets */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">Browse Markets</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                category === cat
                  ? "bg-accent text-black"
                  : "border border-border text-muted hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((contract) => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </div>
      </section>
    </div>
  );
}
