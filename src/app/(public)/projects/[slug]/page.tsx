import { getReader } from "@/lib/reader";
import React from "react";
import Markdoc from "@markdoc/markdoc";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout-components";
import { MarkdocRenderer } from "@/components/markdoc-renderer";
import { format } from "date-fns";
import { markdocTags, markdocNodes } from "@/components/custom-components";

export async function generateStaticParams() {
  const reader = await getReader();
  const projects = await reader.collections.projects.list();
  return projects.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const reader = await getReader();
  const project = await reader.collections.projects.read(slug);
  const allProjects = await reader.collections.projects.all();

  if (!project) {
    return (
      <main className="flex-grow">
        <Container>
          <h1 className="font-headline-xl text-headline-xl uppercase">
            Project Not Found
          </h1>
          <Link
            href="/projects"
            className="font-technical-sm text-technical-sm mt-8 inline-block uppercase hover:underline"
          >
            ← Return to Archive
          </Link>
        </Container>
      </main>
    );
  }

  // Handle Markdoc content from description field
  const { node } = await project.description();
  const renderable = Markdoc.transform(node, {
    tags: markdocTags,
    nodes: markdocNodes,
  });

  // Handle Markdoc content from resolution field
  const resolutionData = project.resolution ? await project.resolution() : null;
  const resolutionRenderable = resolutionData
    ? Markdoc.transform(resolutionData.node, {
        tags: markdocTags,
        nodes: markdocNodes,
      })
    : null;

  const relatedProjects = allProjects
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  const dateStr = project.dateRange?.[0]
    ? format(new Date(project.dateRange[0]), "yyyy.MM.dd")
    : "2024.10.12";

  return (
    <main className="mx-auto flex w-full max-w-full flex-grow flex-col items-center pb-32">
      <div className="flex w-full flex-col items-center px-6 py-6 wrap-break-word md:max-w-9/10 md:py-12">
        <article className="flex w-full flex-col gap-8 md:gap-12">
          {/* Unified Header */}
          <header className="border-primary flex flex-col gap-4 border-b-2 pb-6 md:pb-8">
            <div className="flex items-center justify-between">
              <span className="bg-primary text-canvas font-mono-data px-2 py-0.5 text-xs tracking-widest uppercase">
                FILE: OP_{slug.slice(0, 4).toUpperCase()}
              </span>
              <span className="font-mono-data text-mono-data text-xs uppercase opacity-60 md:text-base md:opacity-100">
                STATUS: {project.status?.toUpperCase() || "OPERATIONAL"}
              </span>
            </div>
            <h1 className="font-headline-xl md:text-headline-xl text-3xl leading-tight uppercase">
              {project.name}
            </h1>
            <p className="font-mono-data text-secondary text-xs uppercase md:hidden">
              STAMP: {dateStr}
            </p>
          </header>

          <div className="grid grid-flow-row gap-8 md:grid-cols-[1fr_4fr] md:gap-12">
            {/* Sidebar (Order 2 on mobile, Order 1 on Desktop) */}
            <aside className="order-2 flex flex-col gap-8 md:order-1">
              <div className="border-primary bg-surface-card border-2 p-4 md:p-6">
                <h3 className="font-technical-sm text-technical-sm border-primary mb-4 border-b-2 pb-2 uppercase">
                  SPECIFICATIONS
                </h3>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "DURATION", value: project.duration || "N/A" },
                    {
                      label: "STAKEHOLDERS",
                      value: project.stakeholders || "N/A",
                    },
                    { label: "LATENCY", value: project.latency || "N/A" },
                    {
                      label: "STATUS",
                      value: project.status?.toUpperCase() || "N/A",
                    },
                  ].map((spec, i) => (
                    <div
                      key={i}
                      className="border-primary/20 flex justify-between border-b pb-1"
                    >
                      <span className="font-technical-sm text-[10px] uppercase opacity-60">
                        {spec.label}
                      </span>
                      <span className="font-mono-data text-xs font-bold uppercase md:text-sm">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {project.images && project.images.length > 0 && (
                <div className="border-primary bg-surface-muted border-2 p-4 md:p-6">
                  <h3 className="font-technical-sm text-technical-sm border-primary mb-4 border-b-2 pb-2 uppercase">
                    ASSETS
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {project.images.map((img, i) => (
                      <div
                        key={i}
                        className="bg-surface-dim border-primary relative aspect-square overflow-hidden border-2 contrast-125 grayscale"
                      >
                        <Image
                          src={img as string}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.techStack && project.techStack.length > 0 && (
                <div className="border-primary bg-canvas border-2 p-4 md:p-6">
                  <h3 className="font-technical-sm text-technical-sm border-primary mb-4 border-b-2 pb-2 uppercase">
                    TECH_STACK
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-primary text-canvas font-mono-data px-2 py-1 text-[10px] uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(project.repo || project.demo) && (
                <div className="border-primary bg-surface-card border-2 p-4 md:p-6">
                  <h3 className="font-technical-sm text-technical-sm border-primary mb-4 border-b-2 pb-2 uppercase">
                    SYSTEM_LINKS
                  </h3>
                  <div className="flex flex-col gap-3">
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-primary bg-primary text-canvas font-technical-sm hover:bg-canvas hover:text-primary border-2 py-4 text-center text-xs font-bold tracking-widest uppercase transition-none md:py-3 md:text-[10px]"
                      >
                        ACCESS_REPOSITORY
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-primary bg-canvas text-primary font-technical-sm hover:bg-primary hover:text-canvas border-2 py-4 text-center text-xs font-bold tracking-widest uppercase transition-none md:py-3 md:text-[10px]"
                      >
                        VIEW_LIVE_DEMO
                      </a>
                    )}
                  </div>
                </div>
              )}
            </aside>

            {/* Content Area (Order 1 on mobile, Order 2 on Desktop) */}
            <div className="order-1 flex min-w-0 flex-col gap-8 md:order-2">
              <div className="flex flex-col">
                <div className="border-primary bg-surface-card relative aspect-video overflow-hidden border-2 p-0 contrast-125 grayscale md:p-2">
                  {project.images?.[0] ? (
                    <Image
                      src={project.images[0] as string}
                      alt={project.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="bg-surface-dim flex h-full w-full items-center justify-center text-2xl font-black uppercase opacity-10 md:text-6xl">
                      ARCHIVE_IMAGE
                    </div>
                  )}
                </div>
                <p className="font-technical-sm mt-3 text-center text-[10px] tracking-tighter uppercase opacity-60">
                  PLATE 01: SYSTEM ARCHITECTURE OVERVIEW //{" "}
                  {project.name.toUpperCase()}
                </p>
              </div>

              <div className="prose-container prose-mobile border-primary bg-canvas border-0 p-0 md:border-2 md:p-8">
                <MarkdocRenderer content={renderable} />
              </div>

              {resolutionRenderable && (
                <div className="border-primary md:bg-surface-muted flex flex-col gap-4 border-0 p-0 md:border-2 md:p-8">
                  <h2 className="font-headline-lg border-primary border-l-4 pl-4 text-xl uppercase md:border-l-0 md:pl-0 md:text-2xl">
                    TECHNICAL RESOLUTION
                  </h2>
                  <div className="font-body-md text-justify text-sm leading-relaxed uppercase opacity-80 md:text-left md:text-base md:normal-case md:opacity-100">
                    <MarkdocRenderer content={resolutionRenderable} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Operations (Visible on both) */}
          <section className="bg-canvas border-primary mt-4 border-t-2 pt-8 md:mt-0">
            <h3 className="font-headline-lg mb-6 flex items-center gap-2 text-xl uppercase md:text-2xl">
              <span className="text-2xl font-black">#</span> RELATED OPERATIONS
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {relatedProjects.map((p, i) => (
                <div
                  key={i}
                  className="border-primary bg-surface-card border-2 p-4 md:p-6"
                >
                  <div className="font-mono-data text-secondary mb-4 text-[10px] uppercase md:text-xs">
                    OP_{p.slug.slice(0, 4).toUpperCase()} {"//"} ARCHIVED
                  </div>
                  <h4 className="font-headline-lg mb-2 text-lg uppercase md:text-xl">
                    {p.entry.name}
                  </h4>
                  <p className="font-body-md mb-4 line-clamp-2 text-xs uppercase opacity-80 md:text-sm">
                    {p.entry.summary ||
                      "Technical observation and structural analysis of complex digital infrastructure."}
                  </p>
                  <Link
                    className="font-technical-sm hover:text-secondary inline-flex items-center text-xs font-bold uppercase underline decoration-2 underline-offset-4 transition-colors"
                    href={`/projects/${p.slug}`}
                  >
                    OPEN FOLDER <span className="ml-1">→</span>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
