"use client";

import { ChatPanel } from "@/components/chat/chat-panel";
import { mockCommunities } from "@/lib/mock-data";
import { getSportEmoji, formatCompactNumber, cn } from "@/lib/utils";
import { Hash, Users, Plus } from "lucide-react";
import { useState } from "react";

const channels = [
  { id: "general", name: "Game Day Thread", active: true, unread: 5 },
  { id: "nba", name: "NBA Talk", active: false, unread: 12 },
  { id: "betting", name: "Bet Discussion", active: false, unread: 0 },
  { id: "kalshi", name: "Kalshi Markets", active: false, unread: 3 },
  { id: "nfl", name: "NFL Lounge", active: false, unread: 0 },
  { id: "nhl", name: "Hockey Chat", active: false, unread: 1 },
];

export default function ChatPage() {
  const [activeChannel, setActiveChannel] = useState("general");

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Channel sidebar */}
      <div className="w-60 border-r border-border bg-card p-3 space-y-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Channels</h2>
          <button className="rounded-md p-1 text-muted hover:text-foreground hover:bg-card-hover">
            <Plus size={14} />
          </button>
        </div>

        <div className="space-y-0.5">
          {channels.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(ch.id)}
              className={cn(
                "flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm transition-colors",
                activeChannel === ch.id
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:text-foreground hover:bg-card-hover"
              )}
            >
              <div className="flex items-center gap-2">
                <Hash size={14} />
                <span>{ch.name}</span>
              </div>
              {ch.unread > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-black px-1">
                  {ch.unread}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="border-t border-border pt-3">
          <h3 className="text-xs font-semibold text-muted uppercase mb-2">Direct Messages</h3>
          <div className="space-y-1">
            {["hoopsdreams", "gridironking", "puckhead99"].map((user) => (
              <button
                key={user}
                className="flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm text-muted hover:text-foreground hover:bg-card-hover transition-colors"
              >
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span>@{user}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1">
        <ChatPanel className="h-full rounded-none border-0" />
      </div>
    </div>
  );
}
