import { components } from "./_generated/api";
import { ShardedCounter } from "@convex-dev/sharded-counter";
import type { Id } from "./_generated/dataModel";

export const counts = new ShardedCounter(components.shardedCounter, {
  defaultShards: 1,
});

export function commentCountKey(postId: Id<"post">): string {
  // Convert Id to string explicitly
  return `comments:${postId.toString()}`;
}

export function postCountKey(userId: Id<"users">): string {
  // Ensure "users" matches your data model table name; use "user" if that's the actual name
  return `post:${userId.toString()}`;
}

