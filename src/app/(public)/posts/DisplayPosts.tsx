"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

type Post = {
  slug: string;
  entry: {
    title: string;
    publishedDate: string | null;
    summary: string | null;
    category: string | null;
    tags: readonly string[] | null;
    image: string | null;
  };
};

export default function DisplayPosts({
  initialPosts,
  categories,
}: {
  initialPosts: Post[];
  categories: string[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Debounce effect for search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms buffer

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredPosts = useMemo(() => {
    let result = [...initialPosts];

    // Search filter using debounced value
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase().trim();
      result = result.filter(
        (post) =>
          post.entry.title.toLowerCase().includes(query) ||
          (post.entry.summary?.toLowerCase().includes(query) ?? false) ||
          (post.entry.category?.toLowerCase().includes(query) ?? false) ||
          (post.entry.tags?.some((tag) => tag.toLowerCase().includes(query)) ??
            false)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(
        (post) =>
          post.entry.category &&
          selectedCategories.includes(post.entry.category)
      );
    }

    // Sort
    result.sort((a, b) => {
      const dateA = a.entry.publishedDate
        ? new Date(a.entry.publishedDate).getTime()
        : 0;
      const dateB = b.entry.publishedDate
        ? new Date(b.entry.publishedDate).getTime()
        : 0;

      if (dateB !== dateA) {
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      }

      return sortOrder === "newest"
        ? a.entry.title.localeCompare(b.entry.title)
        : b.entry.title.localeCompare(a.entry.title);
    });

    return result;
  }, [initialPosts, debouncedSearchQuery, selectedCategories, sortOrder]);

  const latestPost = useMemo(() => {
    // We always want the "Highlight" to be the newest matching post
    return [...filteredPosts].sort((a, b) => {
      const dateA = a.entry.publishedDate
        ? new Date(a.entry.publishedDate).getTime()
        : 0;
      const dateB = b.entry.publishedDate
        ? new Date(b.entry.publishedDate).getTime()
        : 0;
      if (dateB !== dateA) return dateB - dateA;
      return a.entry.title.localeCompare(b.entry.title);
    })[0];
  }, [filteredPosts]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <>
      {/* Responsive Header */}
      <header className="border-primary mb-6 border-b-2 pb-4 md:mb-0 md:border-b-4 md:pb-6">
        <h1 className="font-headline-xl text-4xl uppercase md:text-5xl">
          <span>FIELD JOURNAL</span>
        </h1>
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <p className="font-technical-sm text-[10px] uppercase opacity-60">
            TECHNICAL OBSERVATION LOG // INDEX NO. 408-B
          </p>
          <div className="flex items-center gap-4">
            <span className="font-technical-sm text-[10px] uppercase opacity-40">
              ENTRIES: {filteredPosts.length.toString().padStart(3, "0")}
            </span>
            <span className="font-technical-sm text-[10px] uppercase opacity-40">
              STAMP: {new Date().getFullYear()}.
              {String(new Date().getMonth() + 1).padStart(2, "0")}.
              {String(new Date().getDate()).padStart(2, "0")}
            </span>
          </div>
        </div>
      </header>

      <div className="gap-gutter flex flex-col items-start lg:flex-row">
        {/* Unified Filter Sidebar/Bar */}
        <aside className="bg-canvas border-primary lg:bg-surface-card sticky top-[73px] z-40 mb-6 flex w-full shrink-0 flex-col gap-0 lg:static lg:z-0 lg:mb-0 lg:w-[320px] lg:gap-8 lg:border-2 lg:p-6">
          {/* Desktop-style Search */}
          <div className="hidden flex-col gap-2 lg:flex">
            <label className="border-primary font-technical-sm text-technical-sm text-primary mb-2 border-b-2 pb-1 uppercase">
              QUERY DATABASE
            </label>
            <div className="relative flex items-center">
              <input
                className="bg-canvas border-primary font-mono-data text-mono-data text-primary placeholder-primary/50 w-full rounded-none border-2 px-3 py-2 transition-none focus:border-l-[6px] focus:ring-0 focus:outline-none"
                placeholder="ENTER KEYWORD..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Mobile-style Sticky Bar */}
          <div className="no-scrollbar border-primary bg-surface-muted flex overflow-x-auto border-2 whitespace-nowrap lg:hidden">
            <button
              onClick={() => setSelectedCategories([])}
              className={`border-primary font-technical-sm flex-shrink-0 border-r-2 px-4 py-2 uppercase transition-none ${
                selectedCategories.length === 0
                  ? "bg-primary text-canvas"
                  : "bg-surface-muted"
              }`}
            >
              ALL ENTRIES
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`border-primary font-technical-sm flex-shrink-0 border-r-2 px-4 py-2 uppercase transition-none ${
                  selectedCategories.includes(cat)
                    ? "bg-primary text-canvas"
                    : "hover:bg-primary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Desktop-style Topics */}
          <div className="hidden flex-col gap-4 lg:flex">
            <h3 className="border-primary font-technical-sm text-technical-sm text-primary border-b-2 pb-1 uppercase">
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
                      checked={selectedCategories.includes(topic)}
                      onChange={() => toggleCategory(topic)}
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

          {/* Mobile-style Action Buttons */}
          <div className="divide-primary border-primary bg-surface-card flex divide-x-2 border-x-2 border-b-2 lg:hidden">
            <button
              onClick={() =>
                setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
              }
              className="font-technical-sm hover:bg-primary hover:text-canvas flex flex-1 items-center justify-center gap-2 py-3 uppercase transition-none"
            >
              <span className="font-black">↑↓</span>{" "}
              {sortOrder === "newest" ? "NEWEST" : "OLDEST"}
            </button>
            <div className="relative flex flex-1 items-center">
              <input
                className="bg-canvas font-technical-sm text-mono-data text-primary placeholder-primary/50 w-full rounded-none border-none px-4 py-3 transition-none focus:ring-0 focus:outline-none"
                placeholder="⚲ FIND..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Unified Sort Option for Desktop */}
          <div className="hidden lg:block">
            <button
              onClick={() =>
                setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
              }
              className="border-primary font-technical-sm hover:bg-primary hover:text-canvas flex w-full items-center justify-center gap-2 border-2 py-2 uppercase transition-none"
            >
              <span className="font-black">↑↓</span> SORT:{" "}
              {sortOrder === "newest" ? "NEWEST" : "OLDEST"}
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="w-full flex-grow">
          {filteredPosts.length === 0 ? (
            <div className="border-primary bg-surface-card flex h-64 flex-col items-center justify-center border-2 p-8 text-center">
              <span className="font-headline-lg mb-4 text-2xl uppercase opacity-40">
                No entries matched query
              </span>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategories([]);
                }}
                className="bg-primary text-canvas font-technical-sm px-6 py-2 uppercase hover:opacity-90"
              >
                Reset Database Filter
              </button>
            </div>
          ) : (
            <>
              {/* Unified Hero Highlight */}
              {latestPost && (
                <Link
                  href={`/posts/${latestPost.slug}`}
                  className="border-primary bg-surface-card group/hero mb-8 block w-full border-2 p-4 transition-none"
                >
                  {latestPost.entry.image && (
                    <div className="border-primary bg-surface-dim relative mb-3 h-[240px] w-full overflow-hidden border-2">
                      <Image
                        src={latestPost.entry.image}
                        alt=""
                        fill
                        className="object-cover grayscale transition-transform duration-500 group-hover/hero:scale-105"
                      />
                    </div>
                  )}
                  <div
                    className={`flex flex-col gap-2 ${latestPost.entry.image ? "border-primary border-t-2 pt-3" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono-data text-mono-data uppercase decoration-2 underline-offset-4 group-hover/hero:underline">
                        FIG 1. {latestPost.entry.title.toUpperCase()}
                      </span>
                      <span className="font-technical-sm text-technical-sm bg-primary text-canvas px-2 py-0.5">
                        LATEST
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-technical-sm bg-primary/10 px-2 py-0.5 text-[10px] uppercase">
                        CAT: {latestPost.entry.category}
                      </span>
                      {latestPost.entry.tags &&
                        latestPost.entry.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {latestPost.entry.tags.map((tag) => (
                              <span
                                key={tag}
                                className="font-technical-sm text-primary/60 text-[10px] uppercase underline underline-offset-2"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                    </div>
                  </div>
                </Link>
              )}

              {/* Unified Cards List */}
              <div className="border-primary flex flex-col gap-0 border-t-2">
                {filteredPosts.map((post, i) => (
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
                          NO.{" "}
                          {(filteredPosts.length - i)
                            .toString()
                            .padStart(4, "0")}
                        </span>
                        <span className="font-mono-data text-primary group-hover:text-canvas text-xs transition-none">
                          {post.entry.publishedDate
                            ? format(
                                new Date(post.entry.publishedDate),
                                "yyyy.MM.dd"
                              )
                            : "----.--.--"}
                        </span>
                      </div>
                      <h2 className="font-headline-lg text-primary group-hover:text-canvas text-xl leading-tight uppercase transition-none">
                        {post.entry.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-technical-sm bg-surface-dim group-hover:bg-canvas group-hover:text-primary px-2 py-0.5 text-[10px] uppercase transition-none">
                          {post.entry.category}
                        </span>
                      </div>
                      {post.entry.summary && (
                        <p className="font-mono-data text-primary/60 group-hover:text-canvas/70 line-clamp-2 text-xs normal-case transition-none">
                          {post.entry.summary}
                        </p>
                      )}
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
            </>
          )}
        </div>
      </div>
    </>
  );
}
