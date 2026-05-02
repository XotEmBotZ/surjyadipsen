import { getReader } from "@/lib/reader";
import React from "react";
import Image from "next/image";
import Markdoc from "@markdoc/markdoc";
import Link from "next/link";
import { Container } from "@/components/layout-components";
import { MarkdocRenderer } from "@/components/markdoc-renderer";
import { format } from "date-fns";
import { markdocTags } from "@/components/custom-components";
import {
  LedgerTable,
  LedgerTableHead,
  LedgerTableBody,
  LedgerTableRow,
} from "@/components/ledger-table";

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
  const renderable = Markdoc.transform(node, { tags: markdocTags });

  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main className="mx-auto flex w-full max-w-full flex-grow flex-col items-center pb-32">
      {/* Desktop Version */}
      <div className="hidden w-full max-w-6xl flex-col items-center px-6 py-12 md:flex">
        <article className="gap-entry-gap border-primary mb-16 flex w-full flex-col border-b-2 pb-16">
          <div className="gap-unit flex flex-col">
            <span className="font-technical-sm text-technical-sm text-secondary uppercase">
              ENTRY NO. {slug.slice(0, 3).toUpperCase()}{" "}
              <span className="opacity-50">/</span>/ SYSTEM LOG
            </span>
            <h1 className="font-headline-xl text-headline-xl border-primary border-l-4 pl-4 uppercase">
              {post.title}
            </h1>
            <div className="font-mono-data text-mono-data text-secondary mt-4 flex gap-4 uppercase">
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

          <div className="border-primary bg-surface-card relative w-full border-2 p-2">
            <div className="bg-surface-dim relative flex h-[400px] w-full items-center justify-center overflow-hidden">
              {post.image ? (
                <Image
                  src={post.image}
                  alt=""
                  fill
                  className="object-cover contrast-125 grayscale"
                />
              ) : (
                <div className="text-6xl font-black uppercase opacity-10 grayscale">
                  PLATE 01
                </div>
              )}
            </div>
            <div className="bg-canvas border-primary font-technical-sm text-technical-sm absolute right-4 bottom-4 border-2 px-3 py-1 uppercase">
              {post.category
                ? `CAT: ${post.category.toUpperCase()}`
                : "FIG. 1: STRUCTURAL CONTRAST"}
            </div>
          </div>

          <div className="gap-gutter mt-8 grid grid-cols-1 md:grid-cols-12">
            <aside className="col-span-1 flex flex-col gap-6 md:col-span-3">
              <div className="border-primary bg-surface-card border-2 p-4">
                <h3 className="font-technical-sm text-technical-sm border-primary mb-4 border-b-2 pb-2 uppercase">
                  SPECIFICATIONS
                </h3>
                <ul className="font-mono-data text-mono-data flex flex-col gap-2">
                  <li className="border-primary flex justify-between border-b border-dashed pb-1">
                    <span>CATEGORY</span>
                    <span>{post.category.toUpperCase()}</span>
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

            <div className="col-span-1 md:col-span-9">
              <div className="prose-container bg-canvas border-primary border-2 p-8">
                <MarkdocRenderer content={renderable} />
              </div>

              <div className="border-primary bg-surface-card mt-12 flex items-center gap-4 border-2 p-4">
                <span className="text-4xl font-black">!</span>
                <div>
                  <span className="font-technical-sm text-technical-sm mb-1 block font-bold uppercase">
                    CRITICAL DIRECTIVE
                  </span>
                  <p className="font-mono-data text-mono-data text-xs uppercase">
                    Avoid all easing. Use linear curves. The interface must feel
                    rigid and highly responsive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Entries Desktop */}
        <section className="w-full">
          <div className="border-primary mb-4 flex items-end justify-between border-b-2 pb-2">
            <h2 className="font-headline-lg text-headline-lg uppercase">
              RELATED ENTRIES
            </h2>
            <Link
              href="/posts"
              className="font-technical-sm text-technical-sm border-primary hover:bg-primary hover:text-canvas flex items-center gap-1 border-2 px-3 py-1 uppercase transition-none"
            >
              VIEW ALL <span>→</span>
            </Link>
          </div>
          <LedgerTable>
            <LedgerTableHead>
              <th className="border-primary font-technical-sm w-24 border-r p-4">
                ID
              </th>
              <th className="border-primary font-technical-sm border-r p-4">
                TITLE
              </th>
              <th className="border-primary font-technical-sm hidden w-32 border-r p-4 sm:table-cell">
                DATE
              </th>
              <th className="font-technical-sm w-24 p-4 text-center">ACTION</th>
            </LedgerTableHead>
            <LedgerTableBody>
              {relatedPosts.map((p, i) => (
                <LedgerTableRow key={p.slug}>
                  <td className="border-primary font-mono-data border-r p-4">
                    {(allPosts.length - i).toString().padStart(3, "0")}
                  </td>
                  <td className="border-primary font-technical-sm border-r p-4 font-bold uppercase group-hover:underline">
                    <Link href={`/posts/${p.slug}`}>{p.entry.title}</Link>
                  </td>
                  <td className="border-primary font-mono-data text-secondary hidden border-r p-4 sm:table-cell">
                    {p.entry.publishedDate
                      ? format(new Date(p.entry.publishedDate), "yyyy-MM-dd")
                      : "----.--.--"}
                  </td>
                  <td className="p-4 text-center">
                    <span>→</span>
                  </td>
                </LedgerTableRow>
              ))}
            </LedgerTableBody>
          </LedgerTable>
        </section>
      </div>

      {/* Mobile Version - MORPHED FROM DESIGN GUIDE */}
      <div className="w-full md:hidden">
        {/* Entry Header */}
        <section className="border-primary bg-canvas border-b-2 px-6 py-8">
          <div className="flex flex-col gap-2">
            <span className="font-technical-sm text-technical-sm text-primary tracking-widest uppercase opacity-60">
              Entry No. {slug.slice(0, 3).toUpperCase()}-Alpha
            </span>
            <h1 className="font-headline-xl text-3xl leading-tight uppercase">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="border-primary font-technical-sm bg-primary text-canvas border-2 px-3 py-1 text-[10px] uppercase">
                {post.category.toUpperCase()}
              </span>
            </div>
          </div>
        </section>

        {/* Technical Specifications Block */}
        <section className="border-primary bg-surface-card grid grid-cols-1 border-b-2">
          <div className="border-primary border-b-2 p-6">
            <h2 className="font-technical-sm mb-4 flex items-center gap-2 text-xs font-bold uppercase">
              <span className="font-black">⚲</span> CORE DATA METRICS
            </h2>
            <div className="space-y-4">
              {[
                { label: "Category", value: post.category.toUpperCase() },
                { label: "Version", value: "1.0" },
              ].map((m, i) => (
                <div
                  key={i}
                  className="border-primary/20 flex items-end justify-between border-b pb-1"
                >
                  <span className="font-technical-sm text-[10px] uppercase opacity-60">
                    {m.label}
                  </span>
                  <span className="font-mono-data text-sm font-bold">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6">
            <h2 className="font-technical-sm mb-4 flex items-center gap-2 text-xs font-bold uppercase">
              <span className="font-black">⚲</span> VISUAL ASSET
            </h2>
            <div className="bg-canvas border-primary relative mb-4 flex aspect-square items-center justify-center overflow-hidden border-2">
              {post.image ? (
                <Image
                  src={post.image}
                  alt=""
                  fill
                  className="object-cover contrast-125 grayscale"
                />
              ) : (
                <div className="bg-surface-dim flex h-full w-full items-center justify-center text-2xl font-black uppercase opacity-10">
                  IMAGE NULL
                </div>
              )}
              <div className="border-primary pointer-events-none absolute inset-0 flex items-center justify-center border-2">
                <div className="border-primary h-8 w-8 animate-ping rounded-full border-2"></div>
                <div className="bg-primary h-2 w-2 rounded-full"></div>
              </div>
            </div>
            <div className="font-mono-data text-[10px] uppercase">
              DATE:{" "}
              {post.publishedDate
                ? format(new Date(post.publishedDate), "yyyy.MM.dd")
                : "----.--.--"}
            </div>
          </div>
        </section>

        {/* Executive Summary Mobile */}
        {post.summary && (
          <section className="border-primary border-b-2 p-6">
            <div className="bg-surface-muted border-primary border-2 p-4">
              <h3 className="font-technical-sm mb-2 text-[10px] font-bold uppercase opacity-60">
                EXECUTIVE SUMMARY
              </h3>
              <p className="font-mono-data text-xs leading-tight uppercase opacity-80">
                {post.summary}
              </p>
            </div>
          </section>
        )}

        {/* Critical Directive Warning */}
        <section className="border-primary border-b-2 p-6">
          <div className="bg-primary text-canvas border-primary relative overflow-hidden border-4 p-6">
            <div className="absolute top-0 right-0 p-2 opacity-20">
              <span className="text-6xl font-black">!</span>
            </div>
            <h3 className="font-headline-lg mb-2 text-xl uppercase">
              Critical Directive
            </h3>
            <p className="font-body-md text-xs leading-relaxed tracking-tight uppercase opacity-90">
              The interface must maintain structural integrity under all
              viewport conditions. Avoid soft edges. Use pure monochromatic
              values for maximum technical clarity.
            </p>
          </div>
        </section>

        {/* Main Content Mobile */}
        <section className="space-y-8 px-6 py-8">
          <MarkdocRenderer content={renderable} />

          {/* Cross-Referenced Entries Mobile */}
          <div className="mt-12">
            <h3 className="font-technical-sm mb-4 text-xs font-bold uppercase">
              Cross-Referenced Entries
            </h3>
            <div className="border-primary overflow-x-auto border-2">
              <table className="font-technical-sm w-full border-collapse text-left text-[10px] uppercase">
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
                  {relatedPosts.map((p, i) => (
                    <tr
                      key={i}
                      className="hover:bg-primary hover:text-canvas transition-none"
                    >
                      <td className="border-primary font-mono-data border-r-2 p-3">
                        #{slug.slice(0, 3).toUpperCase()}
                      </td>
                      <td className="p-3 uppercase">
                        <Link href={`/posts/${p.slug}`} className="block">
                          {p.entry.title}
                        </Link>
                      </td>
                      <td className="border-primary border-l-2 p-3 text-right">
                        SIGNED
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
