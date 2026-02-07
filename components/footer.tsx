import { Github, Rss, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-lg font-bold text-transparent">
              Kevin&apos;s Tech Blog
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              AI, 기술, 경제에 대한 인사이트를 공유합니다.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Links</h4>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-foreground">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Connect</h4>
            <div className="mt-2 flex gap-3">
              <a
                href="https://github.com/antkdi"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="/rss.xml"
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Rss className="h-4 w-4" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Kevin&apos;s Tech Blog. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
