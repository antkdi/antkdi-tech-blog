"use client";

import { useState, useMemo } from "react";
import { PostCard } from "@/components/post-card";
import { SearchBar } from "@/components/search-bar";
import { TagFilter } from "@/components/tag-filter";
import { FileText } from "lucide-react";
import type { PostMeta } from "@/lib/types";

interface BlogClientProps {
  posts: PostMeta[];
  tags: string[];
}

export function BlogClient({ posts, tags }: BlogClientProps) {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    let result = posts;

    if (search) {
      const query = search.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.tags.some((t) => t.toLowerCase().includes(query)) ||
          post.author.toLowerCase().includes(query)
      );
    }

    if (selectedTag) {
      result = result.filter((post) => post.tags.includes(selectedTag));
    }

    return result;
  }, [posts, search, selectedTag]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Blog</h1>
        <p className="mt-2 text-muted-foreground">
          All posts ({filteredPosts.length})
        </p>
      </div>

      <div className="mb-8 space-y-4">
        <SearchBar value={search} onChange={setSearch} />
        {tags.length > 0 && (
          <TagFilter
            tags={tags}
            selectedTag={selectedTag}
            onSelect={setSelectedTag}
          />
        )}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/50 py-20 text-center">
          <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground/40" />
          <p className="text-muted-foreground">
            {search || selectedTag
              ? "No matching posts found."
              : "No posts yet."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
