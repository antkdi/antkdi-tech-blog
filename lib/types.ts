export interface Post {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  tags: string[];
  author: string;
  description: string;
  content: string;
  readingTime: number;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  tags: string[];
  author: string;
  description: string;
  readingTime: number;
}

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}
