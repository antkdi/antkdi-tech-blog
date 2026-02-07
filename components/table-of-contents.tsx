"use client";

import { List } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TOCItem } from "@/lib/types";

interface TableOfContentsProps {
  content: string;
}

function extractHeadings(html: string): TOCItem[] {
  const headingRegex = /<h([2-3])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[2-3]>/gi;
  const headings: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]*>/g, ""),
    });
  }

  // If no headings with IDs, try to extract without IDs
  if (headings.length === 0) {
    const simpleRegex = /<h([2-3])[^>]*>(.*?)<\/h[2-3]>/gi;
    while ((match = simpleRegex.exec(html)) !== null) {
      const text = match[2].replace(/<[^>]*>/g, "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9가-힣\s-]/g, "")
        .replace(/\s+/g, "-");
      headings.push({
        level: parseInt(match[1]),
        id,
        text,
      });
    }
  }

  return headings;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const headings = extractHeadings(content);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <List className="h-4 w-4 text-blue-500" />
        Table of Contents
      </div>
      <ul className="space-y-1.5">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
          >
            <a
              href={`#${heading.id}`}
              className={cn(
                "block rounded-md px-2 py-1 text-xs transition-colors",
                activeId === heading.id
                  ? "bg-blue-500/10 text-blue-500"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
