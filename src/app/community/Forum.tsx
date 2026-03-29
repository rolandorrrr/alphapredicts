"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

interface Author {
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  subscription_tier: string;
}

interface Topic {
  id: string;
  title: string;
  body: string | null;
  tag: string | null;
  author_id: string;
  reply_count: number;
  created_at: string;
  author: Author | null;
}

interface Reply {
  id: string;
  body: string;
  author_id: string;
  created_at: string;
  author: Author | null;
}

const TAG_CONFIG: Record<string, { label: string; color: string }> = {
  high_volatility: { label: "High Volatility", color: "text-tertiary bg-tertiary/10" },
  macro: { label: "Macro Analysis", color: "text-on-surface-variant bg-surface-variant" },
  alpha_signal: { label: "Alpha Signal", color: "text-secondary bg-secondary/10" },
  general: { label: "General", color: "text-primary bg-primary/10" },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function Forum() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewTopic, setShowNewTopic] = useState(false);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [replies, setReplies] = useState<Record<string, Reply[]>>({});
  const [userId, setUserId] = useState<string | null>(null);

  // New topic form
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("general");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Reply form
  const [replyBody, setReplyBody] = useState("");
  const [replySubmitting, setReplySubmitting] = useState(false);

  const supabase = createClient();

  const fetchTopics = useCallback(async () => {
    const res = await fetch("/api/forum/topics");
    if (res.ok) {
      const data = await res.json();
      setTopics(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTopics();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserId(user?.id ?? null);
    });
  }, [fetchTopics, supabase.auth]);

  const fetchReplies = async (topicId: string) => {
    const res = await fetch(`/api/forum/replies?topic_id=${topicId}`);
    if (res.ok) {
      const data = await res.json();
      setReplies((prev) => ({ ...prev, [topicId]: data }));
    }
  };

  const handleExpand = (topicId: string) => {
    if (expandedTopic === topicId) {
      setExpandedTopic(null);
    } else {
      setExpandedTopic(topicId);
      if (!replies[topicId]) {
        fetchReplies(topicId);
      }
    }
    setReplyBody("");
  };

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const res = await fetch("/api/forum/topics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, tag }),
    });

    if (res.ok) {
      setTitle("");
      setBody("");
      setTag("general");
      setShowNewTopic(false);
      fetchTopics();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to create topic");
    }
    setSubmitting(false);
  };

  const handleCreateReply = async (topicId: string) => {
    if (!replyBody.trim()) return;
    setReplySubmitting(true);

    const res = await fetch("/api/forum/replies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic_id: topicId, body: replyBody }),
    });

    if (res.ok) {
      setReplyBody("");
      fetchReplies(topicId);
      fetchTopics(); // refresh reply counts
    }
    setReplySubmitting(false);
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-outline-variant/15 pb-4">
        <h2 className="text-xl font-bold tracking-tight text-primary uppercase">Forum</h2>
        {userId ? (
          <button
            onClick={() => setShowNewTopic(!showNewTopic)}
            className="text-xs font-bold uppercase tracking-widest px-4 py-2 bg-tertiary text-on-tertiary hover:scale-105 transition-transform"
          >
            {showNewTopic ? "Cancel" : "+ New Topic"}
          </button>
        ) : (
          <a
            href="/auth"
            className="text-xs font-bold uppercase tracking-widest px-4 py-2 border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            Log in to Post
          </a>
        )}
      </div>

      {/* New Topic Form */}
      {showNewTopic && (
        <form onSubmit={handleCreateTopic} className="bg-surface-container-low p-6 space-y-4 border-l-4 border-tertiary">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              placeholder="What's on your mind?"
              className="w-full bg-surface-container-lowest border-none text-sm px-4 py-3 text-on-surface focus:ring-1 focus:ring-secondary"
              required
            />
            <div className="text-[10px] text-on-surface-variant mt-1 text-right">{title.length}/100</div>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-1">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={300}
              rows={3}
              placeholder="Share your analysis or question (max 300 characters)"
              className="w-full bg-surface-container-lowest border-none text-sm px-4 py-3 text-on-surface focus:ring-1 focus:ring-secondary resize-none"
              required
            />
            <div className="text-[10px] text-on-surface-variant mt-1 text-right">{body.length}/300</div>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-1">Tag</label>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="bg-surface-container-lowest border-none text-sm px-4 py-3 text-on-surface focus:ring-1 focus:ring-secondary"
            >
              <option value="general">General</option>
              <option value="high_volatility">High Volatility</option>
              <option value="macro">Macro Analysis</option>
              <option value="alpha_signal">Alpha Signal</option>
            </select>
          </div>
          {error && <p className="text-error text-xs font-bold uppercase tracking-widest">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 bg-primary text-on-primary font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50"
          >
            {submitting ? "Posting..." : "Post Topic"}
          </button>
        </form>
      )}

      {/* Topics List */}
      {loading ? (
        <div className="text-center py-12">
          <span className="text-on-surface-variant text-sm uppercase tracking-widest">Loading topics...</span>
        </div>
      ) : topics.length === 0 ? (
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 block mb-4">forum</span>
          <p className="text-on-surface-variant text-sm uppercase tracking-widest">No topics yet. Start the conversation.</p>
        </div>
      ) : (
        <div className="grid gap-1">
          {topics.map((topic) => {
            const tagCfg = TAG_CONFIG[topic.tag || "general"] || TAG_CONFIG.general;
            const isExpanded = expandedTopic === topic.id;
            const topicReplies = replies[topic.id] || [];
            const authorName = topic.author?.display_name || topic.author?.username || "Unknown";

            return (
              <div key={topic.id}>
                {/* Topic Card */}
                <div
                  className={`bg-surface-container-low p-6 cursor-pointer hover:bg-surface-container-high transition-all duration-300 ${isExpanded ? "border-l-4 border-tertiary" : ""}`}
                  onClick={() => handleExpand(topic.id)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-[10px] font-bold tracking-[0.2em] uppercase px-2 py-1 ${tagCfg.color}`}>
                      {tagCfg.label}
                    </span>
                    <span className="text-xs text-on-surface-variant">{timeAgo(topic.created_at)}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary">{topic.title}</h3>
                  {topic.body && (
                    <p className="text-sm text-on-surface-variant mb-3">{topic.body}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-on-surface-variant">
                        by <span className="font-bold text-on-surface">@{topic.author?.username || "unknown"}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-on-surface-variant">forum</span>
                      <span className="text-xs text-on-surface-variant font-bold">{topic.reply_count || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Expanded: Replies */}
                {isExpanded && (
                  <div className="bg-surface-container-lowest border-l-4 border-tertiary/30">
                    {/* Replies */}
                    {topicReplies.length > 0 ? (
                      <div className="divide-y divide-outline-variant/10">
                        {topicReplies.map((reply) => (
                          <div key={reply.id} className="px-6 py-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold text-on-surface">
                                @{reply.author?.username || "unknown"}
                              </span>
                              <span className="text-[10px] text-on-surface-variant">{timeAgo(reply.created_at)}</span>
                            </div>
                            <p className="text-sm text-on-surface-variant">{reply.body}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="px-6 py-4 text-xs text-on-surface-variant uppercase tracking-widest">
                        No replies yet.
                      </div>
                    )}

                    {/* Reply Form */}
                    {userId ? (
                      <div className="px-6 py-4 border-t border-outline-variant/10 flex gap-3">
                        <input
                          value={replyBody}
                          onChange={(e) => setReplyBody(e.target.value)}
                          maxLength={300}
                          placeholder="Write a reply (max 300 characters)..."
                          className="flex-1 bg-surface-container border-none text-sm px-4 py-2 text-on-surface focus:ring-1 focus:ring-secondary"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleCreateReply(topic.id);
                            }
                          }}
                        />
                        <button
                          onClick={() => handleCreateReply(topic.id)}
                          disabled={replySubmitting || !replyBody.trim()}
                          className="px-4 py-2 bg-primary text-on-primary font-bold text-[10px] uppercase tracking-widest disabled:opacity-30 hover:bg-white transition-colors"
                        >
                          {replySubmitting ? "..." : "Reply"}
                        </button>
                      </div>
                    ) : (
                      <div className="px-6 py-4 border-t border-outline-variant/10 text-xs text-on-surface-variant">
                        <a href="/auth" className="text-tertiary hover:underline font-bold uppercase tracking-widest">Log in</a> to reply
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
