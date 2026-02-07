import { getAllPosts, getAllTags } from "@/lib/posts";
import { BlogClient } from "./blog-client";

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return <BlogClient posts={posts} tags={tags} />;
}
