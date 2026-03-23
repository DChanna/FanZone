# FanZone — Architecture & Vision

## Vision

FanZone is the all-in-one command center for sports fans. One app to watch live
games, track every bet across sportsbooks, trade event contracts, follow real-time
scores, and connect with a community of fans — no more juggling 6+ apps on game day.

---

## Platform Pillars

### 1. Live Sports Streaming
- Aggregated live streams from broadcast partners (ESPN, TNT, FOX, NBC, etc.)
- Picture-in-picture and multi-view for watching multiple games simultaneously
- Synchronized live stats overlay on streams
- DVR/rewind capabilities for key plays
- **Future**: native streaming deals, RedZone-style channel, watch parties

### 2. Bet Tracker & Sportsbook Integration
- **First-class integrations** with DraftKings, FanDuel, BetMGM, Caesars, PointsBet
- Auto-sync bets via OAuth/API connections to sportsbooks
- Manual bet entry for unsupported books
- Real-time bet status tracking tied to live game data
- P&L dashboards, ROI analytics, betting history
- Parlay builder that pulls odds from connected sportsbooks
- **Future**: odds comparison engine, sharp money alerts, AI bet suggestions

### 3. Kalshi Sports Trader
- Full integration with Kalshi's event contracts API
- Browse, buy, and sell Yes/No contracts on sports outcomes
- Portfolio view with unrealized P&L
- Price charts and market depth
- Category filtering (game outcomes, player props, totals, specials)
- **Future**: limit orders, portfolio analytics, social trading (copy trades)

### 4. Live Scores & Stats
- Real-time scores across NFL, NBA, MLB, NHL, Soccer, MMA, Tennis
- Box scores, play-by-play, player stats
- Sport-specific filtering
- Push notifications for close games, upsets, and bet-relevant events
- **Future**: advanced stats, historical data, team/player pages

### 5. Community & Social
- Twitter/X-style feed for sports takes, picks, and reactions
- Game-specific threads that auto-create for every live game
- Communities (team-based, sport-based, topic-based)
- Follow system with curated feeds
- User reputation based on betting record and post engagement
- **Future**: tipping, premium content, verified sharp bettors

### 6. Chat & Messaging
- Real-time chat channels per community
- Game day threads with live chat during games
- Direct messages between users
- Rich media support (GIFs, images, embedded scores)
- **Future**: voice rooms during games, video watch parties

---

## Tech Stack

| Layer           | Technology                          |
|-----------------|-------------------------------------|
| Framework       | Next.js 16 (App Router)             |
| Language        | TypeScript                          |
| Styling         | Tailwind CSS v4                     |
| Database        | SQLite (dev) → PostgreSQL (prod)    |
| ORM             | Prisma 7                            |
| Auth            | NextAuth.js v5                      |
| State           | Zustand (client), React Server Components (server) |
| Real-time       | WebSockets (Socket.io or Ably)      |
| API Layer       | Next.js Route Handlers + tRPC (planned) |
| Deployment      | Vercel                              |

---

## Project Structure (V0)

```
src/
├── app/
│   ├── (app)/              # Authenticated app shell
│   │   ├── layout.tsx      # Sidebar + Topbar layout
│   │   ├── dashboard/      # Main dashboard
│   │   ├── live/           # Live streaming
│   │   ├── scores/         # Score tracking
│   │   ├── bets/           # Bet tracker
│   │   ├── trader/         # Kalshi trader
│   │   ├── community/      # Social feed
│   │   ├── chat/           # Chat system
│   │   └── profile/        # User profile
│   ├── (auth)/             # Auth pages (no sidebar)
│   │   ├── login/
│   │   └── signup/
│   ├── api/                # API route handlers
│   │   ├── scores/
│   │   ├── bets/
│   │   ├── contracts/
│   │   └── community/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── globals.css
├── components/
│   ├── layout/             # Sidebar, Topbar
│   ├── scores/             # GameCard
│   ├── bets/               # BetCard
│   ├── trader/             # ContractCard
│   ├── community/          # PostCard
│   └── chat/               # ChatPanel
├── lib/
│   ├── types.ts            # Domain type definitions
│   ├── mock-data.ts        # Mock data for V0
│   └── utils.ts            # Utility functions
└── generated/
    └── prisma/             # Prisma client (generated)

prisma/
└── schema.prisma           # Database schema
```

---

## Data Models

### Core Entities
- **User** — Auth, profile, preferences, favorite teams
- **Game** — Live/scheduled games with scores, linked to Teams
- **Team** — Sports teams with branding
- **Bet** — User bets with BetLegs for parlays
- **EventContract** — Kalshi-style event contracts
- **Position** — User positions in event contracts
- **Post** — Social feed posts
- **Comment** — Post comments
- **Like** — Post likes
- **Community** — User-created communities
- **CommunityMember** — Community memberships
- **ChatMessage** — Real-time chat messages
- **Follow** — User follow relationships

See `prisma/schema.prisma` for the full schema.

---

## V0 (Current) — What's Built

- [x] Landing page with feature showcase
- [x] Dark-theme UI shell with collapsible sidebar navigation
- [x] Dashboard with live scores, active bets, trending markets, community feed, and live chat
- [x] Scores page with sport filtering (Live / Upcoming / Final)
- [x] Live Sports page with stream placeholders and score overlays
- [x] Bet Tracker with P&L stats, add-bet form, status filtering, connected sportsbooks
- [x] Kalshi Trader with portfolio positions table, market browsing, Yes/No trading UI
- [x] Community feed with compose, post interactions, trending topics, community sidebar
- [x] Chat with channel sidebar, DMs, real-time messaging
- [x] User profile with stats, tabs, betting record visualization
- [x] Auth pages (login + signup with OAuth placeholders)
- [x] API routes for scores, bets, contracts, community
- [x] Full Prisma schema for all entities
- [x] TypeScript types for all domain objects

---

## Roadmap

### V1 — Auth & Real Data
- [ ] Wire up NextAuth.js with Google/Apple OAuth + credentials
- [ ] Connect Prisma to PostgreSQL, run migrations, seed data
- [ ] Integrate ESPN/SportsRadar API for live scores
- [ ] Integrate Kalshi API for real event contracts
- [ ] Session management + protected routes

### V2 — Sportsbook Integrations
- [ ] DraftKings API integration (OAuth + bet sync)
- [ ] FanDuel API integration
- [ ] BetMGM API integration
- [ ] Auto-sync bets from connected sportsbooks
- [ ] Odds comparison widget

### V3 — Real-time
- [ ] WebSocket server for live score updates
- [ ] Real-time chat with Socket.io/Ably
- [ ] Push notifications (close games, bet settlements)
- [ ] Live game threads that auto-create

### V4 — Streaming
- [ ] Video player integration (HLS/DASH)
- [ ] Multi-view layout for simultaneous streams
- [ ] Picture-in-picture mode
- [ ] Watch party feature with synced playback

### V5 — Social & Engagement
- [ ] User reputation system based on bet record
- [ ] Verified sharp bettor badges
- [ ] Tipping and premium content
- [ ] Fantasy sports integration
- [ ] AI-powered bet suggestions and analytics

### V6 — Mobile
- [ ] React Native app (shared business logic)
- [ ] Push notifications
- [ ] Widget for home screen scores
---

## API Integration Architecture

```
┌─────────────────────────────────────────────────┐
│                   FanZone App                    │
│         Next.js App Router + React               │
├─────────────────────────────────────────────────┤
│              API Layer (Route Handlers)           │
│    /api/scores  /api/bets  /api/contracts        │
├──────────┬──────────┬──────────┬────────────────┤
│ ESPN API │ Kalshi   │ DraftKings│ FanDuel       │
│ Sports   │ Event    │ Sportsbook│ Sportsbook    │
│ Radar    │ Contracts│ API       │ API           │
└──────────┴──────────┴──────────┴────────────────┘
```

Each external integration follows the adapter pattern:
1. `src/lib/integrations/<provider>/client.ts` — API client
2. `src/lib/integrations/<provider>/types.ts` — Provider-specific types
3. `src/lib/integrations/<provider>/adapter.ts` — Maps provider data → FanZone types

This ensures any provider can be swapped without touching UI code.
