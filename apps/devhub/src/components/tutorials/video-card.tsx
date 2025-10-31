import Link from "next/link";
import { Tutorial } from "@/types/api/tutorials/tutorials.type";
import Image from "next/image";

export function VideoCard({ t }: { t: Tutorial }) {
  return (
    <Link
      href={`/tutorials/${t.slug}`}
      className="group block rounded-lg overflow-hidden border bg-card hover:bg-muted/40 transition-colors"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={t.thumbnail}
          alt={t.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
          width={100}
          height={100}
        />
        <span className="absolute bottom-1.5 right-1.5 text-xs px-1.5 py-0.5 rounded bg-black/70 text-white">
          {t.duration}
        </span>
      </div>
      <div className="p-3">
        <h3 className="text-[15px] font-semibold line-clamp-2 mb-1">{t.title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {t.views} • {t.publishedAt}
        </p>
      </div>
    </Link>
  );
}