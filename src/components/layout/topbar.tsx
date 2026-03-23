"use client";

import { Bell, Search, Settings } from "lucide-react";
import { useState } from "react";

export function Topbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-6">
      <div className="flex items-center gap-4 flex-1">
        {searchOpen ? (
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <Search size={16} className="text-muted" />
            <input
              autoFocus
              type="text"
              placeholder="Search games, teams, users, markets..."
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted outline-none"
              onBlur={() => setSearchOpen(false)}
            />
          </div>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 text-muted hover:text-foreground transition-colors"
          >
            <Search size={16} />
            <span className="text-sm">Search...</span>
            <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-border px-1.5 text-[10px] text-muted">
              ⌘K
            </kbd>
          </button>
        )}
      </div>

      <div className="flex items-center gap-1">
        <button className="relative rounded-lg p-2 text-muted hover:text-foreground hover:bg-card-hover transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
        </button>
        <button className="rounded-lg p-2 text-muted hover:text-foreground hover:bg-card-hover transition-colors">
          <Settings size={18} />
        </button>
        <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent text-sm font-bold">
          MJ
        </div>
      </div>
    </header>
  );
}
