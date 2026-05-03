import { getReader } from "@/lib/reader";
import { Container, PageHeader, Section } from "@/components/layout-components";
import { format } from "date-fns";

export default async function TestimonialsPage() {
  const reader = await getReader();
  const testimonials = await reader.collections.testimonials.all();

  return (
    <main className="grow pb-32 md:pb-12">
      {/* Desktop Version */}
      <div className="hidden md:block">
        <Container>
          <PageHeader
            title="FIELD ENDORSEMENTS"
            subtitle="COLLECTION OF VERIFIED TECHNICAL LOGS"
          />

          <Section className="gap-gutter grid grid-cols-1 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <article
                key={i}
                className="border-primary bg-surface-card group relative flex flex-col gap-6 overflow-hidden border-2 p-8"
              >
                <div className="border-primary bg-canvas font-mono-data absolute top-4 right-4 rotate-12 border-2 px-3 py-1 text-xs font-bold uppercase opacity-80 transition-transform group-hover:rotate-0">
                  VERIFIED_LOG
                </div>

                <div className="border-primary/20 flex flex-col gap-2 border-b pb-4">
                  <span className="font-mono-data text-secondary text-xs uppercase">
                    ID: FN-LOG-
                    {t.entry.publishedDate
                      ? format(new Date(t.entry.publishedDate), "yyyy")
                      : "2024"}
                    -{(i + 1).toString().padStart(3, "0")}
                  </span>
                  <span className="font-mono-data text-secondary text-xs uppercase">
                    STAMP:{" "}
                    {t.entry.publishedDate
                      ? format(
                          new Date(t.entry.publishedDate),
                          "yyyy.MM.dd.HHmm.OOO"
                        )
                      : "2024.03.14.1200.UTC"}
                  </span>
                </div>

                <blockquote className="font-body-md border-primary text-primary border-l-8 pl-6 text-3xl leading-tight font-black italic">
                  &quot;{t.entry.content}&quot;
                </blockquote>

                <div className="border-primary mt-auto flex flex-col gap-2 border-t-2 pt-6">
                  <span className="font-technical-sm text-secondary text-sm font-bold uppercase">
                    {t.entry.authorName}
                  </span>
                  <span className="font-mono-data text-secondary/60 text-[10px] uppercase">
                    {t.entry.authorRole}
                  </span>
                </div>
              </article>
            ))}
          </Section>

          <Section className="mt-12">
            <div className="border-primary bg-primary text-canvas flex flex-col items-center gap-4 border-2 p-12 text-center">
              <h2 className="font-headline-lg text-4xl uppercase">
                SUBMIT YOUR LOG
              </h2>
              <p className="font-technical-sm max-w-2xl text-lg uppercase opacity-80">
                Are you an authorized field operative? Submit your technical
                endorsement for verification and persistent archival.
              </p>
              <button className="border-canvas font-headline-lg hover:bg-canvas hover:text-primary mt-6 border-2 px-12 py-4 text-lg uppercase transition-none">
                AUTHENTICATE ENTRY
              </button>
            </div>
          </Section>
        </Container>
      </div>

      {/* Mobile Version - MORPHED FROM DESIGN GUIDE */}
      <div className="space-y-10 px-4 pt-6 md:hidden">
        <section className="border-primary border-b-2 pb-6">
          <div className="font-mono-data text-secondary mb-2 text-[10px] tracking-widest uppercase">
            Section 04 // Endorsements
          </div>
          <h1 className="font-headline-xl text-4xl uppercase">
            FIELD TESTIMONIALS
          </h1>
          <p className="font-technical-sm mt-4 text-xs leading-tight uppercase opacity-80">
            Collection of verified technical logs and operational feedback from
            authorized personnel. All entries are cryptographically signed.
          </p>
        </section>

        <div className="flex flex-col gap-6">
          {testimonials.map((t, i) => (
            <article
              key={i}
              className="bg-surface-card border-primary relative overflow-hidden border-2 p-5"
            >
              <div className="border-primary bg-canvas font-mono-data absolute top-4 right-4 rotate-12 border-2 px-2 py-1 text-[10px] font-bold uppercase opacity-80">
                VERIFIED
              </div>

              <div className="border-primary/20 mb-4 flex flex-col border-b pb-2">
                <span className="font-mono-data text-secondary text-[10px] tracking-tighter uppercase">
                  ID: FN-LOG-
                  {t.entry.publishedDate
                    ? format(new Date(t.entry.publishedDate), "yyyy")
                    : "2024"}
                  -{(i + 1).toString().padStart(3, "0")}
                </span>
                <span className="font-mono-data text-secondary text-[10px] tracking-tighter uppercase">
                  TIMESTAMP:{" "}
                  {t.entry.publishedDate
                    ? format(new Date(t.entry.publishedDate), "yyyy.MM.dd.OOO")
                    : "2024.03.14.UTC"}
                </span>
              </div>

              <blockquote className="font-body-md border-primary text-primary border-l-4 pl-4 text-xl leading-tight font-black uppercase italic">
                &quot;{t.entry.content}&quot;
              </blockquote>

              <div className="border-primary flex flex-col gap-1 border-t-2 pt-4">
                <span className="font-technical-sm text-secondary text-[10px] font-bold uppercase">
                  {t.entry.authorName}
                </span>
                <span className="font-mono-data text-secondary/60 text-[8px] uppercase">
                  {t.entry.authorRole}
                </span>
              </div>
            </article>
          ))}
        </div>

        <section className="border-primary bg-primary text-canvas border-2 p-6 text-center">
          <h2 className="font-headline-lg mb-2 text-lg uppercase">
            SUBMIT YOUR LOG
          </h2>
          <p className="font-technical-sm mb-6 text-[10px] uppercase opacity-80">
            Are you an authorized field operative? Submit your endorsement.
          </p>
          <button className="bg-canvas text-primary font-headline-lg border-canvas hover:bg-primary hover:text-canvas w-full border-2 py-4 text-sm uppercase transition-none">
            AUTHENTICATE ENTRY
          </button>
        </section>
      </div>
    </main>
  );
}
