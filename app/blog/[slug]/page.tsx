import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableOfContents } from "@/components/table-of-contents";
import { RelatedPosts } from "@/components/related-posts";
import { getPostBySlug, getAllSlugs, getRelatedPosts } from "@/lib/posts";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);
  const formattedDate = new Date(post.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      {/* Back button */}
      <Button asChild variant="ghost" size="sm" className="mb-8 gap-2">
        <Link href="/blog">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-[1fr_240px]">
        {/* Main content */}
        <div className="min-w-0">
          {/* Header */}
          <header className="mb-8">
            <div className="mb-4 flex flex-wrap gap-2">
              {post.categories.map((cat) => (
                <Badge key={cat} variant="secondary">
                  {cat}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              {post.title}
            </h1>

            {post.description && (
              <p className="mt-3 text-lg text-muted-foreground">
                {post.description}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readingTime}분 소요
              </span>
            </div>

            {post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <hr className="mb-8 border-border/50" />

          {/* Post content */}
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Post footer */}
          <div className="mt-12 border-t border-border/50 pt-8">
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-6">
            <TableOfContents content={post.content} />
            <RelatedPosts posts={relatedPosts} />
          </div>
        </aside>
      </div>
    </article>
  );
}
