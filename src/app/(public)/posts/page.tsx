import { getReader } from "@/lib/reader";
import Link from "next/link";
import { format } from "date-fns";
import { Container, PageHeader, Section } from "@/components/layout-components";
import {
  LedgerTable,
  LedgerTableHead,
  LedgerTableBody,
  LedgerTableRow,
} from "@/components/ledger-table";

export default async function PostsPage() {
  const reader = await getReader();
  const posts = await reader.collections.posts.all();

  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = a.entry.publishedDate
      ? new Date(a.entry.publishedDate).getTime()
      : 0;
    const dateB = b.entry.publishedDate
      ? new Date(b.entry.publishedDate).getTime()
      : 0;
    return dateB - dateA;
  });

  // Get unique categories from posts for the sidebar
  const categories = Array.from(
    new Set(posts.map((p) => p.entry.category))
  ).filter(Boolean);

  return (
    <main className="flex-grow pb-32 md:pb-12">
      {/* Desktop Version */}
      <div className="hidden md:block">
        <Container>
          <PageHeader title="FIELD JOURNAL" subtitle="LATEST ENTRIES" />

          <div className="gap-gutter flex flex-col items-start lg:flex-row">
            {/* Sidebar */}
            <aside className="bg-surface-card border-primary flex w-full shrink-0 flex-col gap-8 border-2 p-6 lg:w-[320px]">
              <div className="flex flex-col gap-2">
                <label className="font-technical-sm text-technical-sm text-primary border-primary mb-2 border-b-2 pb-1 uppercase">
                  QUERY DATABASE
                </label>
                <div className="relative flex items-center">
                  <input
                    className="bg-canvas border-primary font-mono-data text-mono-data text-primary placeholder-primary/50 w-full rounded-none border-2 px-3 py-2 transition-none focus:border-l-[6px] focus:ring-0 focus:outline-none"
                    placeholder="ENTER KEYWORD..."
                    type="text"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-technical-sm text-technical-sm text-primary border-primary border-b-2 pb-1 uppercase">
                  FILTER BY TOPIC
                </h3>
                <div className="flex flex-col gap-3">
                  {categories.length > 0 ? (
                    categories.map((topic) => (
                      <label
                        key={topic}
                        className="group flex cursor-pointer items-center gap-3"
                      >
                        <input
                          className="border-primary bg-canvas checked:bg-primary checked:border-primary h-5 w-5 appearance-none rounded-none border-2 transition-none focus:ring-0 focus:ring-offset-0"
                          type="checkbox"
                        />
                        <span className="font-mono-data text-mono-data group-hover:bg-primary group-hover:text-canvas px-1 uppercase transition-none">
                          {topic}
                        </span>
                      </label>
                    ))
                  ) : (
                    <span className="font-mono-data text-xs uppercase opacity-50">
                      No categories logged.
                    </span>
                  )}
                </div>
              </div>
            </aside>

            {/* Ledger */}
            <Section className="flex-grow">
              <div className="border-primary bg-surface-card w-full border-2 p-4">
                <div className="border-primary bg-surface-dim relative h-[240px] w-full overflow-hidden border-2">
                  {posts[0]?.entry.image ? (
                    <img
                      src={posts[0].entry.image}
                      alt=""
                      className="h-full w-full object-cover grayscale"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl font-black uppercase opacity-20">
                      SYSTEM LOG
                    </div>
                  )}
                </div>
                <div className="border-primary mt-3 flex items-center justify-between border-t-2 pt-2">
                  <span className="font-mono-data text-mono-data uppercase">
                    {posts[0]
                      ? `FIG 1. ${posts[0].entry.title.toUpperCase()}`
                      : "FIG 1. STRUCTURAL INTEGRITY"}
                  </span>
                  <span className="font-technical-sm text-technical-sm bg-primary text-canvas px-2 py-0.5">
                    LATEST
                  </span>
                </div>
              </div>

              <LedgerTable>
                <LedgerTableHead>
                  <th className="font-technical-sm text-technical-sm border-primary w-24 border-r p-4 uppercase">
                    NO.
                  </th>
                  <th className="font-technical-sm text-technical-sm border-primary w-32 border-r p-4 uppercase">
                    DATE
                  </th>
                  <th className="font-technical-sm text-technical-sm border-primary border-r p-4 uppercase">
                    TOPIC / TITLE
                  </th>
                  <th className="font-technical-sm text-technical-sm w-24 p-4 text-center uppercase">
                    ACTION
                  </th>
                </LedgerTableHead>
                <LedgerTableBody>
                  {sortedPosts.map((post, i) => (
                    <LedgerTableRow key={post.slug}>
                      <td className="font-mono-data text-mono-data border-primary border-r p-4">
                        {(sortedPosts.length - i).toString().padStart(3, "0")}
                      </td>
                      <td className="font-mono-data text-mono-data border-primary border-r p-4">
                        {post.entry.publishedDate
                          ? format(
                              new Date(post.entry.publishedDate),
                              "yyyy.MM.dd"
                            )
                          : "----.--.--"}
                      </td>
                      <td className="font-technical-sm text-technical-sm border-primary border-r p-4 uppercase decoration-2 underline-offset-4 group-hover:underline">
                        <Link
                          href={`/posts/${post.slug}`}
                          className="block w-full"
                        >
                          {post.entry.title}
                        </Link>
                        {post.entry.summary && (
                          <p className="font-mono-data mt-1 line-clamp-1 text-[10px] normal-case opacity-60">
                            {post.entry.summary}
                          </p>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <span className="font-inter font-black">→</span>
                      </td>
                    </LedgerTableRow>
                  ))}
                </LedgerTableBody>
              </LedgerTable>
            </Section>
          </div>
        </Container>
      </div>

      {/* Mobile Version - MORPHED FROM DESIGN GUIDE */}
      <div className="px-4 pt-6 md:hidden">
        {/* Document Header */}
        <section className="border-primary bg-surface-card mb-8 border-2 p-4">
          <div className="mb-2 flex items-start justify-between">
            <span className="font-technical-sm text-technical-sm uppercase">
              INDEX NO. 408-B
            </span>
            <span className="font-technical-sm text-technical-sm uppercase">
              STATUS: ARCHIVED
            </span>
          </div>
          <h1 className="font-headline-xl mb-2 text-4xl uppercase">JOURNAL</h1>
          <p className="font-body-md max-w-md text-sm leading-tight uppercase opacity-80">
            Chronological ledger of technical observations, site visits, and
            architectural field studies.
          </p>
        </section>

        {/* Mobile Filter Bar */}
        <section className="bg-canvas sticky top-[73px] z-40 mb-6 py-2">
          <div className="border-primary bg-surface-muted no-scrollbar flex overflow-x-auto border-2 whitespace-nowrap">
            <div className="border-primary bg-primary text-canvas font-technical-sm flex-shrink-0 border-r-2 px-4 py-2 uppercase">
              ALL ENTRIES
            </div>
            {categories.map((cat) => (
              <div
                key={cat}
                className="border-primary font-technical-sm hover:bg-primary hover:text-canvas flex-shrink-0 cursor-pointer border-r-2 px-4 py-2 uppercase transition-none"
              >
                {cat}
              </div>
            ))}
          </div>
          <div className="border-primary divide-primary bg-surface-card flex divide-x-2 border-x-2 border-b-2">
            <button className="font-technical-sm hover:bg-primary hover:text-canvas flex flex-1 items-center justify-center gap-2 py-3 uppercase transition-none">
              <span className="font-black">↑↓</span> SORT
            </button>
            <button className="font-technical-sm hover:bg-primary hover:text-canvas flex flex-1 items-center justify-center gap-2 py-3 uppercase transition-none">
              <span className="font-black">⚲</span> FIND
            </button>
          </div>
        </section>

        {/* Journal Entries List */}
        <div className="border-primary mb-12 flex flex-col gap-0 border-t-2">
          {sortedPosts.map((post, i) => (
            <article
              key={post.slug}
              className="border-primary bg-surface-card hover:bg-primary group border-x-2 border-b-2 transition-none"
            >
              <Link
                className="flex flex-col gap-2 p-4"
                href={`/posts/${post.slug}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-data bg-primary text-canvas group-hover:bg-canvas group-hover:text-primary px-2 py-0.5 text-xs transition-none">
                    NO. {(sortedPosts.length - i).toString().padStart(4, "0")}
                  </span>
                  <span className="font-mono-data text-primary group-hover:text-canvas text-xs transition-none">
                    {post.entry.publishedDate
                      ? format(new Date(post.entry.publishedDate), "yyyy.MM.dd")
                      : "----.--.--"}
                  </span>
                </div>
                <h2 className="font-headline-lg text-primary group-hover:text-canvas text-xl leading-tight uppercase transition-none">
                  {post.entry.title}
                </h2>
                {post.entry.tags && post.entry.tags.length > 0 && (
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="font-technical-sm text-secondary group-hover:text-canvas/60 text-[10px] uppercase transition-none">
                      TAGS:
                    </span>
                    {post.entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-technical-sm text-primary group-hover:text-canvas text-[10px] uppercase underline transition-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </article>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="border-primary bg-surface-muted mb-8 flex border-2">
          <button className="border-primary font-technical-sm hover:bg-primary hover:text-canvas flex-1 border-r-2 py-4 uppercase transition-none disabled:opacity-30">
            PREVIOUS
          </button>
          <div className="font-mono-data flex flex-[0.5] items-center justify-center text-xs">
            01 / 01
          </div>
          <button className="border-primary font-technical-sm hover:bg-primary hover:text-canvas flex-1 border-l-2 py-4 uppercase transition-none">
            NEXT
          </button>
        </div>
      </div>
    </main>
  );
}
