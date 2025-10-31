import { getAllTutorials, getTutorialBySlug } from "@/lib/tutorials";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllTutorials().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(props: PageProps) {
  const { slug } = await props.params;
  const t = getTutorialBySlug(slug);
  if (!t) return {};
  return { title: t.title, description: t.description };
}

export default async function TutorialPage(props: PageProps) {
  const { slug } = await props.params;
  const t = getTutorialBySlug(slug);
  if (!t) notFound();

  const upNext = getAllTutorials().filter((x) => x.slug !== slug).slice(0, 5);

  return (
    <div className="grid lg:grid-cols-[3fr_1.4fr] gap-8 py-8">
      <div>
        <nav className="mb-4 text-sm text-muted-foreground">
          <Link className="hover:underline" href="/tutorials">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground">{t.title}</span>
        </nav>

        <h1 className="text-2xl font-extrabold mb-3">{t.title}</h1>
        <p className="text-sm text-muted-foreground mb-4">
          {t.views} • {t.publishedAt} • by {t.author}
        </p>

        <div className="relative w-full overflow-hidden rounded-lg border bg-black">
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${t.videoId}?rel=0`}
              title={t.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        <p className="text-muted-foreground mt-5">{t.description}</p>
      </div>

      <aside className="lg:sticky lg:top-20 h-max rounded-md bg-muted/40 p-3 border">
        <h3 className="text-sm font-semibold mb-3">Up next</h3>
        <div className="grid gap-3">
          {upNext.map((v) => (
            <div key={v.id} className="grid grid-cols-[120px_1fr] gap-3">
              <Link href={`/tutorials/${v.slug}`} className="block rounded-md overflow-hidden border">
                <Image
                  src={v.thumbnail}
                  alt={v.title}
                  width={120}
                  height={68}
                  className="object-cover"
                />
              </Link>
              <div>
                <Link href={`/tutorials/${v.slug}`} className="text-sm font-semibold line-clamp-2">
                  {v.title}
                </Link>
                <p className="text-xs text-muted-foreground mt-1">
                  {v.views} • {v.publishedAt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}