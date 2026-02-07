import { Hero } from "@/components/hero";
import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/posts";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 6);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Latest Posts
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              최신 기술 트렌드와 인사이트
            </p>
          </div>
          <Button asChild variant="ghost" className="group gap-1">
            <Link href="/blog">
              View all
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {latestPosts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border/50 py-20 text-center">
            <p className="text-muted-foreground">No posts yet. Stay tuned!</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {latestPosts.map((post, i) => (
              <PostCard key={post.slug} post={post} featured={i === 0} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
