import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PostMeta } from "@/lib/types";

interface RelatedPostsProps {
  posts: PostMeta[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <h3 className="mb-3 text-sm font-semibold">Related Posts</h3>
      <div className="space-y-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-lg p-2 transition-colors hover:bg-accent"
          >
            <h4 className="line-clamp-2 text-xs font-medium transition-colors group-hover:text-blue-500">
              {post.title}
            </h4>
            <div className="mt-1 flex items-center gap-1.5">
              {post.categories.slice(0, 1).map((cat) => (
                <Badge key={cat} variant="secondary" className="h-4 text-[10px]">
                  {cat}
                </Badge>
              ))}
              <ArrowRight className="ml-auto h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
