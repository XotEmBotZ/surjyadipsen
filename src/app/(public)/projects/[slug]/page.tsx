import { getReader } from "@/lib/reader";
import React from "react";
import Markdoc from "@markdoc/markdoc";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout-components";
import { MarkdocRenderer } from "@/components/markdoc-renderer";
import { format } from "date-fns";

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
  const renderable = Markdoc.transform(node);

  // Handle Markdoc content from resolution field
  const resolutionData = project.resolution ? await project.resolution() : null;
  const resolutionRenderable = resolutionData
    ? Markdoc.transform(resolutionData.node)
    : null;

  const relatedProjects = allProjects
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  const dateStr = project.dateRange?.[0]
    ? format(new Date(project.dateRange[0]), "yyyy.MM.dd")
    : "2024.10.12";

  return (
    <main className="mx-auto flex w-full max-w-full flex-grow flex-col items-center pb-32">
      {/* Desktop Version */}
      <div className="hidden w-full max-w-6xl flex-col items-center px-6 py-12 md:flex">
        <article className="flex w-full flex-col gap-12">
          <header className="border-primary flex flex-col gap-4 border-b-2 pb-8">
            <div className="flex items-end justify-between">
              <span className="font-technical-sm text-technical-sm text-secondary uppercase">
                PROJECT NO. {slug.slice(0, 3).toUpperCase()} {"//"} ARCHIVE
              </span>
              <span className="font-mono-data text-mono-data uppercase">
                STATUS: {project.status?.toUpperCase() || "OPERATIONAL"}
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl uppercase">
              {project.name}
            </h1>
          </header>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <aside className="col-span-4 flex flex-col gap-8">
              <div className="border-primary bg-surface-card border-2 p-6">
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
                      <span className="font-mono-data text-sm font-bold uppercase">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {project.images && project.images.length > 0 && (
                <div className="border-primary bg-surface-muted border-2 p-6">
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
                <div className="border-primary bg-canvas border-2 p-6">
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
                <div className="border-primary bg-surface-card border-2 p-6">
                  <h3 className="font-technical-sm text-technical-sm border-primary mb-4 border-b-2 pb-2 uppercase">
                    SYSTEM_LINKS
                  </h3>
                  <div className="flex flex-col gap-3">
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-primary bg-primary text-canvas font-technical-sm hover:bg-canvas hover:text-primary border-2 py-3 text-center text-[10px] font-bold tracking-widest uppercase transition-none"
                      >
                        ACCESS_REPOSITORY
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-primary bg-canvas text-primary font-technical-sm hover:bg-primary hover:text-canvas border-2 py-3 text-center text-[10px] font-bold tracking-widest uppercase transition-none"
                      >
                        VIEW_LIVE_DEMO
                      </a>
                    )}
                  </div>
                </div>
              )}
            </aside>

            <div className="col-span-8 flex flex-col gap-8">
              <div className="border-primary bg-surface-card relative aspect-video overflow-hidden border-2 p-2 contrast-125 grayscale">
                {project.images?.[0] ? (
                  <Image
                    src={project.images[0] as string}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="bg-surface-dim flex h-full w-full items-center justify-center text-6xl font-black opacity-10">
                    ARCHIVE_IMAGE
                  </div>
                )}
              </div>

              <div className="prose-container bg-canvas border-primary border-2 p-8">
                <MarkdocRenderer content={renderable} />
              </div>

              {resolutionRenderable && (
                <div className="border-primary bg-surface-muted flex flex-col gap-4 border-2 p-8">
                  <h2 className="font-headline-lg text-2xl uppercase">
                    TECHNICAL RESOLUTION
                  </h2>
                  <MarkdocRenderer content={resolutionRenderable} />
                </div>
              )}
            </div>
          </div>
        </article>
      </div>

      {/* Mobile Version - MORPHED FROM DESIGN GUIDE */}
      <div className="w-full md:hidden">
        {/* Hero Section */}
        <section className="border-primary border-b-2">
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono-data bg-primary text-canvas px-2 py-0.5 text-xs tracking-widest uppercase">
                FILE: OP_{slug.slice(0, 4).toUpperCase()}
              </span>
              <span className="font-mono-data text-xs uppercase opacity-60">
                STATUS: {project.status?.toUpperCase()}
              </span>
            </div>
            <div className="border-primary relative aspect-video overflow-hidden border-2 contrast-125 grayscale">
              {project.images?.[0] ? (
                <Image
                  src={project.images[0] as string}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="bg-surface-muted flex h-full w-full items-center justify-center text-2xl font-black uppercase opacity-10">
                  IMAGE_NULL
                </div>
              )}
            </div>
            <p className="font-technical-sm mt-3 text-center text-[10px] tracking-tighter uppercase opacity-60">
              PLATE 01: SYSTEM ARCHITECTURE OVERVIEW //{" "}
              {project.name.toUpperCase()}
            </p>
          </div>
        </section>

        {/* Specification Log Mobile */}
        <section className="bg-surface-card border-primary border-b-2 p-6">
          <div className="mb-6">
            <h1 className="font-headline-xl mb-2 text-3xl leading-tight uppercase">
              {project.name}
            </h1>
            <p className="font-mono-data text-secondary text-xs uppercase">
              STAMP: {dateStr}
            </p>
          </div>
          <div className="border-primary bg-canvas border-2">
            <div className="border-primary bg-surface-muted grid grid-cols-2 border-b-2 px-4 py-2">
              <span className="font-technical-sm text-[10px] font-bold uppercase">
                PARAMETER
              </span>
              <span className="font-technical-sm text-right text-[10px] font-bold uppercase">
                VALUE
              </span>
            </div>
            {[
              { label: "DURATION", value: project.duration || "N/A" },
              { label: "STAKEHOLDERS", value: project.stakeholders || "N/A" },
              {
                label: "STATUS",
                value: project.status?.toUpperCase() || "N/A",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="border-primary/20 grid grid-cols-2 border-b px-4 py-3 last:border-b-0"
              >
                <span className="font-technical-sm text-[10px] uppercase">
                  {s.label}
                </span>
                <span className="font-mono-data text-right text-xs font-bold uppercase">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Content Mobile */}
        <section className="border-primary space-y-12 border-b-2 p-6">
          <div className="prose-mobile">
            <MarkdocRenderer content={renderable} />
          </div>

          {resolutionRenderable && (
            <div className="space-y-4">
              <h2 className="font-headline-lg border-primary border-l-4 pl-4 text-xl uppercase">
                TECHNICAL RESOLUTION
              </h2>
              <div className="font-body-md text-justify text-sm leading-relaxed uppercase opacity-80">
                <MarkdocRenderer content={resolutionRenderable} />
              </div>
            </div>
          )}

          {(project.repo || project.demo) && (
            <div className="grid grid-cols-1 gap-4">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-primary bg-primary text-canvas font-technical-sm hover:bg-canvas hover:text-primary w-full border-2 py-4 text-center text-xs font-bold tracking-widest uppercase transition-none"
                >
                  ACCESS_REPOSITORY
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-primary bg-canvas text-primary font-technical-sm hover:bg-primary hover:text-canvas w-full border-2 py-4 text-center text-xs font-bold tracking-widest uppercase transition-none"
                >
                  VIEW_LIVE_DEMO
                </a>
              )}
            </div>
          )}
        </section>

        {/* Related Operations Stack Mobile */}
        <section className="bg-canvas p-6">
          <h3 className="font-headline-lg mb-6 flex items-center gap-2 text-xl uppercase">
            <span className="text-2xl font-black">#</span> RELATED OPERATIONS
          </h3>
          <div className="flex flex-col gap-6">
            {relatedProjects.map((p, i) => (
              <div
                key={i}
                className="border-primary bg-surface-card border-2 p-4"
              >
                <div className="font-mono-data text-secondary mb-4 text-[10px] uppercase">
                  OP_{p.slug.slice(0, 4).toUpperCase()} {"//"} ARCHIVED
                </div>
                <h4 className="font-headline-lg mb-2 text-lg uppercase">
                  {p.entry.name}
                </h4>
                <p className="font-body-md mb-4 line-clamp-2 text-xs uppercase opacity-80">
                  {p.entry.summary ||
                    "Technical observation and structural analysis of complex digital infrastructure."}
                </p>
                <Link
                  className="font-technical-sm inline-flex items-center text-xs font-bold uppercase underline decoration-2 underline-offset-4"
                  href={`/projects/${p.slug}`}
                >
                  OPEN FOLDER <span className="ml-1">→</span>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
