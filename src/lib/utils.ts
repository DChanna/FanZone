import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatOdds(odds: number): string {
  return odds > 0 ? `+${odds}` : `${odds}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatCompactNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

export function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function getSportEmoji(sport: string): string {
  const map: Record<string, string> = {
    nfl: "🏈",
    nba: "🏀",
    mlb: "⚾",
    nhl: "🏒",
    soccer: "⚽",
    mma: "🥊",
    tennis: "🎾",
  };
  return map[sport] || "🏅";
}

export function getSportsbookName(key: string): string {
  const map: Record<string, string> = {
    draftkings: "DraftKings",
    fanduel: "FanDuel",
    betmgm: "BetMGM",
    caesars: "Caesars",
    pointsbet: "PointsBet",
    other: "Other",
  };
  return map[key] || key;
}

export function getBetStatusColor(status: string): string {
  const map: Record<string, string> = {
    pending: "text-warning",
    won: "text-accent",
    lost: "text-danger",
    push: "text-muted",
    cashed_out: "text-info",
  };
  return map[status] || "text-foreground";
}
