import Link from "next/link";
import { Calendar, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PostMeta } from "@/lib/types";

interface PostCardProps {
  post: PostMeta;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article
        className={`relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-card hover:shadow-lg hover:shadow-blue-500/5 ${
          featured ? "sm:p-8" : ""
        }`}
      >
        {/* Gradient accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Categories */}
        <div className="mb-3 flex flex-wrap gap-2">
          {post.categories.map((cat) => (
            <Badge
              key={cat}
              variant="secondary"
              className="text-xs font-medium"
            >
              {cat}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h2
          className={`font-bold leading-tight tracking-tight transition-colors group-hover:text-blue-500 ${
            featured ? "text-xl sm:text-2xl" : "text-lg"
          }`}
        >
          {post.title}
        </h2>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {post.description}
        </p>

        {/* Meta */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime}분 소요
          </span>
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {post.author}
          </span>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 4 && (
              <span className="rounded-md px-2 py-0.5 text-xs text-muted-foreground">
                +{post.tags.length - 4}
              </span>
            )}
          </div>
        )}
      </article>
    </Link>
  );
}
