"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-violet-500/5 to-transparent" />
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-violet-500/10 blur-3xl [animation-delay:1s]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-blue-500" />
            AI-Powered Tech Insights
          </div>

          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500 bg-[length:200%_auto] bg-clip-text text-transparent animate-[gradient_3s_ease_infinite]">
              Kevin&apos;s
            </span>
            <br />
            <span className="text-foreground">Tech Blog</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            AI, 기술 트렌드, 경제 분석에 대한 깊이 있는 인사이트를 공유합니다.
            <br className="hidden sm:block" />
            매일 새로운 시각으로 세상을 바라봅니다.
          </p>

          <div className="mt-8 flex gap-4">
            <Button asChild size="lg" className="group gap-2">
              <Link href="/blog">
                Read Blog
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">About Me</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
