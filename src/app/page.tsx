import Link from "next/link";
import {
  Tv,
  Receipt,
  TrendingUp,
  Trophy,
  Users,
  MessageCircle,
  ArrowRight,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Tv,
    title: "Live Sports",
    description: "Watch every game across NFL, NBA, NHL, MLB, Soccer, and more in one place.",
  },
  {
    icon: Trophy,
    title: "Live Scores",
    description: "Real-time scores, stats, and play-by-play across all your favorite sports.",
  },
  {
    icon: Receipt,
    title: "Bet Tracker",
    description: "Track bets and parlays across DraftKings, FanDuel, BetMGM, and more.",
  },
  {
    icon: TrendingUp,
    title: "Kalshi Trader",
    description: "Trade event contracts on sports outcomes. Buy Yes or No on any market.",
  },
  {
    icon: Users,
    title: "Communities",
    description: "Join communities, share takes, follow sharp bettors, build your crew.",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Game day threads, group chats, and DMs. Talk sports in real-time.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-black font-bold text-sm">
            FZ
          </div>
          <span className="text-lg font-bold text-foreground">FanZone</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent-hover transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-24 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent mb-6">
          <Zap size={14} />
          <span>Now in Beta — Join the waitlist</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight tracking-tight">
          Your All-in-One
          <br />
          <span className="text-accent">Sports Command Center</span>
        </h1>
        <p className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          Watch live games, track your bets across every sportsbook, trade sports
          contracts on Kalshi, follow scores in real-time, and connect with fans who
          live and breathe sports — all in one place.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-semibold text-black hover:bg-accent-hover transition-colors"
          >
            Enter FanZone
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/scores"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-base font-medium text-foreground hover:bg-card-hover transition-colors"
          >
            View Live Scores
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground text-center mb-12">
          Everything a sports fan needs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border bg-card p-6 hover:border-accent/30 hover:bg-card-hover transition-colors group"
            >
              <feature.icon
                size={24}
                className="text-accent mb-4 group-hover:scale-110 transition-transform"
              />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto rounded-2xl border border-accent/30 bg-accent/5 p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to level up your game day?
          </h2>
          <p className="text-muted mb-8">
            Join thousands of sports fans who are already using FanZone.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3 text-base font-semibold text-black hover:bg-accent-hover transition-colors"
          >
            Get Started Free
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted">
        <p>FanZone v0.1 — Built for fans, by fans.</p>
      </footer>
    </div>
  );
}
