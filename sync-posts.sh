#!/bin/bash
# Sync posts from daily-blog-automation to blog content directory

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
POSTS_SOURCE="${SCRIPT_DIR}/../daily-blog-automation/output/posts"
POSTS_DEST="${SCRIPT_DIR}/content/posts"

# Create destination directory if it doesn't exist
mkdir -p "$POSTS_DEST"

if [ -d "$POSTS_SOURCE" ]; then
    # Count new files
    new_count=0
    for file in "$POSTS_SOURCE"/*.md; do
        [ -f "$file" ] || continue
        basename="$(basename "$file")"
        if [ ! -f "$POSTS_DEST/$basename" ]; then
            cp "$file" "$POSTS_DEST/$basename"
            new_count=$((new_count + 1))
            echo "  + $basename"
        fi
    done

    total=$(ls "$POSTS_DEST"/*.md 2>/dev/null | wc -l)
    echo "Synced $new_count new posts. Total: $total posts."
else
    echo "Source directory not found: $POSTS_SOURCE"
    echo "Skipping sync."
fi
