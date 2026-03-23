"use client";

import { GameCard } from "@/components/scores/game-card";
import { BetCard } from "@/components/bets/bet-card";
import { ContractCard } from "@/components/trader/contract-card";
import { PostCard } from "@/components/community/post-card";
import { ChatPanel } from "@/components/chat/chat-panel";
import { mockGames, mockBets, mockContracts, mockPosts, mockPositions } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, Receipt, Trophy, Tv } from "lucide-react";

const liveGames = mockGames.filter((g) => g.status === "live");
const activeBets = mockBets.filter((b) => b.status === "pending");
const totalStaked = activeBets.reduce((sum, b) => sum + b.stake, 0);
const totalPotential = activeBets.reduce((sum, b) => sum + b.potentialPayout, 0);
const portfolioValue = mockPositions.reduce((sum, p) => sum + p.currentValue, 0);
const portfolioCost = mockPositions.reduce((sum, p) => sum + p.avgPrice * p.quantity, 0);

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Tv size={18} />}
          label="Live Games"
          value={`${liveGames.length} in progress`}
          accent
        />
        <StatCard
          icon={<Receipt size={18} />}
          label="Active Bets"
          value={`${activeBets.length} bets · ${formatCurrency(totalStaked)} staked`}
        />
        <StatCard
          icon={<TrendingUp size={18} />}
          label="Potential Payout"
          value={formatCurrency(totalPotential)}
          accent
        />
        <StatCard
          icon={<Trophy size={18} />}
          label="Kalshi Portfolio"
          value={`${formatCurrency(portfolioValue)} (${portfolioValue >= portfolioCost ? "+" : ""}${formatCurrency(portfolioValue - portfolioCost)})`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - left 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Scores */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-danger animate-pulse-live" />
                Live & Upcoming
              </h2>
              <a href="/scores" className="text-xs text-accent hover:text-accent-hover transition-colors">
                View all scores →
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockGames.slice(0, 4).map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </section>

          {/* Active Bets */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Active Bets</h2>
              <a href="/bets" className="text-xs text-accent hover:text-accent-hover transition-colors">
                All bets →
              </a>
            </div>
            <div className="space-y-3">
              {activeBets.slice(0, 3).map((bet) => (
                <BetCard key={bet.id} bet={bet} />
              ))}
            </div>
          </section>

          {/* Trending Contracts */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Trending Markets</h2>
              <a href="/trader" className="text-xs text-accent hover:text-accent-hover transition-colors">
                All markets →
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockContracts.slice(0, 4).map((contract) => (
                <ContractCard key={contract.id} contract={contract} />
              ))}
            </div>
          </section>

          {/* Community Feed */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Community Feed</h2>
              <a href="/community" className="text-xs text-accent hover:text-accent-hover transition-colors">
                Explore →
              </a>
            </div>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              {mockPosts.slice(0, 3).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        </div>

        {/* Right sidebar - Chat */}
        <div className="hidden lg:block">
          <div className="sticky top-20">
            <ChatPanel className="h-[calc(100vh-8rem)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 animate-slide-up">
      <div className="flex items-center gap-2 text-muted mb-1">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className={`text-sm font-semibold ${accent ? "text-accent" : "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}
