import type {
  Game,
  Bet,
  EventContract,
  Position,
  Post,
  User,
  Community,
  ChatMessage,
} from "./types";

// ============================================
// Mock Users
// ============================================

export const currentUser: User = {
  id: "u1",
  username: "sportsfan42",
  displayName: "Mike Johnson",
  avatar: undefined,
  bio: "Die-hard Eagles fan. NBA junkie. Bet tracker extraordinaire.",
  favoriteTeams: ["PHI Eagles", "76ers", "Phillies"],
  joinedAt: "2024-01-15T00:00:00Z",
  stats: {
    posts: 247,
    followers: 1823,
    following: 412,
    betRecord: { wins: 156, losses: 122, pushes: 14 },
  },
};

const mockUsers: User[] = [
  currentUser,
  {
    id: "u2",
    username: "hoopsdreams",
    displayName: "Sarah Chen",
    bio: "Lakers 4 Life. WNBA advocate.",
    favoriteTeams: ["Lakers", "Sparks"],
    joinedAt: "2024-03-10T00:00:00Z",
    stats: { posts: 89, followers: 542, following: 201, betRecord: { wins: 45, losses: 32, pushes: 5 } },
  },
  {
    id: "u3",
    username: "gridironking",
    displayName: "James Williams",
    bio: "Fantasy football champion 3x. Cowboys forever.",
    favoriteTeams: ["Cowboys", "Mavericks"],
    joinedAt: "2024-02-20T00:00:00Z",
    stats: { posts: 312, followers: 2100, following: 305, betRecord: { wins: 201, losses: 150, pushes: 20 } },
  },
  {
    id: "u4",
    username: "puckhead99",
    displayName: "Emily Rodriguez",
    bio: "Hockey is life. Bruins fan since birth.",
    favoriteTeams: ["Bruins", "Celtics"],
    joinedAt: "2024-04-01T00:00:00Z",
    stats: { posts: 156, followers: 890, following: 178, betRecord: { wins: 78, losses: 65, pushes: 8 } },
  },
];

// ============================================
// Mock Live Games
// ============================================

export const mockGames: Game[] = [
  {
    id: "g1",
    sport: "nba",
    status: "live",
    startTime: "2026-03-23T19:30:00Z",
    homeTeam: { id: "t1", name: "Los Angeles Lakers", abbreviation: "LAL", primaryColor: "#552583" },
    awayTeam: { id: "t2", name: "Boston Celtics", abbreviation: "BOS", primaryColor: "#007A33" },
    homeScore: 87,
    awayScore: 92,
    period: "3rd",
    clock: "4:23",
    venue: "Crypto.com Arena",
    broadcast: "ESPN",
  },
  {
    id: "g2",
    sport: "nba",
    status: "live",
    startTime: "2026-03-23T19:00:00Z",
    homeTeam: { id: "t3", name: "Golden State Warriors", abbreviation: "GSW", primaryColor: "#1D428A" },
    awayTeam: { id: "t4", name: "Phoenix Suns", abbreviation: "PHX", primaryColor: "#1D1160" },
    homeScore: 105,
    awayScore: 98,
    period: "4th",
    clock: "2:15",
    venue: "Chase Center",
    broadcast: "TNT",
  },
  {
    id: "g3",
    sport: "nfl",
    status: "scheduled",
    startTime: "2026-03-23T20:00:00Z",
    homeTeam: { id: "t5", name: "Philadelphia Eagles", abbreviation: "PHI", primaryColor: "#004C54" },
    awayTeam: { id: "t6", name: "Dallas Cowboys", abbreviation: "DAL", primaryColor: "#003594" },
    homeScore: 0,
    awayScore: 0,
    venue: "Lincoln Financial Field",
    broadcast: "FOX",
  },
  {
    id: "g4",
    sport: "nhl",
    status: "live",
    startTime: "2026-03-23T19:00:00Z",
    homeTeam: { id: "t7", name: "New York Rangers", abbreviation: "NYR", primaryColor: "#0038A8" },
    awayTeam: { id: "t8", name: "Pittsburgh Penguins", abbreviation: "PIT", primaryColor: "#FCB514" },
    homeScore: 3,
    awayScore: 2,
    period: "2nd",
    clock: "8:42",
    venue: "Madison Square Garden",
    broadcast: "ESPN+",
  },
  {
    id: "g5",
    sport: "mlb",
    status: "scheduled",
    startTime: "2026-03-24T01:10:00Z",
    homeTeam: { id: "t9", name: "New York Yankees", abbreviation: "NYY", primaryColor: "#003087" },
    awayTeam: { id: "t10", name: "Boston Red Sox", abbreviation: "BOS", primaryColor: "#BD3039" },
    homeScore: 0,
    awayScore: 0,
    venue: "Yankee Stadium",
    broadcast: "MLB Network",
  },
  {
    id: "g6",
    sport: "soccer",
    status: "final",
    startTime: "2026-03-23T15:00:00Z",
    homeTeam: { id: "t11", name: "Manchester United", abbreviation: "MUN", primaryColor: "#DA291C" },
    awayTeam: { id: "t12", name: "Liverpool", abbreviation: "LIV", primaryColor: "#C8102E" },
    homeScore: 2,
    awayScore: 3,
    venue: "Old Trafford",
    broadcast: "Peacock",
  },
  {
    id: "g7",
    sport: "nba",
    status: "scheduled",
    startTime: "2026-03-23T22:00:00Z",
    homeTeam: { id: "t13", name: "Miami Heat", abbreviation: "MIA", primaryColor: "#98002E" },
    awayTeam: { id: "t14", name: "Milwaukee Bucks", abbreviation: "MIL", primaryColor: "#00471B" },
    homeScore: 0,
    awayScore: 0,
    venue: "Kaseya Center",
    broadcast: "NBA TV",
  },
];

// ============================================
// Mock Bets
// ============================================

export const mockBets: Bet[] = [
  {
    id: "b1",
    type: "spread",
    sportsbook: "draftkings",
    legs: [{ id: "l1", game: "Lakers vs Celtics", selection: "Celtics -3.5", odds: -110, result: undefined }],
    stake: 50,
    potentialPayout: 95.45,
    status: "pending",
    placedAt: "2026-03-23T18:00:00Z",
  },
  {
    id: "b2",
    type: "parlay",
    sportsbook: "fanduel",
    legs: [
      { id: "l2", game: "Warriors vs Suns", selection: "Warriors ML", odds: -150, result: undefined },
      { id: "l3", game: "Rangers vs Penguins", selection: "Over 5.5", odds: -115, result: undefined },
      { id: "l4", game: "Eagles vs Cowboys", selection: "Eagles -7", odds: -110, result: undefined },
    ],
    stake: 25,
    potentialPayout: 143.75,
    status: "pending",
    placedAt: "2026-03-23T17:30:00Z",
  },
  {
    id: "b3",
    type: "moneyline",
    sportsbook: "betmgm",
    legs: [{ id: "l5", game: "Man United vs Liverpool", selection: "Liverpool ML", odds: +120, result: "won" }],
    stake: 100,
    potentialPayout: 220,
    status: "won",
    placedAt: "2026-03-23T14:00:00Z",
    settledAt: "2026-03-23T17:00:00Z",
  },
  {
    id: "b4",
    type: "prop",
    sportsbook: "draftkings",
    legs: [{ id: "l6", game: "Lakers vs Celtics", selection: "LeBron Over 27.5 pts", odds: -120, result: undefined }],
    stake: 40,
    potentialPayout: 73.33,
    status: "pending",
    placedAt: "2026-03-23T18:15:00Z",
  },
  {
    id: "b5",
    type: "over_under",
    sportsbook: "caesars",
    legs: [{ id: "l7", game: "Yankees vs Red Sox", selection: "Over 8.5", odds: -105, result: undefined }],
    stake: 75,
    potentialPayout: 146.43,
    status: "pending",
    placedAt: "2026-03-23T16:00:00Z",
  },
];

// ============================================
// Mock Kalshi Contracts
// ============================================

export const mockContracts: EventContract[] = [
  {
    id: "c1",
    title: "Will the Lakers win tonight?",
    sport: "nba",
    category: "Game Outcomes",
    yesPrice: 0.42,
    noPrice: 0.58,
    volume: 125430,
    expiresAt: "2026-03-24T05:00:00Z",
    settled: false,
  },
  {
    id: "c2",
    title: "Will LeBron score 30+ points?",
    sport: "nba",
    category: "Player Props",
    yesPrice: 0.35,
    noPrice: 0.65,
    volume: 89200,
    expiresAt: "2026-03-24T05:00:00Z",
    settled: false,
  },
  {
    id: "c3",
    title: "Eagles win by 10+ over Cowboys?",
    sport: "nfl",
    category: "Game Outcomes",
    yesPrice: 0.28,
    noPrice: 0.72,
    volume: 234100,
    expiresAt: "2026-03-24T03:00:00Z",
    settled: false,
  },
  {
    id: "c4",
    title: "Total goals in Rangers vs Penguins over 6.5?",
    sport: "nhl",
    category: "Totals",
    yesPrice: 0.45,
    noPrice: 0.55,
    volume: 45600,
    expiresAt: "2026-03-24T00:00:00Z",
    settled: false,
  },
  {
    id: "c5",
    title: "Warriors finish with 110+ points?",
    sport: "nba",
    category: "Totals",
    yesPrice: 0.62,
    noPrice: 0.38,
    volume: 67800,
    expiresAt: "2026-03-24T05:00:00Z",
    settled: false,
  },
  {
    id: "c6",
    title: "Will any NBA game tonight go to overtime?",
    sport: "nba",
    category: "Special",
    yesPrice: 0.22,
    noPrice: 0.78,
    volume: 156700,
    expiresAt: "2026-03-24T08:00:00Z",
    settled: false,
  },
];

export const mockPositions: Position[] = [
  {
    id: "p1",
    contractId: "c1",
    contract: mockContracts[0],
    side: "no",
    quantity: 50,
    avgPrice: 0.55,
    currentValue: 0.58 * 50,
  },
  {
    id: "p2",
    contractId: "c3",
    contract: mockContracts[2],
    side: "yes",
    quantity: 100,
    avgPrice: 0.22,
    currentValue: 0.28 * 100,
  },
];

// ============================================
// Mock Posts / Feed
// ============================================

export const mockPosts: Post[] = [
  {
    id: "p1",
    author: mockUsers[1],
    content: "Lakers getting cooked by the Celtics AGAIN 😭 When will it end? Tatum is absolutely unguardable tonight.",
    tags: ["nba", "lakers", "celtics"],
    gameId: "g1",
    likes: 142,
    comments: 38,
    reposts: 12,
    createdAt: "2026-03-23T19:45:00Z",
    liked: false,
    reposted: false,
  },
  {
    id: "p2",
    author: mockUsers[2],
    content: "Eagles -7 is free money. Dallas has no answer for the Philly D-line. Taking this to the bank. 💰",
    tags: ["nfl", "eagles", "cowboys", "betting"],
    likes: 89,
    comments: 56,
    reposts: 23,
    createdAt: "2026-03-23T19:30:00Z",
    liked: true,
    reposted: false,
  },
  {
    id: "p3",
    author: mockUsers[3],
    content: "Rangers up 3-2! Shesterkin is standing on his head tonight. MSG is ELECTRIC right now ⚡",
    tags: ["nhl", "rangers", "penguins"],
    gameId: "g4",
    likes: 67,
    comments: 15,
    reposts: 8,
    createdAt: "2026-03-23T19:50:00Z",
    liked: false,
    reposted: false,
  },
  {
    id: "p4",
    author: mockUsers[0],
    content: "3-leg parlay looking alive! Warriors covering, Rangers over hitting... just need my Eagles to come through. Let's ride 🎰",
    tags: ["betting", "parlay", "nfl", "nba", "nhl"],
    likes: 203,
    comments: 44,
    reposts: 31,
    createdAt: "2026-03-23T19:55:00Z",
    liked: false,
    reposted: false,
  },
  {
    id: "p5",
    author: mockUsers[1],
    content: "Liverpool pulling off the comeback at Old Trafford! 3-2! What a match. Salah is simply built different.",
    tags: ["soccer", "premierleague", "liverpool"],
    gameId: "g6",
    likes: 315,
    comments: 92,
    reposts: 67,
    createdAt: "2026-03-23T17:05:00Z",
    liked: true,
    reposted: true,
  },
];

// ============================================
// Mock Communities
// ============================================

export const mockCommunities: Community[] = [
  { id: "cm1", name: "NBA Daily", description: "Daily NBA discussion, highlights, and analysis", sport: "nba", memberCount: 45200 },
  { id: "cm2", name: "Bet Brainiacs", description: "Sharp bettors sharing picks and strategies", memberCount: 12800 },
  { id: "cm3", name: "Eagles Nation", description: "Everything Philadelphia Eagles", sport: "nfl", teamId: "t5", memberCount: 23400 },
  { id: "cm4", name: "Hockey Heads", description: "NHL fans unite. Highlights, trades, and game threads", sport: "nhl", memberCount: 18900 },
  { id: "cm5", name: "Kalshi Corner", description: "Event contract strategies and market analysis", memberCount: 8600 },
  { id: "cm6", name: "Fantasy Sports Hub", description: "Fantasy football, basketball, baseball - all leagues welcome", memberCount: 34100 },
];

// ============================================
// Mock Chat Messages
// ============================================

export const mockChatMessages: ChatMessage[] = [
  { id: "m1", userId: "u2", username: "hoopsdreams", content: "Celtics are rolling! Tatum has 28 already", createdAt: "2026-03-23T19:40:00Z" },
  { id: "m2", userId: "u3", username: "gridironking", content: "Who else hammered Eagles -7?? 🔨", createdAt: "2026-03-23T19:41:00Z" },
  { id: "m3", userId: "u1", username: "sportsfan42", content: "My parlay is sweating rn... need Warriors to hold on", createdAt: "2026-03-23T19:42:00Z" },
  { id: "m4", userId: "u4", username: "puckhead99", content: "SHESTERKIN SAVE! Rangers staying alive!", createdAt: "2026-03-23T19:43:00Z" },
  { id: "m5", userId: "u2", username: "hoopsdreams", content: "Steph just hit a crazy 3... Warriors up 7 now", createdAt: "2026-03-23T19:44:00Z" },
  { id: "m6", userId: "u3", username: "gridironking", content: "Anyone buying YES on the LeBron 30+ contract? Seems underpriced at 35 cents", createdAt: "2026-03-23T19:45:00Z" },
  { id: "m7", userId: "u1", username: "sportsfan42", content: "Just grabbed 50 NO contracts on Lakers winning. Easy money", createdAt: "2026-03-23T19:46:00Z" },
  { id: "m8", userId: "u4", username: "puckhead99", content: "3-2 Rangers, Penguins pulling the goalie soon probably", createdAt: "2026-03-23T19:47:00Z" },
];
