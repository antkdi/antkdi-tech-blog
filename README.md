# Kevin's Tech Blog

A premium blog built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui. Deployed on GitHub Pages.

**Live:** https://antkdi.github.io

## Features

- Dark/light theme toggle
- Animated gradient hero section
- Card-based post layout with hover effects
- Client-side search and tag filtering
- Reading time indicator
- Table of contents for posts
- Related posts sidebar
- Dynamic Open Graph / Twitter Card metadata
- Mobile-first responsive design
- Markdown/HTML post rendering

## Tech Stack

- **Framework:** Next.js 15+ (App Router, Static Export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Icons:** Lucide React
- **Markdown:** gray-matter, remark, remark-html
- **Deployment:** GitHub Pages via GitHub Actions

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npx serve out
```

## Adding Blog Posts

Place `.md` files in `content/posts/` with frontmatter:

```yaml
---
title: "Post Title"
date: 2026-02-07 12:00:00 +0900
categories: [Tech, AI]
tags: ['tag1', 'tag2']
author: Author Name
description: "Post description"
---

Your content here (markdown or HTML)
```

## Syncing from daily-blog-automation

```bash
./sync-posts.sh
```

This copies new posts from `../daily-blog-automation/output/posts/`.

## Deployment

Pushes to `main` automatically trigger GitHub Actions to build and deploy to GitHub Pages.

## Project Structure

```
app/
  layout.tsx          # Root layout with nav, footer, theme
  page.tsx            # Home page with hero + latest posts
  blog/
    page.tsx          # Blog listing with search/filter
    [slug]/page.tsx   # Individual post page
  about/page.tsx      # About page
components/
  navigation.tsx      # Responsive navigation bar
  hero.tsx            # Animated hero section
  post-card.tsx       # Blog post card
  search-bar.tsx      # Search input
  tag-filter.tsx      # Tag filter badges
  table-of-contents.tsx
  related-posts.tsx
  theme-provider.tsx  # Dark/light theme context
  theme-toggle.tsx    # Theme toggle button
  footer.tsx
  ui/                 # shadcn/ui components
lib/
  posts.ts            # Markdown processing & post queries
  types.ts            # TypeScript interfaces
content/
  posts/              # Markdown blog posts
```
