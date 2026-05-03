import { getReader } from "@/lib/reader";
import Image from "next/image";
import Link from "next/link";
import bg from "./BG.png";
import { format } from "date-fns";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { Open_Sans } from "next/font/google";
import Markdoc from "@markdoc/markdoc";
import { MarkdocRenderer } from "@/components/markdoc-renderer";
import { ContactForm } from "@/components/ContactForm";

const openSans = Open_Sans({ style: "normal" });

export default async function HomePage() {
  const reader = await getReader();

  // Safety checks for singletons
  const settings = await reader.singletons.settings.read().catch(() => null);
  const details = await reader.singletons.details.read().catch(() => null);
  const about = await reader.singletons.about.read().catch(() => null);

  // Safety checks for collections
  const posts = (await reader.collections.posts.all().catch(() => [])) || [];
  const projects =
    (await reader.collections.projects.all().catch(() => [])) || [];
  const experiences =
    (await reader.collections.experience.all().catch(() => [])) || [];
  const testimonials =
    (await reader.collections.testimonials.all().catch(() => [])) || [];

  const latestPosts = [...posts]
    .sort((a, b) => {
      const dateA = a.entry.publishedDate
        ? new Date(a.entry.publishedDate).getTime()
        : 0;
      const dateB = b.entry.publishedDate
        ? new Date(b.entry.publishedDate).getTime()
        : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <main className="bg-canvas text-primary selection:bg-primary selection:text-canvas relative flex flex-col antialiased">
      {/* Landing Section - KEPT AS IS per user directive */}
      <section
        id="landing"
        className="relative flex min-h-screen flex-col overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex flex-col justify-end overflow-hidden">
          <Image src={bg} alt="" className="w-full object-bottom" priority />
        </div>

        <div className="relative z-10 grid flex-1 grid-cols-1 gap-12 p-6 md:grid-cols-[3fr_2fr] md:p-12">
          <div className="flex flex-col overflow-hidden">
            <h1
              className={`${openSans.className} text-5xl leading-[0.85] font-black tracking-tighter uppercase lg:text-7xl xl:text-8xl`}
            >
              Simply
              <br />
              Engineered.
            </h1>

            <div className="mt-16 flex flex-col items-center gap-0 md:flex-row md:items-start md:gap-10">
              <div className="relative aspect-square max-h-90 w-1/2 shrink-0 p-1 grayscale">
                {details?.picture ? (
                  <Image
                    src={details.picture}
                    alt={details.name || "Profile"}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="bg-secondary flex h-full w-full items-center justify-center">
                    <span className="text-5xl font-black">
                      {details?.name?.[0] || "S"}
                    </span>
                  </div>
                )}
              </div>

              <div className="max-w-md space-y-8">
                <div className="space-y-2">
                  <h2 className="text-secondary font-mono text-sm font-bold tracking-[0.2em] uppercase">
                    OPERATOR // {details?.name || "IDENTITY_PENDING"}
                  </h2>
                  <p className="font-mono text-xs uppercase opacity-60">
                    ROLE: {details?.role || "SYSTEM ARCHITECT"}
                  </p>
                </div>
                <p className="text-xl leading-tight font-bold md:text-3xl">
                  {settings?.description ||
                    "Technical Ledger and Documentation"}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-25 flex flex-col">
            <div className="border-primary bg-card border-2">
              <div className="border-primary bg-secondary/10 flex items-center justify-between border-b-2 px-5 py-4">
                <h2 className="font-mono text-sm font-bold tracking-widest uppercase">
                  Field Journal{" "}
                  <span className="text-secondary mx-2 font-normal">|</span>{" "}
                  LATEST ENTRIES
                </h2>
                <Link
                  href="/posts"
                  className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase hover:underline"
                >
                  <span>posts</span>
                </Link>
              </div>

              <table className="w-full text-left font-mono text-xs md:text-sm">
                <thead className="border-primary bg-secondary/30 border-b">
                  <tr className="text-secondary tracking-widest uppercase">
                    <th className="px-5 py-3 font-normal">No.</th>
                    <th className="px-5 py-3 font-normal">Topic</th>
                    <th className="px-5 py-3 text-right font-normal">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-primary divide-y">
                  {latestPosts.map((post, i) => (
                    <tr
                      key={post.slug}
                      className="group hover:bg-secondary/20 cursor-pointer transition-colors"
                    >
                      <td className="text-secondary px-5 py-5">{i + 1}</td>
                      <td className="px-5 py-5 font-bold decoration-2 group-hover:underline">
                        <Link
                          href={`/posts/${post.slug}`}
                          className="block w-full"
                        >
                          {post.entry.title}
                        </Link>
                      </td>
                      <td className="text-secondary px-5 py-5 text-right font-medium whitespace-nowrap">
                        {post.entry.publishedDate
                          ? format(
                              new Date(post.entry.publishedDate),
                              "MMM d, yyyy"
                            )
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                  {latestPosts.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-secondary px-5 py-12 text-center font-bold tracking-widest uppercase"
                      >
                        No entries found in log.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {details?.resume && (
                <div className="border-primary border-t-2 p-4">
                  <a
                    href={details.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-canvas hover:bg-canvas hover:text-primary border-primary flex items-center justify-center gap-2 border-2 px-6 py-3 font-mono text-xs font-bold tracking-widest uppercase transition-none"
                  >
                    <span>Download Technical Resume [PDF]</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <ScrollIndicator />
      </section>

      {/* NEW SECTIONS FROM DESIGN GUIDE - MOBILE MORPHED */}
      <div className="mx-auto flex w-full flex-col gap-0 md:max-w-7xl md:gap-24 md:px-6 md:py-24">
        {/* Professional Ledger Section */}
        <section className="border-primary flex flex-col border-t-2 md:border-t-0">
          <div className="bg-primary text-canvas flex items-center justify-between p-6 md:hidden">
            <h2 className="font-headline-lg text-lg font-black tracking-tighter uppercase">
              PROFESSIONAL LEDGER
            </h2>
            <span className="font-mono-data text-xs uppercase">[TAB: 001]</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg border-primary hidden border-b-2 pb-2 uppercase md:block">
            PROFESSIONAL LEDGER
          </h2>

          <div className="grid grid-cols-1 pt-3 md:grid-cols-3 md:gap-8">
            {/* Experience Column */}
            <div className="divide-primary border-primary flex flex-col divide-y-2 border-b-2 md:gap-4 md:divide-y-0 md:border-b-0">
              <div className="bg-surface-muted border-primary font-technical-sm text-technical-sm border-b-2 p-2 text-center uppercase md:border-2 md:border-b-2">
                <span className="md:hidden">01 / </span>EXPERIENCE
              </div>
              {experiences.length > 0 ? (
                experiences.slice(0, 2).map((exp, i) => (
                  <div
                    key={i}
                    className="border-primary bg-surface-card flex flex-col gap-2 p-6 md:border-2 md:p-4"
                  >
                    <div className="border-primary flex items-start justify-between border-b-2 pb-2">
                      <span className="font-bold uppercase">
                        {exp.entry.role}
                      </span>
                      <span className="font-mono-data text-mono-data text-xs md:text-sm">
                        {exp.entry.dateRange?.[0]
                          ? format(new Date(exp.entry.dateRange[0]), "yyyy")
                          : ""}
                        -
                        {exp.entry.dateRange?.[1]
                          ? format(new Date(exp.entry.dateRange[1]), "yyyy")
                          : "PRES"}
                      </span>
                    </div>
                    <span className="font-technical-sm text-technical-sm uppercase opacity-60">
                      {exp.entry.company}
                    </span>
                    <div className="font-body-md mt-2 line-clamp-3 text-sm leading-relaxed uppercase opacity-80">
                      {exp.entry.role.toUpperCase()} AT{" "}
                      {exp.entry.company.toUpperCase()} -{" "}
                      {exp.entry.location?.toUpperCase() || "REMOTE"}
                    </div>
                  </div>
                ))
              ) : (
                <div className="font-mono-data p-12 text-center text-xs uppercase opacity-40">
                  No experience logged.
                </div>
              )}
            </div>

            {/* Knowledge Column */}
            <div className="border-primary flex flex-col border-b-2 md:gap-4 md:border-b-0">
              <div className="bg-surface-muted border-primary font-technical-sm text-technical-sm border-b-2 p-2 text-center uppercase md:border-2 md:border-b-2">
                <span className="md:hidden">02 / </span>KNOWLEDGE BASE
              </div>
              <div className="border-primary bg-surface-card w-full overflow-hidden p-0 md:border-2">
                <table className="font-mono-data text-mono-data w-full text-left *:text-sm">
                  <thead>
                    <tr className="bg-surface-muted border-primary border-b-2">
                      <th className="font-technical-sm text-technical-sm border-primary border-r-2 p-2 uppercase">
                        DOMAIN
                      </th>
                      <th className="font-technical-sm text-technical-sm p-2 uppercase">
                        SKILLS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {about?.skills?.map((skill, i) => (
                      <tr
                        key={i}
                        className="border-primary border-b-2 last:border-b-0"
                      >
                        <td className="border-primary border-r-2 p-2 text-[10px] font-bold uppercase">
                          {skill.category}
                        </td>
                        <td className="p-2 text-[10px] uppercase">
                          {skill.items.join(", ")}
                        </td>
                      </tr>
                    )) || (
                      <tr>
                        <td
                          colSpan={2}
                          className="p-4 text-center uppercase opacity-40"
                        >
                          Waiting for data...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Technical Skills (Replaced Archive) */}
            <div className="border-primary flex flex-col border-b-2 md:gap-4 md:border-b-0">
              <div className="bg-surface-muted border-primary font-technical-sm text-technical-sm border-b-2 p-2 text-center uppercase md:border-2 md:border-b-2">
                <span className="md:hidden">03 / </span>CORE COMPETENCIES
              </div>
              <div className="border-primary bg-surface-card flex flex-wrap gap-2 p-6 md:border-2 md:p-4">
                {about?.skills
                  ?.flatMap((s) => s.items)
                  .slice(0, 15)
                  .map((skill, i) => (
                    <span
                      key={i}
                      className="border-primary font-mono-data bg-canvas text-primary border-2 px-2 py-1 text-[10px] font-bold uppercase"
                    >
                      {skill}
                    </span>
                  )) || (
                  <span className="uppercase opacity-40">No skills found.</span>
                )}
              </div>
            </div>
          </div>

          {/* New Row: Bio and Education */}
          <div className="border-primary mt-0 grid grid-cols-1 border-t-2 md:mt-8 md:grid-cols-3 md:gap-8 md:border-t-0">
            {/* Bio Column */}
            <div className="border-primary flex flex-col border-b-2 md:col-span-2 md:gap-4 md:border-b-0">
              <div className="bg-surface-muted border-primary font-technical-sm text-technical-sm border-b-2 p-2 text-center uppercase md:border-2 md:border-b-2">
                BIOGRAPHY // MISSION STATEMENT
              </div>
              <div className="border-primary bg-surface-card font-body-md text-md border-l-8 p-6 leading-relaxed uppercase italic opacity-90 md:border-2 md:p-8 md:text-lg">
                {about?.bio ? (
                  <MarkdocRenderer
                    content={Markdoc.transform(Markdoc.parse(about.bio))}
                  />
                ) : (
                  "Awaiting transmission of operative background..."
                )}
              </div>
            </div>

            {/* Education Column */}
            <div className="border-primary flex flex-col border-b-2 md:gap-4 md:border-b-0">
              <div className="bg-surface-muted border-primary font-technical-sm text-technical-sm border-b-2 p-2 text-center uppercase md:border-2 md:border-b-2">
                EDUCATION // CREDENTIALS
              </div>
              <div className="divide-primary flex h-full flex-col divide-y-2 md:gap-4 md:divide-y-0">
                {about?.education?.map((edu, i) => (
                  <div
                    key={i}
                    className="border-primary bg-surface-card flex flex-col gap-1 p-6 md:border-2 md:p-4"
                  >
                    <div className="border-primary/20 flex items-start justify-between border-b pb-1">
                      <span className="text-xs font-bold uppercase">
                        {edu.degree}
                      </span>
                      <span className="font-mono-data text-[10px]">
                        {edu.dateRange?.[1]
                          ? format(new Date(edu.dateRange[1]), "yyyy")
                          : "PRES"}
                      </span>
                    </div>
                    <span className="font-technical-sm text-[10px] uppercase opacity-60">
                      {edu.institution}
                    </span>
                    {edu.grade && (
                      <span className="font-mono-data bg-primary text-canvas mt-1 w-max px-2 text-[10px]">
                        GRADE: {edu.grade}
                      </span>
                    )}
                  </div>
                )) || (
                  <div className="p-8 text-center uppercase opacity-40">
                    No credentials logged.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Field Endorsements Section */}
        <section className="bg-canvas border-primary flex flex-col gap-6 border-b-2 p-6 md:gap-8 md:border-b-0 md:p-0">
          <h2 className="font-headline-lg md:text-headline-lg border-primary text-2xl uppercase md:border-b-2 md:pb-2">
            FIELD ENDORSEMENTS
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {testimonials.length > 0 ? (
              testimonials.slice(0, 3).map((t, i) => (
                <div
                  key={i}
                  className="border-primary bg-surface-card relative flex flex-col gap-4 border-2 p-6"
                >
                  <div className="bg-primary text-canvas font-mono-data absolute -top-3 -right-2 px-2 py-1 text-[10px] uppercase">
                    VERIFIED_LOG
                  </div>
                  <div className="font-mono-data text-mono-data border-primary/10 text-secondary flex justify-between border-b pb-2 text-[10px] uppercase">
                    <span>
                      REF // {t.entry.authorRole} @ {t.entry.authorName}
                    </span>
                    <span>
                      {t.entry.publishedDate
                        ? format(new Date(t.entry.publishedDate), "yyyy.MM.dd")
                        : ""}
                    </span>
                  </div>{" "}
                  <p className="font-body-md md:text-body-md border-primary border-l-4 pl-4 text-sm uppercase italic">
                    &quot;{t.entry.content}&quot;
                  </p>
                </div>
              ))
            ) : (
              <div className="border-primary/20 font-mono-data col-span-full border-2 border-dashed p-12 text-center text-xs uppercase opacity-40">
                No endorsements logged. Waiting for transmission.
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-center">
            <Link
              href="/testimonials"
              className="border-primary bg-primary text-canvas md:text-primary font-inter hover:bg-primary hover:text-canvas w-full border-2 px-8 py-4 text-center text-sm font-bold tracking-widest uppercase transition-none md:w-max md:bg-transparent md:py-3 md:tracking-tighter"
            >
              VIEW ALL ENDORSEMENTS
            </Link>
          </div>
        </section>

        {/* Project Archive Grid Section */}
        <section className="bg-surface-card border-primary flex flex-col border-b-2 md:gap-8 md:border-b-0 md:bg-transparent">
          <div className="border-primary flex items-center gap-4 border-b-2 p-6 md:border-b-0 md:p-0 md:pb-2">
            <span className="text-xl font-black md:hidden">#</span>
            <h2 className="font-headline-lg md:text-headline-lg text-2xl uppercase">
              PROJECT ARCHIVE
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:gap-8 md:p-0 lg:grid-cols-3">
            {projects.length > 0 ? (
              projects.slice(0, 3).map((project, i) => (
                <div
                  key={i}
                  className="border-primary bg-canvas flex flex-col border-2"
                >
                  <div className="border-primary bg-surface-muted group relative h-48 overflow-hidden border-b-2 grayscale md:aspect-video md:h-auto">
                    {project.entry.images?.[0] ? (
                      <Image
                        src={project.entry.images[0] as string}
                        alt={project.entry.name}
                        fill
                        className="object-cover transition-none group-hover:scale-105"
                      />
                    ) : (
                      <div className="bg-surface-dim flex h-full w-full items-center justify-center text-4xl font-black opacity-10">
                        PROJECT_{i}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 p-4">
                    <div className="flex items-start justify-between">
                      <span className="text-lg font-bold uppercase md:text-base">
                        Project: {project.entry.name}
                      </span>
                      <span className="font-mono-data border-primary bg-primary text-canvas border-2 px-2 text-xs md:hidden">
                        2024
                      </span>
                    </div>
                    <span className="font-technical-sm line-clamp-2 text-xs uppercase opacity-80 md:text-sm">
                      {project.entry.summary ||
                        "Systematic approach to digital architecture and frontend ecosystems."}
                    </span>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="border-primary font-mono-data hover:bg-primary hover:text-canvas w-full border-2 px-4 py-2 text-center text-xs uppercase transition-none md:mt-2 md:w-max md:border-0 md:p-0 md:text-sm md:normal-case md:underline"
                    >
                      VIEW LOG
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="border-primary/20 font-mono-data col-span-full border-2 border-dashed p-24 text-center text-xs uppercase opacity-40">
                Empty Archive. Waiting for content input.
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-surface-card border-primary flex flex-col gap-12 p-6 md:flex-row md:border-2 md:p-8">
          <div className="flex flex-1 flex-col gap-4">
            <h2 className="font-headline-lg md:text-headline-lg text-2xl tracking-tighter uppercase">
              INITIATE CONTACT
            </h2>
            <p className="font-mono-data text-secondary text-xs md:hidden">
              SECURE CHANNEL V.04
            </p>
            <p className="font-body-md md:text-body-md text-sm leading-relaxed uppercase opacity-80">
              For project inquiries or system consultations, please submit the
              standard request form. Responses are typically dispatched within
              48 hours.
            </p>
            <div className="font-mono-data text-mono-data mt-auto flex flex-col gap-2 text-xs md:text-sm">
              <span className="flex items-center gap-2">
                <span>[M]</span> {details?.email || "pending@contact.net"}
              </span>
              <span className="flex items-center gap-2">
                <span>[L]</span> {details?.location || "SECTOR 4, NY"}
              </span>
            </div>
          </div>
          <div className="flex-1">
            <div className="border-primary border-2 bg-transparent p-6">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
