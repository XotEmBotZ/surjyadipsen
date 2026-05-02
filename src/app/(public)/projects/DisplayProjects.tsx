"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container, Section } from "@/components/layout-components";
import config from "@/../keystatic.config";
import { Entry } from "@keystatic/core/reader";

type ProjectList = {
  slug: string;
  entry: Omit<
    Entry<typeof config.collections.projects>,
    "description" | "resolution"
  >;
}[];

type CategoryOption =
  (typeof config.collections.projects.schema.category.options)[number];

export default function DisplayProject({
  categories,
  projects,
}: {
  categories: readonly CategoryOption[];
  projects: ProjectList;
}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.entry.category === activeCategory);

  return (
    <main className="grow pb-32 md:pb-12">
      <Container className="px-4 md:px-6">
        {/* Responsive Header */}
        <header className="border-primary mb-6 border-b-2 pb-4 md:mb-0 md:border-b-4 md:pb-6">
          <h1 className="font-headline-xl text-4xl uppercase md:text-5xl">
            <span>PROJECT ARCHIVE</span>
          </h1>
          <p className="font-technical-sm text-[10px] uppercase opacity-60">
            TECHNICAL SPECIFICATION INDEX // VOL. 04
          </p>
        </header>

        <div className="gap-gutter flex flex-col lg:flex-row">
          {/* Sidebar / Filters */}
          <aside className="flex w-full shrink-0 flex-col gap-8 lg:w-70">
            {/* Categories Block */}
            <div className="border-primary bg-surface-card border-2 p-4 md:p-6">
              <div className="border-primary mb-4 flex items-center justify-between border-b-2 pb-2 md:block">
                <h3 className="font-technical-sm text-technical-sm uppercase">
                  <span>CATEGORIES.EXE</span>
                </h3>
                <span className="font-black md:hidden">↓</span>
              </div>
              <div className="flex flex-wrap gap-2 md:flex-col md:gap-2">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`font-mono-data text-mono-data border-primary/10 md:hover:bg-primary md:hover:text-canvas border px-3 py-1 text-left text-[9px] font-bold tracking-widest uppercase transition-none md:border-0 md:border-b md:px-2 md:text-sm md:font-normal md:tracking-normal ${
                    activeCategory === "all"
                      ? "bg-primary text-canvas"
                      : "text-primary bg-transparent"
                  }`}
                >
                  <span>ALL_UNITS</span>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`font-mono-data text-mono-data border-primary md:hover:bg-primary md:hover:text-canvas border px-3 py-1 text-left text-[9px] font-bold tracking-widest uppercase transition-none md:border-0 md:border-b md:px-2 md:text-sm md:font-normal md:tracking-normal ${
                      activeCategory === cat.value
                        ? "bg-primary text-canvas md:bg-primary"
                        : "text-primary bg-transparent"
                    }`}
                  >
                    {cat.label.replace(" ", "_").toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Index Table */}
            <div className="border-primary bg-surface-muted border-2 p-6">
              <h3 className="font-technical-sm text-technical-sm border-primary mb-4 border-b-2 pb-2 uppercase">
                <span className="md:hidden">TECHNICAL_INDEX_V4.0</span>
                <span className="hidden md:inline">TECHNICAL INDEX</span>
              </h3>
              <div className="border-primary overflow-hidden md:border-0">
                <table className="font-mono-data w-full border-collapse text-[10px] uppercase">
                  <thead>
                    <tr className="bg-surface-muted border-primary border-b-2 text-left">
                      <th className="border-primary border-r-2 p-2">ID</th>
                      <th className="border-primary border-r-2 p-2">SPEC</th>
                      <th className="p-2">STAT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.slice(0, 5).map((p, i) => (
                      <tr
                        key={p.slug}
                        className="border-primary/20 border-b last:border-b-0"
                      >
                        <td className="border-primary border-r-2 p-2 py-1 md:bg-transparent md:p-0">
                          0{i + 1}-P
                        </td>
                        <td className="border-primary border-r-2 p-2">
                          {p.entry.name.length > 5
                            ? p.entry.name.slice(0, 5) + "..."
                            : p.entry.name}
                        </td>
                        <td className="p-2 text-right font-bold md:p-0">
                          <span>{p.entry.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </aside>

          {/* Asymmetric Grid */}
          <Section className="grow">
            <div className="gap-gutter flex flex-col md:grid md:grid-cols-2">
              {filteredProjects.map((project, i) => (
                <article
                  key={project.slug}
                  className={`border-primary bg-surface-card group flex flex-col border-2 ${
                    i % 3 === 0 ? "md:col-span-2" : "col-span-1"
                  }`}
                >
                  <div
                    className={`bg-surface-dim relative overflow-hidden contrast-125 grayscale ${
                      i % 3 === 0
                        ? "aspect-video md:aspect-21/9"
                        : "aspect-video"
                    } h-64 border-b-2 md:h-auto md:border-b-0`}
                  >
                    {project.entry.images?.[0] ? (
                      <Image
                        src={project.entry.images[0] as string}
                        alt={project.entry.name}
                        fill
                        className="object-cover transition-none group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-4xl font-black uppercase opacity-10 md:text-6xl">
                        <span>UNIT_{i + 1}</span>
                      </div>
                    )}
                    <div className="bg-primary text-canvas font-mono-data absolute top-4 left-4 px-2 py-1 text-[10px] tracking-widest uppercase md:px-3 md:text-xs">
                      UNIT_{(i + 1).toString().padStart(2, "0")}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 p-4 md:gap-4 md:p-8">
                    <div className="border-primary flex items-start justify-between md:border-b-2 md:pb-4">
                      <h2 className="font-headline-lg md:text-headline-lg text-xl leading-none break-all uppercase md:leading-normal">
                        {project.entry.name}
                      </h2>
                      <span className="font-mono-data text-xs uppercase opacity-50">
                        <span className="md:hidden">
                          {project.slug.slice(0, 3).toUpperCase()}-24
                        </span>
                        <span className="hidden md:inline">
                          {project.slug.slice(0, 4).toUpperCase()}-{2024 - i}
                        </span>
                      </span>
                    </div>
                    <p className="font-body-md md:text-body-md text-xs leading-tight uppercase opacity-80 md:leading-relaxed">
                      {project.entry.summary ||
                        "Technical observation and structural analysis of complex digital infrastructure. Verified protocols and high-stakes deployment."}
                    </p>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="bg-primary text-canvas border-primary hover:bg-canvas hover:text-primary md:text-primary md:hover:bg-primary md:hover:text-canvas mt-0 block w-full border-2 py-4 text-center text-[10px] font-bold tracking-widest uppercase transition-none md:mt-4 md:w-max md:bg-transparent md:px-6 md:py-2"
                    >
                      <span>VIEW_LOGS</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </Section>
        </div>
      </Container>
    </main>
  );
}
