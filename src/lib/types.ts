// ============================================
// Core domain types for FanZone
// ============================================

export type Sport = "nfl" | "nba" | "mlb" | "nhl" | "soccer" | "mma" | "tennis";

export type GameStatus = "scheduled" | "live" | "final" | "delayed" | "postponed";

export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logo?: string;
  primaryColor: string;
}

export interface Game {
  id: string;
  sport: Sport;
  status: GameStatus;
  startTime: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  period?: string;
  clock?: string;
  venue?: string;
  broadcast?: string;
}

// ============================================
// Bet Tracking
// ============================================

export type BetStatus = "pending" | "won" | "lost" | "push" | "cashed_out";
export type BetType = "spread" | "moneyline" | "over_under" | "prop" | "parlay" | "futures";
export type Sportsbook = "draftkings" | "fanduel" | "betmgm" | "caesars" | "pointsbet" | "other";

export interface BetLeg {
  id: string;
  game: string;
  selection: string;
  odds: number;
  result?: BetStatus;
}

export interface Bet {
  id: string;
  type: BetType;
  sportsbook: Sportsbook;
  legs: BetLeg[];
  stake: number;
  potentialPayout: number;
  status: BetStatus;
  placedAt: string;
  settledAt?: string;
}

// ============================================
// Kalshi / Event Contracts
// ============================================

export interface EventContract {
  id: string;
  title: string;
  sport: Sport;
  category: string;
  yesPrice: number;
  noPrice: number;
  volume: number;
  expiresAt: string;
  settled: boolean;
  result?: "yes" | "no";
}

export interface Position {
  id: string;
  contractId: string;
  contract: EventContract;
  side: "yes" | "no";
  quantity: number;
  avgPrice: number;
  currentValue: number;
}

// ============================================
// Community / Social
// ============================================

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  favoriteTeams: string[];
  joinedAt: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
    betRecord: { wins: number; losses: number; pushes: number };
  };
}

export interface Post {
  id: string;
  author: User;
  content: string;
  media?: { type: "image" | "video" | "gif"; url: string }[];
  tags: string[];
  gameId?: string;
  likes: number;
  comments: number;
  reposts: number;
  createdAt: string;
  liked?: boolean;
  reposted?: boolean;
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  content: string;
  createdAt: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  sport?: Sport;
  teamId?: string;
  memberCount: number;
  avatar?: string;
  banner?: string;
}
