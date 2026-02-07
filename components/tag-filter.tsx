"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onSelect: (tag: string | null) => void;
}

export function TagFilter({ tags, selectedTag, onSelect }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant={selectedTag === null ? "default" : "outline"}
        className={cn(
          "cursor-pointer transition-all duration-200 hover:scale-105",
          selectedTag === null && "bg-blue-500 hover:bg-blue-600"
        )}
        onClick={() => onSelect(null)}
      >
        All
      </Badge>
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant={selectedTag === tag ? "default" : "outline"}
          className={cn(
            "cursor-pointer transition-all duration-200 hover:scale-105",
            selectedTag === tag && "bg-blue-500 hover:bg-blue-600"
          )}
          onClick={() => onSelect(selectedTag === tag ? null : tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
