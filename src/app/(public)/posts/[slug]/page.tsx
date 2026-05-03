import { getReader } from "@/lib/reader";
import React from "react";
import Image from "next/image";
import Markdoc from "@markdoc/markdoc";
import Link from "next/link";
import { Container } from "@/components/layout-components";
import { MarkdocRenderer } from "@/components/markdoc-renderer";
import { format } from "date-fns";
import { markdocTags, markdocNodes } from "@/components/custom-components";

export async function generateStaticParams() {
  const reader = await getReader();
  const posts = await reader.collections.posts.list();
  return posts.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const reader = await getReader();
  const details = await reader.singletons.details.read().catch(() => null);
  const post = await reader.collections.posts.read(slug);
  const allPosts = await reader.collections.posts.all();

  if (!post) {
    return (
      <main className="flex-grow">
        <Container>
          <h1 className="font-headline-xl text-headline-xl uppercase">
            Entry Not Found
          </h1>
          <Link
            href="/posts"
            className="font-technical-sm text-technical-sm mt-8 inline-block uppercase hover:underline"
          >
            ← Return to Ledger
          </Link>
        </Container>
      </main>
    );
  }

  const { node } = await post.content();
  const renderable = Markdoc.transform(node, {
    tags: markdocTags,
    nodes: markdocNodes,
  });

  // Sort posts by date descending and take the most recent 3 (excluding current)
  const recentPosts = [...allPosts]
    .sort(
      (a, b) =>
        new Date(b.entry.publishedDate || 0).getTime() -
        new Date(a.entry.publishedDate || 0).getTime()
    )
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-grow flex-col items-center px-6 pb-32">
      {/* Unified Header */}
      <header className="border-primary mb-12 flex w-full flex-col border-b-2 py-12 pb-12">
        <div className="gap-unit flex flex-col">
          <span className="font-technical-sm text-technical-sm text-secondary uppercase">
            ENTRY NO. {slug.slice(0, 3).toUpperCase()}{" "}
            <span className="opacity-50">/</span>/ SYSTEM LOG
          </span>
          <h1 className="font-headline-xl md:text-headline-xl border-primary border-l-4 pl-4 text-3xl leading-tight uppercase">
            {post.title}
          </h1>
          <div className="font-mono-data text-mono-data text-secondary mt-4 flex flex-wrap items-center gap-4 uppercase">
            {post.category && (
              <span className="bg-primary text-canvas px-2 text-[10px] leading-6">
                CAT: {post.category.toUpperCase()}
              </span>
            )}
            <span>
              DATE:{" "}
              {post.publishedDate
                ? format(new Date(post.publishedDate), "yyyy-MM-dd")
                : "----.--.--"}
            </span>
            <span>
              AUTHOR: {details?.name?.toUpperCase() || "SYSTEM ADMIN"}
            </span>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <div className="gap-gutter grid w-full grid-cols-1 md:grid-cols-12">
        {/* Image - Row 1 Right on Desktop, Order 1 on Mobile */}
        {post.image && (
          <div className="order-1 md:col-span-9 md:col-start-4 md:row-start-1">
            <div className="border-primary bg-surface-card mb-8 border-2 p-2">
              <div className="bg-surface-dim relative flex h-[400px] w-full items-center justify-center overflow-hidden">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  className="object-cover contrast-125 grayscale"
                />
              </div>
            </div>
          </div>
        )}

        {/* Sidebar - Row 1&2 Left on Desktop, Order 2 on Mobile */}
        <aside
          className={`order-2 flex flex-col gap-6 md:col-span-3 md:col-start-1 md:row-span-2 ${
            post.image ? "md:row-start-1" : "md:row-start-1"
          }`}
        >
          <div className="border-primary bg-surface-card border-2 p-4">
            <h3 className="font-technical-sm text-technical-sm border-primary mb-4 border-b-2 pb-2 uppercase">
              SPECIFICATIONS
            </h3>
            <ul className="font-mono-data text-mono-data flex flex-col gap-2">
              <li className="border-primary flex justify-between border-b border-dashed pb-1">
                <span>CATEGORY</span>
                <span className="text-right">
                  {post.category.toUpperCase()}
                </span>
              </li>
              <li className="border-primary flex justify-between border-b border-dashed pb-1">
                <span>VERSION</span>
                <span>1.0</span>
              </li>
              {post.tags && post.tags.length > 0 && (
                <li className="flex flex-col gap-1 pt-2">
                  <span className="text-[10px] opacity-60">TAGS:</span>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-primary text-canvas px-1 text-[10px]"
                      >
                        {tag.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </li>
              )}
            </ul>
          </div>

          {post.summary && (
            <div className="border-primary bg-surface-muted border-2 p-4">
              <h3 className="font-technical-sm mb-2 text-[10px] font-bold uppercase opacity-60">
                EXECUTIVE SUMMARY
              </h3>
              <p className="font-mono-data text-xs leading-tight uppercase opacity-80">
                {post.summary}
              </p>
            </div>
          )}
        </aside>

        {/* Markdown Content - Row 2 Right on Desktop, Order 3 on Mobile */}
        <div
          className={`order-3 md:col-span-9 md:col-start-4 ${
            post.image ? "md:row-start-2" : "md:row-start-1"
          }`}
        >
          <div className="prose-container bg-canvas border-primary border-2 p-8">
            <MarkdocRenderer content={renderable} />
          </div>
        </div>
      </div>

      {/* Recent Posts Section */}
      <section className="mt-24 w-full">
        <div className="border-primary mb-6 flex items-end justify-between border-b-2 pb-2">
          <h2 className="font-headline-lg md:text-headline-lg text-2xl uppercase">
            RECENT POSTS
          </h2>
          <Link
            href="/posts"
            className="font-technical-sm md:text-technical-sm border-primary hover:bg-primary hover:text-canvas flex items-center gap-1 border-2 px-3 py-1 text-[10px] uppercase transition-none"
          >
            VIEW ALL <span>→</span>
          </Link>
        </div>

        <div className="border-primary overflow-x-auto border-2">
          <table className="font-technical-sm w-full border-collapse text-left text-[10px] uppercase md:text-xs">
            <thead className="bg-surface-muted border-primary border-b-2">
              <tr>
                <th className="border-primary border-r-2 p-3">ID</th>
                <th className="p-3">TOPIC</th>
                <th className="border-primary border-l-2 p-3 text-right">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody className="divide-primary/20 divide-y">
              {recentPosts.map((p) => (
                <tr
                  key={p.slug}
                  className="group hover:bg-primary hover:text-canvas cursor-pointer transition-none"
                >
                  <td className="border-primary font-mono-data border-r-2 p-0">
                    <Link href={`/posts/${p.slug}`} className="block p-3">
                      #{p.slug.slice(0, 3).toUpperCase()}
                    </Link>
                  </td>
                  <td className="p-0 uppercase">
                    <Link
                      href={`/posts/${p.slug}`}
                      className="block p-3 font-bold"
                    >
                      {p.entry.title}
                    </Link>
                  </td>
                  <td className="border-primary border-l-2 p-0 text-right">
                    <Link href={`/posts/${p.slug}`} className="block p-3">
                      SIGNED
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
