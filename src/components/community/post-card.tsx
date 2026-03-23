"use client";

import type { Post } from "@/lib/types";
import { timeAgo, cn } from "@/lib/utils";
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import { useState } from "react";

export function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(post.liked ?? false);
  const [likeCount, setLikeCount] = useState(post.likes);

  return (
    <div className="border-b border-border px-4 py-4 hover:bg-card-hover/50 transition-colors animate-slide-up">
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent text-sm font-bold">
          {post.author.displayName.split(" ").map(n => n[0]).join("")}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">{post.author.displayName}</span>
            <span className="text-sm text-muted">@{post.author.username}</span>
            <span className="text-sm text-muted">·</span>
            <span className="text-sm text-muted">{timeAgo(post.createdAt)}</span>
          </div>

          {/* Content */}
          <p className="mt-1 text-sm text-foreground leading-relaxed whitespace-pre-wrap">{post.content}</p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-accent hover:text-accent-hover cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="mt-3 flex items-center gap-6">
            <button className="flex items-center gap-1.5 text-muted hover:text-info transition-colors group">
              <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs">{post.comments}</span>
            </button>
            <button className={cn(
              "flex items-center gap-1.5 transition-colors group",
              post.reposted ? "text-accent" : "text-muted hover:text-accent"
            )}>
              <Repeat2 size={16} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs">{post.reposts}</span>
            </button>
            <button
              onClick={() => {
                setLiked(!liked);
                setLikeCount(liked ? likeCount - 1 : likeCount + 1);
              }}
              className={cn(
                "flex items-center gap-1.5 transition-colors group",
                liked ? "text-danger" : "text-muted hover:text-danger"
              )}
            >
              <Heart size={16} fill={liked ? "currentColor" : "none"} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs">{likeCount}</span>
            </button>
            <button className="flex items-center gap-1.5 text-muted hover:text-foreground transition-colors">
              <Share size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
