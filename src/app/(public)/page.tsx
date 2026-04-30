import { getReader } from "@/lib/reader";
import Image from "next/image";
import Link from "next/link";
import bg from "./BG.png";
import { format } from "date-fns";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ style: "normal" });

export default async function HomePage() {
  const reader = await getReader();
  const settings = await reader.singletons.settings.read();
  const details = await reader.singletons.details.read();
  const posts = await reader.collections.posts.all();
  const about = await reader.singletons.about.read();

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
    .slice(0, 4);

  return (
    <main className="bg-background text-foreground selection:bg-foreground selection:text-background relative flex flex-col antialiased">
      {/* Landing Section */}
      <section
        id="landing"
        className="relative flex min-h-screen flex-col overflow-hidden"
      >
        {/* Background Image Container */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex flex-col justify-end overflow-hidden">
          <Image src={bg} alt="" className="w-full object-bottom" priority />
        </div>

        {/* Main Content */}
        <div className="relative z-10 grid flex-1 grid-cols-1 gap-12 p-6 md:grid-cols-[3fr_2fr] md:p-12">
          {/* Left Column: Branding & Hero */}
          <div className="flex flex-col overflow-hidden">
            <h1
              className={`${openSans.className} text-5xl leading-[0.85] font-black tracking-tighter uppercase lg:text-7xl xl:text-8xl`}
            >
              Simply
              <br />
              Engineered.
            </h1>

            <div className="mt-16 flex flex-col items-center gap-0 md:flex-row md:items-start md:gap-10">
              {/* Profile Picture / Placeholder */}
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
                      {details?.name?.[0]}
                    </span>
                  </div>
                )}
              </div>

              {/* Bio & Services */}
              <div className="max-w-md space-y-8">
                <p className="leading-tight font-bold md:text-3xl">
                  {settings?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Journal & Technical Log */}
          <div className="mb-25 flex flex-col">
            <div className="border-border bg-card border-2">
              <div className="border-border bg-secondary/10 flex items-center justify-between border-b-2 px-5 py-4">
                <h2 className="font-mono text-sm font-bold tracking-widest uppercase">
                  Field Journal{" "}
                  <span className="text-muted-foreground mx-2 font-normal">
                    |
                  </span>{" "}
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
                <thead className="border-border bg-secondary/30 border-b">
                  <tr className="text-muted-foreground tracking-widest uppercase">
                    <th className="px-5 py-3 font-normal">No.</th>
                    <th className="px-5 py-3 font-normal">Topic</th>
                    <th className="px-5 py-3 text-right font-normal">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-border divide-y">
                  {latestPosts.map((post, i) => (
                    <tr
                      key={post.slug}
                      className="group hover:bg-secondary/20 cursor-pointer transition-colors"
                    >
                      <td className="text-muted-foreground px-5 py-5">
                        {i + 1}
                      </td>
                      <td className="px-5 py-5 font-bold decoration-2 group-hover:underline">
                        <Link
                          href={`/posts/${post.slug}`}
                          className="block w-full"
                        >
                          {post.entry.title}
                        </Link>
                      </td>
                      <td className="text-muted-foreground px-5 py-5 text-right font-medium whitespace-nowrap">
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
                        className="text-muted-foreground px-5 py-12 text-center font-bold tracking-widest uppercase"
                      >
                        No entries found in log.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <ScrollIndicator />
      </section>

      {/* Next Section: Technical Background / Experience */}
      <section
        id="about"
        className="border-border bg-background relative z-10 min-h-screen border-t-2 px-6 py-12 md:p-12 lg:px-24"
      >
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-black tracking-tighter uppercase sm:text-6xl md:text-7xl">
              Technical
              <br />
              Background
            </h2>
            <div className="mt-8 space-y-6 text-xl leading-relaxed font-medium md:text-2xl">
              <p>
                Bridging the gap between complex engineering and intuitive
                design. Focused on building robust, scalable systems that
                perform under pressure.
              </p>
            </div>
          </div>

          <div className="border-border bg-card w-full max-w-md border-2 p-8 md:mt-24">
            <h3 className="mb-6 font-mono text-xs font-bold tracking-[0.3em] uppercase">
              Core Expertise
            </h3>
            <ul className="space-y-4 font-bold">
              {about?.skills?.map((skillGroup, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-muted-foreground font-mono text-xs">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <div>
                    <span className="uppercase">{skillGroup.category}</span>
                    <div className="text-muted-foreground mt-1 flex flex-wrap gap-x-2 gap-y-1 font-mono text-[10px]">
                      {skillGroup.items.map((item, j) => (
                        <span key={j}>
                          {item}
                          {j < skillGroup.items.length - 1 && " /"}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mt-24">
          <h3 className="mb-12 font-mono text-sm font-bold tracking-[0.2em] uppercase">
            Professional Trajectory
          </h3>
          <div className="border-border divide-border grid grid-cols-1 divide-y border-y-2">
            {about?.experience?.map((exp, i) => (
              <div
                key={i}
                className="group grid grid-cols-1 gap-4 py-8 md:grid-cols-[1fr_2fr_1fr] md:gap-8"
              >
                <div className="text-muted-foreground font-mono text-sm font-bold uppercase">
                  {exp.dateRange?.[0]
                    ? format(new Date(exp.dateRange[0]), "yyyy")
                    : "Present"}
                  {" — "}
                  {exp.dateRange?.[1]
                    ? format(new Date(exp.dateRange[1]), "yyyy")
                    : "Present"}
                </div>
                <div>
                  <h4 className="text-2xl font-black tracking-tight uppercase">
                    {exp.role}
                  </h4>
                  <p className="mt-1 text-lg font-bold">{exp.company}</p>
                </div>
                <div className="text-muted-foreground text-right font-mono text-xs font-bold uppercase">
                  {exp.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-border bg-background relative z-10 flex flex-col justify-between border-t-2 px-6 py-8 font-mono text-[10px] font-bold tracking-widest uppercase md:flex-row md:px-12">
        <div className="mb-4 md:mb-0">
          Contact:{" "}
          <a
            href={`mailto:${details?.email}`}
            className="text-foreground decoration-2 hover:underline"
          >
            {details?.email}
          </a>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <span>{details?.location}</span>
          <span className="text-border hidden md:inline">|</span>
          <span className="text-muted-foreground">{settings?.copyright}</span>
        </div>
      </footer>
    </main>
  );
}
