import { getReader } from "@/lib/reader";
import Link from "next/link";
import Image from "next/image";
import { Container, PageHeader, Section } from "@/components/layout-components";

export default async function ProjectsPage() {
  const reader = await getReader();
  const projects = await reader.collections.projects.all();

  return (
    <main className="flex-grow pb-32 md:pb-12">
      {/* Desktop Version */}
      <div className="hidden md:block">
        <Container>
          <PageHeader
            title="PROJECT ARCHIVE"
            subtitle="TECHNICAL SPECIFICATION INDEX // VOL. 04"
          />

          <div className="gap-gutter flex flex-col lg:flex-row">
            {/* Sidebar / Filters */}
            <aside className="flex w-full shrink-0 flex-col gap-8 lg:w-[280px]">
              <div className="border-primary bg-surface-card border-2 p-6">
                <h3 className="font-technical-sm text-technical-sm border-primary mb-4 border-b-2 pb-2 uppercase">
                  CATEGORIES.EXE
                </h3>
                <div className="flex flex-col gap-2">
                  {[
                    "All Systems",
                    "Hardware",
                    "Software",
                    "Neural",
                    "Redundancy",
                  ].map((cat) => (
                    <button
                      key={cat}
                      className="font-mono-data text-mono-data hover:bg-primary hover:text-canvas border-primary/10 border-b px-2 py-1 text-left uppercase transition-none"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-primary bg-surface-muted border-2 p-6">
                <h3 className="font-technical-sm text-technical-sm border-primary mb-4 border-b-2 pb-2 uppercase">
                  TECHNICAL INDEX
                </h3>
                <table className="font-mono-data w-full text-[10px] uppercase">
                  <tbody>
                    {projects.slice(0, 5).map((p, i) => (
                      <tr key={p.slug} className="border-primary/20 border-b">
                        <td className="py-1">0{i + 1}-P</td>
                        <td className="py-1 text-right">ACTIVE</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </aside>

            {/* Asymmetric Grid */}
            <Section className="flex-grow">
              <div className="gap-gutter grid grid-cols-1 md:grid-cols-2">
                {projects.map((project, i) => (
                  <article
                    key={project.slug}
                    className={`border-primary bg-surface-card group flex flex-col border-2 ${
                      i % 3 === 0 ? "md:col-span-2" : "col-span-1"
                    }`}
                  >
                    <div
                      className={`bg-surface-dim relative overflow-hidden contrast-125 grayscale ${
                        i % 3 === 0 ? "aspect-[21/9]" : "aspect-video"
                      }`}
                    >
                      {project.entry.images?.[0] ? (
                        <Image
                          src={project.entry.images[0] as string}
                          alt={project.entry.name}
                          fill
                          className="object-cover transition-none group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-6xl font-black opacity-10">
                          ARCHIVE_{i + 1}
                        </div>
                      )}
                      <div className="bg-primary text-canvas font-mono-data absolute top-4 left-4 px-3 py-1 text-xs tracking-widest uppercase">
                        UNIT_{(i + 1).toString().padStart(2, "0")}
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 p-8">
                      <div className="border-primary flex items-start justify-between border-b-2 pb-4">
                        <h2 className="font-headline-lg text-headline-lg uppercase">
                          {project.entry.name}
                        </h2>
                        <span className="font-mono-data text-mono-data uppercase opacity-50">
                          {project.slug.slice(0, 4).toUpperCase()}-{2024 - i}
                        </span>
                      </div>
                      <p className="font-body-md text-body-md leading-relaxed uppercase opacity-80">
                        {project.entry.summary ||
                          "Technical observation and structural analysis of complex digital infrastructure. Verified protocols and high-stakes deployment."}
                      </p>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="border-primary font-technical-sm text-technical-sm hover:bg-primary hover:text-canvas mt-4 w-max border-2 px-6 py-2 uppercase transition-none"
                      >
                        ACCESS_LOGS →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </Section>
          </div>
        </Container>
      </div>

      {/* Mobile Version - MORPHED FROM DESIGN GUIDE */}
      <div className="space-y-8 px-4 pt-6 md:hidden">
        <section className="border-primary border-b-2 pb-4">
          <h1 className="font-headline-xl mb-2 text-4xl uppercase">
            PROJECT GALLERY
          </h1>
          <p className="font-technical-sm text-[10px] uppercase opacity-60">
            TECHNICAL SPECIFICATION INDEX // VOL. 04
          </p>
        </section>

        {/* Filter Criteria Block Mobile */}
        <section className="bg-surface-card border-primary space-y-4 border-2 p-4">
          <div className="border-primary flex items-center justify-between border-b pb-2">
            <span className="font-mono-data text-xs font-bold tracking-widest uppercase">
              FILTERS.EXE
            </span>
            <span className="font-black">↓</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {["All Units", "Kinetic", "Nexus", "Void"].map((cat, i) => (
              <button
                key={cat}
                className={`${i === 0 ? "bg-primary text-canvas" : "text-primary bg-transparent"} border-primary border px-3 py-1 text-[9px] font-bold tracking-widest uppercase transition-none`}
              >
                {cat.replace(" ", "_").toUpperCase()}
              </button>
            ))}
          </div>
        </section>

        {/* Project Cards Mobile Stacked */}
        <div className="flex flex-col gap-8">
          {projects.map((project, i) => (
            <article
              key={project.slug}
              className="bg-surface-card border-primary overflow-hidden border-2"
            >
              <div className="bg-surface-muted border-primary relative h-64 border-b-2 contrast-125 grayscale">
                {project.entry.images?.[0] ? (
                  <Image
                    src={project.entry.images[0] as string}
                    alt={project.entry.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-4xl font-black uppercase opacity-10">
                    UNIT_{i + 1}
                  </div>
                )}
                <div className="bg-primary text-canvas font-mono-data absolute top-4 left-4 px-2 py-1 text-[10px]">
                  UNIT_{(i + 1).toString().padStart(2, "0")}
                </div>
              </div>
              <div className="space-y-3 p-4">
                <div className="flex items-start justify-between">
                  <h2 className="font-headline-lg text-xl leading-none uppercase">
                    {project.entry.name}
                  </h2>
                  <span className="font-mono-data text-xs uppercase opacity-50">
                    {project.slug.slice(0, 3).toUpperCase()}-24
                  </span>
                </div>
                <p className="font-body-md text-xs leading-tight uppercase opacity-80">
                  {project.entry.summary ||
                    "High-frequency technical assembly optimized for rapid deployment. Functional stamps included for verification."}
                </p>
                <Link
                  href={`/projects/${project.slug}`}
                  className="bg-primary text-canvas border-primary hover:bg-canvas hover:text-primary block w-full border-2 py-4 text-center text-[10px] font-bold tracking-widest uppercase transition-none"
                >
                  VIEW_LOGS
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Technical Index Table Mobile */}
        <section className="mt-12 space-y-4">
          <h3 className="font-technical-sm bg-primary text-canvas inline-block px-2 py-1 text-[10px] font-black uppercase">
            TECHNICAL_INDEX_V4.0
          </h3>
          <div className="border-primary overflow-hidden border-2">
            <table className="font-mono-data w-full border-collapse text-[10px] uppercase">
              <thead>
                <tr className="bg-surface-muted border-primary border-b-2 text-left">
                  <th className="border-primary border-r-2 p-2">ID</th>
                  <th className="border-primary border-r-2 p-2">SPEC</th>
                  <th className="p-2">STAT</th>
                </tr>
              </thead>
              <tbody>
                {projects.slice(0, 4).map((p, i) => (
                  <tr
                    key={p.slug}
                    className="border-primary/20 border-b last:border-b-0"
                  >
                    <td className="border-primary bg-canvas border-r-2 p-2">
                      0{i + 1}-P
                    </td>
                    <td className="border-primary border-r-2 p-2">
                      ARCHIVE-LOG
                    </td>
                    <td className="text-primary p-2 font-bold">READY</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
