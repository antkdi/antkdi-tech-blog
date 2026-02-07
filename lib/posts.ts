import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { Post, PostMeta } from "./types";

const postsDirectory = path.join(process.cwd(), "content/posts");

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const koreanCharsPerMinute = 500;
  const koreanChars = (content.match(/[\u3131-\uD79D]/g) || []).length;
  const words = content
    .replace(/[\u3131-\uD79D]/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
  const time = Math.ceil(koreanChars / koreanCharsPerMinute + words / wordsPerMinute);
  return Math.max(1, time);
}

function slugify(filename: string): string {
  return filename
    .replace(/\.md$/, "")
    .replace(/[^a-zA-Z0-9가-힣\-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));

  const posts: PostMeta[] = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const categories = Array.isArray(data.categories)
      ? data.categories
      : typeof data.categories === "string"
        ? [data.categories]
        : [];

    const tags = Array.isArray(data.tags)
      ? data.tags
      : typeof data.tags === "string"
        ? [data.tags]
        : [];

    return {
      slug: slugify(filename),
      title: data.title || filename.replace(/\.md$/, ""),
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      categories,
      tags,
      author: data.author || "Kevin",
      description: data.description || "",
      readingTime: calculateReadingTime(content),
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const catSet = new Set<string>();
  posts.forEach((post) => post.categories.forEach((cat) => catSet.add(cat)));
  return Array.from(catSet).sort();
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!fs.existsSync(postsDirectory)) {
    return null;
  }

  const filenames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
  const filename = filenames.find((f) => slugify(f) === slug);

  if (!filename) {
    return null;
  }

  const filePath = path.join(postsDirectory, filename);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  // Check if content is already HTML
  const isHtml = content.trim().startsWith("<");
  let htmlContent: string;

  if (isHtml) {
    htmlContent = content;
  } else {
    const processedContent = await remark().use(html).process(content);
    htmlContent = processedContent.toString();
  }

  const categories = Array.isArray(data.categories)
    ? data.categories
    : typeof data.categories === "string"
      ? [data.categories]
      : [];

  const tags = Array.isArray(data.tags)
    ? data.tags
    : typeof data.tags === "string"
      ? [data.tags]
      : [];

  return {
    slug,
    title: data.title || filename.replace(/\.md$/, ""),
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    categories,
    tags,
    author: data.author || "Kevin",
    description: data.description || "",
    content: htmlContent,
    readingTime: calculateReadingTime(content),
  };
}

export function getRelatedPosts(currentSlug: string, limit = 3): PostMeta[] {
  const allPosts = getAllPosts();
  const currentPost = allPosts.find((p) => p.slug === currentSlug);
  if (!currentPost) return allPosts.filter((p) => p.slug !== currentSlug).slice(0, limit);

  const scored = allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((post) => {
      let score = 0;
      post.tags.forEach((tag) => {
        if (currentPost.tags.includes(tag)) score += 2;
      });
      post.categories.forEach((cat) => {
        if (currentPost.categories.includes(cat)) score += 3;
      });
      if (post.author === currentPost.author) score += 1;
      return { post, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.post);
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => slugify(f));
}
