"use client";

import { Tutorial } from "@/types/api/tutorials/tutorials.type";
import { VideoCard } from "./video-card";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRef } from "react";

export function VideoRow({ title, items }: { title: string; items: Tutorial[] }) {
  const scroller = useRef<HTMLDivElement>(null);

  function scrollBy(dx: number) {
    scroller.current?.scrollBy({ left: dx, behavior: "smooth" });
  }

  return (
    <section className="mt-7">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold">{title}</h2>
        <div className="hidden md:flex items-center gap-1">
          <button
            className="h-7 w-7 flex items-center justify-center rounded-md border hover:bg-muted"
            onClick={() => scrollBy(-300)}
            aria-label="Prev"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            className="h-7 w-7 flex items-center justify-center rounded-md border hover:bg-muted"
            onClick={() => scrollBy(300)}
            aria-label="Next"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div
        ref={scroller}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar pr-1"
      >
        {items.map((t) => (
          <div key={t.id} className="min-w-[280px] max-w-[320px] snap-start">
            <VideoCard t={t} />
          </div>
        ))}
      </div>
    </section>
  );
}