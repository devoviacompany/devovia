import { getAllTutorials, getByCategory, getLatest } from "@/lib/tutorials";
import { VideoRow } from "@/components/tutorials/video-row";
import Link from "next/link";
import Image from "next/image";

export default function TutorialsHome() {
  const all = getAllTutorials();
  const featured = all[0];
  const latest = getLatest(6);
  const devops = getByCategory("DevOps", 6);
  const react = getByCategory("React", 6);

  return (
    <div className="py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-extrabold">Tutorials Library</h1>
        <p className="text-muted-foreground mt-2">
          Watch tutorials, short explainers, and developer guides. Browse all videos below.
        </p>
      </header>

      {/* Featured */}
      {featured && (
        <section className="grid md:grid-cols-[2fr_3fr] gap-6">
          <div>
            <Link href={`/tutorials/${featured.slug}`}>
              <div className="relative rounded-lg overflow-hidden border">
                <Image
                  src={featured.thumbnail}
                  alt={featured.title}
                  className="w-full h-auto object-cover"
                  width={100}
                  height={100}
                />
                <span className="absolute bottom-2 right-2 text-xs px-1.5 py-0.5 rounded bg-black/70 text-white">
                  {featured.duration}
                </span>
              </div>
            </Link>
          </div>
          <div className="flex flex-col">
            <Link
              href={`/tutorials/${featured.slug}`}
              className="text-xl font-extrabold hover:underline underline-offset-4"
            >
              {featured.title}
            </Link>
            <p className="text-muted-foreground mt-2">{featured.description}</p>
            <p className="text-xs text-muted-foreground mt-3">
              {featured.views} • {featured.publishedAt}
            </p>
          </div>
        </section>
      )}

      {/* Rows */}
      <VideoRow title="The Latest" items={latest} />
      <VideoRow title="DevOps" items={devops} />
      <VideoRow title="React & Next.js" items={[...react, ...getByCategory("Next.js", 6)]} />
    </div>
  );
}