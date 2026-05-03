import { getReader } from "@/lib/reader";
import { Container, PageHeader, Section } from "@/components/layout-components";
import { format } from "date-fns";
import Link from "next/link";

export default async function TestimonialsPage() {
  const reader = await getReader();
  const testimonials = await reader.collections.testimonials.all();

  return (
    <main className="grow pb-32 md:pb-12">
      <Container>
        {/* Responsive Header - Matched with Projects Page */}
        <header className="border-primary mb-6 border-b-2 pb-4 md:mb-0 md:border-b-4 md:pb-6">
          <h1 className="font-headline-xl text-4xl break-words uppercase md:text-5xl">
            <span>FIELD ENDORSEMENTS</span>
          </h1>
          <p className="font-technical-sm text-[10px] uppercase opacity-60">
            COLLECTION OF VERIFIED TECHNICAL LOGS // INDEX NO. 408-C
          </p>
        </header>

        <Section className="gap-gutter grid grid-cols-1 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <article
              key={i}
              className="border-primary bg-surface-card group relative flex flex-col gap-6 overflow-hidden border-2 p-5 md:p-8"
            >
              <div className="border-primary bg-canvas font-mono-data absolute top-4 right-4 rotate-12 border-2 px-2 py-1 text-[10px] font-bold uppercase opacity-80 transition-transform group-hover:rotate-0 md:px-3 md:text-xs">
                VERIFIED_LOG
              </div>

              <div className="border-primary/20 flex flex-col gap-2 border-b pb-4">
                <span className="font-mono-data text-secondary text-[10px] uppercase md:text-xs">
                  ID: FN-LOG-
                  {t.entry.publishedDate
                    ? format(new Date(t.entry.publishedDate), "yyyy")
                    : "2024"}
                  -{(i + 1).toString().padStart(3, "0")}
                </span>
                <span className="font-mono-data text-secondary text-[10px] uppercase md:text-xs">
                  STAMP:{" "}
                  {t.entry.publishedDate
                    ? format(
                        new Date(t.entry.publishedDate),
                        "yyyy.MM.dd.HHmm.OOO"
                      )
                    : "2024.03.14.1200.UTC"}
                </span>
              </div>

              <blockquote className="font-body-md border-primary text-primary border-l-4 pl-4 text-xl leading-tight font-black break-words italic md:border-l-8 md:pl-6 md:text-3xl">
                &quot;{t.entry.content}&quot;
              </blockquote>

              <div className="border-primary mt-auto flex flex-col gap-1 border-t-2 pt-4 md:gap-2 md:pt-6">
                <span className="font-technical-sm text-secondary text-[10px] font-bold uppercase md:text-sm">
                  {t.entry.authorName}
                </span>
                <span className="font-mono-data text-secondary/60 text-[8px] uppercase md:text-[10px]">
                  {t.entry.authorRole}
                </span>
              </div>
            </article>
          ))}
        </Section>

        <Section className="mt-12">
          <div className="border-primary bg-primary text-canvas flex flex-col items-center gap-4 border-2 p-6 text-center md:p-12">
            <h2 className="font-headline-lg text-lg uppercase md:text-4xl">
              SUBMIT YOUR LOG
            </h2>
            <p className="font-technical-sm max-w-2xl text-[10px] uppercase opacity-80 md:text-lg">
              Are you an authorized field operative? Submit your technical
              endorsement for verification and persistent archival.
            </p>
            <Link
              href="/#contactForm"
              className="border-canvas font-headline-lg hover:bg-canvas hover:text-primary mt-2 w-full border-2 px-8 py-3 text-sm break-words uppercase transition-none md:mt-6 md:w-auto md:px-12 md:py-4 md:text-lg"
            >
              AUTHENTICATE ENTRY
            </Link>
          </div>
        </Section>
      </Container>
    </main>
  );
}
